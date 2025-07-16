"use client"

import Link from "next/link"
import { Leaf } from "lucide-react"
import { createUserWithEmailAndPassword, signInWithRedirect } from "firebase/auth"
import { auth, googleProvider } from "@/lib/firebase"
import { FormEvent } from "react"

// Model
interface SignupFormInputs {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Controller/Service
export default function SignupPage() {
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      fullName: { value: string };
      email: { value: string };
      password: { value: string };
      confirmPassword: { value: string };
    };
    const data: SignupFormInputs = {
      fullName: target.fullName.value,
      email: target.email.value,
      password: target.password.value,
      confirmPassword: target.confirmPassword.value,
    };

    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      // This is the service logic
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      // Handle successful signup, e.g., redirect
      console.log("User created successfully");
      window.location.href = "/dashboard"; // Example redirect
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Signup failed. Please try again.");
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signInWithRedirect(auth, googleProvider);
    } catch (error) {
      console.error("Google signup failed:", error);
    }
  };

  // View
  return (
    <main 
      className="flex min-h-screen flex-col items-center justify-center p-4 font-sans"
      style={{ backgroundColor: "#F2FCF3" }}
    >
      <div className="w-full max-w-md rounded-lg bg-white shadow-2xl">
        <div className="p-6 text-center">
          <div className="mb-2 flex items-center justify-center">
            <Leaf className="h-8 w-8 text-green-600" />
            <h1 className="ml-2 text-4xl font-bold text-gray-800" style={{ fontFamily: 'sans-serif' }}>
              NurtureHub
            </h1>
          </div>
          <p className="text-gray-500">
            Create an account to start your journey.
          </p>
        </div>
        <div className="p-6">
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                id="fullName"
                type="text"
                placeholder="Name"
                required
                className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                required
                className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                required
                className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Create Account
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">
                Or sign up with
              </span>
            </div>
          </div>

          <button
            onClick={handleGoogleSignup}
            className="flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
          >
            Sign up with Google
          </button>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-green-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
