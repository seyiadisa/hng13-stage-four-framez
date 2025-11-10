import { useAuth } from "@/providers/auth-provider";
import { Pressable, Text, View } from "react-native";

export default function Login() {
  const { signIn } = useAuth();

  return (
    <View>
      <Pressable onPress={signIn}>
        <Text>Login</Text>
      </Pressable>
    </View>
  );
}
