"use server"

import { getToken } from "../tokenManagement/service";
import { newPost } from "./model";
import { revalidatePath } from "next/cache";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;


export const createPost = async (data: newPost) => {
  const token = await getToken();
  const response = await fetch(`${BACKEND_URL}/community`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create post");
  }
  revalidatePath('/community');
  return await response.json(); // will now return the created post
};


export const getAllPosts = async () => {
  const response = await fetch(`${BACKEND_URL}/community`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
  })
  if(!response.ok){
    throw new Error("Failed in frontend service.")
  }
  const result = await response.json();
  return result.data;
}


export const like = async (id: any) => {
  console.log(JSON.stringify(id))
  const response = await fetch(`${BACKEND_URL}/community/like`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({"id": id}),
  })
  revalidatePath('/community');
  if(!response.ok){
    throw new Error("failed in frontend service.")
  }
}


export const sharePost = async (postId: string) => {
  const token = await getToken();
  const response = await fetch(`${BACKEND_URL}/community/share`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ postId }),
  });

  if (!response.ok) {
    throw new Error("Failed to share post");
  }
  revalidatePath('/community');
  return await response.json();
};


export const addComment = async (postId: string, text: string) => {
  const token = await getToken();
  const response = await fetch(`${BACKEND_URL}/community/${postId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error("Failed to add comment");
  }
  revalidatePath('/community');
  return await response.json();
};


export const dislike = async (id: string) => {
  const response = await fetch(`${BACKEND_URL}/community/dislike`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({"id": id}),
  })
  revalidatePath('/community');
  if(!response.ok){
    throw new Error("failed in frontend service.")
  }
}