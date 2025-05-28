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
  return <Text style={[styles.label, style]}>{children}</Text>;
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
    return (
      <View style={style}>
        {label && <Label>{label}</Label>}
        <TextInput
          style={[styles.input, inputStyle]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
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
    return (
      <View style={style}>
        {label && <Label>{label}</Label>}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedValue}
            onValueChange={onValueChange}
            style={[styles.picker, pickerStyle]}
            {...props}
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
