import * as React from 'react';
import { ImageUploader } from './ImageUploader';
import { CompressionSettings } from './CompressionSettings';
import { ImagePreview } from './ImagePreview';
import { DownloadButton } from './DownloadButton';
import { useImageCompression } from '../hooks/useImageCompression';

export function ImageCompressor() {
  const {
    originalImage,
    compressedImage,
    isCompressing,
    targetSize,
    setTargetSize,
    handleImageUpload,
    compressImage,
    downloadCompressedImage
  } = useImageCompression();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <ImageUploader onImageUpload={handleImageUpload} />
      
      {originalImage && (
        <>
          <CompressionSettings
            targetSize={targetSize}
            onTargetSizeChange={setTargetSize}
            onCompress={compressImage}
            isCompressing={isCompressing}
          />
          
          <ImagePreview
            originalImage={originalImage}
            compressedImage={compressedImage}
          />
          
          {compressedImage && (
            <div className="text-center">
              <DownloadButton
                onDownload={downloadCompressedImage}
                fileName="compressed-image.jpg"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
