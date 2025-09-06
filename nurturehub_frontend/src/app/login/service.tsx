"use server";

import { tokenManagementService } from "../tokenManagement/service";
import { LoginDTO } from "./model";
import { cookies } from "next/headers";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const login = async (data: LoginDTO) => {
  const response = await fetch(`${BACKEND_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Login failed");
  }
  const result = await response.json();
  await tokenManagementService(result.token);
};


export const logout = async () => {
  const cookiesStore = await cookies();
  cookiesStore.delete('token');
}