import React from "react";
import { X } from "lucide-react";
import { Logo } from "./ui/Logo";
import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-6">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Logo />
          </Link>
        </div>

        {/* Content */}
      </div>
      {children}
    </div>
  );
}
