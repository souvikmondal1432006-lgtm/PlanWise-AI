"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Wand2, ChefHat, Code2, Camera, Trophy, MapPin, Utensils, Leaf, Beef } from "lucide-react";
import Link from "next/link";
import { generateCustomPlan } from "@/lib/planningLogic";
import { PREDEFINED_HIERARCHY } from "@/lib/predefinedGoals";
import { usePlans } from "@/hooks/usePlans";
import SynthesisLoader from "@/components/SynthesisLoader";

export default function CustomWizard() {
  const router = useRouter();
  const { savePlan } = usePlans();
  const [step, setStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [selections, setSelections] = useState({
    mainGoalId: "",
    dietaryType: "" as "vegetarian" | "non-vegetarian" | "",
    subCategoryId: "",
    detailId: "",
    durationDays: "7"
  });

  const mainGoal = useMemo(() => 
    PREDEFINED_HIERARCHY.find(g => g.id === selections.mainGoalId),
  [selections.mainGoalId]);

  const subCategory = useMemo(() => 
    mainGoal?.subCategories.find(s => s.id === selections.subCategoryId),
  [mainGoal, selections.subCategoryId]);

  const filteredDetails = useMemo(() => {
    if (!subCategory) return [];
    let base = subCategory.details;
    if (selections.mainGoalId === 'cooking') {
      base = base.filter(d => d.dietaryType === selections.dietaryType);
    }
    // Shuffling Logic for High-Density Discovery
    return [...base].sort(() => 0.5 - Math.random());
  }, [subCategory, selections.dietaryType, selections.mainGoalId]);

  const goNext = () => setStep(s => s + 1);
  const goBack = () => setStep(s => Math.max(0, s - 1));

  const triggerSynthesis = () => setIsGenerating(true);

  const completeSynthesisAndDivert = () => {
    const planData = generateCustomPlan({
      detailId: selections.detailId,
      durationDays: parseInt(selections.durationDays) || 7
    });

    savePlan(planData);
    router.push("/plan");
  };

  const steps = [
    {
      id: "main",
      title: "Select your primary domain of mastery.",
      render: () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {PREDEFINED_HIERARCHY.map(goal => {
            const icons: Record<string, any> = { cooking: ChefHat, app_dev: Code2, photography: Camera, marathon: Trophy };
            const Icon = icons[goal.id] || Utensils;
            const isSelected = selections.mainGoalId === goal.id;
            return (
              <button
                key={goal.id}
                onClick={() => {
                  setSelections({...selections, mainGoalId: goal.id, dietaryType: "", subCategoryId: "", detailId: ""});
                  goNext();
                }}
                className={`flex flex-col gap-4 p-6 text-left rounded-2xl transition-all duration-500 border-2 ${
                  isSelected 
                    ? 'bg-curator-surface_container_high border-curator-primary shadow-2xl scale-[1.02]' 
                    : 'bg-curator-surface_container_low border-transparent hover:bg-curator-surface_container_high'
                }`}
              >
                <div className={`p-4 rounded-xl w-fit ${isSelected ? 'bg-curator-primary text-curator-on_primary' : 'bg-curator-surface_container_highest text-curator-primary'}`}>
                  <Icon className="w-8 h-8" />
                </div>
                <div className="text-xl font-bold font-manrope text-curator-on_surface">{goal.label}</div>
              </button>
            );
          })}
        </div>
      ),
      isValid: () => !!selections.mainGoalId
    },
    {
      id: "diet",
      title: "What type of meal are you planning?",
      show: selections.mainGoalId === 'cooking',
      render: () => (
        <div className="flex flex-col md:flex-row gap-6 w-full">
          {[
            { id: 'vegetarian', label: 'Vegetarian', icon: Leaf, desc: 'Plant-based, lentils, and dairy.' },
            { id: 'non-vegetarian', label: 'Non-Vegetarian', icon: Beef, desc: 'Meat, poultry, and regional seafood.' }
          ].map(opt => {
            const Icon = opt.icon;
            const isSelected = selections.dietaryType === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => {
                  setSelections({...selections, dietaryType: opt.id as any, detailId: ""});
                  goNext();
                }}
                className={`flex-1 flex flex-col gap-4 p-8 text-left rounded-2xl transition-all duration-500 border-2 ${
                  isSelected 
                    ? 'bg-curator-surface_container_high border-curator-primary shadow-2xl scale-[1.02]' 
                    : 'bg-curator-surface_container_low border-transparent hover:bg-curator-surface_container_high'
                }`}
              >
                <div className={`p-4 rounded-xl w-fit ${isSelected ? 'bg-curator-primary text-curator-on_primary' : 'bg-curator-surface_container_highest text-curator-primary'}`}>
                  <Icon className="w-8 h-8" />
                </div>
                <div>
                  <div className="text-2xl font-bold font-manrope text-curator-on_surface">{opt.label}</div>
                  <div className="text-sm text-curator-on_surface_variant mt-2 leading-relaxed">{opt.desc}</div>
                </div>
              </button>
            );
          })}
        </div>
      ),
      isValid: () => !!selections.dietaryType
    },
    {
      id: "sub",
      title: `Which ${mainGoal?.label.toLowerCase()} region?`,
      show: !!mainGoal && mainGoal.subCategories.length > 0,
      render: () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {mainGoal?.subCategories.map(sub => {
            const isSelected = selections.subCategoryId === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => {
                  setSelections({...selections, subCategoryId: sub.id, detailId: ""});
                  goNext();
                }}
                className={`flex items-center gap-4 p-6 text-left rounded-2xl transition-all duration-500 border-2 ${
                  isSelected 
                    ? 'bg-curator-surface_container_high border-curator-primary shadow-xl' 
                    : 'bg-curator-surface_container_low border-transparent hover:bg-curator-surface_container_high'
                }`}
              >
                <div className="p-3 bg-curator-surface_container_highest rounded-lg text-curator-primary">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="text-lg font-bold font-manrope text-curator-on_surface">{sub.label}</div>
              </button>
            );
          })}
        </div>
      ),
      isValid: () => !!selections.subCategoryId
    },
    {
      id: "detail",
      title: `Choose your signature speciality.`,
      show: !!subCategory && subCategory.details.length > 1,
      render: () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {filteredDetails.length > 0 ? filteredDetails.map((detail, idx) => {
            const isSelected = selections.detailId === detail.id;
            return (
              <button
                key={detail.id}
                style={{ animationDelay: `${idx * 150}ms` }}
                onClick={() => {
                  setSelections({...selections, detailId: detail.id});
                  goNext();
                }}
                className={`flex flex-col gap-3 p-6 text-left rounded-2xl transition-all duration-500 border-2 animate-in fade-in slide-in-from-bottom-6 fill-mode-both ${
                  isSelected 
                    ? 'bg-curator-surface_container_high border-curator-primary shadow-xl scale-[1.03]' 
                    : 'bg-curator-surface_container_low border-transparent hover:bg-curator-surface_container_high hover:border-curator-outline_variant/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${isSelected ? 'bg-curator-primary text-curator-on_primary' : 'bg-curator-surface_container_highest text-curator-primary'}`}>
                     <Utensils className="w-4 h-4" />
                  </div>
                  {detail.dietaryType === 'vegetarian' && <Leaf className="w-3.5 h-3.5 text-curator-primary opacity-40" />}
                </div>
                <div>
                  <div className="text-lg font-bold font-manrope text-curator-on_surface leading-tight mb-2">{detail.title}</div>
                  <div className="text-[11px] text-curator-on_surface_variant leading-relaxed line-clamp-3 opacity-80">{detail.goal}</div>
                </div>
              </button>
            );
          }) : (
            <div className="col-span-full p-20 text-center bg-curator-surface_container_low rounded-2xl border-2 border-dashed border-curator-outline_variant/20">
              <p className="text-curator-on_surface_variant font-manrope text-lg italic">No specialties found for this combination.</p>
            </div>
          )}
        </div>
      ),
      isValid: () => !!selections.detailId
    },
    {
      id: "duration",
      title: "Define your execution window.",
      render: () => (
        <div className="w-full">
          <label className="block text-xs font-black uppercase tracking-[0.2em] text-curator-primary mb-6">Duration in Days</label>
          <div className="flex flex-wrap gap-3 mb-8">
            {[3, 7, 14, 30].map(d => (
              <button
                key={d}
                onClick={() => setSelections({...selections, durationDays: d.toString()})}
                className={`px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                  selections.durationDays === d.toString()
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
            value={selections.durationDays}
            onChange={e => setSelections({...selections, durationDays: e.target.value})}
          />
        </div>
      ),
      isValid: () => !!selections.durationDays && parseInt(selections.durationDays) > 0
    }
  ];

  const visibleSteps = steps.filter(s => s.show !== false);
  const currentStep = visibleSteps[step] || visibleSteps[visibleSteps.length - 1];
  const isLast = step === visibleSteps.length - 1;

  if (isGenerating) {
    return <SynthesisLoader onComplete={completeSynthesisAndDivert} />;
  }

  return (
    <main className="min-h-screen bg-transparent relative flex flex-col items-center justify-center py-20 px-6 overflow-hidden font-inter">
      <div className="w-full max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-700 relative z-10 transition-all">
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center gap-2 bg-curator-surface_container_high px-5 py-2.5 rounded-full text-curator-on_surface_variant text-sm font-bold hover:text-curator-on_surface hover:bg-curator-surface_container_highest transition-all shadow-sm">
            <ArrowLeft className="w-4 h-4" /> Change Domain
          </Link>
        </div>

        <div className="mb-10">
          <p className="text-[10px] font-black text-curator-primary uppercase tracking-[0.2em] mb-4">Mastery Sequence: {step + 1} / {visibleSteps.length}</p>
          <div className="w-full h-1 bg-curator-surface_container_highest rounded-full overflow-hidden">
            <div className="h-full bg-curator-primary transition-all duration-700 ease-out shadow-[0_0_15px_rgba(186,197,238,0.3)]" style={{ width: `${((step + 1) / visibleSteps.length) * 100}%` }} />
          </div>
        </div>

        <div className="min-h-[300px] mb-10 flex flex-col justify-center">
          <h2 className="text-4xl md:text-6xl tracking-tighter leading-tight font-bold text-curator-on_surface font-manrope drop-shadow-sm mb-12 animate-in fade-in slide-in-from-left-4 duration-500">{currentStep.title}</h2>
          <div className="text-curator-on_surface font-inter animate-in fade-in zoom-in-95 duration-700 delay-100">
            {currentStep.render()}
          </div>
        </div>

        <div className="flex gap-4">
          {step > 0 && (
            <button 
              onClick={goBack} 
              className="px-10 py-5 bg-curator-surface_container_low border border-curator-outline_variant/10 rounded-full font-bold text-curator-on_surface_variant hover:text-curator-on_surface hover:bg-curator-surface_container_high transition-all uppercase text-[10px] tracking-widest"
            >
              Back
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
