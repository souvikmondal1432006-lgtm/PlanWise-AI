"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Wand2 } from "lucide-react";
import Link from "next/link";
import { generateStudyPlan } from "@/lib/planningLogic";
import { usePlans } from "@/hooks/usePlans";
import SynthesisLoader from "@/components/SynthesisLoader";

export default function StudyWizard() {
  const router = useRouter();
  const { savePlan } = usePlans();
  const [step, setStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    examType: "",
    subjects: "",
    unitsPerSubject: ""
  });

  const goNext = () => setStep(s => s + 1);
  const goBack = () => setStep(s => Math.max(0, s - 1));

  const triggerSynthesis = () => setIsGenerating(true);

  const completeSynthesisAndDivert = () => {
    const parsedSubjects = formData.subjects.split(',').map(s => s.trim()).filter(Boolean);
    let finalSubjects = parsedSubjects;
    if (formData.examType === 'uni' && formData.unitsPerSubject) {
      finalSubjects = parsedSubjects.map(s => `${s} (x${formData.unitsPerSubject} units)`);
    }

    const planData = generateStudyPlan({
      startDate: formData.startDate,
      endDate: formData.endDate,
      examType: formData.examType,
      subjects: finalSubjects,
    });

    savePlan(planData);
    router.push("/plan");
  };

  const steps = [
    {
      title: "When is your timeline?",
      render: () => (
        <div className="flex gap-4 w-full">
          <div className="flex-1">
            <label className="block text-sm font-semibold text-editorial-muted mb-2">Start Date</label>
            <input 
              type="date" 
              className="w-full p-4 text-lg bg-transparent border border-editorial-border rounded-lg outline-none focus:border-editorial-dark"
              value={formData.startDate}
              onChange={e => setFormData({...formData, startDate: e.target.value})}
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-semibold text-editorial-muted mb-2">End Date</label>
            <input 
              type="date" 
              className="w-full p-4 text-lg bg-transparent border border-editorial-border rounded-lg outline-none focus:border-editorial-dark"
              value={formData.endDate}
              onChange={e => setFormData({...formData, endDate: e.target.value})}
            />
          </div>
        </div>
      ),
      isValid: () => formData.startDate && formData.endDate && new Date(formData.endDate) >= new Date(formData.startDate)
    },
    {
      title: "What type of exam?",
      render: () => (
        <div className="grid gap-3">
          <button 
            onClick={() => setFormData({...formData, examType: 'uni'})}
            className={`p-6 text-left border rounded-lg text-lg font-medium transition-colors ${formData.examType === 'uni' ? 'bg-editorial-dark text-white border-editorial-dark' : 'bg-transparent border-editorial-border hover:border-editorial-dark text-editorial-dark'}`}
          >
            University Exam <span className="block text-sm font-normal opacity-70 mt-1">Focuses on memorization and units.</span>
          </button>
          <button 
            onClick={() => setFormData({...formData, examType: 'external'})}
            className={`p-6 text-left border rounded-lg text-lg font-medium transition-colors ${formData.examType === 'external' ? 'bg-editorial-dark text-white border-editorial-dark' : 'bg-transparent border-editorial-border hover:border-editorial-dark text-editorial-dark'}`}
          >
            External / Competitive Exam <span className="block text-sm font-normal opacity-70 mt-1">Focuses on core subjects and problem solving.</span>
          </button>
        </div>
      ),
      isValid: () => !!formData.examType
    },
    {
      title: formData.examType === 'uni' ? "What subjects are you taking?" : "What subjects/topics are required?",
      render: () => (
        <div className="w-full">
          <label className="block text-sm font-semibold text-editorial-muted mb-2">Comma separated (e.g. DSA, OS, Maths)</label>
          <input 
            type="text" 
            placeholder="DSA, OS, Maths"
            className="w-full p-4 text-lg bg-transparent border border-editorial-border rounded-lg outline-none focus:border-editorial-dark"
            value={formData.subjects}
            onChange={e => setFormData({...formData, subjects: e.target.value})}
          />
        </div>
      ),
      isValid: () => formData.subjects.trim().length > 0
    }
  ];

  if (formData.examType === 'uni') {
    steps.push({
      title: "How many units per subject?",
      render: () => (
        <div className="w-full">
          <label className="block text-sm font-semibold text-editorial-muted mb-2">Average number of units you need to read</label>
          <input 
            type="number" 
            placeholder="e.g. 5"
            className="w-full p-4 text-lg bg-transparent border border-editorial-border rounded-lg outline-none focus:border-editorial-dark"
            value={formData.unitsPerSubject}
            onChange={e => setFormData({...formData, unitsPerSubject: e.target.value})}
          />
        </div>
      ),
      isValid: () => !!formData.unitsPerSubject
    });
  }

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
            <div 
              className="h-full bg-curator-primary transition-all duration-700 ease-out shadow-[0_0_15px_rgba(186,197,238,0.3)]" 
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="min-h-[220px] mb-10">
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
