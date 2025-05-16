import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { tabs } from "@/constants/tabs";

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#007AFF",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {
            backgroundColor: "#f5f5f5",
          },
        }),
      }}
    >
      {tabs.map(({ name, options }) => (
        <Tabs.Screen key={name} name={name} options={options} />
      ))}
    </Tabs>
  );
}
