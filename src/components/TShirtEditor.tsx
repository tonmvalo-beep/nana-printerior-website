import tshirtBaseUrl from '@/assets/mockups/tshirt/base.png';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { FlipHorizontalIcon } from 'lucide-react';
import ProductMockupEditor from './editor/ProductMockupEditor';
import { ProductPreset } from './editor/types';

interface TShirtEditorProps {
  onClose: () => void;
}

const tshirtPreset: ProductPreset = {
  productType: 'tshirt',
  name: 'T-Shirt',
  canvasWidth: 800,
  canvasHeight: 800,
  mockupImageUrl: tshirtBaseUrl,
  printableRects: {
    default: { x: 250, y: 250, width: 300, height: 200 },
    front: { x: 250, y: 250, width: 300, height: 200 },
    back: { x: 250, y: 250, width: 300, height: 200 }
  }
};


const shirtColors = [
  { name: 'White', value: '#FFFFFF' },
  { name: 'Black', value: '#000000' },
  { name: 'Red', value: '#E6195F' },
  { name: 'Blue', value: '#0066CC' },
  { name: 'Green', value: '#00CED1' },
  { name: 'Yellow', value: '#FFD700' },
  { name: 'Gray', value: '#808080' }
];

export default function TShirtEditor({ onClose }: TShirtEditorProps) {
  const { t } = useTranslation();
  const [shirtColor, setShirtColor] = useState('#FFFFFF');
  const [side, setSide] = useState<'front' | 'back'>('front');

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-full max-h-[95vh] overflow-hidden bg-background text-foreground p-0">
        <div className="flex flex-col h-[95vh]">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-h3 font-heading font-bold text-foreground">
              {t('editor.tshirt.title')}
            </DialogTitle>
          </DialogHeader>

          <Separator className="my-4" />

          <div className="px-6 pb-4 space-y-4">
            <div>
              <Label className="text-body-small font-medium mb-3 block">
                {t('editor.tshirt.selectColor')}
              </Label>
              <div className="grid grid-cols-7 gap-2">
                {shirtColors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setShirtColor(color.value)}
                    className={`w-10 h-10 rounded-md border-2 transition-all ${
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
              onClick={() => setSide(side === 'front' ? 'back' : 'front')}
              variant="outline"
              className="w-48"
            >
              <FlipHorizontalIcon className="h-4 w-4 mr-2" />
              {side === 'front' ? 'Front' : 'Back'}
            </Button>
          </div>

          <div className="flex-1 overflow-auto px-6 pb-6">
            <ProductMockupEditor
              preset={tshirtPreset}
              shirtColor={shirtColor}
              onShirtColorChange={setShirtColor}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
