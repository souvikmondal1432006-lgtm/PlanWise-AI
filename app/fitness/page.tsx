"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Wand2 } from "lucide-react";
import Link from "next/link";
import { generateFitnessPlan } from "@/lib/planningLogic";
import { usePlans } from "@/hooks/usePlans";
import SynthesisLoader from "@/components/SynthesisLoader";

export default function FitnessWizard() {
  const router = useRouter();
  const { savePlan } = usePlans();
  const [step, setStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    goal: "",
    durationWeeks: "",
    experience: ""
  });

  const goNext = () => setStep(s => s + 1);
  const goBack = () => setStep(s => Math.max(0, s - 1));

  const triggerSynthesis = () => setIsGenerating(true);

  const completeSynthesisAndDivert = () => {
    const planData = generateFitnessPlan({
      goal: formData.goal,
      durationWeeks: parseInt(formData.durationWeeks) || 4,
      experience: formData.experience
    });

    savePlan(planData);
    router.push("/plan");
  };

  const steps = [
    {
      title: "What is your primary physical goal?",
      render: () => (
        <div className="grid gap-3">
          {[
            { id: "bodybuilding", label: "Muscle Building & Hypertrophy", desc: "Focuses on progressive overload and size." },
            { id: "lean", label: "Fat Loss & Lean Definition", desc: "Focuses on high-intensity and short rest periods." },
            { id: "general", label: "General Health & Endurance", desc: "Focuses on perfect form and consistent execution." }
          ].map(opt => (
            <button 
              key={opt.id}
              onClick={() => setFormData({...formData, goal: opt.id})}
              className={`p-6 text-left rounded-xl text-lg font-bold transition-all duration-300 ${formData.goal === opt.id ? 'bg-curator-primary text-curator-on_primary shadow-[0_10px_25px_rgba(186,197,238,0.2)]' : 'bg-curator-surface_container_low text-curator-on_surface hover:bg-curator-surface_container_high'}`}
            >
              <div className="font-manrope">{opt.label}</div>
              <div className={`text-sm font-normal mt-1 ${formData.goal === opt.id ? 'opacity-90' : 'text-curator-on_surface_variant'}`}>{opt.desc}</div>
            </button>
          ))}
        </div>
      ),
      isValid: () => !!formData.goal
    },
    {
      title: "How many weeks do you want this plan to run?",
      render: () => (
        <div className="w-full">
          <label className="block text-xs font-black uppercase tracking-widest text-curator-on_surface_variant mb-4">Duration in Weeks</label>
          <input 
            type="number" 
            placeholder="e.g. 4"
            className="w-full p-5 text-xl bg-curator-surface_container_low rounded-xl outline-none focus:bg-curator-surface_container_high transition-all text-curator-on_surface font-manrope shadow-inner"
            value={formData.durationWeeks}
            onChange={e => setFormData({...formData, durationWeeks: e.target.value})}
          />
        </div>
      ),
      isValid: () => !!formData.durationWeeks && parseInt(formData.durationWeeks) > 0
    },
    {
      title: "What is your current fitness experience level?",
      render: () => (
        <div className="grid gap-3">
          {[
            { id: "beginner", label: "Beginner", desc: "0-1 years of consistent lifting. Uses full-body splits." },
            { id: "advanced", label: "Intermediate/Advanced", desc: "1+ years of lifting. Uses Push/Pull/Legs splits." }
          ].map(opt => (
            <button 
              key={opt.id}
              onClick={() => setFormData({...formData, experience: opt.id})}
              className={`p-6 text-left rounded-xl text-lg font-bold transition-all duration-300 ${formData.experience === opt.id ? 'bg-curator-primary text-curator-on_primary shadow-[0_10px_25px_rgba(186,197,238,0.2)]' : 'bg-curator-surface_container_low text-curator-on_surface hover:bg-curator-surface_container_high'}`}
            >
              <div className="font-manrope">{opt.label}</div>
              <div className={`text-sm font-normal mt-1 ${formData.experience === opt.id ? 'opacity-90' : 'text-curator-on_surface_variant'}`}>{opt.desc}</div>
            </button>
          ))}
        </div>
      ),
      isValid: () => !!formData.experience
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

        <div className="min-h-[250px] mb-10">
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
