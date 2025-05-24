"use server";

import { getUserFromCookie } from "@/lib/getUser";
import { redirect } from "next/navigation";

export const createHaiku = async function (prevState, formData) {
  const user = await getUserFromCookie();
  if (!user) {
    return redirect("/");
  }
};
