'use client';

import Link from 'next/link';
import { Leaf } from 'lucide-react';
import { logout } from '@/app/login/service';

import { useState } from 'react';


export function Navbar() {
    const doLogout = async () => {
        await logout();
        window.location.href = '/login';
    }

    const navLinkClasses = "transition-colors text-gray-600 hover:text-gray-900 font-semibold";
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white">
            <div className="container flex h-20 items-center justify-between">
                {/* Left: Logo */}
                <Link href="/home" className="mr-6 flex items-center space-x-2">
                    <Leaf className="h-8 w-8 text-green-600" />
                    <span className="font-bold text-2xl" style={{ fontFamily: 'sans-serif' }}>NurtureHub</span>
                </Link>
                {/* Center: Nav links (desktop) */}
                <nav className="hidden md:flex items-center space-x-6 text-sm ml-6 flex-1">
                    <Link href="/plant-disease-detection" className={navLinkClasses}>Plant Disease Detection</Link>
                    <Link href="/my-plants" className={navLinkClasses}>My Plants</Link>
                    <Link href="/store" className={navLinkClasses}>Store</Link>
                    <Link href="/marketplace" className={navLinkClasses}>Marketplace</Link>
                    <Link href="/expert-solution" className={navLinkClasses}>Expert Solution</Link>
                    <Link href="/educational-content" className={navLinkClasses}>Educational Content</Link>
                    <Link href="/community" className={navLinkClasses}>Community</Link>
                </nav>
                {/* Right: Profile/Sign Out (always visible) & Hamburger (mobile) */}
                <div className="flex items-center space-x-2">
                    <a href="/dashboard" className={`${navLinkClasses} inline-flex h-10 items-center justify-center`}>
                        Profile
                    </a>
                    <a onClick={doLogout} className={`${navLinkClasses} inline-flex h-10 items-center justify-center cursor-pointer`}>
                        Sign Out
                    </a>
                    <button
                        className="md:hidden flex items-center ml-2"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                            />
                        </svg>
                    </button>
                </div>
            </div>
            {/* Mobile menu */}
            {menuOpen && (
                <div className="md:hidden px-4 pb-4 space-y-2">
                    <Link href="/plant-disease-detection" className="block">Plant Disease Detection</Link>
                    <Link href="/my-plants" className="block">My Plants</Link>
                    <Link href="/store" className="block">Store</Link>
                    <Link href="/marketplace" className="block">Marketplace</Link>
                    <Link href="/expert-solution" className="block">Expert Solution</Link>
                    <Link href="/educational-content" className="block">Educational Content</Link>
                    <Link href="/community" className="block">Community</Link>
                </div>
            )}
        </header>
    );
}
