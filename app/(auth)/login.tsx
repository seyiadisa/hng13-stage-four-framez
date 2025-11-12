import { GhostButton, PageContainer } from "@/components/container";
import {
  BodyText,
  BrandText,
  ErrorText,
  TertiaryText,
} from "@/components/typography";
import { useAuth } from "@/providers/auth-provider";
import { useTheme } from "@/providers/theme-provider";
import { loginSchema } from "@/schemas";
import { authStyles } from "@/styles";
import { Feather } from "@expo/vector-icons";
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

export default function Login() {
  const router = useRouter();
  const { loading, signIn } = useAuth();
  const { theme } = useTheme();
  const styles = authStyles(theme);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const validate = () => {
    const newErrors = { email: "", password: "" };
    let isValid = true;

    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      for (const issue of result.error.issues) {
        if (issue.path[0] === "email") {
          newErrors.email = issue.message;
        }
        if (issue.path[0] === "password") {
          newErrors.password = issue.message;
        }
      }
      setErrors(newErrors);
      return false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = () => {
    if (validate()) {
      signIn(email, password);
    }
  };

  return (
    <Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}>
      <PageContainer>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <BrandText>Framez</BrandText>
          <View style={{ height: 60 }} />

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={theme.textMutedColor}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          {errors.email && (
            <View style={styles.errorText}>
              <ErrorText>{errors.email}</ErrorText>
            </View>
          )}

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={theme.textMutedColor}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!isPasswordVisible}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              <Feather
                name={isPasswordVisible ? "eye-off" : "eye"}
                size={20}
                color={theme.textMutedColor}
              />
            </TouchableOpacity>
          </View>
          {errors.password && (
            <View style={styles.errorText}>
              <ErrorText>{errors.password}</ErrorText>
            </View>
          )}

          <View style={{ alignSelf: "flex-end", marginBottom: 24 }}>
            <GhostButton variant="accent" small>
              Forgot Password?
            </GhostButton>
          </View>

          <TouchableOpacity
            onPress={handleLogin}
            disabled={loading}
            style={{ width: "100%", borderRadius: 32, overflow: "hidden" }}
          >
            {!loading ? (
              <LinearGradient
                colors={["#F62E8E", "#AC1AF0"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ padding: 16, alignItems: "center" }}
              >
                <BodyText bold>Log in</BodyText>
              </LinearGradient>
            ) : (
              <View
                style={{
                  padding: 16,
                  alignItems: "center",
                  backgroundColor: theme.borderColor,
                }}
              >
                <BodyText bold>Log in</BodyText>
              </View>
            )}
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingBottom: 24,
              marginTop: 36,
            }}
          >
            <TertiaryText>Don&apos;t have an account? </TertiaryText>
            <GhostButton
              onPress={() => router.replace("/signup")}
              variant="accent"
              small
            >
              Sign up
            </GhostButton>
          </View>
        </View>
      </PageContainer>
    </Pressable>
  );
}
