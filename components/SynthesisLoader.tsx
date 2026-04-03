"use client";

import { useEffect, useState } from "react";

export default function SynthesisLoader({ onComplete }: { onComplete: () => void }) {
  const [msgIdx, setMsgIdx] = useState(0);
  
  const messages = [
    "Starting AI synthesis...",
    "Analyzing chronological gaps...",
    "Executing Means-Ends decomposition...",
    "Generating granular STRIPS actions...",
    "Validating logic preconditions...",
    "Applying phase heuristic rotation...",
    "Finalizing structural roadmap..."
  ];

  useEffect(() => {
    // Scroll through messages fast over 3 seconds
    const interval = setInterval(() => {
      setMsgIdx(curr => {
        if (curr < messages.length - 1) return curr + 1;
        return curr;
      });
    }, 450);

    const completeTimeout = setTimeout(() => {
      onComplete();
    }, 3200);

    return () => {
      clearInterval(interval);
      clearTimeout(completeTimeout);
    };
  }, [onComplete, messages.length]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-editorial-dark text-editorial-light overflow-hidden">
      {/* Noise overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
      
      <div className="w-full max-w-xl px-6 relative z-10 font-mono text-sm">
        <div className="mb-8">
          <div className="flex justify-between items-end mb-2 text-editorial-muted">
            <span className="uppercase tracking-widest text-xs">Synthesis Pipeline</span>
            <span className="text-xs">{(msgIdx / messages.length * 100).toFixed(0)}%</span>
          </div>
          <div className="h-1 bg-white/10 w-full overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-300 ease-out" 
              style={{ width: `${((msgIdx + 1) / messages.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="space-y-3">
          {messages.slice(0, msgIdx + 1).map((msg, i) => (
            <div key={i} className={`flex items-start gap-3 ${i === msgIdx ? 'text-white font-medium' : 'text-white/40 opacity-70'}`}>
              <span className="shrink-0 opacity-50">&gt;</span>
              <span>{msg}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
