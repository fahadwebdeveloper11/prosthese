import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#999",
    marginTop: 8,
  },
  item: {
    backgroundColor: Colors.white,
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  darkItem: {
    backgroundColor: Colors.dark_background,
    borderColor: Colors.label,
  },
  itemHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  darkTitle: {
    color: Colors.white,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color:Colors.empty,
  },
  darkDate: {
    color: Colors.primary_blue,
  },
  score: {
    fontSize: 14,
  },
  darkScore: {
    color: Colors.primary_blue,
  },
  scoreValue: {
    fontWeight: "bold",
  },
  darkScoreValue: {
    color: Colors.primary_blue,
  },
  notes: {
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
    marginBottom: 12,
  },
  testsSection: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 12,
  },
  testContainer: {
    marginBottom: 16,
  },
  testQuestion: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
  },
  optionButton: {
    padding: 8,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    backgroundColor: "#f9f9f9",
  },
  darkOptionButton: {
    backgroundColor: Colors.dark_background,
    borderColor: Colors.dark_border,
  },
  selectedOption: {
    backgroundColor: "#e3f2fd",
    borderColor: Colors.primary_blue,
  },
  darkSelectedOption: {
    backgroundColor: Colors.primary_blue,
    borderColor: Colors.primary_blue,
  },
  disabledOption: {
    opacity: 0.7,
  },
  optionText: {
    fontSize: 13,
  },
  darkOptionText: {
    color: Colors.white,
  },
  testScoreContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  scoreLabel: {
    fontSize: 13,
    marginRight: 8,
    color: "#666",
  },
  darkScoreLabel: {
    color: Colors.white,
  },
  scoreInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 6,
    width: 60,
    fontSize: 13,
  },
  darkScoreInput: {
    backgroundColor: Colors.dark_background,
    borderColor: Colors.dark_border,
    color: Colors.white,
  },
  scoreDisplay: {
    fontSize: 13,
    fontWeight: "bold",
  },
  darkScoreDisplay: {
    color: Colors.primary_blue,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#007AFF",
    borderRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    marginLeft: 8,
  },
  cancelButton: {
    backgroundColor: "#f44336",
  },
});
