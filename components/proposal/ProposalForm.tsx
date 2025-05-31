import { Loader2, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/Button";
import { ClientQuestion } from "@/lib/store/proposal";

interface ProposalFormProps {
  fullName: string;
  profileDescription: string;
  jobDescription: string;
  tone: string;
  clientQuestions: ClientQuestion[];
  isGenerating: boolean;
  onFullNameChange: (name: string) => void;
  onProfileDescriptionChange: (description: string) => void;
  onJobDescriptionChange: (description: string) => void;
  onToneChange: (tone: string) => void;
  onAddQuestion: () => void;
  onRemoveQuestion: (id: string) => void;
  onUpdateQuestion: (id: string, text: string) => void;
  onGenerate: () => void;
}

export function ProposalForm({
  fullName,
  profileDescription,
  jobDescription,
  tone,
  clientQuestions,
  isGenerating,
  onFullNameChange,
  onProfileDescriptionChange,
  onJobDescriptionChange,
  onToneChange,
  onAddQuestion,
  onRemoveQuestion,
  onUpdateQuestion,
  onGenerate,
}: ProposalFormProps) {
  const toneOptions = [
    { label: 'Casual', desc: 'Friendly and approachable while maintaining professionalism' },
    { label: 'Professional', desc: 'Polished and business-appropriate' },
    { label: 'Confident', desc: 'Project authority and expertise in your field' },
    { label: 'Enthusiastic', desc: 'Show genuine excitement and passion for the project' },
    { label: 'Formal', desc: 'Traditional business tone' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Proposal Details</h2>
        
        <div className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => onFullNameChange(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              placeholder="Enter your full name"
            />
          </div>

          {/* Profile Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Description
            </label>
            <textarea
              value={profileDescription}
              onChange={(e) => onProfileDescriptionChange(e.target.value)}
              rows={4}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
              placeholder="Enter your professional profile description"
            />
          </div>

          {/* Job Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Description
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => onJobDescriptionChange(e.target.value)}
              rows={6}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
              placeholder="Paste the job description here"
            />
          </div>

          {/* Proposal Tone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Proposal Tone
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {toneOptions.map((option) => (
                <button
                  key={option.label.toLowerCase()}
                  onClick={() => onToneChange(option.label.toLowerCase())}
                  className={`flex flex-col gap-1 p-3 text-left border rounded-lg transition-colors ${
                    tone === option.label.toLowerCase()
                      ? 'border-green-500 bg-green-50 ring-2 ring-green-500 ring-opacity-50'
                      : 'border-gray-200 hover:border-green-500 hover:bg-green-50'
                  }`}
                >
                  <span className="text-sm font-medium text-gray-900">{option.label}</span>
                  <span className="text-xs text-gray-500">{option.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Client Questions */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Client Questions
              </label>
              <Button
                variant="outline"
                size="sm"
                onClick={onAddQuestion}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Question
              </Button>
            </div>
            <div className="space-y-3">
              {clientQuestions.length > 0 ? (
                clientQuestions.map((question) => (
                  <div key={question.id} className="flex gap-3">
                    <input
                      type="text"
                      value={question.text}
                      onChange={(e) => onUpdateQuestion(question.id, e.target.value)}
                      className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="Enter client question"
                    />
                    <button
                      onClick={() => onRemoveQuestion(question.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <p className="text-sm text-gray-500 text-center">No client questions added yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Button
        onClick={onGenerate}
        disabled={isGenerating || !fullName || !profileDescription || !jobDescription}
        className="w-full"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Generating...
          </>
        ) : (
          'Generate Proposal'
        )}
      </Button>
    </div>
  );
}