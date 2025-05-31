import { toast } from "@/lib/store/toast";
import { Copy, MessageSquare } from "lucide-react";
import { Button } from "../ui/Button";

interface ResponsePreviewProps {
  response: string | null;
}

export function ResponsePreview({ response }: ResponsePreviewProps) {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(response || "");
      toast.success("Response copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy text");
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Generated Response
        </h2>
        {response && (
          <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
            className="flex items-center gap-2"
          >
            <Copy className="w-4 h-4" />
            Copy
          </Button>
        )}
      </div>

      {response ? (
        <div className="prose max-w-none">
          <p className="whitespace-pre-wrap text-gray-700">{response}</p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[500px] text-center">
          <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-sm text-gray-900 font-medium">
            Your generated response will appear here
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Paste a client message and click "Generate Response" to get started
          </p>
        </div>
      )}
    </>
  );
}