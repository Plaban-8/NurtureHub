"use client";

import { FileText, Book, Video } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Models
interface ContentItem {
  id: number;
  title: string;
  description: string;
  link: string;
  type: 'paper' | 'blog' | 'video';
  author?: string;
  thumbnail?: string;
}

// Data
const educationalContent: ContentItem[] = [
  {
    id: 1,
    title: 'The Role of Mycorrhizal Fungi in Plant Growth',
    description: 'A deep dive into the symbiotic relationship between fungi and plant roots.',
    link: '#',
    type: 'paper',
    author: 'Dr. Jane Doe, Botanist',
  },
  {
    id: 2,
    title: 'Advanced Composting Techniques for Richer Soil',
    description: 'Explore methods to create nutrient-dense compost for your garden.',
    link: '#',
    type: 'paper',
    author: 'Dr. John Smith, Soil Scientist',
  },
  {
    id: 3,
    title: '5 Common Mistakes Beginner Gardeners Make',
    description: 'Learn what to avoid when you\'re just starting your plant journey.',
    link: '#',
    type: 'blog',
    author: 'PlantLife Magazine',
    thumbnail: 'https://placehold.co/600x400.png',
  },
  {
    id: 4,
    title: 'A Guide to Indoor Herb Gardens',
    description: 'Everything you need to know to grow fresh herbs in your kitchen.',
    link: '#',
    type: 'blog',
    author: 'Green Thumb Blogs',
    thumbnail: 'https://placehold.co/600x400.png',
  },
  {
    id: 5,
    title: 'How to Properly Prune a Fiddle Leaf Fig',
    description: 'A step-by-step video tutorial on pruning for health and shape.',
    link: '#',
    type: 'video',
    thumbnail: 'https://placehold.co/600x400.png',
  },
  {
    id: 6,
    title: 'Hydroponics 101: A Beginner\'s Guide',
    description: 'Learn the basics of growing plants without soil in this engaging video.',
    link: '#',
    type: 'video',
    thumbnail: 'https://placehold.co/600x400.png',
  },
];

const papers = educationalContent.filter(c => c.type === 'paper');
const blogs = educationalContent.filter(c => c.type === 'blog');
const videos = educationalContent.filter(c => c.type === 'video');

// Main Component
export default function EducationalContentPage() {
  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Educational Content</h1>

      {/* Research Papers Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-700 mb-4 flex items-center gap-2">
          <FileText className="text-primary" /> Research Papers
        </h2>
        <div className="space-y-4">
          {papers.map(paper => (
            <Link href={paper.link} key={paper.id}>
              <div className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-800">{paper.title}</h3>
                <p className="text-sm text-gray-500 mt-1">by {paper.author}</p>
                <p className="text-gray-600 mt-2">{paper.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-700 mb-4 flex items-center gap-2">
          <Book className="text-primary" /> Blog Posts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogs.map(blog => (
            <Link href={blog.link} key={blog.id}>
               <div className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {blog.thumbnail && (
                  <div className="relative h-48 w-full">
                    <Image src={blog.thumbnail} alt={blog.title} layout="fill" objectFit="cover" data-ai-hint="gardening blog" />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800">{blog.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">from {blog.author}</p>
                  <p className="text-gray-600 mt-2">{blog.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Video Tutorials Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-700 mb-4 flex items-center gap-2">
          <Video className="text-primary" /> Video Tutorials
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map(video => (
            <Link href={video.link} key={video.id}>
              <div className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 w-full">
                   <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <Video size={48} className="text-white" />
                   </div>
                   <Image src={video.thumbnail!} alt={video.title} layout="fill" objectFit="cover" data-ai-hint="plant care video" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800">{video.title}</h3>
                  <p className="text-gray-600 mt-2">{video.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
