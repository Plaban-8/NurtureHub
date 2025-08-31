import { Community } from "./community.model.js";

export const savePost = async (data) => {
  return await Community.create(data);
};

export const getAllPosts = async () => {
   
}