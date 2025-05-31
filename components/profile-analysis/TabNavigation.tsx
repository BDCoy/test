import { FileText, Globe } from "lucide-react";

export function TabNavigation({
  activeTab,
  setActiveTab,
}: {
  activeTab: "url" | "manual";
  setActiveTab: (tab: "url" | "manual") => void;
}) {
  return (
    <div className="flex gap-6 mb-6 border-b border-gray-100 overflow-x-auto">
      <button
        onClick={() => setActiveTab("url")}
        className={`flex items-center gap-2 px-4 py-3 transition-colors relative group whitespace-nowrap ${
          activeTab === "url"
            ? "text-green-600 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-green-600"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        <Globe className="w-4 h-4" />
        Analyze by URL
        {activeTab !== "url" && (
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-200 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
        )}
      </button>
      <button
        onClick={() => setActiveTab("manual")}
        className={`flex items-center gap-2 px-4 py-3 transition-colors relative group whitespace-nowrap ${
          activeTab === "manual"
            ? "text-green-600 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-green-600"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        <FileText className="w-4 h-4" />
        Manual Analysis
        {activeTab !== "manual" && (
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-200 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
        )}
      </button>
    </div>
  );
}