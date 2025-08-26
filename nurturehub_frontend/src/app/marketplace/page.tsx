"use client";

import { useState, useRef, ChangeEvent, FormEvent, useEffect } from "react";
import Image from "next/image";
import { PlusCircle, Upload, X, Trash2 } from "lucide-react";

// Models
interface Listing {
  id: number;
  title: string;
  price?: string;
  seller: string;
  image: string;
  description: string;
  email: string;
  phone: string;
}

// Data (simulating a database fetch)
const initialListings: Listing[] = [
  {
    id: 1,
    title: "Rare Variegated Monstera Albo",
    price: "$250",
    seller: "Jane Doe",
    image: "https://placehold.co/600x400.png",
    description:
      "Beautifully variegated Monstera Albo cutting with strong aerial roots. A collector's dream!",
    email: "jane.doe@example.com",
    phone: "123-456-7890",
  },
  {
    id: 2,
    title: "Spider Plant Babies",
    price: "Free",
    seller: "John Smith",
    image: "https://placehold.co/600x400.png",
    description:
      "Have a dozen healthy spider plant babies to give away. Perfect for beginners!",
    email: "john.smith@example.com",
    phone: "234-567-8901",
  },
  {
    id: 3,
    title: "Seeking: String of Pearls",
    price: "N/A",
    seller: "Lena Petrova",
    image: "https://placehold.co/600x400.png",
    description:
      "Looking for a healthy String of Pearls plant, willing to trade or buy. Please reach out!",
    email: "lena.petrova@example.com",
    phone: "345-678-9012",
  },
  {
    id: 4,
    title: "Pothos Cuttings (Golden & Neon)",
    price: "$15",
    seller: "Samuel Chen",
    image: "https://placehold.co/600x400.png",
    description:
      "Rooted cuttings available for both Golden and Neon Pothos. Easy to care for.",
    email: "samuel.chen@example.com",
    phone: "456-789-0123",
  },
  {
    id: 5,
    title: "Lavender Seedlings",
    price: "Free",
    seller: "Maria Garcia",
    image: "https://placehold.co/600x400.png",
    description:
      "A few lavender seedlings ready for a new home. They need lots of sun!",
    email: "maria.garcia@example.com",
    phone: "567-890-1234",
  },
  {
    id: 6,
    title: "Large Fiddle Leaf Fig",
    price: "$75",
    seller: "Chris Thompson",
    image: "https://placehold.co/600x400.png",
    description:
      "Moving and can't take my beloved 5ft Fiddle Leaf Fig with me. It's healthy and comes with the pot.",
    email: "chris.thompson@example.com",
    phone: "678-901-2345",
  },
];

// Main Component
export default function MarketplacePage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Simulate fetching data from a backend API
    // In a real app, this would be an API call e.g., fetch('/api/listings')
    setListings(initialListings);
  }, []);

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhoto(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const triggerPhotoUpload = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title || !description || !photo) {
      alert("Please fill out the title and description, and upload a photo.");
      return;
    }

    const newListing: Listing = {
      id: Date.now(), // Use a temporary unique ID
      title,
      description,
      price: price || "Free",
      image: photo,
      seller: "User Name", // Replace with actual logged-in user
      email: "user@example.com", // Replace with actual logged-in user email
      phone: "123-123-1234", // Replace with actual logged-in user phone
    };

    // Simulate sending data to a backend
    // In a real app, this would be a POST request e.g., fetch('/api/listings', { method: 'POST', body: JSON.stringify(newListing) })
    // The backend would then return the created listing, which you'd add to the state.
    setListings((prevListings) => [newListing, ...prevListings]);

    // Reset form
    setTitle("");
    setDescription("");
    setPrice("");
    setPhoto(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setIsCreating(false);
  };

  const handleContactClick = (listing: Listing) => {
    setSelectedListing(listing);
  };

  const closeModal = () => {
    setSelectedListing(null);
  };

  const handleDelete = (id: number) => {
    setListings(listings.filter((listing) => listing.id !== id));
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Marketplace</h1>
        <button
          onClick={() => setIsCreating(!isCreating)}
          className="flex items-center justify-center gap-2 rounded-full bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700"
        >
          <PlusCircle size={20} />
          {isCreating ? "Cancel" : "Create Listing"}
        </button>
      </div>

      {isCreating && (
        <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Create New Listing
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <input
                type="text"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Leave blank for 'Free'"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Photo
              </label>
              <div
                onClick={triggerPhotoUpload}
                className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 cursor-pointer hover:border-green-500"
              >
                <div className="text-center">
                  {photo ? (
                    <Image
                      src={photo}
                      alt="Preview"
                      width={200}
                      height={200}
                      className="mx-auto h-32 w-32 object-cover rounded-lg"
                    />
                  ) : (
                    <>
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-4 text-sm text-gray-600">
                        Click to upload a photo
                      </p>
                    </>
                  )}
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                onChange={handlePhotoUpload}
                accept="image/*"
                className="hidden"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700"
              >
                Create Listing
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
          >
            <div className="relative h-56 w-full">
              <Image
                src={listing.image}
                alt={listing.title}
                layout="fill"
                objectFit="cover"
                data-ai-hint="plant sale"
              />
            </div>
            <div className="p-6 flex-grow flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-bold text-gray-800 pr-2 flex-1">
                  {listing.title}
                </h2>
                <button
                  onClick={() => handleDelete(listing.id)}
                  className="text-gray-400 hover:text-red-500 p-1"
                >
                  <Trash2 size={20} />
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Listed by {listing.seller}
              </p>
              <p className="text-gray-700 mt-2 flex-grow">
                {listing.description}
              </p>
              <div className="flex justify-between items-center mt-4">
                <p className="text-lg font-semibold text-primary">
                  {listing.price || "Free"}
                </p>
                <button
                  onClick={() => handleContactClick(listing)}
                  className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/90"
                >
                  Contact
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedListing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Contact {selectedListing.seller}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-800"
              >
                <X size={24} />
              </button>
            </div>
            <div>
              <p className="text-gray-700">
                You can contact the seller using the details below:
              </p>
              <div className="mt-4 space-y-2">
                <p>
                  <strong>Email:</strong> {selectedListing.email}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedListing.phone}
                </p>
              </div>
            </div>
            <div className="mt-6 text-right">
              <button
                onClick={closeModal}
                className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
