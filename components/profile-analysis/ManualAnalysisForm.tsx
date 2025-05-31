import { Loader2 } from "lucide-react";
import { Button } from "../ui/Button";

export function ManualAnalysisForm({
  currentHeadline,
  setCurrentHeadline,
  currentDescription,
  setCurrentDescription,
  isAnalyzing,
  handleManualAnalysis,
}: {
  currentHeadline: string;
  setCurrentHeadline: (value: string) => void;
  currentDescription: string;
  setCurrentDescription: (value: string) => void;
  isAnalyzing: boolean;
  handleManualAnalysis: () => void;
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Manual Analysis
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Profile Title
          </label>
          <input
            type="text"
            value={currentHeadline}
            onChange={(e) => setCurrentHeadline(e.target.value)}
            className="w-full rounded-md border border-gray-200 focus:border-green-500 focus:ring-green-500"
            placeholder="Enter your current Upwork profile title"
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
            className="w-full rounded-md border border-gray-200 focus:border-green-500 focus:ring-green-500 resize-none"
            placeholder="Enter your current Upwork profile description"
          />
        </div>

        <Button
          onClick={handleManualAnalysis}
          disabled={
            isAnalyzing ||
            !currentHeadline.trim() ||
            !currentDescription.trim()
          }
          className="w-full"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Analyzing Profile...
            </>
          ) : (
            "Analyze Profile"
          )}
        </Button>
      </div>
    </div>
  );
}