import React from 'react';
import { TrendingUp, Users, Clock, Award } from 'lucide-react';

interface StatCardProps {
  value: string;
  label: string;
  sublabel: string;
  icon: React.ElementType;
  timeframe?: string;
}

const StatCard = ({ value, label, sublabel, icon: Icon, timeframe }: StatCardProps) => (
  <div className="animate-fadeIn bg-white p-8 rounded-xl border border-gray-100 transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
    <div className="flex items-start justify-between mb-4">
      <div className="p-3 bg-green-50 rounded-lg">
        <Icon className="w-6 h-6 text-green-600" />
      </div>
      {timeframe && (
        <span className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
          {timeframe}
        </span>
      )}
    </div>
    <div className="space-y-2">
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-bold text-gray-900">{value}</span>
      </div>
      <p className="text-gray-900 font-medium">{label}</p>
      <p className="text-sm text-gray-600">{sublabel}</p>
    </div>
  </div>
);

export const Stats = () => {
  const stats = [
    {
      icon: TrendingUp,
      value: "93%",
      label: "Profile Improvement",
      sublabel: "Average increase in profile views",
      timeframe: "First 30 days"
    },
    {
      icon: Users,
      value: "4.2x",
      label: "More Client Invites",
      sublabel: "Increase in direct job invitations",
      timeframe: "Per month"
    },
    {
      icon: Clock,
      value: "75%",
      label: "Higher Response Rate",
      sublabel: "Improvement in proposal success",
      timeframe: "Average"
    },
    {
      icon: Award,
      value: "85%",
      label: "Client Satisfaction",
      sublabel: "Positive feedback from clients",
      timeframe: "Last 12 months"
    }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50" id="stats">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Proven Results for Freelancers
          </h2>
          <p className="text-xl text-gray-600">
            Our users consistently outperform on Upwork
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              {...stat}
              style={{ animationDelay: `${index * 150}ms` }}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            *Based on average user performance data from the last 12 months
          </p>
        </div>
      </div>
    </section>
  );
};