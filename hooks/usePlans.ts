"use client";

import { useEffect, useState } from "react";
import { GeneratedPlan } from "@/lib/planningLogic";

export function usePlans() {
  const [plans, setPlans] = useState<GeneratedPlan[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("planwise_active_plans");
    if (raw) {
      try {
        setPlans(JSON.parse(raw));
      } catch (e) {
        console.error("Failed to parse plans");
      }
    }
    setIsLoaded(true);
  }, []);

  const savePlan = (newPlan: GeneratedPlan) => {
    setPlans(prev => {
      const updated = [newPlan, ...prev];
      localStorage.setItem("planwise_active_plans", JSON.stringify(updated));
      return updated;
    });
    // Set this specific plan as the active one for viewing
    sessionStorage.setItem("current_plan_id", newPlan.id);
  };

  const updatePlan = (updatedPlan: GeneratedPlan) => {
    setPlans(prev => {
      const idx = prev.findIndex(p => p.id === updatedPlan.id);
      if (idx === -1) return prev;
      const copy = [...prev];
      copy[idx] = updatedPlan;
      localStorage.setItem("planwise_active_plans", JSON.stringify(copy));
      return copy;
    });
  };

  const deletePlan = (id: string) => {
    setPlans(prev => {
      const updated = prev.filter(p => p.id !== id);
      localStorage.setItem("planwise_active_plans", JSON.stringify(updated));
      return updated;
    });
  };

  const getPlanById = (id: string) => {
    return plans.find(p => p.id === id);
  };

  return { plans, savePlan, updatePlan, deletePlan, getPlanById, isLoaded };
}
