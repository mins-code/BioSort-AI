export enum WasteCategory {
  YELLOW = 'Yellow',
  RED = 'Red',
  BLUE = 'Blue',
  WHITE = 'White'
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