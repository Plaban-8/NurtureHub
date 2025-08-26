"use server";

import { cookies } from "next/headers";

// Save token in cookies
export const tokenManagementService = async (token: string) => {
  try {
    const cookieStore = await cookies(); // ✅ must await in Next.js 15.3+
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

// Get token from cookies
export const getToken = async () => {
  try {
    const cookieStore = await cookies(); // ✅ must await
    return cookieStore.get("token")?.value || null;
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
};
