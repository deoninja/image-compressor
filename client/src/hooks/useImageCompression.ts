import * as React from 'react';

interface ImageData {
  url: string;
  size: number;
  name: string;
}

interface CompressedImageData {
  url: string;
  size: number;
  blob: Blob;
}

export function useImageCompression() {
  const [originalImage, setOriginalImage] = React.useState<ImageData | null>(null);
  const [compressedImage, setCompressedImage] = React.useState<CompressedImageData | null>(null);
  const [isCompressing, setIsCompressing] = React.useState(false);
  const [targetSize, setTargetSize] = React.useState(500); // KB

  const handleImageUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setOriginalImage({
      url,
      size: file.size,
      name: file.name
    });
    setCompressedImage(null);
  };

  const compressImage = async () => {
    if (!originalImage) return;

    setIsCompressing(true);
    
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = originalImage.url;
      });

      // Set canvas dimensions
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Draw image on canvas
      ctx?.drawImage(img, 0, 0);

      // Convert target size from KB to bytes
      const targetSizeBytes = targetSize * 1024;
      let quality = 0.9;
      let blob: Blob | null = null;

      // Binary search for optimal quality
      let minQuality = 0.1;
      let maxQuality = 0.9;
      
      for (let i = 0; i < 10; i++) {
        blob = await new Promise<Blob | null>((resolve) => {
          canvas.toBlob(resolve, 'image/jpeg', quality);
        });

        if (!blob) break;

        if (blob.size <= targetSizeBytes) {
          minQuality = quality;
        } else {
          maxQuality = quality;
        }
        
        quality = (minQuality + maxQuality) / 2;
        
        if (Math.abs(blob.size - targetSizeBytes) < targetSizeBytes * 0.05) {
          break;
        }
      }

      if (blob) {
        const compressedUrl = URL.createObjectURL(blob);
        setCompressedImage({
          url: compressedUrl,
          size: blob.size,
          blob
        });
      }
    } catch (error) {
      console.error('Error compressing image:', error);
    } finally {
      setIsCompressing(false);
    }
  };

  const downloadCompressedImage = () => {
    if (!compressedImage) return;

    const link = document.createElement('a');
    link.href = compressedImage.url;
    link.download = 'compressed-image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return {
    originalImage,
    compressedImage,
    isCompressing,
    targetSize,
    setTargetSize,
    handleImageUpload,
    compressImage,
    downloadCompressedImage
  };
}
