
import { savePost, getAllPosts } from "./community.repo.js";

export const postService = async (data) => {
  
  try {
    await savePost(data);
    return {
      message: "Post created successfully.",
      success: true,
    };
  } catch (err) {
    return {
      message: "Failed to create post.",
      success: false,
    };
  }
};

export const getAllPostsService = async () => {
  try {
    const result = await getAllPosts();
    return {
      data: result,
      success: true
    };
  } catch (err) {
    console.log(err)
    return {
      message: "failed in service",
      success: false
    }
  }
};
