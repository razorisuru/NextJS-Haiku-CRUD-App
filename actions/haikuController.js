"use server";

import { getUserFromCookie } from "@/lib/getUser";
import { redirect } from "next/navigation";
import { ObjectId } from "mongodb";
import { getCollection } from "@/lib/db";
import { cookies } from "next/headers";
import cloudinary from "cloudinary";

const cloudinaryConfig = cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function isAlphanumericWithBaics(str) {
  return /^[a-zA-Z0-9 .,]+$/.test(str);
}

async function sharedLogic(formData, user) {
  const errors = {};
  const ourHaiku = {
    line1: formData.get("line1")?.trim(),
    line2: formData.get("line2")?.trim(),
    line3: formData.get("line3")?.trim(),
    author: ObjectId.createFromHexString(user.userId),
    createdAt: new Date(),
  };

  if (typeof ourHaiku.line1 !== "string") ourHaiku.line1 = "";
  if (typeof ourHaiku.line2 !== "string") ourHaiku.line2 = "";
  if (typeof ourHaiku.line3 !== "string") ourHaiku.line3 = "";

  if (!ourHaiku.line1) errors.line1 = "Line #1 is required";
  if (!ourHaiku.line2) errors.line2 = "Line #2 is required";
  if (!ourHaiku.line3) errors.line3 = "Line #3 is required";

  ourHaiku.line1 = ourHaiku.line1.replace(/(\r\n|\n|\r)/g, "");
  ourHaiku.line2 = ourHaiku.line2.replace(/(\r\n|\n|\r)/g, "");
  ourHaiku.line3 = ourHaiku.line3.replace(/(\r\n|\n|\r)/g, "");

  if (ourHaiku.line1.length < 5)
    errors.line1 = "Too few syllables in line #1, Must be 5";
  if (ourHaiku.line1.length > 25)
    errors.line1 = "Too many syllables in line #1, Must be 5";

  if (ourHaiku.line2.length < 7)
    errors.line2 = "Too few syllables in line #2, Must be 7";
  if (ourHaiku.line2.length > 35)
    errors.line2 = "Too many syllables in line #2, Must be 7";

  if (ourHaiku.line3.length < 5)
    errors.line3 = "Too few syllables in line #3, Must be 5";
  if (ourHaiku.line3.length > 25)
    errors.line3 = "Too many syllables in line #3, Must be 5";

  if (!isAlphanumericWithBaics(ourHaiku.line1))
    errors.line1 =
      "Line #1 can only contain letters, numbers, spaces, and basic punctuation.";
  if (!isAlphanumericWithBaics(ourHaiku.line2))
    errors.line2 =
      "Line #2 can only contain letters, numbers, spaces, and basic punctuation.";
  if (!isAlphanumericWithBaics(ourHaiku.line3))
    errors.line3 =
      "Line #3 can only contain letters, numbers, spaces, and basic punctuation.";

  // verify signature
  const expectedSignature = cloudinary.utils.api_sign_request(
    { public_id: formData.get("public_id"), version: formData.get("version") },
    cloudinaryConfig.api_secret
  );
  if (expectedSignature === formData.get("signature")) {
    ourHaiku.photo = formData.get("public_id");
  }

  // Convert ObjectId to string to avoid serialization issues
  ourHaiku.author = ourHaiku.author.toString();

  return { errors, ourHaiku };
}

export const createHaiku = async function (prevState, formData) {
  const user = await getUserFromCookie();
  if (!user) {
    return redirect("/");
  }

  const results = await sharedLogic(formData, user);

  if (results.errors.line1 || results.errors.line2 || results.errors.line3) {
    return {
      error: results.errors,
    };
  }

  // Convert string back to ObjectId for database operation
  results.ourHaiku.author = ObjectId.createFromHexString(
    results.ourHaiku.author
  );

  // save into db
  const haikusCollection = await getCollection("haikus");
  const result = await haikusCollection.insertOne(results.ourHaiku);

  return redirect("/");
};

export const editHaiku = async function (prevState, formData) {
  const user = await getUserFromCookie();
  if (!user) {
    return redirect("/");
  }

  const results = await sharedLogic(formData, user);

  if (results.errors.line1 || results.errors.line2 || results.errors.line3) {
    return {
      error: results.errors,
    };
  }

  // Convert string back to ObjectId for database operations
  results.ourHaiku.author = ObjectId.createFromHexString(
    results.ourHaiku.author
  );

  const haikuCollection = await getCollection("haikus");
  let haikuId = formData.get("haikuId");
  if (typeof haikuId !== "string") haikuId = "";

  // make sure you are the other of this post, otherwise have operation fail
  const haikuInQuestion = await haikusCollection.findOne({
    _id: ObjectId.createFromHexString(haikuId),
  });
  if (haikuInQuestion.author.toString() !== user.userId) {
    return redirect("/");
  }
  if (haikuInQuestion.author.toString() !== user.userId) {
    return redirect("/");
  }

  await haikuCollection.findOneAndUpdate(
    { _id: ObjectId.createFromHexString(haikuId) },
    {
      $set: results.ourHaiku,
    }
  );

  return redirect("/");
};

export const deleteHaiku = async function (formData) {
  const user = await getUserFromCookie();
  if (!user) {
    return redirect("/");
  }

  let haikuId = formData.get("id");
  if (typeof haikuId !== "string") haikuId = "";

  const haikuCollection = await getCollection("haikus");
  const haikuInQuestion = await haikuCollection.findOne({
    _id: ObjectId.createFromHexString(haikuId),
  });

  if (haikuInQuestion.author.toString() !== user.userId) {
    return redirect("/");
  }

  await haikuCollection.deleteOne({
    _id: ObjectId.createFromHexString(haikuId),
  });

  cookies().set("success", "Haiku deleted successfully!");
  return redirect("/");
};
