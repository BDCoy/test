import React from "react";
import { Book } from "lucide-react";

import Link from "next/link";
import Button from "../Button";

interface TrainingProgressProps {
  completed: number;
  total: number;
  percentComplete: number;
}

const TrainingProgress: React.FC<TrainingProgressProps> = ({
  completed,
  total,
  percentComplete,
}) => {
  return (
    <div
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 animate-fadeIn"
      style={{ animationDelay: "500ms" }}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="bg-green-100 p-3 rounded-lg flex-shrink-0 mt-1">
            <Book className="w-5 h-5 text-green-600" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-1">
              Training Progress
            </h2>
            <p className="text-gray-600 mb-4">
              Complete all modules to master Upwork success
            </p>

            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-700">
                {completed} of {total} modules completed
              </p>
              <p className="text-sm font-bold text-gray-800">
                {percentComplete}%
              </p>
            </div>

            <div className="relative h-3 w-full bg-gray-100 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-green-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${percentComplete}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="md:self-end">
          <Link href="/dashboard/personalized-training">
            <Button>Continue Training</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrainingProgress;
