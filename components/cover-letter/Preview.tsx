import { Upload, RefreshCw } from 'lucide-react';
import type { PreviewProps } from './types';
import { Button } from '../ui/Button';

export function Preview({ generatedLetter }: PreviewProps) {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Generated Cover Letter</h2>
        {generatedLetter && (
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Regenerate
          </Button>
        )}
      </div>
      
      {generatedLetter ? (
        <div className="prose max-w-none">
          <div className="mb-8 pb-8 border-b border-gray-100">
            <h3 className="text-xl font-bold text-gray-900">{generatedLetter.header.name}</h3>
            <p className="text-gray-600">{generatedLetter.header.title}</p>
            {generatedLetter.header.contact.address && (
              <p className="text-gray-600">{generatedLetter.header.contact.address}</p>
            )}
            {generatedLetter.header.contact.cityStateZip && (
              <p className="text-gray-600">{generatedLetter.header.contact.cityStateZip}</p>
            )}
            {generatedLetter.header.contact.phone && (
              <p className="text-gray-600">{generatedLetter.header.contact.phone}</p>
            )}
            {generatedLetter.header.contact.email && (
              <p className="text-gray-600">{generatedLetter.header.contact.email}</p>
            )}
          </div>

          <div className="mb-6">
            <p className="font-medium text-gray-900">
              {generatedLetter.content.recipient.name}
              <br />
              {generatedLetter.content.recipient.company}
            </p>
          </div>

          <p className="mb-6 text-gray-900">{generatedLetter.content.greeting}</p>

          {generatedLetter.content.paragraphs.map((paragraph: string, index: number) => (
            <p key={index} className="mb-6 text-gray-900 leading-relaxed text-justify">
              {paragraph}
            </p>
          ))}

          <div className="mt-8 pt-8 border-t border-gray-100">
            <p className="text-gray-900">{generatedLetter.content.closing.salutation},</p>
            <p className="font-medium text-gray-900">{generatedLetter.content.closing.name}</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-center p-8">
          <Upload className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-sm text-gray-900 font-medium">Your generated cover letter will appear here</p>
          <p className="text-xs text-gray-500 mt-1">Upload your CV and fill in the job details to get started</p>
        </div>
      )}
    </>
  );
}