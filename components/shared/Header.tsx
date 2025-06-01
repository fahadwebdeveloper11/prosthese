import { styles } from "@/styles/shared/header";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { FC, memo } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface HeaderProps {
  title: string;
  darkMode?: boolean;
}

const Header: FC<HeaderProps> = ({ title,darkMode }) => {
  return (
    <View style={[styles.header, darkMode && styles.darkHeader]}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <FontAwesome name="arrow-left" size={24} color="#007AFF" />
      </TouchableOpacity>
      <Text style={[styles.title, darkMode && styles.darkTitle]}>{title}</Text>
      <View style={{ width: 24 }} />
    </View>
  );
};

export default memo(Header);
