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
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color:Colors.dark_background,
  },
  darkTitle: {
    color: Colors.white,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    color: Colors.empty,
  },
  darkDescription: {
    color: Colors.white,
    opacity: 0.7,
  },
  image: {
    width: "100%",
    height: 220,
    marginBottom: 16,
    borderRadius: 8,
  },
  section: {
    marginTop: 24,
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#444",
  },
  evaluation: {
    padding: 12,
    marginBottom: 8,
  },
  graphLink: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#f0f8ff",
    borderRadius: 8,
  },
  graphLinkText: {
    marginLeft: 10,
    color: "#007AFF",
    fontWeight: "500",
  },
  separator: { borderBottomWidth: 1, borderBottomColor: "#eee" },
});
