import React from 'react';
import { FlaskConical } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-cyber-blue/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-cyber-blue/10 rounded-lg border border-cyber-blue/30 shadow-[0_0_15px_rgba(0,243,255,0.2)]">
              <FlaskConical className="w-6 h-6 text-cyber-blue" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-wide text-white font-display uppercase drop-shadow-md">
                BioSort <span className="text-cyber-blue text-glow">AI</span>
              </h1>
              <p className="text-[10px] text-cyber-blue/60 font-mono tracking-[0.2em] uppercase">
                Biomedical Waste Classification
              </p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
             <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyber-green/5 border border-cyber-green/20">
                <div className="w-2 h-2 rounded-full bg-cyber-green animate-pulse shadow-[0_0_10px_#00ff9d]"></div>
                <span className="text-xs text-cyber-green font-mono tracking-widest font-semibold text-glow">SYSTEM ONLINE</span>
             </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;