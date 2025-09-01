"use client";

import { useState, FormEvent, useEffect } from "react";
import { Mail, Phone, Trash2 } from "lucide-react";
import Image from "next/image";
import { PasswordFormState, userDTO } from "./model";
import {
  changePassword,
  updateUser,
  getSharedPosts,
  deleteSharedPost,
} from "./service";
import { set } from "date-fns";
import { Leaf } from "lucide-react";
import { Post } from "../community/model";
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

interface ProfileInfoFormState {
  name: string;
  email: string;
  phone: string;
}

interface PlantSuggestionQuery {
  experience: "beginner" | "intermediate" | "expert";
  light: "low" | "medium" | "high";
  type: "flower" | "fruit" | "herb";
}

const suggestions = {
  beginner: {
    low: {
      flower: "Peace Lily (Spathiphyllum)",
      fruit: "Alpine Strawberry",
      herb: "Mint",
    },
    medium: {
      flower: "Marigold",
      fruit: "Bush Beans",
      herb: "Basil",
    },
    high: {
      flower: "Sunflower",
      fruit: "Cherry Tomatoes",
      herb: "Rosemary",
    },
  },
  intermediate: {
    low: {
      flower: "Begonia",
      fruit: "Currants",
      herb: "Parsley",
    },
    medium: {
      flower: "Petunia",
      fruit: "Bell Peppers",
      herb: "Cilantro",
    },
    high: {
      flower: "Rose",
      fruit: "Cucumber",
      herb: "Thyme",
    },
  },
  expert: {
    low: {
      flower: "Orchid",
      fruit: "Pawpaw",
      herb: "Chervil",
    },
    medium: {
      flower: "Dahlia",
      fruit: "Eggplant",
      herb: "Tarragon",
    },
    high: {
      flower: "Hibiscus",
      fruit: "Watermelon",
      herb: "Lavender",
    },
  },
};

// Main Dashboard Component
export default function DashboardView(props: Props) {
  const [profileInfo, setProfileInfo] = useState<ProfileInfoFormState>({
    name: "",
    email: "",
    phone: "",
  });
  const profile = props.data.user;

  useEffect(() => {
    setProfileInfo({
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
    });
  }, [profile]);

  const [activeTab, setActiveTab] = useState("profile");
  const [sharedPosts, setSharedPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchSharedPosts = async () => {
      try {
        const result: Post[] = await getSharedPosts();
        result.reverse();
        setSharedPosts(result);
      } catch (err) {
        console.log("Failed to fetch shared posts:", err);
      }
    };
    fetchSharedPosts();
  }, []);

  const [password, setPassword] = useState<PasswordFormState>({});

  const [suggestionQuery, setSuggestionQuery] = useState<PlantSuggestionQuery>({
    experience: "beginner",
    light: "low",
    type: "flower",
  });

  // Controller/Service Logic for Forms
  const handleProfileInfoSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      id: profile.id,
      name: profileInfo.name,
      email: profileInfo.email,
      phone: profileInfo.phone,
    };

    try {
      updateUser(data);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile. Please try again.");
    }

    console.log("Profile info updated:", profileInfo);
  };

  const handlePasswordSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: PasswordFormState = {
      currentPassword: password.currentPassword || "",
      newPassword: password.newPassword || "",
      confirmPassword: password.confirmPassword || "",
    };

    try {
      changePassword(data as PasswordFormState);
      alert("Password changed successfully!");
    } catch (err) {
      console.error("Error changing password:", err);
      alert("Failed to change password. Please try again.");
    }
  };

  const handlePlantSuggestionSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { experience, light, type } = suggestionQuery;
    const suggestion = suggestions[experience][light][type];
    alert(`Try growing: ${suggestion}`);
  };

  const handleDeleteSharedPost = (postId: string) => {
    deleteSharedPost(postId)
      .then(() => {
        setSharedPosts((prev) => prev.filter((post) => post._id !== postId));
        console.log("Deleted shared post:", postId);
        alert("Shared post removed from your profile!");
      })
      .catch((err) => {
        console.error("Failed to delete shared post:", err);
        alert("Failed to delete shared post. Please try again.");
      });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="space-y-8">
            {/* Edit Profile Form */}
            <div className="rounded-lg bg-white shadow-md">
              <div className="border-b border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-800">
                  Edit Profile
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Update your personal information.
                </p>
              </div>
              <div className="p-6">
                <form onSubmit={handleProfileInfoSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={profileInfo.name}
                      onChange={(e) =>
                        setProfileInfo({ ...profileInfo, name: e.target.value })
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={profileInfo.email}
                      onChange={(e) =>
                        setProfileInfo({
                          ...profileInfo,
                          email: e.target.value,
                        })
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={profileInfo.phone}
                      onChange={(e) =>
                        setProfileInfo({
                          ...profileInfo,
                          phone: e.target.value,
                        })
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Update Profile
                  </button>
                </form>
              </div>
            </div>

            {/* Change Password Form */}
            <div className="rounded-lg bg-white shadow-md">
              <div className="border-b border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-800">
                  Change Password
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Update your account password.
                </p>
              </div>
              <div className="p-6">
                <form onSubmit={handlePasswordSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="currentPassword"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Current Password
                    </label>
                    <input
                      type="password"
                      id="currentPassword"
                      value={password.currentPassword || ""}
                      onChange={(e) =>
                        setPassword({
                          ...password,
                          currentPassword: e.target.value,
                        })
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="newPassword"
                      className="block text-sm font-medium text-gray-700"
                    >
                      New Password
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      value={password.newPassword || ""}
                      onChange={(e) =>
                        setPassword({
                          ...password,
                          newPassword: e.target.value,
                        })
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      value={password.confirmPassword || ""}
                      onChange={(e) =>
                        setPassword({
                          ...password,
                          confirmPassword: e.target.value,
                        })
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Change Password
                  </button>
                </form>
              </div>
            </div>
          </div>
        );
      case "posts":
        return (
          <div className="rounded-lg bg-white shadow-md">
            <div className="border-b border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-800">Shared Posts</h2>
              <p className="mt-1 text-sm text-gray-500">
                View and manage your shared posts.
              </p>
            </div>
            <div className="p-6">
              {sharedPosts.length === 0 ? (
                <p className="text-gray-500">
                  You haven't shared any posts yet. Go to the{" "}
                  <a
                    href="/community"
                    className="text-green-600 hover:underline"
                  >
                    community page
                  </a>{" "}
                  to share one!
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sharedPosts.map((post) => (
                    <div
                      key={post._id}
                      className="rounded-lg border border-gray-200 bg-white shadow-sm flex flex-col"
                    >
                      <div className="p-4 flex justify-between items-start">
                        <div>
                          <p className="text-lg font-semibold">
                            {post.userId.name}'s Post
                          </p>
                          <p className="text-xs text-gray-500">
                            Shared on {new Date().toLocaleDateString()}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDeleteSharedPost(post._id)}
                          className="text-gray-400 hover:text-red-500 p-1"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                      <div className="p-4">
                        {post.photo && (
                          <Image
                            src={post.photo}
                            alt="Plant post"
                            width={600}
                            height={400}
                            className="rounded-md"
                          />
                        )}
                        <p className="mt-4 text-sm text-gray-600">
                          {post.content}
                        </p>
                      </div>
                      <div className="border-t border-gray-200 p-4 mt-auto">
                        <p className="text-xs text-gray-500">
                          {post.comments.length} comments, {post.likes} likes
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case "plant-suggestion":
        return (
          <div className="rounded-lg bg-white shadow-md">
            <div className="border-b border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-800">
                Plant Suggestion
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Find the perfect plant for your space and experience level.
              </p>
            </div>
            <div className="p-6">
              <form
                onSubmit={handlePlantSuggestionSubmit}
                className="space-y-8"
              >
                {/* Gardening Experience */}
                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    Gardening Experience
                  </h3>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-x-3">
                      <input
                        id="beginner"
                        name="experience"
                        type="radio"
                        value="beginner"
                        onChange={(e) =>
                          setSuggestionQuery({
                            ...suggestionQuery,
                            experience: e.target
                              .value as PlantSuggestionQuery["experience"],
                          })
                        }
                        checked={suggestionQuery.experience === "beginner"}
                        className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-600"
                      />
                      <label
                        htmlFor="beginner"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Beginner Gardener
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        id="intermediate"
                        name="experience"
                        type="radio"
                        value="intermediate"
                        onChange={(e) =>
                          setSuggestionQuery({
                            ...suggestionQuery,
                            experience: e.target
                              .value as PlantSuggestionQuery["experience"],
                          })
                        }
                        checked={suggestionQuery.experience === "intermediate"}
                        className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-600"
                      />
                      <label
                        htmlFor="intermediate"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Intermediate Gardener
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        id="expert"
                        name="experience"
                        type="radio"
                        value="expert"
                        onChange={(e) =>
                          setSuggestionQuery({
                            ...suggestionQuery,
                            experience: e.target
                              .value as PlantSuggestionQuery["experience"],
                          })
                        }
                        checked={suggestionQuery.experience === "expert"}
                        className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-600"
                      />
                      <label
                        htmlFor="expert"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Expert Gardener
                      </label>
                    </div>
                  </div>
                </div>

                {/* Lighting Condition */}
                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    Lighting Condition
                  </h3>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-x-3">
                      <input
                        id="low-light"
                        name="light"
                        type="radio"
                        value="low"
                        onChange={(e) =>
                          setSuggestionQuery({
                            ...suggestionQuery,
                            light: e.target
                              .value as PlantSuggestionQuery["light"],
                          })
                        }
                        checked={suggestionQuery.light === "low"}
                        className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-600"
                      />
                      <label
                        htmlFor="low-light"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Low Sunlight
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        id="medium-light"
                        name="light"
                        type="radio"
                        value="medium"
                        onChange={(e) =>
                          setSuggestionQuery({
                            ...suggestionQuery,
                            light: e.target
                              .value as PlantSuggestionQuery["light"],
                          })
                        }
                        checked={suggestionQuery.light === "medium"}
                        className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-600"
                      />
                      <label
                        htmlFor="medium-light"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Medium Sunlight
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        id="high-light"
                        name="light"
                        type="radio"
                        value="high"
                        onChange={(e) =>
                          setSuggestionQuery({
                            ...suggestionQuery,
                            light: e.target
                              .value as PlantSuggestionQuery["light"],
                          })
                        }
                        checked={suggestionQuery.light === "high"}
                        className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-600"
                      />
                      <label
                        htmlFor="high-light"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        High Sunlight
                      </label>
                    </div>
                  </div>
                </div>

                {/* Plant Type */}
                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    Plant Type
                  </h3>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-x-3">
                      <input
                        id="flower"
                        name="type"
                        type="radio"
                        value="flower"
                        onChange={(e) =>
                          setSuggestionQuery({
                            ...suggestionQuery,
                            type: e.target
                              .value as PlantSuggestionQuery["type"],
                          })
                        }
                        checked={suggestionQuery.type === "flower"}
                        className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-600"
                      />
                      <label
                        htmlFor="flower"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Flower
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        id="fruit"
                        name="type"
                        type="radio"
                        value="fruit"
                        onChange={(e) =>
                          setSuggestionQuery({
                            ...suggestionQuery,
                            type: e.target
                              .value as PlantSuggestionQuery["type"],
                          })
                        }
                        checked={suggestionQuery.type === "fruit"}
                        className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-600"
                      />
                      <label
                        htmlFor="fruit"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Fruit
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        id="herb"
                        name="type"
                        type="radio"
                        value="herb"
                        onChange={(e) =>
                          setSuggestionQuery({
                            ...suggestionQuery,
                            type: e.target
                              .value as PlantSuggestionQuery["type"],
                          })
                        }
                        checked={suggestionQuery.type === "herb"}
                        className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-600"
                      />
                      <label
                        htmlFor="herb"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Herb
                      </label>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  <Leaf size={16} />
                  Suggest a Plant
                </button>
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
          <img
            src="https://placehold.co/100x100.png"
            alt="User Name"
            className="mx-auto h-24 w-24 rounded-full"
          />
          <h2 className="mt-4 text-xl font-bold text-gray-800">
            {profileInfo.name}
          </h2>
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
              <button
                onClick={() => setActiveTab("profile")}
                className={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium ${
                  activeTab === "profile"
                    ? "border-green-500 text-green-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                Profile
              </button>
              <button
                onClick={() => setActiveTab("posts")}
                className={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium ${
                  activeTab === "posts"
                    ? "border-green-500 text-green-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                Shared Posts
              </button>

              <button
                onClick={() => setActiveTab("plant-suggestion")}
                className={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium ${
                  activeTab === "plant-suggestion"
                    ? "border-green-500 text-green-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                Plant Suggestion
              </button>
            </nav>
          </div>
          <div className="mt-5">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
}
