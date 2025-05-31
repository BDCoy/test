import { FileText, Globe } from "lucide-react";

export function TabNavigation({
  activeTab,
  setActiveTab,
}: {
  activeTab: "url" | "manual";
  setActiveTab: (tab: "url" | "manual") => void;
}) {
  return (
    <div className="flex space-x-4 border-b border-gray-200">
      <button
        className={`pb-4 px-2 font-medium transition-colors ${
          activeTab === "url"
            ? "text-green-600 border-b-2 border-green-600"
            : "text-gray-500 hover:text-gray-700"
        }`}
        onClick={() => setActiveTab("url")}
      >
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4" />
          Analyze by URL
        </div>
      </button>
      <button
        className={`pb-4 px-2 font-medium transition-colors ${
          activeTab === "manual"
            ? "text-green-600 border-b-2 border-green-600"
            : "text-gray-500 hover:text-gray-700"
        }`}
        onClick={() => setActiveTab("manual")}
      >
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Manual Analysis
        </div>
      </button>
    </div>
  );
}