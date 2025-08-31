import { getToken } from "../tokenManagement/service";
import { newPost } from "./model";

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

  return await response.json(); // will now return the created post
};
