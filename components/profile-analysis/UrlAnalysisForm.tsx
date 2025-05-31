import { Loader2, User } from "lucide-react";
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
  return (
    <div className="space-y-6 mt-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upwork Profile URL
        </label>
        <input
          type="url"
          value={profileUrl}
          onChange={(e) => setProfileUrl(e.target.value)}
          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
          placeholder={exampleUrl}
        />
        <p className="mt-2 text-sm text-gray-500">
          Example: {exampleUrl}
        </p>
      </div>

      {profileData && !showResults && (
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
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
              <h3 className="font-semibold text-gray-900">{profileData.Name}</h3>
              <p className="text-sm text-gray-600">{profileData.Headline}</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Country:</span>
              <span className="ml-2 text-gray-900">{profileData.Country}</span>
            </div>
            <div>
              <span className="text-gray-500">Rate:</span>
              <span className="ml-2 text-gray-900">{profileData.HourlyRate}</span>
            </div>
            <div>
              <span className="text-gray-500">Jobs:</span>
              <span className="ml-2 text-gray-900">{profileData.TotalJobs}</span>
            </div>
            <div>
              <span className="text-gray-500">Hours:</span>
              <span className="ml-2 text-gray-900">{profileData.TotalHours}</span>
            </div>
          </div>
        </div>
      )}

      <Button
        onClick={profileData && !showResults ? handleViewResults : handleUrlAnalysis}
        disabled={isAnalyzing || !profileUrl.trim()}
        className="w-full"
      >
        {isAnalyzing ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            {profileData && !showResults ? "Analyzing Profile..." : "Fetching Profile..."}
          </>
        ) : (
          profileData && !showResults ? "View Analysis" : "Analyze Profile"
        )}
      </Button>
    </div>
  );
}