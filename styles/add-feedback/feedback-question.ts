import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  darkQuestionText: {
    color: Colors.white,
  },
  optionButton: {
    padding: 12,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  darkOptionButton: {
    borderColor: Colors.dark_border,
  },
  selectedOption: {
    backgroundColor: "#e3f2fd",
    borderColor: "#2196f3",
  },
  darkSelectedOption: {
    backgroundColor: Colors.dark_background,
    borderColor: Colors.primary_blue,
  },
  optionText: {
    fontSize: 14,
  },
  darkOptionText: {
    color: Colors.white,
  },
});
