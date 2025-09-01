"use server";

import { getToken } from "../tokenManagement/service";
import { PasswordFormState, userDTO } from "./model";

export const getUserData = async () => {
  const token = await getToken();
  const response = await fetch("http://localhost:4000/profile", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }

  const result = await response.json();
  return result.data as userDTO;
};

export const updateUser = async (data: userDTO) => {
  const token = await getToken();
  const response = await fetch("http://localhost:4000/profile/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to update user");
  }
};

export const changePassword = async (data: PasswordFormState) => {
  if (data.newPassword !== data.confirmPassword) {
    throw new Error("New password and confirm password do not match");
  }

  const token = await getToken();
  const response = await fetch("http://localhost:4000/profile/changePassword", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to change password");
  }
};
