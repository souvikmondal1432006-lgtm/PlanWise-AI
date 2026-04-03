export interface TaskTemplate {
  title: string;
  reason: string;
  desc: string;
}

export interface GoalDetail {
  id: string;
  title: string;
  goal: string;
  gap: string;
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
            pools: {
              Planning: [
                { title: "Bazaar Expedition", reason: "Authenticity starts with Rohu or Katla fish.", desc: "Visit a regional fish market and ensure you have high-smoke-point mustard oil." }
              ],
              Execution: [
                { title: "Pan-Searing the Fish", reason: "Frying fish in turmeric/salt prevents it from breaking in the gravy.", desc: "Lightly fry fish pieces in mustard oil until golden. Do not overcook." },
                { title: "Mustard-Cumin Synthesis", reason: "The 'Jhol' relies on a thin, aromatic consistency.", desc: "Tempe the oil with nigella seeds and green chilies. Add cumin-coriander paste." },
                { title: "Potato & Fish Integration", reason: "Vegetables act as sponges for the fish essence.", desc: "Add fried potato wedges and simmer with the fish until tender." }
              ],
              Review: [
                { title: "Palate Check", reason: "Bengali food balance is delicate.", desc: "Ensure the pungency of mustard oil is balanced by the sweetness of the fish." }
              ]
            }
          },
          {
            id: "kosha_mangso",
            title: "Kosha Mangso (Slow-Braised Mutton)",
            goal: "Execute the 'Kosha' technique for a rich, dark, and spicy mutton curry.",
            gap: "Slow caramelization & spice-oil separation",
            pools: {
              Planning: [
                { title: "Mutton Selection", reason: "The 'Kosha' requires pieces with bone/fat for richness.", desc: "Source 500g of fresh goat meat, preferably shoulder or ribs." }
              ],
              Execution: [
                { title: "Intense Marinade", reason: "Yogurt and ginger-garlic paste tenderize the meat fibers.", desc: "Marinate meat for at least 4 hours with yogurt, turmeric, and mustard oil." },
                { title: "The 'Kosha' Process", reason: "Intense sautéing creates the signature dark color.", desc: "Sauté the marinated meat on low-medium heat for 60-90 minutes until oil separates." },
                { title: "Final Ghee Tempering", reason: "Adds a luxurious finish to the heavy spices.", desc: "Add a pinch of Garam Masala and a teaspoon of pure ghee before serving." }
              ],
              Review: [
                { title: "Texture Analysis", reason: "Meat should be 'fall-off-the-bone' tender.", desc: "Verify that the gravy has reached a velvety, dark brown consistency." }
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
            title: "Murg Makhani (Butter Chicken)",
            goal: "Master the creamy, tomato-based poultry masterpiece of the North.",
            gap: "Tandoori char & smokey gravy emulsification",
            pools: {
              Planning: [
                { title: "Spice Pantry Reset", reason: "Kasuri Methi and Kashmiri Mirch are non-negotiable.", desc: "Source dried fenugreek leaves and deggi mirch for the signature color." }
              ],
              Execution: [
                { title: "Tandoori Chicken Skewers", reason: "Charred chicken provides the smokey depth to the gravy.", desc: "Marinate in hung curd and spices. Bake or grill until charred edges appear." },
                { title: "Makhani Gravy Synthesis", reason: "Butter and cream must be emulsified without splitting.", desc: "Simmer tomatoes with cashews. Strain carefully to achieve a velvet texture." },
                { title: "The Union", reason: "Bringing the charred chicken and silk gravy together.", desc: "Mix chicken into the gravy. Add large dollops of butter and cream. Finish with Kasuri Methi." }
              ],
              Review: [
                { title: "Silky Texture Audit", reason: "The gravy must be 'Makhani' (buttery).", desc: "Ensure no grainy tomato pieces remain. Adjust cream for richness." }
              ]
            }
          },
          {
            id: "dal_makhani",
            title: "Dal Makhani (Slow-Cooked Black Lentils)",
            goal: "Achieve the smoky, creamy consistency of authentic Punjabi slow-cooked dal.",
            gap: "Overnight slow-simmering mastery",
            pools: {
              Planning: [
                { title: "Legume Sourcing", reason: "Whole Urad Dal and Rajma must be aged correctly.", desc: "Source black grams and red kidney beans. Soak them for exactly 12 hours." }
              ],
              Execution: [
                { title: "The Initial Boil", reason: "Removing impurities ensures a clean flavor profile.", desc: "Pressure cook the lentils until soft. Mash 20% to create a thick base." },
                { title: "The 8-Hour Simmer", reason: "Time creates the deep smokey flavor better than any spice.", desc: "Simmer the lentils on low heat with ginger, garlic, and tomato puree for as long as possible." },
                { title: "Butter & Cream Integration", reason: "Authenticity requires high fat content.", desc: "Stir in 50g of white butter and 1/2 cup of fresh cream 15 minutes before serving." }
              ],
              Review: [
                { title: "Smokey Finish Analysis", reason: "Should have a 'dhungar' (charcoal smoke) hint.", desc: "Verify that the dal is thick and creamy, not watery." }
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
            pools: {
              Planning: [
                { title: "Rice-Lentil Ratio", reason: "The 3:1 ratio defines the crispiness.", desc: "Source parboiled rice and urad dal. Soak separately." }
              ],
              Execution: [
                { title: "Fermentation Vigil", reason: "Natural air-yeast creates the 'sour' tang.", desc: "Leave the ground batter in a warm place for 8-12 hours until it doubles in volume." },
                { title: "The Tawa Technique", reason: "Consistent thinness is the mark of a master.", desc: "Spread the batter in a circular motion on a medium-hot iron tawa. Use oil/ghee sparingly." },
                { title: "Aloo Podimas Filling", reason: "Potatoes must be flavorful but not overpowering.", desc: "Sauté boiled potatoes with mustard seeds, curry leaves, and turmeric." }
              ],
              Review: [
                { title: "Crispiness Test", reason: "Dosa should hold its shape.", desc: "Verify the underside is golden brown and the edges are paper-thin." }
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
            title: "Khaman Dhokla (Steamed Gram Cakes)",
            goal: "Master the aeration and tempering of sponge-like savory cakes.",
            gap: "Soda-acid reaction & steaming time",
            pools: {
              Planning: [
                { title: "Besan Quality Check", reason: "Fine-ground besan ensures even rising.", desc: "Source high-quality gram flour and ensure you have citric acid or lemon juice." }
              ],
              Execution: [
                { title: "The Aeration Trap", reason: "Whisking introduces air, creating the 'sponge' effect.", desc: "Whisk the batter clockwise for 5 minutes. Add fruit salt just before steaming." },
                { title: "The Final Tadka", reason: "Syrup must penetrate the cake without making it soggy.", desc: "Prepare a tempering of mustard seeds, sesame, and chilies in water/sugar. Pour over steamed cakes." }
              ],
              Review: [
                { title: "Bounce Analysis", reason: "Dhokla should be airy and moist.", desc: "Gently press the cake; it should spring back immediately." }
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
            title: "Laal Maas (Red Smoked Mutton)",
            goal: "Master the intense heat and smokey flavor of Rajasthan's warrior meal.",
            gap: "Mathania chili usage & smoke infusion",
            pools: {
              Planning: [
                { title: "Mathania Chili Hunt", reason: "Standard chilies cannot replicate the color or flavor profile.", desc: "Source authentic dried Mathania chilies. Soak them in warm water." }
              ],
              Execution: [
                { title: "Red Chili Paste", reason: "The color comes from the pulp, not the seeds.", desc: "Grind the soaked chilies into a fine, vibrant red paste." },
                { title: "Dhunger Technique", reason: "Adds the royal camp-fire smokey essence.", desc: "Place a burning charcoal in a bowl inside the cooking pot. Pour ghee over it and seal for 10 minutes." }
              ],
              Review: [
                { title: "Heat vs Flavor Balance", reason: "Should be spicy but not purely burning.", desc: "Ensure the mutton is tender and the oil has a deep red hue." }
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
            goal: "Execute the royal lamb dish using the traditional 'no onion, no garlic' Pandit style or Muslim style.",
            gap: "Maval flower infusion & yogurt base",
            pools: {
              Planning: [
                { title: "Archaic Spice Sourcing", reason: "Ratan Jot (alkanet root) or Maval (cockscomb) provides the color.", desc: "Find authentic Kashmiri cockscomb flowers or Ratan Jot root." }
              ],
              Execution: [
                { title: "Yogurt Tempering", reason: "Cold yogurt curdles; it must be whisked and added slowly.", desc: "Tempe the oil with fennel and ginger powder. Gradually whisk in the yogurt." },
                { title: "Color Extraction", reason: "The 'Rogan' (red oil) is the highlight.", desc: "Simmer the meat until the cockscomb flower extract turns the gravy into a deep crimson." }
              ],
              Review: [
                { title: "Aroma Audit", reason: "Should smell intensely of fennel and asafoetida.", desc: "Check that the meat is succulent and the gravy is aromatic." }
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
            pools: {
              Planning: [
                { title: "Component Scoping", reason: "Prevent refactors.", desc: "List all UI atoms and molecules." }
              ],
              Execution: [
                { title: "Logical Hook Synthesis", reason: "Separation of concerns.", desc: "Write custom hooks for data fetching." }
              ],
              Review: [
                { title: "Speed Audit", reason: "Production readiness.", desc: "Run Lighthouse check." }
              ]
            }
          }
        ]
      }
    ]
  }
];
