// import React, { useState, useEffect } from 'react';
// import { 
//   View, 
//   ScrollView, 
//   TouchableOpacity,
//   Alert,
//   RefreshControl
// } from 'react-native';
// import { useThemeStore } from '../../../shared/stores/useThemeStore';
// import { useProjectStore } from '../stores/useProjectStore';
// import { ThemeText } from '../../../shared/ui/ThemeText';
// import { ThemeView } from '../../../shared/ui/ThemeView';
// import { createProjectHomeScreenStyles } from '../styles/ProjectHomeScreenStyles';
// import { TrainingProject, ProjectTemplate } from '../types/project';
// import { useNavigation } from '@react-navigation/native';

// const ProjectHomeScreen: React.FC = () => {
//   const { theme } = useThemeStore();
//   const { 
//     projects, 
//     templates, 
//     isLoading, 
//     loadTemplates, 
//     addProjectFromTemplate,
//     deleteProject,
//     calculateProjectProgress 
//   } = useProjectStore();

//   const navigation = useNavigation();
  
//   const [refreshing, setRefreshing] = useState(false);
//   const styles = createProjectHomeScreenStyles(theme);

//   useEffect(() => {
//     loadTemplates();
//   }, []);

//   const onRefresh = () => {
//     setRefreshing(true);
//     setTimeout(() => setRefreshing(false), 1000);
//   };

//   const calculateProgress = (project: TrainingProject) => {
//     const progress = calculateProjectProgress(project);
//     return Math.round(progress.completionPercentage);
//   };

//   const getActivityEmoji = (type: string) => {
//     const emojis: {[key: string]: string} = {
//       gym: '🏋️',
//       calisthenics: '💪',
//       running: '🏃',
//       cycling: '🚴',
//       walking: '🚶',
//       jumba: '💃',
//       mixed: '🌟',
//       rest: '😴'
//     };
//     return emojis[type] || '⭐';
//   };

//   const getActivityColor = (type: string) => {
//     const colorsMap: {[key: string]: string} = {
//       gym: '#FF6B35',
//       calisthenics: '#4ECDC4',
//       running: '#45B7D1',
//       cycling: '#96CEB4',
//       walking: '#A593E0',
//       jumba: '#FFA5A5',
//       mixed: '#8B5CF6',
//       rest: '#6B7280'
//     };
//     return colorsMap[type] || theme.colors.primary;
//   };

//   //NEED TO CHANGE THE ANY TO PROPER NAVIGATION LATER FOR TYPE SAFETY 
//   const handleProjectPress = (project: TrainingProject) => {
//     (navigation as any).navigate('ProjectDetail', { 
//       projectId: project.id,
//       project: project 
//     } as never);
//   };

//   const handleCreateProject = () => {
//     console.log('Navigate to Create Project');
//     navigation.navigate('CreateProject' as never);
//   };

//   const formatDateRange = (startDate: Date, endDate: Date) => {
//     const start = startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
//     const end = endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
//     return `${start} - ${end}`;
//   };

//   const getDaysCompleted = (project: TrainingProject) => {
//     return project.dailyWorkouts.filter(day => day.completed).length;
//   };

//   const handleDeleteProject = async (projectId: string, projectTitle: string) => {
//     Alert.alert(
//       'Delete Project',
//       `Are you sure you want to delete "${projectTitle}"?`,
//       [
//         { text: 'Cancel', style: 'cancel' },
//         { 
//           text: 'Delete', 
//           style: 'destructive',
//           onPress: async () => {
//             try {
//               await deleteProject(projectId);
//             } catch (error) {
//               console.error('Error deleting project:', error);
//               Alert.alert('Error', 'Failed to delete project');
//             }
//           }
//         }
//       ]
//     );
//   };

//   const getWorkoutSummary = (project: TrainingProject) => {
//     const totalWorkouts = project.dailyWorkouts.filter(day => 
//       !day.activities.some(activity => activity.name === 'Rest Day')
//     ).length;
    
//     const muscleGroups = new Set<string>();
//     project.dailyWorkouts.forEach(day => {
//       day.focusAreas?.forEach(muscleGroup => {
//         muscleGroups.add(muscleGroup);
//       });
//     });

//     if (muscleGroups.size > 0) {
//       return `${muscleGroups.size} muscle groups`;
//     } else if (project.type === 'calisthenics') {
//       return `${totalWorkouts} calisthenics days`;
//     } else if (project.type === 'running' || project.type === 'cycling' || project.type === 'walking') {
//       return `${totalWorkouts} cardio days`;
//     } else {
//       return `${totalWorkouts} workout days`;
//     }
//   };

//   const formatProjectType = (type: string) => {
//     return type.charAt(0).toUpperCase() + type.slice(1);
//   };

//   const handleAddTemplate = async (template: ProjectTemplate) => {
//     try {
//       await addProjectFromTemplate(template);
//       Alert.alert('Success', `"${template.name}" added to your projects!`);
//     } catch (error) {
//       console.error('Error adding template:', error);
//       Alert.alert('Error', 'Failed to add template');
//     }
//   };

//   if (isLoading) {
//     return (
//       <ThemeView style={styles.container}>
//         <ThemeView style={styles.loadingState}>
//           <ThemeText variant="body" style={styles.loadingText}>
//             Loading projects...
//           </ThemeText>
//         </ThemeView>
//       </ThemeView>
//     );
//   }

//   return (
//     <ThemeView style={styles.container}>
//       <ScrollView 
//         style={styles.content} 
//         showsVerticalScrollIndicator={false}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={onRefresh}
//             colors={[theme.colors.primary]}
//             tintColor={theme.colors.primary}
//           />
//         }
//       >
//         {/* Welcome Section */}
//         <View style={styles.section}>
//           <ThemeText variant="h1" style={[styles.title, { color: theme.colors.primary }]}>
//             Your Workout Plans
//           </ThemeText>
//           <ThemeText variant="body" style={styles.subtitle}>
//             Track progress and manage your fitness journey
//           </ThemeText>
//         </View>

//         {/* Active Projects */}
//         {projects.length > 0 && (
//           <View style={styles.projectsList}>
//             {projects.map((project) => {
//               const progress = calculateProgress(project);
//               const daysCompleted = getDaysCompleted(project);
//               const activityColor = getActivityColor(project.type);
//               const workoutSummary = getWorkoutSummary(project);
              
//               return (
//                 <TouchableOpacity
//                   key={project.id}
//                   style={[
//                     styles.projectCard, 
//                     { 
//                       borderLeftColor: activityColor,
//                       borderLeftWidth: 4
//                     }
//                   ]}
//                   onPress={() => handleProjectPress(project)}
//                   onLongPress={() => handleDeleteProject(project.id, project.title)}
//                 >
//                   <View style={styles.projectHeader}>
//                     <View style={styles.projectTitleSection}>
//                       <ThemeText variant="body" style={[styles.projectEmoji, { color: activityColor }]}>
//                         {getActivityEmoji(project.type)}
//                       </ThemeText>
//                       <View style={styles.projectText}>
//                         <ThemeText variant="h3" style={styles.projectName}>
//                           {project.title}
//                         </ThemeText>
//                         <ThemeText variant="caption" style={styles.projectMeta}>
//                           {formatProjectType(project.type)} • {workoutSummary} • {daysCompleted}/{project.duration} days
//                         </ThemeText>
//                       </View>
//                     </View>
                    
//                     <View style={[styles.progressCircle, { borderColor: activityColor }]}>
//                       <ThemeText variant="caption" style={[styles.progressText, { color: activityColor }]}>
//                         {progress}%
//                       </ThemeText>
//                     </View>
//                   </View>
                  
//                   <ThemeText variant="caption" style={styles.projectDate}>
//                     {formatDateRange(project.startDate, project.endDate)}
//                   </ThemeText>
                  
//                   {/* Progress Bar */}
//                   <View style={styles.progressBar}>
//                     <View 
//                       style={[
//                         styles.progressFill, 
//                         { 
//                           backgroundColor: activityColor,
//                           width: `${progress}%`
//                         }
//                       ]} 
//                     />
//                   </View>
                  
//                   <View style={styles.projectFooter}>
//                     <ThemeText variant="caption" style={styles.projectStatus}>
//                       {daysCompleted === 0 ? 'Ready to start' : 
//                        daysCompleted === project.duration ? 'Completed!' :
//                        `${project.duration - daysCompleted} days remaining`}
//                     </ThemeText>
//                     <ThemeText variant="caption" style={[styles.projectAction, { color: activityColor }]}>
//                       View Details →
//                     </ThemeText>
//                   </View>
//                 </TouchableOpacity>
//               );
//             })}
//           </View>
//         )}

//         {/* Create New Project Button */}
//         <TouchableOpacity 
//           style={styles.newProjectButton}
//           onPress={handleCreateProject}
//         >
//           <ThemeText variant="body" style={[styles.newProjectEmoji, { color: theme.colors.primary }]}>
//             +
//           </ThemeText>
//           <ThemeText variant="h3" style={styles.newProjectText}>
//             Create New Project
//           </ThemeText>
//         </TouchableOpacity>

//         {/* Templates Section */}
//         {templates.length > 0 && (
//           <View style={styles.templatesSection}>
//             <ThemeText variant="h2" style={styles.sectionHeader}>
//               Popular Templates
//             </ThemeText>
//             <View style={styles.templatesGrid}>
//               {templates.map((template) => {
//                 const activityColor = getActivityColor(template.type);
                
//                 return (
//                   <View key={template.id} style={styles.templateCard}>
//                     <View style={styles.templateHeader}>
//                       <ThemeText variant="body" style={[styles.templateEmoji, { color: activityColor }]}>
//                         {getActivityEmoji(template.type)}
//                       </ThemeText>
//                       <TouchableOpacity 
//                         style={styles.addButton}
//                         onPress={() => handleAddTemplate(template)}
//                       >
//                         <ThemeText variant="body" style={styles.addButtonText}>+</ThemeText>
//                       </TouchableOpacity>
//                     </View>
                    
//                     <ThemeText variant="h3" style={styles.templateName}>
//                       {template.name}
//                     </ThemeText>
                    
//                     <ThemeText variant="caption" style={styles.templateMeta}>
//                       {template.duration} days • {template.category}
//                     </ThemeText>
                    
//                     <ThemeText variant="caption" style={styles.templateDescription} numberOfLines={2}>
//                       {template.description}
//                     </ThemeText>
//                   </View>
//                 );
//               })}
//             </View>
//           </View>
//         )}

//         {/* Empty State */}
//         {projects.length === 0 && (
//           <View style={styles.emptyState}>
//             <ThemeText variant="body" style={styles.emptyEmoji}>📋</ThemeText>
//             <ThemeText variant="h1" style={styles.emptyTitle}>
//               No Active Projects
//             </ThemeText>
//             <ThemeText variant="body" style={styles.emptySubtitle}>
//               Create your first workout plan to get started
//             </ThemeText>
//             <TouchableOpacity 
//               style={[styles.createButton, { backgroundColor: theme.colors.primary }]}
//               onPress={handleCreateProject}
//             >
//               <ThemeText variant="body" style={styles.createButtonText}>Create Project</ThemeText>
//             </TouchableOpacity>
//           </View>
//         )}
//       </ScrollView>
//     </ThemeView>
//   );
// };

// export default ProjectHomeScreen;

import React, { useState, useEffect } from 'react';
import { 
  View, 
  ScrollView, 
  TouchableOpacity,
  Alert,
  RefreshControl
} from 'react-native';
import { useThemeStore } from '../../../shared/stores/useThemeStore';
import { useProjectStore } from '../stores/useProjectStore';
import { ThemeText } from '../../../shared/ui/ThemeText';
import { ThemeView } from '../../../shared/ui/ThemeView';
import { createProjectHomeScreenStyles } from '../styles/ProjectHomeScreenStyles';
import { TrainingProject, ProjectTemplate } from '../types/project';
import { useNavigation } from '@react-navigation/native';

const ProjectHomeScreen: React.FC = () => {
  const { theme } = useThemeStore();
  const { 
    projects, 
    templates, 
    isLoading, 
    loadTemplates, 
    addProjectFromTemplate,
    deleteProject,
    calculateProjectProgress 
  } = useProjectStore();

  const navigation = useNavigation();
  
  const [refreshing, setRefreshing] = useState(false);
  const styles = createProjectHomeScreenStyles(theme);

  useEffect(() => {
    loadTemplates();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const calculateProgress = (project: TrainingProject) => {
    const progress = calculateProjectProgress(project);
    return Math.round(progress.completionPercentage);
  };

  const getActivityEmoji = (type: string) => {
    const emojis: {[key: string]: string} = {
      gym: '🏋️',
      calisthenics: '💪',
      running: '🏃',
      cycling: '🚴',
      walking: '🚶',
      jumba: '💃',
      mixed: '🌟',
      rest: '😴'
    };
    return emojis[type] || '⭐';
  };

  const getActivityColor = (type: string) => {
    const colorsMap: {[key: string]: string} = {
      gym: '#FF6B35',
      calisthenics: '#4ECDC4',
      running: '#45B7D1',
      cycling: '#96CEB4',
      walking: '#A593E0',
      jumba: '#FFA5A5',
      mixed: '#8B5CF6',
      rest: '#6B7280'
    };
    return colorsMap[type] || theme.colors.primary;
  };

  //NEED TO CHANGE THE ANY TO PROPER NAVIGATION LATER FOR TYPE SAFETY 
  const handleProjectPress = (project: TrainingProject) => {
    (navigation as any).navigate('ProjectDetail', { 
      projectId: project.id,
      project: project 
    } as never);
  };

  const handleCreateProject = () => {
    console.log('Navigate to Create Project');
    navigation.navigate('CreateProject' as never);
  };

  const formatDateRange = (startDate: Date, endDate: Date) => {
    const start = startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const end = endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return `${start} - ${end}`;
  };

  const getDaysCompleted = (project: TrainingProject) => {
    return project.dailyWorkouts.filter(day => day.completed).length;
  };

  const handleDeleteProject = async (projectId: string, projectTitle: string) => {
    Alert.alert(
      'Delete Project',
      `Are you sure you want to delete "${projectTitle}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteProject(projectId);
            } catch (error) {
              console.error('Error deleting project:', error);
              Alert.alert('Error', 'Failed to delete project');
            }
          }
        }
      ]
    );
  };

  const getWorkoutSummary = (project: TrainingProject) => {
    const totalWorkouts = project.dailyWorkouts.filter(day => 
      !day.activities.some(activity => activity.name === 'Rest Day')
    ).length;
    
    const muscleGroups = new Set<string>();
    project.dailyWorkouts.forEach(day => {
      day.focusAreas?.forEach(muscleGroup => {
        muscleGroups.add(muscleGroup);
      });
    });

    if (muscleGroups.size > 0) {
      return `${muscleGroups.size} muscle groups`;
    } else if (project.type === 'calisthenics') {
      return `${totalWorkouts} calisthenics days`;
    } else if (project.type === 'running' || project.type === 'cycling' || project.type === 'walking') {
      return `${totalWorkouts} cardio days`;
    } else {
      return `${totalWorkouts} workout days`;
    }
  };

  const formatProjectType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const handleAddTemplate = async (template: ProjectTemplate) => {
    try {
      await addProjectFromTemplate(template);
      Alert.alert('Success', `"${template.name}" added to your projects!`);
    } catch (error) {
      console.error('Error adding template:', error);
      Alert.alert('Error', 'Failed to add template');
    }
  };

  if (isLoading) {
    return (
      <ThemeView style={styles.container}>
        <ThemeView style={styles.loadingState}>
          <ThemeText variant="body" style={styles.loadingText}>
            Loading projects...
          </ThemeText>
        </ThemeView>
      </ThemeView>
    );
  }

  return (
    <ThemeView style={styles.container}>
      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primary]}
            tintColor={theme.colors.primary}
          />
        }
      >
        {/* Welcome Section */}
        <View style={styles.section}>
          <ThemeText variant="h1" style={[styles.title, { color: theme.colors.primary }]}>
            Your Workout Plans
          </ThemeText>
          <ThemeText variant="body" style={styles.subtitle}>
            Track progress and manage your fitness journey
          </ThemeText>
        </View>

        {/* Active Projects */}
        {projects.length > 0 && (
          <View style={styles.projectsList}>
            {projects.map((project) => {
              const progress = calculateProgress(project);
              const daysCompleted = getDaysCompleted(project);
              const activityColor = getActivityColor(project.type);
              const workoutSummary = getWorkoutSummary(project);
              
              return (
                <TouchableOpacity
                  key={project.id}
                  style={[
                    styles.projectCard, 
                    { 
                      borderLeftColor: activityColor,
                      borderLeftWidth: 4
                    }
                  ]}
                  onPress={() => handleProjectPress(project)}
                  onLongPress={() => handleDeleteProject(project.id, project.title)}
                >
                  <View style={styles.projectHeader}>
                    <View style={styles.projectTitleSection}>
                      <View style={styles.projectText}>
                        <View style={styles.projectNameRow}>
                          <ThemeText variant="h3" style={styles.projectName}>
                            {project.title}
                          </ThemeText>
                          <ThemeText variant="body" style={[styles.projectEmoji, { color: activityColor }]}>
                            {getActivityEmoji(project.type)}
                          </ThemeText>
                        </View>
                        <ThemeText variant="caption" style={styles.projectMeta}>
                          {formatProjectType(project.type)} • {workoutSummary} • {daysCompleted}/{project.duration} days
                        </ThemeText>
                      </View>
                    </View>
                    
                    <View style={[styles.progressCircle, { borderColor: activityColor }]}>
                      <ThemeText variant="caption" style={[styles.progressText, { color: activityColor }]}>
                        {progress}%
                      </ThemeText>
                    </View>
                  </View>
                  
                  <ThemeText variant="caption" style={styles.projectDate}>
                    {formatDateRange(project.startDate, project.endDate)}
                  </ThemeText>
                  
                  {/* Progress Bar */}
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill, 
                        { 
                          backgroundColor: activityColor,
                          width: `${progress}%`
                        }
                      ]} 
                    />
                  </View>
                  
                  <View style={styles.projectFooter}>
                    <ThemeText variant="caption" style={styles.projectStatus}>
                      {daysCompleted === 0 ? 'Ready to start' : 
                       daysCompleted === project.duration ? 'Completed!' :
                       `${project.duration - daysCompleted} days remaining`}
                    </ThemeText>
                    <ThemeText variant="caption" style={[styles.projectAction, { color: activityColor }]}>
                      View Details →
                    </ThemeText>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Create New Project Button */}
        <TouchableOpacity 
          style={styles.newProjectButton}
          onPress={handleCreateProject}
        >
          <ThemeText variant="body" style={[styles.newProjectEmoji, { color: theme.colors.primary }]}>
            +
          </ThemeText>
          <ThemeText variant="h3" style={styles.newProjectText}>
            Create New Project
          </ThemeText>
        </TouchableOpacity>

        {/* Templates Section */}
        {templates.length > 0 && (
          <View style={styles.templatesSection}>
            <ThemeText variant="h2" style={styles.sectionHeader}>
              Popular Templates
            </ThemeText>
            <View style={styles.templatesGrid}>
              {templates.map((template) => {
                const activityColor = getActivityColor(template.type);
                
                return (
                  <View 
                    key={template.id} 
                    style={[
                      styles.templateCard, 
                      { 
                        borderLeftColor: activityColor,
                        borderLeftWidth: 4
                      }
                    ]}
                  >
                    <View style={styles.templateHeader}>
                      <ThemeText variant="body" style={[styles.templateEmoji, { color: activityColor }]}>
                        {getActivityEmoji(template.type)}
                      </ThemeText>
                      <TouchableOpacity 
                        style={[styles.addButton, { backgroundColor: activityColor }]}
                        onPress={() => handleAddTemplate(template)}
                      >
                        <ThemeText variant="body" style={styles.addButtonText}>+</ThemeText>
                      </TouchableOpacity>
                    </View>
                    
                    <ThemeText variant="h3" style={styles.templateName}>
                      {template.name}
                    </ThemeText>
                    
                    <ThemeText variant="caption" style={styles.templateMeta}>
                      {template.duration} days • {template.category}
                    </ThemeText>
                    
                    <ThemeText variant="caption" style={styles.templateDescription} numberOfLines={2}>
                      {template.description}
                    </ThemeText>
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {/* Empty State */}
        {projects.length === 0 && (
          <View style={styles.emptyState}>
            <ThemeText variant="body" style={styles.emptyEmoji}>📋</ThemeText>
            <ThemeText variant="h1" style={styles.emptyTitle}>
              No Active Projects
            </ThemeText>
            <ThemeText variant="body" style={styles.emptySubtitle}>
              Create your first workout plan to get started
            </ThemeText>
            <TouchableOpacity 
              style={[styles.createButton, { backgroundColor: theme.colors.primary }]}
              onPress={handleCreateProject}
            >
              <ThemeText variant="body" style={styles.createButtonText}>Create Project</ThemeText>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </ThemeView>
  );
};

export default ProjectHomeScreen;