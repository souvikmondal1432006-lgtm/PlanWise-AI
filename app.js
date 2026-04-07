// PlanWise AI - Multi-Domain Intelligent Planner

/* =========================================================================
   1. DOMAIN & WIZARD CONFIGURATION
   ========================================================================= */
const DOMAINS = [
    {
        id: 'emergency',
        title: 'Emergency Response',
        icon: 'ph-warning',
        desc: 'Immediate, sequential execution plans for critical situations.',
        wizard: [
            {
                id: 'emergency_type',
                question: 'What is the exact situation?',
                type: 'select',
                options: [
                    { label: 'Road Accident', value: 'road_accident' },
                    { label: 'Medical Emergency', value: 'medical' },
                    { label: 'Fire Hazard', value: 'fire' },
                    { label: 'Earthquake / Disaster', value: 'earthquake' }
                ]
            }
        ]
    },
    {
        id: 'study',
        title: 'Study Planner',
        icon: 'ph-books',
        desc: 'Intelligent daily scheduling, concept division, and revision cycles.',
        wizard: [
            {
                id: 'exam_type',
                question: 'What type of exam are you preparing for?',
                type: 'select',
                options: [
                    { label: 'University / School Exam', value: 'uni' },
                    { label: 'External / Competitive Exam', value: 'external' }
                ]
            },
            {
                id: 'duration_days',
                question: 'How many days left until the exam?',
                type: 'number',
                placeholder: 'e.g. 14'
            },
            {
                id: 'subject_count',
                question: 'How many subjects or core units do you need to cover?',
                type: 'number',
                placeholder: 'e.g. 4'
            }
        ]
    },
    {
        id: 'fitness',
        title: 'Fitness Planner',
        icon: 'ph-barbell',
        desc: 'Structured workout splits and actionable daily physical goals.',
        wizard: [
            {
                id: 'fitness_goal',
                question: 'What is your primary physical goal?',
                type: 'select',
                options: [
                    { label: 'Muscle Building & Hypertrophy', value: 'bodybuilding' },
                    { label: 'Fat Loss & Lean Definition', value: 'lean' },
                    { label: 'General Health & Endurance', value: 'general' }
                ]
            },
            {
                id: 'duration_weeks',
                question: 'How many weeks do you want this plan to run?',
                type: 'number',
                placeholder: 'e.g. 4'
            },
            {
                id: 'experience',
                question: 'What is your current fitness experience level?',
                type: 'select',
                options: [
                    { label: 'Beginner (0-1 years)', value: 'beginner' },
                    { label: 'Intermediate/Advanced (1+ years)', value: 'advanced' }
                ]
            }
        ]
    },
    {
        id: 'custom',
        title: 'Custom Goal',
        icon: 'ph-target',
        desc: 'Achieve any personal milestone with structured chronological phases.',
        wizard: [
            {
                id: 'goal_desc',
                question: 'Describe your goal in one clear sentence.',
                type: 'text',
                placeholder: 'e.g. Build a personal portfolio website'
            },
            {
                id: 'duration_days',
                question: 'How many days do you have to achieve this?',
                type: 'number',
                placeholder: 'e.g. 7'
            }
        ]
    }
];

/* =========================================================================
   2. GENERATORS (Heuristic Rule-Based Engines)
   ========================================================================= */

function generateEmergencyPlan(answers) {
    const type = answers.emergency_type;
    const plans = {
        road_accident: {
            title: 'Road Accident Response',
            goal: 'Immediate safety and victim stabilization',
            gap: 'Site hazardous, victims unassessed',
            type: 'sequential',
            steps: [
                {
                    actionTitle: 'Secure the immediate area',
                    reason: 'Prevent secondary accidents. Turn on hazard lights, place warning triangles, and stay off the road.',
                    strips: { action: 'SECURE_SCENE', pre: ['site_unsecured'], eff: ['site_secured', 'safe_to_approach'] }
                },
                {
                    actionTitle: 'Check for responsiveness',
                    reason: 'Determine severity. Speak loudly and tap their shoulder gently. Do NOT move them unless there is fire.',
                    strips: { action: 'ASSESS_VICTIM', pre: ['site_secured'], eff: ['condition_known'] }
                },
                {
                    actionTitle: 'Call emergency services',
                    reason: 'Report location, number of victims, and condition. Use the quick-action button below.',
                    strips: { action: 'DISPATCH_HELP', pre: ['condition_known'], eff: ['help_arriving'] }
                }
            ]
        },
        medical: {
            title: 'Medical Emergency',
            goal: 'Stabilize patient until paramedics arrive',
            gap: 'Patient in distress, vitals unknown',
            type: 'sequential',
            steps: [
                {
                    actionTitle: 'Assess environment & vitals',
                    reason: 'Ensure area is safe. Check patient for breathing and pulse. Look, listen, and feel.',
                    strips: { action: 'EVALUATE_VITALS', pre: ['distress_identified'], eff: ['vitals_known'] }
                },
                {
                    actionTitle: 'Administer necessary first aid',
                    reason: 'If not breathing, begin CPR. If bleeding, apply direct pressure with a clean cloth.',
                    strips: { action: 'SUPPORT_LIFE', pre: ['vitals_known'], eff: ['condition_stabilized'] }
                }
            ]
        },
        fire: {
             title: 'Fire Hazard',
             goal: 'Evacuate safely and alert authorities',
             gap: 'Life danger, fire spreading',
             type: 'sequential',
             steps: [
                 {
                     actionTitle: 'Trigger Alarm & Evacuate',
                     reason: 'Do not collect belongings. Use stairs, never elevators. Stay low to avoid smoke inhalation.',
                     strips: { action: 'EVACUATE_BUILDING', pre: ['fire_detected'], eff: ['personnel_safe'] }
                 },
                 {
                     actionTitle: 'Seal fire area',
                     reason: 'Close doors behind you as you leave to starve the fire of oxygen and slow its spread.',
                     strips: { action: 'CONTAIN_FIRE', pre: ['personnel_safe'], eff: ['spread_slowed'] }
                 }
             ]
        },
        earthquake: {
            title: 'Earthquake Response',
            goal: 'Protect from falling debris',
            gap: 'Environment shaking, debris hazard',
            type: 'sequential',
            steps: [
                {
                    actionTitle: 'Drop, Cover, and Hold On',
                    reason: 'Get under a sturdy table. Protect your neck and head. Do NOT try to run outside during shaking.',
                    strips: { action: 'SEEK_SHELTER', pre: ['shaking_active'], eff: ['protected_from_debris'] }
                },
                {
                    actionTitle: 'Assess Utilities',
                    reason: 'Once shaking stops, check for smell of gas. If detected, leave immediately without switching electrical items.',
                    strips: { action: 'CHECK_HAZARDS', pre: ['shaking_stopped', 'protected_from_debris'], eff: ['hazards_cleared'] }
                }
            ]
        }
    };
    return plans[type];
}

function generateStudyPlan(answers) {
    const days = parseInt(answers.duration_days) || 7;
    const subjects = parseInt(answers.subject_count) || 1;
    const examType = answers.exam_type;

    const timeline = [];
    
    // Heuristic math: 
    // Last 20% of days is Revision. Remaining 80% is divided into Learn/Practice loops.
    const revisionDays = Math.max(1, Math.floor(days * 0.2));
    const learningDays = days - revisionDays;
    
    // Distribute subjects over learning days
    const daysPerSubject = Math.max(1, Math.floor(learningDays / subjects));

    for (let i = 1; i <= days; i++) {
        let title = `Day ${i}`;
        let steps = [];

        if (i <= learningDays) {
            // Find which subject we are on
            let currentSubIndex = Math.floor((i - 1) / daysPerSubject) + 1;
            if (currentSubIndex > subjects) currentSubIndex = subjects;

            // Generate Study Actions
            steps.push({
                actionTitle: `Concept Deep-Dive: Subject Group ${currentSubIndex}`,
                reason: 'Focus purely on understanding core mechanisms and theory without worrying about speed. Utilize the Feynman technique.',
                strips: { action: `LEARN_THEORY(Sub_${currentSubIndex})`, pre: ['knowledge_gap'], eff: ['theory_understood'] }
            });

            if (examType === 'external') {
                steps.push({
                    actionTitle: 'Solve Advanced Problem Sets',
                    reason: 'External exams require pattern recognition. Apply theory to high-difficulty scenario questions immediately.',
                    strips: { action: `PATTERN_PRACTICE(Sub_${currentSubIndex})`, pre: ['theory_understood'], eff: ['application_mastered'] }
                });
            } else {
                steps.push({
                    actionTitle: 'Summarize & Create Flashcards',
                    reason: 'University exams rely heavily on recall. Construct concise notes from the theory learned today.',
                    strips: { action: `BUILD_MNEMONICS(Sub_${currentSubIndex})`, pre: ['theory_understood'], eff: ['retention_boosted'] }
                });
            }
        } 
        else {
            // Final Revision phase
            steps.push({
                actionTitle: 'Full Mock Assessment',
                reason: 'Simulate exam conditions. No notes, strict time limit. This exposes remaining weak points.',
                strips: { action: 'SIMULATE_EXAM', pre: ['all_subjects_covered'], eff: ['weaknesses_identified', 'time_management_practiced'] }
            });
            steps.push({
                actionTitle: 'Targeted Patching',
                reason: 'Review only the exact questions missed in the mock exam. Do not reread material you already know.',
                strips: { action: 'REVISE_WEAKNESSES', pre: ['weaknesses_identified'], eff: ['exam_readiness'] }
            });
        }

        timeline.push({ title, steps });
    }

    return {
        title: examType === 'external' ? 'Competitive Exam Strategy' : 'University Finals Strategy',
        goal: 'Complete syllabus coverage & high exam readiness',
        gap: 'Syllabus unpracticed, retention weak',
        type: 'daily',
        timeline: timeline
    };
}

function generateFitnessPlan(answers) {
    const weeks = parseInt(answers.duration_weeks) || 4;
    const goal = answers.fitness_goal;
    const exp = answers.experience;

    const timeline = [];
    const daysInWeek = 7;
    const totalDays = weeks * daysInWeek;

    let splitPattern = [];
    if (exp === 'beginner') {
        splitPattern = ['Full Body', 'Rest', 'Full Body', 'Rest', 'Full Body', 'Rest', 'Rest'];
    } else {
        splitPattern = ['Push (Chest/Tris)', 'Pull (Back/Bis)', 'Legs', 'Rest', 'Upper Body', 'Lower Body', 'Rest'];
    }

    for (let i = 1; i <= totalDays; i++) {
        let dayOfWeek = (i - 1) % 7;
        let dayFocus = splitPattern[dayOfWeek];
        let steps = [];

        if (dayFocus === 'Rest') {
            steps.push({
                actionTitle: 'Active Recovery',
                reason: 'Muscle tissue is repaired while resting. Hydrate, perform light stretching or walking to maintain blood flow.',
                strips: { action: 'REST_AND_REPAIR', pre: ['muscle_fatigue'], eff: ['system_recovered'] }
            });
        } else {
            steps.push({
                actionTitle: `Execute Workout: ${dayFocus}`,
                reason: goal === 'bodybuilding' ? 'Focus on progressive overload. 3-4 sets of 8-12 reps near failure.' :
                        goal === 'lean' ? 'Maintain high intensity. Keep rest periods short (60s) to elevate heart rate.' :
                        'Focus on perfect form and consistent exertion without pushing to failure.',
                strips: { action: 'APPLY_STIMULUS', pre: ['system_recovered', 'energy_available'], eff: ['muscle_microtears', 'metabolic_adaptation'] }
            });

            steps.push({
                actionTitle: 'Nutritional Protocol',
                reason: goal === 'bodybuilding' ? 'Consume caloric surplus (+300) with 1.8g protein per kg of bodyweight.' :
                        goal === 'lean' ? 'Maintain caloric deficit (-500) while keeping protein high to preserve muscle.' :
                        'Consume balanced macros at maintenance calories emphasizing whole foods.',
                strips: { action: 'MACRO_MANAGEMENT', pre: ['muscle_microtears'], eff: ['growth_initiated', 'goal_aligned'] }
            });
        }

        timeline.push({ title: `Day ${i} - Week ${Math.ceil(i/7)}`, steps });
    }

    return {
        title: `${exp.charAt(0).toUpperCase() + exp.slice(1)} ${goal} Program`,
        goal: 'Desired physiological adaptation',
        gap: 'Untrained state vs Target state',
        type: 'daily',
        timeline: timeline
    };
}

function generateCustomPlan(answers) {
    const desc = answers.goal_desc || 'Achieve goal';
    const days = parseInt(answers.duration_days) || 3;
    const timeline = [];

    const planPhase = Math.max(1, Math.floor(days * 0.2));
    const execPhase = days - planPhase - 1;

    for (let i = 1; i <= days; i++) {
        let steps = [];
        if (i <= planPhase) {
            steps.push({
                actionTitle: 'Phase 1: Research & Structuring',
                reason: 'Before execution, map dependencies, gather tools, and break the macro goal into distinct micro-tasks.',
                strips: { action: 'SCOPE_PROJECT', pre: ['goal_unstructured'], eff: ['pathway_clear', 'resources_gathered'] }
            });
        } else if (i <= planPhase + execPhase) {
            steps.push({
                actionTitle: 'Phase 2: Deep Execution',
                reason: 'Focus entirely on producing output. Ignore perfectionism; generate raw volume towards the defined milestone.',
                strips: { action: 'EXECUTE_TASKS', pre: ['pathway_clear'], eff: ['milestones_completed'] }
            });
        } else {
            steps.push({
                actionTitle: 'Phase 3: Polish & Review',
                reason: 'Audit the execution against the original goal description. Fix bugs, refine quality, and finalize.',
                strips: { action: 'QUALITY_ASSURANCE', pre: ['milestones_completed'], eff: ['goal_achieved'] }
            });
        }
        timeline.push({ title: `Day ${i}`, steps });
    }

    return {
        title: `Project: ${desc}`,
        goal: 'Project successfully completed',
        gap: 'Idea phase vs Completed Reality',
        type: 'daily',
        timeline: timeline
    };
}

/* =========================================================================
   3. APP STATE & RENDERING ENGINE
   ========================================================================= */

let state = {
    view: 'landing',
    activeDomain: null,
    wizardAnswers: {},
    wizardStepIndex: 0,
    generatedPlan: null,
    currentPlanNodeIndex: 0 // Used for both active Day (daily) or active Step (sequential)
};

const appContainer = document.getElementById('app');
const tplLanding = document.getElementById('view-landing');
const tplDomains = document.getElementById('view-domains');
const tplWizard = document.getElementById('view-wizard');
const tplPlan = document.getElementById('view-plan');

function init() {
    renderView('landing');
}

function renderView(viewName) {
    state.view = viewName;
    appContainer.innerHTML = ''; 

    if (viewName === 'landing') {
        const node = tplLanding.content.cloneNode(true);
        appContainer.appendChild(node);
        document.getElementById('start-btn').addEventListener('click', () => renderView('domains'));
    } 
    else if (viewName === 'domains') {
        const node = tplDomains.content.cloneNode(true);
        appContainer.appendChild(node);
        
        const grid = document.getElementById('domain-grid');
        DOMAINS.forEach(domain => {
            const card = document.createElement('div');
            card.className = 'domain-card';
            card.innerHTML = `
                <i class="ph-bold ${domain.icon} domain-icon"></i>
                <div class="domain-title">${domain.title}</div>
                <div class="domain-desc">${domain.desc}</div>
            `;
            card.addEventListener('click', () => {
                state.activeDomain = domain;
                state.wizardAnswers = {};
                state.wizardStepIndex = 0;
                renderView('wizard');
            });
            grid.appendChild(card);
        });
    }
    else if (viewName === 'wizard') {
        const node = tplWizard.content.cloneNode(true);
        appContainer.appendChild(node);
        
        document.getElementById('wizard-btn-back').addEventListener('click', () => renderView('domains'));
        document.getElementById('wizard-next-btn').addEventListener('click', handleWizardNext);
        document.getElementById('wizard-generate-btn').addEventListener('click', handlePlanGeneration);
        
        renderWizardStep();
    }
    else if (viewName === 'plan') {
        const node = tplPlan.content.cloneNode(true);
        appContainer.appendChild(node);
        
        document.getElementById('btn-back-home').addEventListener('click', () => renderView('landing'));
        document.getElementById('next-sequence-btn').addEventListener('click', handleNextSequenceStep);
        
        setupPlanView();
    }
}

/* =========================================================================
   4. WIZARD LOGIC
   ========================================================================= */

function renderWizardStep() {
    const domain = state.activeDomain;
    const config = domain.wizard[state.wizardStepIndex];
    const totalSteps = domain.wizard.length;

    document.getElementById('wizard-step-label').textContent = `Step ${state.wizardStepIndex + 1} of ${totalSteps}`;
    
    setTimeout(() => {
        document.getElementById('wizard-progress-fill').style.width = `${((state.wizardStepIndex + 1) / totalSteps) * 100}%`;
    }, 50);

    const questionBox = document.getElementById('wizard-question-box');
    questionBox.innerHTML = `
        <h2 class="wizard-question-title">${config.question}</h2>
        <div class="wizard-input-group" id="input-container"></div>
    `;

    const inputContainer = document.getElementById('input-container');
    const nextBtn = document.getElementById('wizard-next-btn');
    const genBtn = document.getElementById('wizard-generate-btn');

    // Assume invalid until input
    nextBtn.disabled = true;
    genBtn.disabled = true;

    if (config.type === 'select') {
        const grid = document.createElement('div');
        grid.className = 'wizard-select-grid';
        config.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'wizard-option';
            btn.textContent = opt.label;
            
            // preselect if exists
            if(state.wizardAnswers[config.id] === opt.value) {
                btn.classList.add('selected');
                nextBtn.disabled = false;
                genBtn.disabled = false;
            }

            btn.addEventListener('click', () => {
                Array.from(grid.children).forEach(c => c.classList.remove('selected'));
                btn.classList.add('selected');
                state.wizardAnswers[config.id] = opt.value;
                nextBtn.disabled = false;
                genBtn.disabled = false;
            });
            grid.appendChild(btn);
        });
        inputContainer.appendChild(grid);
    } 
    else {
        const input = document.createElement('input');
        input.type = config.type;
        input.className = 'wizard-input';
        input.placeholder = config.placeholder || '';
        if(state.wizardAnswers[config.id]) {
            input.value = state.wizardAnswers[config.id];
            nextBtn.disabled = false;
            genBtn.disabled = false;
        }

        input.addEventListener('input', (e) => {
            state.wizardAnswers[config.id] = e.target.value;
            if(e.target.value.trim() !== '') {
                nextBtn.disabled = false;
                genBtn.disabled = false;
            } else {
                nextBtn.disabled = true;
                genBtn.disabled = true;
            }
        });
        inputContainer.appendChild(input);
        
        // Auto focus text/number inputs
        setTimeout(()=> input.focus(), 100);
    }

    if (state.wizardStepIndex === totalSteps - 1) {
        nextBtn.classList.add('hidden');
        genBtn.classList.remove('hidden');
    } else {
        nextBtn.classList.remove('hidden');
        genBtn.classList.add('hidden');
    }
}

function handleWizardNext() {
    state.wizardStepIndex++;
    renderWizardStep();
}

function handlePlanGeneration() {
    const domainId = state.activeDomain.id;
    if (domainId === 'emergency') state.generatedPlan = generateEmergencyPlan(state.wizardAnswers);
    if (domainId === 'study') state.generatedPlan = generateStudyPlan(state.wizardAnswers);
    if (domainId === 'fitness') state.generatedPlan = generateFitnessPlan(state.wizardAnswers);
    if (domainId === 'custom') state.generatedPlan = generateCustomPlan(state.wizardAnswers);
    
    state.currentPlanNodeIndex = 0;
    renderView('plan');
}

/* =========================================================================
   5. PLAN VIEW RENDERER
   ========================================================================= */

function setupPlanView() {
    const plan = state.generatedPlan;
    
    document.getElementById('plan-domain-label').textContent = state.activeDomain.title;
    document.getElementById('plan-title').textContent = plan.title;
    document.getElementById('goal-text').textContent = plan.goal;
    document.getElementById('gap-badge').textContent = plan.gap;

    if (plan.type === 'daily') {
        document.getElementById('timeline-nav-container').style.display = 'block';
        document.getElementById('day-overview-header').style.display = 'block';
        buildTimelineMenu();
        renderPlanDay();
    } else {
        // Sequential / Emergency
        document.getElementById('sequence-nav-container').style.display = 'block';
        document.getElementById('sequence-actions').style.display = 'block';
        renderPlanSequence();
    }
}

function buildTimelineMenu() {
    const plan = state.generatedPlan;
    const scrollBox = document.getElementById('timeline-scroll');
    scrollBox.innerHTML = '';

    plan.timeline.forEach((dayObj, index) => {
        const btn = document.createElement('button');
        btn.className = `timeline-day-btn ${index === state.currentPlanNodeIndex ? 'active' : ''}`;
        btn.innerHTML = `
            <span>${dayObj.title}</span>
            <i class="ph-fill ph-check-circle"></i>
        `;
        
        if (index < state.currentPlanNodeIndex) {
            btn.classList.add('completed');
        }

        btn.addEventListener('click', () => {
            state.currentPlanNodeIndex = index;
            // mark previous as completed visually
            Array.from(scrollBox.children).forEach((childBtn, i) => {
                childBtn.classList.remove('active');
                if(i < index) childBtn.classList.add('completed');
                else childBtn.classList.remove('completed');
            });
            btn.classList.add('active');
            renderPlanDay();
        });
        scrollBox.appendChild(btn);
    });
}

function renderPlanDay() {
    const plan = state.generatedPlan;
    const dayData = plan.timeline[state.currentPlanNodeIndex];
    
    document.getElementById('day-title-text').textContent = dayData.title;
    
    const container = document.getElementById('plan-steps-container');
    container.innerHTML = '';
    
    dayData.steps.forEach(step => {
        container.appendChild(createStepDOM(step));
    });
}

function renderPlanSequence() {
    const plan = state.generatedPlan;
    const stepData = plan.steps[state.currentPlanNodeIndex];
    const totalSteps = plan.steps.length;

    // Progress Bar
    document.getElementById('sequence-text').textContent = `Step ${state.currentPlanNodeIndex + 1} of ${totalSteps}`;
    setTimeout(() => {
        document.getElementById('sequence-fill').style.width = `${((state.currentPlanNodeIndex + 1) / totalSteps) * 100}%`;
    }, 50);

    const container = document.getElementById('plan-steps-container');
    container.innerHTML = '';
    
    // Add standalone class for single sequential rendering styling
    const stepEl = createStepDOM(stepData);
    stepEl.classList.add('standalone');
    stepEl.classList.add('animate-slide-in-right');
    container.appendChild(stepEl);

    // Button state
    const nextBtn = document.getElementById('next-sequence-btn');
    if (state.currentPlanNodeIndex === totalSteps - 1) {
        nextBtn.innerHTML = `Finish Sequence <i class="ph-bold ph-check"></i>`;
        nextBtn.dataset.finished = "true";
    } else {
        nextBtn.innerHTML = `Next Step <i class="ph-bold ph-arrow-right"></i>`;
        nextBtn.dataset.finished = "false";
    }
}

function handleNextSequenceStep() {
    const plan = state.generatedPlan;
    const btn = document.getElementById('next-sequence-btn');

    if (btn.dataset.finished === "true") {
        btn.style.display = 'none';
        document.getElementById('sequence-completed').classList.remove('hidden');
        return;
    }

    if (state.currentPlanNodeIndex < plan.steps.length - 1) {
        state.currentPlanNodeIndex++;
        renderPlanSequence();
    }
}

/* Helper to render step component with STRIPS expansion */
function createStepDOM(step) {
    const stepDiv = document.createElement('div');
    stepDiv.className = 'step-container';
    
    // HTML
    stepDiv.innerHTML = `
        <div class="step-content">
            <h3 class="step-action-title">${step.actionTitle}</h3>
            <p class="step-reason">${step.reason}</p>
        </div>
        
        <button class="strips-toggle-btn">
            <span><i class="ph-bold ph-cpu"></i> View AI Logic (STRIPS)</span>
            <i class="ph-bold ph-caret-down strips-caret"></i>
        </button>
        
        <div class="strips-panel hidden">
            <div class="strips-row">
                <div class="strips-label">Computed Action</div>
                <div class="strips-value">${step.strips.action}</div>
            </div>
            <div class="strips-row">
                <div class="strips-label">Precondition Gap</div>
                <div class="strips-state">
                    ${step.strips.pre.map(p => `<span class="state-badge">${p}</span>`).join('')}
                </div>
            </div>
            <div class="strips-row">
                <div class="strips-label">Resulting Effect</div>
                <div class="strips-state">
                    ${step.strips.eff.map(e => `<span class="state-badge effect-badge">${e}</span>`).join('')}
                </div>
            </div>
        </div>
    `;

    // Bind Expand Logic
    const toggle = stepDiv.querySelector('.strips-toggle-btn');
    const panel = stepDiv.querySelector('.strips-panel');
    const caret = stepDiv.querySelector('.strips-caret');

    toggle.addEventListener('click', () => {
        panel.classList.toggle('hidden');
        if (panel.classList.contains('hidden')) {
            caret.classList.remove('ph-caret-up');
            caret.classList.add('ph-caret-down');
        } else {
            caret.classList.remove('ph-caret-down');
            caret.classList.add('ph-caret-up');
        }
    });

    return stepDiv;
}

// Start
init();
