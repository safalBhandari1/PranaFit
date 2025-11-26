// import { StyleSheet } from 'react-native';

// export const createProjectHomeScreenStyles = (theme: any) => StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: theme.colors.background,
//   },
//   content: {
//     flex: 1,
//     padding: theme.spacing.md,
//   },
//   loadingState: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingText: {
//     fontSize: 16,
//     color: theme.colors.text.secondary,
//   },
//   section: {
//     alignItems: 'center',
//     marginBottom: theme.spacing.xl,
//     paddingTop: theme.spacing.md,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginBottom: theme.spacing.sm,
//     textAlign: 'center',
//   },
//   subtitle: {
//     fontSize: 16,
//     textAlign: 'center',
//     lineHeight: 22,
//     color: theme.colors.text.secondary,
//   },
//   projectsList: {
//     marginBottom: theme.spacing.lg,
//   },
//   projectCard: {
//     padding: theme.spacing.lg,
//     borderRadius: theme.borderRadius.lg,
//     marginBottom: theme.spacing.md,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//     backgroundColor: theme.colors.card,
//   },
//   projectHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     marginBottom: theme.spacing.sm,
//   },
//   projectTitleSection: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     flex: 1,
//   },
//   projectEmoji: {
//     fontSize: 24,
//     marginRight: theme.spacing.sm,
//     marginTop: 2,
//   },
//   projectText: {
//     flex: 1,
//   },
//   projectName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 4,
//     color: theme.colors.text.primary,
//   },
//   projectMeta: {
//     fontSize: 14,
//     color: theme.colors.text.secondary,
//   },
//   progressCircle: {
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     borderWidth: 2,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: theme.colors.background,
//   },
//   progressText: {
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
//   projectDate: {
//     fontSize: 14,
//     marginBottom: theme.spacing.sm,
//     color: theme.colors.text.secondary,
//   },
//   progressBar: {
//     height: 6,
//     borderRadius: 3,
//     overflow: 'hidden',
//     marginBottom: theme.spacing.sm,
//     backgroundColor: theme.colors.border,
//   },
//   progressFill: {
//     height: '100%',
//     borderRadius: 3,
//   },
//   projectFooter: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   projectStatus: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: theme.colors.text.secondary,
//   },
//   projectAction: {
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   newProjectButton: {
//     padding: theme.spacing.lg,
//     borderRadius: theme.borderRadius.lg,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: theme.spacing.xl,
//     backgroundColor: theme.colors.card,
//   },
//   newProjectEmoji: {
//     fontSize: 20,
//     marginRight: theme.spacing.sm,
//   },
//   newProjectText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: theme.colors.text.primary,
//   },
//   emptyState: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: theme.spacing.xl,
//   },
//   emptyEmoji: {
//     fontSize: 64,
//     marginBottom: theme.spacing.lg,
//     color: theme.colors.text.secondary,
//   },
//   emptyTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: theme.spacing.sm,
//     textAlign: 'center',
//     color: theme.colors.text.primary,
//   },
//   emptySubtitle: {
//     fontSize: 16,
//     textAlign: 'center',
//     marginBottom: theme.spacing.xl,
//     lineHeight: 22,
//     color: theme.colors.text.secondary,
//   },
//   createButton: {
//     paddingHorizontal: theme.spacing.xl,
//     paddingVertical: theme.spacing.md,
//     borderRadius: theme.borderRadius.md,
//   },
//   createButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   // Templates Section Styles
//   templatesSection: {
//     marginBottom: theme.spacing.xl,
//   },
//   sectionHeader: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: theme.spacing.md,
//     color: theme.colors.text.primary,
//   },
//   templatesGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//   },
//   templateCard: {
//     width: '48%',
//     padding: theme.spacing.md,
//     borderRadius: theme.borderRadius.lg,
//     marginBottom: theme.spacing.md,
//     backgroundColor: theme.colors.card,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 2,
//   },
//   templateHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     marginBottom: theme.spacing.sm,
//   },
//   templateEmoji: {
//     fontSize: 20,
//   },
//   addButton: {
//     width: 28,
//     height: 28,
//     borderRadius: 14,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: theme.colors.primary,
//   },
//   addButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   templateName: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginBottom: 4,
//     color: theme.colors.text.primary,
//   },
//   templateMeta: {
//     fontSize: 12,
//     color: theme.colors.text.secondary,
//     marginBottom: 2,
//   },
//   templateDescription: {
//     fontSize: 12,
//     color: theme.colors.text.secondary,
//     lineHeight: 16,
//   },
// });

import { StyleSheet } from 'react-native';

export const createProjectHomeScreenStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    padding: theme.spacing.md,
  },
  loadingState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: theme.colors.text.secondary,
  },
  section: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    paddingTop: theme.spacing.md,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
    color: theme.colors.text.secondary,
  },
  projectsList: {
    marginBottom: theme.spacing.lg,
  },
  projectCard: {
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    backgroundColor: theme.colors.card,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm,
  },
  projectTitleSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  projectText: {
    flex: 1,
  },
  projectNameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  projectName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    flex: 1,
  },
  projectEmoji: {
    fontSize: 20,
    marginLeft: theme.spacing.sm,
  },
  projectMeta: {
    fontSize: 14,
    color: theme.colors.text.secondary,
  },
  progressCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  progressText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  projectDate: {
    fontSize: 14,
    marginBottom: theme.spacing.sm,
    color: theme.colors.text.secondary,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: theme.spacing.sm,
    backgroundColor: theme.colors.border,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  projectFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  projectStatus: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.text.secondary,
  },
  projectAction: {
    fontSize: 14,
    fontWeight: '600',
  },
  newProjectButton: {
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.xl,
    backgroundColor: theme.colors.card,
  },
  newProjectEmoji: {
    fontSize: 20,
    marginRight: theme.spacing.sm,
  },
  newProjectText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: theme.spacing.lg,
    color: theme.colors.text.secondary,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
    color: theme.colors.text.primary,
  },
  emptySubtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    lineHeight: 22,
    color: theme.colors.text.secondary,
  },
  createButton: {
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  // Templates Section Styles
  templatesSection: {
    marginBottom: theme.spacing.xl,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: theme.spacing.md,
    color: theme.colors.text.primary,
  },
  templatesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  templateCard: {
    width: '48%',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.card,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  templateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm,
  },
  templateEmoji: {
    fontSize: 20,
  },
  addButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  templateName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: theme.colors.text.primary,
  },
  templateMeta: {
    fontSize: 12,
    color: theme.colors.text.secondary,
    marginBottom: 2,
  },
  templateDescription: {
    fontSize: 12,
    color: theme.colors.text.secondary,
    lineHeight: 16,
  },
});