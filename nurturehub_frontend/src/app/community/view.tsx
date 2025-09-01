"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Image from "next/image";
import {
  Heart,
  MessageCircle,
  Share2,
  Send,
  Image as ImageIcon,
} from "lucide-react";
import { Post, newPost } from "./model";
import { createPost, like, sharePost } from "./service";
import { formatDistanceToNow } from "date-fns";

interface Props {
  data: { posts: Post[] };
}

export default function CommunityView({ data }: Props) {
  const [posts, setPosts] = useState<Post[]>(data.posts || []);
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostFile, setNewPostFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [activeCommentSection, setActiveCommentSection] = useState<
    string | null
  >(null);
  const [commentContent, setCommentContent] = useState("");
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  useEffect(() => {
    setPosts(data.posts);
  }, [data.posts]);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewPostFile(file);

      const reader = new FileReader();
      reader.onload = (event) =>
        setPreviewImage(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handlePostSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    let base64Image: string = "";
    if (newPostFile) {
      try {
        base64Image = await fileToBase64(newPostFile);
      } catch (err) {
        console.error("Failed to convert image to Base64", err);
      }
    }

    const postData: newPost = { content: newPostContent, photo: base64Image };

    try {
      const createdPost = await createPost(postData);
      setPosts([createdPost, ...posts]);
      setNewPostContent("");
      setNewPostFile(null);
      setPreviewImage(null);
    } catch (err) {
      console.error(err);
      alert("Failed to create post");
    }
  };

  const toggleCommentSection = (postId: string) => {
    setActiveCommentSection(activeCommentSection === postId ? null : postId);
  };

  const handleCommentSubmit = (postId: string) => {
    if (!commentContent.trim()) return;

    const newComment = {
      text: commentContent,
      createdAt: new Date().toISOString(),
      user: { name: "User Name", avatar: "/avatar.png" },
    };

    setPosts(
      posts.map((post) =>
        post._id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      )
    );

    setCommentContent("");
  };

  const handleLike = async (postId: string) => {
    const alreadyLiked = likedPosts.has(postId);

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? { ...post, likes: alreadyLiked ? post.likes - 1 : post.likes + 1 }
          : post
      )
    );

    setLikedPosts((prev) => {
      const updated = new Set(prev);
      if (alreadyLiked) {
        updated.delete(postId);
      } else {
        updated.add(postId);
      }
      return updated;
    });

    try {
      await like(postId); // still call backend
    } catch (err) {
      console.error(err);
    }
  };

  const handleShare = async (postId: string) => {
    try {
      await sharePost(postId);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto">
        {/* Create Post Form */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Create a Post
          </h2>
          <form onSubmit={handlePostSubmit}>
            <textarea
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              placeholder="What's on your mind?"
              rows={3}
            />
            {previewImage && (
              <div className="mt-4">
                <Image
                  src={previewImage}
                  alt="Preview"
                  width={150}
                  height={150}
                  className="rounded-md object-cover"
                />
              </div>
            )}
            <div className="flex justify-between items-center mt-4">
              <label
                htmlFor="image-upload"
                className="cursor-pointer text-gray-500 hover:text-green-600"
              >
                <ImageIcon size={24} />
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700"
              >
                <Send size={16} />
                Post
              </button>
            </div>
          </form>
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.length === 0 ? (
            <p className="text-center text-gray-500">No posts yet</p>
          ) : (
            posts.map((post, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start gap-4">
                  <Image
                    src="https://placehold.co/100x100.png"
                    alt={post.userId?.name || "User"}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2">
                      <h3 className="font-bold text-gray-800">
                        {post.userId?.name || "Anonymous"}
                      </h3>
                      <p
                        className="text-xs text-gray-500"
                        title={
                          post.createdAt
                            ? new Date(post.createdAt).toLocaleString()
                            : ""
                        }
                      >
                        {post.createdAt
                          ? formatDistanceToNow(new Date(post.createdAt), {
                              addSuffix: true,
                            })
                          : ""}
                      </p>
                    </div>
                    <p className="text-gray-700 mt-2">{post.content}</p>
                    {post.photo && (
                      <div className="mt-4 rounded-lg overflow-hidden border">
                        <img
                          src={post.photo}
                          alt="Post image"
                          width={800}
                          height={600}
                          className="w-full object-cover"
                        />
                      </div>
                    )}

                    <div className="flex justify-between items-center mt-4 text-gray-500">
                      <button
                        onClick={() => handleLike(post._id)}
                        className={`flex items-center gap-2 ${
                          likedPosts.has(post._id)
                            ? "text-red-500"
                            : "hover:text-red-500"
                        }`}
                      >
                        <Heart
                          size={20}
                          fill={likedPosts.has(post._id) ? "red" : "none"}
                        />
                        <span>{post.likes}</span>
                      </button>

                      <button
                        onClick={() => toggleCommentSection(post._id)}
                        className="flex items-center gap-2 hover:text-blue-500"
                      >
                        <MessageCircle size={20} />
                        <span>{}</span>
                      </button>
                      <button
                        onClick={() => handleShare(post._id)}
                        className="flex items-center gap-2 hover:text-green-500"
                      >
                        <Share2 size={20} />
                        <span>{}</span>
                      </button>
                    </div>

                    {activeCommentSection === post._id && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="space-y-3 mb-4">
                          {post.comments.map((comment, idx) => (
                            <div
                              key={idx}
                              className="text-sm bg-gray-100 p-3 rounded-lg"
                            >
                              <p>
                                <span className="font-semibold">
                                  {comment.user.name}
                                </span>
                                : {comment.text}
                              </p>
                              <p
                                className="text-xs text-gray-500 mt-1"
                                title={new Date(
                                  comment.createdAt
                                ).toLocaleString()}
                              >
                                {formatDistanceToNow(
                                  new Date(comment.createdAt),
                                  { addSuffix: true }
                                )}
                              </p>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center gap-2">
                          <textarea
                            value={commentContent}
                            onChange={(e) => setCommentContent(e.target.value)}
                            placeholder="Write a comment..."
                            className="w-full p-2 border border-gray-300 rounded-md text-sm"
                            rows={1}
                          />
                          <button
                            onClick={() => handleCommentSubmit(post._id)}
                            className="p-2 rounded-full bg-green-600 text-white hover:bg-green-700"
                          >
                            <Send size={16} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
