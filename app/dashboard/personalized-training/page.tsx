"use client";

import { useEffect, useState } from "react";
import { ModuleList } from "@/components/personalized-training/ModuleList";
import { ModuleContent } from "@/components/personalized-training/ModuleContent";
import UpworkProfileOptimization from "@/components/personalized-training/UpworkProfileOptimization";
import PerfectProposalProcessPart1 from "@/components/personalized-training/PerfectProposalProcessPart1";
import PerfectProposalProcessPart2 from "@/components/personalized-training/PerfectProposalProcessPart2";
import PerfectProposalProcessPart3 from "@/components/personalized-training/PerfectProposalProcessPart3";
import UpworkSalesProcessPart1 from "@/components/personalized-training/UpworkSalesProcessPart1";
import UpworkSalesProcessPart2A from "@/components/personalized-training/UpworkSalesProcessPart2A";
import UpworkSalesProcessPart2B from "@/components/personalized-training/UpworkSalesProcessPart2B";
import UpworkSalesProcessPart2C from "@/components/personalized-training/UpworkSalesProcessPart2C";
import NoShowWorkflow from "@/components/personalized-training/NoShowWorkflow";
import CallNotClosedWorkflow from "@/components/personalized-training/CallNotClosedWorkflow";
import { EmptyState } from "@/components/personalized-training/EmptyState";
import { useTrainingStore } from "@/lib/store/training";

const trainingModules = [
  { title: "Perfect Profile", content: <UpworkProfileOptimization /> },
  {
    title: "Proposal Process (Part 1: Why Send Proposals?)",
    content: <PerfectProposalProcessPart1 />,
  },
  {
    title: "Proposal Process (Part 2: Finding The Right Jobs)",
    content: <PerfectProposalProcessPart2 />,
  },
  {
    title: "Proposal Process (Part 3: Proposal Creation)",
    content: <PerfectProposalProcessPart3 />,
  },
  {
    title: "Sales Process (Part 1: Setting)",
    content: <UpworkSalesProcessPart1 />,
  },
  {
    title: "Sales Process (Part 2A: Structure & Mentality)",
    content: <UpworkSalesProcessPart2A />,
  },
  {
    title: "Sales Process (Part 2B: Discovery Call)",
    content: <UpworkSalesProcessPart2B />,
  },
  {
    title: "Sales Process (Part 2C: Proposal Call)",
    content: <UpworkSalesProcessPart2C />,
  },
  { title: "No-Show Workflow", content: <NoShowWorkflow /> },
  { title: "Call Not Closed Workflow", content: <CallNotClosedWorkflow /> },
];

export default function PersonalizedTraining() {
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { moduleProgress, setModuleProgress, setCompleted } = useTrainingStore();

  const handleModuleClick = (index: number) => setSelectedModule(index);

  const toggleCompleteModule = (index: number) => {
    const newCompleted = !moduleProgress[index];
    setModuleProgress(index, newCompleted);
    setCompleted(newCompleted);
  };

  const handleAnalyze = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (selectedModule !== null) {
        toggleCompleteModule(selectedModule);
      }
    }, 2000);
  };

  useEffect(() => {
    const lastCompletedModuleIndex = moduleProgress
      .map((completed, index) => (completed ? index : -1))
      .filter((index) => index !== -1)
      .pop();

    if (lastCompletedModuleIndex !== undefined) {
      setSelectedModule(lastCompletedModuleIndex);
    } else {
      setSelectedModule(0);
    }
  }, [moduleProgress]);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Personalized Training
          </h1>
          <p className="text-gray-600">
            Improve your skills with tailored training modules.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-8">
        <div className="w-full sm:w-1/3 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Course Modules
          </h2>
          <ModuleList
            modules={trainingModules}
            selectedModule={selectedModule}
            completedModules={moduleProgress}
            onModuleClick={handleModuleClick}
            onToggleComplete={toggleCompleteModule}
          />
        </div>

        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          {selectedModule !== null ? (
            <ModuleContent
              title={trainingModules[selectedModule].title}
              content={trainingModules[selectedModule].content}
              isCompleted={moduleProgress[selectedModule]}
              isLoading={isLoading}
              onAnalyze={handleAnalyze}
              onToggleComplete={() => toggleCompleteModule(selectedModule)}
            />
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </div>
  );
}