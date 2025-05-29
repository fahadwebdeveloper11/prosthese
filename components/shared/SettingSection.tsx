import {
    SectionButtonProps,
    SectionProps,
    SectionRowProps,
    SectionSwitchProps,
} from "@/constants/setting-types";
import { styles } from "@/styles/shared/setting-section";
import React from "react";
import { Switch, Text, TouchableOpacity, View } from "react-native";

const Section: React.FC<SectionProps> = ({
  title,
  darkMode = false,
  children,
  style = {},
}) => {
  return (
    <View style={[styles.section, style]}>
      <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>
        {title}
      </Text>
      {children}
    </View>
  );
};

const SectionRow: React.FC<SectionRowProps> = ({
  label,
  value = "",
  darkMode = false,
  isEditing = false,
  editComponent,
  style = {},
}) => {
  return (
    <View style={[styles.row, style]}>
      <Text style={[styles.label, darkMode && styles.darkText]}>{label}:</Text>
      {isEditing ? (
        editComponent
      ) : (
        <Text style={[styles.value, darkMode && styles.darkText]}>{value}</Text>
      )}
    </View>
  );
};

const SectionButton: React.FC<SectionButtonProps> = ({
  title,
  onPress,
  isDanger = false,
  style = {},
}) => {
  return (
    <TouchableOpacity
      style={[isDanger ? styles.dangerButton : styles.saveButton, style]}
      onPress={onPress}
    >
      <Text style={isDanger ? styles.dangerButtonText : styles.buttonText}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const SectionSwitch: React.FC<SectionSwitchProps> = ({
  label,
  value,
  onValueChange,
  darkMode = false,
  style = {},
}) => {
  return (
    <View style={[styles.darkModeRow, style]}>
      <Text style={[styles.label, darkMode && styles.darkText]}>{label}:</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={value ? "#f5dd4b" : "#f4f3f4"}
      />
    </View>
  );
};

export { Section, SectionButton, SectionRow, SectionSwitch };

