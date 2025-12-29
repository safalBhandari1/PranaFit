import { StyleSheet } from 'react-native';

export const createProfileStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: theme.colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  userEmail: {
    fontSize: 16,
    color: theme.colors.text.secondary,
    marginBottom: 8,
  },
  userRole: {
    backgroundColor: theme.colors.primary + '20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'center',
  },
  userRoleText: {
    color: theme.colors.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  actionCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    marginBottom: 24,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  actionIcon: {
    marginRight: 12,
  },
  actionText: {
    flex: 1,
    fontSize: 16,
  },
  chevronIcon: {
    opacity: 0.6,
  },
  signOutButton: {
    backgroundColor: theme.colors.semantic.error + '20',
    borderRadius: theme.borderRadius.lg,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signOutText: {
    color: theme.colors.semantic.error,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
  appInfo: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  versionText: {
    fontSize: 14,
    color: theme.colors.text.secondary,
  },
  appNameText: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    marginTop: 4,
  },
});