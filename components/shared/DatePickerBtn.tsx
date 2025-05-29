import { styles } from "@/styles/shared/date-picker-btn";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Label } from "./InputAndSelect";

type DatePickerButtonProps = {
  date: Date;
  onPress: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<TextStyle>;
  textStyle?: StyleProp<TextStyle>;
  iconName?: string;
  iconSize?: number;
  iconColor?: string;
  isLabel?: boolean;
};

export const DatePickerButton: React.FC<DatePickerButtonProps> = ({
  date,
  onPress,
  containerStyle,
  buttonStyle,
  iconStyle,
  textStyle,
  iconName = "calendar",
  iconSize = 20,
  iconColor = "#007AFF",
  isLabel = false,
}) => {
  return (
    <View style={[styles.dateContainer, containerStyle]}>
      {isLabel && <Label>Date</Label>}
      <TouchableOpacity
        style={[styles.dateButton, buttonStyle]}
        onPress={onPress}
      >
        <FontAwesome
          name={iconName as any}
          size={iconSize}
          color={iconColor}
          style={iconStyle}
        />
        <Text style={[styles.dateText, textStyle]}>
          {date.toLocaleDateString()}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
