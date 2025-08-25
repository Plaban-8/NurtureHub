"use client";

import Link from "next/link";
import { Leaf } from "lucide-react";
import { FormEvent } from "react";
import { LoginDTO } from "./model";
import { login } from "./service";

export default function LoginPage() {
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: LoginDTO = {
      email: (e.target as any).email.value,
      password: (e.target as any).password.value,
    };

    try {
      await login(data);
      alert("Login successful.");
      window.location.href = "/";
    } catch (error) {
      alert("Login Failed");
    }
  };

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center p-4 font-sans"
      style={{ backgroundColor: "#F2FCF3" }}
    >
      <div className="w-full max-w-md rounded-lg bg-white shadow-2xl">
        <div className="p-6 text-center">
          <div className="mb-2 flex items-center justify-center">
            <Leaf className="h-8 w-8 text-green-600" />
            <h1
              className="ml-2 text-4xl font-bold text-gray-800"
              style={{ fontFamily: "sans-serif" }}
            >
              NurtureHub
            </h1>
          </div>
          <p className="text-gray-500">Sign in to your account.</p>
        </div>
        <div className="p-6">
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                required
                className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm text-black"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm text-black"
              />
            </div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Sign In
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">
                Or sign in with
              </span>
            </div>
          </div>

          <button className="flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50">
            Sign in with Google
          </button>

          <p className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-green-600 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
