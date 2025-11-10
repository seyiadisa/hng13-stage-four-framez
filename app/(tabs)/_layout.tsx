import { FontAwesome6 } from "@expo/vector-icons";
import { Tabs } from "expo-router";
export default function TabLayout() {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{ tabBarShowLabel: false, headerShown: false }}
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
