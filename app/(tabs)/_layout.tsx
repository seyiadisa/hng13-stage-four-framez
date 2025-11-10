import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
export default function TabLayout() {
  return (
    <Tabs initialRouteName="index" screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "index",
          tabBarIcon: ({ color }) => <FontAwesome name="home" color={color} />,
        }}
      />
    </Tabs>
  );
}
