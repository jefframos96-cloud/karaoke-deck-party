import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Shuffle, Play, RotateCcw, Sparkles, Mic, Layers, ListMusic, Dices, Eye, X, Download, Settings, Minus, Plus } from 'lucide-react';

import { INITIAL_DECK } from './constants';
import { CardData, GamePhase, CardCategory } from './types';
import { generateKaraokeCards } from './services/geminiService';
import { CardComponent } from './components/CardComponent';
import { Button } from './components/Button';

// Utility for Fisher-Yates shuffle
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Utility to create a structured/balanced deck
const createStructuredDeck = (cards: CardData[]): CardData[] => {
  // 1. Separate by category
  const quick = shuffleArray(cards.filter(c => c.category === CardCategory.QUICK));
  const wildcards = shuffleArray(cards.filter(c => c.category === CardCategory.WILDCARD));
  
  // The core gameplay loop cards (Excluding CLASSIC for structured mode)
  const coreCards = shuffleArray(cards.filter(c => 
    c.category === CardCategory.ACTING || 
    c.category === CardCategory.DUET || 
    c.category === CardCategory.CHALLENGE
  ));

  const structuredDeck: CardData[] = [];

  // PHASE 1: WARM UP (Rompehielo)
  const warmUpCount = 4;
  for(let i=0; i<warmUpCount && i<quick.length; i++) {
    const card = quick.pop();
    if (card) structuredDeck.push(card);
  }

  // PHASE 2: THE MIX
  const remainingCore = shuffleArray([...coreCards, ...quick]);

  let cardsSinceWildcard = 0;
  
  while (remainingCore.length > 0) {
     if (wildcards.length > 0 && (cardsSinceWildcard > 4 || (cardsSinceWildcard > 2 && Math.random() > 0.7))) {
        const wc = wildcards.pop();
        if (wc) {
          structuredDeck.push(wc);
          cardsSinceWildcard = 0;
          continue; 
        }
     }

     const nextCard = remainingCore.pop();
     if (nextCard) {
       structuredDeck.push(nextCard);
       cardsSinceWildcard++;
     }
  }

  structuredDeck.push(...wildcards);

  return structuredDeck;
};

export default function App() {
  const [phase, setPhase] = useState<GamePhase>(GamePhase.INTRO);
  const [deck, setDeck] = useState<CardData[]>(INITIAL_DECK);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showCatalog, setShowCatalog] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  
  // Audio context placeholder
  const playSound = (type: 'flip' | 'whoosh') => {
    // Sound logic
  };

  useEffect(() => {
    // Load zoom pref
    const savedZoom = localStorage.getItem('karaoke_zoom');
    if (savedZoom) {
      setZoomLevel(parseFloat(savedZoom));
    } else {
      // Auto-detect small screens and default to slightly smaller zoom
      if (window.innerHeight < 700) {
        setZoomLevel(0.85);
      }
    }

    // Listen for PWA install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  useEffect(() => {
    if (phase === GamePhase.INTRO) {
      const timer = setTimeout(() => {
        setPhase(GamePhase.MODE_SELECTION);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  const updateZoom = (newZoom: number) => {
    const clamped = Math.min(Math.max(newZoom, 0.5), 1.5);
    setZoomLevel(clamped);
    localStorage.setItem('karaoke_zoom', clamped.toString());
  };

  // Group cards for the catalog view
  const groupedCards = useMemo(() => {
    const groups: Record<string, CardData[]> = {};
    INITIAL_DECK.forEach(card => {
      if (!groups[card.category]) groups[card.category] = [];
      groups[card.category].push(card);
    });
    return groups;
  }, []);

  const handleShuffle = useCallback(() => {
    setPhase(GamePhase.SHUFFLING);
    setTimeout(() => {
      setDeck(prev => shuffleArray(prev));
      setPhase(GamePhase.READY);
    }, 800);
  }, []);

  const handleModeSelection = (mode: 'structured' | 'random') => {
    if (mode === 'random') {
      setPhase(GamePhase.SHUFFLING);
      setTimeout(() => {
        setDeck(shuffleArray(INITIAL_DECK));
        setPhase(GamePhase.READY);
      }, 800);
    } else {
      setPhase(GamePhase.SHUFFLING);
      setTimeout(() => {
        setDeck(createStructuredDeck(INITIAL_DECK));
        setPhase(GamePhase.READY);
      }, 800);
    }
  };

  const handleStart = () => {
    setPhase(GamePhase.PLAYING);
  };

  const handleInstallClick = () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    installPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === 'accepted') {
        setInstallPrompt(null);
      }
    });
  };

  const handleCardTap = () => {
    if (phase !== GamePhase.PLAYING) return;

    if (!isFlipped) {
      setIsFlipped(true);
      playSound('flip');
    } else {
      playSound('whoosh');
      setIsFlipped(false);
      setTimeout(() => {
        setDeck(prev => {
          const newDeck = prev.slice(1);
          if (newDeck.length === 0) {
            setPhase(GamePhase.FINISHED);
          }
          return newDeck;
        });
      }, 200); 
    }
  };

  const handleReset = () => {
    setDeck(INITIAL_DECK);
    setIsFlipped(false);
    setPhase(GamePhase.MODE_SELECTION);
  };

  const handleGenerateAI = async () => {
    setIsLoading(true);
    try {
      const newCards = await generateKaraokeCards();
      if (newCards.length > 0) {
        setDeck(newCards);
        setPhase(GamePhase.READY);
      } else {
        alert("No se pudieron generar cartas. Verifica tu API Key o conexión.");
      }
    } catch (e) {
        console.error(e);
        alert("Error generando cartas.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // CHANGED: Changed overflow-hidden to overflow-y-auto to allow scrolling on small screens
    <div className="min-h-screen w-full bg-[#0f0721] flex flex-col relative overflow-y-auto overflow-x-hidden">
      
      {/* Background Ambience - Fixed position so it doesn't scroll away */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/30 rounded-full blur-[100px]" />
      </div>

      {/* SETTINGS MODAL */}
      <AnimatePresence>
        {showSettings && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowSettings(false)}
          >
             <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-[#1a103c] w-full max-w-sm rounded-3xl border border-white/10 p-6 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
             >
                <div className="flex justify-between items-center mb-6">
                   <h2 className="text-xl font-bold text-white flex items-center gap-2">
                     <Settings size={20} className="text-pink-500" />
                     Configuración
                   </h2>
                   <button onClick={() => setShowSettings(false)}><X className="text-white/60" /></button>
                </div>
                
                <div className="mb-6">
                   <label className="text-sm text-indigo-200 mb-3 block">Tamaño de la App (Zoom)</label>
                   <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                      <button onClick={() => updateZoom(zoomLevel - 0.1)} className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white">
                        <Minus size={16} />
                      </button>
                      <div className="flex-1 text-center font-mono text-cyan-400 font-bold">
                        {Math.round(zoomLevel * 100)}%
                      </div>
                      <button onClick={() => updateZoom(zoomLevel + 0.1)} className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white">
                        <Plus size={16} />
                      </button>
                   </div>
                   <p className="text-xs text-white/40 mt-2 text-center">
                     Ajusta si los elementos se ven muy grandes o pequeños.
                   </p>
                </div>
                
                <Button onClick={() => setShowSettings(false)} variant="primary" className="w-full">
                  Listo
                </Button>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CATALOG MODAL */}
      <AnimatePresence>
        {showCatalog && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setShowCatalog(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="bg-[#1a103c] w-full max-w-2xl h-[80vh] rounded-3xl border border-white/10 overflow-hidden flex flex-col shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#130b2e]">
                <div className="flex items-center gap-3">
                  <ListMusic className="text-pink-500" />
                  <h2 className="text-xl font-bold text-white">Catálogo de Cartas</h2>
                </div>
                <button 
                  onClick={() => setShowCatalog(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="text-white/70" />
                </button>
              </div>

              {/* Modal Content - Scrollable */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                {Object.entries(groupedCards).map(([category, cards]) => (
                  <div key={category}>
                    <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-current" />
                      {category}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {cards.map((card) => (
                        <div 
                          key={card.id}
                          className={`p-4 rounded-xl bg-gradient-to-br ${card.color} relative overflow-hidden group`}
                        >
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                          <p className="relative z-10 text-white font-medium text-sm leading-snug">
                            {card.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t border-white/10 bg-[#130b2e] text-center text-xs text-white/40">
                Total: {INITIAL_DECK.length} cartas disponibles
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {phase === GamePhase.INTRO ? (
          <motion.div
            key="intro"
            className="absolute inset-0 z-50 flex items-center justify-center flex-col p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
             <motion.div
               initial={{ scale: 0.8, y: 20 }}
               animate={{ scale: 1, y: 0 }}
               transition={{ duration: 1, ease: "easeOut" }}
               className="flex flex-col items-center"
             >
                <div className="relative">
                  <div className="absolute inset-0 bg-pink-500/20 blur-xl rounded-full" />
                  <Mic className="relative z-10 w-24 h-24 text-pink-500 mb-8 animate-bounce drop-shadow-lg" />
                </div>
                <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 tracking-tighter text-center leading-tight drop-shadow-2xl">
                  KARAOKE<br/>MASTER
                </h1>
             </motion.div>
          </motion.div>
        ) : (
          <motion.div 
            key="game-ui"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex-1 w-full flex flex-col items-center justify-between p-4 z-10"
          >
            {/* Header & Settings Button */}
            <header className="w-full flex justify-between items-start mt-4 px-2 relative">
               <div className="w-10"></div> {/* Spacer for centering */}
               <div className="flex flex-col items-center">
                  <div className="flex items-center gap-2 mb-2">
                     <Mic className="text-pink-500 w-8 h-8" />
                     <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 tracking-tighter">
                     KARAOKE MASTER
                     </h1>
                  </div>
                  <p className="text-indigo-300/80 text-sm font-medium">¡Que empiece la fiesta!</p>
               </div>
               <button 
                  onClick={() => setShowSettings(true)}
                  className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full text-white/70 hover:text-white hover:bg-white/20 transition-all"
               >
                  <Settings size={20} />
               </button>
            </header>

            {/* Main Game Area - Applied Scale Transform here */}
            <main 
                className="flex-1 w-full flex flex-col items-center justify-center min-h-[450px] transition-transform duration-300 origin-top"
                style={{ transform: `scale(${zoomLevel})` }}
            >
              
              <AnimatePresence mode="wait">
                
                {/* MODE SELECTION SCREEN */}
                {phase === GamePhase.MODE_SELECTION && (
                   <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -20 }}
                     className="w-full max-w-md grid gap-4 p-4"
                   >
                     <h2 className="text-2xl font-bold text-center text-white mb-2">¿Cómo quieren jugar hoy?</h2>
                     
                     <button 
                        onClick={() => handleModeSelection('structured')}
                        className="group relative bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border border-purple-500/30 p-6 rounded-2xl text-left hover:border-purple-400 transition-all hover:shadow-lg hover:shadow-purple-500/20 active:scale-95"
                     >
                        <div className="flex items-start gap-4">
                           <div className="p-3 rounded-full bg-purple-500/20 text-purple-300 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                              <ListMusic size={28} />
                           </div>
                           <div>
                              <h3 className="text-xl font-bold text-white mb-1">Estructura Dinámica</h3>
                              <p className="text-indigo-200 text-sm leading-relaxed">
                                 Un flujo perfecto: Empezamos con cartas rápidas, seguimos con retos grupales y subimos la intensidad.
                              </p>
                           </div>
                        </div>
                     </button>

                     <button 
                        onClick={() => handleModeSelection('random')}
                        className="group relative bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border border-cyan-500/30 p-6 rounded-2xl text-left hover:border-cyan-400 transition-all hover:shadow-lg hover:shadow-cyan-500/20 active:scale-95"
                     >
                        <div className="flex items-start gap-4">
                           <div className="p-3 rounded-full bg-cyan-500/20 text-cyan-300 group-hover:bg-cyan-500 group-hover:text-white transition-colors">
                              <Dices size={28} />
                           </div>
                           <div>
                              <h3 className="text-xl font-bold text-white mb-1">Cartas Mezcladas</h3>
                              <p className="text-indigo-200 text-sm leading-relaxed">
                                 ¡Caos total! Barajamos todas las categorías (incluyendo las clásicas) y que la suerte decida.
                              </p>
                           </div>
                        </div>
                     </button>

                     {/* UTILITY BUTTONS MOVED HERE FOR BETTER VISIBILITY */}
                     <div className="flex gap-3 mt-2">
                        <button 
                            onClick={() => setShowCatalog(true)}
                            className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-indigo-200 hover:text-white py-3 rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2 active:scale-95"
                        >
                            <Eye size={18} />
                            Ver Cartas
                        </button>
                        
                        <Button 
                            onClick={handleGenerateAI} 
                            variant="magic" 
                            className="flex-[2] text-sm py-3 rounded-2xl"
                            icon={isLoading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Sparkles size={16} />}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Creando...' : 'Crear con IA'}
                        </Button>
                     </div>

                     {/* INSTALL APP BUTTON - Only visible if PWA prompt is captured */}
                     {installPrompt && (
                      <button
                        onClick={handleInstallClick}
                        className="w-full bg-emerald-600/20 border border-emerald-500/50 text-emerald-400 hover:bg-emerald-600/30 py-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all mt-1"
                      >
                        <Download size={14} />
                        INSTALAR APP EN EL CELULAR
                      </button>
                    )}

                   </motion.div>
                )}

                {/* GAME FINISHED SCREEN */}
                {phase === GamePhase.FINISHED && (
                   <motion.div 
                     initial={{ scale: 0.8, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     exit={{ scale: 0.8, opacity: 0 }}
                     className="text-center p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10"
                   >
                     <h2 className="text-3xl font-bold text-white mb-4">¡Juego Terminado!</h2>
                     <p className="text-indigo-200 mb-6">¿Otra ronda o cambiamos de cantantes?</p>
                     <Button onClick={handleReset} variant="magic" icon={<RotateCcw size={20} />}>
                       Volver al Menú
                     </Button>
                   </motion.div>
                )}

                {/* PLAYING / READY / SHUFFLING AREA */}
                {(phase === GamePhase.READY || phase === GamePhase.PLAYING || phase === GamePhase.SHUFFLING || phase === GamePhase.IDLE) && (
                  <div className="relative w-64 h-80 sm:w-80 sm:h-[420px] flex items-center justify-center">
                    {deck.length === 0 ? (
                       <div className="text-white/50">Cargando baraja...</div>
                    ) : (
                      <AnimatePresence>
                        {deck.map((card, index) => (
                          <CardComponent
                            key={card.id}
                            card={card}
                            index={index}
                            total={deck.length}
                            isFlipped={index === 0 && isFlipped}
                            isTop={index === 0}
                            onTap={handleCardTap}
                          />
                        ))}
                      </AnimatePresence>
                    )}
                    
                    {/* Tap hint when playing */}
                    {phase === GamePhase.PLAYING && !isFlipped && deck.length > 0 && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute -bottom-12 text-white/50 text-sm animate-pulse pointer-events-none w-max"
                      >
                        Toca la carta para revelar
                      </motion.div>
                    )}
                  </div>
                )}
              </AnimatePresence>
            </main>

            {/* Controls Footer */}
            <footer className="w-full max-w-md mb-6 grid gap-4 relative z-10 px-4">
              
              {/* State: IDLE - Moved logic to Mode Selection, keeping button for AI or manual shuffle if in legacy IDLE state */}
              {phase === GamePhase.IDLE && (
                 <div className="text-center text-white/50">Seleccionando modo...</div>
              )}

              {/* State: SHUFFLING */}
              {phase === GamePhase.SHUFFLING && (
                <div className="text-center text-cyan-400 font-bold animate-pulse">
                  Preparando el escenario...
                </div>
              )}

              {/* State: READY (Shuffled, ready to start) */}
              {phase === GamePhase.READY && (
                <div className="flex flex-col gap-3">
                   <div className="flex justify-center mb-2">
                      <span className="bg-green-500/20 text-green-400 px-4 py-1 rounded-full text-sm font-bold border border-green-500/30">
                        ¡Mazo Listo!
                      </span>
                   </div>
                   <Button onClick={handleStart} variant="primary" icon={<Play size={20} className="fill-current" />}>
                     EMPEZAR A JUGAR
                   </Button>
                   <Button onClick={() => setPhase(GamePhase.MODE_SELECTION)} variant="secondary" className="text-sm py-2">
                     Cambiar Modo
                   </Button>
                </div>
              )}

              {/* State: PLAYING */}
              {phase === GamePhase.PLAYING && (
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                        <div className="flex items-center gap-2 text-indigo-200">
                        <Layers size={18} />
                        <span className="text-sm font-mono">
                            {deck.length} cartas restantes
                        </span>
                        </div>
                        
                        <button 
                        onClick={handleReset}
                        className="text-red-400 text-xs font-bold hover:text-red-300 transition-colors uppercase tracking-wider px-3 py-2 rounded hover:bg-red-500/10"
                        >
                        Acabar Juego
                        </button>
                    </div>
                </div>
              )}
              
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}