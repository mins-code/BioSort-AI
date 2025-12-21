import React from 'react';
import { CATEGORY_THEMES } from '../constants';
import { WasteCategory } from '../types';

interface ConfidenceBarProps {
  predictions: any[]; // Changed from single prediction to array
}

const ConfidenceBar: React.FC<ConfidenceBarProps> = ({ predictions }) => {
  return (
    <div className="glass-panel rounded-lg p-6 relative overflow-hidden">
      <div className="mb-6">
        <h3 className="text-sm font-bold text-white font-mono uppercase tracking-[2px]">Classification Ranking</h3>
        <p className="text-[10px] text-slate-500 mt-1 font-mono uppercase tracking-wide">Sorted by Inference Confidence</p>
      </div>

      <div className="flex flex-col gap-5">
        {predictions.length > 0 ? (
          predictions.map((res, index) => {
            const category = res.className as WasteCategory;
            const theme = CATEGORY_THEMES[category];
            const percentage = res.probability * 100;

            return (
              <div key={category} className={`transition-all duration-500 ${index === 0 ? 'opacity-100 scale-100' : 'opacity-50 scale-95 origin-left'}`}>
                <div className="flex justify-between items-end mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${theme.text}`}>
                      {category}
                    </span>
                    {index === 0 && (
                      <span className="text-[8px] px-1.5 py-0.5 rounded-sm bg-cyber-blue/20 text-cyber-blue font-bold animate-pulse">
                        MATCH
                      </span>
                    )}
                  </div>
                  <span className={`text-xs font-display font-bold ${theme.text}`}>
                    {percentage.toFixed(1)}%
                  </span>
                </div>
                
                <div className="w-full h-2 bg-slate-900 border border-white/5 relative overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ease-out ${theme.bar}`}
                    style={{ width: `${percentage}%` }}
                  >
                    {index === 0 && <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-white blur-[2px]" />}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          /* Placeholder state when no prediction exists */
          <div className="py-4 text-center opacity-30">
            <div className="w-full h-1.5 bg-slate-800 rounded-full mb-2"></div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Waiting for data feed...</p>
          </div>
        )}
      </div>
      
      <div className="flex justify-between mt-6 text-[8px] text-slate-600 font-mono tracking-widest px-1">
        <span>MIN_THRESHOLD</span>
        <span>PEAK_CONFIDENCE</span>
      </div>
    </div>
  );
};

export default ConfidenceBar;