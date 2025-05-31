"use client";

import { useCallback, useEffect, useState } from "react";
import { useProfileAnalysisStore } from "@lib/store/profile-analysis";
import { analyzeUpworkProfile } from "@/lib/openai/profile-analysis";
import { SubscriptionModal } from "@/components/shared/SubscriptionModal";
import { Globe, FileEdit, Star, MessageCircle, Rocket } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/utils/supabase/client";
import {
  checkSubscriptionStatus,
  getSubscription,
  getUser,
} from "@/utils/supabase/queries";
import { User } from "@supabase/auth-js";
import { toast } from "@/lib/store/toast";

export default function ProfileAnalysis() {
  const supabase = createClient();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"url" | "manual">("manual");
  const [profileUrl, setProfileUrl] = useState("");
  const [profileData, setProfileData] = useState<any | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [subscription, setSubscription] = useState<any | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const {
    fullName,
    currentHeadline,
    currentDescription,
    analysis,
    setCurrentHeadline,
    setCurrentDescription,
    setAnalysis,
    reset,
  } = useProfileAnalysisStore();

  const getData = useCallback(async () => {
    try {
      const [userData, subscriptionData] = await Promise.all([
        getUser(supabase),
        getSubscription(supabase),
      ]);
      setUser(userData);
      setSubscription(subscriptionData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [supabase]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleManualAnalysis = async () => {
    if (!currentHeadline.trim() || !currentDescription.trim()) {
      toast.error("Please provide both headline and description");
      return;
    }

    if (!user) {
      throw Error("Please signin to continue");
    }

    const isSubscriptionValid = await checkSubscriptionStatus(
      user.id,
      subscription,
      supabase,
      "profile_analysis_count"
    );
    if (!isSubscriptionValid) {
      setShowSubscriptionModal(true);
      return;
    }

    try {
      setIsAnalyzing(true);
      const result = await analyzeUpworkProfile(
        currentHeadline,
        currentDescription,
        fullName
      );
      setAnalysis(result);

      const { data, error: fetchError } = await supabase
        .from("users")
        .select("profile_analysis_count")
        .eq("id", user?.id)
        .single();
      if (fetchError) {
        console.error("Error fetching current count:", fetchError);
        return;
      }

      const newCount = (data?.profile_analysis_count || 0) + 1;
      const { error } = await supabase.functions.invoke(
        "update-profile-count",
        {
          body: {
            analysisType: "profile_analysis_count",
            user_id: user.id,
            new_count: newCount,
          },
        }
      );
      if (error) {
        console.error("Error invoking edge function:", error);
        return;
      }
    } catch (error) {
      console.error("Analysis error:", error);
      toast.error("Failed to analyze profile. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Profile Analysis</h1>
          <p className="text-gray-600">Optimize your Upwork profile with AI-powered recommendations</p>
        </div>
        {analysis && (
          <Button
            variant="primary"
            size="lg"
            onClick={reset}
          >
            <Rocket className="w-4 h-4 mr-2" />
            Start New Analysis
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Panel - Input Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex gap-6 mb-6 border-b border-gray-100 overflow-x-auto">
            <button
              onClick={() => setActiveTab("url")}
              className={`flex items-center gap-2 px-4 py-3 ${
                activeTab === "url"
                  ? "text-green-600 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-green-600"
                  : "text-gray-500 hover:text-gray-700"
              } transition-colors relative group whitespace-nowrap`}
            >
              <Globe className="w-4 h-4" />
              Analyze by URL
              {activeTab !== "url" && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-200 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("manual")}
              className={`flex items-center gap-2 px-4 py-3 ${
                activeTab === "manual"
                  ? "text-green-600 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-green-600"
                  : "text-gray-500 hover:text-gray-700"
              } transition-colors relative group whitespace-nowrap`}
            >
              <FileEdit className="w-4 h-4" />
              Manual Analysis
              {activeTab !== "manual" && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-200 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              )}
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Title
              </label>
              <input
                type="text"
                value={currentHeadline}
                onChange={(e) => setCurrentHeadline(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="Enter your profile title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Description
              </label>
              <textarea
                value={currentDescription}
                onChange={(e) => setCurrentDescription(e.target.value)}
                rows={8}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                placeholder="Enter your profile description"
              />
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={handleManualAnalysis}
              disabled={isAnalyzing || !currentHeadline || !currentDescription}
            >
              {isAnalyzing ? "Analyzing..." : "Analyze Profile"}
            </Button>
          </div>
        </div>

        {/* Right Panel - Analysis Results */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          {analysis ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-gray-900">Profile Score</h2>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-2xl font-bold text-gray-900">{analysis.score}/100</span>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <h3 className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                  <MessageCircle className="w-4 h-4 text-green-600" />
                  Optimized Headline
                </h3>
                <p className="text-gray-900">{analysis.optimizedHeadline}</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <h3 className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                  <MessageCircle className="w-4 h-4 text-green-600" />
                  Optimized Description
                </h3>
                <div className="space-y-4 text-gray-900">
                  <p className="whitespace-pre-wrap">{analysis.optimizedDescription}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <MessageCircle className="w-12 h-12 mb-4" />
              <p className="text-lg mb-2">No Analysis Yet</p>
              <p className="text-sm text-center">
                Enter your profile details and click "Analyze Profile" to get started
              </p>
            </div>
          )}
        </div>
      </div>

      <SubscriptionModal
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
      />
    </div>
  );
}