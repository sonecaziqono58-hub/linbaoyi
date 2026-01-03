
import React from 'react';
import { ArtPiece } from '../types';

interface ArtGalleryProps {
  pieces: ArtPiece[];
}

const ArtGallery: React.FC<ArtGalleryProps> = ({ pieces }) => {
  if (pieces.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="flex items-center space-x-4 mb-12">
        <h2 className="font-title text-4xl text-slate-800">流年画廊</h2>
        <div className="flex-1 h-px bg-slate-100"></div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
        {pieces.map((piece) => (
          <div key={piece.id} className="group cursor-pointer">
            <div className="aspect-[3/4] overflow-hidden rounded-sm shadow-sm hover:shadow-xl transition-all duration-500 bg-white">
              <img 
                src={piece.imageUrl} 
                alt={piece.poem.title} 
                className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity grayscale-[20%] hover:grayscale-0"
              />
            </div>
            <div className="mt-4 text-center">
              <h4 className="font-title text-lg text-slate-700 mb-1">{piece.poem.title}</h4>
              <p className="text-xs text-slate-400 font-light tracking-widest uppercase">
                {new Date(piece.timestamp).toLocaleDateString('zh-CN')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ArtGallery;
