import { PageContainer } from "@/components/container";
import { BodyText, TitleText } from "@/components/typography";
import { useTheme } from "@/providers/theme-provider";
import { FontAwesome6 } from "@expo/vector-icons";
import { Keyboard, Pressable, TextInput, View } from "react-native";

export default function Index() {
  const { theme } = useTheme();

  return (
    <Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}>
      <PageContainer>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 36,
            paddingHorizontal: 16,
            paddingVertical: 12,
            gap: 12,
            backgroundColor: theme.borderColor,
          }}
        >
          <TextInput
            placeholder="Search for people, posts, tags..."
            placeholderTextColor={theme.textMutedColor}
            style={{
              flex: 1,
              color: theme.textColor,
              fontSize: 16,
              lineHeight: 24,
            }}
          />
          <FontAwesome6
            name="magnifying-glass"
            size={20}
            color={theme.textColor}
          />
        </View>

        <View
          style={{ width: "100%", marginTop: 28, alignItems: "flex-start" }}
        >
          <TitleText bold>Popular</TitleText>
          <BodyText>TODO: Show posts</BodyText>
        </View>
      </PageContainer>
    </Pressable>
  );
}
