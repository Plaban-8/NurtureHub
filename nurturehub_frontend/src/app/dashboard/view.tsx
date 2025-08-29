
"use client";

import { useState, FormEvent, useEffect } from 'react';
import { Mail, Phone, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { userDTO } from './model';

// Models

interface Props {
  data: {
    user: userDTO;
  };
}
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

interface ProfileInfoFormState {
  name: string;
  email: string;
  phone: string;
}

interface PasswordFormState {
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

const staticSharedPosts: Post[] = [
    {
        id: 99,
        author: 'Jane Doe',
        authorAvatar: 'https://placehold.co/100x100.png',
        content: 'My monstera is finally putting out a new leaf! So exciting! 🌱',
        image: 'https://placehold.co/600x400.png',
        likes: 42,
        comments: [],
        shares: 3,
        timestamp: '2h ago'
    }
];

// Main Dashboard Component
export default function DashboardView(props: Props) {
    const [profileInfo, setProfileInfo] = useState<ProfileInfoFormState>({
        name: "",
        email: "",
        phone: ""
    });
    const profile = props.data.user;

    useEffect(() => {
        setProfileInfo({
            name: profile.name,
            email: profile.email,
            phone: profile.phone
        });
    }, [profile]);
    

  const [activeTab, setActiveTab] = useState('profile');
  const [sharedPosts, setSharedPosts] = useState<Post[]>([]);

  useEffect(() => {
    // TODO: Fetch shared posts from your backend API
    // For now, we use static data as a placeholder.
    setSharedPosts(staticSharedPosts);
  }, []);

  // State for forms
  
  const [password, setPassword] = useState<PasswordFormState>({});
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
  const handleProfileInfoSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
        name: profileInfo.name,
        email: profileInfo.email,
        phone: profileInfo.phone
    }
    
    // TODO: Add API call to update user profile info
    console.log("Profile info updated:", profileInfo);
    alert("Profile information updated successfully!");
  };
  
  const handlePasswordSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password.newPassword !== password.confirmPassword) {
      alert("New passwords do not match.");
      return;
    }
    // TODO: Add API call to update user password
    //console.log("Password change requested for:", profileInfo.email);
    alert("Password updated successfully!");
    setPassword({}); // Reset password form
  };

  const handleNotificationsSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Add API call to update notification settings
    console.log("Notifications updated:", notifications);
    alert("Notifications updated successfully!");
  };
  
  const handlePlantPreferencesSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Add API call to update plant preferences
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

  const handleDeleteSharedPost = (postId: number) => {
    // TODO: Add API call to delete the shared post from the user's profile
    setSharedPosts(prev => prev.filter(post => post.id !== postId));
    console.log("Deleted shared post:", postId);
    alert("Shared post removed from your profile!");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-8">
            {/* Edit Profile Form */}
            <div className="rounded-lg bg-white shadow-md">
              <div className="border-b border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-800">Edit Profile</h2>
                <p className="mt-1 text-sm text-gray-500">Update your personal information.</p>
              </div>
              <div className="p-6">
                <form onSubmit={handleProfileInfoSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input type="text" id="name" value={profileInfo.name} onChange={e => setProfileInfo({...profileInfo, name: e.target.value})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" id="email" value={profileInfo.email} onChange={e => setProfileInfo({...profileInfo, email: e.target.value})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                    <input type="tel" id="phone" value={profileInfo.phone} onChange={e => setProfileInfo({...profileInfo, phone: e.target.value})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" />
                  </div>
                  <button type="submit" className="flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">Update Profile</button>
                </form>
              </div>
            </div>

            {/* Change Password Form */}
            <div className="rounded-lg bg-white shadow-md">
              <div className="border-b border-gray-200 p-6">
                  <h2 className="text-xl font-bold text-gray-800">Change Password</h2>
                  <p className="mt-1 text-sm text-gray-500">Update your account password.</p>
              </div>
              <div className="p-6">
                <form onSubmit={handlePasswordSubmit} className="space-y-6">
                  <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">Current Password</label>
                      <input type="password" id="currentPassword" value={password.currentPassword || ''} onChange={e => setPassword({...password, currentPassword: e.target.value})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" />
                  </div>
                  <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                      <input type="password" id="newPassword" value={password.newPassword || ''} onChange={e => setPassword({...password, newPassword: e.target.value})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" />
                  </div>
                  <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                      <input type="password" id="confirmPassword" value={password.confirmPassword || ''} onChange={e => setPassword({...password, confirmPassword: e.target.value})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" />
                  </div>
                  <button type="submit" className="flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">Change Password</button>
                </form>
              </div>
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
                    {sharedPosts.length === 0 ? (
                        <p className="text-gray-500">You haven't shared any posts yet. Go to the <a href="/community" className="text-green-600 hover:underline">community page</a> to share one!</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {sharedPosts.map((post) => (
                                <div key={post.id} className="rounded-lg border border-gray-200 bg-white shadow-sm flex flex-col">
                                    <div className="p-4 flex justify-between items-start">
                                      <div>
                                        <h3 className="text-lg font-semibold">{post.author}'s Post</h3>
                                        <p className="text-xs text-gray-500">Shared on {new Date().toLocaleDateString()}</p>
                                      </div>
                                      <button onClick={() => handleDeleteSharedPost(post.id)} className="text-gray-400 hover:text-red-500 p-1">
                                          <Trash2 size={20} />
                                      </button>
                                    </div>
                                    <div className="p-4">
                                        {post.image && <Image src={post.image} alt="Plant post" width={600} height={400} className="rounded-md" />}
                                        <p className="mt-4 text-sm text-gray-600">
                                            {post.content}
                                        </p>
                                    </div>
                                    <div className="border-t border-gray-200 p-4 mt-auto">
                                        <p className="text-xs text-gray-500">{post.comments.length} comments, {post.likes} likes</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
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
          <h2 className="mt-4 text-xl font-bold text-gray-800">{profileInfo.name}</h2>
          <div className="mt-4 space-y-2 text-left text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Mail className="h-4 w-4 text-gray-400" />
              <span>{profileInfo.email}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Phone className="h-4 w-4 text-gray-400" />
              <span>{profileInfo.phone}</span>
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
