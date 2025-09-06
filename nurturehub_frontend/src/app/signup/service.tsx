"use server";

import { RegisterDTO } from "./model";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const signUpService = async (data: RegisterDTO) => {
  const response = await fetch(`${BACKEND_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const responseData = await response.json();
  console.log(responseData);
  if (!response.ok) {
    throw new Error("Registration failed");
  }
};
