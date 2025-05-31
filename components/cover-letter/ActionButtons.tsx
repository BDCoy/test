import React from 'react';
import { Loader2 } from 'lucide-react';
import type { ActionButtonsProps } from './types';
import { Button } from '../ui/Button';

export function ActionButtons({ onGenerate, onReset, isGenerating, isDisabled }: ActionButtonsProps) {
  return (
    <div className="flex gap-4">
      <Button
        onClick={onGenerate}
        disabled={isGenerating || isDisabled}
        className="flex-1"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Generating...
          </>
        ) : (
          'Generate Cover Letter'
        )}
      </Button>
      <Button variant="outline" onClick={onReset}>
        Reset
      </Button>
    </div>
  );
}