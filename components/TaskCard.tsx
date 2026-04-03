"use client";

import { useState } from "react";
import { ChevronDown, Cpu, Sparkles, CheckCircle2 } from "lucide-react";
import { Task } from "@/lib/planningLogic";

interface TaskCardProps {
  task: Task;
  onToggleComplete?: () => void;
}

export default function TaskCard({ task, onToggleComplete }: TaskCardProps) {
  const [showExplanation, setShowExplanation] = useState(false);
  const [showStrips, setShowStrips] = useState(false);

  const isCompleted = task.completed;

  return (
    <div className={`bg-curator-surface_container_high rounded-[1.5rem] mb-6 overflow-hidden transition-all duration-500 shadow-xl relative group ${isCompleted ? 'opacity-40 grayscale-[0.5]' : 'hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]'}`}>
      
      {/* Active Indicator Gradient */}
      {!isCompleted && (
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-curator-primary via-curator-secondary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}

      <div className="p-8">
        <div className="flex gap-6 items-start">
          {onToggleComplete && (
            <button 
              onClick={onToggleComplete}
              className={`shrink-0 mt-1.5 transition-all duration-500 hover:scale-110 ${isCompleted ? 'text-curator-primary' : 'text-curator-outline_variant/40 hover:text-curator-primary'}`}
            >
              <CheckCircle2 className={`w-8 h-8 ${isCompleted ? 'fill-curator-primary/20' : ''}`} />
            </button>
          )}
          
          <div className="flex-1">
            <h3 className={`text-2xl md:text-3xl font-bold tracking-tight font-manrope mb-4 transition-all duration-500 ${isCompleted ? 'text-curator-on_surface_variant line-through opacity-60' : 'text-curator-on_surface'}`}>
              {task.actionTitle}
            </h3>
            <p className={`text-lg leading-relaxed mb-8 font-inter transition-all duration-500 ${isCompleted ? 'text-curator-on_surface_variant/60' : 'text-curator-on_surface_variant'}`}>
              {task.reason}
            </p>

            <div className="flex gap-4">
              <button 
                onClick={() => setShowExplanation(!showExplanation)}
                className={`flex items-center gap-3 px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest transition-all ${showExplanation ? 'bg-curator-on_surface text-curator-bg' : 'bg-curator-surface_container_highest text-curator-on_surface_variant hover:text-curator-on_surface hover:bg-curator-surface_bright'}`}
              >
                <Sparkles className="w-4 h-4" />
                {showExplanation ? "Hide Context" : "Simple Translation"}
              </button>
            </div>

            {/* The Insight Card Style */}
            {showExplanation && (
              <div className="mt-6 p-6 bg-curator-surface_container_low rounded-xl animate-in fade-in slide-in-from-top-4 duration-500 border-none">
                <p className="text-[10px] font-black text-curator-primary pb-3 border-b border-curator-outline_variant/10 mb-4 uppercase tracking-[0.2em] font-inner">Plain English Translation</p>
                <p className="text-curator-on_surface font-medium leading-relaxed font-inter">{task.simpleExplanation}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* STRIPS Integration */}
      <button 
        onClick={() => setShowStrips(!showStrips)}
        className="w-full px-8 py-5 bg-curator-surface_container_highest/30 flex items-center justify-between text-curator-on_surface_variant hover:text-curator-on_surface hover:bg-curator-surface_container_highest transition-all group/strips"
      >
        <span className="flex items-center gap-3 font-bold text-[10px] uppercase tracking-widest">
          <Cpu className={`w-4 h-4 transition-colors ${showStrips ? 'text-curator-primary' : ''}`} />
          Agent Logic Flow (STRIPS)
        </span>
        <ChevronDown className={`w-5 h-5 transition-transform duration-500 ${showStrips ? 'rotate-180 text-curator-primary' : ''}`} />
      </button>

      {showStrips && (
        <div className="bg-curator-surface_container_highest/10 p-8 text-sm animate-in fade-in slide-in-from-top-2 duration-500 font-inter">
          <div className="mb-8">
            <div className="text-[10px] uppercase tracking-[0.15em] font-black text-curator-on_surface_variant/60 mb-3">Computed Action Label</div>
            <div className="inline-block bg-curator-surface_container_lowest text-curator-primary px-4 py-2 rounded-lg font-mono text-xs font-bold shadow-inner">
              {task.strips.action}
            </div>
          </div>
          
          <div className="mb-8">
            <div className="text-[10px] uppercase tracking-[0.15em] font-black text-curator-on_surface_variant/60 mb-3">Condition Check (Gap)</div>
            <div className="flex gap-2 flex-wrap">
              {task.strips.pre.map(p => (
                <span key={p} className="bg-curator-surface_container_highest px-4 py-1.5 rounded-full font-bold text-curator-on_surface text-[11px] tracking-wide shadow-sm">
                  {p}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[10px] uppercase tracking-[0.15em] font-black text-curator-on_surface_variant/60 mb-3">Targeted Effect</div>
            <div className="flex gap-2 flex-wrap">
              {task.strips.eff.map(e => (
                <span key={e} className="bg-curator-primary/10 border border-curator-primary/20 text-curator-primary px-4 py-1.5 rounded-full font-bold text-[11px] tracking-wide shadow-sm">
                  {e}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
