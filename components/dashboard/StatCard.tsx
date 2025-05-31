import React from "react";
import {
  User,
  FileText,
  Star,
  TrendingUp,
  MessageSquare,
} from "lucide-react";

interface StatItem {
  title: string;
  count: number;
  max: number;
  icon: string;
}

interface StatCardsProps {
  stats: StatItem[];
}

const StatCards: React.FC<StatCardsProps> = ({ stats }) => {
  const getIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case "user":
        return <User className={className} />;
      case "file-text":
        return <FileText className={className} />;
      case "star":
        return <Star className={className} />;
      case "trending-up":
        return <TrendingUp className={className} />;
      case "message-square":
        return <MessageSquare className={className} />;
      default:
        return <User className={className} />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 border border-gray-100 animate-fadeIn"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-lg">
              {getIcon(stat.icon, "w-5 h-5 text-green-600")}
            </div>
            <p className="text-sm text-gray-500 font-medium">/ {stat.max}</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-gray-600 font-medium text-sm">{stat.title}</h2>
            <p className="text-3xl font-bold text-gray-800">{stat.count}</p>
          </div>

          <div className="mt-4 bg-gray-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-green-500 h-full rounded-full"
              style={{ width: `${(stat.count / stat.max) * 100}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatCards;
