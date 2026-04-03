"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Wand2 } from "lucide-react";
import Link from "next/link";
import { generateCustomPlan } from "@/lib/planningLogic";
import { usePlans } from "@/hooks/usePlans";
import SynthesisLoader from "@/components/SynthesisLoader";

export default function CustomWizard() {
  const router = useRouter();
  const { savePlan } = usePlans();
  const [step, setStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    goalDesc: "",
    durationDays: ""
  });

  const goNext = () => setStep(s => s + 1);
  const goBack = () => setStep(s => Math.max(0, s - 1));

  const triggerSynthesis = () => setIsGenerating(true);

  const completeSynthesisAndDivert = () => {
    const planData = generateCustomPlan({
      goalDesc: formData.goalDesc,
      durationDays: parseInt(formData.durationDays) || 7
    });

    savePlan(planData);
    router.push("/plan");
  };

  const steps = [
    {
      title: "Describe your goal in one clear sentence.",
      render: () => (
        <div className="w-full">
          <input 
            type="text" 
            placeholder="e.g. Build a personal portfolio website"
            className="w-full p-5 text-xl bg-curator-surface_container_low rounded-xl outline-none focus:bg-curator-surface_container_high transition-all text-curator-on_surface font-manrope shadow-inner border-none"
            value={formData.goalDesc}
            onChange={e => setFormData({...formData, goalDesc: e.target.value})}
          />
        </div>
      ),
      isValid: () => formData.goalDesc.trim().length > 0
    },
    {
      title: "How many days do you have to achieve this?",
      render: () => (
        <div className="w-full">
          <label className="block text-xs font-black uppercase tracking-widest text-curator-on_surface_variant mb-4">Duration in Days</label>
          <input 
            type="number" 
            placeholder="e.g. 7"
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
      <div className="w-full max-w-xl animate-in fade-in slide-in-from-bottom-4 duration-700 relative z-10">
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center gap-2 bg-curator-surface_container_high px-5 py-2.5 rounded-full text-curator-on_surface_variant text-sm font-bold hover:text-curator-on_surface hover:bg-curator-surface_container_highest transition-all shadow-sm">
            <ArrowLeft className="w-4 h-4" /> Change Domain
          </Link>
        </div>

        <div className="mb-10">
          <p className="text-[10px] font-black text-curator-primary uppercase tracking-[0.2em] mb-4">Phase {step + 1} of {steps.length}</p>
          <div className="w-full h-1 bg-curator-surface_container_highest rounded-full overflow-hidden">
            <div className="h-full bg-curator-primary transition-all duration-700 ease-out shadow-[0_0_15px_rgba(186,197,238,0.3)]" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
          </div>
        </div>

        <div className="min-h-[200px] mb-10">
          <h2 className="text-4xl md:text-5xl tracking-tighter leading-tight font-bold text-curator-on_surface font-manrope drop-shadow-sm mb-8">{currentStep.title}</h2>
          <div className="text-curator-on_surface font-inter">
            {currentStep.render()}
          </div>
        </div>

        <div className="flex gap-4">
          {step > 0 && (
            <button 
              onClick={goBack} 
              className="px-8 py-4 bg-curator-surface_container_low border border-curator-outline_variant rounded-full font-bold text-curator-on_surface_variant hover:text-curator-on_surface hover:bg-curator-surface_container_high transition-all"
            >
              Back
            </button>
          )}

          {!isLast ? (
            <button 
              onClick={goNext} 
              disabled={!currentStep.isValid()} 
              className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-curator-on_surface text-curator-bg rounded-full font-bold hover:bg-white transition-all disabled:opacity-20 disabled:cursor-not-allowed shadow-xl"
            >
              Next Step <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button 
              onClick={triggerSynthesis} 
              disabled={!currentStep.isValid()} 
              className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-br from-curator-primary to-[#8a96c7] text-curator-on_primary rounded-full font-bold hover:shadow-[0_10px_30px_rgba(186,197,238,0.4)] transition-all disabled:opacity-20 disabled:cursor-not-allowed shadow-lg"
            >
              Generate Sequence <Wand2 className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
