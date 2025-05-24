"use server";

import { getCollection } from "@/lib/db";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

function isAlphanumeric(str) {
  return /^[a-zA-Z0-9]+$/.test(str);
}

export const login = async function (prevState, formData) {
    const errors = {};
  const failedMsg = {
    error: { username: "Invalid username or password" },
    success: false,
  };
  const ourUser = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  if (typeof ourUser.username !== "string") ourUser.username = "";
  if (typeof ourUser.password !== "string") ourUser.password = "";

  if (ourUser.username == "") errors.username = "Username can not be empty";
  if (ourUser.password == "") errors.password = "Password can not be empty";

  if (errors.username || errors.password) {
    return {
      error: errors,
      success: false,
    };
  }

  const collection = await getCollection("users");
  const user = await collection.findOne({
    username: ourUser.username,
  });

  if (!user) {
    return failedMsg;
  }

  const isMatch = await bcrypt.compare(ourUser.password, user.password);
  if (!isMatch) {
    return failedMsg;
  }

  const ourTokenValue = jwt.sign({ userId: user._id }, process.env.JWTSECRET, {
    expiresIn: "1d",
  });

  cookies().set("ourhaikuapp", ourTokenValue, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24, // 1 day
    secure: true,
  });

  return redirect("/");
};

export const register = async function (prevState, formData) {
  const errors = {};
  const ourUser = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  if (typeof ourUser.username !== "string") ourUser.username = "";
  if (typeof ourUser.password !== "string") ourUser.password = "";

  ourUser.username = ourUser.username.trim();
  ourUser.password = ourUser.password.trim();

  if (ourUser.username.length < 3)
    errors.username = "Username must be at least 3 characters";
  if (ourUser.username.length > 30)
    errors.username = "Username can not exceed 30 characters";

  if (ourUser.password.length < 8)
    errors.password = "Password must be at least 8 characters";

  if (!isAlphanumeric(ourUser.username))
    errors.username = "Username can only contain letters and numbers";

  if (ourUser.username == "") errors.username = "Username can not be empty";
  if (ourUser.password == "") errors.password = "Password can not be empty";

  if (errors.username || errors.password) {
    return {
      error: errors,
      success: false,
    };
  }

  //Check if the username already exists
  const users = await getCollection("users");
  const existingUser = await users.findOne({
    username: ourUser.username,
  });
  if (existingUser) {
    errors.username = "Username already exists";
    return {
      error: errors,
      success: false,
    };
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  ourUser.password = await bcrypt.hash(ourUser.password, salt);

  // Insert the new user into the database
  const newUser = await users.insertOne(ourUser);
  const userId = newUser.insertedId.toString();

  const ourTokenValue = jwt.sign({ userId }, process.env.JWTSECRET, {
    expiresIn: "1d",
  });

  cookies().set("ourhaikuapp", ourTokenValue, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24, // 1 day
    secure: true,
  });

  return {
    message: "User created successfully",
    success: true,
  };
};

export const logout = async function () {
  cookies().delete("ourhaikuapp");
  redirect("/");
};
