import React, { useState } from 'react';
import { Camera, RefreshCw, Wifi, AlertCircle } from 'lucide-react';

interface InputSectionProps {
  onImageSelected: (imageUrl: string) => void;
  onReset: () => void;
  isAnalyzing: boolean;
}

// ⚠️ Ensure this matches your Pi's address exactly
const PI_API_URL = "http://atararpi.local:8000";

const InputSection: React.FC<InputSectionProps> = ({ onImageSelected, onReset, isAnalyzing }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePiCapture = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // 1. Call the Pi's capture endpoint
      constVXResponse = await fetch(`${PI_API_URL}/capture`);
      
      if (!constVXResponse.ok) {
        throw new Error("Failed to connect to Pi Camera");
      }

      // 2. Convert response to a Blob (image file)
      const blob = await constVXResponse.blob();
      
      // 3. Create a local URL for the React app to display & analyze
      const url = URL.createObjectURL(blob);

      setPreviewUrl(url);
      onImageSelected(url); // This triggers the AI in App.tsx
    } catch (err) {
      console.error("Error fetching from Pi:", err);
      setError("Connection Error: Is the Python server running?");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSystemReset = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl); // Cleanup memory
    setPreviewUrl(null);
    setError(null);
    onReset();
  };

  return (
    <div className="glass-panel rounded-lg p-6 h-full flex flex-col relative overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-sm font-bold text-cyber-blue font-mono uppercase tracking-[2px] flex items-center gap-2">
          <Wifi className="w-4 h-4 animate-pulse" />
          Remote Sensor Link
        </h2>
        {error && (
          <span className="text-[10px] text-red-400 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> Offline
          </span>
        )}
      </div>

      {/* Main Display Area */}
      <div className="flex-1 min-h-[300px] rounded-lg border border-white/10 bg-black/60 relative overflow-hidden flex items-center justify-center">
        {isLoading ? (
          <div className="text-center">
             <div className="w-12 h-12 border-4 border-cyber-blue/30 border-t-cyber-blue rounded-full animate-spin mx-auto mb-4"></div>
             <p className="text-cyber-blue font-mono text-xs uppercase tracking-widest animate-pulse">Acquiring Optical Feed...</p>
          </div>
        ) : error ? (
           <div className="text-center px-4">
             <AlertCircle className="w-12 h-12 text-red-500/50 mx-auto mb-3" />
             <p className="text-red-400 font-mono text-xs">{error}</p>
             <button onClick={() => setError(null)} className="mt-4 text-[10px] underline text-slate-500 hover:text-white">Dismiss</button>
           </div>
        ) : previewUrl ? (
          <div className="relative w-full h-full">
            <img src={previewUrl} alt="Pi Capture" className="w-full h-full object-contain" />
            {isAnalyzing && (
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                 <p className="text-white font-display uppercase tracking-widest text-glow">Running Diagnostics...</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center opacity-40">
            <Camera className="w-16 h-16 mx-auto mb-4 text-white" />
            <p className="text-xs font-mono uppercase tracking-widest">Sensor Standby</p>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="mt-6 grid grid-cols-1 gap-4">
        {!previewUrl ? (
          <button
            onClick={handlePiCapture}
            disabled={isLoading}
            className="group relative py-4 px-6 rounded-lg bg-cyber-blue/10 border border-cyber-blue/30 hover:bg-cyber-blue/20 hover:border-cyber-blue transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="flex items-center justify-center gap-3 text-cyber-blue font-mono font-bold uppercase tracking-widest">
              <Camera className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {isLoading ? "Capturing..." : "Capture Image"}
            </span>
          </button>
        ) : (
          <button
            onClick={handleSystemReset}
            disabled={isAnalyzing}
            className="py-4 px-6 rounded-lg bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 text-red-400 font-mono font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            <RefreshCw className="w-5 h-5" />
            Reset System
          </button>
        )}
      </div>
    </div>
  );
};

export default InputSection;
