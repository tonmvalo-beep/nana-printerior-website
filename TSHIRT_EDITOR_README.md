# T-Shirt Product Mockup Editor - Implementation Guide

## Overview

A realistic t-shirt mockup editor built with React, Konva, and TypeScript, following Teespring/Printify-style rendering. The editor uses proper layering techniques to create photorealistic color changes without 3D or WebGL.

## Technical Stack

- React 18 + TypeScript
- react-konva + konva (canvas manipulation)
- react-dropzone (image uploads)
- Vite (build tool)
- Functional components only

## Architecture

### File Structure

```
src/
  assets/
    mockups/
      tshirt/
        base.png      # Transparent PNG of white t-shirt
        shade.png     # Grayscale shading overlay
  components/
    editor/
      ProductMockupEditor.tsx   # Main editor component
      types.ts                   # TypeScript interfaces
      history.ts                 # Undo/redo functionality
      export.ts                  # PNG export utilities
      InquiryModal.tsx          # Inquiry submission
    TShirtEditor.tsx            # T-shirt specific wrapper
```

## Critical Implementation Details

### 1. T-Shirt Rendering Order (EXACT)

The rendering uses a specific layer order inside the Konva `<Layer>`:

```tsx
{mockupImage && preset.productType === 'tshirt' && (
  <>
    {/* 1. Base T-shirt (transparent PNG) */}
    <KonvaImage
      image={mockupImage}
      x={0} y={0}
      width={800} height={800}
      listening={false}
    />

    {/* 2. Color overlay (source-atop clips to shirt shape) */}
    <Rect
      x={0} y={0}
      width={800} height={800}
      fill={shirtColor || '#ffffff'}
      globalCompositeOperation="source-atop"
      listening={false}
    />

    {/* 3. Shading (multiply blend for realistic folds) */}
    <KonvaImage
      image={tshirtShade}
      x={0} y={0}
      width={800} height={800}
      opacity={0.9}
      globalCompositeOperation="multiply"
      listening={false}
    />
  </>
)}

{/* 4. Printable area outline */}
<Rect
  x={250} y={260}
  width={300} height={220}
  stroke="#999999"
  dash={[5, 5]}
/>

{/* 5. User design elements */}
{editorState.objects.map(...)}
```

### 2. Asset Loading (ES Modules)

Uses Vite-compatible ES imports (NOT public folder):

```tsx
import tshirtBaseUrl from '@/assets/mockups/tshirt/base.png';
import tshirtShadeUrl from '@/assets/mockups/tshirt/shade.png';

useEffect(() => {
  if (preset.productType === 'tshirt') {
    const base = new Image();
    base.crossOrigin = 'anonymous';
    base.src = tshirtBaseUrl;
    base.onload = () => setMockupImage(base);

    const shade = new Image();
    shade.crossOrigin = 'anonymous';
    shade.src = tshirtShadeUrl;
    shade.onload = () => setTshirtShade(shade);
  }
}, [preset.productType]);
```

### 3. Canvas Configuration

- **Size**: 800x800px
- **Background**: `#f3f4f6` (light gray)
- **Printable Area**: `{ x: 250, y: 260, width: 300, height: 220 }`
  - Centered on t-shirt chest
  - All design elements constrained within

### 4. Color Blending Theory

**Why source-atop + multiply works:**

1. `source-atop`: Draws color ONLY where base image has alpha > 0 (inside shirt shape)
2. `multiply`: Darkens based on shading (simulates fabric folds)

This creates realistic color changes without:
- Konva filters (slow)
- Canvas cache (buggy)
- 3D rendering (complex)

### 5. Image Upload Rules

```tsx
const { getRootProps, getInputProps, open } = useDropzone({
  onDrop,
  accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.gif'] },
  multiple: false,
  noClick: true,      // Prevents unwanted clicks
  noKeyboard: true    // Prevents focus issues
});
```

**Auto-scaling logic:**

```tsx
const scale = Math.min(
  printableRect.width / img.width,
  printableRect.height / img.height,
  1  // Never upscale
);
```

### 6. Undo/Redo System

20-step history using custom `EditorHistory` class:

```tsx
class EditorHistory {
  private history: EditorState[] = [];
  private currentIndex: number = -1;

  push(state: EditorState): void {
    // Truncate future history on new action
    this.history = this.history.slice(0, this.currentIndex + 1);
    this.history.push(JSON.parse(JSON.stringify(state)));
    this.currentIndex++;

    // Keep max 20 steps
    if (this.history.length > 20) {
      this.history.shift();
      this.currentIndex--;
    }
  }
}
```

### 7. Export Functionality

**Download button exports design with transparent background:**

```tsx
const handleDownload = async () => {
  const designPNG = await exportDesignPNG(stageRef, 2);
  downloadFile(designPNG, `design-tshirt-${Date.now()}.png`);
};
```

Uses `pixelRatio: 2` for high-resolution export.

## Editor Features

### Implemented

- Upload image (PNG/JPG/GIF)
- Add text with custom font size and color
- Add shapes (rectangles)
- Drag, resize, rotate objects
- Undo/Redo (Ctrl+Z / Ctrl+Shift+Z)
- Delete selected (Delete key)
- Clear all
- Download PNG (transparent background)
- T-shirt color selection (7 colors)
- Constrain elements to printable area
- Send inquiry (with design attached)

### Not Implemented (By Design)

- SVG upload (breaks Konva)
- 3D rendering (over-engineering)
- WebGL effects (complexity)
- Font selection (keep simple)
- Layer panel (not required)

## Color Palette

```tsx
const shirtColors = [
  { name: 'White', value: '#FFFFFF' },
  { name: 'Black', value: '#000000' },
  { name: 'Red', value: '#E6195F' },
  { name: 'Blue', value: '#0066CC' },
  { name: 'Green', value: '#00CED1' },
  { name: 'Yellow', value: '#FFD700' },
  { name: 'Gray', value: '#808080' }
];
```

## Keyboard Shortcuts

- `Ctrl+Z`: Undo
- `Ctrl+Shift+Z` or `Ctrl+Y`: Redo
- `Delete`: Delete selected object
- `Enter`: Add text (when in text tool)

## Performance Considerations

1. **No caching**: Avoids Konva cache bugs
2. **No filters**: Uses blend modes instead
3. **Selective listening**: Mockup layers have `listening={false}`
4. **Image optimization**: Base image 3.9KB, shade 224KB (acceptable)

## Common Pitfalls Avoided

1. Using `public/` folder assets (breaks Vite builds)
2. Using `globalCompositeOperation` without understanding blend modes
3. Forgetting `crossOrigin='anonymous'` for CORS
4. Not constraining objects to printable area
5. Using bare `<div onClick>` for file picker (accessibility issues)

## Testing the Editor

1. Start dev server: `npm run dev`
2. Navigate to Products page
3. Click "USTVARI SVOJ DIZAJN" under T-Shirts tab
4. Test color changes (should look realistic)
5. Upload image (should auto-scale and center)
6. Add text (should be draggable and resizable)
7. Test undo/redo
8. Download design (should have transparent background)

## Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (with crossOrigin)
- Mobile: Touch events supported via Konva

## Future Enhancements (Optional)

- Font selection dropdown
- Image filters (brightness/contrast)
- Front/back switching with separate designs
- Product mockup templates (hoodies, mugs)
- Design library/save functionality
- Collaborative editing

## Credits

Implementation follows Teespring/Printify best practices for realistic product mockups without 3D rendering.
