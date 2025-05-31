import React from 'react';
import type { JobDescriptionFormProps } from './types';

export function JobDescriptionForm({ jobDescription, onJobDescriptionChange }: JobDescriptionFormProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Job Description
      </h2>
      <textarea
        value={jobDescription}
        onChange={(e) => onJobDescriptionChange(e.target.value)}
        rows={10}
        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
        placeholder="Paste the job description here..."
      />
    </div>
  );
}