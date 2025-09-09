"use client";

import { Leaf } from "lucide-react";
import Link from "next/link";
import { FormEvent } from "react";
import { RegisterDTO } from "./model";
import { signUpService } from "./service";

import { AuroraBackground } from "@/components/ui/aurora-background";

export default function SignupPage() {
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: RegisterDTO = {
      name: (e.target as any).fullName.value,
      email: (e.target as any).email.value,
      phone: (e.target as any).phone.value,
      password: (e.target as any).password.value,
      confirmPassword: (e.target as any).confirmPassword.value,
    };

    try {
      if (data.password != data.confirmPassword) {
        alert("Password does not match.");
      }
      await signUpService(data);
      window.location.href = "/login";
    } catch (err) {
      alert(err);
    }
  };

  return (
    <AuroraBackground>
      <div className="w-full max-w-md rounded-lg bg-white/90 dark:bg-zinc-800/90 shadow-2xl backdrop-blur-sm">
        <div className="p-6 text-center">
          <div className="mb-2 flex items-center justify-center">
            <Leaf className="h-8 w-8 text-green-600" />
            <h1
              className="ml-2 text-4xl font-bold text-gray-800 dark:text-gray-100"
              style={{ fontFamily: "sans-serif" }}
            >
              NurtureHub
            </h1>
          </div>
          <p className="text-gray-500 dark:text-gray-400">
            Create an account to start your journey.
          </p>
        </div>
        <div className="p-6">
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="Name"
                required
                className="mt-1 block w-full appearance-none rounded-md border border-gray-300 bg-white/50 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm dark:border-zinc-600 dark:bg-zinc-700/50 dark:text-white dark:placeholder-gray-500"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                required
                className="mt-1 block w-full appearance-none rounded-md border border-gray-300 bg-white/50 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm dark:border-zinc-600 dark:bg-zinc-700/50 dark:text-white dark:placeholder-gray-500"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Phone
              </label>
              <input
                id="phone"
                type="phone"
                placeholder="xxxxxxxxxxx"
                required
                className="mt-1 block w-full appearance-none rounded-md border border-gray-300 bg-white/50 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm dark:border-zinc-600 dark:bg-zinc-700/50 dark:text-white dark:placeholder-gray-500"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                className="mt-1 block w-full appearance-none rounded-md border border-gray-300 bg-white/50 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm dark:border-zinc-600 dark:bg-zinc-700/50 dark:text-white dark:placeholder-gray-500"
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                required
                className="mt-1 block w-full appearance-none rounded-md border border-gray-300 bg-white/50 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm dark:border-zinc-600 dark:bg-zinc-700/50 dark:text-white dark:placeholder-gray-500"
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
              <span className="w-full border-t border-gray-300 dark:border-zinc-600" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white/90 px-2 text-gray-500 dark:bg-zinc-800/90 dark:text-gray-400">
                Or sign up with
              </span>
            </div>
          </div>

          <button className="flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50 dark:border-zinc-600 dark:bg-zinc-700 dark:text-gray-300 dark:hover:bg-zinc-600">
            Sign up with Google
          </button>

          <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-green-600 hover:underline dark:text-green-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </AuroraBackground>
  );
}
