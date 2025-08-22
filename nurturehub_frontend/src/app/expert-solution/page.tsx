"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Video, Star } from 'lucide-react';

// Model
interface Expert {
  id: number;
  name: string;
  specialization: string;
  bio: string;
  rating: number;
  profilePic: string;
  zoomLink: string;
}

// Data
const experts: Expert[] = [
  {
    id: 1,
    name: 'Dr. Evelyn Reed',
    specialization: 'Plant Pathology',
    bio: 'With over 15 years of experience, Dr. Reed is a leading expert in diagnosing and treating plant diseases.',
    rating: 4.9,
    profilePic: 'https://placehold.co/150x150.png',
    zoomLink: 'https://zoom.us/j/1234567890',
  },
  {
    id: 2,
    name: 'Marcus Thorne',
    specialization: 'Arboriculture & Tree Care',
    bio: 'Marcus is a certified arborist who specializes in the health and maintenance of trees and woody plants.',
    rating: 4.8,
    profilePic: 'https://placehold.co/150x150.png',
    zoomLink: 'https://zoom.us/j/0987654321',
  },
  {
    id: 3,
    name: 'Lena Petrova',
    specialization: 'Indoor & Tropical Plants',
    bio: 'Lena has a passion for houseplants and can help you create a thriving indoor jungle, no matter your skill level.',
    rating: 5.0,
    profilePic: 'https://placehold.co/150x150.png',
    zoomLink: 'https://zoom.us/j/5555555555',
  },
   {
    id: 4,
    name: 'Samuel Chen',
    specialization: 'Organic Gardening & Soil Health',
    bio: 'Samuel focuses on sustainable and organic practices to help you grow healthy, chemical-free plants.',
    rating: 4.9,
    profilePic: 'https://placehold.co/150x150.png',
    zoomLink: 'https://zoom.us/j/1112223333',
  },
];

// Main Component
export default function ExpertSolutionPage() {
  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Consult an Expert</h1>
      <p className="text-lg text-gray-600 mb-12 max-w-3xl">
        Get personalized, one-on-one advice from our team of world-class plant care specialists. Book a video consultation to solve your specific plant problems.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {experts.map(expert => (
          <div key={expert.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row items-center p-6 space-y-4 md:space-y-0 md:space-x-6">
            <div className="flex-shrink-0">
                <Image src={expert.profilePic} alt={expert.name} width={150} height={150} className="rounded-full" data-ai-hint="person portrait" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800">{expert.name}</h2>
              <p className="text-md font-semibold text-primary mt-1">{expert.specialization}</p>
              <div className="flex items-center gap-1 mt-2">
                <Star className="text-yellow-400" size={20} />
                <span className="text-gray-700 font-bold">{expert.rating.toFixed(1)}</span>
              </div>
              <p className="text-gray-600 mt-3">{expert.bio}</p>
              <Link href={expert.zoomLink} target="_blank" rel="noopener noreferrer">
                <div className="mt-4 inline-flex items-center justify-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-transform duration-200 hover:scale-105">
                    <Video size={20} />
                    Schedule Consultation
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
