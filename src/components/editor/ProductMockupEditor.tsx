import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Stage, Layer, Rect, Text, Image as KonvaImage, Group, Transformer } from 'react-konva';
import Konva from 'konva';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import {
  UploadIcon, TypeIcon, TrashIcon, UndoIcon, RedoIcon, DownloadIcon,
  MousePointerIcon, SquareIcon
} from 'lucide-react';
import { EditorHistory } from './history';
import { exportDesignPNG, exportDesignWithMockup, downloadFile, dataURLToBase64 } from './export';
import { EditorObject, EditorState, ProductPreset } from './types';
import InquiryModal from './InquiryModal';

interface ProductMockupEditorProps {
  preset: ProductPreset;
  selectedSize?: string;
  onSizeChange?: (size: string) => void;
  shirtColor?: string;
  onShirtColorChange?: (color: string) => void;
  panelPricing?: { [key: string]: string };
}

let objectIdCounter = 0;
function hexToRgb(hex: string) {
  const clean = hex.replace('#', '');
  const full = clean.length === 3 ? clean.split('').map(c => c + c).join('') : clean;
  const num = parseInt(full, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}


export default function ProductMockupEditor({
  preset,
  selectedSize,
  onSizeChange,
  shirtColor,
  onShirtColorChange,
  panelPricing
}: ProductMockupEditorProps) {
  const { toast } = useToast();
  const stageRef = useRef<Konva.Stage>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tshirtBaseRef = useRef<Konva.Image>(null);


  const [editorState, setEditorState] = useState<EditorState>({
    objects: [],
    selectedId: null
  });

  const historyRef = useRef(new EditorHistory());
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const [tool, setTool] = useState<'select' | 'text' | 'shape'>('select');
  const [textInput, setTextInput] = useState('');
  const [textColor, setTextColor] = useState('#000000');
  const [fontSize, setFontSize] = useState(40);
  const [showInquiry, setShowInquiry] = useState(false);
  const [mockupImage, setMockupImage] = useState<HTMLImageElement | null>(null);
  const [tshirtShade, setTshirtShade] = useState<HTMLImageElement | null>(null);


  const printableRect = selectedSize && preset.printableRects[selectedSize]
    ? preset.printableRects[selectedSize]
    : preset.printableRects['default'] || { x: 50, y: 50, width: 300, height: 400 };

  useEffect(() => {
    if (preset.mockupImageUrl) {
      const img = new Image();
      img.src = preset.mockupImageUrl;
      img.onload = () => setMockupImage(img);
    }
  }, [preset.mockupImageUrl]);
  useEffect(() => {
  if (preset.productType === 'tshirt') {
    const shade = new Image();
    shade.src = '/mockups/tshirt/shade.png';
    shade.onload = () => setTshirtShade(shade);
  } else {
    setTshirtShade(null);
  }
}, [preset.productType]);

useEffect(() => {
  if (preset.productType !== 'tshirt') return;
  const node = tshirtBaseRef.current;
  if (!node) return;

  // Konva filters work ONLY on cached nodes
  node.cache();
  node.getLayer()?.batchDraw();
}, [preset.productType, shirtColor, mockupImage]);


  const saveToHistory = useCallback((state: EditorState) => {
    historyRef.current.push(state);
    setCanUndo(historyRef.current.canUndo());
    setCanRedo(historyRef.current.canRedo());
  }, []);

  const updateEditorState = useCallback((newState: EditorState) => {
    setEditorState(newState);
    saveToHistory(newState);
  }, [saveToHistory]);

  const handleUndo = () => {
    const previousState = historyRef.current.undo();
    if (previousState) {
      setEditorState(previousState);
      setCanUndo(historyRef.current.canUndo());
      setCanRedo(historyRef.current.canRedo());
    }
  };

  const handleRedo = () => {
    const nextState = historyRef.current.redo();
    if (nextState) {
      setEditorState(nextState);
      setCanUndo(historyRef.current.canUndo());
      setCanRedo(historyRef.current.canRedo());
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === 'z' && e.shiftKey || e.key === 'y')) {
        e.preventDefault();
        handleRedo();
      }
      if (e.key === 'Delete' && editorState.selectedId) {
        handleDeleteSelected();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [editorState.selectedId]);

  const handleAddText = () => {
    if (!textInput.trim()) return;

    const newObject: EditorObject = {
      id: `text-${objectIdCounter++}`,
      type: 'text',
      x: printableRect.x + 50,
      y: printableRect.y + 50,
      width: 200,
      height: 50,
      rotation: 0,
      opacity: 1,
      text: textInput,
      fontSize,
      fill: textColor,
      fontFamily: 'Arial',
      fontWeight: 'normal',
      fontStyle: 'normal'
    };

    const newState = {
      objects: [...editorState.objects, newObject],
      selectedId: newObject.id
    };

    updateEditorState(newState);
    setTextInput('');
    setTool('select');
  };

  const handleAddShape = () => {
    const newObject: EditorObject = {
      id: `rect-${objectIdCounter++}`,
      type: 'rect',
      x: printableRect.x + 50,
      y: printableRect.y + 50,
      width: 100,
      height: 100,
      rotation: 0,
      opacity: 1,
      fill: 'transparent',
      stroke: '#000000',
      strokeWidth: 2
    };

setEditorState((prev) => {
  const newState = {
    objects: [...prev.objects, newObject],
    selectedId: newObject.id
  };
  saveToHistory(newState);
  setCanUndo(historyRef.current.canUndo());
  setCanRedo(historyRef.current.canRedo());
  return newState;
});

    setTool('select');
  };

  const handleDeleteSelected = () => {
    if (!editorState.selectedId) return;

    const newState = {
      objects: editorState.objects.filter(obj => obj.id !== editorState.selectedId),
      selectedId: null
    };

    updateEditorState(newState);
  };

  const handleClearAll = () => {
    const newState = {
      objects: [],
      selectedId: null
    };

    updateEditorState(newState);
  };

  const onDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      const imageData = e.target?.result as string;
      const img = new Image();

      img.onload = () => {
        const scale = Math.min(
          printableRect.width / img.width,
          printableRect.height / img.height,
          1
        );

        const scaledWidth = img.width * scale;
        const scaledHeight = img.height * scale;

        const newObject: EditorObject = {
          id: `image-${objectIdCounter++}`,
          type: 'image',
          x: printableRect.x + (printableRect.width - scaledWidth) / 2,
          y: printableRect.y + (printableRect.height - scaledHeight) / 2,
          width: scaledWidth,
          height: scaledHeight,
          rotation: 0,
          opacity: 1,
          imageData
        };

        const newState = {
          objects: [...editorState.objects, newObject],
          selectedId: newObject.id
        };

        updateEditorState(newState);
      };

      img.src = imageData;
    };

    reader.readAsDataURL(file);
  };

const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
  onDrop,
  accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.gif'] }, // remove svg (often breaks Konva)
  multiple: false,
  noClick: true,      // keep noClick true
  noKeyboard: true    // optional: prevents weird focus triggering
});


  const handleObjectSelect = (id: string) => {
    setEditorState(prev => ({ ...prev, selectedId: id }));
  };

  const handleObjectChange = (id: string, updates: Partial<EditorObject>) => {
    const newObjects = editorState.objects.map(obj =>
      obj.id === id ? { ...obj, ...updates } : obj
    );

    const newState = {
      objects: newObjects,
      selectedId: editorState.selectedId
    };

    setEditorState(newState);
  };

  const handleDownload = async () => {
    if (!stageRef.current) return;

    try {
      const designPNG = await exportDesignPNG(stageRef, 2);
      downloadFile(designPNG, `design-${preset.productType}-${Date.now()}.png`);

      toast({
        title: 'Success',
        description: 'Design downloaded successfully!'
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: 'Error',
        description: 'Failed to download design'
      });
    }
  };

  const handleInquiryOpen = () => {
    setShowInquiry(true);
  };

  const handleInquirySubmit = () => {
    handleClearAll();
    setShowInquiry(false);
  };

  const getInquiryDataSync = () => ({
    productType: preset.productType,
    panelSize: selectedSize,
    price: panelPricing?.[selectedSize || 'default'] || 'N/A',
    designJSON: JSON.stringify(editorState),
    designPNGBase64: stageRef.current ? dataURLToBase64(stageRef.current.toDataURL({ pixelRatio: 2 })) : '',
    mockupPNGBase64: undefined
  });

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2 bg-muted p-3 rounded-lg flex-wrap">
          <div className="flex gap-1">
            <Button
              variant={tool === 'select' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTool('select')}
              title="Select Tool"
            >
              <MousePointerIcon className="h-4 w-4" />
            </Button>
            <Button
              variant={tool === 'text' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTool('text')}
              title="Add Text"
            >
              <TypeIcon className="h-4 w-4" />
            </Button>
            <Button
              variant={tool === 'shape' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTool('shape')}
              title="Add Shape"
            >
              <SquareIcon className="h-4 w-4" />
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6" />

          <div className="flex gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={handleUndo}
              disabled={!canUndo}
              title="Undo (Ctrl+Z)"
            >
              <UndoIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRedo}
              disabled={!canRedo}
              title="Redo (Ctrl+Shift+Z)"
            >
              <RedoIcon className="h-4 w-4" />
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6" />

          <div className="flex gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDeleteSelected}
              disabled={!editorState.selectedId}
              title="Delete (Delete key)"
            >
              <TrashIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearAll}
              title="Clear All"
            >
              Clear
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6" />

          <Button
            variant="default"
            size="sm"
            onClick={handleDownload}
            title="Download"
          >
            <DownloadIcon className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>

        <div className="flex gap-4">
          <div
            {...getRootProps()}
            className={`flex-1 border-2 rounded-lg overflow-hidden bg-background p-4 flex items-center justify-center min-h-[600px] transition-colors ${
              isDragActive
                ? 'border-primary bg-primary/5'
                : 'border-border'
            }`}
          >
            <input {...getInputProps()} />

            <Stage
              ref={stageRef}
              width={preset.canvasWidth}
              height={preset.canvasHeight}
              style={{ border: '1px solid #ccc', background: 'white' }}
            >
              <Layer>

{/* TSHIRT realistic mockup: tinted base + shading overlay */}
{mockupImage && preset.productType === 'tshirt' && (() => {
  const rgb = hexToRgb(shirtColor || '#ffffff');
  return (
    <>
      {/* Base shirt */}
<KonvaImage
  ref={tshirtBaseRef}
  image={mockupImage}
  x={0}
  y={0}
  width={preset.canvasWidth}
  height={preset.canvasHeight}
  filters={[Konva.Filters.RGBA]}
  red={rgb.r}
  green={rgb.g}
  blue={rgb.b}
  alpha={255}
/>

      {/* Shading overlay keeps folds/shadows */}
      {tshirtShade && (
        <KonvaImage
          image={tshirtShade}
          x={0}
          y={0}
          width={preset.canvasWidth}
          height={preset.canvasHeight}
          opacity={0.9}
        />
      )}
    </>
  );
})()}


                <Rect
                  x={printableRect.x}
                  y={printableRect.y}
                  width={printableRect.width}
                  height={printableRect.height}
                  fill="transparent"
                  stroke="#999999"
                  strokeWidth={1}
                  dash={[5, 5]}
                />

                {editorState.objects.map(obj => (
                  <EditorObjectRenderer
                    key={obj.id}
                    obj={obj}
                    isSelected={obj.id === editorState.selectedId}
                    onSelect={() => handleObjectSelect(obj.id)}
                    onChange={(updates) => handleObjectChange(obj.id, updates)}
                    transformerRef={transformerRef}
                    printableRect={printableRect}
                  />
                ))}

                {editorState.selectedId && (
                  <Transformer
                    ref={transformerRef}
                    boundBoxFunc={(oldBox, newBox) => {
                      if (
                        newBox.x < printableRect.x ||
                        newBox.y < printableRect.y ||
                        newBox.x + newBox.width > printableRect.x + printableRect.width ||
                        newBox.y + newBox.height > printableRect.y + printableRect.height
                      ) {
                        return oldBox;
                      }
                      return newBox;
                    }}
                  />
                )}
              </Layer>
            </Stage>
          </div>

          <div className="w-72 space-y-4 overflow-y-auto max-h-[600px]">
            {tool === 'text' && (
              <div className="space-y-3 p-4 bg-muted rounded-lg">
                <Label>Add Text</Label>
                <Input
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Enter text..."
                  onKeyPress={(e) => e.key === 'Enter' && handleAddText()}
                />

                <div>
                  <Label className="text-xs">Font Size: {fontSize}px</Label>
                  <Input
                    type="range"
                    min="12"
                    max="120"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                  />
                </div>

                <div>
                  <Label className="text-xs">Text Color</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="w-16 h-8 cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="flex-1 text-xs"
                    />
                  </div>
                </div>

                <Button onClick={handleAddText} className="w-full" disabled={!textInput.trim()}>
                  Add Text
                </Button>
              </div>
            )}

            {tool === 'shape' && (
              <div className="space-y-3 p-4 bg-muted rounded-lg">
                <Label>Add Shape</Label>
                <Button onClick={handleAddShape} className="w-full">
                  Add Rectangle
                </Button>
              </div>
            )}

            {tool === 'select' && editorState.selectedId && (
              <div className="space-y-3 p-4 bg-muted rounded-lg">
                <Label className="text-sm font-semibold">Object Properties</Label>
                <p className="text-xs text-muted-foreground">
                  Drag to move, use handles to resize/rotate
                </p>
              </div>
            )}

            <Separator />

<div
  role="button"
  tabIndex={0}
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    open(); // ✅ this opens file picker
  }}
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      open();
    }
  }}
  className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
    isDragActive ? 'border-primary bg-primary/10' : 'border-border hover:bg-muted'
  }`}
>
  <UploadIcon className="h-8 w-8 mx-auto mb-2 text-accent" />
  <p className="text-xs font-medium">Upload Image</p>
  <p className="text-xs text-muted-foreground mt-1">PNG, JPG, GIF</p>
</div>


            <Button
              onClick={handleInquiryOpen}
              className="w-full bg-primary text-primary-foreground"
            >
              Send Inquiry
            </Button>
          </div>
        </div>
      </div>

      <InquiryModal
        open={showInquiry}
        onOpenChange={setShowInquiry}
        inquiryData={getInquiryDataSync()}
        onSubmit={handleInquirySubmit}
      />
    </>
  );
}

interface EditorObjectRendererProps {
  obj: EditorObject;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (updates: Partial<EditorObject>) => void;
  transformerRef: React.RefObject<Konva.Transformer>;
  printableRect: { x: number; y: number; width: number; height: number };
}

function EditorObjectRenderer({
  obj,
  isSelected,
  onSelect,
  onChange,
  transformerRef,
  printableRect
}: EditorObjectRendererProps) {
  const nodeRef = useRef<any>(null);

  useEffect(() => {
    if (isSelected && transformerRef.current && nodeRef.current) {
      transformerRef.current.nodes([nodeRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected, transformerRef]);

  const handleDragMove = (e: Konva.KonvaEventObject<DragEvent>) => {
    const x = Math.max(printableRect.x, Math.min(e.target.x(), printableRect.x + printableRect.width - obj.width));
    const y = Math.max(printableRect.y, Math.min(e.target.y(), printableRect.y + printableRect.height - obj.height));

    onChange({ x, y });
  };

  if (obj.type === 'text') {
    return (
      <Text
        ref={nodeRef}
        x={obj.x}
        y={obj.y}
        width={obj.width}
        height={obj.height}
        text={obj.text}
        fontSize={obj.fontSize || 40}
        fill={obj.fill || '#000000'}
        fontFamily={obj.fontFamily || 'Arial'}
        rotation={obj.rotation}
        opacity={obj.opacity}
        draggable
        onClick={onSelect}
        onTap={onSelect}
        onDragMove={handleDragMove}
        onTransformEnd={(e) => {
          const node = e.target;
          onChange({
            x: node.x(),
            y: node.y(),
            rotation: node.rotation(),
            width: node.width() * node.scaleX(),
            height: node.height() * node.scaleY()
          });
          node.scaleX(1);
          node.scaleY(1);
        }}
      />
    );
  }

  if (obj.type === 'image' && obj.imageData) {
    return (
      <KonvaImageObject
        ref={nodeRef}
        obj={obj}
        isSelected={isSelected}
        onSelect={onSelect}
        onChange={onChange}
        onDragMove={handleDragMove}
        transformerRef={transformerRef}
      />
    );
  }

  if (obj.type === 'rect') {
    return (
      <Rect
        ref={nodeRef}
        x={obj.x}
        y={obj.y}
        width={obj.width}
        height={obj.height}
        fill={obj.fill}
        stroke={obj.stroke}
        strokeWidth={obj.strokeWidth}
        rotation={obj.rotation}
        opacity={obj.opacity}
        draggable
        onClick={onSelect}
        onTap={onSelect}
        onDragMove={handleDragMove}
        onTransformEnd={(e) => {
          const node = e.target;
          onChange({
            x: node.x(),
            y: node.y(),
            rotation: node.rotation(),
            width: node.width() * node.scaleX(),
            height: node.height() * node.scaleY()
          });
          node.scaleX(1);
          node.scaleY(1);
        }}
      />
    );
  }

  return null;
}

const KonvaImageObject = React.forwardRef<
  Konva.Image,
  {
    obj: EditorObject;
    isSelected: boolean;
    onSelect: () => void;
    onChange: (updates: Partial<EditorObject>) => void;
    onDragMove: (e: Konva.KonvaEventObject<DragEvent>) => void;
    transformerRef: React.RefObject<Konva.Transformer>;
  }
>(({ obj, isSelected, onSelect, onChange, onDragMove, transformerRef }, ref) => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    if (obj.imageData) {
      const img = new Image();
      img.src = obj.imageData;
      img.onload = () => setImage(img);
    }
  }, [obj.imageData]);

  if (!image) return null;

  return (
    <KonvaImage
      ref={ref}
      image={image}
      x={obj.x}
      y={obj.y}
      width={obj.width}
      height={obj.height}
      rotation={obj.rotation}
      opacity={obj.opacity}
      draggable
      onClick={onSelect}
      onTap={onSelect}
      onDragMove={onDragMove}
      onTransformEnd={(e) => {
        const node = e.target;
        onChange({
          x: node.x(),
          y: node.y(),
          rotation: node.rotation(),
          width: node.width() * node.scaleX(),
          height: node.height() * node.scaleY()
        });
        node.scaleX(1);
        node.scaleY(1);
      }}
    />
  );
});

KonvaImageObject.displayName = 'KonvaImageObject';
