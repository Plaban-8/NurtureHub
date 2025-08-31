"use server";

import { cookies } from "next/headers";

export const tokenManagementService = async (token: string) => {
  try {
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });
  } catch (error) {
    console.error("Error setting token:", error);
  }
};


export const getToken = async () => {
  try {
    const cookieStore = await cookies();
    return cookieStore.get("token")?.value || null;
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
};
