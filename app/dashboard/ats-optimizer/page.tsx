"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { CVUploader } from "@/components/cover-letter/CVUploader";
import { JobDescriptionForm } from "@/components/ats-optimizer/JobDescriptionForm";
import { ActionButtons } from "@/components/ats-optimizer/ActionButtons";
import { AnalysisResult } from "@/components/ats-optimizer/AnalysisResult";
import { useATSOptimizerStore } from "@lib/store/ats-optimizer";
import { RefreshCw } from "lucide-react";
import { generateATSRecommendations } from "@/lib/openai/ats-optimizer";
import { SubscriptionModal } from "@/components/shared/SubscriptionModal";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import {
  checkSubscriptionStatus,
  getSubscription,
  getUser,
} from "@/utils/supabase/queries";
import { toast } from "@/lib/store/toast";
import { Button } from "@/components/ui/Button";

export default function ATSOptimizer() {
  const supabase = createClient();
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const {
    cvContent,
    jobDescription,
    analysis: atsAnalysis,
    setCvContent,
    setJobDescription,
    setAnalysis,
    reset,
  } = useATSOptimizerStore();

  const [subscription, setSubscription] = useState<any | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (text: string) => {
    setCvContent(text);
  };

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

  const handleGenerate = async () => {
    if (!cvContent) {
      toast.error("Please upload your CV");
      return;
    }
    if (!jobDescription.trim()) {
      toast.error("Please enter the job description");
      return;
    }

    if (!user) {
      throw Error("Please signin to continue");
    }

    const isSubscriptionValid = await checkSubscriptionStatus(
      user.id,
      subscription,
      supabase,
      "ats_optimizer_count"
    );
    if (!isSubscriptionValid) {
      setShowSubscriptionModal(true);
      return;
    }

    try {
      setIsGenerating(true);
      const analysis = await generateATSRecommendations(cvContent, jobDescription);
      setAnalysis(analysis);
      toast.success("ATS analysis generated successfully!");

      const { data, error: fetchError } = await supabase
        .from("users")
        .select("ats_optimizer_count")
        .eq("id", user?.id)
        .single();

      if (fetchError) {
        console.error("Error fetching current count:", fetchError);
        return;
      }

      const newCount = (data?.ats_optimizer_count || 0) + 1;

      const { error } = await supabase.functions.invoke("update-profile-count", {
        body: {
          analysisType: "ats_optimizer_count",
          user_id: user.id,
          new_count: newCount,
        },
      });

      if (error) {
        console.error("Error invoking edge function:", error);
        return;
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "Failed to generate ATS analysis"
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    reset();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            ATS Resume Optimizer
          </h1>
          <p className="text-gray-600">
            Upload your CV and enter the job description to get a detailed ATS analysis with actionable tips.
          </p>
        </div>
        {atsAnalysis && (
          <Button
            variant="outline"
            onClick={handleReset}
            className="flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <RefreshCw className="w-4 h-4" />
            Start New Analysis
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <CVUploader
              cvContent={cvContent}
              onFileChange={handleFileChange}
              fileInputRef={fileInputRef}
            />
          </div>

          <JobDescriptionForm
            jobDescription={jobDescription}
            onJobDescriptionChange={setJobDescription}
          />

          <ActionButtons
            onGenerate={handleGenerate}
            onReset={handleReset}
            isGenerating={isGenerating}
            isDisabled={!cvContent || !jobDescription}
          />
        </div>

        {/* Preview Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          {atsAnalysis ? (
            <AnalysisResult analysis={atsAnalysis} />
          ) : (
            <div className="flex flex-col items-center justify-center h-[600px] text-center">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto">
                  <RefreshCw className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-900 font-medium">Your ATS analysis will appear here</p>
                  <p className="text-xs text-gray-500 mt-1">Upload your CV and enter the job description to get started</p>
                </div>
              </div>
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