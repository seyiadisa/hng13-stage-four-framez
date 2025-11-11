import {
  GhostButton,
  PageContainer,
  PrimaryButton,
} from "@/components/container";
import { BodyMutedText, TitleText } from "@/components/typography";
import { useTheme } from "@/providers/theme-provider";
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useState } from "react";
import { Keyboard, Pressable, TextInput, View } from "react-native";

export default function Index() {
  const { theme } = useTheme();
  const [text, setText] = useState("");
  const [isAttachmentPillOpen, setIsAttachmentPillOpen] = useState(false);

  return (
    <Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}>
      <PageContainer>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <GhostButton variant="accent">Discard</GhostButton>
          <TitleText>CREATE</TitleText>
          <PrimaryButton>Publish</PrimaryButton>
        </View>

        <View style={{ width: "100%", marginTop: 28, flex: 1 }}>
          <View
            style={{ flexDirection: "row", alignItems: "flex-start", gap: 20 }}
          >
            <Image
              source={require("@/assets/images/profile.jpg")}
              style={{
                width: 56,
                height: 56,
                borderRadius: 50,
                borderWidth: 3,
              }}
            />
            <View style={{ flex: 1, gap: 12 }}>
              <TextInput
                placeholder="What's on your mind?"
                style={{
                  color: theme.textColor,
                  fontSize: 16,
                  lineHeight: 24,
                }}
                placeholderTextColor={theme.textMutedColor}
                multiline
                maxLength={280}
                onChangeText={setText}
                value={text}
              />
              <BodyMutedText>{text.length} / 280</BodyMutedText>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              gap: 16,
              marginTop: 12,
            }}
          >
            <Pressable onPress={() => setIsAttachmentPillOpen((prev) => !prev)}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 24,
                  borderWidth: 1,
                  borderColor: theme.borderColor,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FontAwesome6
                  name={isAttachmentPillOpen ? "xmark" : "plus"}
                  size={16}
                  color={theme.textColor}
                />
              </View>
            </Pressable>

            {isAttachmentPillOpen && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 24,
                  backgroundColor: theme.borderColor,
                  borderRadius: 32,
                  paddingHorizontal: 24,
                  paddingVertical: 12,
                }}
              >
                <Pressable>
                  <FontAwesome6
                    name="image"
                    size={16}
                    color={theme.textColor}
                  />
                </Pressable>
                <Pressable>
                  <AntDesign name="gif" size={16} color={theme.textColor} />
                </Pressable>
                <Pressable>
                  <AntDesign name="camera" size={16} color={theme.textColor} />
                </Pressable>
              </View>
            )}
          </View>
        </View>
      </PageContainer>
    </Pressable>
  );
}
