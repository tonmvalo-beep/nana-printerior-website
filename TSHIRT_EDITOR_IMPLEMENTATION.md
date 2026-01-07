# Professional T-Shirt Editor - Implementation Guide

## Overview

A professional t-shirt product editor built with React, TypeScript, and react-konva, similar to Teespring/Printful. The editor uses your uploaded front/back t-shirt mockups and allows users to add designs with full color customization.

## Key Features

### Core Functionality
- **Front/Back Switching**: Toggle between front and back views
- **Color Customization**: 7 shirt colors (White, Black, Red, Blue, Green, Yellow, Gray)
- **Design Tools**:
  - Upload images (PNG/JPG/GIF)
  - Add text with custom size and color
  - Add shapes (rectangles)
  - Drag, resize, and rotate designs
- **Undo/Redo**: 20-step history (Ctrl+Z / Ctrl+Shift+Z)
- **Export**: Download final design as PNG

### Technical Specifications
- **Canvas Size**: 800x800px
- **Background Color**: #f3f4f6 (light gray)
- **Printable Area**: 250x260, 300x220 (chest position)
- **Mockup Images**: 1715x1856px RGBA PNG (transparent background)

## File Structure

```
src/
  assets/
    mockups/
      tshirt/
        front.png     # Your uploaded front mockup (61KB)
        back.png      # Your uploaded back mockup (57KB)
  components/
    TShirtEditor.tsx                    # Main wrapper component
    editor/
      ProductMockupEditor.tsx           # Core editor logic
      types.ts                          # TypeScript interfaces
      history.ts                        # Undo/redo system
      export.ts                         # PNG export utilities
      InquiryModal.tsx                  # Inquiry submission
```

## Architecture

### Component Hierarchy

```
TShirtEditor (Dialog)
  ├─ Color Picker (7 colors)
  ├─ Front/Back Toggle Button
  └─ ProductMockupEditor
       ├─ Toolbar (Select/Text/Shape tools)
       ├─ Konva Stage (800x800)
       │    └─ Layer
       │         ├─ T-shirt mockup image
       │         ├─ Color overlay (source-atop)
       │         ├─ Printable area outline
       │         └─ User design objects
       └─ Sidebar
            ├─ Upload button
            └─ Tool properties
```

## Critical Implementation Details

### 1. T-Shirt Rendering (Key Part)

The t-shirt is rendered using the uploaded PNG mockups with proper layering:

```tsx
{mockupImage && preset.productType === 'tshirt' && (
  <>
    {/* 1) Base T-shirt image (transparent PNG from user upload) */}
    <KonvaImage
      image={mockupImage}
      x={0}
      y={0}
      width={preset.canvasWidth}
      height={preset.canvasHeight}
      listening={false}
    />

    {/* 2) Color overlay (clips to shirt shape using source-atop) */}
    {shirtColor && shirtColor !== '#FFFFFF' && (
      <Rect
        x={0}
        y={0}
        width={preset.canvasWidth}
        height={preset.canvasHeight}
        fill={shirtColor}
        globalCompositeOperation="source-atop"
        listening={false}
      />
    )}
  </>
)}
```

**Key Points**:
- Base shirt is always rendered (white shirt is visible, NOT transparent)
- Color overlay only applied when color is NOT white
- `globalCompositeOperation="source-atop"` clips color to shirt shape
- `listening={false}` makes the shirt non-interactive

### 2. Front/Back Switching

The mockup image changes based on the `side` prop:

```tsx
useEffect(() => {
  if (preset.productType === 'tshirt') {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = side === 'front' ? tshirtFrontUrl : tshirtBackUrl;
    img.onload = () => setMockupImage(img);
  }
}, [preset.productType, side]);
```

### 3. Asset Loading (ES Modules)

Images are imported using Vite-compatible ES imports:

```tsx
import tshirtFrontUrl from '@/assets/mockups/tshirt/front.png';
import tshirtBackUrl from '@/assets/mockups/tshirt/back.png';
```

**Why NOT public folder?**
- Public assets don't get processed by Vite
- ES imports ensure files are included in build
- Vite optimizes and hashes filenames automatically

### 4. Printable Area

The printable area is defined in the preset:

```tsx
const tshirtPreset: ProductPreset = {
  productType: 'tshirt',
  name: 'T-Shirt',
  canvasWidth: 800,
  canvasHeight: 800,
  printableRects: {
    default: { x: 250, y: 260, width: 300, height: 220 },
    front: { x: 250, y: 260, width: 300, height: 220 },
    back: { x: 250, y: 260, width: 300, height: 220 }
  }
};
```

Visual representation:
- Dashed rectangle overlay
- All designs constrained within bounds
- Centered on t-shirt chest area

### 5. Color Selection

7 preset colors with visual swatches:

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

**White Shirt Handling**:
- White (#FFFFFF) shows the original mockup without overlay
- This keeps the shirt visible (not transparent)
- Other colors use `source-atop` blend mode

### 6. Image Upload

Upload handling with auto-scaling:

```tsx
const { getRootProps, getInputProps, open } = useDropzone({
  onDrop,
  accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.gif'] },
  multiple: false,
  noClick: true,
  noKeyboard: true
});

// Auto-scale to fit printable area
const scale = Math.min(
  printableRect.width / img.width,
  printableRect.height / img.height,
  1  // Never upscale
);
```

### 7. Undo/Redo System

20-step history using the EditorHistory class:

```tsx
class EditorHistory {
  private history: EditorState[] = [];
  private currentIndex: number = -1;

  push(state: EditorState): void {
    this.history = this.history.slice(0, this.currentIndex + 1);
    this.history.push(JSON.parse(JSON.stringify(state)));
    this.currentIndex++;

    if (this.history.length > 20) {
      this.history.shift();
      this.currentIndex--;
    }
  }
}
```

### 8. Export Functionality

Download design with transparent background:

```tsx
const handleDownload = async () => {
  const designPNG = await exportDesignPNG(stageRef, 2);
  downloadFile(designPNG, `design-tshirt-${Date.now()}.png`);
};
```

Uses `pixelRatio: 2` for high-resolution export.

## User Interface

### Main Controls

1. **Color Picker**
   - 7 color swatches in a grid
   - Selected color has border + ring effect
   - Click to change shirt color

2. **Front/Back Toggle**
   - Button with flip icon
   - Switches between front.png and back.png
   - Preserves designs when switching

3. **Toolbar**
   - Select tool (move/resize/rotate)
   - Text tool (add text)
   - Shape tool (add rectangles)
   - Undo/Redo buttons
   - Delete and Clear All
   - Download button

4. **Upload Area**
   - Drag & drop support
   - Click to browse
   - Auto-scales images to fit

### Keyboard Shortcuts

- `Ctrl+Z`: Undo
- `Ctrl+Shift+Z` or `Ctrl+Y`: Redo
- `Delete`: Delete selected object
- `Enter`: Add text (when in text tool)

## Why This Approach Works

### 1. No Artificial Shapes
- Uses actual t-shirt mockup images
- No code-drawn rectangles or paths
- Professional look from real photos

### 2. Realistic Color Changes
- `source-atop` blend mode clips color to shirt shape
- Preserves transparency of mockup
- Works with any transparent PNG mockup

### 3. White Shirt Visibility
- White color bypasses overlay
- Shows original mockup (not transparent)
- Light gray background ensures visibility

### 4. Simple Canvas Structure
- No complex 3D rendering
- No WebGL shaders
- Stable and performant

### 5. Proper Asset Management
- ES imports ensure files are bundled
- Vite optimizes image loading
- No CORS issues

## Testing the Editor

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Navigate to Products Page**
   - Click on Products in navigation
   - Find T-Shirts section
   - Click "USTVARI SVOJ DIZAJN" button

3. **Test Color Changes**
   - Click different color swatches
   - White should show plain mockup
   - Other colors should tint the shirt

4. **Test Front/Back Switching**
   - Click "Front" / "Back" toggle
   - Should switch mockup images
   - Designs should persist

5. **Test Image Upload**
   - Drag and drop an image
   - Should auto-scale to fit printable area
   - Should be draggable/resizable

6. **Test Text Addition**
   - Click text tool
   - Enter text and adjust size/color
   - Click "Add Text"
   - Should appear in printable area

7. **Test Undo/Redo**
   - Add several objects
   - Press Ctrl+Z to undo
   - Press Ctrl+Shift+Z to redo

8. **Test Download**
   - Create a design
   - Click Download button
   - Should save PNG with transparent background

## Browser Compatibility

- **Chrome/Edge**: Full support
- **Firefox**: Full support
- **Safari**: Full support (with crossOrigin)
- **Mobile**: Touch events supported

## Performance Considerations

1. **No Konva Filters**: Uses blend modes instead
2. **No Caching**: Avoids Konva cache bugs
3. **Selective Listening**: Mockup layers non-interactive
4. **Image Optimization**: Front 61KB, Back 57KB

## Common Pitfalls Avoided

1. Using public folder for imports (breaks Vite)
2. Making white shirt transparent
3. Drawing fake shirt shapes in code
4. Not constraining objects to printable area
5. Missing crossOrigin for CORS
6. Using bare `<div onClick>` for file picker

## Future Enhancements

- Font selection dropdown
- Multiple design templates
- Save designs to database
- Share design links
- Product catalog integration
- Bulk design generation
- Front + back in single export

## Credits

Implementation follows Teespring/Printful best practices with user-uploaded mockups for professional product visualization.
