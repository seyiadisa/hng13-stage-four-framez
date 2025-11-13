import { ScrollContainer } from "@/components/container";
import FeedPost from "@/components/feed-post";
import { TitleText } from "@/components/typography";
import { useHomeFeed } from "@/hooks/use-feed";
import { View } from "react-native";

export default function Index() {
  const { data: homeFeed } = useHomeFeed();

  return (
    <ScrollContainer>
      <View style={{ alignItems: "flex-start", width: "100%" }}>
        <TitleText bold>Good Morning, Seyi</TitleText>
      </View>

      {!homeFeed || homeFeed.length === 0 ? (
        <View
          style={{
            width: "100%",
            marginTop: 32,
            alignItems: "center",
          }}
        >
          <TitleText>
            Your feed is empty. Follow users to see their posts here!
          </TitleText>
        </View>
      ) : (
        homeFeed?.map((post) => (
          <FeedPost
            key={post.id}
            poster_id={post.author_id}
            text={post.content}
            imagePath={post.media_url}
          />
        ))
      )}
    </ScrollContainer>
  );
}
