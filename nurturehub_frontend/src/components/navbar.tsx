'use client';

import Link from 'next/link';
import { Leaf } from 'lucide-react';
import { logout } from '@/app/login/service';


export function Navbar() {
    const doLogout = async () => {
        await logout();
        window.location.href = '/login';
    }

    const navLinkClasses = "transition-colors text-gray-600 hover:text-gray-900 font-semibold";
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white">
            <div className="container flex h-20 items-center">
                <Link href="/home" className="mr-6 flex items-center space-x-2">
                    <Leaf className="h-8 w-8 text-green-600" />
                    <span className="font-bold text-2xl" style={{ fontFamily: 'sans-serif' }}>NurtureHub</span>
                </Link>
                <nav className="hidden md:flex items-center space-x-6 text-sm ml-6">
                    <Link
                        href="/plant-disease-detection"
                        className={navLinkClasses}
                    >
                        Plant Disease Detection
                    </Link>
                    <Link
                        href="/my-plants"
                        className={navLinkClasses}
                    >
                        My Plants
                    </Link>
                    <Link
                        href="/store"
                        className={navLinkClasses}
                    >
                        Store
                    </Link>
                    <Link
                        href="/marketplace"
                        className={navLinkClasses}
                    >
                        Marketplace
                    </Link>
                    <Link
                        href="/expert-solution"
                        className={navLinkClasses}
                    >
                        Expert Solution
                    </Link>
                    <Link
                        href="/educational-content"
                        className={navLinkClasses}
                    >
                        Educational Content
                    </Link>
                    <Link
                        href="/community"
                        className={navLinkClasses}
                    >
                        Community
                    </Link>
                </nav>
                <div className="flex flex-1 items-center justify-end space-x-2 pr-4">
                    <a href="/dashboard" className={`${navLinkClasses} inline-flex h-10 items-center justify-center`}>
                        Profile
                    </a>
                    <a onClick={doLogout} className={`${navLinkClasses} inline-flex h-10 items-center justify-center cursor-pointer`}>
                        Sign Out
                    </a>
                </div>
            </div>
        </header>
    );
}