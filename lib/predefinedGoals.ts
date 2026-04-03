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
            goal: "Master the iconic light fish stew of Bengal with precise spice-tempering.",
            gap: "Mustard oil heat control & whole spice profiling",
            dietaryType: "non-vegetarian",
            pools: {
              Planning: [
                { title: "Bazaar Expedition", reason: "Authenticity starts with Rohu or Katla fish.", desc: "Visit a regional fish market and ensure you have high-smoke-point mustard oil.", subgoal: "preparation", strips: { action: "SOURCE_INGREDIENTS", pre: ["nothing"], eff: ["fresh_fish_available", "mustard_oil_available"] } }
              ],
              Execution: [
                { title: "Pan-Searing the Fish", reason: "Frying fish in turmeric/salt prevents it from breaking in the gravy.", desc: "Lightly fry fish pieces in mustard oil until golden. Do not overcook.", subgoal: "preparation", strips: { action: "SEAR_FISH", pre: ["fresh_fish_available", "mustard_oil_hot"], eff: ["seared_fish_ready"] } },
                { title: "Mustard-Cumin Synthesis", reason: "The 'Jhol' relies on a thin, aromatic consistency.", desc: "Temper the oil with nigella seeds and green chilies. Add cumin-coriander paste.", subgoal: "cooking", strips: { action: "TEMPER_SPICES", pre: ["mustard_oil_hot"], eff: ["aromatic_base_ready"] } },
                { title: "Potato & Fish Integration", reason: "Slow simmering allows the flavors to penetrate the core of the fish.", desc: "Add fried potato wedges and simmer with the fish until tender.", subgoal: "cooking", strips: { action: "SIMMER_STEW", pre: ["aromatic_base_ready", "seared_fish_ready"], eff: ["fish_stew_integrated"] } }
              ],
              Review: [
                { title: "Palate Check", reason: "Bengali food balance is delicate.", desc: "Ensure the pungency of mustard oil is balanced by the sweetness of the fish.", subgoal: "finishing", strips: { action: "VERIFY_FLAVOR", pre: ["fish_stew_integrated"], eff: ["goal_achieved"] } }
              ]
            }
          },
          {
            id: "shukto",
            title: "Bengali Shukto (Bitter-Sweet Medley)",
            goal: "Master the fundamental starter meal that cleanses the palate.",
            gap: "Bitter-Sweet balance & creamy texture",
            dietaryType: "vegetarian",
            pools: {
              Planning: [
                { title: "Veggie Selection", reason: "Shukto requires 7 distinct vegetables including Bitter Gourd.", desc: "Source drumsticks, raw banana, sweet potato, and bitter gourd.", subgoal: "preparation", strips: { action: "SOURCE_VEGGIES", pre: ["nothing"], eff: ["bitter_gourd_ready", "banana_ready"] } }
              ],
              Execution: [
                { title: "Neutralizing the Bitter", reason: "Too much bitterness ruins the delicate milk base.", desc: "Lightly fry bitter gourd slices alone until crisp and set aside.", subgoal: "preparation", strips: { action: "FRY_BITTER_GOURD", pre: ["bitter_gourd_ready"], eff: ["crisp_gourd_ready"] } },
                { title: "The Radhuni Tempering", reason: "Radhuni seed (Wild Celery) is the soul of authentic Shukto.", desc: "Temper the oil with Radhuni and Panch Phoron seeds.", subgoal: "cooking", strips: { action: "TEMPER_RADHUNI", pre: ["mustard_oil_hot"], eff: ["shukto_base_ready"] } },
                { title: "Milk & Poppy Emulsion", reason: "Creates the unique whitish, creamy gravy of Shukto.", desc: "Add poppy seed paste and whole milk. Let it simmer until thick.", subgoal: "finishing", strips: { action: "EMULSIFY_MILK", pre: ["shukto_base_ready"], eff: ["silky_texture_achieved"] } }
              ],
              Review: [
                { title: "Texture Balance", reason: "Vegetables must be firm, not mushy.", desc: "Check if the drumsticks are tender but the Raw Banana is still whole.", subgoal: "finishing", strips: { action: "VERIFY_TEXTURE", pre: ["silky_texture_achieved"], eff: ["goal_achieved"] } }
              ]
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
            goal: "Achieve the smoky, tomato-based poultry masterpiece of the North.",
            gap: "Tandoori char & smokey gravy emulsification",
            dietaryType: "non-vegetarian",
            pools: {
              Planning: [
                { title: "Chicken Brining", reason: "Brining ensures the meat stays succulent after the intense Tandoori heat.", desc: "Soak chicken pieces in salt water for 2 hours before the first marinade.", subgoal: "preparation", strips: { action: "BRINE_MEAT", pre: ["raw_chicken"], eff: ["succulent_chicken_ready"] } }
              ],
              Execution: [
                { title: "Tandoori Char Logic", reason: "Smokey edges provide the counter-balance to the sweet gravy.", desc: "Grill chicken at 250°C until charred edges appear.", subgoal: "cooking", strips: { action: "GRILL_CHAR", pre: ["succulent_chicken_ready"], eff: ["charred_chicken_ready"] } },
                { title: "Gravy Emulsification", reason: "Straining ensures the signature 'Makhani' (buttery) smoothness.", desc: "Strain the tomato-cashew puree through a fine mesh sieve.", subgoal: "cooking", strips: { action: "STRAIN_GRAVY", pre: ["tomato_puree_boiled"], eff: ["velvet_gravy_base"] } }
              ],
              Review: [
                { title: "Cream-Butter Ratio", reason: "Richness is the goal, but splitting is the risk.", desc: "Gently stir in cold heavy cream and white butter off the heat.", subgoal: "finishing", strips: { action: "ADD_FATS", pre: ["velvet_gravy_base", "charred_chicken_ready"], eff: ["goal_achieved"] } }
              ]
            }
          },
          {
            id: "paneer_butter_masala",
            title: "Paneer Butter Masala",
            goal: "Master the iconic vegetarian version of the creamy tomato gravy.",
            gap: "Softening paneer & onion-tomato balance",
            dietaryType: "vegetarian",
            pools: {
              Planning: [
                { title: "Paneer Softening Protocol", reason: "Rubbery paneer ruins the luxury of the dish.", desc: "Soak paneer cubes in hot salted water for 20 minutes before using.", subgoal: "preparation", strips: { action: "SOAK_PANEER", pre: ["store_bought_paneer"], eff: ["soft_paneer_ready"] } }
              ],
              Execution: [
                { title: "Cashew-Garlic Infusion", reason: "North Indian veg gravies rely on nuts for thickening, not just cream.", desc: "Sauté cashews and garlic before blending into the tomato base.", subgoal: "cooking", strips: { action: "INFUSE_NUTS", pre: ["raw_garlic", "cashews"], eff: ["rich_nut_base"] } },
                { title: "Kasuri Methi Final Rub", reason: "Dried fenugreek leaves provide the 'restaurant' aroma.", desc: "Crush leaves between your palms to activate oils before sprinkling.", subgoal: "finishing", strips: { action: "ACTIVATE_METHI", pre: ["gravy_simmering"], eff: ["signature_aroma_captured"] } }
              ],
              Review: [
                { title: "Tanginess Audit", reason: "Tomatoes vary; sugar/honey balance is crucial.", desc: "Taste for acidity. Use a pinch of sugar to balance the tomato tartness.", subgoal: "finishing", strips: { action: "BALANCE_ACIDITY", pre: ["signature_aroma_captured"], eff: ["goal_achieved"] } }
              ]
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
            goal: "Master the fermentation and spreading technique of the perfect crispy crepe.",
            gap: "Batter fermentation & spreading precision",
            dietaryType: "vegetarian",
            pools: {
              Planning: [
                { title: "Rice-Lentil Ratio Check", reason: "3 parts rice to 1 part dal ensures the correct tensile strength.", desc: "Measure and soak parboiled rice and urad dal separately for 6 hours.", subgoal: "preparation", strips: { action: "SOAK_GRAINS", pre: ["rice", "dal"], eff: ["soaked_grains_ready"] } }
              ],
              Execution: [
                { title: "The Fermentation Window", reason: "Airborne yeast creates the CO2 bubbles needed for lightness.", desc: "Grind and let the batter sit in a warm spot for exactly 12 hours.", subgoal: "preparation", strips: { action: "FERMENT_BATTER", pre: ["ground_batter"], eff: ["fermented_active_batter"] } },
                { title: "The Tawa Spread", reason: "Consistent thinness prevents soggy centers.", desc: "Pour a ladle in the center and spiral outwards with zero pressure.", subgoal: "cooking", strips: { action: "SPREAD_DOSA", pre: ["fermented_active_batter", "hot_tawa"], eff: ["thin_crepe_formed"] } }
              ],
              Review: [
                { title: "Crisp Level Audit", reason: "Should maintain structural integrity when folded.", desc: "Check if the bottom is deep golden brown and moves as one piece.", subgoal: "finishing", strips: { action: "CHECK_CRISP", pre: ["thin_crepe_formed"], eff: ["goal_achieved"] } }
              ]
            }
          },
          {
            id: "south_fish_curry",
            title: "Kerala Meen Curry (Fish Curry)",
            goal: "Master the use of Kokum (tamarind) and coconut milk in coastal cooking.",
            gap: "Sourness integration & seafood freshness",
            dietaryType: "non-vegetarian",
            pools: {
              Planning: [
                { title: "Kokum Preparation", reason: "Dried Malabar tamarind needs rehydration to release its tannins.", desc: "Soak 3 pieces of Kudampuli in warm water for 30 minutes.", subgoal: "preparation", strips: { action: "SOAK_KOKUM", pre: ["dry_kokum"], eff: ["sour_extract_ready"] } }
              ],
              Execution: [
                { title: "Shallot-Ginger Slow Sear", reason: "South Indian curries use small onions for intense sweetness.", desc: "Sauté 15 shallots until translucent but not burnt.", subgoal: "cooking", strips: { action: "SAUTE_SHALLOTS", pre: ["raw_shallots"], eff: ["sweet_base_ready"] } },
                { title: "The Coconut Milk Gradient", reason: "Thin milk cooks the fish; thick milk provides the silkiness.", desc: "Add thin coconut milk first. Simmer fish, then finish with thick extract.", subgoal: "cooking", strips: { action: "GRADIENT_ADD", pre: ["sweet_base_ready", "sour_extract_ready"], eff: ["layered_curry_texture"] } }
              ],
              Review: [
                { title: "Freshness Verification", reason: "Coconut oil smells change if overboiled.", desc: "Check that the raw smell of spices is replaced by a creamy aroma.", subgoal: "finishing", strips: { action: "VERIFY_AROMA", pre: ["layered_curry_texture"], eff: ["goal_achieved"] } }
              ]
            }
          }
        ]
      },
      {
        id: "gujarati",
        label: "Gujarati Cuisine",
        details: [
          {
            id: "dhokla",
            title: "Khaman Dhokla",
            goal: "Master the aeration and tempering of sponge-like savory cakes.",
            gap: "Soda-acid reaction & steaming time",
            dietaryType: "vegetarian",
            pools: {
              Planning: [
                { title: "Gram Flour Sifting", reason: "Lumps prevent the soda-acid reaction from being uniform.", desc: "Sieve the besan twice to introduce air before adding water.", subgoal: "preparation", strips: { action: "SIFT_FLOUR", pre: ["raw_besan"], eff: ["aerated_flour_ready"] } }
              ],
              Execution: [
                { title: "The Soda Activation", reason: "Reaction must happen JUST before the lid closes.", desc: "Whisk in ENO/Soda, wait 5 seconds, and pour into the steamer.", subgoal: "cooking", strips: { action: "ACTIVATE_SODA", pre: ["aerated_flour_ready", "steam_ready"], eff: ["risen_dhokla_base"] } },
                { title: "The Sugar-Citrus Syrup", reason: "Dhokla is a sponge; it must absorb liquid without collapsing.", desc: "Pour a warm mix of mustard seeds, green chilies, and sugar-water over.", subgoal: "finishing", strips: { action: "ABSORB_SYRUP", pre: ["risen_dhokla_base"], eff: ["moist_sponge_achieved"] } }
              ],
              Review: [
                { title: "Bounce Analysis", reason: "Should spring back when pressed gently.", desc: "Verify that no liquid stays at the bottom of the container.", subgoal: "finishing", strips: { action: "VERIFY_BOUNCE", pre: ["moist_sponge_achieved"], eff: ["goal_achieved"] } }
              ]
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
            goal: "Master the intense heat and smokey flavor of Rajasthan's warrior meal.",
            gap: "Mathania chili usage & smoke infusion",
            dietaryType: "non-vegetarian",
            pools: {
              Planning: [
                { title: "Mathania Chili Hunt", reason: "Authentic heat comes from these specific regional chilies.", desc: "Source dried Mathania chilies. Soak them to create the deep red paste.", subgoal: "preparation", strips: { action: "SOURCE_CHILI", pre: ["nothing"], eff: ["mathania_pulp_ready"] } }
              ],
              Execution: [
                { title: "Slow Braise: Ghee Only", reason: "Traditional Rajasthan cooking uses Ghee as the primary thermal conductor.", desc: "Sauté the meat in 1/2 cup of pure Ghee until the edges are crispy.", subgoal: "cooking", strips: { action: "BRAISE_GHEE", pre: ["raw_meat", "mathania_pulp_ready"], eff: ["seared_spicy_meat"] } },
                { title: "The Dhunger (Coal Smoke)", reason: "Adds the desert camp-fire smokey essence to the spices.", desc: "Place burning charcoal in a bowl inside. Pour Ghee and cover.", subgoal: "finishing", strips: { action: "INFUSE_SMOKE", pre: ["seared_spicy_meat"], eff: ["smoked_red_mutton"] } }
              ],
              Review: [
                { title: "Oil Separation Check", reason: "Red oil must float on top (The Rogan).", desc: "Check for the deep crimson layer separating from the spices.", subgoal: "finishing", strips: { action: "CHECK_ROGAN", pre: ["smoked_red_mutton"], eff: ["goal_achieved"] } }
              ]
            }
          },
          {
            id: "dal_baati",
            title: "Dal Baati Churma",
            goal: "Execute the triplet of hard wheat balls, lentils, and sweet crumble.",
            gap: "Uniform baking and Ghee absorption",
            dietaryType: "vegetarian",
            pools: {
              Planning: [
                { title: "Whole Wheat Texture", reason: "Should be coarse (Suji-like) for the correct crunch.", desc: "Source coarse wheat flour and pure cow ghee.", subgoal: "preparation", strips: { action: "SOURCE_TEXTURE", pre: ["nothing"], eff: ["coarse_flour_ready"] } }
              ],
              Execution: [
                { title: "The Baati Bake", reason: "Hard dough ensures the centers don't get soggy.", desc: "Bake dough balls on low heat in a Tandoor or gas oven.", subgoal: "cooking", strips: { action: "BAKE_BAATI", pre: ["coarse_flour_ready"], eff: ["hard_baked_balls"] } },
                { title: "The Ghee Soak", reason: "Baatis are dipped in warm Ghee to soften the crust.", desc: "Crack the hot baati and submerge it in a bowl of warm Ghee for 2 mins.", subgoal: "finishing", strips: { action: "SOAK_GHEE", pre: ["hard_baked_balls"], eff: ["soft_crunchy_result"] } }
              ],
              Review: [
                { title: "Dal Punchiness", reason: "The lentils must be garlicky to cut through the heavy ghee.", desc: "Check if the Panch Mel Dal has a strong garlic-dry chili tempering.", subgoal: "finishing", strips: { action: "VERIFY_DAL", pre: ["soft_crunchy_result"], eff: ["goal_achieved"] } }
              ]
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
            goal: "Execute the royal lamb dish using traditional Kashmiri Pandit styles.",
            gap: "Ratan Jot infusion & yogurt tempering",
            dietaryType: "non-vegetarian",
            pools: {
              Planning: [
                { title: "Ratan Jot Sourcing", reason: "Authentic red color comes from alkanet root, not just chili.", desc: "Find authentic Ratan Jot root (Alkanet root) for the color infusion.", subgoal: "preparation", strips: { action: "SOURCE_COLOR", pre: ["nothing"], eff: ["alkanet_root_ready"] } }
              ],
              Execution: [
                { title: "Fennel-Ginger Base", reason: "Kashmiri cooking avoids onion/garlic, relying on spice powders.", desc: "Sauté meat with heavy amounts of Saunth (ginger) and Saunf (fennel).", subgoal: "cooking", strips: { action: "SAUTE_POWDERS", pre: ["raw_meat"], eff: ["aromatic_meat_base"] } },
                { title: "Alkanet Infusion", reason: "Heat root in oil, then discard root. Add the red oil to the pot.", desc: "Heat Ratan Jot in 2 tbsp oil till red, then pour into the gravy.", subgoal: "finishing", strips: { action: "INFUSE_COLOR", pre: ["aromatic_meat_base", "alkanet_root_ready"], eff: ["crimson_lamb_gravy"] } }
              ],
              Review: [
                { title: "Yogurt Texture Audit", reason: "Should be velvety and smooth, no curdling.", desc: "Verify the yogurt has merged completely with the red oils.", subgoal: "finishing", strips: { action: "CHECK_VELVET", pre: ["crimson_lamb_gravy"], eff: ["goal_achieved"] } }
              ]
            }
          },
          {
            id: "dum_aloo",
            title: "Kashmiri Dum Aloo",
            goal: "Master the deep-frying and slow-cooking of baby potatoes in spicy yogurt.",
            gap: "Potato texture & yogurt stabilization",
            dietaryType: "vegetarian",
            pools: {
              Planning: [
                { title: "Starchy Potato Selection", reason: "Old potatoes are better for deep frying and pricking.", desc: "Source baby potatoes. Boil until 70% done, then prick with a toothpick.", subgoal: "preparation", strips: { action: "PREP_POTATO", pre: ["raw_potatoes"], eff: ["pricked_potatoes_ready"] } }
              ],
              Execution: [
                { title: "Cold Whisk Emulsion", reason: "Yogurt must be cold when whisked with fennel-ginger to stay stable.", desc: "Whisk cold yogurt with spices. Add to potatoes on VERY low heat.", subgoal: "cooking", strips: { action: "WHISK_YOGURT", pre: ["pricked_potatoes_ready"], eff: ["spicy_yogurt_mix"] } },
                { title: "The Dum (Pressure)", reason: "Slow heat forces the spicy liquid into the pricked holes.", desc: "Seal the pot with dough or a heavy lid and cook for 45 minutes.", subgoal: "finishing", strips: { action: "DUM_COOK", pre: ["spicy_yogurt_mix"], eff: ["infused_potatoes"] } }
              ],
              Review: [
                { title: "Internal Texture Check", reason: " картофель should be red inside.", desc: "Cut one potato to see if the red spice has reached the center.", subgoal: "finishing", strips: { action: "VERIFY_INFUSION", pre: ["infused_potatoes"], eff: ["goal_achieved"] } }
              ]
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
        label: "Frontend Systems",
        details: [
          {
            id: "react_mvp",
            title: "React/Next.js Architecture",
            goal: "Master modern build patterns and state-aware components.",
            gap: "Code cleaniness vs Prototype speed",
            dietaryType: "vegetarian", // Default/Agnostic
            pools: {
              Planning: [
                { title: "Component Scoping", reason: "Prevent refactors.", desc: "List all UI atoms and molecules.", subgoal: "preparation", strips: { action: "SCOPE", pre: ["idea"], eff: ["blueprint"] } }
              ],
              Execution: [
                { title: "Logical Hook Synthesis", reason: "Separation of concerns.", desc: "Write custom hooks for data fetching.", subgoal: "cooking", strips: { action: "CODE", pre: ["blueprint"], eff: ["features"] } }
              ],
              Review: [
                { title: "Speed Audit", reason: "Production readiness.", desc: "Run Lighthouse check.", subgoal: "finishing", strips: { action: "AUDIT", pre: ["features"], eff: ["deployment"] } }
              ]
            }
          }
        ]
      }
    ]
  }
];
