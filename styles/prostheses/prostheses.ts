import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContainer: {
    backgroundColor: Colors.background,
  },
  darkContainer: {
    backgroundColor: Colors.dark_container,
  },
  darkEmptyContainer: {
    backgroundColor: Colors.dark_container,
  },
  listContent: {
    padding: 16,
    gap: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    // backgroundColor: Colors.background,
  },
  emptyText: {
    fontSize: 18,
    color: Colors.empty,
    marginVertical: 16,
  },
  addButton: {
    flexDirection: "row",
    backgroundColor: Colors.primary_blue,
    padding: 16,
    borderRadius: 8,
    // margin: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    color: Colors.white,
    fontWeight: "bold",
    marginLeft: 8,
  },
});
