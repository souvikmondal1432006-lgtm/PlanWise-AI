export interface TaskTemplate {
  title: string;
  reason: string;
  desc: string;
  subgoal: "preparation" | "cooking" | "finishing";
  strips: {
    action: string;
    pre: string[];
    eff: string[];
  };
}

export interface GoalDetail {
  id: string;
  title: string;
  goal: string;
  gap: string;
  dietaryType: "vegetarian" | "non-vegetarian";
  pools: {
    Planning: TaskTemplate[];
    Execution: TaskTemplate[];
    Review: TaskTemplate[];
  };
}

export interface SubCategory {
  id: string;
  label: string;
  details: GoalDetail[];
}

export interface MainGoal {
  id: string;
  label: string;
  subCategories: SubCategory[];
}

export const PREDEFINED_HIERARCHY: MainGoal[] = [
  {
    id: "cooking",
    label: "Culinary Arts",
    subCategories: [
      {
        id: "bengali",
        label: "Bengali Cuisine",
        details: [
          {
            id: "maacher_jhol",
            title: "Maacher Jhol (Fish Stew)",
            goal: "Master the iconic light fish stew with precise mustard-cumin tempering.",
            gap: "Mustard oil smoke-point control",
            dietaryType: "non-vegetarian",
            pools: {
              Planning: [{ title: "Bazaar Expedition", reason: "Freshness is everything.", desc: "Source Rohu or Katla fish.", subgoal: "preparation", strips: { action: "SOURCE", pre: ["nothing"], eff: ["fresh_fish"] } }],
              Execution: [
                { title: "Pan-Searing", reason: "Prevention of disintegration.", desc: "Fry fish in turmeric and salt.", subgoal: "preparation", strips: { action: "SEAR", pre: ["fresh_fish"], eff: ["seared_fish"] } },
                { title: "Jhol Tempering", reason: "Aromatic base foundation.", desc: "Add nigella seeds and green chilies.", subgoal: "cooking", strips: { action: "TEMPER", pre: ["mustard_oil"], eff: ["aromatic_base"] } }
              ],
              Review: [{ title: "Palate Audit", reason: "Lightness check.", desc: "Verify thin consistency.", subgoal: "finishing", strips: { action: "VERIFY", pre: ["jhol_done"], eff: ["goal_achieved"] } }]
            }
          },
          {
            id: "kosha_mangso",
            title: "Kosha Mangso (Mutton Cook)",
            goal: "Master the slow-cooked, goat curry with the 'Kosho' technique.",
            gap: "Patience in caramelization",
            dietaryType: "non-vegetarian",
            pools: {
              Planning: [{ title: "Mutton Selection", reason: "Fat-to-meat ratio.", desc: "Source tender goat shoulder pieces.", subgoal: "preparation", strips: { action: "SOURCE", pre: ["nothing"], eff: ["raw_mutton"] } }],
              Execution: [
                { title: "The Kosho Process", reason: "Deep caramelization.", desc: "Slow fry onion and spice paste for 60 mins.", subgoal: "cooking", strips: { action: "BHUNA", pre: ["raw_mutton"], eff: ["dark_rich_gravy"] } }
              ],
              Review: [{ title: "Tender Review", reason: "Fall-off-the-bone requirement.", desc: "Check if meat is butter-soft.", subgoal: "finishing", strips: { action: "CHECK", pre: ["kosho_done"], eff: ["goal_achieved"] } }]
            }
          },
          {
            id: "chingri_malaikari",
            title: "Chingri Malaikari (Prawn Cream)",
            goal: "Master the luxurious prawn curry cooked in thick coconut milk.",
            gap: "Seafood timing & milk emulsion",
            dietaryType: "non-vegetarian",
            pools: {
              Planning: [{ title: "Coconut Extraction", reason: "Freshness over canned.", desc: "Extract fresh milk from one coconut.", subgoal: "preparation", strips: { action: "EXTRACT", pre: ["nothing"], eff: ["fresh_coconut_milk"] } }],
              Execution: [
                { title: "Prawn Cleaning", reason: "The deveining protocol.", desc: "Devein golda chingri carefully.", subgoal: "preparation", strips: { action: "CLEAN", pre: ["raw_prawns"], eff: ["prepped_prawns"] } },
                { title: "Coconut Milk Gradient", reason: "Texture layers.", desc: "Add thin milk first, thick milk at the end.", subgoal: "cooking", strips: { action: "EMULSIFY", pre: ["fresh_coconut_milk"], eff: ["silky_gravy"] } }
              ],
              Review: [{ title: "Sweetness Balance", reason: "Natural coconut sugar levels.", desc: "Ensure spice doesn't overpower milk.", subgoal: "finishing", strips: { action: "VERIFY", pre: ["malaikari_done"], eff: ["goal_achieved"] } }]
            }
          },
          {
            id: "aloo_posto",
            title: "Aloo Posto (Poppy Seed Potato)",
            goal: "Master the nutty, comforting potato specialty of rural Bengal.",
            gap: "Poppy seed paste texture",
            dietaryType: "vegetarian",
            pools: {
               Planning: [{ title: "Posto Grinding", reason: "Silkiness vs Grit.", desc: "Grind poppy seeds into a thick paste.", subgoal: "preparation", strips: { action: "GRIND", pre: ["dry_poppy"], eff: ["posto_paste"] } }],
               Execution: [
                 { title: "Potato Sauté", reason: "Outer skin integrity.", desc: "Fry potato cubes until edges are golden.", subgoal: "preparation", strips: { action: "FRY", pre: ["raw_potatoes"], eff: ["golden_potatoes"] } },
                 { title: "The Posto Merge", reason: "Avoid drying out.", desc: "Mix paste with potatoes and water.", subgoal: "cooking", strips: { action: "DUM", pre: ["posto_paste"], eff: ["creamy_posto"] } }
               ],
               Review: [{ title: "Nutty Finish", reason: "Authenticity check.", desc: "Add raw mustard oil for pungency.", subgoal: "finishing", strips: { action: "FINISH", pre: ["creamy_posto"], eff: ["goal_achieved"] } }]
            }
          },
          {
            id: "shukto",
            title: "Bengali Shukto",
            goal: "Master the bitter-sweet tonic of Bengali vegetarian cuisine.",
            gap: "Bitter Gourd balance",
            dietaryType: "vegetarian",
            pools: {
              Planning: [{ title: "Veggie Selection", reason: "7 distinct vegetables.", desc: "Source drumsticks, raw banana, gourd.", subgoal: "preparation", strips: { action: "SOURCE", pre: ["nothing"], eff: ["prepped_veggies"] } }],
              Execution: [{ title: "The Bitter Gourd Neutral", reason: "Prevent bitterness spread.", desc: "Fry bitter gourd separately first.", subgoal: "preparation", strips: { action: "FRY", pre: ["bitter_gourd"], eff: ["neutral_gourd"] } }],
              Review: [{ title: "Milk-Poppy Emulsion", reason: "Whitish silky texture.", desc: "Check consistency after adding milk.", subgoal: "finishing", strips: { action: "EMULSIFY", pre: ["neutral_gourd"], eff: ["goal_achieved"] } }]
            }
          }
        ]
      },
      {
        id: "north_indian",
        label: "North Indian Cuisine",
        details: [
          {
            id: "butter_chicken",
            title: "Butter Chicken (Murg Makhani)",
            goal: "Master the iconic tandoori-charred, tomato-butter chicken.",
            gap: "Tandoori smokiness in a home kitchen",
            dietaryType: "non-vegetarian",
            pools: {
              Planning: [{ title: "Spatchcock Prep", reason: "Even heat distribution.", desc: "Prepare chicken for high-heat grill.", subgoal: "preparation", strips: { action: "PREP", pre: ["raw_chicken"], eff: ["prepped_bird"] } }],
               Execution: [
                 { title: "Double Marinade", reason: "Inner juiciness.", desc: "Lemon first, then hung curd and chili.", subgoal: "preparation", strips: { action: "MARINATE", pre: ["prepped_bird"], eff: ["marinated_bird"] } },
                 { title: "The Mukhani Redux", reason: "Silky tomato reduction.", desc: "Boil tomatoes with cashews and strain.", subgoal: "cooking", strips: { action: "REDUCE", pre: ["tomatoes"], eff: ["silky_makhani_base"] } }
               ],
               Review: [{ title: "Kasuri Methi Finish", reason: "Aromatic signature.", desc: "Rub dried fenugreek leaves on top.", subgoal: "finishing", strips: { action: "FINISH", pre: ["complete_dish"], eff: ["goal_achieved"] } }]
            }
          },
          {
            id: "nihari",
            title: "Old Delhi Nihari",
            goal: "Master the slow-cooked, bone-marrow mutton stew.",
            gap: "8-hour simmering technique",
            dietaryType: "non-vegetarian",
            pools: {
              Planning: [{ title: "Shank Sourcing", reason: "Gelatinous texture.", desc: "Find mutton shanks with marrow bones.", subgoal: "preparation", strips: { action: "SOURCE", pre: ["nothing"], eff: ["mutton_shanks"] } }],
              Execution: [
                { title: "The Flour Thickener", reason: "Signature Nihari body.", desc: "Mix roasted wheat flour into the stew.", subgoal: "cooking", strips: { action: "THICKEN", pre: ["mutton_shanks"], eff: ["thick_stew_base"] } }
              ],
              Review: [{ title: "Marrow Extraction", reason: "Flavor richness.", desc: "Check if marrow is liquid-soft.", subgoal: "finishing", strips: { action: "VERIFY", pre: ["thick_stew_base"], eff: ["goal_achieved"] } }]
            }
          },
          {
            id: "dal_makhani",
            title: "Dal Makhani (Slow Simmer)",
            goal: "Master the classic black lentil stew cooked over 12 hours.",
            gap: "Lentil silkiness vs graininess",
            dietaryType: "vegetarian",
            pools: {
              Planning: [{ title: "Urad Dal Soaking", reason: "Outer skin softening.", desc: "Soak black dal and rajma for 12 hours.", subgoal: "preparation", strips: { action: "SOAK", pre: ["dry_lentils"], eff: ["soaked_lentils"] } }],
              Execution: [
                { title: "Low Simmer Cycle", reason: "Creamy breakdown.", desc: "Cook on the lowest flame for 4 hours.", subgoal: "cooking", strips: { action: "SIMMER", pre: ["soaked_lentils"], eff: ["broken_lentils"] } }
              ],
              Review: [{ title: "The Final Buttering", reason: "Glossy finish.", desc: "Add generous white butter and cream.", subgoal: "finishing", strips: { action: "FINISH", pre: ["broken_lentils"], eff: ["goal_achieved"] } }]
            }
          },
          {
             id: "malai_kofta",
             title: "Malai Kofta (Cashew Gravy)",
             goal: "Master the deep-fried paneer balls in a white cashew-cream sauce.",
             gap: "Kofta structural integrity",
             dietaryType: "vegetarian",
             pools: {
                Planning: [{ title: "Paneer Grating", reason: "No lumps allowed.", desc: "Grate fresh paneer and boil potatoes.", subgoal: "preparation", strips: { action: "PREP", pre: ["paneer"], eff: ["grated_mix"] } }],
                Execution: [
                  { title: "The Cashew Puree", reason: "The White Sauce secret.", desc: "Boil cashews and onions before blending.", subgoal: "cooking", strips: { action: "PUREE", pre: ["cashews"], eff: ["white_puree"] } }
                ],
                Review: [{ title: "Softness Check", reason: "Melt-in-mouth test.", desc: "Ensure koftas don't break in gravy.", subgoal: "finishing", strips: { action: "VERIFY", pre: ["white_puree"], eff: ["goal_achieved"] } }]
             }
          }
        ]
      },
      {
        id: "south_indian",
        label: "South Indian Cuisine",
        details: [
          {
            id: "masala_dosa",
            title: "Authentic Masala Dosa",
            goal: "Master the art of fermented batter and crispy crepe spreading.",
            gap: "Batter fermentation consistency",
            dietaryType: "vegetarian",
            pools: {
              Planning: [{ title: "Rice-to-Dal Ratio", reason: "Crispiness physics.", desc: "3 parts rice to 1 part urad dal.", subgoal: "preparation", strips: { action: "MEASURE", pre: ["nothing"], eff: ["ingredients_ready"] } }],
              Execution: [{ title: "The Tawa Spread", reason: "Thinness protocol.", desc: "Dosa spreading in tight concentric circles.", subgoal: "cooking", strips: { action: "SPREAD", pre: ["fermented_batter"], eff: ["thin_crepe"] } }],
              Review: [{ title: "Crisp Analysis", reason: "Browning level.", desc: "Check for even golden color on base.", subgoal: "finishing", strips: { action: "VERIFY", pre: ["thin_crepe"], eff: ["goal_achieved"] } }]
            }
          },
          {
            id: "chettinad_chicken",
            title: "Chettinad Chicken Roast",
            goal: "Master the complex 16-spice pepper chicken of Tamil Nadu.",
            gap: "Fresh spice roasting intensity",
            dietaryType: "non-vegetarian",
            pools: {
              Planning: [{ title: "Dry-Spice Selection", reason: "Star Anise & Kalpasi.", desc: "Find stone flower (Kalpasi) for aromatics.", subgoal: "preparation", strips: { action: "SOURCE", pre: ["nothing"], eff: ["chettinad_spices"] } }],
              Execution: [
                { title: "The 16-Spice Roast", reason: "Deep forest flavor.", desc: "Dry roast spices until they turn dark brown.", subgoal: "cooking", strips: { action: "ROAST", pre: ["chettinad_spices"], eff: ["roasted_masala"] } }
              ],
              Review: [{ title: "Spice Punch Check", reason: "Pepper-forward finish.", desc: "Verify heat levels vs coconut sweetness.", subgoal: "finishing", strips: { action: "VERIFY", pre: ["roasted_masala"], eff: ["goal_achieved"] } }]
            }
          },
          {
             id: "avial",
             title: "Kerala Avial (Mixed Veg)",
             goal: "Master the coconut-yogurt seasonal veggie medley.",
             gap: "Cured veggie texture",
             dietaryType: "vegetarian",
             pools: {
                Planning: [{ title: "Seasonal Selection", reason: "Yam and Drumstick.", desc: "Source 5-7 varieties of regional veggies.", subgoal: "preparation", strips: { action: "SOURCE", pre: ["nothing"], eff: ["fresh_farm_veggies"] } }],
                Execution: [
                  { title: "The Coconut Coarse Grind", reason: "Textural contrast.", desc: "Grind coconut with cumin very coarsely.", subgoal: "cooking", strips: { action: "GRIND", pre: ["coconut"], eff: ["coarse_mix"] } }
                ],
                Review: [{ title: "Cold Coconut Oil Finish", reason: "Signature aroma.", desc: "Drizzle raw coconut oil on top.", subgoal: "finishing", strips: { action: "CRUSH", pre: ["coarse_mix"], eff: ["goal_achieved"] } }]
             }
          }
        ]
      },
      {
        id: "rajasthani",
        label: "Rajasthani Cuisine",
        details: [
          {
            id: "laal_maas",
            title: "Laal Maas (Red Meat)",
            goal: "Master the fiery Rajasthani mutton with Mathania chilies.",
            gap: "Heat management with Mathania chilies",
            dietaryType: "non-vegetarian",
            pools: {
              Planning: [{ title: "Mathania Hunt", reason: "Color without extreme heat.", desc: "Source dried Mathania red chilies.", subgoal: "preparation", strips: { action: "SOURCE", pre: ["nothing"], eff: ["mathania_chilies"] } }],
              Execution: [
                { title: "The Dhunger Smoke", reason: "Desert campfire aroma.", desc: "Place burning charcoal in the pot.", subgoal: "finishing", strips: { action: "SMOKE", pre: ["cooked_mutton"], eff: ["smoked_laal_maas"] } }
              ],
              Review: [{ title: "Crimson Oil Audit", reason: "The Rogan check.", desc: "Verify red oil float on surface.", subgoal: "finishing", strips: { action: "VERIFY", pre: ["smoked_laal_maas"], eff: ["goal_achieved"] } }]
            }
          },
          {
             id: "safed_maas",
             title: "Safed Maas (White Meat)",
             goal: "Master the royal white mutton curry cooked in milk and yogurt.",
             gap: "Anti-curdling yogurt logic",
             dietaryType: "non-vegetarian",
             pools: {
                Planning: [{ title: "White Spice Selection", reason: "No red allowed.", desc: "Find poppy seeds, cashews, melon seeds.", subgoal: "preparation", strips: { action: "SOURCE", pre: ["nothing"], eff: ["white_masala"] } }],
                Execution: [
                  { title: "The Cold Whisk", reason: "Yogurt stabilization.", desc: "Whisk yogurt and flour slowly into sauce.", subgoal: "cooking", strips: { action: "WHISK", pre: ["white_masala"], eff: ["white_velvet_gravy"] } }
                ],
                Review: [{ title: "Silver Finish", reason: "Royal presentation.", desc: "Check for the pristine white consistency.", subgoal: "finishing", strips: { action: "VERIFY", pre: ["white_velvet_gravy"], eff: ["goal_achieved"] } }]
             }
          },
          {
             id: "dal_baati",
             title: "Dal Baati Churma",
             goal: "Master the triplet of hard baked balls, lentils and sugar crumble.",
             gap: "Dough density vs baking time",
             dietaryType: "vegetarian",
             pools: {
                Planning: [{ title: "Coarse Wheat Hunt", reason: "Texture crunch.", desc: "Find coarsely ground wheat flour.", subgoal: "preparation", strips: { action: "SOURCE", pre: ["nothing"], eff: ["coarse_wheat"] } }],
                Execution: [
                  { title: "The Ghee Drown", reason: "Soaking protocol.", desc: "Crack hot baatis and submerge in warm ghee.", subgoal: "finishing", strips: { action: "SOAK", pre: ["baked_baati"], eff: ["softened_baati"] } }
                ],
                Review: [ { title: "Churma Synthesis", reason: "Sweet balance.", desc: "Crush extra baatis with jaggery.", subgoal: "finishing", strips: { action: "CRUSH", pre: ["softened_baati"], eff: ["goal_achieved"] } }]
             }
          }
        ]
      },
      {
        id: "kashmiri",
        label: "Kashmiri Cuisine",
        details: [
          {
            id: "rogan_josh",
            title: "Authentic Rogan Josh",
            goal: "Master the royal lamb dish with Ratan Jot and Fennel.",
            gap: "Natural red coloring infusion",
            dietaryType: "non-vegetarian",
            pools: {
              Planning: [{ title: "Ratan Jot Sourcing", reason: "Chemical-free red.", desc: "Find Alkanet root for color.", subgoal: "preparation", strips: { action: "SOURCE", pre: ["nothing"], eff: ["alkanet_root"] } }],
              Execution: [{ title: "The Yogurt Temper", reason: "Velvety meat base.", desc: "Slowly add cold yogurt to meat spices.", subgoal: "cooking", strips: { action: "TEMPER", pre: ["raw_meat"], eff: ["yogurt_infusion"] } }],
              Review: [{ title: "Internal Infusion", reason: "Deep spice reach.", desc: "Check if spice reached meat center.", subgoal: "finishing", strips: { action: "VERIFY", pre: ["yogurt_infusion"], eff: ["goal_achieved"] } }]
            }
          },
          {
            id: "yakhni",
            title: "Kashmiri Yakhni (Meat)",
            goal: "Master the yogurt-based lamb curry with cardamom and cloves.",
            gap: "Splitting prevention",
            dietaryType: "non-vegetarian",
            pools: {
              Planning: [{ title: "Saffron Selection", reason: "Aromatic gold.", desc: "Source Grade A Kashmiri Saffron.", subgoal: "preparation", strips: { action: "SOURCE", pre: ["nothing"], eff: ["saffron_ready"] } }],
              Execution: [
                { title: "Continuous Whisking", reason: "Prevent curdling.", desc: "Whisk yogurt in one direction for 20 mins.", subgoal: "cooking", strips: { action: "WHISK", pre: ["saffron_ready"], eff: ["yakhni_base"] } }
              ],
              Review: [{ title: "Mutton Softness", reason: "Tenderness check.", desc: "Should pull apart with two fingers.", subgoal: "finishing", strips: { action: "VERIFY", pre: ["yakhni_base"], eff: ["goal_achieved"] } }]
            }
          },
          {
             id: "paneer_chaman",
             title: "Kashmiri Paneer Chaman",
             goal: "Master yellow paneer cooked in fennel and dry ginger.",
             gap: "Paneer texture & yellow infusion",
             dietaryType: "vegetarian",
             pools: {
                Planning: [{ title: "Dry Ginger Hunt", reason: "The 'Saunth' requirement.", desc: "Find authentic Kashmiri sun-dried ginger.", subgoal: "preparation", strips: { action: "SOURCE", pre: ["nothing"], eff: ["saunth_powder"] } }],
                Execution: [
                  { title: "The Turmeric Bath", reason: "Signature yellow color.", desc: "Fry paneer with 1 tsp turmeric.", subgoal: "preparation", strips: { action: "FRY", pre: ["paneer"], eff: ["yellow_paneer"] } }
                ],
                Review: [{ title: "Soupiness Check", reason: "Consistency audit.", desc: "Verify thin but aromatic gravy.", subgoal: "finishing", strips: { action: "VERIFY", pre: ["yellow_paneer"], eff: ["goal_achieved"] } }]
             }
          }
        ]
      }
    ]
  },
  {
    id: "app_dev",
    label: "Web Development",
    subCategories: [
      {
        id: "frontend",
        label: "Modern Frontend",
        details: [
          {
            id: "next_app_router",
            title: "Next.js 14 App Architecture",
            goal: "Master Server Components and streaming patterns.",
            gap: "Client-Server boundary confusion",
            dietaryType: "vegetarian",
            pools: {
              Planning: [{ title: "Boundary Mapping", reason: "Maximize RSC usage.", desc: "Define Client vs Server components.", subgoal: "preparation", strips: { action: "MAP", pre: ["idea"], eff: ["boundary_file"] } }],
              Execution: [{ title: "Streaming Strategy", reason: "Instant perceived speed.", desc: "Implement Suspense boundaries.", subgoal: "cooking", strips: { action: "CODE", pre: ["boundary_file"], eff: ["streaming_app"] } }],
              Review: [{ title: "Hydration Audit", reason: "Performance check.", desc: "Check for hydration mismatches.", subgoal: "finishing", strips: { action: "AUDIT", pre: ["streaming_app"], eff: ["goal_achieved"] } }]
            }
          },
          {
            id: "svelte_reactivity",
            title: "SvelteKit 2 Reactive Mastery",
            goal: "Build truly compiler-optimized reactive apps.",
            gap: "State management verbosity",
            dietaryType: "vegetarian",
            pools: {
               Planning: [{ title: "Store Architecture", reason: "Global vs Local state.", desc: "Define writable and derived stores.", subgoal: "preparation", strips: { action: "SCOPE", pre: ["nothing"], eff: ["state_diagram"] } }],
               Execution: [{ title: "Action Synthesis", reason: "Form mastery.", desc: "Build Svelte Actions for form handling.", subgoal: "cooking", strips: { action: "CODE", pre: ["state_diagram"], eff: ["reactive_app"] } }],
               Review: [{ title: "Bundle Analysis", reason: "Compiler efficiency.", desc: "Verify zero-runtime overhead.", subgoal: "finishing", strips: { action: "AUDIT", pre: ["reactive_app"], eff: ["goal_achieved"] } }]
            }
          }
        ]
      },
      {
        id: "backend",
        label: "Systems Engineering",
        details: [
          {
             id: "go_microservices",
             title: "Go (Golang) Microservices",
             goal: "Master concurrent, type-safe backend systems.",
             gap: "Concurrency race conditions",
             dietaryType: "vegetarian",
             pools: {
                Planning: [{ title: "Proto Mapping", reason: "gRPC contract drift.", desc: "Define .proto files for services.", subgoal: "preparation", strips: { action: "DEFINE", pre: ["nothing"], eff: ["proto_files"] } }],
                Execution: [{ title: "Worker Pool Synth", reason: "Efficient resource usage.", desc: "Build Go channel-based worker pools.", subgoal: "cooking", strips: { action: "CODE", pre: ["proto_files"], eff: ["scaling_service"] } }],
                Review: [{ title: "Race Discovery", reason: "Stability check.", desc: "Run go test -race on all services.", subgoal: "finishing", strips: { action: "AUDIT", pre: ["scaling_service"], eff: ["goal_achieved"] } }]
             }
          },
          {
            id: "fastapi_mastery",
            title: "High-Perf FastAPI (Python)",
            goal: "Master asynchronous Python backend design.",
            gap: "Blocking vs Async calls",
            dietaryType: "vegetarian",
            pools: {
               Planning: [{ title: "Pydantic Modeling", reason: "Type safety first.", desc: "Define robust Pydantic schemas.", subgoal: "preparation", strips: { action: "MODEL", pre: ["nothing"], eff: ["schemas"] } }],
               Execution: [{ title: "Async Entrail Synth", reason: "Concurrency mastery.", desc: "Implement async DB drivers (Motor/SQLAlchemy).", subgoal: "cooking", strips: { action: "CODE", pre: ["schemas"], eff: ["async_api"] } }],
               Review: [{ title: "Dependency Audit", reason: "Security first.", desc: "Check for security vulnerabilities.", subgoal: "finishing", strips: { action: "AUDIT", pre: ["async_api"], eff: ["goal_achieved"] } }]
            }
          }
        ]
      }
    ]
  }
];
