import { Community } from "./community.model.js";
import { Shared } from "./shared.model.js";

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

export const like = async (id) =>{
  return await Community.updateOne({_id:id}, {$inc: {likes:1}})
}

export const getSharedPosts = async(id) => {
  const postId =  await Shared.find({ userId: id });
  return await Community.find({ _id: { $in: postId.map(post => post.postId) } }).populate("userId", "name avatar");
}

export const deleteSharedPost = async (id, postId) => {
  return await Shared.deleteOne({ userId: id, postId: postId });
};

export const sharePost = async (userId, postId) => {
  return await Shared.create({ userId, postId });
};

export const addComment = async (userId, postId, text) => {
  return await Community.updateOne(
    { _id: postId },
    { $push: { comments: { userId, text } } }
  );
};

export const dislike = async (id) => {
  return await Community.updateOne({_id:id}, {$inc: {likes:-1}});
}