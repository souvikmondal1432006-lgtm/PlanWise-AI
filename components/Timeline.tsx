"use client";

import { CheckCircle2 } from "lucide-react";
import { DayPlan } from "@/lib/planningLogic";

interface TimelineProps {
  days: DayPlan[];
  currentDayIndex: number;
  onSelectDay: (index: number) => void;
}

export default function Timeline({ days, currentDayIndex, onSelectDay }: TimelineProps) {
  return (
    <div className="mt-auto pt-8 flex flex-col border-t border-curator-outline_variant/10">
      <p className="text-[10px] uppercase tracking-[0.2em] font-black text-curator-on_surface_variant mb-6 px-2">Temporal Sequence</p>
      <div className="flex flex-row md:flex-col gap-1 overflow-auto pb-4 md:pb-0 pr-2 no-scrollbar">
        {days.map((day, idx) => {
          const isActive = idx === currentDayIndex;
          const isPast = idx < currentDayIndex;

          return (
            <button
              key={day.dayIndex}
              onClick={() => onSelectDay(idx)}
              className={`text-left px-5 py-4 rounded-xl transition-all duration-300 flex items-center justify-between whitespace-nowrap min-w-[140px] md:min-w-0 group ${
                isActive 
                ? 'bg-curator-surface_container_highest text-curator-on_surface shadow-lg scale-[1.02]' 
                : isPast
                  ? 'bg-transparent text-curator-on_surface_variant/40 hover:bg-curator-surface_container_low hover:text-curator-on_surface_variant'
                  : 'bg-transparent text-curator-on_surface_variant hover:bg-curator-surface_container_low hover:text-curator-on_surface'
              }`}
            >
              <div className="flex flex-col">
                <span className={`text-sm font-bold font-manrope tracking-tight ${isActive ? 'text-curator-primary' : ''}`}>Day {day.dayIndex}</span>
                <span className="text-[10px] font-black uppercase tracking-widest opacity-40 mt-0.5 group-hover:opacity-70 transition-opacity">{day.phase}</span>
              </div>
              {isPast && <CheckCircle2 className="w-4 h-4 text-curator-primary/60" />}
              {isActive && <div className="w-1.5 h-1.5 rounded-full bg-curator-primary shadow-[0_0_8px_rgba(186,197,238,0.8)]" />}
            </button>
          )
        })}
      </div>
    </div>
  );
}
