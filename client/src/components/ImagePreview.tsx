import * as React from 'react';

interface ImagePreviewProps {
  originalImage: { url: string; size: number; name: string };
  compressedImage?: { url: string; size: number };
}

export function ImagePreview({ originalImage, compressedImage }: ImagePreviewProps) {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Original Image</h3>
        <div className="border rounded-lg overflow-hidden bg-white">
          <img
            src={originalImage.url}
            alt="Original"
            className="w-full h-64 object-contain"
          />
        </div>
        <div className="text-sm text-muted-foreground space-y-1">
          <p>File: {originalImage.name}</p>
          <p>Size: {formatFileSize(originalImage.size)}</p>
        </div>
      </div>

      {compressedImage && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Compressed Image</h3>
          <div className="border rounded-lg overflow-hidden bg-white">
            <img
              src={compressedImage.url}
              alt="Compressed"
              className="w-full h-64 object-contain"
            />
          </div>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>Size: {formatFileSize(compressedImage.size)}</p>
            <p className="text-primary font-medium">
              Reduction: {Math.round((1 - compressedImage.size / originalImage.size) * 100)}%
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
