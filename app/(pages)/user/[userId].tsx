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
import { supabase } from "@/lib/supabase";
import { useTheme } from "@/providers/theme-provider";
import { formatNumber } from "@/utils";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function UserProfile() {
  const { theme } = useTheme();
  const { userId } = useLocalSearchParams();
  const { data: profile } = useProfileInfo(userId as string);
  const { data: posts } = useProfilePosts(userId as string);
  const { data: followers } = useFollowers(userId as string);
  const { data: following, refetch: refetchFollowing } = useFollowing(
    userId as string
  );
  const { data: currentUser } = useProfileInfo();
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

  const currentUserId = currentUser?.id;

  useEffect(() => {
    if (followers && currentUserId) {
      setIsFollowing(
        followers.some((follower) => follower.follower_id === currentUserId)
      );
    }
  }, [followers, currentUserId]);

  const handleFollow = async () => {
    if (!currentUserId) return;
    setLoading(true);

    const { error } = await supabase.from("follows").insert({
      follower_id: currentUserId,
      following_id: userId,
    });
    if (!error) {
      setIsFollowing(true);
    }
    setLoading(false);
    refetchFollowing();
  };

  const handleUnfollow = async () => {
    if (!currentUserId) return;
    setLoading(true);

    const { error } = await supabase
      .from("follows")
      .delete()
      .eq("follower_id", currentUserId)
      .eq("following_id", userId);

    if (!error) {
      setIsFollowing(false);
    }
    setLoading(false);
    refetchFollowing();
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
              uri: profile ? profile.avatar_url : "",
            }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              borderWidth: 3,
              borderColor: theme.bgColor,
            }}
          />
        </LinearGradient>

        <TitleText bold>{profile.name}</TitleText>
        <BodyText>{profile.bio}</BodyText>
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
          {isFollowing ? (
            <OutlineButton onPress={handleUnfollow}>Unfollow</OutlineButton>
          ) : (
            <GradientButton loading={loading} onPress={handleFollow}>
              Follow
            </GradientButton>
          )}
        </View>
      </View>

      {posts?.map((post) => (
        <FeedPost
          key={post.id}
          text={post.content}
          imagePath={post.media_url}
        />
      ))}
    </ScrollContainer>
  );
}
