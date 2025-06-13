import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface DownloadButtonProps {
  onDownload: () => void;
  fileName: string;
}

export function DownloadButton({ onDownload, fileName }: DownloadButtonProps) {
  return (
    <Button onClick={onDownload} size="lg" className="gap-2">
      <Download className="h-4 w-4" />
      Download Compressed Image
    </Button>
  );
}
