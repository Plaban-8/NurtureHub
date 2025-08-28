
"use client";

import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';

// Models
interface StoreItem {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
}


// Data
const storeItems: StoreItem[] = [
  {
    id: 1,
    name: 'Premium Potting Mix',
    price: '$25.00',
    image: 'https://placehold.co/600x400.png',
    category: 'Soil & Fertilizers',
  },
  {
    id: 2,
    name: 'Ceramic Planter Pot (Medium)',
    price: '$35.00',
    image: 'https://placehold.co/600x400.png',
    category: 'Pots & Planters',
  },
  {
    id: 3,
    name: 'Gardening Tool Set',
    price: '$45.00',
    image: 'https://placehold.co/600x400.png',
    category: 'Tools & Accessories',
  },
  {
    id: 4,
    name: 'Organic Plant Food',
    price: '$18.50',
    image: 'https://placehold.co/600x400.png',
    category: 'Soil & Fertilizers',
  },
  {
    id: 5,
    name: 'Watering Can',
    price: '$22.00',
    image: 'https://placehold.co/600x400.png',
    category: 'Tools & Accessories',
  },
  {
    id: 6,
    name: 'Hanging Planter Basket',
    price: '$30.00',
    image: 'https://placehold.co/600x400.png',
    category: 'Pots & Planters',
  },
];

// Main Component
export default function StorePage() {

  const handleAddToCart = (item: StoreItem) => {
    // In a real application, you would add the item to a cart state
    // For now, we'll just show an alert
    alert(`${item.name} added to cart!`);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">Our Store</h1>
        <p className="text-lg text-gray-600 mt-2">Quality supplies for every plant enthusiast.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {storeItems.map(item => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden group">
            <div className="relative h-64 w-full">
               <Image src={item.image} alt={item.name} layout="fill" objectFit="cover" data-ai-hint="gardening supply" />
               <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                    <button 
                        onClick={() => handleAddToCart(item)}
                        className="flex items-center justify-center gap-2 rounded-md bg-white text-gray-800 px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                        <ShoppingCart size={20} />
                        Add to Cart
                    </button>
               </div>
            </div>
            <div className="p-6">
              <p className="text-sm text-primary font-semibold">{item.category}</p>
              <h2 className="text-xl font-bold text-gray-800 mt-1">{item.name}</h2>
              <p className="text-lg text-gray-700 mt-2">{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
