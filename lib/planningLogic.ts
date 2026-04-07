export type PlanPhase = "Learning" | "Practice" | "Revision";

export interface Task {
  id: string;
  actionTitle: string;
  reason: string;
  simpleExplanation: string;
  completed: boolean;
  subgoal?: "preparation" | "cooking" | "finishing";
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
        title: `Make an Outline: ${subject}`,
        reason: "It's easier to learn when you know the big picture first.",
        desc: "Write down a simple list or draw a map of the main topics you need to learn."
      },
      {
        title: `Find the Basics: ${subject}`,
        reason: "Understanding the basics makes the hard stuff easier to get.",
        desc: "Look up what this topic is really about and why it matters."
      },
      {
        title: `Connect the Dots: ${subject}`,
        reason: "Connecting new things to what you already know helps you remember.",
        desc: "Write down 3 things this topic reminds you of from other subjects."
      },
      {
        title: `Teach a Friend (or a Pet!)`,
        reason: "If you can explain it simply, it means you really understand it.",
        desc: "Try explaining the topic out loud using simple words."
      },
      {
        title: `Gather Your Stuff: ${subject}`,
        reason: "Having everything ready saves time and keeps you focused.",
        desc: "Get all your books, notes, and videos together in one place before you start."
      },
      {
        title: `Watch a Quick Video: ${subject}`,
        reason: "Sometimes seeing it explained visually makes it click faster.",
        desc: "Find a 5-10 minute video explaining the core concept."
      },
      {
        title: `Write a Summary: ${subject}`,
        reason: "Summarizing forces you to decide what is truly important.",
        desc: "Write a 3-sentence summary of the chapter or topic."
      },
      {
        title: `Draw a Picture: ${subject}`,
        reason: "Using visuals helps lock the information into your brain.",
        desc: "Draw a diagram or doodle that explains how this topic works."
      }
    ];
    
    // Pick 2 random unique tasks
    const shuffled = [...pools].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 2);
    
    return [
      {
        id: `learn-a-${genId()}`,
        actionTitle: selected[0].title,
        reason: selected[0].reason,
        simpleExplanation: selected[0].desc,
        completed: false,
        strips: { action: `MAP_SYSTEM(${subject})`, pre: ["ignorant"], eff: ["structural_awareness"] }
      },
      {
        id: `learn-b-${genId()}`,
        actionTitle: selected[1].title,
        reason: selected[1].reason,
        simpleExplanation: selected[1].desc,
        completed: false,
        strips: { action: `SYNTHESIZE(${subject})`, pre: ["structural_awareness"], eff: ["model_formed"] }
      }
    ];

  } else if (phase === "Practice") {
    const pools = [
      {
        title: `Step-by-Step Practice: ${subject}`,
        reason: "Starting easy builds up your confidence for harder questions.",
        desc: "Solve 5 easy, 3 medium, and 1 hard problem by yourself."
      },
      {
        title: `Learn from Mistakes`,
        reason: "Fixing your mistakes teaches you more than getting it right the first time.",
        desc: "Look at the questions you got wrong and try doing them again from scratch."
      },
      {
        title: `Beat the Clock: ${subject}`,
        reason: "Practicing with a timer helps you stay calm during the real exam.",
        desc: "Try solving a few problems with a timer set a bit faster than usual."
      },
      {
        title: `Find the Pattern`,
        reason: "Spotting patterns makes it easier to crack tough questions.",
        desc: "Look at 10 different problems and see if you can find the trick that connects them."
      },
      {
        title: `Do the Hardest First: ${subject}`,
        reason: "Tackling the hardest problem when your brain is fresh builds mental stamina.",
        desc: "Pick the absolute hardest question you can find and spend 20 minutes trying to solve it."
      },
      {
        title: `Explain the Solution`,
        reason: "Writing out the steps proves you aren't just guessing.",
        desc: "Write down the step-by-step solution to a problem as if you were writing a textbook."
      },
      {
        title: `Switch It Up: ${subject}`,
        reason: "Mixing different types of problems prepares you for the randomness of a real test.",
        desc: "Do 5 questions from completely different chapters back-to-back."
      }
    ];

    const shuffled = [...pools].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 2);

    return [
      {
        id: `prac-a-${genId()}`,
        actionTitle: selected[0].title,
        reason: selected[0].reason,
        simpleExplanation: selected[0].desc,
        completed: false,
        strips: { action: `STRENGTHEN_PATHWAY(${subject})`, pre: ["model_formed"], eff: ["procedural_mastery"] }
      },
      {
        id: `prac-b-${genId()}`,
        actionTitle: selected[1].title,
        reason: selected[1].reason,
        simpleExplanation: selected[1].desc,
        completed: false,
        strips: { action: `OPTIMIZE_EXECUTION(${subject})`, pre: ["procedural_mastery"], eff: ["fluid_retrieval"] }
      }
    ];

  } else {
    // Revision
    const pools = [
      {
        title: `Brain Dump: ${subject}`,
        reason: "Testing yourself is the best way to see what you actually remember.",
        desc: "Take a blank paper and write down everything you remember about this topic."
      },
      {
        title: `Practice Exam`,
        reason: "Practicing the real thing gets you ready for test day.",
        desc: "Take a mini-test in a quiet room without looking at your notes."
      },
      {
        title: `Focus on the Hard Stuff`,
        reason: "It's better to spend time on what you don't know yet.",
        desc: "Sort your topics into 'Easy', 'Medium', and 'Hard', and study the 'Hard' ones today."
      },
      {
        title: `What Could Go Wrong?`,
        reason: "Knowing where you might mess up helps you avoid it early.",
        desc: "Think about the reasons you might miss points on this exam and try to fix them."
      },
      {
        title: `Review Old Mistakes: ${subject}`,
        reason: "Reminding yourself of past errors ensures you don't make them again.",
        desc: "Read through your past quizzes or practice tests and look at what you got wrong."
      },
      {
        title: `Flashcard Quick Run`,
        reason: "Fast repetition helps seal facts into your long-term memory.",
        desc: "Spend 10 minutes rapidly going through your flashcards or key terms."
      },
      {
        title: `Elevator Pitch: ${subject}`,
        reason: "Condensing information is the ultimate test of understanding.",
        desc: "Try to explain the entire subject in exactly 60 seconds."
      }
    ];

    const shuffled = [...pools].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 2);

    return [
      {
        id: `rev-a-${genId()}`,
        actionTitle: selected[0].title,
        reason: selected[0].reason,
        simpleExplanation: selected[0].desc,
        completed: false,
        strips: { action: `VERIFY_RECALL(${subject})`, pre: ["fluid_retrieval"], eff: ["ready_for_deployment"] }
      },
      {
        id: `rev-b-${genId()}`,
        actionTitle: selected[1].title,
        reason: selected[1].reason,
        simpleExplanation: selected[1].desc,
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

import { PREDEFINED_HIERARCHY, GoalDetail } from './predefinedGoals';

export function generateCustomPlan(data: { detailId: string; durationDays: number }): GeneratedPlan {
  // Find the detail in the hierarchy
  let selectedDetail: GoalDetail | null = null;
  
  for (const group of PREDEFINED_HIERARCHY) {
    for (const sub of group.subCategories) {
      const match = sub.details.find(d => d.id === data.detailId);
      if (match) {
        selectedDetail = match;
        break;
      }
    }
    if (selectedDetail) break;
  }

  // Fallback to top-level if not found (safety)
  const goalData = selectedDetail || PREDEFINED_HIERARCHY[0].subCategories[0].details[0];

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
          subgoal: pool[tIdx].subgoal,
          strips: pool[tIdx].strips
        }
      ];
    } else if (i < planPhaseDays + execPhaseDays) {
      phase = "Execution";
      const pool = goalData.pools.Execution;
      const dayInExec = i - planPhaseDays;
      const tIdx = dayInExec % pool.length;
      
      // Density Scaling: Add a secondary task for durations > 14 days
      const showSecondary = totalDays > 14 && dayInExec % 2 === 0;
      
      tasks = [
        {
          id: `cust-exec-${genId()}`,
          actionTitle: pool[tIdx].title,
          reason: pool[tIdx].reason,
          simpleExplanation: pool[tIdx].desc,
          completed: false,
          subgoal: pool[tIdx].subgoal,
          strips: pool[tIdx].strips
        }
      ];

      if (showSecondary) {
        const sIdx = (tIdx + 1) % pool.length;
        tasks.push({
          id: `cust-exec-extra-${genId()}`,
          actionTitle: `Technique Refinement: ${pool[sIdx].title}`,
          reason: "Mastery requires repeated exposure to the core difficulty of the task.",
          simpleExplanation: `Spend extra time perfecting the ${pool[sIdx].title.toLowerCase()} step today.`,
          completed: false,
          subgoal: pool[sIdx].subgoal,
          strips: pool[sIdx].strips
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
          subgoal: pool[rIdx].subgoal,
          strips: pool[rIdx].strips
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
