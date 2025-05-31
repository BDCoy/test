"use client";

import { useCallback, useEffect, useState } from "react";

import { getSubscription, getUserDetails } from "@/utils/supabase/queries";
import { createClient } from "@/utils/supabase/client";
import { useTrainingStore } from "@/lib/store/training";
import { User } from "@supabase/supabase-js";
import Header from "@/components/dashboard/Header";
import StatCards from "@/components/dashboard/StatCard";
import TrainingProgress from "@/components/dashboard/TrainingProgress";

const Dashboard: React.FC = () => {
  const supabase = createClient();
  const { moduleProgress } = useTrainingStore();

  const [loadingProfile, setLoadingProfile] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [subscription, setSubscription] = useState<any>(null);

  const getData = useCallback(async () => {
    try {
      const [userData, subscriptionData] = await Promise.all([
        getUserDetails(supabase),
        getSubscription(supabase),
      ]);
      setUser(userData);
      setSubscription(subscriptionData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoadingProfile(false);
    }
  }, [supabase]);

  useEffect(() => {
    getData();
  }, [getData]);

  const metadata = subscription?.prices?.products?.metadata;

  const completedModules = moduleProgress.filter(Boolean).length;
  const totalModules = moduleProgress.length;
  const completionPercentage = totalModules
    ? Math.round((completedModules / totalModules) * 100)
    : 0;

  const stats = [
    {
      title: "Profile Analyses",
      count: user?.profile_analysis_count ?? 0,
      max: metadata?.profile_analysis_limit ?? 0,
      icon: "user",
    },
    {
      title: "Cover Letters",
      count: user?.cover_letter_count ?? 0,
      max: metadata?.cover_letter_limit ?? 0,
      icon: "file-text",
    },
    {
      title: "ATS Optimizations",
      count: user?.ats_optimizer_count ?? 0,
      max: metadata?.ats_optimizer_limit ?? 0,
      icon: "star",
    },
    {
      title: "Proposals Generated",
      count: user?.proposal_generator_count ?? 0,
      max: metadata?.proposal_generator_limit ?? 0,
      icon: "trending-up",
    },
    {
      title: "Client Messages",
      count: user?.client_messages_count ?? 0,
      max: metadata?.client_messages_limit ?? 0,
      icon: "message-square",
    },
  ];

  if (loadingProfile) {
    return (
      <div className="max-w-7xl mx-auto space-y-6 p-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mb-6">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div>
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
            <ul className="space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <li key={index} className="h-16 bg-gray-200 rounded"></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 px-4 sm:px-6 lg:px-8">
      <Header userName={user?.full_name || user?.email || "User"} />

      <div className="mt-8">
        <StatCards stats={stats} />
      </div>

      <div className="mt-8">
        <TrainingProgress
          completed={completedModules}
          total={totalModules}
          percentComplete={completionPercentage}
        />
      </div>
    </div>
  );
};

export default Dashboard;
