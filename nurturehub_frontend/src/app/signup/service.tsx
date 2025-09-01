"use server";

import { RegisterDTO } from "./model";

export const signUpService = async (data: RegisterDTO) => {
  const response = await fetch("http://localhost:4000/auth/signup", {
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
