import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  darkContainer: {
    backgroundColor: Colors.dark_container,
  },
  contentContainer: {},
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#999",
  },

  input: {
    flex: 1,
    marginHorizontal: 20,
    position: "relative",
    marginVertical: 20,
  },
  unitText: {
    fontSize: 16,
    color: "#666",
    position: "absolute",
    right: 40,
    top: 20,
  },
  dateContainer: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },

  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  dateText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#007AFF",
  },
  addButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  shareBtn: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 20,
    flexDirection: "row",
    gap: 8,
  },
  shareBtnText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
