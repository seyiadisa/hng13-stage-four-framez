import { useTheme } from "@/providers/theme-provider";
import { TYPOGRAPHY } from "@/theme";
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BodyText, SecondaryText } from "./typography";

export function PageContainer({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.bgColor,
      paddingTop: 48,
      paddingInline: 20,
      flex: 1,
      color: theme.textColor,
      alignItems: "center",
    },
  });

  return <View style={styles.container}>{children}</View>;
}

export function PrimaryButton({
  children,
  onPress,
}: {
  children: React.ReactNode;
  onPress?: (e: GestureResponderEvent) => void;
}) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={{
        backgroundColor: theme.primary,
        borderRadius: 32,
        paddingInline: 12,
        paddingBlock: 4,
      }}
      onPress={onPress}
    >
      <SecondaryText>{children}</SecondaryText>
    </TouchableOpacity>
  );
}

export function OutlineButton({
  children,
  onPress,
}: {
  children: React.ReactNode;
  onPress?: (e: GestureResponderEvent) => void;
}) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={{
        borderWidth: 1,
        borderColor: theme.textColor,
        borderRadius: 32,
        paddingInline: 24,
        paddingBlock: 12,
      }}
      onPress={onPress}
    >
      <BodyText>{children}</BodyText>
    </TouchableOpacity>
  );
}

export function GhostButton({
  children,
  variant = "primary",
  small = false,
  onPress,
}: {
  children: React.ReactNode;
  variant: "primary" | "accent";
  small?: boolean;
  onPress?: (e: GestureResponderEvent) => void;
}) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <Text
        style={{
          fontWeight: 700,
          color: variant === "primary" ? theme.primary : theme.accent,
          fontSize: small ? TYPOGRAPHY.sizes.tertiary : TYPOGRAPHY.sizes.body,
        }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}
