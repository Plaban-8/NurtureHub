
'use client';

import Link from 'next/link';
import { Leaf, LogOut } from 'lucide-react';
import { Button } from './ui/button';

export function Navbar() {
  const navLinkClasses = "transition-colors text-foreground/80 hover:text-foreground font-semibold";
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Leaf className="h-8 w-8 text-primary" />
          <span className="font-bold font-headline text-2xl">NurtureHub</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm ml-6">
          <Link
            href="/plant-disease-detection"
            className={navLinkClasses}
          >
            Plant Disease Detection
          </Link>
          <Link
            href="#"
            className={navLinkClasses}
          >
            My Plants
          </Link>
           <Link
            href="#"
            className={navLinkClasses}
          >
            Store
          </Link>
           <Link
            href="#"
            className={navLinkClasses}
          >
            Marketplace
          </Link>
           <Link
            href="#"
            className={navLinkClasses}
          >
            Expert Solution
          </Link>
           <Link
            href="#"
            className={navLinkClasses}
          >
            Educational Content
          </Link>
          <Link
            href="#"
            className={navLinkClasses}
          >
            Community
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
           <Button variant="ghost" className={navLinkClasses} asChild>
              <Link href="/dashboard">Profile</Link>
           </Button>
           <Button variant="ghost" className={navLinkClasses} asChild>
              <Link href="/login">Sign Out</Link>
           </Button>
        </div>
      </div>
    </header>
  );
}
