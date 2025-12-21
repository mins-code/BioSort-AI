import React from 'react';
import { WasteCategory, PredictionResult } from '../types';
import { CATEGORY_THEMES, CATEGORY_ICONS } from '../constants';
import { BrainCircuit, ScanSearch } from 'lucide-react';

interface PredictionCardProps {
  prediction: PredictionResult | null;
  isAnalyzing: boolean;
}

const PredictionCard: React.FC<PredictionCardProps> = ({ prediction, isAnalyzing }) => {
  const theme = prediction ? CATEGORY_THEMES[prediction.category] : null;
  const Icon = prediction ? CATEGORY_ICONS[prediction.category] : null;

  return (
    <div className={`glass-panel rounded-lg p-8 flex flex-col justify-center items-center relative transition-all duration-500 ${theme?.shadow || ''}`}>
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-cyber-blue/30"></div>
      <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-cyber-blue/30"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-cyber-blue/30"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-cyber-blue/30"></div>

      <div className="absolute top-4 left-6 flex items-center gap-2">
        <BrainCircuit className="w-4 h-4 text-cyber-blue" />
        <span className="text-xs font-mono font-bold text-cyber-blue/80 tracking-[2px] uppercase">AI Diagnosis</span>
      </div>

      {isAnalyzing ? (
        <div className="flex flex-col items-center justify-center py-12 animate-pulse">
           <div className="relative">
             <ScanSearch className="w-20 h-20 text-cyber-blue/50 mb-6" />
             <div className="absolute inset-0 border-2 border-cyber-blue/30 rounded-lg animate-ping"></div>
           </div>
           <p className="text-xl font-display uppercase tracking-widest text-white/80">Processing Input...</p>
        </div>
      ) : prediction && theme && Icon ? (
        <div className="flex flex-col items-center animate-fade-in-up text-center w-full mt-8">
          <div className={`w-32 h-32 rounded-full flex items-center justify-center mb-6 ${theme.bg} border-4 ${theme.border} shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all duration-500 relative`}>
             <div className="absolute inset-0 rounded-full border border-white/20 animate-pulse-slow"></div>
            <Icon className={`w-16 h-16 ${theme.text} drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]`} />
          </div>
          
          <h3 className="text-xs font-mono text-slate-500 mb-3 uppercase tracking-[3px]">Detected Material</h3>
          <h2 className={`text-3xl md:text-5xl font-display font-bold mb-4 ${theme.text} text-glow uppercase tracking-wide`}>
            {prediction.category}
          </h2>
          
          <div className="px-4 py-1.5 rounded-none border border-cyber-blue/20 bg-cyber-blue/5 text-[10px] text-cyber-blue font-mono tracking-widest">
             REF ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 opacity-50">
          <div className="w-24 h-24 rounded-full border border-dashed border-slate-700 flex items-center justify-center mb-6 relative">
             <div className="absolute inset-0 rounded-full border-2 border-slate-800 animate-spin-slow"></div>
             <span className="text-slate-700 text-3xl font-display font-bold">?</span>
          </div>
          <p className="text-lg text-slate-400 font-mono uppercase tracking-widest animate-pulse">Awaiting visual input...</p>
        </div>
      )}
    </div>
  );
};

export default PredictionCard;