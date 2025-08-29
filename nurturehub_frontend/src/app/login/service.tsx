"use server";

import { tokenManagementService } from "../tokenManagement/service";
import { LoginDTO } from "./model";
import { cookies } from "next/headers";

export const login = async (data: LoginDTO) => {
  const response = await fetch("http://localhost:4000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    alert("Login failed. Please try again.");
    throw new Error("Login failed");
  }
  const result = await response.json();
  await tokenManagementService(result.token);
};


export const logout = async () => {
  const cookiesStore = await cookies();
  cookiesStore.delete('token');
}