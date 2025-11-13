import { useTheme } from "@/providers/theme-provider";
import { FontAwesome6 } from "@expo/vector-icons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs } from "expo-router";
import { View } from "react-native";

const queryClient = new QueryClient();

export default function TabLayout() {
  const { theme } = useTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <Tabs
        initialRouteName="index"
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarInactiveTintColor: theme.borderColor,
          tabBarActiveTintColor: theme.textColor,
          tabBarStyle: {
            height: 100,
            paddingTop: 20,
          },
          tabBarBackground: () => (
            <View
              style={{
                flex: 1,
                backgroundColor: theme.tabBgColor,
                borderTopColor: theme.borderColor,
                borderTopWidth: 1,
              }}
            />
          ),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome6 name="house" color={color} size={22} />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome6 name="magnifying-glass" color={color} size={22} />
            ),
          }}
        />
        <Tabs.Screen
          name="new"
          options={{
            tabBarIcon: () => (
              <LinearGradient
                colors={theme.gradient}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FontAwesome6 name="plus" color={"#FFFFFF"} size={22} />
              </LinearGradient>
            ),
          }}
        />
        <Tabs.Screen
          name="notifications"
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome6 name="bell" color={color} size={22} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome6 name="user" color={color} size={22} />
            ),
          }}
        />
      </Tabs>
    </QueryClientProvider>
  );
}
