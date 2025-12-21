import { WasteCategory, ThemeColor } from './types';
import { TriangleAlert, Biohazard, Recycle, Trash2 } from 'lucide-react';

// Maps Waste Categories to specific color themes and icons
export const CATEGORY_THEMES: Record<WasteCategory, ThemeColor> = {
  [WasteCategory.CHEMICAL]: {
    text: 'text-yellow-400',
    border: 'border-yellow-400/50',
    bg: 'bg-yellow-400/10',
    shadow: 'shadow-[0_0_30px_-5px_rgba(250,204,21,0.3)]',
    bar: 'bg-yellow-400'
  },
  [WasteCategory.INFECTIOUS]: {
    text: 'text-red-500',
    border: 'border-red-500/50',
    bg: 'bg-red-500/10',
    shadow: 'shadow-[0_0_30px_-5px_rgba(239,68,68,0.3)]',
    bar: 'bg-red-500'
  },
  [WasteCategory.PLASTIC]: {
    text: 'text-blue-400',
    border: 'border-blue-400/50',
    bg: 'bg-blue-400/10',
    shadow: 'shadow-[0_0_30px_-5px_rgba(96,165,250,0.3)]',
    bar: 'bg-blue-400'
  },
  [WasteCategory.GENERAL]: {
    text: 'text-gray-200',
    border: 'border-gray-200/50',
    bg: 'bg-gray-200/10',
    shadow: 'shadow-[0_0_30px_-5px_rgba(229,231,235,0.3)]',
    bar: 'bg-gray-200'
  }
};

export const CATEGORY_ICONS = {
  [WasteCategory.CHEMICAL]: TriangleAlert,
  [WasteCategory.INFECTIOUS]: Biohazard,
  [WasteCategory.PLASTIC]: Recycle,
  [WasteCategory.GENERAL]: Trash2
};

export const DEMO_PREDICTIONS = [
  { category: WasteCategory.CHEMICAL, confidence: 92.4 },
  { category: WasteCategory.INFECTIOUS, confidence: 88.9 },
  { category: WasteCategory.PLASTIC, confidence: 95.1 },
  { category: WasteCategory.GENERAL, confidence: 78.5 },
];