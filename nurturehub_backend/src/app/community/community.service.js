
import { savePost, getAllPosts, like } from "./community.repo.js";

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

export const likeService = async (id) =>{
  try{
    await like(id);
  }catch(err){
    throw new Error("failed in backend service")
  }
}