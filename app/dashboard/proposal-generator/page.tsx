"use client";

import { useCallback, useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { useProposalStore } from "@lib/store/proposal";
import { generateProposal } from "@lib/openai/proposal";
import { ProposalForm } from "@/components/proposal/ProposalForm";
import { ProposalPreview } from "@/components/proposal/ProposalPreview";
import { SubscriptionModal } from "@/components/shared/SubscriptionModal";
import { User } from "@supabase/supabase-js";
import {
  checkSubscriptionStatus,
  getSubscription,
  getUser,
} from "@/utils/supabase/queries";
import { createClient } from "@/utils/supabase/client";
import { toast } from "@/lib/store/toast";
import { Button } from "@/components/ui/Button";

export default function ProposalGenerator() {
  const supabase = createClient();
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const {
    fullName,
    profileDescription,
    jobDescription,
    tone,
    clientQuestions,
    generatedProposal,
    setFullName,
    setProfileDescription,
    setJobDescription,
    setTone,
    addQuestion,
    removeQuestion,
    updateQuestion,
    setGeneratedProposal,
    reset,
  } = useProposalStore();
  const [subscription, setSubscription] = useState<any | null>(null);
  const [user, setUser] = useState<User | null>(null);

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
    if (!fullName.trim()) {
      toast.error("Please enter your full name");
      return;
    }
    if (!profileDescription.trim()) {
      toast.error("Please provide your profile description");
      return;
    }
    if (!jobDescription.trim()) {
      toast.error("Please provide the job description");
      return;
    }
    if (!user) {
      throw Error("Please signin to continue");
    }

    const isSubscriptionValid = await checkSubscriptionStatus(
      user.id,
      subscription,
      supabase,
      "proposal_generator_count"
    );
    if (!isSubscriptionValid) {
      setShowSubscriptionModal(true);
      return;
    }

    try {
      setIsGenerating(true);
      const result = await generateProposal(
        fullName,
        profileDescription,
        jobDescription,
        clientQuestions.map((q) => q.text),
        tone
      );
      setGeneratedProposal(result);
      toast.success("Proposal generated successfully!");

      const { data, error: fetchError } = await supabase
        .from("users")
        .select("proposal_generator_count")
        .eq("id", user?.id)
        .single();

      if (fetchError) {
        console.error("Error fetching current count:", fetchError);
        return;
      }

      const newCount = (data?.proposal_generator_count || 0) + 1;

      const { error } = await supabase.functions.invoke("update-profile-count", {
        body: {
          analysisType: "proposal_generator_count",
          user_id: user.id,
          new_count: newCount,
        },
      });

      if (error) {
        console.error("Error invoking edge function:", error);
        return;
      }
    } catch (error) {
      console.error("Error generating proposal:", error);
      toast.error("Failed to generate proposal. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Proposal Generator
          </h1>
          <p className="text-gray-600">
            Generate winning proposals tailored to specific job requirements
          </p>
        </div>
        {generatedProposal && (
          <Button
            variant="outline"
            onClick={reset}
            className="flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Start New Proposal
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div>
          <ProposalForm
            fullName={fullName}
            profileDescription={profileDescription}
            jobDescription={jobDescription}
            tone={tone}
            clientQuestions={clientQuestions}
            isGenerating={isGenerating}
            onFullNameChange={setFullName}
            onProfileDescriptionChange={setProfileDescription}
            onJobDescriptionChange={setJobDescription}
            onToneChange={setTone}
            onAddQuestion={addQuestion}
            onRemoveQuestion={removeQuestion}
            onUpdateQuestion={updateQuestion}
            onGenerate={handleGenerate}
          />
        </div>

        {/* Preview Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          {generatedProposal ? (
            <ProposalPreview proposal={generatedProposal} />
          ) : (
            <div className="flex flex-col items-center justify-center h-[800px] text-center">
              <div>
                <p className="text-sm text-gray-900 font-medium">
                  Your generated proposal will appear here
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Fill in the form and click "Generate Proposal" to get started
                </p>
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