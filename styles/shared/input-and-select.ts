import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: Colors.label,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border_gray,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: Colors.white,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: Colors.border_gray,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: Colors.white,
  },
  picker: {
    width: "100%",
  },
});
