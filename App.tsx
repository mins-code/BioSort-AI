import React, { useState, useCallback } from 'react';
import * as tmImage from '@teachablemachine/image';
import Header from './components/Header';
import Background from './components/Background';
import InputSection from './components/InputSection';
import PredictionCard from './components/PredictionCard';
import ConfidenceBar from './components/ConfidenceBar';
import { PredictionResult, WasteCategory } from './types';

// REPLACE THIS WITH YOUR FULL LINK
const MODEL_URL = "https://teachablemachine.withgoogle.com/models/dppSNGojQ/"; 

const App: React.FC = () => {
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  // New function to clear the prediction data
  const handleReset = useCallback(() => {
    setCurrentImage(null);
    setPrediction(null);
    setIsAnalyzing(false);
  }, []);

  const handleImageAnalysis = useCallback(async (imageUrl: string) => {
    setCurrentImage(imageUrl);
    setIsAnalyzing(true);
    setPrediction(null);

    try {
      // 1. Load the model from your link
      const model = await tmImage.load(MODEL_URL + "model.json", MODEL_URL + "metadata.json");
      
      // 2. Load image element
      const img = new Image();
      img.src = imageUrl;
      await img.decode();
      
      // 3. Predict
      const predictions = await model.predict(img);
      
      // 4. Find highest probability
      const topResult = predictions.reduce((prev, current) => 
        (prev.probability > current.probability) ? prev : current
      );

      // 5. Update UI
      setPrediction({
        category: topResult.className as WasteCategory,
        confidence: topResult.probability * 100
      });

    } catch (error) {
      console.error("AI Error:", error);
      alert("Error loading model. Check your URL.");
    } finally {
      setIsAnalyzing(false);
    }
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
              onReset={handleReset} 
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
              {isAnalyzing ? "ANALYZING..." : "SYSTEM ONLINE"}
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