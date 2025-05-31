import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  const isAuthenticated = false;
  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center justify-center h-8 w-8 bg-green-600 rounded-full text-white">
        <ArrowUpRight className="h-5 w-5 transform rotate-12" />
      </div>
      <span className="text-xl font-bold text-gray-900">UpHero</span>
    </div>
  );
}
