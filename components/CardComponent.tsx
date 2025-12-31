import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CardData } from '../types';
import { Music, Mic2, Lightbulb, X } from 'lucide-react';

interface CardComponentProps {
  card: CardData;
  index: number;
  total: number;
  isFlipped: boolean;
  onTap: () => void;
  isTop: boolean;
}

export const CardComponent: React.FC<CardComponentProps> = ({ 
  card, 
  index, 
  total, 
  isFlipped, 
  onTap,
  isTop 
}) => {
  const [showHints, setShowHints] = useState(false);

  // Stop propagation to prevent card flip/dismiss when clicking hints
  const handleHintToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowHints(!showHints);
  };

  // Only the top 3 cards are rendered visually stacked to save resources
  if (index > 2) return null;

  return (
    <motion.div
      layout
      // CHANGED: Reduced base size from w-72 h-96 to w-64 h-80 for better mobile fit
      // Added max-w-[85vw] to ensure it never overflows width on tiny screens
      className="absolute w-64 h-80 sm:w-80 sm:h-[420px] max-w-[85vw] cursor-pointer touch-manipulation perspective-1000"
      style={{
        zIndex: total - index,
        // Visual stacking effect
        top: index * 4, 
        scale: 1 - index * 0.05,
      }}
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: index * 10, rotate: index % 2 === 0 ? 1 : -1 }}
      exit={{ x: -300, opacity: 0, rotate: -20, transition: { duration: 0.3 } }}
      onClick={isTop ? onTap : undefined}
      whileHover={isTop ? { scale: 1.02 } : {}}
      whileTap={isTop ? { scale: 0.98 } : {}}
    >
      <motion.div
        className="relative w-full h-full duration-500 preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* FRONT OF CARD (Face Down) */}
        <div 
          className="absolute w-full h-full rounded-2xl bg-gradient-to-br from-indigo-900 to-purple-900 border-2 border-indigo-500/30 shadow-2xl flex flex-col items-center justify-center backface-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="absolute inset-2 border-2 border-dashed border-white/10 rounded-xl pointer-events-none" />
          <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-4 backdrop-blur-sm">
            <Music className="w-12 h-12 text-pink-400" />
          </div>
          <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 tracking-wider">
            KARAOKE
          </h2>
          <p className="text-indigo-300 text-sm mt-2 font-medium tracking-widest">TAP TO REVEAL</p>
        </div>

        {/* BACK OF CARD (Face Up - Content) */}
        <div 
          className={`absolute w-full h-full rounded-2xl bg-gradient-to-br ${card.color} flex flex-col shadow-2xl rotate-y-180 overflow-hidden`}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          {/* Header */}
          <div className="w-full flex justify-between items-center text-white/80 p-6 pb-2">
            <div className="flex items-center gap-2">
               <Mic2 className="w-5 h-5" />
               <span className="text-xs font-bold uppercase tracking-widest bg-black/20 px-2 py-1 rounded">{card.category}</span>
            </div>
            
            {/* Hint Button - Only visible if there are suggestions */}
            {card.suggestions && card.suggestions.length > 0 && (
              <button 
                onClick={handleHintToggle}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${showHints ? 'bg-white text-orange-500 shadow-lg' : 'bg-white/20 text-white hover:bg-white/30'}`}
              >
                {showHints ? <X size={16} /> : <Lightbulb size={16} />}
              </button>
            )}
          </div>
          
          {/* Main Content */}
          <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
            <p className="text-white font-bold text-xl sm:text-2xl drop-shadow-md leading-relaxed text-center">
              {card.text}
            </p>
          </div>

          {/* Bottom Footer (Tap to dismiss) */}
          <div className="w-full p-4 border-t border-white/20 text-center relative z-10">
             <p className="text-white/60 text-xs italic">Toca la carta para descartar</p>
          </div>

          {/* Suggestions Overlay */}
          <AnimatePresence>
            {showHints && card.suggestions && (
              <motion.div 
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute bottom-0 left-0 w-full bg-white/20 backdrop-blur-xl border-t border-white/30 p-5 rounded-t-2xl z-20 shadow-[0_-5px_20px_rgba(0,0,0,0.3)]"
                onClick={(e) => e.stopPropagation()} // Prevent card dismiss when clicking inside the panel
              >
                <div className="flex items-center gap-2 mb-3 text-white/90">
                  <Lightbulb size={16} className="text-yellow-300 fill-current" />
                  <span className="text-sm font-bold">¿Te quedaste blanco? Probá con:</span>
                </div>
                <ul className="space-y-2">
                  {card.suggestions.map((suggestion, i) => (
                    <li key={i} className="flex items-start gap-2 text-white text-sm">
                      <span className="text-white/50">•</span>
                      <span className="font-medium">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </motion.div>
    </motion.div>
  );
}