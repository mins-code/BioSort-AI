import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Camera, Upload, RefreshCw, XCircle } from 'lucide-react';

interface InputSectionProps {
  onImageSelected: (imageUrl: string) => void;
  isAnalyzing: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ onImageSelected, isAnalyzing }) => {
  const [mode, setMode] = useState<'upload' | 'camera'>('upload');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cleanup stream on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const startCamera = async () => {
    try {
      setMode('camera');
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Unable to access camera. Please ensure permissions are granted.");
      setMode('upload');
    }
  };

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  }, [stream]);

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setPreviewUrl(dataUrl);
        onImageSelected(dataUrl);
        stopCamera();
        setMode('upload'); // Switch back to 'upload' mode view to show preview
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onImageSelected(url);
    }
  };

  const triggerFileSelect = () => {
    stopCamera();
    setMode('upload');
    fileInputRef.current?.click();
  };

  const clearImage = () => {
    setPreviewUrl(null);
    stopCamera();
    setMode('upload');
  };

  return (
    <div className="glass-panel rounded-lg p-6 h-full flex flex-col relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyber-blue to-transparent opacity-50"></div>
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-sm font-bold text-cyber-blue font-mono uppercase tracking-[2px] flex items-center gap-2">
          <span className="w-1 h-4 bg-cyber-blue rounded-full shadow-[0_0_8px_#00f3ff]"></span>
          Input Source
        </h2>
        {previewUrl && (
          <button 
            onClick={clearImage}
            className="text-[10px] uppercase tracking-wider text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors font-mono"
          >
            <XCircle className="w-3 h-3" /> Reset
          </button>
        )}
      </div>

      <div className="flex-1 min-h-[300px] bg-black/60 rounded-lg border border-white/10 relative overflow-hidden flex items-center justify-center">
        {mode === 'camera' ? (
          <div className="relative w-full h-full">
            {/* Camera View */}
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted 
              className="w-full h-full object-cover"
            />
            {/* Capture Overlay */}
            <div className="absolute bottom-4 left-0 w-full flex justify-center z-10">
              <button 
                onClick={capturePhoto}
                className="w-16 h-16 rounded-full border-2 border-cyber-blue/80 bg-cyber-blue/10 hover:bg-cyber-blue/30 backdrop-blur-sm transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(0,243,255,0.4)]"
                aria-label="Capture Photo"
              >
                <div className="w-full h-full rounded-full border border-black/50"></div>
              </button>
            </div>
            {/* Scanner Effect */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-cyber-blue/20 to-transparent h-[10%] w-full animate-scan opacity-70"></div>
            {/* Corner Markers */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-cyber-blue opacity-50"></div>
            <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-cyber-blue opacity-50"></div>
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-cyber-blue opacity-50"></div>
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-cyber-blue opacity-50"></div>
          </div>
        ) : previewUrl ? (
          <div className="relative w-full h-full group-preview">
            <img 
              src={previewUrl} 
              alt="Waste Preview" 
              className="w-full h-full object-contain" 
            />
            {isAnalyzing && (
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-10">
                 <div className="w-16 h-16 border-4 border-cyber-blue/20 border-t-cyber-blue rounded-full animate-spin"></div>
                 <p className="mt-4 text-cyber-blue font-mono text-xs uppercase tracking-widest animate-pulse text-glow">Scanning Geometry...</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center p-8">
            <div className="w-20 h-20 bg-cyber-blue/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-cyber-blue/20 shadow-[0_0_20px_rgba(0,243,255,0.1)] group-hover:border-cyber-blue/40 transition-colors">
              <Camera className="w-8 h-8 text-cyber-blue/70" />
            </div>
            <p className="text-slate-500 text-xs font-mono uppercase tracking-wider max-w-[200px] mx-auto">
              No Data Stream
            </p>
            <p className="text-slate-600 text-[10px] mt-2">Initialize upload or sensor</p>
          </div>
        )}
      </div>

      {/* Control Buttons */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <button
          onClick={triggerFileSelect}
          disabled={isAnalyzing}
          className="group relative flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyber-blue/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Upload className="w-4 h-4 text-cyber-blue group-hover:scale-110 transition-transform" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300 group-hover:text-white transition-colors">Upload File</span>
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
          />
        </button>

        <button
          onClick={mode === 'camera' ? stopCamera : startCamera}
          disabled={isAnalyzing}
          className={`group relative flex items-center justify-center gap-2 py-3 px-4 rounded-lg border transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
            ${mode === 'camera' 
              ? 'bg-red-500/10 hover:bg-red-500/20 border-red-500/30 text-red-400' 
              : 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-cyber-blue/50 text-slate-300 hover:text-white'
            }`}
        >
          {mode === 'camera' ? (
             <>
               <XCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
               <span className="font-mono text-xs font-bold uppercase tracking-wider">Stop Sensor</span>
             </>
          ) : (
            <>
              <Camera className="w-4 h-4 text-cyber-blue group-hover:scale-110 transition-transform" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider">Active Cam</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default InputSection;