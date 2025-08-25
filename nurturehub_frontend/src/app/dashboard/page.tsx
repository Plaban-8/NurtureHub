"use client";

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { Mail, Phone, Leaf } from 'lucide-react';
import Image from 'next/image';

// Models
interface ProfileFormState {
  name: string;
  email: string;
  phone: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

interface NotificationsFormState {
  communicationEmails: boolean;
  marketingEmails: boolean;
  socialEmails: boolean;
  securityEmails: boolean;
}

interface PlantPreferencesFormState {
  experienceLevel: 'beginner' | 'intermediate' | 'expert';
  plantTypes: string[];
  lightCondition: 'low' | 'medium' | 'high';
}

const plantTypesOptions = [
    { id: 'flowers', label: 'Flowers' },
    { id: 'succulents', label: 'Succulents' },
    { id: 'ferns', label: 'Ferns' },
    { id: 'herbs', label: 'Herbs' },
    { id: 'vegetables', label: 'Vegetables' },
];

// Main Dashboard Component
export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('profile');

  // State for forms
  const [profile, setProfile] = useState<ProfileFormState>({
    name: 'User Name',
    email: 'user@example.com',
    phone: '123-456-7890',
  });
  const [notifications, setNotifications] = useState<NotificationsFormState>({
    communicationEmails: true,
    marketingEmails: true,
    socialEmails: false,
    securityEmails: true,
  });
  const [plantPreferences, setPlantPreferences] = useState<PlantPreferencesFormState>({
    experienceLevel: 'beginner',
    plantTypes: ['flowers', 'succulents'],
    lightCondition: 'medium',
  });

  // Controller/Service Logic for Forms
  const handleProfileSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Profile updated:", profile);
    alert("Profile updated successfully!");
  };

  const handleNotificationsSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Notifications updated:", notifications);
    alert("Notifications updated successfully!");
  };
  
  const handlePlantPreferencesSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Plant preferences updated:", plantPreferences);
    alert("Plant preferences updated successfully!");
  };

  const handlePlantTypeChange = (plantId: string) => {
    setPlantPreferences(prev => {
        const plantTypes = prev.plantTypes.includes(plantId)
            ? prev.plantTypes.filter(id => id !== plantId)
            : [...prev.plantTypes, plantId];
        return { ...prev, plantTypes };
    });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="rounded-lg bg-white shadow-md">
            <div className="border-b border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-800">Edit Profile</h2>
              <p className="mt-1 text-sm text-gray-500">Update your personal information.</p>
            </div>
            <div className="p-6">
              <form onSubmit={handleProfileSubmit} className="space-y-6">
                {/* Profile Form Fields */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <input type="text" id="name" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" id="email" value={profile.email} onChange={e => setProfile({...profile, email: e.target.value})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                  <input type="tel" id="phone" value={profile.phone} onChange={e => setProfile({...profile, phone: e.target.value})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" />
                </div>
                <h3 className="text-md font-medium pt-4 border-t border-gray-200">Change Password</h3>
                {/* Password fields */}
                <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">Current Password</label>
                    <input type="password" id="currentPassword" onChange={e => setProfile({...profile, currentPassword: e.target.value})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" />
                </div>
                <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                    <input type="password" id="newPassword" onChange={e => setProfile({...profile, newPassword: e.target.value})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" />
                </div>
                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                    <input type="password" id="confirmPassword" onChange={e => setProfile({...profile, confirmPassword: e.target.value})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" />
                </div>

                <button type="submit" className="flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">Update Profile</button>
              </form>
            </div>
          </div>
        );
      case 'posts':
        return (
            <div className="rounded-lg bg-white shadow-md">
                <div className="border-b border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-800">Shared Posts</h2>
                    <p className="mt-1 text-sm text-gray-500">View and manage your shared posts.</p>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="rounded-lg border border-gray-200 bg-white shadow-sm">
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold">My Beautiful Fiddle Leaf Fig</h3>
                                    <p className="text-xs text-gray-500">Posted on {new Date().toLocaleDateString()}</p>
                                </div>
                                <div className="p-4">
                                    <Image src={`https://placehold.co/600x400.png`} alt="Plant post" width={600} height={400} className="rounded-md" />
                                    <p className="mt-4 text-sm text-gray-600">
                                        Just wanted to share a picture of my happy fiddle leaf fig. It's been growing so well!
                                    </p>
                                </div>
                                <div className="border-t border-gray-200 p-4">
                                    <p className="text-xs text-gray-500">3 comments, 15 likes</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
      case 'notifications':
        return (
          <div className="rounded-lg bg-white shadow-md">
            <div className="border-b border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-800">Notifications</h2>
                <p className="mt-1 text-sm text-gray-500">Manage your notification settings.</p>
            </div>
            <div className="p-6">
              <form onSubmit={handleNotificationsSubmit} className="space-y-6">
                {/* Notification Form Fields */}
                <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                        <label htmlFor="communicationEmails" className="text-base font-medium text-gray-900">Communication emails</label>
                        <p className="text-sm text-gray-500">Receive emails about your account activity.</p>
                    </div>
                    <input type="checkbox" id="communicationEmails" checked={notifications.communicationEmails} onChange={e => setNotifications({...notifications, communicationEmails: e.target.checked})} className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500" />
                </div>
                 <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                        <label htmlFor="marketingEmails" className="text-base font-medium text-gray-900">Marketing emails</label>
                        <p className="text-sm text-gray-500">Receive emails about new products, features, and more.</p>
                    </div>
                    <input type="checkbox" id="marketingEmails" checked={notifications.marketingEmails} onChange={e => setNotifications({...notifications, marketingEmails: e.target.checked})} className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500" />
                </div>
                 <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                        <label htmlFor="socialEmails" className="text-base font-medium text-gray-900">Social emails</label>
                        <p className="text-sm text-gray-500">Receive emails for friend requests, follows, and more.</p>
                    </div>
                    <input type="checkbox" id="socialEmails" checked={notifications.socialEmails} onChange={e => setNotifications({...notifications, socialEmails: e.target.checked})} className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500" />
                </div>
                 <div className="flex items-center justify-between rounded-lg border p-4 bg-gray-50">
                    <div>
                        <label htmlFor="securityEmails" className="text-base font-medium text-gray-900">Security emails</label>
                        <p className="text-sm text-gray-500">Receive emails about your account security.</p>
                    </div>
                    <input type="checkbox" id="securityEmails" checked={notifications.securityEmails} disabled className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500" />
                </div>
                <button type="submit" className="flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">Update Notifications</button>
              </form>
            </div>
          </div>
        );
      case 'plant-preferences':
        return (
          <div className="rounded-lg bg-white shadow-md">
             <div className="border-b border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-800">Plant Preferences</h2>
                <p className="mt-1 text-sm text-gray-500">Set your preferences for plant care and recommendations.</p>
            </div>
            <div className="p-6">
              <form onSubmit={handlePlantPreferencesSubmit} className="space-y-8">
                 {/* Plant Preferences Form Fields */}
                 <div>
                    <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700">Gardening Experience</label>
                    <select id="experienceLevel" value={plantPreferences.experienceLevel} onChange={e => setPlantPreferences({...plantPreferences, experienceLevel: e.target.value as any})} className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm">
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="expert">Expert</option>
                    </select>
                 </div>
                 <div>
                    <label className="text-base font-medium text-gray-900">Favorite Plant Types</label>
                    <p className="text-sm text-gray-500">Select the types of plants you are most interested in.</p>
                    <div className="mt-4 space-y-4">
                        {plantTypesOptions.map(plant => (
                            <div key={plant.id} className="flex items-center">
                                <input id={plant.id} type="checkbox" checked={plantPreferences.plantTypes.includes(plant.id)} onChange={() => handlePlantTypeChange(plant.id)} className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500" />
                                <label htmlFor={plant.id} className="ml-3 block text-sm font-medium text-gray-700">{plant.label}</label>
                            </div>
                        ))}
                    </div>
                 </div>
                <div>
                    <label htmlFor="lightCondition" className="block text-sm font-medium text-gray-700">Typical Light Conditions</label>
                    <select id="lightCondition" value={plantPreferences.lightCondition} onChange={e => setPlantPreferences({...plantPreferences, lightCondition: e.target.value as any})} className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm">
                        <option value="low">Low Light</option>
                        <option value="medium">Medium / Indirect Light</option>
                        <option value="high">High / Direct Light</option>
                    </select>
                </div>

                <button type="submit" className="flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">Update Preferences</button>
              </form>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Main View
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="lg:col-span-1">
        <div className="rounded-lg bg-white p-6 text-center shadow-md">
          <img src="https://placehold.co/100x100.png" alt="User Name" className="mx-auto h-24 w-24 rounded-full" />
          <h2 className="mt-4 text-xl font-bold text-gray-800">User Name</h2>
          <div className="mt-4 space-y-2 text-left text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Mail className="h-4 w-4 text-gray-400" />
              <span>user@example.com</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Phone className="h-4 w-4 text-gray-400" />
              <span>123-456-7890</span>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:col-span-3">
        <div className="w-full">
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    <button onClick={() => setActiveTab('profile')} className={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'profile' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}>Profile</button>
                    <button onClick={() => setActiveTab('posts')} className={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'posts' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}>Shared Posts</button>
                    <button onClick={() => setActiveTab('notifications')} className={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'notifications' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}>Notifications</button>
                    <button onClick={() => setActiveTab('plant-preferences')} className={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'plant-preferences' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}>Plant Preferences</button>
                </nav>
            </div>
            <div className="mt-5">
              {renderTabContent()}
            </div>
        </div>
      </div>
    </div>
  );
}
