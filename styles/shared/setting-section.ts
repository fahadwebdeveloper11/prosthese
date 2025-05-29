import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  darkText: {
    color: Colors.white,
  },
  section: {
    marginBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray_second,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    color: Colors.black,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  darkModeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    justifyContent: "space-between",
  },
  label: {
    width: 120,
    fontSize: 16,
    color: Colors.black,
  },
  value: {
    flex: 1,
    fontSize: 16,
    color: Colors.black,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.gray_second,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: Colors.white,
  },
  darkInput: {
    borderColor: Colors.dark_border,
    backgroundColor: Colors.dark_background,
    color: Colors.white,
  },
  picker: {
    flex: 1,
    height: 50,
  },
  darkPicker: {
    color: Colors.white,
    backgroundColor: Colors.dark_background,
  },
  dateButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.gray_second,
    borderRadius: 5,
    padding: 10,
  },
  darkDateButton: {
    borderColor: Colors.dark_border,
    backgroundColor: Colors.dark_background,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  editButton: {
    backgroundColor: Colors.primary_blue,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  editButtonText: {
    color: Colors.white,
    fontWeight: "500",
  },
  cancelButton: {
    backgroundColor: Colors.cancel,
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: Colors.primary_blue,
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
  },
  buttonText: {
    color: Colors.white,
    fontWeight: "500",
  },
  dangerButton: {
    backgroundColor: Colors.red,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  dangerButtonText: {
    color: Colors.white,
    fontWeight: "500",
  },
});
