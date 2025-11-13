import { useTheme } from "@/providers/theme-provider";
import { darkTheme, TYPOGRAPHY } from "@/styles/theme";
import { LinearGradient } from "expo-linear-gradient";
import {
  GestureResponderEvent,
  ScrollView,
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

export function ScrollContainer({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.bgColor,
      paddingTop: 48,
      paddingInline: 20,
      color: theme.textColor,
      alignItems: "center",
      minHeight: "100%",
      width: "100%",
    },
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>{children}</ScrollView>
  );
}

export function PrimaryButton({
  disabled,
  children,
  onPress,
}: {
  disabled?: boolean;
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
      disabled={disabled}
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

export const GradientButton = ({
  loading,
  onPress,
  children,
}: {
  loading: boolean;
  onPress: () => void;
  children: React.ReactNode;
}) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      style={{ width: "100%", borderRadius: 32, overflow: "hidden" }}
    >
      {!loading ? (
        <LinearGradient
          colors={theme.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ padding: 16, alignItems: "center" }}
        >
          <Text
            style={{
              fontSize: TYPOGRAPHY.sizes.body,
              fontWeight: 700,
              color: darkTheme.textColor,
            }}
          >
            {children}
          </Text>
        </LinearGradient>
      ) : (
        <View
          style={{
            padding: 16,
            alignItems: "center",
            backgroundColor: theme.borderColor,
          }}
        >
          <Text
            style={{
              fontSize: TYPOGRAPHY.sizes.body,
              fontWeight: 700,
              color: darkTheme.textColor,
            }}
          >
            {children}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
