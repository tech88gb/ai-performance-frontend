'use client';

import React from 'react';
import StepFlow from './StepFlow';

interface MessageRendererProps {
  content: string;
}

const MessageRenderer: React.FC<MessageRendererProps> = ({ content }) => {
  // Function to detect if content contains step-by-step instructions
  const hasStepByStepContent = (text: string): boolean => {
    const stepPatterns = [
      /Step \d+:/gi,
      /\d+\.\s/g,
      /Step-by-step/gi,
      /guide to/gi
    ];
    return stepPatterns.some(pattern => pattern.test(text));
  };

  // Function to parse step-by-step content
  const parseStepsFromContent = (text: string) => {
    const lines = text.split('\n');
    const steps: any[] = [];
    let currentStep: any = null;
    let stepCounter = 1;

    for (const line of lines) {
      const trimmedLine = line.trim();
      
      // Check if line starts a new step
      const stepMatch = trimmedLine.match(/^Step \d+:|^\d+\./);
      
      if (stepMatch) {
        // Save previous step if exists
        if (currentStep) {
          steps.push(currentStep);
        }
        
        // Start new step
        const title = trimmedLine.replace(/^Step \d+:\s*|^\d+\.\s*/, '');
        currentStep = {
          id: stepCounter++,
          title: title,
          description: '',
        };
      } else if (currentStep && trimmedLine.length > 0 && !trimmedLine.startsWith('-')) {
        // Add to current step description
        if (currentStep.description) {
          currentStep.description += ' ';
        }
        currentStep.description += trimmedLine;
      }
    }
    
    // Add the last step
    if (currentStep) {
      steps.push(currentStep);
    }
    
    return steps;
  };

  // Function to format regular message content
  const formatMessage = (text: string): string => {
    return text
      .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-black">$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em class="italic text-black/80">$1</em>')
      .replace(/^- (.+)$/gm, '<div class="flex items-start space-x-2 my-1"><span class="text-black/60 mt-1">•</span><span class="text-black">$1</span></div>');
  };

  // Check if this message contains step-by-step content
  if (hasStepByStepContent(content)) {
    const steps = parseStepsFromContent(content);
    
    if (steps.length > 0) {
      // Extract title from content (usually the first line)
      const lines = content.split('\n');
      const titleLine = lines.find(line => 
        line.toLowerCase().includes('guide') || 
        line.toLowerCase().includes('setup') ||
        line.toLowerCase().includes('campaign')
      );
      
      const title = titleLine || "Step-by-Step Guide";
      
      return (
        <div className="space-y-4">
          {/* Render intro text if any */}
          {lines.slice(0, 2).some(line => !line.match(/Step \d+:/)) && (
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-black/10">
              <div 
                className="text-black leading-relaxed" 
                dangerouslySetInnerHTML={{ 
                  __html: formatMessage(lines.slice(0, 2).join('\n')) 
                }} 
              />
            </div>
          )}
          
          {/* Render step flow */}
          <StepFlow steps={steps} title={title.replace(/^.*?guide to /i, '')} />
          
          {/* Render any additional content after steps */}
          {content.includes('Monitor Performance') && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-black text-blue-900 mb-2 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Important Notes
              </h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Allow 4-6 weeks for the learning phase</li>
                <li>• Don't make significant changes during learning phase</li>
                <li>• Monitor key metrics: CPM, CTR, CPC, conversion rates</li>
                <li>• Use Google Ads reporting tools regularly</li>
              </ul>
            </div>
          )}
        </div>
      );
    }
  }

  // Render regular formatted message
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-black/10">
      <div 
        className="text-black leading-relaxed" 
        dangerouslySetInnerHTML={{ __html: formatMessage(content) }} 
      />
    </div>
  );
};

export default MessageRenderer;