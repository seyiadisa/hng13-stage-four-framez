import { OutlineButton, ScrollContainer } from "@/components/container";
import Post from "@/components/post";
import { BodyMutedText, BodyText, TitleText } from "@/components/typography";
import { useProfile, useUserFollowers } from "@/hooks/use-profile";
import { useTheme } from "@/providers/theme-provider";
import { formatNumber } from "@/utils";
import { AntDesign } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { TouchableOpacity, View } from "react-native";

export default function Index() {
  const { theme } = useTheme();
  const router = useRouter();
  const { data: posts } = useProfile();
  const [{ data: followers }, { data: following }] = useUserFollowers();

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
          <OutlineButton>Edit Profile</OutlineButton>
        </View>
      </View>

      {posts?.map((post) => (
        <Post key={post.id} text={post.content} imagePath={post.media_url} />
      ))}
    </ScrollContainer>
  );
}
