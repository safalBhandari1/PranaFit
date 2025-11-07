import { StyleSheet } from 'react-native';
import { Theme } from '../../../shared/stores/useThemeStore';

export const createAuthStyles = (theme: Theme) => StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  formContainer: {
    width: '100%',
  },

  // Header styles
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  // REMOVED title and subtitle styles - using ThemeText variants instead

  // Input styles
  input: {
    padding: 15,
    borderRadius: 12,
    marginVertical: 8,
    fontSize: 16,
    borderWidth: 1,
    backgroundColor: theme.colors.card,
    color: theme.colors.text.primary,
    borderColor: theme.colors.border,
  },

  // Button styles
  button: {
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonRegister: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  // Footer styles
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  footerText: {
    marginRight: 5,
    color: theme.colors.text.secondary,
  },
  footerLink: {
    fontWeight: '600',
    color: theme.colors.primary,
  },
});