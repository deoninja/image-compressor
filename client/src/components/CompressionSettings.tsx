import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

interface CompressionSettingsProps {
  targetSize: number;
  onTargetSizeChange: (size: number) => void;
  onCompress: () => void;
  isCompressing: boolean;
}

export function CompressionSettings({ 
  targetSize, 
  onTargetSizeChange, 
  onCompress, 
  isCompressing 
}: CompressionSettingsProps) {
  const sizeOptions = [
    { value: 100, label: '100 KB' },
    { value: 250, label: '250 KB' },
    { value: 500, label: '500 KB' },
    { value: 1000, label: '1 MB' },
    { value: 2000, label: '2 MB' },
  ];

  return (
    <div className="bg-muted/10 p-6 rounded-lg border">
      <h2 className="text-xl font-semibold mb-4">Compression Settings</h2>
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Label htmlFor="target-size" className="text-sm font-medium">
            Target File Size
          </Label>
          <Select
            value={targetSize.toString()}
            onValueChange={(value) => onTargetSizeChange(Number(value))}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select target size" />
            </SelectTrigger>
            <SelectContent>
              {sizeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <Label className="text-sm font-medium block mb-1">Action</Label>
          <Button 
            onClick={onCompress} 
            disabled={isCompressing}
            className="w-full"
          >
            {isCompressing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Compressing...
              </>
            ) : (
              'Compress Image'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
