import { useRouter } from "expo-router";
import { createContext, useContext, useState } from "react";

type User = {
  name: string;
};

type AuthType = {
  user: User | null;
  isLoggedIn: boolean;
  signIn: () => void;
  setUser: (user: User) => void;
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
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const router = useRouter();

  const signIn = () => {
    setUser({ name: "John Doe" });
    setIsLoggedIn(true);
    router.replace("/");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, signIn, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
