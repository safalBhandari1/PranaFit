// // src/features/projects/data/nepaliDietTemplates.ts
// import { ProjectTemplate, DailyWorkout, NepaliMeal } from '../types/project';
// import { 
//   getBreakfastOptions, 
//   getLunchOptions, 
//   getDinnerOptions,
//   getSnackOptions,
//   getShakeOptions 
// } from './nepaliFoods';

// export const NEPALI_DIET_TEMPLATES: ProjectTemplate[] = [
//   // ================= 1 MONTH WEIGHT LOSS =================
//   {
//     id: 'weight-loss-1month',
//     name: '1 Month Weight Loss Diet',
//     type: 'diet',
//     dietType: 'weight-loss',
//     duration: 30,
//     description: '३ पटक खाना (बिहान, दिउँसो, बेलुका), नियमित नेपाली खानाको संयोजन। प्रतिदिन १६०० क्यालोरी लक्ष्य।',
//     category: 'weight-loss',
//     difficulty: 2,
//     estimatedDuration: 0,
//     popularity: 0,
//     isFeatured: true,
//     author: 'PranaFit Nutrition',
//     focusAreas: ['Weight Loss', 'Healthy Eating'],
//     dailyCalorieTarget: 1600,
//     dailyProteinTarget: 70,
//     dailyCarbsTarget: 180,
//     dailyFatTarget: 50,
//     dailyWorkouts: generateWeightLossDays(30, 'weight-loss')
//   },

//   // ================= 3 MONTH WEIGHT LOSS =================
//   {
//     id: 'weight-loss-3months',
//     name: '3 Month Weight Loss Diet',
//     type: 'diet',
//     dietType: 'weight-loss',
//     duration: 90,
//     description: 'दीर्घकालीन तौल नियन्त्रणको लागि। धैर्य र नियमितताको साथ अनुसरण गर्नुहोस्।',
//     category: 'weight-loss',
//     difficulty: 3,
//     estimatedDuration: 0,
//     popularity: 0,
//     isFeatured: true,
//     author: 'PranaFit Nutrition',
//     focusAreas: ['Weight Loss', 'Long-term Health'],
//     dailyCalorieTarget: 1500,
//     dailyProteinTarget: 65,
//     dailyCarbsTarget: 170,
//     dailyFatTarget: 45,
//     dailyWorkouts: generateWeightLossDays(90, 'weight-loss')
//   },

//   // ================= 1 MONTH WEIGHT GAIN =================
//   {
//     id: 'weight-gain-1month',
//     name: '1 Month Weight Gain Diet',
//     type: 'diet',
//     dietType: 'weight-gain',
//     duration: 30,
//     description: '४-५ पटक खाना (बिहान, दिउँसो, नास्ता, बेलुका, प्रोटीन शेक)। उच्च प्रोटीन र क्यालोरी।',
//     category: 'muscle-building',
//     difficulty: 3,
//     estimatedDuration: 0,
//     popularity: 0,
//     isFeatured: true,
//     author: 'PranaFit Nutrition',
//     focusAreas: ['Weight Gain', 'Muscle Building'],
//     dailyCalorieTarget: 2800,
//     dailyProteinTarget: 120,
//     dailyCarbsTarget: 350,
//     dailyFatTarget: 80,
//     dailyWorkouts: generateWeightGainDays(30, 'weight-gain')
//   },

//   // ================= 3 MONTH WEIGHT GAIN =================
//   {
//     id: 'weight-gain-3months',
//     name: '3 Month Weight Gain Diet',
//     type: 'diet',
//     dietType: 'weight-gain',
//     duration: 90,
//     description: 'मांसपेशी निर्माण र तौल बढाउन दीर्घकालीन आहार योजना। क्रमिक रूपमा क्यालोरी बढाउनुहोस्।',
//     category: 'muscle-building',
//     difficulty: 4,
//     estimatedDuration: 0,
//     popularity: 0,
//     isFeatured: true,
//     author: 'PranaFit Nutrition',
//     focusAreas: ['Muscle Growth', 'Weight Gain'],
//     dailyCalorieTarget: 3000,
//     dailyProteinTarget: 130,
//     dailyCarbsTarget: 380,
//     dailyFatTarget: 85,
//     dailyWorkouts: generateWeightGainDays(90, 'weight-gain')
//   }
// ];

// // Helper function to generate weight loss days
// function generateWeightLossDays(duration: number, dietType: 'weight-loss'): DailyWorkout[] {
//   const days: DailyWorkout[] = [];
  
//   for (let i = 0; i < duration; i++) {
//     const dayDate = new Date();
//     dayDate.setDate(dayDate.getDate() + i);
    
//     // Get 3 options for each meal
//     const breakfastOptions = getBreakfastOptions(dietType);
//     const lunchOptions = getLunchOptions(dietType);
//     const dinnerOptions = getDinnerOptions(dietType);
    
//     const meals: NepaliMeal[] = [
//       {
//         id: `day${i}_breakfast`,
//         time: 'breakfast',
//         name: 'बिहानको खाना',
//         options: breakfastOptions.map(food => ({
//           id: food.id,
//           nepaliName: food.nepaliName,
//           englishName: food.englishName,
//           description: food.description,
//           calories: food.calories,
//           protein: food.protein,
//           carbs: food.carbs,
//           fat: food.fat
//         })),
//         selectedOptionId: null,
//         completed: false
//       },
//       {
//         id: `day${i}_lunch`,
//         time: 'lunch',
//         name: 'दिउँसोको खाना',
//         options: lunchOptions.map(food => ({
//           id: food.id,
//           nepaliName: food.nepaliName,
//           englishName: food.englishName,
//           description: food.description,
//           calories: food.calories,
//           protein: food.protein,
//           carbs: food.carbs,
//           fat: food.fat
//         })),
//         selectedOptionId: null,
//         completed: false
//       },
//       {
//         id: `day${i}_dinner`,
//         time: 'dinner',
//         name: 'बेलुकाको खाना',
//         options: dinnerOptions.map(food => ({
//           id: food.id,
//           nepaliName: food.nepaliName,
//           englishName: food.englishName,
//           description: food.description,
//           calories: food.calories,
//           protein: food.protein,
//           carbs: food.carbs,
//           fat: food.fat
//         })),
//         selectedOptionId: null,
//         completed: false
//       }
//     ];
    
//     days.push({
//       dayIndex: i,
//       name: `दिन ${i + 1}`,
//       date: dayDate,
//       completed: false,
//       activities: [], // No workouts for diet projects
//       meals,
//       totalCalories: 0,
//       totalProtein: 0,
//       totalCarbs: 0,
//       totalFat: 0,
//       allMealsCompleted: false
//     });
//   }
  
//   return days;
// }

// // Helper function to generate weight gain days
// function generateWeightGainDays(duration: number, dietType: 'weight-gain'): DailyWorkout[] {
//   const days: DailyWorkout[] = [];
  
//   for (let i = 0; i < duration; i++) {
//     const dayDate = new Date();
//     dayDate.setDate(dayDate.getDate() + i);
    
//     // Get options for each meal type
//     const breakfastOptions = getBreakfastOptions(dietType);
//     const lunchOptions = getLunchOptions(dietType);
//     const dinnerOptions = getDinnerOptions(dietType);
//     const snackOptions = getSnackOptions();
//     const shakeOptions = getShakeOptions();
    
//     const meals: NepaliMeal[] = [
//       {
//         id: `day${i}_breakfast`,
//         time: 'breakfast',
//         name: 'बिहानको खाना',
//         options: breakfastOptions.map(food => ({
//           id: food.id,
//           nepaliName: food.nepaliName,
//           englishName: food.englishName,
//           description: food.description,
//           calories: food.calories,
//           protein: food.protein,
//           carbs: food.carbs,
//           fat: food.fat
//         })),
//         selectedOptionId: null,
//         completed: false
//       },
//       {
//         id: `day${i}_lunch`,
//         time: 'lunch',
//         name: 'दिउँसोको खाना',
//         options: lunchOptions.map(food => ({
//           id: food.id,
//           nepaliName: food.nepaliName,
//           englishName: food.englishName,
//           description: food.description,
//           calories: food.calories,
//           protein: food.protein,
//           carbs: food.carbs,
//           fat: food.fat
//         })),
//         selectedOptionId: null,
//         completed: false
//       },
//       {
//         id: `day${i}_snack`,
//         time: 'snack',
//         name: 'नास्ता',
//         options: snackOptions.map(food => ({
//           id: food.id,
//           nepaliName: food.nepaliName,
//           englishName: food.englishName,
//           description: food.description,
//           calories: food.calories,
//           protein: food.protein,
//           carbs: food.carbs,
//           fat: food.fat
//         })),
//         selectedOptionId: null,
//         completed: false
//       },
//       {
//         id: `day${i}_dinner`,
//         time: 'dinner',
//         name: 'बेलुकाको खाना',
//         options: dinnerOptions.map(food => ({
//           id: food.id,
//           nepaliName: food.nepaliName,
//           englishName: food.englishName,
//           description: food.description,
//           calories: food.calories,
//           protein: food.protein,
//           carbs: food.carbs,
//           fat: food.fat
//         })),
//         selectedOptionId: null,
//         completed: false
//       },
//       {
//         id: `day${i}_shake`,
//         time: 'shake',
//         name: 'प्रोटीन शेक',
//         options: shakeOptions.map(food => ({
//           id: food.id,
//           nepaliName: food.nepaliName,
//           englishName: food.englishName,
//           description: food.description,
//           calories: food.calories,
//           protein: food.protein,
//           carbs: food.carbs,
//           fat: food.fat
//         })),
//         selectedOptionId: null,
//         completed: false
//       }
//     ];
    
//     days.push({
//       dayIndex: i,
//       name: `दिन ${i + 1}`,
//       date: dayDate,
//       completed: false,
//       activities: [], // No workouts for diet projects
//       meals,
//       totalCalories: 0,
//       totalProtein: 0,
//       totalCarbs: 0,
//       totalFat: 0,
//       allMealsCompleted: false
//     });
//   }
  
//   return days;
// }

// // Export helper functions
// export { 
//   generateWeightLossDays, 
//   generateWeightGainDays 
// };

// src/features/projects/data/nepaliDietTemplates.ts
import { ProjectTemplate, DailyWorkout, NepaliMeal } from '../types/project';
import { 
  getBreakfastOptions, 
  getLunchOptions, 
  getDinnerOptions,
  getSnackOptions,
  getShakeOptions 
} from './nepaliFoods';

export const NEPALI_DIET_TEMPLATES: ProjectTemplate[] = [
  // ================= 1 MONTH WEIGHT LOSS =================
  {
    id: 'weight-loss-1month',
    name: '1 Month Weight Loss Diet',
    type: 'diet',
    dietType: 'weight-loss',
    duration: 30,
    description: '3 meals per day (breakfast, lunch, dinner), regular Nepali food combinations. Daily target: 1600 calories.',
    category: 'weight-loss',
    difficulty: 2,
    estimatedDuration: 0,
    popularity: 0,
    isFeatured: true,
    author: 'PranaFit Nutrition',
    focusAreas: ['Weight Loss', 'Healthy Eating'],
    dailyCalorieTarget: 1600,
    dailyProteinTarget: 70,
    dailyCarbsTarget: 180,
    dailyFatTarget: 50,
    dailyWorkouts: generateWeightLossDays(30, 'weight-loss')
  },

  // ================= 3 MONTH WEIGHT LOSS =================
  {
    id: 'weight-loss-3months',
    name: '3 Month Weight Loss Diet',
    type: 'diet',
    dietType: 'weight-loss',
    duration: 90,
    description: 'Long-term weight control diet. Follow with patience and regularity.',
    category: 'weight-loss',
    difficulty: 3,
    estimatedDuration: 0,
    popularity: 0,
    isFeatured: true,
    author: 'PranaFit Nutrition',
    focusAreas: ['Weight Loss', 'Long-term Health'],
    dailyCalorieTarget: 1500,
    dailyProteinTarget: 65,
    dailyCarbsTarget: 170,
    dailyFatTarget: 45,
    dailyWorkouts: generateWeightLossDays(90, 'weight-loss')
  },

  // ================= 1 MONTH WEIGHT GAIN =================
  {
    id: 'weight-gain-1month',
    name: '1 Month Weight Gain Diet',
    type: 'diet',
    dietType: 'weight-gain',
    duration: 30,
    description: '4-5 meals per day (breakfast, lunch, snack, dinner, protein shake). High protein and calories.',
    category: 'muscle-building',
    difficulty: 3,
    estimatedDuration: 0,
    popularity: 0,
    isFeatured: true,
    author: 'PranaFit Nutrition',
    focusAreas: ['Weight Gain', 'Muscle Building'],
    dailyCalorieTarget: 2800,
    dailyProteinTarget: 120,
    dailyCarbsTarget: 350,
    dailyFatTarget: 80,
    dailyWorkouts: generateWeightGainDays(30, 'weight-gain')
  },

  // ================= 3 MONTH WEIGHT GAIN =================
  {
    id: 'weight-gain-3months',
    name: '3 Month Weight Gain Diet',
    type: 'diet',
    dietType: 'weight-gain',
    duration: 90,
    description: 'Long-term diet plan for muscle building and weight gain. Gradually increase calories.',
    category: 'muscle-building',
    difficulty: 4,
    estimatedDuration: 0,
    popularity: 0,
    isFeatured: true,
    author: 'PranaFit Nutrition',
    focusAreas: ['Muscle Growth', 'Weight Gain'],
    dailyCalorieTarget: 3000,
    dailyProteinTarget: 130,
    dailyCarbsTarget: 380,
    dailyFatTarget: 85,
    dailyWorkouts: generateWeightGainDays(90, 'weight-gain')
  }
];

// Helper function to generate weight loss days
function generateWeightLossDays(duration: number, dietType: 'weight-loss'): DailyWorkout[] {
  const days: DailyWorkout[] = [];
  
  for (let i = 0; i < duration; i++) {
    const dayDate = new Date();
    dayDate.setDate(dayDate.getDate() + i);
    
    // Get 3 options for each meal
    const breakfastOptions = getBreakfastOptions(dietType);
    const lunchOptions = getLunchOptions(dietType);
    const dinnerOptions = getDinnerOptions(dietType);
    
    const meals: NepaliMeal[] = [
      {
        id: `day${i}_breakfast`,
        time: 'breakfast',
        name: 'Breakfast',  // ✅ CHANGED: English name
        options: breakfastOptions.map(food => ({
          id: food.id,
          name: food.name,  // ✅ CHANGED: Use name field
          description: food.description,
          calories: food.calories,
          protein: food.protein,
          carbs: food.carbs,
          fat: food.fat
        })),
        selectedOptionId: null,
        completed: false
      },
      {
        id: `day${i}_lunch`,
        time: 'lunch',
        name: 'Lunch',  // ✅ CHANGED: English name
        options: lunchOptions.map(food => ({
          id: food.id,
          name: food.name,  // ✅ CHANGED: Use name field
          description: food.description,
          calories: food.calories,
          protein: food.protein,
          carbs: food.carbs,
          fat: food.fat
        })),
        selectedOptionId: null,
        completed: false
      },
      {
        id: `day${i}_dinner`,
        time: 'dinner',
        name: 'Dinner',  // ✅ CHANGED: English name
        options: dinnerOptions.map(food => ({
          id: food.id,
          name: food.name,  // ✅ CHANGED: Use name field
          description: food.description,
          calories: food.calories,
          protein: food.protein,
          carbs: food.carbs,
          fat: food.fat
        })),
        selectedOptionId: null,
        completed: false
      }
    ];
    
    days.push({
      dayIndex: i,
      name: `Day ${i + 1}`,  // ✅ CHANGED: English name
      date: dayDate,
      completed: false,
      activities: [], // No workouts for diet projects
      meals,
      totalCalories: 0,
      totalProtein: 0,
      totalCarbs: 0,
      totalFat: 0,
      allMealsCompleted: false
    });
  }
  
  return days;
}

// Helper function to generate weight gain days
function generateWeightGainDays(duration: number, dietType: 'weight-gain'): DailyWorkout[] {
  const days: DailyWorkout[] = [];
  
  for (let i = 0; i < duration; i++) {
    const dayDate = new Date();
    dayDate.setDate(dayDate.getDate() + i);
    
    // Get options for each meal type
    const breakfastOptions = getBreakfastOptions(dietType);
    const lunchOptions = getLunchOptions(dietType);
    const dinnerOptions = getDinnerOptions(dietType);
    const snackOptions = getSnackOptions();
    const shakeOptions = getShakeOptions();
    
    const meals: NepaliMeal[] = [
      {
        id: `day${i}_breakfast`,
        time: 'breakfast',
        name: 'Breakfast',  // ✅ CHANGED: English name
        options: breakfastOptions.map(food => ({
          id: food.id,
          name: food.name,  // ✅ CHANGED: Use name field
          description: food.description,
          calories: food.calories,
          protein: food.protein,
          carbs: food.carbs,
          fat: food.fat
        })),
        selectedOptionId: null,
        completed: false
      },
      {
        id: `day${i}_lunch`,
        time: 'lunch',
        name: 'Lunch',  // ✅ CHANGED: English name
        options: lunchOptions.map(food => ({
          id: food.id,
          name: food.name,  // ✅ CHANGED: Use name field
          description: food.description,
          calories: food.calories,
          protein: food.protein,
          carbs: food.carbs,
          fat: food.fat
        })),
        selectedOptionId: null,
        completed: false
      },
      {
        id: `day${i}_snack`,
        time: 'snack',
        name: 'Snack',  // ✅ CHANGED: English name
        options: snackOptions.map(food => ({
          id: food.id,
          name: food.name,  // ✅ CHANGED: Use name field
          description: food.description,
          calories: food.calories,
          protein: food.protein,
          carbs: food.carbs,
          fat: food.fat
        })),
        selectedOptionId: null,
        completed: false
      },
      {
        id: `day${i}_dinner`,
        time: 'dinner',
        name: 'Dinner',  // ✅ CHANGED: English name
        options: dinnerOptions.map(food => ({
          id: food.id,
          name: food.name,  // ✅ CHANGED: Use name field
          description: food.description,
          calories: food.calories,
          protein: food.protein,
          carbs: food.carbs,
          fat: food.fat
        })),
        selectedOptionId: null,
        completed: false
      },
      {
        id: `day${i}_shake`,
        time: 'shake',
        name: 'Protein Shake',  // ✅ CHANGED: English name
        options: shakeOptions.map(food => ({
          id: food.id,
          name: food.name,  // ✅ CHANGED: Use name field
          description: food.description,
          calories: food.calories,
          protein: food.protein,
          carbs: food.carbs,
          fat: food.fat
        })),
        selectedOptionId: null,
        completed: false
      }
    ];
    
    days.push({
      dayIndex: i,
      name: `Day ${i + 1}`,  // ✅ CHANGED: English name
      date: dayDate,
      completed: false,
      activities: [], // No workouts for diet projects
      meals,
      totalCalories: 0,
      totalProtein: 0,
      totalCarbs: 0,
      totalFat: 0,
      allMealsCompleted: false
    });
  }
  
  return days;
}

// Export helper functions
export { 
  generateWeightLossDays, 
  generateWeightGainDays 
};