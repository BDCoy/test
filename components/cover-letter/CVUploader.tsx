import React from 'react';
import { Upload, X } from 'lucide-react';

import type { CVUploaderProps } from './types';
import { extractTextFromPDF } from '@/lib/pdf';

export function CVUploader({ cvContent, onFileChange, fileInputRef }: CVUploaderProps) {
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    const fileType = selectedFile.name.toLowerCase();
    if (!fileType.endsWith(".pdf")) {
      toast.error("Please upload a PDF file");
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    try {
      const text = await extractTextFromPDF(selectedFile);
      onFileChange(text);
    } catch (err) {
      console.error("Error processing PDF:", err);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleReset = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onFileChange('');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload Your CV</h2>
      
      {!cvContent ? (
        <div 
          className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:border-green-500 transition-colors cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".pdf"
            className="hidden"
          />
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-4" />
          <p className="text-sm font-medium text-gray-900 mb-1">Click to upload your CV</p>
          <p className="text-xs text-gray-500">Supported format: PDF</p>
        </div>
      ) : (
        <div className="relative">
          <div className="absolute top-2 right-2">
            <button
              onClick={handleReset}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              title="Remove CV"
            >
              <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            </button>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 max-h-[300px] overflow-y-auto">
            <pre className="text-sm text-gray-600 whitespace-pre-wrap font-sans">
              {cvContent}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}