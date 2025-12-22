import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  UploadIcon, TypeIcon, TrashIcon, PencilIcon, CircleIcon, SquareIcon,
  UndoIcon, RedoIcon, DownloadIcon, ImageIcon, MousePointerIcon,
  MinusIcon, MoveIcon, RotateCwIcon, SunIcon
} from 'lucide-react';

interface PanelEditorProps {
  onClose: () => void;
}

export default function PanelEditor({ onClose }: PanelEditorProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState('1x1.5');
  const [history, setHistory] = useState<any[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const [drawingMode, setDrawingMode] = useState<'select' | 'draw' | 'text' | 'shape'>('select');
  const [shapeType, setShapeType] = useState<'rect' | 'circle' | 'line'>('rect');
  const [brushColor, setBrushColor] = useState('#000000');
  const [brushWidth, setBrushWidth] = useState(5);

  const [text, setText] = useState('');
  const [textColor, setTextColor] = useState('#000000');
  const [fontSize, setFontSize] = useState(40);
  const [fontFamily, setFontFamily] = useState('Source Sans Pro');
  const [fontWeight, setFontWeight] = useState<'normal' | 'bold'>('normal');
  const [fontStyle, setFontStyle] = useState<'normal' | 'italic'>('normal');
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>('left');

  const [activeObject, setActiveObject] = useState<any>(null);
  const [objectOpacity, setObjectOpacity] = useState(100);
  const [objectRotation, setObjectRotation] = useState(0);

  useEffect(() => {
    const initCanvas = async () => {
      if (canvasRef.current && !canvas) {
        const { Canvas, PencilBrush } = await import('fabric');
        const fabricCanvas = new Canvas(canvasRef.current, {
          width: 800,
          height: 600,
          backgroundColor: '#ffffff',
          isDrawingMode: false
        });

        fabricCanvas.freeDrawingBrush = new PencilBrush(fabricCanvas);
        fabricCanvas.freeDrawingBrush.color = brushColor;
        fabricCanvas.freeDrawingBrush.width = brushWidth;

        fabricCanvas.on('selection:created', (e: any) => {
          setActiveObject(e.selected[0]);
          if (e.selected[0]) {
            setObjectOpacity(Math.round((e.selected[0].opacity || 1) * 100));
            setObjectRotation(Math.round(e.selected[0].angle || 0));
          }
        });

        fabricCanvas.on('selection:updated', (e: any) => {
          setActiveObject(e.selected[0]);
          if (e.selected[0]) {
            setObjectOpacity(Math.round((e.selected[0].opacity || 1) * 100));
            setObjectRotation(Math.round(e.selected[0].angle || 0));
          }
        });

        fabricCanvas.on('selection:cleared', () => {
          setActiveObject(null);
        });

        fabricCanvas.on('object:modified', () => {
          saveHistory(fabricCanvas);
        });

        setCanvas(fabricCanvas);
        saveHistory(fabricCanvas);
      }
    };

    initCanvas();

    return () => {
      if (canvas) {
        canvas.dispose();
      }
    };
  }, []);

  useEffect(() => {
    if (canvas) {
      if (drawingMode === 'draw') {
        canvas.isDrawingMode = true;
        canvas.freeDrawingBrush.color = brushColor;
        canvas.freeDrawingBrush.width = brushWidth;
      } else {
        canvas.isDrawingMode = false;
      }
    }
  }, [drawingMode, brushColor, brushWidth, canvas]);

  const saveHistory = (fabricCanvas: any) => {
    const json = JSON.stringify(fabricCanvas.toJSON());
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push(json);
      return newHistory.slice(-20);
    });
    setHistoryIndex(prev => Math.min(prev + 1, 19));
  };

  const undo = async () => {
    if (historyIndex > 0 && canvas) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      await canvas.loadFromJSON(JSON.parse(history[newIndex]));
      canvas.renderAll();
    }
  };

  const redo = async () => {
    if (historyIndex < history.length - 1 && canvas) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      await canvas.loadFromJSON(JSON.parse(history[newIndex]));
      canvas.renderAll();
    }
  };

  const onDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0 && canvas) {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = async (e) => {
        const imgUrl = e.target?.result as string;

        const { FabricImage } = await import('fabric');
        FabricImage.fromURL(imgUrl, { crossOrigin: 'anonymous' }).then((img: any) => {
          const scale = Math.min(
            canvas.width / img.width,
            canvas.height / img.height,
            1
          );
          img.scale(scale * 0.8);
          img.set({
            left: (canvas.width - img.width * img.scaleX) / 2,
            top: (canvas.height - img.height * img.scaleY) / 2,
            selectable: true,
            hasControls: true,
            hasBorders: true
          });
          canvas.add(img);
          canvas.setActiveObject(img);
          canvas.renderAll();
          saveHistory(canvas);
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.svg']
    },
    multiple: false
  });

  const addText = async () => {
    if (text && canvas) {
      const { FabricText } = await import('fabric');
      const fabricText = new FabricText(text, {
        left: 100,
        top: 100,
        fontSize: fontSize,
        fill: textColor,
        fontFamily: fontFamily,
        fontWeight: fontWeight,
        fontStyle: fontStyle,
        textAlign: textAlign,
        selectable: true,
        hasControls: true,
        hasBorders: true,
        editable: true
      });
      canvas.add(fabricText);
      canvas.setActiveObject(fabricText);
      canvas.renderAll();
      saveHistory(canvas);
      setText('');
    }
  };

  const addShape = async () => {
    if (canvas) {
      const { Rect, Circle, Line } = await import('fabric');
      let shape: any;

      if (shapeType === 'rect') {
        shape = new Rect({
          left: 100,
          top: 100,
          width: 150,
          height: 100,
          fill: 'transparent',
          stroke: brushColor,
          strokeWidth: brushWidth
        });
      } else if (shapeType === 'circle') {
        shape = new Circle({
          left: 100,
          top: 100,
          radius: 75,
          fill: 'transparent',
          stroke: brushColor,
          strokeWidth: brushWidth
        });
      } else if (shapeType === 'line') {
        shape = new Line([50, 50, 200, 50], {
          stroke: brushColor,
          strokeWidth: brushWidth
        });
      }

      if (shape) {
        shape.set({
          selectable: true,
          hasControls: true,
          hasBorders: true
        });
        canvas.add(shape);
        canvas.setActiveObject(shape);
        canvas.renderAll();
        saveHistory(canvas);
      }
    }
  };

  const deleteSelected = () => {
    if (canvas) {
      const activeObjects = canvas.getActiveObjects();
      if (activeObjects.length > 0) {
        activeObjects.forEach((obj: any) => {
          canvas.remove(obj);
        });
        canvas.discardActiveObject();
        canvas.renderAll();
        saveHistory(canvas);
      }
    }
  };

  const clearCanvas = () => {
    if (canvas) {
      canvas.clear();
      canvas.backgroundColor = '#ffffff';
      canvas.renderAll();
      saveHistory(canvas);
    }
  };

  const applyOpacity = (value: number) => {
    if (activeObject && canvas) {
      activeObject.set('opacity', value / 100);
      canvas.renderAll();
      setObjectOpacity(value);
    }
  };

  const applyRotation = (value: number) => {
    if (activeObject && canvas) {
      activeObject.set('angle', value);
      canvas.renderAll();
      setObjectRotation(value);
    }
  };

  const bringToFront = () => {
    if (activeObject && canvas) {
      canvas.bringToFront(activeObject);
      canvas.renderAll();
      saveHistory(canvas);
    }
  };

  const sendToBack = () => {
    if (activeObject && canvas) {
      canvas.sendToBack(activeObject);
      canvas.renderAll();
      saveHistory(canvas);
    }
  };

  const downloadImage = () => {
    if (canvas) {
      const dataURL = canvas.toDataURL({
        format: 'png',
        quality: 1
      });

      const link = document.createElement('a');
      link.download = `design-${Date.now()}.png`;
      link.href = dataURL;
      link.click();

      toast({
        title: 'Downloaded',
        description: 'Your design has been downloaded successfully.',
      });
    }
  };

  const handleSubmit = () => {
    downloadImage();
    toast({
      title: 'Inquiry sent',
      description: 'Your inquiry has been sent successfully. We will contact you shortly.',
    });
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] overflow-hidden bg-background text-foreground">
        <DialogHeader>
          <DialogTitle className="text-h4 font-heading font-bold text-foreground">Photo Editor</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[calc(95vh-120px)]">
          <div className="lg:col-span-3 flex flex-col gap-4">
            <div className="flex items-center justify-between gap-2 bg-muted p-2 rounded-lg">
              <div className="flex gap-1">
                <Button
                  variant={drawingMode === 'select' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setDrawingMode('select')}
                  title="Select Tool"
                >
                  <MousePointerIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant={drawingMode === 'draw' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setDrawingMode('draw')}
                  title="Draw Tool"
                >
                  <PencilIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant={drawingMode === 'text' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setDrawingMode('text')}
                  title="Text Tool"
                >
                  <TypeIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant={drawingMode === 'shape' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setDrawingMode('shape')}
                  title="Shape Tool"
                >
                  <SquareIcon className="h-4 w-4" />
                </Button>
              </div>

              <Separator orientation="vertical" className="h-8" />

              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={undo}
                  disabled={historyIndex <= 0}
                  title="Undo"
                >
                  <UndoIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={redo}
                  disabled={historyIndex >= history.length - 1}
                  title="Redo"
                >
                  <RedoIcon className="h-4 w-4" />
                </Button>
              </div>

              <Separator orientation="vertical" className="h-8" />

              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={deleteSelected}
                  disabled={!activeObject}
                  title="Delete Selected"
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearCanvas}
                  title="Clear Canvas"
                >
                  Clear All
                </Button>
              </div>

              <Separator orientation="vertical" className="h-8" />

              <Button
                variant="default"
                size="sm"
                onClick={downloadImage}
                title="Download"
              >
                <DownloadIcon className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>

            <div className="flex-1 border-2 border-border rounded-lg overflow-hidden bg-muted p-4 flex items-center justify-center">
              <canvas ref={canvasRef} className="border border-border shadow-lg" />
            </div>
          </div>

          <div className="overflow-y-auto space-y-4">
            <Tabs defaultValue="upload" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-muted">
                <TabsTrigger value="upload" className="text-xs">
                  <ImageIcon className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="text" className="text-xs">
                  <TypeIcon className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="draw" className="text-xs">
                  <PencilIcon className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="properties" className="text-xs">
                  <SunIcon className="h-4 w-4" />
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upload" className="space-y-4">
                <div>
                  <Label>Upload Image</Label>
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors duration-200 mt-2 ${
                      isDragActive ? 'border-primary bg-primary/10' : 'border-border hover:bg-muted'
                    }`}
                  >
                    <input {...getInputProps()} />
                    <UploadIcon className="h-10 w-10 mx-auto mb-2 text-accent" />
                    <p className="text-body-small text-foreground">
                      {isDragActive ? 'Drop here...' : 'Upload Image'}
                    </p>
                    <p className="text-caption text-muted-foreground mt-1">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>

                <Separator />

                <div>
                  <Label>Panel Size</Label>
                  <Select value={selectedSize} onValueChange={setSelectedSize}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1x1.5">1 × 1.5 m (30€ + VAT)</SelectItem>
                      <SelectItem value="2x1.5">2 × 1.5 m (50€ + VAT)</SelectItem>
                      <SelectItem value="3x1.5">3 × 1.5 m (75€ + VAT)</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="text" className="space-y-4">
                <div>
                  <Label>Text Content</Label>
                  <Input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter text..."
                    className="mt-2"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addText();
                      }
                    }}
                  />
                  <Button
                    onClick={addText}
                    disabled={!text}
                    className="w-full mt-2"
                  >
                    Add Text
                  </Button>
                </div>

                <Separator />

                <div>
                  <Label>Font Family</Label>
                  <Select value={fontFamily} onValueChange={setFontFamily}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Source Sans Pro">Source Sans Pro</SelectItem>
                      <SelectItem value="Arial">Arial</SelectItem>
                      <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                      <SelectItem value="Georgia">Georgia</SelectItem>
                      <SelectItem value="Courier New">Courier New</SelectItem>
                      <SelectItem value="Verdana">Verdana</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Font Size: {fontSize}px</Label>
                  <Input
                    type="range"
                    min="12"
                    max="120"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Text Color</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="w-20 h-10 cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant={fontWeight === 'bold' ? 'default' : 'outline'}
                    onClick={() => setFontWeight(fontWeight === 'bold' ? 'normal' : 'bold')}
                    className="flex-1"
                  >
                    <strong>B</strong>
                  </Button>
                  <Button
                    variant={fontStyle === 'italic' ? 'default' : 'outline'}
                    onClick={() => setFontStyle(fontStyle === 'italic' ? 'normal' : 'italic')}
                    className="flex-1"
                  >
                    <em>I</em>
                  </Button>
                </div>

                <div>
                  <Label>Text Align</Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    <Button
                      variant={textAlign === 'left' ? 'default' : 'outline'}
                      onClick={() => setTextAlign('left')}
                      size="sm"
                    >
                      Left
                    </Button>
                    <Button
                      variant={textAlign === 'center' ? 'default' : 'outline'}
                      onClick={() => setTextAlign('center')}
                      size="sm"
                    >
                      Center
                    </Button>
                    <Button
                      variant={textAlign === 'right' ? 'default' : 'outline'}
                      onClick={() => setTextAlign('right')}
                      size="sm"
                    >
                      Right
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="draw" className="space-y-4">
                <div>
                  <Label>Brush Color</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      type="color"
                      value={brushColor}
                      onChange={(e) => setBrushColor(e.target.value)}
                      className="w-20 h-10 cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={brushColor}
                      onChange={(e) => setBrushColor(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div>
                  <Label>Brush Width: {brushWidth}px</Label>
                  <Input
                    type="range"
                    min="1"
                    max="50"
                    value={brushWidth}
                    onChange={(e) => setBrushWidth(Number(e.target.value))}
                    className="mt-2"
                  />
                </div>

                <Separator />

                <div>
                  <Label>Add Shape</Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    <Button
                      variant={shapeType === 'rect' ? 'default' : 'outline'}
                      onClick={() => setShapeType('rect')}
                      size="sm"
                    >
                      <SquareIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={shapeType === 'circle' ? 'default' : 'outline'}
                      onClick={() => setShapeType('circle')}
                      size="sm"
                    >
                      <CircleIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={shapeType === 'line' ? 'default' : 'outline'}
                      onClick={() => setShapeType('line')}
                      size="sm"
                    >
                      <MinusIcon className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    onClick={addShape}
                    className="w-full mt-2"
                  >
                    Add {shapeType.charAt(0).toUpperCase() + shapeType.slice(1)}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="properties" className="space-y-4">
                {activeObject ? (
                  <>
                    <div>
                      <Label>Opacity: {objectOpacity}%</Label>
                      <Input
                        type="range"
                        min="0"
                        max="100"
                        value={objectOpacity}
                        onChange={(e) => applyOpacity(Number(e.target.value))}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label>Rotation: {objectRotation}°</Label>
                      <Input
                        type="range"
                        min="0"
                        max="360"
                        value={objectRotation}
                        onChange={(e) => applyRotation(Number(e.target.value))}
                        className="mt-2"
                      />
                    </div>

                    <Separator />

                    <div>
                      <Label>Layer Order</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <Button
                          variant="outline"
                          onClick={bringToFront}
                          size="sm"
                        >
                          <MoveIcon className="h-4 w-4 mr-2" />
                          Front
                        </Button>
                        <Button
                          variant="outline"
                          onClick={sendToBack}
                          size="sm"
                        >
                          <MoveIcon className="h-4 w-4 mr-2 rotate-180" />
                          Back
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p className="text-body-small">Select an object to edit its properties</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>

            <Separator />

            <Button
              onClick={handleSubmit}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Send Inquiry
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
