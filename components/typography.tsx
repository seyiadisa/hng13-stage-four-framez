import { useTheme } from "@/providers/theme-provider";
import { TYPOGRAPHY } from "@/theme";
import { Text } from "react-native";

export const TitleText = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();

  return (
    <Text style={{ fontSize: TYPOGRAPHY.sizes.title, color: theme.textColor }}>
      {children}
    </Text>
  );
};

export const TitleMutedText = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();

  return (
    <Text
      style={{ fontSize: TYPOGRAPHY.sizes.title, color: theme.textMutedColor }}
    >
      {children}
    </Text>
  );
};

export const BodyText = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();

  return (
    <Text style={{ fontSize: TYPOGRAPHY.sizes.body, color: theme.textColor }}>
      {children}
    </Text>
  );
};

export const BodyMutedText = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();

  return (
    <Text
      style={{ fontSize: TYPOGRAPHY.sizes.body, color: theme.textMutedColor }}
    >
      {children}
    </Text>
  );
};

export const SecondaryText = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();

  return (
    <Text
      style={{ fontSize: TYPOGRAPHY.sizes.secondary, color: theme.textColor }}
    >
      {children}
    </Text>
  );
};

export const SecondaryMutedText = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { theme } = useTheme();

  return (
    <Text
      style={{
        fontSize: TYPOGRAPHY.sizes.secondary,
        color: theme.textMutedColor,
      }}
    >
      {children}
    </Text>
  );
};

export const TertiaryText = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();

  return (
    <Text
      style={{ fontSize: TYPOGRAPHY.sizes.tertiary, color: theme.textColor }}
    >
      {children}
    </Text>
  );
};

export const TertiaryMutedText = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { theme } = useTheme();

  return (
    <Text
      style={{
        fontSize: TYPOGRAPHY.sizes.tertiary,
        color: theme.textMutedColor,
      }}
    >
      {children}
    </Text>
  );
};
