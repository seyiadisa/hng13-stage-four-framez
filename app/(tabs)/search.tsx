import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Search</Text>
      <Text>
        Go to <Link href={"/(auth)/login"}>login</Link>
      </Text>
    </View>
  );
}
