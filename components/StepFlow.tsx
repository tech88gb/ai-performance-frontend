'use client';

import React from 'react';

interface Step {
  id: number;
  title: string;
  description: string;
  wireframe?: string;
  uiElements?: {
    type: 'button' | 'input' | 'dropdown' | 'checkbox' | 'text';
    label: string;
    position: { x: number; y: number };
    color?: string;
  }[];
}

interface StepFlowProps {
  steps: Step[];
  title?: string;
}

const StepFlow: React.FC<StepFlowProps> = ({ steps, title }) => {
  const getWireframeType = (stepTitle: string, stepDescription: string) => {
    const lower = stepTitle.toLowerCase();
    const descLower = stepDescription.toLowerCase();
    const combined = lower + ' ' + descLower;
    
    // Check in order of specificity - look at both title and description
    // Instagram/Facebook/Meta mobile steps
    if (combined.includes('instagram') || combined.includes('facebook') || combined.includes('meta ads')) {
      return 'mobile-boost';
    }
    
    // Google Ads specific steps
    if (combined.includes('google ads') || combined.includes('ads.google.com')) {
      if (combined.includes('performance max') || combined.includes('campaign type')) return 'campaign-type';
      if (combined.includes('conversion') || combined.includes('roas')) return 'conversion';
      if (combined.includes('asset') || combined.includes('upload')) return 'assets';
      if (combined.includes('budget')) return 'budget';
      if (combined.includes('audience') || combined.includes('signal')) return 'audience';
      if (combined.includes('review') || combined.includes('publish') || combined.includes('launch')) return 'review';
      if (combined.includes('goal')) return 'goal';
      if (combined.includes('new campaign') || combined.includes('dashboard')) return 'new-campaign';
    }
    
    // Generic campaign steps (could be any platform)
    if (combined.includes('performance max') || combined.includes('campaign type')) return 'campaign-type';
    if (combined.includes('conversion') || combined.includes('roas')) return 'conversion';
    if (combined.includes('asset') || combined.includes('upload')) return 'assets';
    if (combined.includes('budget')) return 'budget';
    if (combined.includes('audience') || combined.includes('signal')) return 'audience';
    if (combined.includes('review') || combined.includes('publish') || combined.includes('launch')) return 'review';
    if (combined.includes('goal')) return 'goal';
    if (combined.includes('new campaign') || combined.includes('dashboard')) return 'new-campaign';
    
    return 'generic';
  };

  const getIcon = (wireframeType: string) => {
    switch (wireframeType) {
      case 'mobile-boost':
        return (
          <svg className="w-8 h-8 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/><path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        );
      case 'new-campaign':
        return (
          <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        );
      case 'goal':
        return (
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        );
      case 'campaign-type':
        return (
          <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case 'conversion':
        return (
          <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      case 'assets':
        return (
          <svg className="w-8 h-8 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        );
      case 'budget':
        return (
          <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'audience':
        return (
          <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      case 'review':
        return (
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  return (
    <div className="my-6 p-6 bg-white/95 backdrop-blur-sm rounded-xl border border-black/20 shadow-sm">
      {title && (
        <h3 className="text-lg font-black uppercase mb-6 text-black flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          {title}
        </h3>
      )}
      
      {/* Horizontal Flow */}
      <div className="overflow-x-auto pb-4">
        <div className="flex items-start gap-4 min-w-max">
          {steps.map((step, index) => {
            const wireframeType = getWireframeType(step.title, step.description || '');
            
            return (
              <React.Fragment key={step.id}>
                {/* Step Card */}
                <div className="flex flex-col items-center w-48">
                  {/* Icon Box */}
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl p-6 w-full h-32 flex items-center justify-center mb-3">
                    {getIcon(wireframeType)}
                  </div>
                  
                  {/* Step Number */}
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md mb-2" style={{ backgroundColor: 'rgb(212, 165, 116)' }}>
                    {step.id}
                  </div>
                  
                  {/* Step Title */}
                  <h4 className="font-bold text-black text-sm text-center mb-2 line-clamp-2">{step.title}</h4>
                  
                  {/* Step Description */}
                  <p className="text-black/70 text-xs text-center line-clamp-3">{step.description}</p>
                </div>
                
                {/* Arrow */}
                {index < steps.length - 1 && (
                  <div className="flex items-center pt-16">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StepFlow;
