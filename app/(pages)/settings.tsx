import { GhostButton, PageContainer } from "@/components/container";
import { TitleText } from "@/components/typography";
import { useAuth } from "@/providers/auth-provider";
import { useTheme } from "@/providers/theme-provider";
import { View } from "react-native";

export default function Settings() {
  const { signOut } = useAuth();
  const { setDarkTheme, setLightTheme, setSystemTheme } = useTheme();

  return (
    <PageContainer>
      <View style={{ alignItems: "flex-start", gap: 20, width: "100%" }}>
        <TitleText bold>Settings</TitleText>
        <View style={{ gap: 12 }}>
          <TitleText>Choose Theme</TitleText>
          <GhostButton variant="primary" onPress={setLightTheme}>
            Light
          </GhostButton>
          <GhostButton variant="primary" onPress={setDarkTheme}>
            Dark
          </GhostButton>
          <GhostButton variant="primary" onPress={setSystemTheme}>
            System
          </GhostButton>
        </View>
        <GhostButton variant="accent" onPress={signOut}>
          Log out
        </GhostButton>
      </View>
    </PageContainer>
  );
}
