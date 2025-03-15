export interface MediaItem {
  type: "image" | "iframe";
  src: string;
  thumbnailSrc?: string;
  iframeId?: string; // Optional ID for the iframe
}

export interface ColorOption {
  color: string;
  onClick?: () => void;
  sceneId?: string; // Optional scene ID to switch to when color is selected
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  media: MediaItem[];
  specifications: Array<{ key: string; value: string }>;
  rating: number;
  reviewCount: number;
  colors: string[]; // Keep for backward compatibility
  colorOptions?: ColorOption[]; // Make optional for backward compatibility
  sizes?: string[];
  // Optional iframe messaging configuration
  iframeConfig?: {
    defaultScene?: string;
    colorScenes?: { [colorCode: string]: string };
    sizeScenes?: { [size: string]: string };
  };
} 