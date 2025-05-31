import { Loader2, User, Copy } from "lucide-react";
import { Button } from "../ui/Button";

interface FreelancerData {
  Name: string;
  Headline: string;
  Body: string;
  ProfileImageSrc: string;
  HourlyRate: string;
  TotalJobs: number;
  Country: string;
  TotalHours: number;
  ProfileURL: string;
}

const exampleUrl = "https://www.upwork.com/freelancers/~...";

export function UrlAnalysisForm({
  profileUrl,
  setProfileUrl,
  isAnalyzing,
  handleUrlAnalysis,
  profileData,
  showResults,
  handleViewResults,
}: {
  profileUrl: string;
  setProfileUrl: (value: string) => void;
  isAnalyzing: boolean;
  handleUrlAnalysis: () => void;
  profileData: FreelancerData | null;
  showResults: boolean;
  handleViewResults: () => void;
}) {
  const handleCopyExampleUrl = () => {
    navigator.clipboard.writeText(exampleUrl);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Analyze by Upwork Profile URL
      </h2>
      <div className="space-y-4">
        <div>
          <div className="flex">
            <input
              type="url"
              value={profileUrl}
              onChange={(e) => setProfileUrl(e.target.value)}
              className="flex-1 rounded-md border border-gray-200 focus:border-green-500 focus:ring-green-500 p-2"
              placeholder={exampleUrl}
            />
            <button
              type="button"
              title="Copy example URL"
              className="ml-2 p-2 border border-gray-200 rounded-md hover:bg-gray-50"
              onClick={handleCopyExampleUrl}
            >
              <Copy className="w-5 h-5" />
            </button>
          </div>
          <small className="text-xs text-gray-500 mt-1">
            Example URL: {exampleUrl}
          </small>
        </div>

        {profileData && !showResults && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              {profileData.ProfileImageSrc ? (
                <img
                  src={profileData.ProfileImageSrc}
                  alt={profileData.Name}
                  className="w-16 h-16 rounded-full"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="w-8 h-8 text-gray-400" />
                </div>
              )}
              <div>
                <h3 className="font-semibold text-gray-800">
                  {profileData.Name}
                </h3>
                <p className="text-sm text-gray-500">
                  {profileData.Headline}
                </p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Country:</span>
                <span className="ml-2 text-gray-800">
                  {profileData.Country}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Rate:</span>
                <span className="ml-2 text-gray-800">
                  {profileData.HourlyRate}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Jobs:</span>
                <span className="ml-2 text-gray-800">
                  {profileData.TotalJobs}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Hours:</span>
                <span className="ml-2 text-gray-800">
                  {profileData.TotalHours}
                </span>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Description:</span>
                <span className="ml-2 text-gray-800">
                  {profileData.Body}
                </span>
              </div>
            </div>
          </div>
        )}

        <Button
          onClick={
            profileData && !showResults ? handleViewResults : handleUrlAnalysis
          }
          disabled={isAnalyzing || !profileUrl.trim()}
          className="w-full"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Analyzing Profile...
            </>
          ) : (
            <>
              {profileData && !showResults ? "View Results" : "Analyze Profile"}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}