"use server";

import { RegisterDTO } from "./model";

export const signUpService = async (data: RegisterDTO) => {
  const response = await fetch("http://localhost:1789/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    alert("Registration failed. Please try again.");
    throw new Error("Registration failed");
  }
};
