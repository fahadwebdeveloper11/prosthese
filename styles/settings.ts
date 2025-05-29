import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background,
  },
  darkContainer: {
    backgroundColor: Colors.dark_container,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: Colors.black,
  },
  darkText: {
    color: Colors.white,
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.gray_second,
    backgroundColor: Colors.white,
    flex: 1,
  },
  darkDateButton: {
    borderColor: Colors.gray_second,
    backgroundColor: Colors.dark_background,
  },
  dateText: {
    marginLeft: 10,
    fontSize: 16,
    color: Colors.primary_blue,
  },
  darkDateText: {
    color: Colors.white,
  },
  section: {
    marginBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    color: "#000",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  darkModeRw: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    justifyContent: "space-between",
  },
  label: {
    width: 120,
    fontSize: 16,
    color: "#000",
  },
  value: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  darkInput: {
    borderColor: "#555",
    backgroundColor: "#333",
    color: "#fff",
  },
  picker: {
    flex: 1,
    height: 50,
  },
  darkPicker: {
    color: "#fff",
    backgroundColor: "#333",
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  editButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "500",
  },
  cancelButton: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "500",
  },
  dangerButton: {
    backgroundColor: "#ff3b30",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  dangerButtonText: {
    color: "#fff",
    fontWeight: "500",
  },
});
