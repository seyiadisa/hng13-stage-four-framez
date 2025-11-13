const GRADIENT = ["#F62E8E", "#AC1AF0"] as const;

export type ThemeColors = {
  bgColor: string;
  textColor: string;
  textMutedColor: string;
  tabBgColor: string;
  borderColor: string;
  primary: string;
  accent: string;
  errorColor: string;
  gradient: typeof GRADIENT;
};

export const lightTheme: ThemeColors = {
  bgColor: "#ffffff",
  textColor: "#1a1a1a",
  textMutedColor: "#8c8c8c",
  tabBgColor: "#f2f2f2",
  borderColor: "#e0e0e0",
  primary: "#F62E8E",
  accent: "#2E8AF6",
  errorColor: "#dc2626",
  gradient: GRADIENT,
};

export const darkTheme: ThemeColors = {
  bgColor: "#181a1c",
  textColor: "#ecebed",
  textMutedColor: "#727477",
  tabBgColor: "#000",
  borderColor: "#323436",
  primary: "#F62E8E",
  accent: "#2E8AF6",
  errorColor: "#ef4444",
  gradient: GRADIENT,
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const TYPOGRAPHY = {
  sizes: {
    title: 18,
    body: 16,
    secondary: 14,
    tertiary: 12,
  },
  weights: {
    regular: "400",
    medium: "500",
    bold: "700",
  },
};
