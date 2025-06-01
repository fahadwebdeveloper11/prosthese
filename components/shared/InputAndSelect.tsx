import { Colors } from "@/constants/Colors";
import { useUserContext } from "@/context/AuthContext";
import { styles } from "@/styles/shared/input-and-select";
import { Picker } from "@react-native-picker/picker";
import React, { memo } from "react";
import {
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

// Types for Label component
type LabelProps = {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
};

// Types for Input component
type InputProps = {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
} & Omit<TextInputProps, "style">;

// Types for Select component
type SelectProps = {
  label?: string;
  selectedValue: string;
  onValueChange: (itemValue: string) => void;
  items: string[];
  style?: StyleProp<ViewStyle>;
  pickerStyle?: any;
};

export const Label: React.FC<LabelProps> = memo(({ children, style }) => {
  const { settings } = useUserContext();
  return (
    <Text style={[styles.label, style, settings.darkMode && styles.darkLabel]}>
      {children}
    </Text>
  );
});

export const Input: React.FC<InputProps> = memo(
  ({
    label,
    value,
    onChangeText,
    placeholder,
    style,
    inputStyle,
    ...props
  }) => {
    const { settings } = useUserContext();
    return (
      <View style={style}>
        {label && <Label>{label}</Label>}
        <TextInput
          style={[
            styles.input,
            inputStyle,
            settings.darkMode && styles.darkInput,
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={Colors.gray}
          {...props}
        />
      </View>
    );
  }
);

export const Select: React.FC<SelectProps> = memo(
  ({
    label,
    selectedValue,
    onValueChange,
    items,
    style,
    pickerStyle,
    ...props
  }) => {
    const { settings } = useUserContext();
    return (
      <View style={style}>
        {label && <Label>{label}</Label>}
        <View
          style={[
            styles.pickerContainer,
            settings.darkMode && styles.darkPickerContainer,
          ]}
        >
          <Picker
            selectedValue={selectedValue}
            onValueChange={onValueChange}
            style={[
              styles.picker,
              pickerStyle,
              settings.darkMode && styles.darkPicker,
            ]}
            {...props}
            selectionColor={Colors.primary_blue}
            dropdownIconColor={settings.darkMode ? Colors.white : Colors.black}
          >
            {items.map((item, index) => (
              <Picker.Item key={index} label={item} value={item} />
            ))}
          </Picker>
        </View>
      </View>
    );
  }
);
