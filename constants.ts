import { WasteCategory, ThemeColor } from './types';
import { TriangleAlert, Biohazard, Recycle, Trash2 } from 'lucide-react';

// Maps Waste Categories to specific color themes and icons
export const CATEGORY_THEMES: Record<WasteCategory, ThemeColor> = {
  [WasteCategory.YELLOW]: {
    text: 'text-yellow-400',
    border: 'border-yellow-400/50',
    bg: 'bg-yellow-400/10',
    shadow: 'shadow-[0_0_30px_-5px_rgba(250,204,21,0.3)]',
    bar: 'bg-yellow-400'
  },
  [WasteCategory.RED]: {
    text: 'text-red-500',
    border: 'border-red-500/50',
    bg: 'bg-red-500/10',
    shadow: 'shadow-[0_0_30px_-5px_rgba(239,68,68,0.3)]',
    bar: 'bg-red-500'
  },
  [WasteCategory.BLUE]: {
    text: 'text-blue-400',
    border: 'border-blue-400/50',
    bg: 'bg-blue-400/10',
    shadow: 'shadow-[0_0_30px_-5px_rgba(96,165,250,0.3)]',
    bar: 'bg-blue-400'
  },
  [WasteCategory.WHITE]: {
    text: 'text-gray-200',
    border: 'border-gray-200/50',
    bg: 'bg-gray-200/10',
    shadow: 'shadow-[0_0_30px_-5px_rgba(229,231,235,0.3)]',
    bar: 'bg-gray-200'
  }
};

export const CATEGORY_ICONS = {
  [WasteCategory.YELLOW]: TriangleAlert,
  [WasteCategory.RED]: Biohazard,
  [WasteCategory.BLUE]: Recycle,
  [WasteCategory.WHITE]: Trash2
};

export const DEMO_PREDICTIONS = [
  { category: WasteCategory.YELLOW, confidence: 92.4 },
  { category: WasteCategory.RED, confidence: 88.9 },
  { category: WasteCategory.BLUE, confidence: 95.1 },
  { category: WasteCategory.WHITE, confidence: 78.5 },
];