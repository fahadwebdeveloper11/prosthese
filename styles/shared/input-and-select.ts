import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: Colors.label,
  },
  darkLabel: {
    color: Colors.white,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border_gray,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: Colors.white,
  },
  darkInput: {
    borderColor: Colors.dark_border,
    backgroundColor: Colors.dark_background,
    color: Colors.white,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: Colors.border_gray,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: Colors.white,
  },
  darkPickerContainer: {
    borderColor: Colors.dark_border,
    backgroundColor: Colors.dark_background,
  },
  picker: {
    width: "100%",
  },
  darkPicker: {
    color: Colors.white,
  },
  pickerItem: {
    // fontSize: 16,
    // color: Colors.black,
    backgroundColor: Colors.white,

  },
  darkPickerItem: {
    color: Colors.white,
    backgroundColor: Colors.dark_background,
  },
});


