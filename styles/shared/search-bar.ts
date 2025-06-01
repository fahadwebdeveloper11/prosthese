import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 16,
    marginBottom: 10,
    marginTop: 8,
  },
  darkSearchContainer: {
    backgroundColor: Colors.dark_background,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.dark_background,
    paddingVertical: 8,
  },
  icon: {
    marginRight: 10,
  },
  darkInput: {
    color: Colors.white,
  },
});
