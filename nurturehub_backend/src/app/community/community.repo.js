import { Community } from "./community.model.js";

export const savePost = async (data) => {
  return await Community.create(data);
};

export const getAllPosts = async () => {
   const posts = await Community.find()
  .populate("userId", "name avatar")
  .populate("comments.userId", "name avatar") 
  .select("content photo likes createdAt comments userId")
  .lean();

  return posts;

}