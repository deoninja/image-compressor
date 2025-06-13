import * as React from 'react';
import { ImageCompressor } from './components/ImageCompressor';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">Image Compressor</h1>
        <ImageCompressor />
      </div>
    </div>
  );
}

export default App;
