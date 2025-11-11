import { useTheme } from "@/providers/theme-provider";
import { TYPOGRAPHY } from "@/theme";
import { Text } from "react-native";

export const BrandText = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();

  return (
    <Text
      style={{
        fontFamily: "Allura",
        fontSize: 40,
        color: theme.textColor,
      }}
    >
      {children}
    </Text>
  );
};
export const TitleText = ({
  children,
  bold = false,
}: {
  children: React.ReactNode;
  bold?: boolean;
}) => {
  const { theme } = useTheme();

  return (
    <Text
      style={{
        fontFamily: "HKGrotesk",
        fontSize: TYPOGRAPHY.sizes.title,
        color: theme.textColor,
        fontWeight: bold ? 700 : 400,
      }}
    >
      {children}
    </Text>
  );
};

export const TitleMutedText = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();

  return (
    <Text
      style={{
        fontFamily: "HKGrotesk",
        fontSize: TYPOGRAPHY.sizes.title,
        color: theme.textMutedColor,
      }}
    >
      {children}
    </Text>
  );
};

export const BodyText = ({
  children,
  bold = false,
}: {
  children: React.ReactNode;
  bold?: boolean;
}) => {
  const { theme } = useTheme();

  return (
    <Text
      style={{
        fontFamily: "HKGrotesk",
        fontSize: TYPOGRAPHY.sizes.body,
        color: theme.textColor,
        fontWeight: bold ? 700 : 400,
      }}
    >
      {children}
    </Text>
  );
};

export const BodyMutedText = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();

  return (
    <Text
      style={{
        fontFamily: "HKGrotesk",
        fontSize: TYPOGRAPHY.sizes.body,
        color: theme.textMutedColor,
      }}
    >
      {children}
    </Text>
  );
};

export const SecondaryText = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();

  return (
    <Text
      style={{
        fontFamily: "HKGrotesk",
        fontSize: TYPOGRAPHY.sizes.secondary,
        color: theme.textColor,
      }}
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
        fontFamily: "HKGrotesk",
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
      style={{
        fontFamily: "HKGrotesk",
        fontSize: TYPOGRAPHY.sizes.tertiary,
        color: theme.textColor,
      }}
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
        fontFamily: "HKGrotesk",
        fontSize: TYPOGRAPHY.sizes.tertiary,
        color: theme.textMutedColor,
      }}
    >
      {children}
    </Text>
  );
};

export const ErrorText = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();

  return (
    <Text
      style={{
        fontFamily: "HKGrotesk",
        fontSize: TYPOGRAPHY.sizes.tertiary,
        color: theme.errorColor,
      }}
    >
      {children}
    </Text>
  );
};
