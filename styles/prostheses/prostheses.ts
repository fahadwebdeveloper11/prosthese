import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  listContent: {
    padding: 16,
    gap:20
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
    backgroundColor: Colors.background,
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
