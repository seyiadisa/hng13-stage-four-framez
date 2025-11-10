import { OutlineButton, PageContainer } from "@/components/container";
import { BodyMutedText, BodyText, TitleText } from "@/components/typography";
import { useTheme } from "@/providers/theme-provider";
import { formatNumber } from "@/utils";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";

export default function Index() {
  const { theme } = useTheme();

  return (
    <PageContainer>
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          marginBottom: 24,
          marginTop: 12,
        }}
      >
        <LinearGradient
          colors={["#F62E8E", "#AC1AF0"]}
          style={{
            width: 106,
            height: 106,
            borderRadius: 53,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 12,
          }}
        >
          <Image
            source={require("@/assets/images/profile.jpg")}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              borderWidth: 3,
              borderColor: theme.bgColor,
            }}
          />
        </LinearGradient>
        <TitleText>Seyi Adisa</TitleText>
        <BodyMutedText>Lagos, Nigeria</BodyMutedText>
        <BodyText>Software Developer</BodyText>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          marginBottom: 24,
        }}
      >
        <View style={{ flexDirection: "column", gap: 4 }}>
          <BodyText>{formatNumber(1000)}</BodyText>
          <BodyMutedText>Followers</BodyMutedText>
        </View>
        <View style={{ flexDirection: "column", gap: 4 }}>
          <BodyText>{formatNumber(2000)}</BodyText>
          <BodyMutedText>Following</BodyMutedText>
        </View>
        <View>
          <OutlineButton>
            <BodyText>Edit Profile</BodyText>
          </OutlineButton>
        </View>
      </View>
      <BodyText>TODO: Posts</BodyText>
    </PageContainer>
  );
}
