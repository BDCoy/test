/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { signInWithPassword } from "@/utils/auth-helpers/server";
import { handleRequest } from "@/utils/auth-helpers/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Button from "../../Button";

import Separator from "./Separator";
import OauthSignIn from "./OauthSignIn";

interface PasswordSignInProps {
  redirectMethod: string;
}

export default function PasswordSignIn({
  redirectMethod,
}: PasswordSignInProps) {
  const router = redirectMethod === "client" ? useRouter() : null;
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true); // Disable the button while the request is being handled
    await handleRequest(e, signInWithPassword, router);
    setIsSubmitting(false);
  };

  return (
    <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Header Section */}
        <div
          className="text-center animate-fade-down animate-once animate-duration-500"
          style={{ animationDelay: "100ms" }}
        >
          <h2 className="text-3xl font-extrabold text-upwork-gray">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-upwork-gray-light">
            Don&apos;t have an account?{" "}
            <Link
              href="/signin/signup"
              className="font-medium text-green-600 hover:text-green-500 transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-sm rounded-xl sm:px-10 border border-gray-100">
            <form
              noValidate={true}
              onSubmit={(e) => handleSubmit(e)}
              className="space-y-6"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link
                    href="/signin/forgot_password"
                    className="font-medium text-green-600 hover:text-green-500"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div className="w-full bg-red-100">
                <Button type="submit" variant="primary" size="md" fullWidth>
                  Sign in
                </Button>
              </div>
            </form>

            <div
              className="mt-6 animate-fade-down animate-once animate-duration-500"
              style={{ animationDelay: "300ms" }}
            >
              <Separator text="Or continue with" />
              <OauthSignIn />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
