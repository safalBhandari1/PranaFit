
// src/features/projects/components/ProjectHomeScreen.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { 
  View, 
  ScrollView, 
  TouchableOpacity,
  Alert,
  RefreshControl,
  TextInput
} from 'react-native';
import { useProjectStore } from '../stores/useProjectStore';
import { useAppStore } from '../../../shared/stores/useAppStore';
import { ThemeText } from '../../../shared/ui/ThemeText';
import { ThemeView } from '../../../shared/ui/ThemeView';
import { createProjectHomeScreenStyles } from '../styles/ProjectHomeScreenStyles';
import { TrainingProject, ProjectTemplate } from '../types/project';
import { useNavigation } from '@react-navigation/native';
import { useEnhancedTheme } from '../../../shared/hooks/useEnhancedTheme';

const ProjectHomeScreen: React.FC = () => {
  const { theme } = useEnhancedTheme();
  const { 
    projects, 
    templates, 
    isLoading, 
    loadTemplates, 
    addProjectFromTemplate,
    deleteProject,
    calculateProjectProgress,
    loadUserProjects
  } = useProjectStore();
  
  const { user } = useAppStore();
  const navigation = useNavigation();
  
  const [refreshing, setRefreshing] = useState(false);
  const styles = createProjectHomeScreenStyles(theme);
  
  // Search and filter states
  const [searchText, setSearchText] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  // ✅ INDUSTRY STANDARD: Load projects on mount and when user changes
  useEffect(() => {
    if (user?.uid) {
      console.log('📥 Loading projects for user:', user.uid);
      loadUserProjects(user.uid).catch(error => {
        console.error('❌ Failed to load projects:', error);
        Alert.alert('Error', 'Failed to load projects');
      });
    }
  }, [user?.uid, loadUserProjects]);

  // Load templates on mount
  useEffect(() => {
    loadTemplates().catch(error => {
      console.error('❌ Failed to load templates:', error);
    });
  }, [loadTemplates]);

  // ✅ INDUSTRY STANDARD: Proper refresh with error handling
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      if (user?.uid) {
        await loadUserProjects(user.uid);
        console.log('✅ Projects refreshed from Firebase');
      }
    } catch (error) {
      console.error('❌ Error refreshing projects:', error);
      Alert.alert('Error', 'Failed to refresh projects');
    } finally {
      setRefreshing(false);
    }
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
      rest: '😴',
      yoga: '🧘',
      boxing: '🥊',
      swimming: '🏊',
      pilates: '🤸'
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
      rest: '#6B7280',
      yoga: '#F472B6',
      boxing: '#DC2626',
      swimming: '#0891B2',
      pilates: '#10B981'
    };
    return colorsMap[type] || theme.colors.primary;
  };

  // const handleProjectPress = (project: TrainingProject) => {
  //   (navigation as any).navigate('ProjectDetail', { 
  //     projectId: project.id,
  //     project: project 
  //   } as never);
  // };

  // UPDATE TO (new version):Accounts for both DietProjectDetail and ProjectDetail
const handleProjectPress = (project: TrainingProject) => {
  if (project.type === 'diet') {
    // Navigate to DietProjectDetailScreen for diet projects
    (navigation as any).navigate('DietProjectDetail', { 
      projectId: project.id,
      project: project 
    } as never);
  } else {
    // Navigate to regular ProjectDetailScreen for workout projects
    (navigation as any).navigate('ProjectDetail', { 
      projectId: project.id,
      project: project 
    } as never);
  }
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
              console.log('✅ Project deleted successfully');
              // ✅ AUTO-REFRESH: Projects will reload automatically via Zustand store updates
            } catch (error) {
              console.error('❌ Error deleting project:', error);
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
      // ✅ AUTO-REFRESH: Projects will reload automatically via Zustand store updates
    } catch (error) {
      console.error('❌ Error adding template:', error);
      Alert.alert('Error', 'Failed to add template');
    }
  };

  // Filter templates based on search and filters
  const filteredTemplates = useMemo(() => {
    return templates.filter(template => {
      // Search by name
      const matchesSearch = searchText === '' || 
        template.name.toLowerCase().includes(searchText.toLowerCase());
      
      // Filter by type
      const matchesType = selectedType === 'all' || 
        template.type.toLowerCase() === selectedType;
      
      return matchesSearch && matchesType;
    });
  }, [templates, searchText, selectedType]);

  // Get unique types from templates
  const availableTypes = useMemo(() => {
    const types = new Set<string>();
    templates.forEach(template => {
      types.add(template.type);
    });
    return ['all', ...Array.from(types)];
  }, [templates]);

  const resetFilters = () => {
    setSearchText('');
    setSelectedType('all');
  };

  if (isLoading && projects.length === 0) {
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

        {/* Active Projects - WILL AUTO-UPDATE WHEN DATA CHANGES */}
        {projects.length > 0 && (
          <View style={styles.projectsList}>
            {projects.map((project) => {
              const progress = calculateProgress(project);
              const daysCompleted = getDaysCompleted(project);
              const activityColor = getActivityColor(project.type);
              const workoutSummary = getWorkoutSummary(project);
              const activityEmoji = getActivityEmoji(project.type);
              
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
                      {/* EMOJI + TITLE SAME ROW */}
                      <View style={styles.titleEmojiRow}>
                        <ThemeText variant="body" style={[styles.projectEmoji, { color: activityColor, marginRight: 8 }]}>
                          {activityEmoji}
                        </ThemeText>
                        <ThemeText variant="h3" style={styles.projectName}>
                          {project.title}
                        </ThemeText>
                      </View>
                      
                      {/* METADATA ON NEW LINE (starts from left, not indented) */}
                      <ThemeText variant="caption" style={styles.projectMeta}>
                        {formatProjectType(project.type)} • {workoutSummary} • {daysCompleted}/{project.duration} days
                      </ThemeText>
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
                  
                  {/* Progress Bar - WILL AUTO-UPDATE WHEN WORKOUTS COMPLETE */}
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
            {/* CHANGED: "Popular Templates" to "Popular Plans" */}
            <ThemeText variant="h2" style={styles.sectionHeader}>
              Popular Plans
            </ThemeText>
            
            {/* NEW: Search and Filter Bar */}
            <View style={styles.searchFilterSection}>
              {/* Search Input */}
              <View style={styles.searchContainer}>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search plans..."
                  placeholderTextColor={theme.colors.text.secondary}
                  value={searchText}
                  onChangeText={setSearchText}
                />
                {searchText.length > 0 && (
                  <TouchableOpacity 
                    style={styles.clearButton}
                    onPress={() => setSearchText('')}
                  >
                    <ThemeText style={styles.clearButtonText}>×</ThemeText>
                  </TouchableOpacity>
                )}
              </View>
              
              {/* Filter Chips - ONLY TYPE FILTER */}
              <View style={styles.filterRow}>
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  style={styles.filterScroll}
                  contentContainerStyle={styles.filterContainer}
                >
                  {/* Type Filter Only */}
                  <ThemeText variant="caption" style={styles.filterLabel}>
                    Type:
                  </ThemeText>
                  {availableTypes.map(type => (
                    <TouchableOpacity
                      key={type}
                      style={[
                        styles.filterChip,
                        selectedType === type && styles.filterChipActive
                      ]}
                      onPress={() => setSelectedType(type)}
                    >
                      <ThemeText 
                        variant="caption" 
                        style={[
                          styles.filterChipText,
                          selectedType === type && styles.filterChipTextActive
                        ]}
                      >
                        {type === 'all' ? 'All' : formatProjectType(type)}
                      </ThemeText>
                    </TouchableOpacity>
                  ))}
                  
                  {/* Reset Filters Button */}
                  {(searchText.length > 0 || selectedType !== 'all') && (
                    <TouchableOpacity
                      style={[styles.filterChip, styles.resetChip]}
                      onPress={resetFilters}
                    >
                      <ThemeText variant="caption" style={styles.resetChipText}>
                        Reset
                      </ThemeText>
                    </TouchableOpacity>
                  )}
                </ScrollView>
              </View>
              
              {/* Results Count */}
              <View style={styles.resultsRow}>
                <ThemeText variant="caption" style={styles.resultsText}>
                  {filteredTemplates.length} of {templates.length} plans
                </ThemeText>
                {filteredTemplates.length === 0 && (
                  <TouchableOpacity onPress={resetFilters}>
                    <ThemeText variant="caption" style={styles.resetResultsText}>
                      Clear filters
                    </ThemeText>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            
            <View style={styles.templatesGrid}>
              {filteredTemplates.map((template) => {
                const activityColor = getActivityColor(template.type);
                const activityEmoji = getActivityEmoji(template.type);
                
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
                      {/* Template Emoji moved to left */}
                      <ThemeText variant="body" style={[styles.templateEmoji, { color: activityColor }]}>
                        {activityEmoji}
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
            
            {/* No Results State */}
            {filteredTemplates.length === 0 && templates.length > 0 && (
              <View style={styles.noResultsState}>
                <ThemeText variant="body" style={styles.noResultsEmoji}>🔍</ThemeText>
                <ThemeText variant="h3" style={styles.noResultsTitle}>
                  No plans found
                </ThemeText>
                <ThemeText variant="caption" style={styles.noResultsSubtitle}>
                  Try different search terms or clear filters
                </ThemeText>
                <TouchableOpacity 
                  style={[styles.clearFilterButton, { backgroundColor: theme.colors.primary }]}
                  onPress={resetFilters}
                >
                  <ThemeText variant="body" style={styles.clearFilterButtonText}>
                    Clear All Filters
                  </ThemeText>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}

        {/* Empty State */}
        {projects.length === 0 && !isLoading && (
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