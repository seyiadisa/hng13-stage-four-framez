import { ScrollContainer } from "@/components/container";
import FeedPost from "@/components/feed-post";
import { TitleText } from "@/components/typography";
import { useExploreFeed } from "@/hooks/use-feed";
import { useTheme } from "@/providers/theme-provider";
import { FontAwesome6 } from "@expo/vector-icons";
import { Keyboard, Pressable, TextInput, View } from "react-native";

export default function Index() {
  const { theme } = useTheme();
  const { data: feed } = useExploreFeed();

  return (
    <ScrollContainer>
      <Pressable onPress={Keyboard.dismiss} style={{ flex: 1, width: "100%" }}>
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

          <View style={{ width: "100%", marginTop: 32 }}></View>
        </View>
        {feed?.map((post) => (
          <FeedPost
            key={post.id}
            poster_id={post.author_id}
            text={post.content}
            imagePath={post.media_url}
            createdAt={post.created_at}
          />
        ))}
      </Pressable>
    </ScrollContainer>
  );
}
