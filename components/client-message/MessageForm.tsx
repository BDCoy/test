import { Loader2 } from "lucide-react";
import { Button } from "../ui/Button";

interface MessageFormProps {
  clientMessage: string;
  onMessageChange: (message: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export function MessageForm({
  clientMessage,
  onMessageChange,
  onGenerate,
  isGenerating,
}: MessageFormProps) {
  return (
    <>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Client Message
      </h2>

      <div className="space-y-4">
        <textarea
          value={clientMessage}
          onChange={(e) => onMessageChange(e.target.value)}
          rows={12}
          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
          placeholder="Paste the client's message here..."
        />

        <Button
          onClick={onGenerate}
          disabled={isGenerating || !clientMessage.trim()}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Generating Response...
            </>
          ) : (
            "Generate Response"
          )}
        </Button>
      </div>
    </>
  );
}