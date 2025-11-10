export type ThemeColors = {
  bgColor: string;
  textColor: string;
  textMutedColor: string;
  tabBgColor: string;
  borderColor: string;
  primary: string;
  accent: string;
};

export const lightTheme: ThemeColors = {
  bgColor: "#000",
  textColor: "#ecebed",
  textMutedColor: "#727477",
  tabBgColor: "#000",
  borderColor: "#323436",
  primary: "#F62E8E",
  accent: "#2E8AF6",
};

export const darkTheme: ThemeColors = {
  bgColor: "#181a1c",
  textColor: "#ecebed",
  textMutedColor: "#727477",
  tabBgColor: "#000",
  borderColor: "#323436",
  primary: "#F62E8E",
  accent: "#2E8AF6",
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
