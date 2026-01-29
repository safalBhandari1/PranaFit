// // src/features/projects/data/nepaliFoods.ts
// export interface NepaliFoodItem {
//     id: string;
//     nepaliName: string;
//     englishName: string;
//     description: string;
//     calories: number;
//     protein: number;  // grams
//     carbs: number;    // grams
//     fat: number;      // grams
//     category: 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'shake';
//     suitableFor: ('weight-loss' | 'weight-gain')[];
//   }
  
//   export const NEPALI_FOODS: NepaliFoodItem[] = [
//     // ================= BREAKFAST ITEMS =================
//     {
//       id: 'chiura-banana',
//       nepaliName: 'चिउरा र केरा',
//       englishName: 'Beaten Rice with Banana',
//       description: '१ कप चिउरा, १ वटा केरा, अलिकति चिनी',
//       calories: 250,
//       protein: 4,
//       carbs: 55,
//       fat: 1,
//       category: 'breakfast',
//       suitableFor: ['weight-loss', 'weight-gain']
//     },
//     {
//       id: 'sel-roti-tea',
//       nepaliName: 'सेल रोटी र चिया',
//       englishName: 'Sel Roti with Tea',
//       description: '२ वटा सेल रोटी, १ कप चिया (चिनी नभएको)',
//       calories: 280,
//       protein: 5,
//       carbs: 58,
//       fat: 3,
//       category: 'breakfast',
//       suitableFor: ['weight-loss', 'weight-gain']
//     },
//     {
//       id: 'eggs-toast',
//       nepaliName: 'अण्डा र टोस्ट',
//       englishName: 'Eggs and Toast',
//       description: '२ वटा उकाल्नुअण्डा, २ टुक्रा पुरै अन्नको टोस्ट',
//       calories: 320,
//       protein: 18,
//       carbs: 30,
//       fat: 12,
//       category: 'breakfast',
//       suitableFor: ['weight-gain']
//     },
//     {
//       id: 'oats-milk',
//       nepaliName: 'ओट्स र दुध',
//       englishName: 'Oats with Milk',
//       description: '५० ग्राम ओट्स, १ कप दुध, अलिकति अखरोट',
//       calories: 300,
//       protein: 15,
//       carbs: 45,
//       fat: 8,
//       category: 'breakfast',
//       suitableFor: ['weight-loss', 'weight-gain']
//     },
  
//     // ================= LUNCH ITEMS =================
//     {
//       id: 'dal-bhat-saag',
//       nepaliName: 'दाल भात र साग',
//       englishName: 'Lentils, Rice and Greens',
//       description: '१ कप भात, १ कप दाल, १ कप सागको तरकारी',
//       calories: 400,
//       protein: 18,
//       carbs: 70,
//       fat: 5,
//       category: 'lunch',
//       suitableFor: ['weight-loss', 'weight-gain']
//     },
//     {
//       id: 'masura-dal-chamal',
//       nepaliName: 'मसुरा दाल र चामल',
//       englishName: 'Red Lentils and Rice',
//       description: '१ कप भात, १ कप मसुरा दाल, सानो तरकारी',
//       calories: 380,
//       protein: 20,
//       carbs: 65,
//       fat: 4,
//       category: 'lunch',
//       suitableFor: ['weight-loss']
//     },
//     {
//       id: 'chicken-rice-veggies',
//       nepaliName: 'कुखुराको मासु, भात र तरकारी',
//       englishName: 'Chicken, Rice and Vegetables',
//       description: '१५० ग्राम कुखुराको मासु, १ कप भात, मिश्रित तरकारी',
//       calories: 450,
//       protein: 35,
//       carbs: 50,
//       fat: 12,
//       category: 'lunch',
//       suitableFor: ['weight-gain']
//     },
//     {
//       id: 'vegetable-curry-rice',
//       nepaliName: 'तरकारीको करी र भात',
//       englishName: 'Vegetable Curry with Rice',
//       description: 'मिश्रित तरकारीको करी, १ कप भात, दही',
//       calories: 350,
//       protein: 12,
//       carbs: 60,
//       fat: 7,
//       category: 'lunch',
//       suitableFor: ['weight-loss']
//     },
  
//     // ================= DINNER ITEMS =================
//     {
//       id: 'chicken-tarkari-bhat',
//       nepaliName: 'चिकन तरकारी र भात',
//       englishName: 'Chicken Curry with Rice',
//       description: '१२५ ग्राम चिकन, १ कप भात, सागको तरकारी',
//       calories: 450,
//       protein: 30,
//       carbs: 50,
//       fat: 15,
//       category: 'dinner',
//       suitableFor: ['weight-loss', 'weight-gain']
//     },
//     {
//       id: 'fish-curry-rice',
//       nepaliName: 'माछाको तरकारी र भात',
//       englishName: 'Fish Curry with Rice',
//       description: '१५० ग्राम माछा, १ कप भात, निम्न तेलको तरकारी',
//       calories: 400,
//       protein: 28,
//       carbs: 45,
//       fat: 10,
//       category: 'dinner',
//       suitableFor: ['weight-loss']
//     },
//     {
//       id: 'paneer-sabzi-rotli',
//       nepaliName: 'पनीर सब्जी र रोटली',
//       englishName: 'Paneer Sabzi with Rotli',
//       description: '१०० ग्राम पनीर, २ वटा रोटली, सलाद',
//       calories: 380,
//       protein: 25,
//       carbs: 40,
//       fat: 12,
//       category: 'dinner',
//       suitableFor: ['weight-loss', 'weight-gain']
//     },
//     {
//       id: 'mutton-curry-rice',
//       nepaliName: 'भेडाको मासु र भात',
//       englishName: 'Mutton Curry with Rice',
//       description: '१०० ग्राम भेडाको मासु, १ कप भात, तरकारी',
//       calories: 500,
//       protein: 32,
//       carbs: 55,
//       fat: 18,
//       category: 'dinner',
//       suitableFor: ['weight-gain']
//     },
  
//     // ================= SNACK ITEMS (for weight gain) =================
//     {
//       id: 'samosa',
//       nepaliName: 'समोसा',
//       englishName: 'Samosa',
//       description: '२ वटा समोसा (आलु भरिएको)',
//       calories: 150,
//       protein: 3,
//       carbs: 20,
//       fat: 7,
//       category: 'snack',
//       suitableFor: ['weight-gain']
//     },
//     {
//       id: 'chatpate',
//       nepaliName: 'चटपटे',
//       englishName: 'Spicy Snack Mix',
//       description: 'चटपटे मिश्रण (चिउरा, भुट, मास)',
//       calories: 120,
//       protein: 5,
//       carbs: 20,
//       fat: 3,
//       category: 'snack',
//       suitableFor: ['weight-gain']
//     },
//     {
//       id: 'fruits-yogurt',
//       nepaliName: 'फलफूल र दही',
//       englishName: 'Fruits with Yogurt',
//       description: '१ कप मिश्रित फल, १ कप दही',
//       calories: 180,
//       protein: 8,
//       carbs: 30,
//       fat: 2,
//       category: 'snack',
//       suitableFor: ['weight-loss', 'weight-gain']
//     },
//     {
//       id: 'nuts-mix',
//       nepaliName: 'नट्स मिश्रण',
//       englishName: 'Mixed Nuts',
//       description: 'अखरोट, बादाम, काजु मिश्रण (३० ग्राम)',
//       calories: 200,
//       protein: 6,
//       carbs: 8,
//       fat: 18,
//       category: 'snack',
//       suitableFor: ['weight-gain']
//     },
  
//     // ================= PROTEIN SHAKES (for weight gain) =================
//     {
//       id: 'whey-protein-shake',
//       nepaliName: 'व्हे प्रोटीन शेक',
//       englishName: 'Whey Protein Shake',
//       description: '१ स्कुप व्हे प्रोटीन, १ कप दुध, केरा',
//       calories: 320,
//       protein: 35,
//       carbs: 30,
//       fat: 5,
//       category: 'shake',
//       suitableFor: ['weight-gain']
//     },
//     {
//       id: 'mass-gainer-shake',
//       nepaliName: 'मास गेनर शेक',
//       englishName: 'Mass Gainer Shake',
//       description: 'मास गेनर पाउडर, दुध, अखरोट, केरा',
//       calories: 450,
//       protein: 25,
//       carbs: 60,
//       fat: 10,
//       category: 'shake',
//       suitableFor: ['weight-gain']
//     },
//     {
//       id: 'milk-banana-shake',
//       nepaliName: 'दुध र केराको शेक',
//       englishName: 'Milk Banana Shake',
//       description: '२ कप दुध, २ वटा केरा, अलिकति मौवा',
//       calories: 350,
//       protein: 15,
//       carbs: 50,
//       fat: 8,
//       category: 'shake',
//       suitableFor: ['weight-gain']
//     },
//     {
//       id: 'peanut-butter-shake',
//       nepaliName: 'पीनट बटर शेक',
//       englishName: 'Peanut Butter Shake',
//       description: 'दुध, पीनट बटर, प्रोटीन पाउडर, ओट्स',
//       calories: 400,
//       protein: 28,
//       carbs: 35,
//       fat: 15,
//       category: 'shake',
//       suitableFor: ['weight-gain']
//     }
//   ];
  
//   // Helper functions to get foods by category
//   export const getBreakfastOptions = (dietType: 'weight-loss' | 'weight-gain'): NepaliFoodItem[] => {
//     return NEPALI_FOODS.filter(food => 
//       food.category === 'breakfast' && food.suitableFor.includes(dietType)
//     ).slice(0, 3); // Return 3 options
//   };
  
//   export const getLunchOptions = (dietType: 'weight-loss' | 'weight-gain'): NepaliFoodItem[] => {
//     return NEPALI_FOODS.filter(food => 
//       food.category === 'lunch' && food.suitableFor.includes(dietType)
//     ).slice(0, 3);
//   };
  
//   export const getDinnerOptions = (dietType: 'weight-loss' | 'weight-gain'): NepaliFoodItem[] => {
//     return NEPALI_FOODS.filter(food => 
//       food.category === 'dinner' && food.suitableFor.includes(dietType)
//     ).slice(0, 3);
//   };
  
//   export const getSnackOptions = (): NepaliFoodItem[] => {
//     return NEPALI_FOODS.filter(food => food.category === 'snack').slice(0, 2);
//   };
  
//   export const getShakeOptions = (): NepaliFoodItem[] => {
//     return NEPALI_FOODS.filter(food => food.category === 'shake').slice(0, 2);
//   };

// src/features/projects/data/nepaliFoods.ts
export interface NepaliFoodItem {
    id: string;
    name: string;           // Simple English name for display
    description: string;    // English description
    calories: number;
    protein: number;       // grams
    carbs: number;        // grams
    fat: number;          // grams
    category: 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'shake';
    suitableFor: ('weight-loss' | 'weight-gain')[];
  }
  
  export const NEPALI_FOODS: NepaliFoodItem[] = [
    // ================= BREAKFAST ITEMS =================
    {
      id: 'chiura-banana',
      name: 'Beaten Rice with Banana',
      description: '1 cup beaten rice, 1 banana, little sugar - Light traditional breakfast',
      calories: 250,
      protein: 4,
      carbs: 55,
      fat: 1,
      category: 'breakfast',
      suitableFor: ['weight-loss', 'weight-gain']
    },
    {
      id: 'sel-roti-tea',
      name: 'Sel Roti with Tea',
      description: '2 sel roti (rice donuts) with unsweetened tea',
      calories: 280,
      protein: 5,
      carbs: 58,
      fat: 3,
      category: 'breakfast',
      suitableFor: ['weight-loss', 'weight-gain']
    },
    {
      id: 'eggs-toast',
      name: 'Eggs and Toast',
      description: '2 boiled eggs with 2 slices of whole wheat toast',
      calories: 320,
      protein: 18,
      carbs: 30,
      fat: 12,
      category: 'breakfast',
      suitableFor: ['weight-gain']
    },
    {
      id: 'oats-milk',
      name: 'Oats with Milk',
      description: '50g oats with 1 cup milk and some walnuts',
      calories: 300,
      protein: 15,
      carbs: 45,
      fat: 8,
      category: 'breakfast',
      suitableFor: ['weight-loss', 'weight-gain']
    },
  
    // ================= LUNCH ITEMS =================
    {
      id: 'dal-bhat-saag',
      name: 'Lentils, Rice and Greens',
      description: '1 cup rice, 1 cup lentil soup, 1 cup spinach curry',
      calories: 400,
      protein: 18,
      carbs: 70,
      fat: 5,
      category: 'lunch',
      suitableFor: ['weight-loss', 'weight-gain']
    },
    {
      id: 'masura-dal-chamal',
      name: 'Red Lentils and Rice',
      description: '1 cup rice with 1 cup red lentil soup and vegetable side',
      calories: 380,
      protein: 20,
      carbs: 65,
      fat: 4,
      category: 'lunch',
      suitableFor: ['weight-loss']
    },
    {
      id: 'chicken-rice-veggies',
      name: 'Chicken, Rice and Vegetables',
      description: '150g chicken, 1 cup rice, mixed vegetable curry',
      calories: 450,
      protein: 35,
      carbs: 50,
      fat: 12,
      category: 'lunch',
      suitableFor: ['weight-gain']
    },
    {
      id: 'vegetable-curry-rice',
      name: 'Vegetable Curry with Rice',
      description: 'Mixed vegetable curry with 1 cup rice and yogurt',
      calories: 350,
      protein: 12,
      carbs: 60,
      fat: 7,
      category: 'lunch',
      suitableFor: ['weight-loss']
    },
  
    // ================= DINNER ITEMS =================
    {
      id: 'chicken-tarkari-bhat',
      name: 'Chicken Curry with Rice',
      description: '125g chicken curry, 1 cup rice, spinach side dish',
      calories: 450,
      protein: 30,
      carbs: 50,
      fat: 15,
      category: 'dinner',
      suitableFor: ['weight-loss', 'weight-gain']
    },
    {
      id: 'fish-curry-rice',
      name: 'Fish Curry with Rice',
      description: '150g fish curry with 1 cup rice, low-oil vegetable',
      calories: 400,
      protein: 28,
      carbs: 45,
      fat: 10,
      category: 'dinner',
      suitableFor: ['weight-loss']
    },
    {
      id: 'paneer-sabzi-rotli',
      name: 'Paneer Sabzi with Rotli',
      description: '100g paneer curry, 2 rotli (flatbread), salad',
      calories: 380,
      protein: 25,
      carbs: 40,
      fat: 12,
      category: 'dinner',
      suitableFor: ['weight-loss', 'weight-gain']
    },
    {
      id: 'mutton-curry-rice',
      name: 'Mutton Curry with Rice',
      description: '100g mutton curry, 1 cup rice, vegetable side',
      calories: 500,
      protein: 32,
      carbs: 55,
      fat: 18,
      category: 'dinner',
      suitableFor: ['weight-gain']
    },
  
    // ================= SNACK ITEMS (for weight gain) =================
    {
      id: 'samosa',
      name: 'Samosa',
      description: '2 samosas (potato filled) with chutney',
      calories: 150,
      protein: 3,
      carbs: 20,
      fat: 7,
      category: 'snack',
      suitableFor: ['weight-gain']
    },
    {
      id: 'chatpate',
      name: 'Spicy Snack Mix',
      description: 'Spicy mix of beaten rice, puffed rice, and beans',
      calories: 120,
      protein: 5,
      carbs: 20,
      fat: 3,
      category: 'snack',
      suitableFor: ['weight-gain']
    },
    {
      id: 'fruits-yogurt',
      name: 'Fruits with Yogurt',
      description: '1 cup mixed fruits with 1 cup yogurt',
      calories: 180,
      protein: 8,
      carbs: 30,
      fat: 2,
      category: 'snack',
      suitableFor: ['weight-loss', 'weight-gain']
    },
    {
      id: 'nuts-mix',
      name: 'Mixed Nuts',
      description: '30g mixed nuts (walnuts, almonds, cashews)',
      calories: 200,
      protein: 6,
      carbs: 8,
      fat: 18,
      category: 'snack',
      suitableFor: ['weight-gain']
    },
  
    // ================= PROTEIN SHAKES (for weight gain) =================
    {
      id: 'whey-protein-shake',
      name: 'Whey Protein Shake',
      description: '1 scoop whey protein, 1 cup milk, banana',
      calories: 320,
      protein: 35,
      carbs: 30,
      fat: 5,
      category: 'shake',
      suitableFor: ['weight-gain']
    },
    {
      id: 'mass-gainer-shake',
      name: 'Mass Gainer Shake',
      description: 'Mass gainer powder, milk, walnuts, banana',
      calories: 450,
      protein: 25,
      carbs: 60,
      fat: 10,
      category: 'shake',
      suitableFor: ['weight-gain']
    },
    {
      id: 'milk-banana-shake',
      name: 'Milk Banana Shake',
      description: '2 cups milk, 2 bananas, little honey',
      calories: 350,
      protein: 15,
      carbs: 50,
      fat: 8,
      category: 'shake',
      suitableFor: ['weight-gain']
    },
    {
      id: 'peanut-butter-shake',
      name: 'Peanut Butter Shake',
      description: 'Milk, peanut butter, protein powder, oats',
      calories: 400,
      protein: 28,
      carbs: 35,
      fat: 15,
      category: 'shake',
      suitableFor: ['weight-gain']
    }
  ];
  
  // Helper functions to get foods by category
  export const getBreakfastOptions = (dietType: 'weight-loss' | 'weight-gain'): NepaliFoodItem[] => {
    return NEPALI_FOODS.filter(food => 
      food.category === 'breakfast' && food.suitableFor.includes(dietType)
    ).slice(0, 3); // Return 3 options
  };
  
  export const getLunchOptions = (dietType: 'weight-loss' | 'weight-gain'): NepaliFoodItem[] => {
    return NEPALI_FOODS.filter(food => 
      food.category === 'lunch' && food.suitableFor.includes(dietType)
    ).slice(0, 3);
  };
  
  export const getDinnerOptions = (dietType: 'weight-loss' | 'weight-gain'): NepaliFoodItem[] => {
    return NEPALI_FOODS.filter(food => 
      food.category === 'dinner' && food.suitableFor.includes(dietType)
    ).slice(0, 3);
  };
  
  export const getSnackOptions = (): NepaliFoodItem[] => {
    return NEPALI_FOODS.filter(food => food.category === 'snack').slice(0, 2);
  };
  
  export const getShakeOptions = (): NepaliFoodItem[] => {
    return NEPALI_FOODS.filter(food => food.category === 'shake').slice(0, 2);
  };