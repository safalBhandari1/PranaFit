// // src/features/home/components/HighlightsCarousel.tsx
// import React from 'react';
// import { View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
// import { ThemeText } from '../../../shared/ui/ThemeText';
// import { useAppStore } from '../../../shared/stores/useAppStore';
// import { useWorkoutStore } from '../../workout/stores/useWorkoutStore';

// interface HighlightsCarouselProps {
//   theme: any;
// }

// const { width: SCREEN_WIDTH } = Dimensions.get('window');
// const CARD_WIDTH = SCREEN_WIDTH - 48;
// const CARD_HEIGHT = 200;

// const HighlightsCarousel: React.FC<HighlightsCarouselProps> = ({ theme }) => {
//   const { user } = useAppStore();
//   const { workoutStats, enhancedStats } = useWorkoutStore();

//   // Mock data for next workout
//   const nextWorkout = {
//     projectName: 'Strength Builder',
//     day: 3,
//     scheduledDate: 'Tomorrow, 6:00 PM',
//     type: 'GYM'
//   };

//   const getWorkoutTypeDistribution = () => {
//     if (!enhancedStats?.workoutTypeDistribution) return [];
    
//     return enhancedStats.workoutTypeDistribution
//       .slice(0, 3)
//       .map(type => ({
//         name: type.type,
//         percentage: type.percentage,
//         count: type.count
//       }));
//   };

//   const getWeeklyProgress = () => {
//     if (!workoutStats) return { current: 0, target: 4, percentage: 0 };
    
//     return {
//       current: workoutStats.workoutsThisWeek || 0,
//       target: 4,
//       percentage: Math.min(((workoutStats.workoutsThisWeek || 0) / 4) * 100, 100)
//     };
//   };

//   const workoutTypes = getWorkoutTypeDistribution();
//   const weeklyProgress = getWeeklyProgress();

//   const styles = {
//     container: {
//       marginTop: 8,
//       marginBottom: 12, // Reduced from 20 to decrease space below carousel
//     },
//     scrollView: {
//       paddingHorizontal: 16,
//     },
//     card: {
//       width: CARD_WIDTH,
//       height: CARD_HEIGHT,
//       borderRadius: 16,
//       paddingHorizontal: 24,
//       paddingTop: 20, // Separate top and bottom padding
//       paddingBottom: 20, // Added bottom padding
//       marginRight: 16,
//       shadowColor: '#000',
//       shadowOffset: { width: 0, height: 3 },
//       shadowOpacity: 0.12,
//       shadowRadius: 6,
//       elevation: 4,
//     },
//     cardTitle: {
//       fontSize: 14,
//       fontWeight: '600',
//       marginBottom: 16,
//       textTransform: 'uppercase',
//       letterSpacing: 0.5,
//     },
//     cardContent: {
//       flex: 1,
//       justifyContent: 'space-between',
//     },
//     workoutTypeItem: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       marginBottom: 14,
//     },
//     workoutTypeBar: {
//       height: 10,
//       borderRadius: 5,
//       marginRight: 12,
//       minWidth: 80,
//     },
//     progressBar: {
//       height: 10,
//       borderRadius: 5,
//       backgroundColor: `${theme.colors.border}50`,
//       overflow: 'hidden',
//       marginTop: 16,
//     },
//     progressFill: {
//       height: '100%',
//       borderRadius: 5,
//     },
//     indicatorContainer: {
//       flexDirection: 'row',
//       justifyContent: 'center',
//       marginTop: 16,
//     },
//     indicator: {
//       width: 8,
//       height: 8,
//       borderRadius: 4,
//       marginHorizontal: 4,
//     },
//     // New style for bottom text container
//     bottomTextContainer: {
//       marginTop: 8, // Add space above "Tap to view details"
//     },
//   };

//   const cards = [
//     {
//       title: 'Next Workout',
//       backgroundColor: `${theme.colors.primary}15`,
//       content: (
//         <View style={styles.cardContent as any}>
//           <View>
//             <ThemeText style={{ fontSize: 22, fontWeight: '700', marginBottom: 8, lineHeight: 28 }}>
//               {nextWorkout.projectName}
//             </ThemeText>
//             <ThemeText style={{ fontSize: 15, color: theme.colors.text.secondary, marginBottom: 12 }}>
//               Day {nextWorkout.day} • {nextWorkout.type}
//             </ThemeText>
//           </View>
//           <View style={styles.bottomTextContainer as any}>
//             <ThemeText style={{ fontSize: 15, fontWeight: '700', color: theme.colors.primary, marginBottom: 4 }}>
//               {nextWorkout.scheduledDate}
//             </ThemeText>
//             <ThemeText style={{ fontSize: 12, color: theme.colors.text.secondary, opacity: 0.8 }}>
//               Tap to view details
//             </ThemeText>
//           </View>
//         </View>
//       ),
//     },
//     {
//       title: 'Workout Types',
//       backgroundColor: `${theme.colors.accent}15`,
//       content: (
//         <View style={styles.cardContent as any}>
//           <View>
//             {workoutTypes.map((type, index) => (
//               <View key={index} style={styles.workoutTypeItem as any}>
//                 <View 
//                   style={[
//                     styles.workoutTypeBar as any, 
//                     { 
//                       width: `${type.percentage}%`,
//                       backgroundColor: index === 0 ? theme.colors.primary : 
//                                      index === 1 ? theme.colors.accent : 
//                                      theme.colors.success
//                     }
//                   ]} 
//                 />
//                 <View style={{ flex: 1 }}>
//                   <ThemeText style={{ fontSize: 14, fontWeight: '600', color: theme.colors.text.primary }}>
//                     {type.name}
//                   </ThemeText>
//                   <ThemeText style={{ fontSize: 12, color: theme.colors.text.secondary }}>
//                     {type.count} workouts • {type.percentage}%
//                   </ThemeText>
//                 </View>
//               </View>
//             ))}
//           </View>
//           <View style={styles.bottomTextContainer as any}>
//             <ThemeText style={{ fontSize: 12, color: theme.colors.text.secondary, textAlign: 'center' }}>
//               Your top workout types
//             </ThemeText>
//           </View>
//         </View>
//       ),
//     },
//     {
//       title: 'Weekly Progress',
//       backgroundColor: `${theme.colors.success}15`,
//       content: (
//         <View style={styles.cardContent as any}>
//           <View>
//             <ThemeText style={{ fontSize: 22, fontWeight: '700', marginBottom: 8, lineHeight: 28 }}>
//               {weeklyProgress.current}/{weeklyProgress.target} workouts
//             </ThemeText>
//             <ThemeText style={{ fontSize: 15, color: theme.colors.text.secondary, marginBottom: 12 }}>
//               {weeklyProgress.current === 0 ? 'Start your week strong! 💪' :
//                weeklyProgress.current >= weeklyProgress.target ? 'Week complete! 🎉' :
//                `${weeklyProgress.target - weeklyProgress.current} more to go`}
//             </ThemeText>
//             <View style={styles.progressBar as any}>
//               <View 
//                 style={[
//                   styles.progressFill as any, 
//                   { 
//                     width: `${weeklyProgress.percentage}%`,
//                     backgroundColor: weeklyProgress.percentage >= 100 ? theme.colors.success : 
//                                    weeklyProgress.percentage >= 50 ? theme.colors.primary : 
//                                    theme.colors.accent
//                   }
//                 ]} 
//               />
//             </View>
//           </View>
//           <View style={styles.bottomTextContainer as any}>
//             <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
//               <ThemeText style={{ fontSize: 12, color: theme.colors.text.secondary }}>
//                 {weeklyProgress.percentage}% complete
//               </ThemeText>
//               {weeklyProgress.percentage >= 100 && (
//                 <ThemeText style={{ fontSize: 12, fontWeight: '600', color: theme.colors.success }}>
//                   Goal achieved! 🏆
//                 </ThemeText>
//               )}
//             </View>
//           </View>
//         </View>
//       ),
//     },
//   ];

//   return (
//     <View style={styles.container as any}>
//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         style={styles.scrollView as any}
//         snapToInterval={CARD_WIDTH + 16}
//         decelerationRate="fast"
//       >
//         {cards.map((card, index) => (
//           <TouchableOpacity
//             key={index}
//             activeOpacity={0.85}
//             style={[
//               styles.card as any,
//               { backgroundColor: card.backgroundColor }
//             ]}
//           >
//             <ThemeText style={[styles.cardTitle as any, { color: theme.colors.text.secondary }]}>
//               {card.title}
//             </ThemeText>
//             {card.content}
//           </TouchableOpacity>
//         ))}
//       </ScrollView>
      
//       {/* Indicators */}
//       <View style={styles.indicatorContainer as any}>
//         {cards.map((_, index) => (
//           <View
//             key={index}
//             style={[
//               styles.indicator as any,
//               { 
//                 backgroundColor: index === 0 ? theme.colors.primary : 
//                                index === 1 ? theme.colors.accent : 
//                                theme.colors.success,
//                 opacity: 0.3
//               }
//             ]}
//           />
//         ))}
//       </View>
//     </View>
//   );
// };


// export default HighlightsCarousel;



// src/features/home/components/HighlightsCarousel.tsx
import React from 'react';
import { View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { ThemeText } from '../../../shared/ui/ThemeText';
import { useAppStore } from '../../../shared/stores/useAppStore';
import { useWorkoutStore } from '../../workout/stores/useWorkoutStore';

interface HighlightsCarouselProps {
  theme: any;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
// Keep width the same as before: SCREEN_WIDTH - 48
const CARD_WIDTH = SCREEN_WIDTH - 48;
// Increase height by 20%: from 180 to 216
const CARD_HEIGHT = 216;

const HighlightsCarousel: React.FC<HighlightsCarouselProps> = ({ theme }) => {
  const { user } = useAppStore();
  const { workoutStats, enhancedStats } = useWorkoutStore();

  // Mock data for next workout
  const nextWorkout = {
    projectName: 'Strength Builder',
    day: 3,
    scheduledDate: 'Tomorrow, 6:00 PM',
    type: 'GYM'
  };

  const getWorkoutTypeDistribution = () => {
    if (!enhancedStats?.workoutTypeDistribution) return [];
    
    return enhancedStats.workoutTypeDistribution
      .slice(0, 3)
      .map(type => ({
        name: type.type,
        percentage: type.percentage,
        count: type.count
      }));
  };

  const getWeeklyProgress = () => {
    if (!workoutStats) return { current: 0, target: 4, percentage: 0 };
    
    return {
      current: workoutStats.workoutsThisWeek || 0,
      target: 4,
      percentage: Math.min(((workoutStats.workoutsThisWeek || 0) / 4) * 100, 100)
    };
  };

  const workoutTypes = getWorkoutTypeDistribution();
  const weeklyProgress = getWeeklyProgress();

  const styles = {
    container: {
      marginTop: 8,
      marginBottom: 12,
    },
    scrollView: {
      paddingHorizontal: 16,
    },
    card: {
      width: CARD_WIDTH,
      height: CARD_HEIGHT, // 20% taller
      borderRadius: 16,
      paddingHorizontal: 24,
      paddingTop: 20,
      paddingBottom: 20,
      marginRight: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.12,
      shadowRadius: 6,
      elevation: 4,
      backgroundColor: '#FFEDD5', // Light orange for all cards
    },
    cardTitle: {
      fontSize: 14,
      fontWeight: '600',
      marginBottom: 16,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      color: '#92400E', // Dark orange text
    },
    cardContent: {
      flex: 1,
      justifyContent: 'space-between',
    },
    workoutTypeItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 14,
    },
    workoutTypeBar: {
      height: 10,
      borderRadius: 5,
      marginRight: 12,
      minWidth: 80,
    },
    progressBar: {
      height: 10,
      borderRadius: 5,
      backgroundColor: `${theme.colors.border}50`,
      overflow: 'hidden',
      marginTop: 16,
    },
    progressFill: {
      height: '100%',
      borderRadius: 5,
    },
    indicatorContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 16,
    },
    indicator: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginHorizontal: 4,
      backgroundColor: '#F97316', // Orange indicators
      opacity: 0.4,
    },
    // New style for bottom text container
    bottomTextContainer: {
      marginTop: 12, // Add space above "Tap to view details"
    },
  };

  const cards = [
    {
      title: 'Next Workout',
      backgroundColor: '#FFEDD5', // Light orange
      content: (
        <View style={styles.cardContent as any}>
          <View>
            <ThemeText style={{ fontSize: 22, fontWeight: '700', marginBottom: 8, lineHeight: 28, color: '#92400E' }}>
              {nextWorkout.projectName}
            </ThemeText>
            <ThemeText style={{ fontSize: 15, color: '#92400E', marginBottom: 12, opacity: 0.8 }}>
              Day {nextWorkout.day} • {nextWorkout.type}
            </ThemeText>
          </View>
          <View style={styles.bottomTextContainer as any}>
            <ThemeText style={{ fontSize: 15, fontWeight: '700', color: '#EA580C', marginBottom: 4 }}>
              {nextWorkout.scheduledDate}
            </ThemeText>
            <ThemeText style={{ fontSize: 12, color: '#92400E', opacity: 0.6 }}>
              Tap to view details
            </ThemeText>
          </View>
        </View>
      ),
    },
    {
      title: 'Workout Types',
      backgroundColor: '#FFEDD5', // Light orange
      content: (
        <View style={styles.cardContent as any}>
          <View>
            {workoutTypes.map((type, index) => (
              <View key={index} style={styles.workoutTypeItem as any}>
                <View 
                  style={[
                    styles.workoutTypeBar as any, 
                    { 
                      width: `${type.percentage}%`,
                      backgroundColor: index === 0 ? '#EA580C' : // Orange
                                     index === 1 ? '#F97316' : // Lighter orange
                                     '#FB923C' // Lightest orange
                    }
                  ]} 
                />
                <View style={{ flex: 1 }}>
                  <ThemeText style={{ fontSize: 14, fontWeight: '600', color: '#92400E' }}>
                    {type.name}
                  </ThemeText>
                  <ThemeText style={{ fontSize: 12, color: '#92400E', opacity: 0.8 }}>
                    {type.count} workouts • {type.percentage}%
                  </ThemeText>
                </View>
              </View>
            ))}
          </View>
          <View style={styles.bottomTextContainer as any}>
            <ThemeText style={{ fontSize: 12, color: '#92400E', textAlign: 'center', opacity: 0.6 }}>
              Your top workout types
            </ThemeText>
          </View>
        </View>
      ),
    },
    {
      title: 'Weekly Progress',
      backgroundColor: '#FFEDD5', // Light orange
      content: (
        <View style={styles.cardContent as any}>
          <View>
            <ThemeText style={{ fontSize: 22, fontWeight: '700', marginBottom: 8, lineHeight: 28, color: '#92400E' }}>
              {weeklyProgress.current}/{weeklyProgress.target} workouts
            </ThemeText>
            <ThemeText style={{ fontSize: 15, color: '#92400E', marginBottom: 12, opacity: 0.8 }}>
              {weeklyProgress.current === 0 ? 'Start your week strong! 💪' :
               weeklyProgress.current >= weeklyProgress.target ? 'Week complete! 🎉' :
               `${weeklyProgress.target - weeklyProgress.current} more to go`}
            </ThemeText>
            <View style={styles.progressBar as any}>
              <View 
                style={[
                  styles.progressFill as any, 
                  { 
                    width: `${weeklyProgress.percentage}%`,
                    backgroundColor: weeklyProgress.percentage >= 100 ? '#16A34A' : // Green for complete
                                   weeklyProgress.percentage >= 50 ? '#EA580C' : // Orange for halfway
                                   '#F97316' // Lighter orange for less than halfway
                  }
                ]} 
              />
            </View>
          </View>
          <View style={styles.bottomTextContainer as any}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <ThemeText style={{ fontSize: 12, color: '#92400E', opacity: 0.6 }}>
                {weeklyProgress.percentage}% complete
              </ThemeText>
              {weeklyProgress.percentage >= 100 && (
                <ThemeText style={{ fontSize: 12, fontWeight: '600', color: '#16A34A' }}>
                  Goal achieved! 🏆
                </ThemeText>
              )}
            </View>
          </View>
        </View>
      ),
    },
  ];

  return (
    <View style={styles.container as any}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView as any}
        snapToInterval={CARD_WIDTH + 16}
        decelerationRate="fast"
      >
        {cards.map((card, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.85}
            style={styles.card as any}
          >
            <ThemeText style={styles.cardTitle as any}>
              {card.title}
            </ThemeText>
            {card.content}
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      {/* Indicators */}
      <View style={styles.indicatorContainer as any}>
        {cards.map((_, index) => (
          <View
            key={index}
            style={styles.indicator as any}
          />
        ))}
      </View>
    </View>
  );
};

export default HighlightsCarousel;