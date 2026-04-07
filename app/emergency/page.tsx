"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Wand2 } from "lucide-react";
import Link from "next/link";
import { generateEmergencyPlan } from "@/lib/planningLogic";
import { usePlans } from "@/hooks/usePlans";
import SynthesisLoader from "@/components/SynthesisLoader";

export default function EmergencyWizard() {
  const router = useRouter();
  const { savePlan } = usePlans();
  const [formData, setFormData] = useState({
    emergencyType: ""
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const triggerSynthesis = () => setIsGenerating(true);

  const completeSynthesisAndDivert = () => {
    const planData = generateEmergencyPlan({
      emergencyType: formData.emergencyType
    });

    savePlan(planData);
    router.push("/plan");
  };

  const options = [
    { id: "road_accident", label: "Road Accident", desc: "Vehicle collision, pedestrian incident" },
    { id: "medical", label: "Medical Emergency", desc: "Heart attack, unconsciousness, severe bleeding" },
    { id: "fire", label: "Fire Hazard", desc: "Building fire, electrical fire" },
    { id: "earthquake", label: "Earthquake / Disaster", desc: "Active shaking or immediate aftermath" }
  ];

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

        <div className="min-h-[250px] mb-10">
          <h2 className="text-4xl md:text-5xl tracking-tighter leading-tight font-bold text-curator-on_surface font-manrope drop-shadow-sm mb-8">What is the exact situation?</h2>
          <div className="grid gap-3">
            {options.map(opt => (
              <button 
                key={opt.id}
                onClick={() => setFormData({...formData, emergencyType: opt.id})}
                className={`p-6 text-left rounded-xl text-lg font-bold transition-all duration-300 ${formData.emergencyType === opt.id ? 'bg-curator-error text-curator-on_error shadow-[0_10px_25px_rgba(238,125,119,0.2)]' : 'bg-curator-surface_container_low text-curator-on_surface hover:bg-curator-surface_container_high'}`}
              >
                <div className="font-manrope">{opt.label}</div>
                <div className={`text-sm font-normal mt-1 ${formData.emergencyType === opt.id ? 'opacity-90' : 'text-curator-on_surface_variant'}`}>{opt.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={triggerSynthesis} 
            disabled={!formData.emergencyType} 
            className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-curator-on_surface text-curator-bg rounded-full font-bold hover:bg-white transition-all disabled:opacity-20 disabled:cursor-not-allowed shadow-xl"
          >
            Generate Protocol <Wand2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </main>
  );
}
