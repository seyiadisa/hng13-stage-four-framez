import { useProfileInfo } from "@/hooks/use-profile";
import { useTheme } from "@/providers/theme-provider";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { View } from "react-native";
import Post from "./post";
import { BodyText } from "./typography";

export default function FeedPost({
  text,
  imagePath,
  poster_id,
}: {
  text?: string;
  imagePath?: string;
  poster_id?: string;
}) {
  const { theme } = useTheme();
  const { data: profile } = useProfileInfo(poster_id);

  return (
    <View
      style={{
        width: "100%",
        paddingBlock: 20,
        borderTopWidth: 1,
        borderTopColor: theme.borderColor,
      }}
    >
      {poster_id && (
        <Link
          href={{
            pathname: "/(pages)/user/[userId]",
            params: { userId: poster_id },
          }}
          style={{
            marginBottom: 12,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Image
              source={{ uri: profile?.avatar_url }}
              style={{ width: 32, height: 32, borderRadius: 16 }}
            />
            <BodyText>{profile?.username}</BodyText>
          </View>
        </Link>
      )}
      <Post text={text} imagePath={imagePath} />
    </View>
  );
}
