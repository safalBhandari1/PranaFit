export const theme = {
    colors: {
      primary: '#6366F1',    // Indigo
      secondary: '#10B981',  // Emerald
      accent: '#F59E0B',     // Amber
      background: '#FFFFFF',
      surface: '#F8FAFC',
      text: {
        primary: '#1E293B',
        secondary: '#64748B',
        inverse: '#FFFFFF'
      },
      border: '#E2E8F0',
      error: '#EF4444',
      success: '#10B981'
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
      xxl: 48
    },
    borderRadius: {
      sm: 8,
      md: 12,
      lg: 16,
      xl: 24
    },
    typography: {
      h1: { fontSize: 32, fontWeight: 'bold' as const },
      h2: { fontSize: 24, fontWeight: 'bold' as const },
      h3: { fontSize: 20, fontWeight: '600' as const },
      body: { fontSize: 16, fontWeight: 'normal' as const },
      caption: { fontSize: 14, fontWeight: 'normal' as const }
    }
  };
  
  export type Theme = typeof theme;