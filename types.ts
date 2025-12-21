export enum WasteCategory {
  CHEMICAL = 'Chemical Waste',
  INFECTIOUS = 'Infectious Waste',
  PLASTIC = 'Plastic/Recyclable Waste',
  GENERAL = 'General Waste'
}

export interface PredictionResult {
  category: WasteCategory;
  confidence: number;
}

export interface ThemeColor {
  text: string;
  border: string;
  bg: string;
  shadow: string;
  bar: string;
}