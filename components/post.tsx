import { supabase } from "@/lib/supabase";
import { useTheme } from "@/providers/theme-provider";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { View } from "react-native";
import { BodyText } from "./typography";

export default function Post({
  text,
  imagePath,
}: {
  text?: string;
  imagePath?: string;
}) {
  const { theme } = useTheme();

  return (
    <View
      style={{
        marginBottom: 24,
        borderTopWidth: 1,
        borderTopColor: theme.borderColor,
        width: "100%",
        alignItems: "center",
      }}
    >
      {imagePath && <PostImage imagePath={imagePath} />}
      {text && (
        <View
          style={{ marginTop: 12, width: "100%", alignItems: "flex-start" }}
        >
          <BodyText>{text}</BodyText>
        </View>
      )}
    </View>
  );
}

const PostImage = ({ imagePath }: { imagePath: string }) => {
  const { theme } = useTheme();

  const { data, isLoading } = useQuery({
    queryKey: ["postImage", imagePath],
    queryFn: async () => {
      const { data } = supabase.storage.from("posts").getPublicUrl(imagePath);
      return data;
    },
  });

  const imageUrl = data?.publicUrl;

  if (isLoading || !imageUrl) {
    return (
      <View style={{ aspectRatio: 1, backgroundColor: theme.borderColor }} />
    );
  }

  return (
    <Image
      source={{ uri: imageUrl }}
      style={{ width: 300, aspectRatio: 1, borderRadius: 12 }}
    />
  );
};
