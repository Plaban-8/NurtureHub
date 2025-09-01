
import { savePost, getAllPosts, like, getSharedPosts, deleteSharedPost, sharePost, addComment } from "./community.repo.js";

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

export const getSharedPostService = async (id)=>{
  try{
    const result = await getSharedPosts(id);
    return {
      data: result,
      success: true
    };
  }catch(err){
    return {
      message: "failed in service",
      success: false
    }
  }
}

export const deleteSharedPostService = async (id, postId) => {
  try {
    await deleteSharedPost(id, postId);
  } catch (err) {
    throw new Error("failed in backend service");
  }
};

export const sharePostService = async (userId, postId) => {
  try {
    await sharePost(userId, postId);
  } catch (err) {
    throw new Error("failed in backend service");
  }
};

export const addCommentService = async (userId, postId, text) => {
  try {
    await addComment(userId, postId, text);
  } catch (err) {
    throw new Error("failed in backend service");
  }
};