import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { UploadIcon, TypeIcon, FlipHorizontalIcon, TrashIcon } from 'lucide-react';

interface TShirtEditorProps {
  onClose: () => void;
}

export default function TShirtEditor({ onClose }: TShirtEditorProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<any>(null);
  const [shirtColor, setShirtColor] = useState('#FFFFFF');
  const [side, setSide] = useState<'front' | 'back'>('front');
  const [text, setText] = useState('');
  const [textColor, setTextColor] = useState('#373A36');

  useEffect(() => {
    const initCanvas = async () => {
      if (canvasRef.current && !canvas) {
        const { Canvas } = await import('fabric');
        const fabricCanvas = new Canvas(canvasRef.current, {
          width: 600,
          height: 700,
          backgroundColor: shirtColor
        });
        setCanvas(fabricCanvas);
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
      canvas.setBackgroundColor(shirtColor, canvas.renderAll.bind(canvas));
    }
  }, [shirtColor, canvas]);

  const onDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0 && canvas) {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = async (e) => {
        const imgUrl = e.target?.result as string;
        const { FabricImage } = await import('fabric');
        FabricImage.fromURL(imgUrl, { crossOrigin: 'anonymous' }).then((img: any) => {
          img.scaleToWidth(250);
          img.set({ 
            left: 175, 
            top: 200,
            selectable: true,
            hasControls: true,
            hasBorders: true
          });
          canvas.add(img);
          canvas.setActiveObject(img);
          canvas.renderAll();
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
        left: 150,
        top: 250,
        fontSize: 40,
        fill: textColor,
        fontFamily: 'Source Sans Pro',
        selectable: true,
        hasControls: true,
        hasBorders: true
      });
      canvas.add(fabricText);
      canvas.setActiveObject(fabricText);
      canvas.renderAll();
      setText('');
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
      }
    }
  };

  const clearCanvas = () => {
    if (canvas) {
      canvas.clear();
      canvas.backgroundColor = shirtColor;
      canvas.renderAll();
    }
  };

  const toggleSide = () => {
    setSide(side === 'front' ? 'back' : 'front');
  };

  const handleSubmit = () => {
    if (canvas) {
      const dataURL = canvas.toDataURL({
        format: 'png',
        quality: 1
      });
      
      // Create download link
      const link = document.createElement('a');
      link.download = `tshirt-design-${side}-${Date.now()}.png`;
      link.href = dataURL;
      link.click();
      
      toast({
        title: 'Povpraševanje poslano',
        description: 'Vaše povpraševanje je bilo uspešno poslano. Kontaktirali vas bomo v najkrajšem času.',
      });
      onClose();
    }
  };

  const shirtColors = [
    { name: 'Bela', value: '#FFFFFF' },
    { name: 'Črna', value: '#000000' },
    { name: 'Rdeča', value: '#E6195F' },
    { name: 'Modra', value: '#0066CC' },
    { name: 'Zelena', value: '#00CED1' },
    { name: 'Rumena', value: '#FFD700' },
    { name: 'Siva', value: '#808080' }
  ];

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-background text-foreground">
        <DialogHeader>
          <DialogTitle className="text-h3 font-heading font-bold text-foreground">{t('editor.tshirt.title')}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          <div className="lg:col-span-2">
            <div className="border-2 border-border rounded-lg overflow-hidden bg-muted p-8">
              <div className="text-center mb-4">
                <span className="text-body font-medium text-foreground px-4 py-2 bg-background rounded-full">
                  {side === 'front' ? 'Spredaj' : 'Zadaj'}
                </span>
              </div>
              <canvas ref={canvasRef} className="mx-auto" />
            </div>
            <div className="flex gap-2 mt-4">
              <Button 
                onClick={deleteSelected}
                variant="outline"
                className="flex-1"
              >
                <TrashIcon className="h-4 w-4 mr-2" />
                Izbriši izbrano
              </Button>
              <Button 
                onClick={clearCanvas}
                variant="outline"
                className="flex-1"
              >
                Počisti vse
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-body-small font-medium mb-3 text-foreground">
                {t('editor.tshirt.selectColor')}
              </label>
              <div className="grid grid-cols-4 gap-2">
                {shirtColors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setShirtColor(color.value)}
                    className={`w-full h-12 rounded-md border-2 transition-all ${
                      shirtColor === color.value 
                        ? 'border-primary ring-2 ring-primary ring-offset-2' 
                        : 'border-border hover:border-primary'
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            <Button 
              onClick={toggleSide}
              className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-normal"
            >
              <FlipHorizontalIcon className="h-4 w-4 mr-2" strokeWidth={1.5} />
              {t('editor.tshirt.frontBack')}
            </Button>

            <div 
              {...getRootProps()} 
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-200 ${
                isDragActive ? 'border-primary bg-primary/10' : 'border-border hover:bg-muted'
              }`}
            >
              <input {...getInputProps()} />
              <UploadIcon className="h-12 w-12 mx-auto mb-4 text-accent" strokeWidth={1.5} />
              <p className="text-body-small text-foreground">
                {isDragActive ? 'Spusti sliko tukaj...' : t('editor.tshirt.uploadGraphic')}
              </p>
              <p className="text-caption text-muted-foreground mt-2">
                PNG, JPG, GIF do 10MB
              </p>
            </div>

            <div>
              <label className="block text-body-small font-medium mb-2 text-foreground">
                {t('editor.tshirt.addText')}
              </label>
              <div className="space-y-3">
                <Input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Vnesite besedilo..."
                  className="bg-background text-foreground border-border"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addText();
                    }
                  }}
                />
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-20 h-10 bg-background border-border cursor-pointer"
                  />
                  <Button 
                    onClick={addText}
                    disabled={!text}
                    className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90 font-normal"
                  >
                    <TypeIcon className="h-4 w-4 mr-2" strokeWidth={1.5} />
                    Dodaj besedilo
                  </Button>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-caption text-muted-foreground mb-4">
                Kliknite na elemente za premikanje, spreminjanje velikosti in rotacijo
              </p>
            </div>

            <Button 
              onClick={handleSubmit}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-normal py-6 text-body"
            >
              {t('editor.tshirt.sendInquiry')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
