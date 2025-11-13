import {
  GhostButton,
  PageContainer,
  PrimaryButton,
} from "@/components/container";
import { BodyMutedText } from "@/components/typography";
import { uploadImage, uploadTextPost } from "@/lib/upload-post";
import { useTheme } from "@/providers/theme-provider";
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Keyboard, Pressable, TextInput, View } from "react-native";

export default function Index() {
  const { theme } = useTheme();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [isAttachmentPillOpen, setIsAttachmentPillOpen] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
      base64: true, // Request base64 data
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const takeImage = async () => {
    const response = await ImagePicker.requestCameraPermissionsAsync();

    if (response.status !== "granted") {
      alert("Permission to access camera is required!");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
      base64: true, // Request base64 data
    });
    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const publishPost = async () => {
    setLoading(true);
    let imagePath: string | undefined = undefined;

    if (image) {
      imagePath = await uploadImage(image);
    }

    if (text.trim() !== "") {
      uploadTextPost(text, imagePath);
    }

    setLoading(false);
    setText("");
    setImage(null);
  };

  const discardPost = () => {
    setText("");
    setImage(null);
  };

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
          <GhostButton variant="accent" onPress={discardPost}>
            Discard
          </GhostButton>
          {loading ? (
            <PrimaryButton disabled>Publishing...</PrimaryButton>
          ) : (
            <PrimaryButton onPress={publishPost}>Publish</PrimaryButton>
          )}
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
                <Pressable onPress={pickImage}>
                  <FontAwesome6
                    name="image"
                    size={16}
                    color={theme.textColor}
                  />
                </Pressable>
                <Pressable onPress={takeImage}>
                  <AntDesign name="camera" size={16} color={theme.textColor} />
                </Pressable>
              </View>
            )}
          </View>
          {image && (
            <View style={{ marginTop: 24, position: "relative" }}>
              <Image
                source={{ uri: image.uri }}
                style={{ width: 200, height: 200, borderRadius: 12 }}
              />
              <Pressable
                onPress={() => setImage(null)}
                style={{
                  position: "absolute",
                  top: 4,
                  left: 8,
                  backgroundColor: "rgba(0,0,0,0.6)",
                  borderRadius: 999,
                  padding: 6,
                }}
              >
                <FontAwesome6 name="xmark" size={16} color={"#FFFFFF"} />
              </Pressable>
            </View>
          )}
        </View>
      </PageContainer>
    </Pressable>
  );
}
