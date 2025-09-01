
"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';

// Models
interface StoreItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface CartItem extends StoreItem {
  quantity: number;
}

interface CartPanelProps {
  cartItems: CartItem[];
  isCartOpen: boolean;
  onClose: () => void;
  onQuantityChange: (itemId: number, delta: number) => void;
  onRemoveItem: (itemId: number) => void;
}


// Data
const storeItems: StoreItem[] = [
  {
    id: 1,
    name: 'Premium Potting Mix',
    price: 2500,
    image: 'https://placehold.co/600x400.png',
    category: 'Soil & Fertilizers',
  },
  {
    id: 2,
    name: 'Ceramic Planter Pot',
    price: 3500,
    image: 'https://placehold.co/600x400.png',
    category: 'Pots & Planters',
  },
  {
    id: 3,
    name: 'Gardening Tool Set',
    price: 4500,
    image: 'https://placehold.co/600x400.png',
    category: 'Tools & Accessories',
  },
  {
    id: 4,
    name: 'Organic Plant Food',
    price: 1850,
    image: 'https://placehold.co/600x400.png',
    category: 'Soil & Fertilizers',
  },
  {
    id: 5,
    name: 'Modern Watering Can',
    price: 2200,
    image: 'https://placehold.co/600x400.png',
    category: 'Tools & Accessories',
  },
  {
    id: 6,
    name: 'Hanging Planter Basket',
    price: 3000,
    image: 'https://placehold.co/600x400.png',
    category: 'Pots & Planters',
  },
];


// Cart Panel Component
const CartPanel: React.FC<CartPanelProps> = ({ cartItems, isCartOpen, onClose, onQuantityChange, onRemoveItem }) => {
    const subtotal = useMemo(() => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    }, [cartItems]);

    return (
        <>
            {/* Overlay */}
            <div 
                className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            ></div>

            {/* Panel */}
            <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b">
                        <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                            <X size={24} />
                        </button>
                    </div>

                    {/* Items */}
                    <div className="flex-grow overflow-y-auto p-6">
                        {cartItems.length === 0 ? (
                            <div className="text-center text-gray-500 mt-10">
                                <ShoppingCart size={48} className="mx-auto mb-4" />
                                <p>Your cart is empty.</p>
                            </div>
                        ) : (
                            <ul className="space-y-6">
                                {cartItems.map(item => (
                                    <li key={item.id} className="flex items-start gap-4">
                                        <Image src={item.image} alt={item.name} width={80} height={80} className="w-20 h-20 object-cover rounded-md" />
                                        <div className="flex-grow">
                                            <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                            <p className="text-sm text-gray-500">{item.price} BDT</p>
                                            <div className="flex items-center mt-2">
                                                <button onClick={() => onQuantityChange(item.id, -1)} className="p-1 rounded-full border hover:bg-gray-100"><Minus size={16} /></button>
                                                <span className="px-3 font-semibold">{item.quantity}</span>
                                                <button onClick={() => onQuantityChange(item.id, 1)} className="p-1 rounded-full border hover:bg-gray-100"><Plus size={16} /></button>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-gray-800">{(item.price * item.quantity)} BDT</p>
                                            <button onClick={() => onRemoveItem(item.id)} className="text-red-500 hover:text-red-700 mt-2 text-sm">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    
                    {/* Footer */}
                    {cartItems.length > 0 && (
                        <div className="p-6 border-t">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-lg font-semibold text-gray-600">Subtotal</span>
                                <span className="text-2xl font-bold text-gray-800">{subtotal} BDT</span>
                            </div>
                            <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                                Proceed to Checkout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};


// Main Page Component
export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (item: StoreItem) => {
    setCartItems(prevItems => {
        const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            return prevItems.map(cartItem =>
                cartItem.id === item.id
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
            );
        }
        return [...prevItems, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };
  
  const handleQuantityChange = (itemId: number, delta: number) => {
      setCartItems(prevItems => {
          const updatedItems = prevItems.map(item =>
              item.id === itemId
                  ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                  : item
          );
          return updatedItems;
      });
  };
  
  const handleRemoveItem = (itemId: number) => {
      setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };
  
  const totalCartItems = useMemo(() => {
      return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);


  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <main className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="flex justify-between items-center mb-12">
            <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Our Store</h1>
                <p className="text-lg text-gray-600 mt-2">Quality supplies for every plant enthusiast.</p>
            </div>
            <button onClick={() => setIsCartOpen(true)} className="relative p-2 rounded-full hover:bg-gray-100">
                <ShoppingCart className="text-gray-700 h-8 w-8"/>
                {totalCartItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        {totalCartItems}
                    </span>
                )}
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {storeItems.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="relative h-64 w-full">
                  <Image src={item.image} alt={item.name} fill className="w-full h-full object-cover" data-ai-hint="plant product" />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                      <button 
                          onClick={() => handleAddToCart(item)}
                          className="flex items-center justify-center gap-2 rounded-md bg-white text-gray-800 px-6 py-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-105"
                      >
                          <ShoppingCart size={20} />
                          Add to Cart
                      </button>
                  </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-green-600 font-semibold">{item.category}</p>
                <h2 className="text-xl font-bold text-gray-800 mt-1">{item.name}</h2>
                <p className="text-lg text-gray-700 mt-2">{item.price} BDT</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <CartPanel 
        cartItems={cartItems}
        isCartOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onQuantityChange={handleQuantityChange}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
}
