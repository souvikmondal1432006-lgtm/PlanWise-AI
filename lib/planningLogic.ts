export type PlanPhase = "Learning" | "Practice" | "Revision";

export interface Task {
  id: string;
  actionTitle: string;
  reason: string;
  simpleExplanation: string;
  completed: boolean;
  strips: {
    action: string;
    pre: string[];
    eff: string[];
  };
}

export interface DayPlan {
  dayIndex: number;
  date: string;
  phase: string;
  focusSubject: string;
  tasks: Task[];
}

export interface GeneratedPlan {
  id: string;
  createdAt: string;
  title: string;
  domain: string;
  goal: string;
  gap: string;
  type: "daily" | "sequential";
  days: DayPlan[];
}

function genId() {
  return Math.random().toString(36).substring(2, 9);
}

// Helper to get days between dates
function getDaysBetween(start: string, end: string): number {
  const d1 = new Date(start);
  const d2 = new Date(end);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // inclusive of start day
}

// Generate unique tasks based on phase and subject
function generatePhaseTasks(phase: PlanPhase, subject: string, dayInPhase: number, totalDaysInPhase: number): Task[] {
  if (phase === "Learning") {
    const pools = [
      {
        title: `System Mapping: ${subject}`,
        reason: "Establish a high-level mental model before diving into details.",
        desc: "Create a visual map or outline of every major topic and subtopic in this domain."
      },
      {
        title: `First-Principles Deep Dive: ${subject}`,
        reason: "Understand the 'why' behind the facts to ensure long-term retention.",
        desc: "Research the fundamental axioms or origins of the current topic."
      },
      {
        title: `Relationship Synthesis: ${subject}`,
        reason: "Knowledge is more useful when connected to existing mental models.",
        desc: "Write down 3 ways this current subject connects to other subjects you already know."
      },
      {
        title: `Feynman Technique Protocol`,
        reason: "Teaching exposed gaps. If you can't explain it simply, you don't understand it.",
        desc: "Explain the core concept out loud as if to a 10-year old. Note the parts where you struggle."
      },
      {
        title: `Resource Cataloging: ${subject}`,
        reason: "Organization reduces cognitive load during high-intensity learning.",
        desc: "Gather all necessary textbooks, diagrams, and video resources into a single workspace."
      }
    ];
    
    // Pick 2 tasks based on day position
    const idx1 = dayInPhase % pools.length;
    const idx2 = (dayInPhase + 1) % pools.length;
    
    return [
      {
        id: `learn-a-${genId()}`,
        actionTitle: pools[idx1].title,
        reason: pools[idx1].reason,
        simpleExplanation: pools[idx1].desc,
        completed: false,
        strips: { action: `MAP_SYSTEM(${subject})`, pre: ["ignorant"], eff: ["structural_awareness"] }
      },
      {
        id: `learn-b-${genId()}`,
        actionTitle: pools[idx2].title,
        reason: pools[idx2].reason,
        simpleExplanation: pools[idx2].desc,
        completed: false,
        strips: { action: `SYNTHESIZE(${subject})`, pre: ["structural_awareness"], eff: ["model_formed"] }
      }
    ];

  } else if (phase === "Practice") {
    const pools = [
      {
        title: `Progressive Drill: ${subject}`,
        reason: "Build confidence by scaling difficulty in a linear manner.",
        desc: "Solve 5 easy, 3 medium, and 1 extremely difficult problem without assistance."
      },
      {
        title: `Error Audit & Correction`,
        reason: "Reinforcing mistakes is worse than not practicing at all.",
        desc: "Review every mistake made in the previous 2 hours and rewrite the correct solution from scratch."
      },
      {
        title: `Timed Pressure Test: ${subject}`,
        reason: "Knowledge is useless if it cannot be retrieved under time constraints.",
        desc: "Complete a small set of problems with a countdown timer set to 80% of normal time."
      },
      {
        title: `Pattern Recognition Hunt`,
        reason: "Expertise is the ability to see deep structures behind surface details.",
        desc: "Look at 10 different problems and identify the common underlying principle for each."
      }
    ];

    const idx1 = dayInPhase % pools.length;
    const idx2 = (dayInPhase + 1) % pools.length;

    return [
      {
        id: `prac-a-${genId()}`,
        actionTitle: pools[idx1].title,
        reason: pools[idx1].reason,
        simpleExplanation: pools[idx1].desc,
        completed: false,
        strips: { action: `STRENGTHEN_PATHWAY(${subject})`, pre: ["model_formed"], eff: ["procedural_mastery"] }
      },
      {
        id: `prac-b-${genId()}`,
        actionTitle: pools[idx2].title,
        reason: pools[idx2].reason,
        simpleExplanation: pools[idx2].desc,
        completed: false,
        strips: { action: `OPTIMIZE_EXECUTION(${subject})`, pre: ["procedural_mastery"], eff: ["fluid_retrieval"] }
      }
    ];

  } else {
    // Revision
    const pools = [
      {
        title: `Blind Active Recall: ${subject}`,
        reason: "Recognition is not recall. Testing yourself is the most efficient review.",
        desc: "Write down everything you know about this topic on a blank sheet without looking at notes."
      },
      {
        title: `Mock Simulation: Core Scoping`,
        reason: "Mental fatigue is a real constraint during final exams.",
        desc: "Simulate a half-length exam in a silent room. No breaks allowed."
      },
      {
        title: `Leitner System Flashcards`,
        reason: "Focus effort on what you don't know, not what you repeated yesterday.",
        desc: "Sort your topics into 'Weak', 'Medium', and 'Strong' and drill only the Weak ones."
      },
      {
        title: `Pre-Mortem Analysis`,
        reason: "Identifying how you might fail allows you to build preventative strategies.",
        desc: "Imagine you failed the exam tomorrow. Write down the 5 likely reasons why and fix them today."
      }
    ];

    const idx1 = dayInPhase % pools.length;
    const idx2 = (dayInPhase + 1) % pools.length;

    return [
      {
        id: `rev-a-${genId()}`,
        actionTitle: pools[idx1].title,
        reason: pools[idx1].reason,
        simpleExplanation: pools[idx1].desc,
        completed: false,
        strips: { action: `VERIFY_RECALL(${subject})`, pre: ["fluid_retrieval"], eff: ["ready_for_deployment"] }
      },
      {
        id: `rev-b-${genId()}`,
        actionTitle: pools[idx2].title,
        reason: pools[idx2].reason,
        simpleExplanation: pools[idx2].desc,
        completed: false,
        strips: { action: `FINAL_POLISH(${subject})`, pre: ["ready_for_deployment"], eff: ["objective_secured"] }
      }
    ];
  }
}

export function generateStudyPlan(data: { startDate: string; endDate: string; examType: string; subjects: string[]; units?: number }): GeneratedPlan {
  const totalDays = Math.max(1, getDaysBetween(data.startDate, data.endDate));
  
  // Phase logic
  // 0-50% Learning | 50-80% Practice | 80-100% Revision
  const learningCutoff = Math.floor(totalDays * 0.5);
  const practiceCutoff = Math.floor(totalDays * 0.8);

  const days: DayPlan[] = [];
  const subjects = data.subjects.length > 0 ? data.subjects : ["General Studies"];
  
  let currentDate = new Date(data.startDate);

  for (let i = 0; i < totalDays; i++) {
    // Determine Phase
    let phase: PlanPhase = "Learning";
    if (i >= practiceCutoff) phase = "Revision";
    else if (i >= learningCutoff) phase = "Practice";

    // Round-Robin Subject Rotation
    const focusSubject = subjects[i % subjects.length];
    const topicIndex = Math.floor(i / subjects.length) + 1; // "Chapter 1", "Chapter 2", etc.

    const dateString = currentDate.toISOString().split('T')[0];

    // Calculate day index within the current phase
    let dayInPhase = 0;
    let totalInPhase = 0;
    if (phase === "Learning") {
      dayInPhase = i;
      totalInPhase = learningCutoff;
    } else if (phase === "Practice") {
      dayInPhase = i - learningCutoff;
      totalInPhase = practiceCutoff - learningCutoff;
    } else {
      dayInPhase = i - practiceCutoff;
      totalInPhase = totalDays - practiceCutoff;
    }

    days.push({
      dayIndex: i + 1,
      date: dateString,
      phase,
      focusSubject: `${focusSubject} (Pass ${topicIndex})`,
      tasks: generatePhaseTasks(phase, focusSubject, dayInPhase, totalInPhase)
    });

    // Increment date
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return {
    id: `plan_${genId()}`,
    createdAt: new Date().toISOString(),
    domain: 'study',
    title: `${data.examType === 'uni' ? 'University' : 'Competitive'} Exam Strategy`,
    goal: "Complete syllabus mastery and exam condition readiness",
    gap: "Theoretical knowledge gaps & unpracticed constraints",
    type: "daily",
    days
  };
}

// ============================================
// FITNESS PLANNER LOGIC
// ============================================
export function generateFitnessPlan(data: { goal: string; durationWeeks: number; experience: string }): GeneratedPlan {
  const weeks = data.durationWeeks || 4;
  const totalDays = weeks * 7;
  const days: DayPlan[] = [];

  let splitPattern = [];
  if (data.experience === 'beginner') {
    splitPattern = ['Full Body', 'Rest', 'Full Body', 'Rest', 'Full Body', 'Rest', 'Rest'];
  } else {
    splitPattern = ['Push (Chest/Tris/Shoulders)', 'Pull (Back/Bis)', 'Legs', 'Rest', 'Upper Body', 'Lower Body', 'Rest'];
  }

  let currentDate = new Date(); // Start today

  for (let i = 0; i < totalDays; i++) {
    const dayOfWeek = i % 7;
    const focusSubject = splitPattern[dayOfWeek];
    const dateString = currentDate.toISOString().split('T')[0];
    
    let tasks: Task[] = [];
    if (focusSubject === 'Rest') {
      const restPools = [
        { title: "Active Recovery: Mobility Flow", reason: "Static muscles inhibit lymph flow. Movement promotes waste removal.", desc: "Follow a 15-minute full-body stretching or yoga routine." },
        { title: "Zone 1 Cardio Flush", reason: "Light aerobic activity increases blood flow to sore tissues without fatigue.", desc: "Go for a brisk 20-minute walk. Keep your heart rate low." },
        { title: "Myofascial Release", reason: "Knots in the fascia limit range of motion and power output.", desc: "Use a foam roller or lacrosse ball on major muscle groups (Quads, Lats, Calves)." }
      ];
      const rIdx = Math.floor(i / 7) % restPools.length;
      tasks = [
        {
          id: `fit-rest-${genId()}`,
          actionTitle: restPools[rIdx].title,
          reason: restPools[rIdx].reason,
          simpleExplanation: restPools[rIdx].desc,
          completed: false,
          strips: { action: "REST_AND_REPAIR", pre: ["muscle_fatigue"], eff: ["system_recovered"] }
        }
      ];
    } else {
      const isWeekEven = Math.floor(i / 7) % 2 === 0;
      const intensityCue = isWeekEven ? "Volume Bias (8-12 reps)" : "Intensity Bias (5-8 reps)";
      const strategicReason = isWeekEven ? "Focus on metabolic stress and sarcoplasmic hypertrophy." : "Focus on mechanical tension and myofibrillar hypertrophy.";

      tasks = [
        {
          id: `fit-train-a-${genId()}`,
          actionTitle: `${focusSubject}: ${intensityCue}`,
          reason: strategicReason,
          simpleExplanation: `Execute your standard lifts for this group, but prioritize ${isWeekEven ? 'tempo and feel' : 'explosive power and heavy load'}.`,
          completed: false,
          strips: { action: "APPLY_STIMULUS", pre: ["system_recovered", "energy_available"], eff: ["muscle_microtears"] }
        },
        {
          id: `fit-train-b-${genId()}`,
          actionTitle: "Post-Load Nutritional Protocol",
          reason: "The anabolic window represents a state of heightened insulin sensitivity.",
          simpleExplanation: `Consume ${isWeekEven ? 'high carb + moderate protein' : 'moderate carb + high protein'} within 90 minutes of your workout.`,
          completed: false,
          strips: { action: "MACRO_MANAGEMENT", pre: ["muscle_microtears"], eff: ["growth_initiated"] }
        }
      ];
    }

    days.push({
      dayIndex: i + 1,
      date: dateString,
      phase: `Week ${Math.floor(i / 7) + 1}`,
      focusSubject: focusSubject,
      tasks: tasks
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return {
    id: `plan_${genId()}`,
    createdAt: new Date().toISOString(),
    domain: 'fitness',
    title: `${data.experience.charAt(0).toUpperCase() + data.experience.slice(1)} ${data.goal} Program`,
    goal: "Desired physiological adaptation & consistency",
    gap: "Current physical baseline vs Target state",
    type: "daily",
    days
  };
}

// ============================================
// CUSTOM PLANNER LOGIC
// ============================================
// ============================================
// CUSTOM PLANNER LOGIC
// ============================================

export const PREDEFINED_CUSTOM_GOALS = {
  bengali_cooking: {
    title: "Bengali Culinary Masterclass",
    goal: "Master the art of authentic Bengali spice-blending and regional fish preparations.",
    gap: "Spice profiling & temperature control mastery",
    pools: {
      Planning: [
        { title: "Bazaar Expedition: Spice Sourcing", reason: "Authenticity starts with the quality of Panch Phoron and mustard oils.", desc: "Visit a regional market and source whole cumin, fennel, fenugreek, mustard, and nigella seeds." },
        { title: "Utensil Calibration", reason: "Bengali 'Kora' cooking requires specific thermal conductivity.", desc: "Set up your heavy-bottomed iron or aluminum kora and ensure you have high-smoke-point mustard oil." }
      ],
      Execution: [
        { title: "Maacher Jhol Protocol", reason: "The foundation of Bengali cuisine is light, flavorful fish stew.", desc: "Prepare a Rohu or Katla fish stew with potato wedges and a light cumin-coriander base." },
        { title: "Maacher Matha Diye Dal", reason: "Resourceful cooking using fish heads for complex flavoring.", desc: "Slow-cook moong dal with fried fish heads and a hint of ghee-tempered spices." },
        { title: "Kosha Mangso: The Slow Searing", reason: "Intense caramelization of onions creates a deep, dark gravy without burning.", desc: "Execute a 2-hour slow braise of mutton or chicken using the 'Kosha' technique (sautéing till oil separates)." },
        { title: "Mishti Doi & Sandesh Intro", reason: "Fermentation and milk reduction are the two pillars of Bengali desserts.", desc: "Practice reducing full-fat milk for kheer or setting a small batch of sweetened curd." }
      ],
      Review: [
        { title: "The Bitter-to-Sweet Sequence", reason: "A formal Bengali meal follows a strict palate-cleansing order.", desc: "Organize a meal starting with 'Shukto' (bitter) and ending with sweets. Evaluate the balance." }
      ]
    }
  },
  app_dev: {
    title: "Full-Stack Web MVP",
    goal: "Architect and deploy a functional Next.js application with state management.",
    gap: "Static UI vs Functional Dynamic Integration",
    pools: {
      Planning: [
        { title: "Data Architecture Mapping", reason: "A flawed schema leads to complex refactoring later.", desc: "Draw a diagram of your database relations and API endpoint sequences." },
        { title: "Component Atomic Design", reason: "Consistency is easier when components are built from atoms to molecules.", desc: "List all shared UI components (Buttons, Inputs, Modals) before coding." }
      ],
      Execution: [
        { title: "State Management Implementation", reason: "Centralized state prevents prop-drilling and sync issues.", desc: "Set up Context API or Zustand to handle user authentication and global data." },
        { title: "API Route Hardening", reason: "Insecure endpoints are a critical project failure.", desc: "Implement input validation and error handling blocks for all server-side logic." },
        { title: "Responsive Layout Synthesis", reason: "Modern apps must be 'mobile-first' by design.", desc: "Refactor your main dashboard to use fluid grids and breakpoints." }
      ],
      Review: [
        { title: "Lighthouse Performance Audit", reason: "Speed and SEO are the true measures of production readiness.", desc: "Run a full audit and optimize your image sizes and font-loading strategies." }
      ]
    }
  },
  photography: {
    title: "Digital Storytelling & Mastery",
    goal: "Achieve instinctive control over the exposure triangle and composition.",
    gap: "Mechanical operation vs Artistic intent",
    pools: {
      Planning: [
        { title: "Vision Board & Style Study", reason: "To break the rules, you must first understand the masters.", desc: "Analyze 10 photos from National Geographic and identify their lighting sources and focal lengths." }
      ],
      Execution: [
        { title: "Manual Exposure Drill", reason: "Muscle memory is required for fleeting moments.", desc: "Take 50 photos in 'Manual' mode. Adjust shutter speed to freeze and blur motion alternately." },
        { title: "Golden Hour Composition", reason: "Natural light quality dictates the mood of the narrative.", desc: "Shoot 3 landscapes using the 'Rule of Thirds' and 'Leading Lines' during the final hour of sunlight." },
        { title: "Post-Processing Logic", reason: "Editing is the final half of the creative process.", desc: "Import your RAW files and practice color grading to achieve a specific atmospheric mood." }
      ],
      Review: [
        { title: "Portfolio Critique", reason: "Objectivity is the only path to growth.", desc: "Review your top 5 shots and identify one technical flaw in each that you will fix next time." }
      ]
    }
  },
  marathon: {
    title: "Marathon Foundation Prep",
    goal: "Perform base aerobic building and establish injury-prevention protocols.",
    gap: "Low volume capacity vs 26.2 mile demand",
    pools: {
      Planning: [
        { title: "Gear & Terrain Audit", reason: "Incorrect footwear is the #1 cause of pre-race injury.", desc: "Check your shoe mileage and map out 3 safe running routes with varying elevations." }
      ],
      Execution: [
        { title: "Zone 2 Heart Rate Base Run", reason: "Building mitochondrial density requires low-intensity consistency.", desc: "Run for 45 minutes keeping your heart rate below 75% of its maximum." },
        { title: "Strength & Mobility Protocol", reason: "Strength is the armor of the long-distance runner.", desc: "Complete 3 sets of single-leg glute bridges, lunges, and calf raises." },
        { title: "Long Run: Progressive Volume", reason: "Skeletal adaptation takes longer than cardiovascular improvement.", desc: "Extend your weekend run by 10% in duration each week. Focus on steady pacing." }
      ],
      Review: [
        { title: "Recovery & Nutrition Log", reason: "You only improve by what you can recover from.", desc: "Log your sleep and hydration for a week. Identify if caffeine or late meals are affecting rest." }
      ]
    }
  }
};

export type CustomGoalId = keyof typeof PREDEFINED_CUSTOM_GOALS;

export function generateCustomPlan(data: { goalId: string; durationDays: number }): GeneratedPlan {
  const goalId = (data.goalId as CustomGoalId) || 'bengali_cooking';
  const goalData = PREDEFINED_CUSTOM_GOALS[goalId] || PREDEFINED_CUSTOM_GOALS.bengali_cooking;

  const totalDays = Math.max(3, data.durationDays || 7);
  const planPhaseDays = Math.max(1, Math.floor(totalDays * 0.2));
  const reviewPhaseDays = Math.max(1, Math.floor(totalDays * 0.1));
  const execPhaseDays = totalDays - planPhaseDays - reviewPhaseDays;
  
  const days: DayPlan[] = [];
  let currentDate = new Date();

  for (let i = 0; i < totalDays; i++) {
    const dateString = currentDate.toISOString().split('T')[0];
    let phase: string = "Planning";
    let tasks: Task[] = [];

    if (i < planPhaseDays) {
      phase = "Planning";
      const pool = goalData.pools.Planning;
      const tIdx = i % pool.length;
      tasks = [
        {
          id: `cust-plan-${genId()}`,
          actionTitle: pool[tIdx].title,
          reason: pool[tIdx].reason,
          simpleExplanation: pool[tIdx].desc,
          completed: false,
          strips: { action: "SCOPE_PROJECT", pre: ["goal_unstructured"], eff: ["pathway_clear"] }
        }
      ];
    } else if (i < planPhaseDays + execPhaseDays) {
      phase = "Execution";
      const pool = goalData.pools.Execution;
      const dayInExec = i - planPhaseDays;
      const tIdx = dayInExec % pool.length;
      
      // On longer durations, add a secondary task for variety
      const showSecondary = totalDays > 14 && dayInExec % 2 === 0;
      
      tasks = [
        {
          id: `cust-exec-${genId()}`,
          actionTitle: pool[tIdx].title,
          reason: pool[tIdx].reason,
          simpleExplanation: pool[tIdx].desc,
          completed: false,
          strips: { action: "EXECUTE_TASKS", pre: ["pathway_clear"], eff: ["milestones_completed"] }
        }
      ];

      if (showSecondary) {
        const sIdx = (tIdx + 1) % pool.length;
        tasks.push({
          id: `cust-exec-extra-${genId()}`,
          actionTitle: `Refinement: ${pool[sIdx].title}`,
          reason: "Iterative execution leads to higher quality output.",
          simpleExplanation: `Begin a preliminary exploration into ${pool[sIdx].title.toLowerCase()} to build familiarity.`,
          completed: false,
          strips: { action: "ITERATE", pre: ["milestones_notched"], eff: ["advanced_skill_notched"] }
        });
      }
    } else {
      phase = "Review";
      const pool = goalData.pools.Review;
      const rIdx = (i - planPhaseDays - execPhaseDays) % pool.length;
      tasks = [
        {
          id: `cust-rev-${genId()}`,
          actionTitle: pool[rIdx].title,
          reason: pool[rIdx].reason,
          simpleExplanation: pool[rIdx].desc,
          completed: false,
          strips: { action: "QUALITY_ASSURANCE", pre: ["milestones_completed"], eff: ["goal_achieved"] }
        }
      ];
    }

    days.push({
      dayIndex: i + 1,
      date: dateString,
      phase,
      focusSubject: goalData.title,
      tasks
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return {
    id: `plan_${genId()}`,
    createdAt: new Date().toISOString(),
    domain: 'custom',
    title: goalData.title,
    goal: goalData.goal,
    gap: goalData.gap,
    type: "daily",
    days
  };
}

// ============================================
// EMERGENCY PLANNER LOGIC
// ============================================
export function generateEmergencyPlan(data: { emergencyType: string }): GeneratedPlan {
  const type = data.emergencyType;
  let title = "Emergency Protocol";
  let goal = "Stabilize and ensure safety";
  let gap = "Hazard active";
  let tasks: Task[] = [];

  if (type === 'road_accident') {
    title = 'Road Accident Response';
    goal = 'Immediate safety and victim stabilization';
    gap = 'Site hazardous, victims unassessed';
    tasks = [
      {
        id: `em-1-${genId()}`,
        actionTitle: 'Secure the immediate area',
        reason: 'Prevent secondary accidents. Turn on hazard lights, place warning triangles, and stay off the road.',
        simpleExplanation: 'Make sure no other cars hit you. Put your hazard lights on and step away from traffic.',
        completed: false,
        strips: { action: 'SECURE_SCENE', pre: ['site_unsecured'], eff: ['site_secured', 'safe_to_approach'] }
      },
      {
        id: `em-2-${genId()}`,
        actionTitle: 'Check for responsiveness',
        reason: 'Determine severity. Speak loudly and tap their shoulder gently. Do NOT move them unless there is immediate fire.',
        simpleExplanation: 'Ask if they are okay loudly. Do not drag or move their body if they are hurt.',
        completed: false,
        strips: { action: 'ASSESS_VICTIM', pre: ['site_secured'], eff: ['condition_known'] }
      },
      {
        id: `em-3-${genId()}`,
        actionTitle: 'Call emergency services',
        reason: 'Report location, number of victims, and condition immediately so professionals can be routed.',
        simpleExplanation: 'Call 911 immediately and tell them exactly where you are.',
        completed: false,
        strips: { action: 'DISPATCH_HELP', pre: ['condition_known'], eff: ['help_arriving'] }
      }
    ];
  } else if (type === 'medical') {
    title = 'Medical Emergency';
    goal = 'Stabilize patient until paramedics arrive';
    gap = 'Patient in distress, vitals unknown';
    tasks = [
        {
          id: `med-1-${genId()}`,
          actionTitle: 'Assess environment & vitals',
          reason: 'Ensure area is safe for you. Check patient for breathing and pulse. Look, listen, and feel.',
          simpleExplanation: 'Make sure you are safe first. Check if the person is breathing.',
          completed: false,
          strips: { action: 'EVALUATE_VITALS', pre: ['distress_identified'], eff: ['vitals_known'] }
        },
        {
          id: `med-2-${genId()}`,
          actionTitle: 'Administer necessary first aid',
          reason: 'If not breathing, begin CPR. If bleeding heavily, apply direct extreme pressure with a clean cloth.',
          simpleExplanation: 'Start CPR if they are not breathing. Press hard on any bleeding.',
          completed: false,
          strips: { action: 'SUPPORT_LIFE', pre: ['vitals_known'], eff: ['condition_stabilized'] }
        }
    ];
  } else if (type === 'fire') {
    title = 'Fire Hazard';
    goal = 'Evacuate safely and alert authorities';
    gap = 'Life danger, fire spreading';
    tasks = [
        {
            id: `fire-1-${genId()}`,
            actionTitle: 'Trigger Alarm & Evacuate',
            reason: 'Do not collect belongings. Use stairs, never elevators. Stay low to avoid smoke inhalation.',
            simpleExplanation: 'Pull the fire alarm and leave immediately. Crawl if there is smoke.',
            completed: false,
            strips: { action: 'EVACUATE_BUILDING', pre: ['fire_detected'], eff: ['personnel_safe'] }
        },
        {
            id: `fire-2-${genId()}`,
            actionTitle: 'Seal fire area',
            reason: 'Close doors behind you as you leave to starve the fire of oxygen and slow its spread.',
            simpleExplanation: 'Shut doors behind you on your way out.',
            completed: false,
            strips: { action: 'CONTAIN_FIRE', pre: ['personnel_safe'], eff: ['spread_slowed'] }
        }
    ];
  } else {
    // earthquake
    title = 'Earthquake Response';
    goal = 'Protect from falling debris';
    gap = 'Environment shaking, debris hazard';
    tasks = [
        {
            id: `eq-1-${genId()}`,
            actionTitle: 'Drop, Cover, and Hold On',
            reason: 'Get under a sturdy table. Protect your neck and head. Do NOT try to run outside during shaking.',
            simpleExplanation: 'Get under a desk and hold on to its legs. Cover your head.',
            completed: false,
            strips: { action: 'SEEK_SHELTER', pre: ['shaking_active'], eff: ['protected_from_debris'] }
        },
        {
            id: `eq-2-${genId()}`,
            actionTitle: 'Assess Utilities Post-Shaking',
            reason: 'Once shaking stops, check for smell of gas. If detected, leave immediately without switching electrical items.',
            simpleExplanation: 'If you smell gas after it stops, leave the building immediately.',
            completed: false,
            strips: { action: 'CHECK_HAZARDS', pre: ['shaking_stopped', 'protected_from_debris'], eff: ['hazards_cleared'] }
        }
    ];
  }

  // Map into a single "Day 1" entity to fit UI uniformly
  const days: DayPlan[] = [
    {
      dayIndex: 1,
      date: new Date().toISOString().split('T')[0],
      phase: "Immediate Action",
      focusSubject: "Crisis Execution",
      tasks: tasks
    }
  ];

  return {
    id: `plan_${genId()}`,
    createdAt: new Date().toISOString(),
    domain: 'emergency',
    title,
    goal,
    gap,
    type: "sequential",
    days
  };
}
