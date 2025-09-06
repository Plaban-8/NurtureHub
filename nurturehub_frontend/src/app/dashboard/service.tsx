"use server";
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
import { getToken } from "../tokenManagement/service";
import { PasswordFormState, userDTO } from "./model";
import { Post } from "../community/model";


export const getUserData = async () => {
  const token = await getToken();
  const response = await fetch(`${BACKEND_URL}/profile`, {
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
  const response = await fetch(`${BACKEND_URL}/profile/update`, {
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
  const response = await fetch(`${BACKEND_URL}/profile/changePassword`, {
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


export const getSharedPosts = async () => {
  const token = await getToken();
  const response = await fetch(`${BACKEND_URL}/community/shared`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch shared posts");
  }

  const result = await response.json();
  return result.data as Post[];
};



export const deleteSharedPost = async (postId: string) => {
  const token = await getToken();
  const response = await fetch(`${BACKEND_URL}/community/shared/${postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete shared post");
  }
};