import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.gray_second,
    backgroundColor: "white",
  },
  darkDateContainer: {
    borderColor: Colors.dark_border,
    backgroundColor: Colors.dark_background,
  },
  darkDateButton: {
    borderColor: Colors.dark_border,
    backgroundColor: Colors.dark_background,
  },
  dateText: {
    marginLeft: 10,
    fontSize: 16,
    color: Colors.primary_blue,
  },
});
