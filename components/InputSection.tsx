import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Camera, Upload, XCircle, FileImage } from 'lucide-react';

interface InputSectionProps {
  onImageSelected: (imageUrl: string) => void;
  onReset: () => void;
  isAnalyzing: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ onImageSelected, onReset, isAnalyzing }) => {
  const [mode, setMode] = useState<'upload' | 'camera'>('upload');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false); // New state for drag-and-drop visual
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  // --- Drag and Drop Handlers ---
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!isAnalyzing && mode === 'upload') setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (isAnalyzing || mode !== 'upload') return;

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onImageSelected(url);
    }
  };

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
        setMode('upload');
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
    if (fileInputRef.current) fileInputRef.current.value = ""; 
    stopCamera();
    setMode('upload');
    onReset();
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

      {/* Main Container with Drag and Drop listeners */}
      <div 
        className={`flex-1 min-h-[300px] rounded-lg border relative overflow-hidden flex items-center justify-center transition-all duration-300 ${
          isDragging ? 'bg-cyber-blue/10 border-cyber-blue shadow-[0_0_20px_rgba(0,243,255,0.2)] scale-[1.01]' : 'bg-black/60 border-white/10'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {mode === 'camera' ? (
          <div className="relative w-full h-full">
            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
            <div className="absolute bottom-4 left-0 w-full flex justify-center z-10">
              <button 
                onClick={capturePhoto}
                className="w-16 h-16 rounded-full border-2 border-cyber-blue/80 bg-cyber-blue/10 hover:bg-cyber-blue/30 backdrop-blur-sm shadow-[0_0_20px_rgba(0,243,255,0.4)]"
              />
            </div>
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-cyber-blue/20 to-transparent h-[10%] w-full animate-scan opacity-70"></div>
          </div>
        ) : previewUrl ? (
          <div className="relative w-full h-full">
            <img src={previewUrl} alt="Waste Preview" className="w-full h-full object-contain" />
            {isAnalyzing && (
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-10">
                 <div className="w-16 h-16 border-4 border-cyber-blue/20 border-t-cyber-blue rounded-full animate-spin"></div>
                 <p className="mt-4 text-cyber-blue font-mono text-xs uppercase tracking-widest animate-pulse text-glow">Scanning Geometry...</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center p-8 pointer-events-none">
            {isDragging ? (
              <>
                <FileImage className="w-16 h-16 text-cyber-blue mx-auto mb-4 animate-bounce" />
                <p className="text-cyber-blue text-sm font-mono uppercase tracking-widest animate-pulse">Release to Scan</p>
              </>
            ) : (
              <>
                <Upload className="w-12 h-12 text-cyber-blue/30 mx-auto mb-4" />
                <p className="text-slate-500 text-xs font-mono uppercase tracking-wider mb-2">Drag & Drop Waste Image</p>
                <p className="text-slate-600 text-[10px] uppercase font-mono tracking-widest">— OR —</p>
              </>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <button
          onClick={triggerFileSelect}
          disabled={isAnalyzing}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-white/5 border border-white/10 hover:border-cyber-blue/50 transition-all disabled:opacity-50"
        >
          <Upload className="w-4 h-4 text-cyber-blue" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">Upload File</span>
          <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
        </button>

        <button
          onClick={mode === 'camera' ? stopCamera : startCamera}
          disabled={isAnalyzing}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-lg border transition-all disabled:opacity-50 ${
            mode === 'camera' ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-white/5 border-white/10 hover:border-cyber-blue/50 text-slate-300'
          }`}
        >
          {mode === 'camera' ? <XCircle className="w-4 h-4" /> : <Camera className="w-4 h-4 text-cyber-blue" />}
          <span className="font-mono text-xs font-bold uppercase tracking-wider">{mode === 'camera' ? 'Stop Sensor' : 'Active Cam'}</span>
        </button>
      </div>
    </div>
  );
};

export default InputSection;