"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Dumbbell, ShieldAlert, Target, Play, Trash2 } from "lucide-react";
import { usePlans } from "@/hooks/usePlans";
import { useRouter } from "next/navigation";

export default function Home() {
  const { plans, isLoaded, deletePlan } = usePlans();
  const router = useRouter();

  const domains = [
    {
      id: "emergency",
      title: "Emergency Response",
      desc: "Immediate, sequential execution plans for critical situations.",
      icon: ShieldAlert,
      href: "/emergency"
    },
    {
      id: "study",
      title: "Study Planner",
      desc: "Intelligent daily scheduling, concept division, and revision cycles.",
      icon: BookOpen,
      href: "/study"
    },
    {
      id: "fitness",
      title: "Fitness Planner",
      desc: "Structured workout splits and actionable daily physical goals.",
      icon: Dumbbell,
      href: "/fitness"
    },
    {
      id: "custom",
      title: "Other Goals",
      desc: "Master regional cuisines, technical architectures, and specialized personal milestones.",
      icon: Target,
      href: "/custom"
    }
  ];

  const resumePlan = (id: string) => {
    sessionStorage.setItem("current_plan_id", id);
    router.push("/plan");
  };

  return (
    <main className="flex-1 flex flex-col items-center justify-center py-20 px-6 max-w-6xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700 relative z-10 font-inter">
      
      <div className="text-center max-w-3xl mb-16 relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 text-curator-on_surface font-manrope drop-shadow-sm leading-tight">Structured planning <br /> for real life.</h1>
        <p className="text-xl text-curator-on_surface_variant max-w-2xl mx-auto">Intelligent logic for emergencies, studies, fitness, and goals. Delivered with editorial precision.</p>
      </div>

      {isLoaded && plans.length > 0 && (
        <div className="w-full mb-20 relative z-10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-curator-on_surface font-manrope">Your Chapters</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map(plan => {
              const totalTasks = plan.days.reduce((acc, day) => acc + day.tasks.length, 0);
              const completedTasks = plan.days.reduce((acc, day) => acc + day.tasks.filter(t => t.completed).length, 0);
              const isFinished = totalTasks > 0 && totalTasks === completedTasks;

              return (
              <div key={plan.id} className="flex flex-col justify-between bg-curator-surface_container_high rounded-xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] group relative overflow-hidden">
                
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-curator-primary/5 blur-3xl -mr-16 -mt-16 group-hover:bg-curator-primary/10 transition-colors" />

                <button 
                  onClick={() => deletePlan(plan.id)}
                  className="absolute top-6 right-6 text-curator-on_surface_variant/40 hover:text-curator-error transition-colors z-20"
                  title="Archive Plan"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4 pr-8">
                    <p className="text-[10px] font-black text-curator-primary uppercase tracking-[0.2em] font-inter">
                      {plan.domain === 'study' ? 'University Exam' : plan.domain}
                    </p>
                    {isFinished ? (
                      <span className="bg-curator-primary/20 text-curator-primary text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-curator-primary/30">Resolved</span>
                    ) : (
                      <span className="text-curator-on_surface_variant text-[9px] font-black uppercase tracking-widest opacity-60">Sequence Active</span>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold tracking-tighter mb-2 truncate pr-4 text-curator-on_surface font-manrope leading-tight group-hover:text-curator-primary transition-colors">{plan.title}</h3>
                  <p className="text-sm text-curator-on_surface_variant mb-6 line-clamp-2 pr-4 leading-relaxed opacity-80">{plan.goal}</p>
                  
                  {/* Progress Matrix */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-end text-[9px] font-black uppercase tracking-widest text-curator-on_surface_variant">
                      <span>Integration Progress</span>
                      <span>{Math.round((completedTasks/totalTasks)*100)}%</span>
                    </div>
                    <div className="h-1 bg-curator-surface_container_highest rounded-full overflow-hidden border border-curator-outline_variant/5">
                      <div 
                        className="h-full bg-curator-primary transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(186,197,238,0.3)]" 
                        style={{ width: `${(completedTasks/totalTasks)*100}%` }} 
                      />
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => resumePlan(plan.id)}
                  className={`flex items-center gap-2 text-sm font-bold tracking-wide transition-all ${isFinished ? 'text-curator-primary hover:text-white' : 'text-curator-on_surface hover:text-curator-primary'}`}
                >
                  {isFinished ? (
                    <>
                      <div className="w-5 h-5 rounded-full border border-curator-primary/30 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-curator-primary animate-pulse" />
                      </div>
                      Review Archived Entry
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" /> Resume Active Flow
                    </>
                  )}
                </button>
              </div>
            )})}
          </div>
        </div>
      )}

      <div className="w-full relative z-10">
        <div className="text-left mb-12">
          <h2 className="text-2xl font-bold tracking-tight text-curator-on_surface font-manrope">Initiate New Sequence</h2>
          <p className="text-curator-on_surface_variant text-sm mt-1">Select a domain to begin goal decomposition.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {domains.map((domain) => {
            const Icon = domain.icon;
            return (
              <Link 
                key={domain.id} 
                href={domain.href}
                className="flex flex-col gap-6 bg-curator-surface_container_low rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:bg-curator-surface_container_high cursor-pointer group text-curator-on_surface"
              >
                <div className="w-12 h-12 rounded-xl bg-curator-surface_container_highest flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-inner">
                  <Icon className="w-6 h-6 text-curator-primary" />
                </div>
                <div>
                  <div className="text-lg font-bold tracking-tight font-manrope mb-2">{domain.title}</div>
                  <div className="text-sm text-curator-on_surface_variant leading-relaxed font-inter">{domain.desc}</div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </main>
  );
}
