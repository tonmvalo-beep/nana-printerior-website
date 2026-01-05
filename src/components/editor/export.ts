import Konva from 'konva';

export async function exportDesignPNG(
  stageRef: React.RefObject<Konva.Stage>,
  pixelRatio: number = 2
): Promise<string> {
  if (!stageRef.current) return '';

  const stage = stageRef.current;
  const dataURL = stage.toDataURL({
    pixelRatio,
    mimeType: 'image/png'
  });

  return dataURL;
}

export async function exportDesignWithMockup(
  stageRef: React.RefObject<Konva.Stage>,
  mockupImageUrl: string | undefined,
  pixelRatio: number = 2
): Promise<string> {
  if (!stageRef.current) return '';

  const designDataURL = await exportDesignPNG(stageRef, pixelRatio);

  if (!mockupImageUrl) {
    return designDataURL;
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        ctx.drawImage(img, 0, 0);

        const designImg = new Image();
        designImg.onload = () => {
          ctx.drawImage(designImg, 0, 0);
          resolve(canvas.toDataURL('image/png'));
        };
        designImg.src = designDataURL;
      }
    };
    img.src = mockupImageUrl;
  });
}

export function downloadFile(
  dataURL: string,
  filename: string
): void {
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function dataURLToBase64(dataURL: string): string {
  return dataURL.split(',')[1] || '';
}
