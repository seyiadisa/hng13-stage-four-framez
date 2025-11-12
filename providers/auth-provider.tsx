import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { useRouter } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";

type AuthType = {
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  checkUsername: (
    username: string,
    setError: ({ username }: { username: string }) => void,
    setIsValid: (isValid: boolean) => void
  ) => Promise<void>;
  setUsername: (username: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthType | undefined>(undefined);

export const useAuth = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return auth;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from("profiles")
      .select("username")
      .limit(1)
      .single();

    if (data && data.username) {
      setLoading(false);

      if (data.username === email) {
        router.navigate("/(auth)/username");
      } else {
        router.navigate("/");
      }
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    setLoading(true);

    const { data: authData, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      Alert.alert(error.message);
      setLoading(false);
      return;
    }

    const user = authData.user;

    if (user) {
      const { error: db } = await supabase.from("profiles").insert({
        id: user.id,
        name,
        username: email, // default username as email before user sets it
      });

      setLoading(false);
      router.navigate("/(auth)/username");
    }
  };

  const checkUsername = async (
    username: string,
    setError: ({ username }: { username: string }) => void,
    setIsValid: (isValid: boolean) => void
  ) => {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.replace("/(auth)/login");
      setLoading(false);
      return;
    }

    if (username.length < 3) {
      setError({ username: "Username must be at least 3 characters long" });
      setIsValid(false);
      setLoading(false);
      return;
    }

    const { data: existing } = await supabase
      .from("profiles")
      .select("id")
      .eq("username", username)
      .maybeSingle();

    if (existing) {
      setError({ username: "Username already taken" });
      setIsValid(false);
      setLoading(false);
      return;
    }

    setError({ username: "" });
    setLoading(false);
    setIsValid(true);
  };

  const setUsername = async (username: string) => {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { error } = await supabase
        .from("profiles")
        .update({ username })
        .eq("id", user.id);

      if (error) {
        Alert.alert("Error updating username", error.message);
      }
    }
    setLoading(false);
  };

  const signOut = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();

    if (error) {
      Alert.alert(error.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    router.replace("/(auth)/login");
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        loading,
        signIn,
        signUp,
        signOut,
        checkUsername,
        setUsername,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
