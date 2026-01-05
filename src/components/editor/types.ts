export type ShapeType = 'rect' | 'circle' | 'line' | 'text' | 'image';

export interface EditorObject {
  id: string;
  type: ShapeType;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string;
  fontStyle?: string;
  imageUrl?: string;
  imageData?: string;
}

export interface EditorState {
  objects: EditorObject[];
  selectedId: string | null;
}

export interface PrintableRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ProductPreset {
  productType: 'panel' | 'tshirt';
  name: string;
  canvasWidth: number;
  canvasHeight: number;
  mockupImageUrl?: string;
  printableRects: {
    [key: string]: PrintableRect;
  };
}

export interface InquiryData {
  name: string;
  email: string;
  message: string;
  productType: 'panel' | 'tshirt';
  panelSize?: string;
  price?: string;
  designJSON: string;
  designPNGBase64: string;
  mockupPNGBase64?: string;
  createdAt: string;
}
