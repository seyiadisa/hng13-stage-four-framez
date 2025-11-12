import { GhostButton, PageContainer } from "@/components/container";
import { TitleText } from "@/components/typography";
import { useAuth } from "@/providers/auth-provider";
import { View } from "react-native";

export default function Settings() {
  const { signOut } = useAuth();

  return (
    <PageContainer>
      <View style={{ alignItems: "flex-start", gap: 20, width: "100%" }}>
        <TitleText>Settings</TitleText>
        <GhostButton variant="accent" onPress={signOut}>
          Log out
        </GhostButton>
      </View>
    </PageContainer>
  );
}
