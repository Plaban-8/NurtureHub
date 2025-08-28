
"use client";

import { useState, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import { Heart, MessageCircle, Share2, Send, Image as ImageIcon } from 'lucide-react';

// Models
export interface Comment {
  id: number;
  author: string;
  content: string;
  timestamp: string;
}

export interface Post {
  id: number;
  author: string;
  authorAvatar: string;
  content: string;
  image?: string;
  likes: number;
  comments: Comment[];
  shares: number;
  timestamp: string;
  isLiked?: boolean;
}


// Initial Data
const initialPosts: Post[] = [
  {
    id: 1,
    author: 'Jane Doe',
    authorAvatar: 'https://placehold.co/100x100.png',
    content: 'My monstera is finally putting out a new leaf! So exciting! 🌱',
    image: 'https://placehold.co/600x400.png',
    likes: 42,
    comments: [
        { id: 1, author: 'John Smith', content: 'That\'s awesome! Mine is still dormant.', timestamp: '1h ago' },
        { id: 2, author: 'Lena Petrova', content: 'Looks so healthy!', timestamp: '30m ago' },
    ],
    shares: 3,
    timestamp: '2h ago',
    isLiked: false,
  },
  {
    id: 2,
    author: 'John Smith',
    authorAvatar: 'https://placehold.co/100x100.png',
    content: 'Does anyone have tips for dealing with spider mites? My calathea is struggling.',
    likes: 15,
    comments: [],
    shares: 1,
    timestamp: '5h ago',
    isLiked: false,
  },
   {
    id: 3,
    author: 'Lena Petrova',
    authorAvatar: 'https://placehold.co/100x100.png',
    content: 'Just repotted my entire succulent collection. It was a long day, but worth it!',
    image: 'https://placehold.co/600x400.png',
    likes: 88,
    comments: [],
    shares: 7,
    timestamp: '1d ago',
    isLiked: false,
  },
];

// Main Component
export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostImage, setNewPostImage] = useState<string | null>(null);
  const [activeCommentSection, setActiveCommentSection] = useState<number | null>(null);
  const [commentContent, setCommentContent] = useState('');

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewPostImage(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handlePostSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    // TODO: Replace with an API call to your backend to create a new post
    const newPost: Post = {
      id: posts.length + 1,
      author: 'User Name', // Replace with actual logged-in user
      authorAvatar: 'https://placehold.co/100x100.png',
      content: newPostContent,
      image: newPostImage || undefined,
      likes: 0,
      comments: [],
      shares: 0,
      timestamp: 'Just now',
      isLiked: false,
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
    setNewPostImage(null);
  };

  const handleCommentSubmit = (postId: number) => {
    if (!commentContent.trim()) return;

    const newComment = {
      id: Date.now(),
      author: 'User Name', // Replace with actual logged-in user
      content: commentContent,
      timestamp: 'Just now',
    };
    
    // TODO: Replace with an API call to your backend to add a comment
    setPosts(posts.map(post => post.id === postId ? {
        ...post,
        comments: [...post.comments, newComment],
    } : post));

    setCommentContent('');
  };

  const toggleCommentSection = (postId: number) => {
    if(activeCommentSection === postId) {
      setActiveCommentSection(null);
    } else {
      setActiveCommentSection(postId);
    }
  }

  const handleLike = (postId: number) => {
    // TODO: Replace with an API call to your backend to like a post
    setPosts(posts.map(post => {
      if (post.id === postId) {
        // Prevent unliking for this simulation
        if (post.isLiked) return post;
        return {
          ...post,
          likes: post.likes + 1,
          isLiked: true,
        };
      }
      return post;
    }));
  };

  const handleShare = (post: Post) => {
    // TODO: Replace with an API call to your backend to share a post to the user's profile
    // For now, just increment the share count locally
    setPosts(posts.map(p => p.id === post.id ? { ...p, shares: p.shares + 1 } : p));
    console.log('Shared post:', post);
    alert('Post shared to your profile!');
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto">
        {/* Create Post Form */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Create a Post</h2>
          <form onSubmit={handlePostSubmit}>
            <textarea
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              placeholder="What's on your mind?"
              rows={3}
            ></textarea>
            {newPostImage && (
                <div className="mt-4">
                    <Image src={newPostImage} alt="Preview" width={100} height={100} className="rounded-md object-cover" />
                </div>
            )}
            <div className="flex justify-between items-center mt-4">
              <label htmlFor="image-upload" className="cursor-pointer text-gray-500 hover:text-green-600">
                <ImageIcon size={24} />
                <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
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
          {posts.map(post => (
            <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start gap-4">
                <Image src={post.authorAvatar} alt={post.author} width={48} height={48} className="rounded-full" data-ai-hint="person avatar" />
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <h3 className="font-bold text-gray-800">{post.author}</h3>
                    <p className="text-xs text-gray-500">{post.timestamp}</p>
                  </div>
                  <p className="text-gray-700 mt-2">{post.content}</p>
                  {post.image && (
                    <div className="mt-4 rounded-lg overflow-hidden border">
                       <Image src={post.image} alt="Post image" width={800} height={600} className="w-full object-cover" data-ai-hint="plant" />
                    </div>
                  )}
                  <div className="flex justify-between items-center mt-4 text-gray-500">
                    <button onClick={() => handleLike(post.id)} className={`flex items-center gap-2 hover:text-red-500 ${post.isLiked ? 'text-red-500' : ''}`}>
                      <Heart size={20} fill={post.isLiked ? 'currentColor' : 'none'} />
                      <span>{post.likes}</span>
                    </button>
                     <button onClick={() => toggleCommentSection(post.id)} className="flex items-center gap-2 hover:text-blue-500">
                      <MessageCircle size={20} />
                       <span>{post.comments.length}</span>
                    </button>
                     <button onClick={() => handleShare(post)} className="flex items-center gap-2 hover:text-green-500">
                      <Share2 size={20} />
                       <span>{post.shares}</span>
                    </button>
                  </div>

                  {/* Comment Section */}
                  {activeCommentSection === post.id && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                       <div className="space-y-3 mb-4">
                            {post.comments.map(comment => (
                               <div key={comment.id} className="text-sm bg-gray-100 p-3 rounded-lg">
                                 <p><span className="font-semibold">{comment.author}</span>: {comment.content}</p>
                                 <p className="text-xs text-gray-500 mt-1">{comment.timestamp}</p>
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
                                onClick={() => handleCommentSubmit(post.id)}
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
          ))}
        </div>
      </div>
    </div>
  );
}
