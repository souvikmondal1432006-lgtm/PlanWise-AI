"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Home } from "lucide-react";
import { GeneratedPlan, Task } from "@/lib/planningLogic";
import Timeline from "@/components/Timeline";
import TaskCard from "@/components/TaskCard";
import { usePlans } from "@/hooks/usePlans";

export default function PlanView() {
  const router = useRouter();
  const { plans, isLoaded, updatePlan } = usePlans();
  const [plan, setPlan] = useState<GeneratedPlan | null>(null);
  const [activeDayIdx, setActiveDayIdx] = useState(0);

  useEffect(() => {
    if (!isLoaded) return;
    
    const id = sessionStorage.getItem("current_plan_id");
    if (!id) {
      router.push("/");
      return;
    }
    
    const found = plans.find(p => p.id === id);
    if (found) {
      setPlan(found);
    } else {
      router.push("/");
    }
  }, [isLoaded, plans, router]);

  if (!plan) return null; // Or a skeleton

  const currentDay = plan.days[activeDayIdx];

  // Callback to handle task completion
  const handleToggleTask = (taskId: string) => {
    const updatedPlan = { ...plan };
    let found = false;

    // Search and update task completion status
    for (const day of updatedPlan.days) {
      for (const t of day.tasks) {
        if (t.id === taskId) {
          t.completed = !t.completed;
          found = true;
          break;
        }
      }
      if (found) break;
    }

    if (found) {
      setPlan(updatedPlan);
      updatePlan(updatedPlan); // Persist to LocalStorage
    }
  };

  // Calculate generic completion rate
  const totalTasks = plan.days.reduce((acc, day) => acc + day.tasks.length, 0);
  const completedTasks = plan.days.reduce((acc, day) => acc + day.tasks.filter(t => t.completed).length, 0);
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  // Check if current day is fully resolved
  const isCurrentDayCompleted = currentDay.tasks.length > 0 && currentDay.tasks.every(t => t.completed);

  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-transparent relative font-inter overflow-x-hidden">
      <div className="relative z-20 w-full md:w-[35%] lg:w-[30%] bg-curator-bg/90 backdrop-blur-3xl border-b md:border-b-0 md:border-r border-curator-outline_variant/10 p-6 md:p-10 flex flex-col h-auto md:h-screen md:sticky top-0 overflow-y-auto no-scrollbar shadow-[20px_0_40px_rgba(0,0,0,0.3)]">
        <Link href="/" className="inline-flex items-center gap-2 text-curator-on_surface_variant hover:text-curator-primary font-bold text-[10px] md:text-xs uppercase tracking-widest transition-all mb-10 md:mb-16 group">
          <Home className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Home Dashboard
        </Link>
        
        <div className="mb-8 md:mb-12">
          <p className="text-[10px] font-black text-curator-primary uppercase tracking-[0.2em] mb-3">
            {plan.domain === 'study' ? 'University Exam' : plan.domain} Protocol
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-curator-on_surface font-manrope leading-[1.1] mb-6 drop-shadow-sm">{plan.title}</h1>

          <div className="bg-curator-surface_container_highest rounded-full h-1.5 w-full overflow-hidden mt-6">
            <div className="bg-curator-primary h-full transition-all duration-1000 ease-out rounded-full shadow-[0_0_10px_rgba(186,197,238,0.4)]" style={{ width: `${completionPercentage}%` }} />
          </div>
          <p className="text-[9px] mt-3 font-black text-curator-on_surface_variant text-right uppercase tracking-[0.1em]">{completionPercentage}% Synthesis Complete</p>
        </div>

        <div className="bg-curator-surface_container_highest/50 backdrop-blur-xl p-8 rounded-[2rem] mb-8 relative overflow-hidden group border border-curator-outline_variant/20 min-h-[160px] flex flex-col justify-center shadow-inner">
          <div className="absolute top-0 right-0 w-32 h-32 bg-curator-primary/10 blur-[60px] -mr-16 -mt-16" />
          
          <p className="text-[9px] font-black text-curator-primary uppercase tracking-[0.2em] mb-4 opacity-80">Strategic Objective</p>
          <h2 className="text-xl md:text-2xl font-bold text-white font-manrope mb-6 leading-snug tracking-tight drop-shadow-md">
            {plan.goal || "Stabilize Situation"}
          </h2>
          
          <div className="mt-auto">
            <p className="text-[9px] font-black text-curator-on_surface_variant uppercase tracking-[0.2em] mb-3">Entropy Gap</p>
            <span className="inline-flex items-center gap-2 bg-curator-bg/50 text-curator-primary px-5 py-2 rounded-full text-[11px] font-bold tracking-wide border border-curator-primary/20 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-curator-primary animate-pulse" />
              {plan.gap}
            </span>
          </div>
        </div>

        <Timeline 
          days={plan.days} 
          currentDayIndex={activeDayIdx} 
          onSelectDay={setActiveDayIdx} 
        />
      </div>

      {/* Right Content Area */}
      <div className="relative z-10 flex-1 p-6 md:p-12 lg:p-20 h-auto md:h-screen overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10 md:mb-12 pb-6 md:pb-8 border-b border-curator-outline_variant/10">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-curator-on_surface font-manrope drop-shadow-sm mb-4">
              Day {currentDay.dayIndex}
            </h2>
            <div className="flex flex-wrap items-center gap-3 md:gap-4 text-curator-on_surface_variant text-[10px] md:text-sm font-bold">
              <span className="uppercase tracking-widest">{currentDay.date === new Date().toISOString().split('T')[0] ? 'Current Cycle' : currentDay.date}</span>
              <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-curator-outline_variant/20" />
              <span className="text-curator-primary border border-curator-primary/20 bg-curator-primary/5 px-3 md:px-4 py-1 rounded-full text-[10px] md:text-xs tracking-wide">
                Focus: {currentDay.focusSubject}
              </span>
              <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-curator-outline_variant/20" />
              <span className="text-[10px] md:text-xs uppercase tracking-widest">
                {currentDay.tasks.filter(t => t.completed).length} / {currentDay.tasks.length} Resolved
              </span>
            </div>
          </div>

          <div className="space-y-6">
            {currentDay.tasks.map(task => (
              <TaskCard key={task.id} task={task} onToggleComplete={() => handleToggleTask(task.id)} />
            ))}
          </div>

          {activeDayIdx < plan.days.length - 1 ? (
            <div className={`mt-16 transition-all duration-500 ${isCurrentDayCompleted ? 'opacity-100 scale-100' : 'opacity-40 grayscale pointer-events-none'}`}>
              <button 
                onClick={() => setActiveDayIdx(i => i + 1)}
                className="w-full py-5 text-center rounded-2xl bg-curator-on_surface text-curator-bg font-black text-sm uppercase tracking-[0.2em] hover:bg-white transition-all shadow-2xl"
              >
                Proceed to Day {activeDayIdx + 2}
              </button>
            </div>
          ) : isCurrentDayCompleted ? (
            <div className="mt-20 animate-in fade-in zoom-in-95 duration-1000">
              <div className="bg-curator-surface_container_high rounded-[2.5rem] p-16 text-center shadow-[0_40px_80px_rgba(0,0,0,0.5)] relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-curator-primary/10 blur-[100px] -mt-32" />
                
                <div className="w-20 h-20 bg-curator-primary text-curator-on_primary rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(186,197,238,0.4)]">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-5xl font-bold text-curator-on_surface font-manrope mb-6 tracking-tighter">Goal Reached</h3>
                <p className="text-curator-on_surface_variant text-xl mb-12 max-w-md mx-auto leading-relaxed">
                  Timeline completed. The protocol has been fully executed. Proceed with confidence.
                </p>
                <div className="flex justify-center">
                  <button 
                    onClick={() => router.push("/")}
                    className="px-12 py-5 bg-curator-on_surface text-curator-bg rounded-full font-black text-xs uppercase tracking-[0.3em] hover:bg-white transition-all shadow-2xl flex items-center gap-3"
                  >
                    <Home className="w-4 h-4" /> Exit Sequence
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
