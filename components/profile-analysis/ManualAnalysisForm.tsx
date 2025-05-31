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
    <form className="space-y-6 mt-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Profile Title
        </label>
        <input
          type="text"
          value={currentHeadline}
          onChange={(e) => setCurrentHeadline(e.target.value)}
          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
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
          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
          placeholder="Enter your current Upwork profile description"
        />
      </div>

      <Button
        onClick={handleManualAnalysis}
        disabled={isAnalyzing || !currentHeadline.trim() || !currentDescription.trim()}
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
    </form>
  );
}