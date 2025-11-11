import { GhostButton, PageContainer } from "@/components/container";
import { BodyText, TitleText } from "@/components/typography";
import { View } from "react-native";

export default function Index() {
  return (
    <PageContainer>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TitleText bold>Alerts</TitleText>
        <GhostButton variant="primary">Mark all as read</GhostButton>
      </View>

      <View>
        <BodyText>TODO: Notifications</BodyText>
      </View>
    </PageContainer>
  );
}
