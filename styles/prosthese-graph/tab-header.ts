import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  darkTabContainer: {
    borderBottomColor: "#333",
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: "#e6f2ff",
  },
  darkActiveTab: {
    backgroundColor:Colors.empty,
  },
  tabText: {
    marginLeft: 8,
    color: "#666",
  },
  activeTabText: {
    color: "#007AFF",
    fontWeight: "bold",
  },
});
