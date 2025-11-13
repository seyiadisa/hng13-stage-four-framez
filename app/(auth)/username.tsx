import { PageContainer } from "@/components/container";
import { BodyText, ErrorText } from "@/components/typography";
import { useAuth } from "@/providers/auth-provider";
import { useTheme } from "@/providers/theme-provider";
import { usernameSchema } from "@/schemas";
import { authStyles } from "@/styles";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Keyboard,
  Pressable,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Username() {
  const router = useRouter();
  const { checkUsername, setUsername: setName } = useAuth();
  const { theme } = useTheme();
  const styles = authStyles(theme);

  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState({ username: "" });
  const [isValidUsername, setIsValidUsername] = useState(false);

  const validateUsername = async (name: string) => {
    const newErrors = { username: "" };
    setErrors(newErrors);
    setUsername(name.toLowerCase());

    const result = usernameSchema.safeParse(username);

    if (!result.success) {
      setIsValidUsername(false);
      for (const issue of result.error.issues) {
        newErrors.username = issue.message;
      }
      setErrors(newErrors);
      return;
    }

    await checkUsername(
      name.toLowerCase(),
      ({ username }) => {
        setErrors({ username });
      },
      setIsValidUsername
    );
  };

  const handleSubmit = async () => {
    setName(username);
    router.replace("/");
  };

  return (
    <Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}>
      <PageContainer>
        <View
          style={{
            marginTop: 60,
            alignItems: "center",
            width: "100%",
          }}
        >
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor={theme.textMutedColor}
              value={username}
              onChangeText={validateUsername}
              autoCapitalize="none"
            />
          </View>
          {errors.username && (
            <View style={styles.errorText}>
              <ErrorText>{errors.username}</ErrorText>
            </View>
          )}

          <TouchableOpacity
            onPress={() => handleSubmit()}
            disabled={!isValidUsername}
            style={{
              width: "100%",
              borderRadius: 32,
              overflow: "hidden",
              marginTop: 24,
            }}
          >
            {isValidUsername ? (
              <LinearGradient
                colors={theme.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ padding: 16, alignItems: "center" }}
              >
                <BodyText bold>Select username</BodyText>
              </LinearGradient>
            ) : (
              <View
                style={{
                  padding: 16,
                  alignItems: "center",
                  backgroundColor: theme.borderColor,
                }}
              >
                <BodyText bold>Select username</BodyText>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </PageContainer>
    </Pressable>
  );
}
