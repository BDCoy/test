import React from "react";
import { Copy } from "lucide-react";
import type { ProposalResponse } from "@lib/store/proposal";
import { Button } from "../ui/Button";
import { toast } from "@/lib/store/toast";

interface ProposalPreviewProps {
  proposal: ProposalResponse;
}

export function ProposalPreview({ proposal }: ProposalPreviewProps) {
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy text");
    }
  };

  return (
    <>
      {/* Cover Letter Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Cover Letter</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyToClipboard(proposal.coverLetter)}
            className="flex items-center gap-2"
          >
            <Copy className="w-4 h-4" />
            Copy
          </Button>
        </div>
        <div className="prose max-w-none">
          <p className="whitespace-pre-wrap text-gray-700">{proposal.coverLetter}</p>
        </div>
      </div>

      {/* Question Responses Section */}
      {proposal?.questionResponses?.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Question Responses</h2>
          <div className="space-y-4">
            {proposal?.questionResponses?.map((response, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <p className="font-medium text-gray-900 mb-2">{response.question}</p>
                <p className="text-gray-700">{response.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}