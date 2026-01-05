import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import ProductMockupEditor from './editor/ProductMockupEditor';
import { ProductPreset } from './editor/types';

interface PanelEditorProps {
  onClose: () => void;
}

const panelPricing: { [key: string]: string } = {
  '1x1.5': '30€ + VAT',
  '2x1.5': '50€ + VAT',
  '3x1.5': '75€ + VAT',
  'custom': 'Custom'
};

const panelPreset: ProductPreset = {
  productType: 'panel',
  name: 'Panel',
  canvasWidth: 800,
  canvasHeight: 600,
  mockupImageUrl: '/mockups/panel.svg',
  printableRects: {
    default: { x: 50, y: 50, width: 300, height: 400 },
    '1x1.5': { x: 50, y: 50, width: 300, height: 400 },
    '2x1.5': { x: 50, y: 50, width: 450, height: 400 },
    '3x1.5': { x: 50, y: 50, width: 600, height: 400 }
  }
};

export default function PanelEditor({ onClose }: PanelEditorProps) {
  const { t } = useTranslation();
  const [selectedSize, setSelectedSize] = useState('1x1.5');

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-full max-h-[95vh] overflow-hidden bg-background text-foreground p-0">
        <div className="flex flex-col h-[95vh]">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-h3 font-heading font-bold text-foreground">
              {t('editor.panels.title')}
            </DialogTitle>
          </DialogHeader>

          <Separator className="my-4" />

          <div className="px-6 pb-4">
            <Label className="text-body-small font-medium">
              {t('editor.panels.selectSize')}
            </Label>
            <Select value={selectedSize} onValueChange={setSelectedSize}>
              <SelectTrigger className="mt-2 w-64">
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

          <div className="flex-1 overflow-auto px-6 pb-6">
            <ProductMockupEditor
              preset={panelPreset}
              selectedSize={selectedSize}
              onSizeChange={setSelectedSize}
              panelPricing={panelPricing}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
