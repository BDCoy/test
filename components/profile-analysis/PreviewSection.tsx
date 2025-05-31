import { ProfileAnalysis } from "@/lib/store/profile-analysis";
import { Star, MessageCircle } from "lucide-react";
import { Button } from "../ui/Button";

export function PreviewSection({ analysis }: { analysis: ProfileAnalysis }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-gray-900">Profile Score</h2>
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-400" />
          <span className="text-2xl font-bold text-gray-900">{analysis.score}/100</span>
        </div>
      </div>

      <div className="space-y-6">
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

      <div className="mt-6">
        <Button className="w-full">
          Apply Recommendations
        </Button>
      </div>
    </div>
  );
}