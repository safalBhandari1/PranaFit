// Spacing scale (4px base unit)
export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  } as const;
  
  // Border radius scale
  export const borderRadius = {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  } as const;
  
  // Typography scale
  export const typography = {
    h1: { fontSize: 32, fontWeight: 'bold', lineHeight: 40 },
    h2: { fontSize: 24, fontWeight: 'bold', lineHeight: 32 },
    h3: { fontSize: 20, fontWeight: '600', lineHeight: 28 },
    body: { fontSize: 16, fontWeight: 'normal', lineHeight: 24 },
    caption: { fontSize: 14, fontWeight: 'normal', lineHeight: 20 },
    small: { fontSize: 12, fontWeight: 'normal', lineHeight: 16 },
  } as const;
  
  // Shadows
  export const shadows = {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 8,
    },
  } as const;
  
  export type Spacing = keyof typeof spacing;
  export type BorderRadius = keyof typeof borderRadius;
  export type Typography = keyof typeof typography;
  export type Shadows = keyof typeof shadows;