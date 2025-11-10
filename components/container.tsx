import { useTheme } from "@/providers/theme-provider";
import { StyleSheet, View } from "react-native";

export function PageContainer({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.bgColor,
      paddingTop: 40,
      paddingInline: 20,
      flex: 1,
      color: theme.textColor,
      alignItems: "center",
    },
  });

  return <View style={styles.container}>{children}</View>;
}
