"use server"
import { getToken } from "../tokenManagement/service";
import { newPost } from "./model";
import { revalidatePath } from "next/cache";

export const createPost = async (data: newPost) => {
  const token = await getToken();
  const response = await fetch("http://localhost:4000/community", {
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
  const response = await fetch("http://localhost:4000/community", {
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
  const response = await fetch("http://localhost:4000/community/like", {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({"id": id}),
  })
  revalidatePath('/community');
  if(!response.ok){
    throw new Error("failed in frontend service.")
  }
}