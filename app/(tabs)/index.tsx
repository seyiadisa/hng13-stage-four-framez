import { PageContainer } from "@/components/container";
import { BodyText, TitleText } from "@/components/typography";
import { View } from "react-native";

export default function Index() {
  return (
    <PageContainer>
      <View style={{ alignItems: "flex-start", width: "100%" }}>
        <TitleText bold>Good Morning, Seyi</TitleText>
      </View>

      <View>
        <BodyText>TODO: My feed</BodyText>
      </View>
    </PageContainer>
  );
}
