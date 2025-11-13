import { GhostButton, PageContainer } from "@/components/container";
import {
  BodyText,
  BrandText,
  ErrorText,
  TertiaryText,
} from "@/components/typography";
import { useAuth } from "@/providers/auth-provider";
import { useTheme } from "@/providers/theme-provider";
import { signupSchema } from "@/schemas";
import { authStyles } from "@/styles";
import { TYPOGRAPHY } from "@/styles/theme";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Keyboard,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Signup() {
  const { loading, signUp } = useAuth();
  const { theme } = useTheme();
  const router = useRouter();
  const styles = authStyles(theme);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const validate = () => {
    const newErrors = {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    };
    let isValid = true;

    const result = signupSchema.safeParse({
      email,
      name,
      password,
      confirmPassword,
    });

    if (!result.success) {
      for (const issue of result.error.issues) {
        if (issue.path[0] === "email") {
          newErrors.email = issue.message;
        }
        if (issue.path[0] === "name") {
          newErrors.name = issue.message;
        }
        if (issue.path[0] === "password") {
          newErrors.password = issue.message;
        }
        if (issue.path[0] === "confirmPassword") {
          newErrors.confirmPassword = issue.message;
        }
      }
      setErrors(newErrors);
      return false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSignup = () => {
    if (validate()) {
      signUp(name, email, password);
    }
  };

  return (
    <Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}>
      <PageContainer>
        <View
          style={{
            marginTop: 30,
            alignItems: "center",
            width: "100%",
          }}
        >
          <BrandText>Framez</BrandText>
          <View
            style={{
              marginTop: 24,
              width: "100%",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: theme.textColor,
                fontSize: TYPOGRAPHY.sizes.body,
                opacity: 0.7,
              }}
            >
              Sign up to see photos and videos from your friends
            </Text>
          </View>
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
              placeholder="Full name"
              placeholderTextColor={theme.textMutedColor}
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          </View>
          {errors.name && (
            <View style={styles.errorText}>
              <ErrorText>{errors.name}</ErrorText>
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

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor={theme.textMutedColor}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!isConfirmPasswordVisible}
            />
            <TouchableOpacity
              onPress={() =>
                setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
              }
            >
              <Feather
                name={isConfirmPasswordVisible ? "eye-off" : "eye"}
                size={20}
                color={theme.textMutedColor}
              />
            </TouchableOpacity>
          </View>
          {errors.confirmPassword && (
            <View style={styles.errorText}>
              <ErrorText>{errors.confirmPassword}</ErrorText>
            </View>
          )}

          <TouchableOpacity
            onPress={handleSignup}
            disabled={loading}
            style={{
              width: "100%",
              borderRadius: 32,
              overflow: "hidden",
              marginTop: 24,
            }}
          >
            {!loading ? (
              <LinearGradient
                colors={theme.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ padding: 16, alignItems: "center" }}
              >
                <BodyText bold>Create an account</BodyText>
              </LinearGradient>
            ) : (
              <View
                style={{
                  padding: 16,
                  alignItems: "center",
                  backgroundColor: theme.borderColor,
                }}
              >
                <BodyText bold>Create an account</BodyText>
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
            <TertiaryText>Already have an account? </TertiaryText>
            <GhostButton
              onPress={() => router.replace("/login")}
              variant="accent"
              small
            >
              Log in
            </GhostButton>
          </View>
        </View>
      </PageContainer>
    </Pressable>
  );
}
