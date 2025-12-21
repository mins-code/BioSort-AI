import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Background from './components/Background';
import InputSection from './components/InputSection';
import PredictionCard from './components/PredictionCard';
import ConfidenceBar from './components/ConfidenceBar';
import { PredictionResult } from './types';
import { DEMO_PREDICTIONS } from './constants';

const App: React.FC = () => {
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  // Mock Analysis Function
  // In Phase-3, this will be replaced by the actual Teachable Machine model inference
  const handleImageAnalysis = useCallback((imageUrl: string) => {
    setCurrentImage(imageUrl);
    setIsAnalyzing(true);
    setPrediction(null);

    // Simulate Network/Processing Latency for Effect (1.5 seconds)
    setTimeout(() => {
      // Pick a random prediction for demonstration purposes
      const randomResult = DEMO_PREDICTIONS[Math.floor(Math.random() * DEMO_PREDICTIONS.length)];
      
      // Add slight randomness to confidence for realism
      const variedConfidence = Math.min(99.9, Math.max(70, randomResult.confidence + (Math.random() * 5 - 2.5)));
      
      setPrediction({
        ...randomResult,
        confidence: variedConfidence
      });
      setIsAnalyzing(false);
    }, 1500);
  }, []);

  return (
    <div className="min-h-screen font-sans text-slate-200 relative selection:bg-cyber-blue/30 selection:text-white">
      <Background />
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Input Column */}
          <div className="lg:col-span-5 h-full">
            <InputSection 
              onImageSelected={handleImageAnalysis} 
              isAnalyzing={isAnalyzing} 
            />
          </div>

          {/* Results Column */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex-1 min-h-[300px]">
              <PredictionCard 
                prediction={prediction} 
                isAnalyzing={isAnalyzing} 
              />
            </div>
            
            <div className="h-auto">
              <ConfidenceBar 
                prediction={prediction} 
              />
            </div>
          </div>
        </div>

        {/* Footer / Status Bar */}
        <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center text-[10px] text-slate-500 font-mono tracking-[0.2em] uppercase">
          <div>
            STATUS: <span className={isAnalyzing ? "text-yellow-400 animate-pulse font-bold" : "text-cyber-green font-bold text-glow"}>
              {isAnalyzing ? "PROCESSING TENSORS..." : "READY FOR INFERENCE"}
            </span>
          </div>
          <div>
            SYSTEM: v2.0-beta [PHASE-2 UI]
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;