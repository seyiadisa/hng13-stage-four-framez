import { useTheme } from "@/providers/theme-provider";
import { FontAwesome6 } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View } from "react-native";

export default function TabLayout() {
  const { theme } = useTheme();

  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarInactiveTintColor: theme.borderColor,
        tabBarActiveTintColor: theme.textColor,
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
            <FontAwesome6 name="house" color={color} size={18} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="magnifying-glass" color={color} size={18} />
          ),
        }}
      />
      <Tabs.Screen
        name="new"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="plus" color={color} size={18} />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="bell" color={color} size={18} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="user" color={color} size={18} />
          ),
        }}
      />
    </Tabs>
  );
}
