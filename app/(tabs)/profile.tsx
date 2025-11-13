import {
  GradientButton,
  OutlineButton,
  ScrollContainer,
} from "@/components/container";
import FeedPost from "@/components/feed-post";
import { BodyMutedText, BodyText, TitleText } from "@/components/typography";
import {
  useFollowers,
  useFollowing,
  useProfileInfo,
  useProfilePosts,
} from "@/hooks/use-profile";
import { uploadImage, uploadProfileText } from "@/lib/upload-profile";
import { useTheme } from "@/providers/theme-provider";
import { TYPOGRAPHY } from "@/styles/theme";
import { formatNumber } from "@/utils";
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, TextInput, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { theme } = useTheme();
  const router = useRouter();
  const { data: posts } = useProfilePosts();
  const { data: profile, refetch: refetchProfile } = useProfileInfo();
  const { data: followers } = useFollowers();
  const { data: following } = useFollowing();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Your name");
  const [bio, setBio] = useState("Your bio");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setBio(profile.bio ?? "Your bio");
    }
  }, [profile]);

  const handleImageUpload = async () => {
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

  const handleSaveChanges = async () => {
    setIsEditing(false);
    setLoading(true);
    let imagePath: string | undefined = undefined;

    if (image) {
      imagePath = await uploadImage(image);
    }

    uploadProfileText(name, bio, imagePath);
    setLoading(false);
    setImage(null);

    setTimeout(() => {
      refetchProfile();
    }, 3000);
  };

  return (
    <ScrollContainer>
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          gap: 6,
          marginBottom: 24,
        }}
      >
        <LinearGradient
          colors={theme.gradient}
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
            source={{
              uri: image ? image.uri : profile ? profile.avatar_url : "",
            }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              borderWidth: 3,
              borderColor: theme.bgColor,
            }}
          />
          {isEditing && (
            <Pressable
              onPress={handleImageUpload}
              style={{
                position: "absolute",
                width: 100,
                height: 100,
                borderRadius: 50,
                backgroundColor: "rgba(0,0,0,0.5)",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesome6 name="plus" size={24} color="#FFFFFF" />
            </Pressable>
          )}
        </LinearGradient>
        {isEditing ? (
          <TextInput
            value={name}
            onChangeText={setName}
            style={{
              fontSize: TYPOGRAPHY.sizes.title,
              fontWeight: "bold",
              color: theme.textColor,
              textAlign: "center",
              paddingInline: 12,
              borderColor: theme.borderColor,
              borderWidth: 1,
            }}
          />
        ) : (
          <TitleText bold>{name}</TitleText>
        )}
        {isEditing ? (
          <TextInput
            value={bio}
            onChangeText={setBio}
            style={{
              fontSize: TYPOGRAPHY.sizes.body,
              color: theme.textColor,
              textAlign: "center",
              paddingInline: 12,
              borderColor: theme.borderColor,
              borderWidth: 1,
            }}
          />
        ) : (
          <BodyText>{bio}</BodyText>
        )}

        <View style={{ position: "absolute", top: 10, right: 0 }}>
          <TouchableOpacity
            onPress={() => router.navigate("/(pages)/settings")}
          >
            <AntDesign name="setting" color={theme.textColor} size={24} />
          </TouchableOpacity>
        </View>
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
          <BodyText>{formatNumber(followers ? followers.length : 0)}</BodyText>
          <BodyMutedText>Followers</BodyMutedText>
        </View>
        <View style={{ flexDirection: "column", gap: 4 }}>
          <BodyText>{formatNumber(following ? following.length : 0)}</BodyText>
          <BodyMutedText>Following</BodyMutedText>
        </View>
        <View>
          {isEditing ? (
            <GradientButton loading={loading} onPress={handleSaveChanges}>
              Finish editing
            </GradientButton>
          ) : (
            <OutlineButton onPress={() => setIsEditing(true)}>
              Edit Profile
            </OutlineButton>
          )}
        </View>
      </View>

      {posts?.map((post) => (
        <FeedPost
          key={post.id}
          text={post.content}
          imagePath={post.media_url}
          createdAt={post.created_at}
        />
      ))}
    </ScrollContainer>
  );
}
