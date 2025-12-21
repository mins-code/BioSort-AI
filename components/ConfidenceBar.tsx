import React from 'react';
import { PredictionResult } from '../types';
import { CATEGORY_THEMES } from '../constants';

interface ConfidenceBarProps {
  prediction: PredictionResult | null;
}

const ConfidenceBar: React.FC<ConfidenceBarProps> = ({ prediction }) => {
  const theme = prediction ? CATEGORY_THEMES[prediction.category] : null;
  const percentage = prediction ? prediction.confidence : 0;

  return (
    <div className="glass-panel rounded-lg p-6 relative overflow-hidden">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h3 className="text-sm font-bold text-white font-mono uppercase tracking-[2px]">Confidence Score</h3>
          <p className="text-[10px] text-slate-500 mt-1 font-mono uppercase tracking-wide">Inference Probability</p>
        </div>
        <div className="text-right">
          <span className={`text-4xl font-display font-bold ${theme ? theme.text : 'text-slate-600'} text-glow`}>
            {percentage.toFixed(1)}%
          </span>
        </div>
      </div>

      <div className="w-full h-2 bg-slate-900 rounded-none overflow-hidden border border-white/10 relative">
         {/* Background Grid in bar */}
         <div className="absolute inset-0 opacity-30 bg-[linear-gradient(90deg,transparent_2px,rgba(255,255,255,0.1)_2px)] bg-[size:20px_100%]"></div>
         
        <div 
          className={`h-full transition-all duration-1000 ease-out relative ${theme ? theme.bar : 'bg-slate-700'}`}
          style={{ width: `${percentage}%` }}
        >
          {/* Animated Sheen */}
          <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-r from-transparent via-white/80 to-transparent w-full -translate-x-full animate-[shimmer_2s_infinite]"></div>
          
          {/* Glow at the tip */}
          <div className={`absolute right-0 top-0 bottom-0 w-2 h-full bg-white blur-[4px] ${percentage === 0 ? 'hidden' : ''}`}></div>
        </div>
      </div>
      
      {/* Markers */}
      <div className="flex justify-between mt-2 text-[10px] text-slate-600 font-mono tracking-widest px-1">
        <span>0</span>
        <span>50</span>
        <span>100</span>
      </div>
    </div>
  );
};

export default ConfidenceBar;