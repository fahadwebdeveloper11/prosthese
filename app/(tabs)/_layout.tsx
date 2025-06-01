import { Tabs } from "expo-router";
import React from "react";
import { Platform, StatusBar, Text } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { tabs } from "@/constants/tabs";
import { useUserContext } from "@/context/AuthContext";
// import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabLayout() {
  const { settings } = useUserContext();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#007AFF",
          tabBarInactiveTintColor: settings.darkMode
            ? Colors.white
            : Colors.gray,
          tabBarLabel(props) {
            return (
              <Text
                style={{
                  color: props.focused
                    ? Colors.primary_blue
                    : settings.darkMode
                    ? Colors.white
                    : Colors.gray,
                  fontSize: 10,
                }}
              >
                {props.children}
              </Text>
            );
          },
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarLabelStyle: {
            color: settings.darkMode ? "#fff" : "#333",
          },
          tabBarHideOnKeyboard: true,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              position: "absolute",
            },
            default: {
              backgroundColor: settings.darkMode ? "#333" : "#f5f5f5",
              // backgroundColor: "red",
            },
          }),
        }}
      >
        {tabs.map(({ name, options }) => (
          <Tabs.Screen key={name} name={name} options={options} />
        ))}
      </Tabs>
      <StatusBar
        barStyle={settings.darkMode ? "light-content" : "default"}
      />
    </SafeAreaView>
  );
}
