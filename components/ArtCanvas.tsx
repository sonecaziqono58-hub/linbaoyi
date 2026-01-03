
import React, { useState } from 'react';
import { generatePoem, generateArtImage } from '../services/geminiService';
import { PoemData, ArtPiece, AppState } from '../types';
import { Sparkles, Loader2, Send, Download, RefreshCw } from 'lucide-react';

interface ArtCanvasProps {
  onSave: (piece: ArtPiece) => void;
}

const ArtCanvas: React.FC<ArtCanvasProps> = ({ onSave }) => {
  const [input, setInput] = useState('');
  const [state, setState] = useState<AppState>(AppState.IDLE);
  const [currentPoem, setCurrentPoem] = useState<PoemData | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setError('');
    setState(AppState.GENERATING_POEM);

    try {
      const poem = await generatePoem(input);
      setCurrentPoem(poem);
      
      setState(AppState.GENERATING_IMAGE);
      const imageUrl = await generateArtImage(poem);
      setCurrentImage(imageUrl);
      
      const newPiece: ArtPiece = {
        id: crypto.randomUUID(),
        poem,
        imageUrl,
        timestamp: Date.now()
      };
      
      onSave(newPiece);
      setState(AppState.SUCCESS);
    } catch (err) {
      console.error(err);
      setError('灵感在途中迷了路，请稍后再试。');
      setState(AppState.ERROR);
    }
  };

  const reset = () => {
    setState(AppState.IDLE);
    setInput('');
    setCurrentPoem(null);
    setCurrentImage(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="bg-white/50 backdrop-blur-sm border border-slate-100 rounded-2xl p-8 shadow-sm">
        {state === AppState.IDLE || state === AppState.ERROR ? (
          <div className="space-y-6">
            <label className="block text-center">
              <span className="text-slate-400 font-light tracking-widest text-sm uppercase">输入你的心境或关键词</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="例如：雨后初晴、孤独的灯火、繁花似锦..."
                className="mt-4 w-full bg-transparent border-b border-slate-200 py-4 px-2 text-xl focus:outline-none focus:border-slate-400 transition-colors text-center font-light italic"
                onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              />
            </label>
            <button
              onClick={handleGenerate}
              disabled={!input.trim()}
              className="mx-auto flex items-center space-x-2 bg-slate-800 text-white px-8 py-3 rounded-full hover:bg-slate-700 disabled:opacity-30 transition-all shadow-lg hover:shadow-xl active:scale-95"
            >
              <Sparkles size={18} />
              <span className="tracking-widest">开启创作</span>
            </button>
            {error && <p className="text-red-400 text-center text-sm">{error}</p>}
          </div>
        ) : state === AppState.GENERATING_POEM || state === AppState.GENERATING_IMAGE ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-6">
            <Loader2 className="animate-spin text-slate-400" size={48} strokeWidth={1} />
            <p className="text-slate-500 font-light tracking-[0.2em] animate-pulse">
              {state === AppState.GENERATING_POEM ? '正在采撷诗意...' : '正在晕染画卷...'}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="order-2 md:order-1 flex flex-col justify-center text-center md:text-left space-y-8">
              <div>
                <h3 className="font-title text-3xl text-slate-800 mb-2">{currentPoem?.title}</h3>
                <p className="text-slate-400 text-sm font-light italic">—— {currentPoem?.author}</p>
              </div>
              <div className="space-y-4">
                {currentPoem?.content.map((line, idx) => (
                  <p key={idx} className="text-lg text-slate-600 leading-relaxed font-light">{line}</p>
                ))}
              </div>
              <div className="pt-8 flex flex-wrap gap-4 justify-center md:justify-start">
                <button 
                   onClick={reset}
                   className="flex items-center space-x-2 px-6 py-2 border border-slate-200 rounded-full hover:bg-slate-50 transition-colors text-sm text-slate-500"
                >
                  <RefreshCw size={14} />
                  <span>再次创作</span>
                </button>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="aspect-[3/4] bg-slate-100 rounded-lg overflow-hidden shadow-2xl relative group">
                {currentImage && (
                  <img 
                    src={currentImage} 
                    alt="Art" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                   <a 
                    href={currentImage || '#'} 
                    download={`${currentPoem?.title}.png`}
                    className="p-3 bg-white/90 rounded-full shadow-lg hover:scale-110 transition-transform"
                   >
                     <Download size={20} className="text-slate-800" />
                   </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtCanvas;
