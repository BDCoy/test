"use client";

import { useCallback, useEffect, useState } from "react";
import { useProfileAnalysisStore } from "@lib/store/profile-analysis";
import { generateClientMessage } from "@/lib/openai/client-messages";
import { SubscriptionModal } from "@/components/shared/SubscriptionModal";
import { MessageForm } from "@/components/client-message/MessageForm";
import { ResponsePreview } from "@/components/client-message/ResponsePreview";
import { createClient } from "@/utils/supabase/client";
import {
  checkSubscriptionStatus,
  getSubscription,
  getUser,
} from "@/utils/supabase/queries";
import { User } from "@supabase/auth-js";
import { toast } from "@/lib/store/toast";

export default function ClientMessageResponse() {
  const supabase = createClient();
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [clientMessage, setClientMessage] = useState("");
  const [generatedResponse, setGeneratedResponse] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
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
    if (!clientMessage.trim()) {
      toast.error("Please enter a client message");
      return;
    }

    if (!user) {
      throw Error("Please signin to continue");
    }

    const isSubscriptionValid = await checkSubscriptionStatus(
      user.id,
      subscription,
      supabase,
      "client_messages_count"
    );
    if (!isSubscriptionValid) {
      setShowSubscriptionModal(true);
      return;
    }

    try {
      setIsGenerating(true);
      const response = await generateClientMessage(clientMessage);
      setGeneratedResponse(response);

      toast.success("Response generated successfully!");

      const { data, error: fetchError } = await supabase
        .from("users")
        .select("client_messages_count")
        .eq("id", user?.id)
        .single();

      if (fetchError) {
        console.error("Error fetching current count:", fetchError);
        return;
      }

      const newCount = (data?.client_messages_count || 0) + 1;

      const { error } = await supabase.functions.invoke("update-profile-count", {
        body: {
          analysisType: "client_messages_count",
          user_id: user.id,
          new_count: newCount,
        },
      });

      if (error) {
        console.error("Error invoking edge function:", error);
        return;
      }
    } catch (error) {
      console.error("Error generating response:", error);
      toast.error("Failed to generate response. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Client Message Response
        </h1>
        <p className="text-gray-600">
          Generate professional responses to client messages instantly
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <MessageForm
            clientMessage={clientMessage}
            onMessageChange={setClientMessage}
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <ResponsePreview response={generatedResponse} />
        </div>
      </div>

      <SubscriptionModal
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
      />
    </div>
  );
}