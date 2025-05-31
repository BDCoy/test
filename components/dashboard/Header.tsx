import React from "react";

interface HeaderProps {
  userName: string;
}

const Header: React.FC<HeaderProps> = ({ userName }) => {
  return (
    <header className="animate-fadeIn">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
        <span className="block text-xl md:text-2xl font-medium text-gray-500 mb-1">
          Welcome back,
        </span>
        {userName}
      </h1>
    </header>
  );
};

export default Header;
