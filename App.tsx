
import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import ArtCanvas from './components/ArtCanvas';
import ArtGallery from './components/ArtGallery';
import { ArtPiece } from './types';
import { Music, Volume2, VolumeX, Leaf } from 'lucide-react';

const App: React.FC = () => {
  const [pieces, setPieces] = useState<ArtPiece[]>([]);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Load saved pieces from local storage (mock for this session)
  useEffect(() => {
    const saved = localStorage.getItem('ink-soul-gallery');
    if (saved) {
      try {
        setPieces(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse gallery", e);
      }
    }
  }, []);

  const savePiece = (newPiece: ArtPiece) => {
    const updated = [newPiece, ...pieces];
    setPieces(updated);
    localStorage.setItem('ink-soul-gallery', JSON.stringify(updated.slice(0, 20))); // Limit to 20
  };

  return (
    <div className="min-h-screen selection:bg-slate-200 relative overflow-x-hidden">
      {/* Decorative Floating Elements */}
      <div className="fixed top-20 -left-10 text-slate-100 pointer-events-none select-none">
        <Leaf size={120} className="rotate-45" />
      </div>
      <div className="fixed bottom-20 -right-10 text-slate-100 pointer-events-none select-none">
        <Leaf size={150} className="-rotate-12" />
      </div>

      {/* Navigation / Header */}
      <header className="fixed top-0 w-full z-40 px-8 py-6 flex justify-between items-center pointer-events-none">
        <div className="pointer-events-auto flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full border-2 border-slate-800 flex items-center justify-center">
             <div className="w-2 h-2 bg-slate-800 rounded-full"></div>
          </div>
          <span className="font-title text-xl tracking-tighter text-slate-800">墨染流年</span>
        </div>
        
        <div className="pointer-events-auto flex items-center space-x-6">
          <button 
            onClick={() => setIsAudioPlaying(!isAudioPlaying)}
            className="text-slate-400 hover:text-slate-800 transition-colors p-2"
            title={isAudioPlaying ? "静音" : "播放背景乐"}
          >
            {isAudioPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <ArtCanvas onSave={savePiece} />
        <ArtGallery pieces={pieces} />
      </main>

      {/* Footer */}
      <footer className="py-20 px-8 text-center border-t border-slate-50 mt-20">
        <p className="text-slate-300 font-light text-xs tracking-[0.5em] uppercase mb-4">
          Ink & Soul Gallery &copy; {new Date().getFullYear()}
        </p>
        <p className="text-slate-400 font-cursive text-2xl opacity-50">一蓑烟雨任平生</p>
      </footer>

      {/* Hidden Audio for mood (Simulated behavior since we don't have local assets) */}
      {isAudioPlaying && (
        <div className="fixed bottom-4 right-4 z-50 flex items-center space-x-2 bg-white/80 backdrop-blur shadow-sm px-3 py-1.5 rounded-full border border-slate-100 text-[10px] text-slate-400 animate-bounce">
          <Music size={10} />
          <span>正在播放：禅意雅乐...</span>
        </div>
      )}
    </div>
  );
};

export default App;
