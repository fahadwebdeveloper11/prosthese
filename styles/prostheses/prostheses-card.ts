import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // item: {
  //   backgroundColor: "white",
  //   padding: 16,
  //   borderRadius: 8,
  //   marginBottom: 12,
  //   shadowColor: "#000",
  //   shadowOffset: { width: 0, height: 1 },
  //   shadowOpacity: 0.1,
  //   shadowRadius: 2,
  //   elevation: 2,
  //   width:"100%"
  // },

  // itemHeader: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   marginBottom: 8,
  // },
  // title: {
  //   fontSize: 18,
  //   fontWeight: "600",
  //   marginLeft: 10,
  //   color: "#333",
  // },
  // detail: {
  //   fontSize: 14,
  //   color: "#666",
  //   marginTop: 4,
  // },
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
    width: "100%",
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
  detailRow: {
    flexDirection: "row",
    marginBottom: 6,
    alignItems: "flex-start",
  },
  label: {
    fontSize: 14,
    color: "#666",
    width: 120,
    fontWeight: "500",
  },
  value: {
    fontSize: 14,
    color: "#333",
    flex: 1,
    flexWrap: "wrap",
  },
});
