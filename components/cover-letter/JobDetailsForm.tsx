import React from 'react';
import { TONE_OPTIONS } from './constants';
import type { JobDetailsFormProps } from './types';

export function JobDetailsForm({ formData, onFormChange }: JobDetailsFormProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Job Details</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Description
          </label>
          <textarea
            value={formData.jobDescription}
            onChange={(e) => onFormChange('jobDescription', e.target.value)}
            rows={6}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
            placeholder="Paste the job description here..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Name
            </label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => onFormChange('companyName', e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              placeholder="Enter company name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hiring Manager
            </label>
            <input
              type="text"
              value={formData.hiringManager}
              onChange={(e) => onFormChange('hiringManager', e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              placeholder="Enter hiring manager's name"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tone
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TONE_OPTIONS.map((option) => (
              <label
                key={option.value}
                className={`relative flex flex-col gap-1 p-3 text-left border rounded-lg cursor-pointer transition-colors ${
                  formData.tone === option.value
                    ? 'border-green-500 bg-green-50 ring-2 ring-green-500 ring-opacity-50'
                    : 'border-gray-200 hover:border-green-500 hover:bg-green-50'
                }`}
              >
                <input
                  type="radio"
                  name="tone"
                  value={option.value}
                  checked={formData.tone === option.value}
                  onChange={(e) => onFormChange('tone', e.target.value)}
                  className="sr-only"
                />
                <span className="text-sm font-medium text-gray-900">{option.label}</span>
                <span className="text-xs text-gray-500">{option.description}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}