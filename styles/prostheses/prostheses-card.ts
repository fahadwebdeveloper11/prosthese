import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  itemHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 12,
  },
  detail: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
});
