
"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Video, X, Clock } from 'lucide-react';

// Model
interface Expert {
  id: number;
  name: string;
  specialization: string;
  bio: string;
  profilePic: string;
  googleMeetLink: string;
  availability: string[];
}

// Data
const experts: Expert[] = [
  {
    id: 1,
    name: 'Dr. Evelyn Reed',
    specialization: 'Plant Pathology',
    bio: 'With over 15 years of experience, Dr. Reed is a leading expert in diagnosing and treating plant diseases.',
    profilePic: 'https://placehold.co/150x150.png',
    googleMeetLink: 'https://meet.google.com/abc-def-ghi',
    availability: ['Mon, 10:00 AM - 11:00 AM', 'Wed, 2:00 PM - 3:00 PM', 'Fri, 9:00 AM - 10:00 AM'],
  },
  {
    id: 2,
    name: 'Marcus Thorne',
    specialization: 'Arboriculture & Tree Care',
    bio: 'Marcus is a certified arborist who specializes in the health and maintenance of trees and woody plants.',
    profilePic: 'https://placehold.co/150x150.png',
    googleMeetLink: 'https://meet.google.com/jkl-mno-pqr',
    availability: ['Tue, 11:00 AM - 12:00 PM', 'Thu, 3:00 PM - 4:00 PM'],
  },
  {
    id: 3,
    name: 'Lena Petrova',
    specialization: 'Indoor & Tropical Plants',
    bio: 'Lena has a passion for houseplants and can help you create a thriving indoor jungle, no matter your skill level.',
    profilePic: 'https://placehold.co/150x150.png',
    googleMeetLink: 'https://meet.google.com/stu-vwx-yza',
    availability: ['Mon, 4:00 PM - 5:00 PM', 'Wed, 10:00 AM - 11:00 AM', 'Fri, 1:00 PM - 2:00 PM'],
  },
   {
    id: 4,
    name: 'Samuel Chen',
    specialization: 'Organic Gardening & Soil Health',
    bio: 'Samuel focuses on sustainable and organic practices to help you grow healthy, chemical-free plants.',
    profilePic: 'https://placehold.co/150x150.png',
    googleMeetLink: 'https://meet.google.com/bcd-efg-hij',
    availability: ['Tue, 9:00 AM - 10:00 AM', 'Thu, 1:00 PM - 2:00 PM'],
  },
];

// Main Component
export default function ExpertSolutionPage() {
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);

  const openModal = (expert: Expert) => {
    setSelectedExpert(expert);
  };

  const closeModal = () => {
    setSelectedExpert(null);
  };

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
              <p className="text-gray-600 mt-3">{expert.bio}</p>
              <button 
                onClick={() => openModal(expert)}
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-transform duration-200 hover:scale-105">
                    <Video size={20} />
                    Schedule Consultation
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedExpert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-auto relative">
                 <button onClick={closeModal} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800">
                    <X size={24} />
                 </button>
                 <h2 className="text-2xl font-bold text-gray-800 mb-4">Schedule with {selectedExpert.name}</h2>
                 
                 <div className="space-y-4">
                    <div>
                        <h3 className="font-semibold text-gray-700 mb-2">Available Timings:</h3>
                        <ul className="space-y-2">
                           {selectedExpert.availability.map((slot, index) => (
                                <li key={index} className="flex items-center gap-2 p-2 bg-gray-100 rounded-md">
                                    <Clock size={16} className="text-gray-600"/>
                                    <span className="text-gray-800">{slot}</span>
                                </li>
                           ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-700">Meeting Link:</h3>
                        <p className="text-gray-600">Join the meeting to start your consultation.</p>
                        <Link href={selectedExpert.googleMeetLink} target="_blank" rel="noopener noreferrer">
                           <div className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-600">
                                Join Google Meet
                           </div>
                        </Link>
                    </div>
                 </div>
            </div>
        </div>
      )}

    </div>
  );
}
