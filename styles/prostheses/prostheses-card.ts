import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    // marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    width: "100%",
  },
  darkItem: {
    backgroundColor: Colors.dark_background,
  },
  itemHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
    color: "#333",
    flex: 1,
  },
  darkTitle: {
    color: Colors.white,
  },
  detailContainer: {
    marginTop: 12,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 6,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  label: {
    fontSize: 14,
    color: "#666",
    width: 120,
    fontWeight: "500",
  },
  darkLabel: {
    color: Colors.gray_second,
  },

  value: {
    fontSize: 14,
    color: "#333",
    flex: 1,
    flexWrap: "wrap",
  },
  darkValue: {
    color: Colors.white,
  },
  image: {
    width:"100%",
    height: 180,
    borderRadius: 8,
    marginBottom: 12,
  },
});
