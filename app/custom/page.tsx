"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Wand2, ChefHat, Code2, Camera, Trophy } from "lucide-react";
import Link from "next/link";
import { generateCustomPlan, PREDEFINED_CUSTOM_GOALS, CustomGoalId } from "@/lib/planningLogic";
import { usePlans } from "@/hooks/usePlans";
import SynthesisLoader from "@/components/SynthesisLoader";

export default function CustomWizard() {
  const router = useRouter();
  const { savePlan } = usePlans();
  const [step, setStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    goalId: "" as CustomGoalId | "",
    durationDays: "7"
  });

  const goNext = () => setStep(s => s + 1);
  const goBack = () => setStep(s => Math.max(0, s - 1));

  const triggerSynthesis = () => setIsGenerating(true);

  const completeSynthesisAndDivert = () => {
    const planData = generateCustomPlan({
      goalId: formData.goalId,
      durationDays: parseInt(formData.durationDays) || 7
    });

    savePlan(planData);
    router.push("/plan");
  };

  const goalOptions = [
    { id: "bengali_cooking", label: "Bengali Cuisine", icon: ChefHat, desc: "From Maacher Jhol to Kosha Mangso." },
    { id: "app_dev", label: "Full-Stack MVP", icon: Code2, desc: "React, Next.js, and Deployments." },
    { id: "photography", label: "Digital Story", icon: Camera, desc: "Master exposure and composition." },
    { id: "marathon", label: "Marathon Base", icon: Trophy, desc: "Aerobic building and recovery." }
  ];

  const steps = [
    {
      title: "Select your strategic objective.",
      render: () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {goalOptions.map(opt => {
            const Icon = opt.icon;
            const isSelected = formData.goalId === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setFormData({...formData, goalId: opt.id as CustomGoalId})}
                className={`flex flex-col gap-4 p-6 text-left rounded-2xl transition-all duration-500 border-2 ${
                  isSelected 
                    ? 'bg-curator-surface_container_high border-curator-primary shadow-2xl scale-[1.02]' 
                    : 'bg-curator-surface_container_low border-transparent hover:bg-curator-surface_container_high'
                }`}
              >
                <div className={`p-3 rounded-xl w-fit ${isSelected ? 'bg-curator-primary text-curator-on_primary' : 'bg-curator-surface_container_highest text-curator-primary'}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-lg font-bold font-manrope text-curator-on_surface">{opt.label}</div>
                  <div className="text-sm text-curator-on_surface_variant mt-1 leading-relaxed">{opt.desc}</div>
                </div>
              </button>
            );
          })}
        </div>
      ),
      isValid: () => !!formData.goalId
    },
    {
      title: "Define your execution window.",
      render: () => (
        <div className="w-full">
          <label className="block text-xs font-black uppercase tracking-[0.2em] text-curator-primary mb-6">Duration in Days</label>
          
          <div className="flex flex-wrap gap-3 mb-8">
            {[3, 7, 14, 30].map(d => (
              <button
                key={d}
                onClick={() => setFormData({...formData, durationDays: d.toString()})}
                className={`px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                  formData.durationDays === d.toString()
                    ? 'bg-curator-primary text-curator-on_primary shadow-lg scale-110'
                    : 'bg-curator-surface_container_low text-curator-on_surface_variant hover:bg-curator-surface_container_highest'
                }`}
              >
                {d} Days
              </button>
            ))}
          </div>

          <input 
            type="number" 
            placeholder="Custom count..."
            className="w-full p-5 text-xl bg-curator-surface_container_low rounded-xl outline-none focus:bg-curator-surface_container_high transition-all text-curator-on_surface font-manrope shadow-inner border-none"
            value={formData.durationDays}
            onChange={e => setFormData({...formData, durationDays: e.target.value})}
          />
        </div>
      ),
      isValid: () => !!formData.durationDays && parseInt(formData.durationDays) > 0
    }
  ];

  const currentStep = steps[step];
  const isLast = step === steps.length - 1;

  if (isGenerating) {
    return <SynthesisLoader onComplete={completeSynthesisAndDivert} />;
  }

  return (
    <main className="min-h-screen bg-transparent relative flex flex-col items-center justify-center py-20 px-6 overflow-hidden font-inter">
      <div className="w-full max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-700 relative z-10">
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center gap-2 bg-curator-surface_container_high px-5 py-2.5 rounded-full text-curator-on_surface_variant text-sm font-bold hover:text-curator-on_surface hover:bg-curator-surface_container_highest transition-all shadow-sm">
            <ArrowLeft className="w-4 h-4" /> Change Domain
          </Link>
        </div>

        <div className="mb-10">
          <p className="text-[10px] font-black text-curator-primary uppercase tracking-[0.2em] mb-4">Sequence Setup: Step {step + 1} / {steps.length}</p>
          <div className="w-full h-1 bg-curator-surface_container_highest rounded-full overflow-hidden">
            <div className="h-full bg-curator-primary transition-all duration-700 ease-out shadow-[0_0_15px_rgba(186,197,238,0.3)]" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
          </div>
        </div>

        <div className="min-h-[250px] mb-10">
          <h2 className="text-4xl md:text-6xl tracking-tighter leading-tight font-bold text-curator-on_surface font-manrope drop-shadow-sm mb-12">{currentStep.title}</h2>
          <div className="text-curator-on_surface font-inter">
            {currentStep.render()}
          </div>
        </div>

        <div className="flex gap-4">
          {step > 0 && (
            <button 
              onClick={goBack} 
              className="px-10 py-5 bg-curator-surface_container_low border border-curator-outline_variant/10 rounded-full font-bold text-curator-on_surface_variant hover:text-curator-on_surface hover:bg-curator-surface_container_high transition-all uppercase text-[10px] tracking-widest"
            >
              Previous
            </button>
          )}

          {!isLast ? (
            <button 
              onClick={goNext} 
              disabled={!currentStep.isValid()} 
              className="flex-1 flex items-center justify-center gap-3 px-10 py-5 bg-curator-on_surface text-curator-bg rounded-full font-black uppercase text-[10px] tracking-[0.2em] hover:bg-white transition-all disabled:opacity-20 disabled:cursor-not-allowed shadow-2xl"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button 
              onClick={triggerSynthesis} 
              disabled={!currentStep.isValid()} 
              className="flex-1 flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-br from-curator-primary to-[#8a96c7] text-curator-on_primary rounded-full font-black uppercase text-[10px] tracking-[0.2em] hover:shadow-[0_15px_40px_rgba(186,197,238,0.4)] transition-all disabled:opacity-20 disabled:cursor-not-allowed shadow-xl"
            >
              Initiate Synthesis <Wand2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
