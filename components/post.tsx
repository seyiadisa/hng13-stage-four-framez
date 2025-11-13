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
  return (
    <View
      style={{
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
  return (
    <Image
      source={{ uri: imagePath }}
      style={{ width: 300, aspectRatio: 1, borderRadius: 12 }}
    />
  );
};
