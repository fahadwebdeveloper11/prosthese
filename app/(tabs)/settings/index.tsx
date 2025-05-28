import { Gender, useUserContext } from "@/context/AuthContext";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SettingsScreen = () => {
  // User data from store
  const {
    user,
    settings,
    updateUser,
    toggleDarkMode,
    setLanguage,
    clearLocalData,
  } = useUserContext();

  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(user.name);
  const [tempSurname, setTempSurname] = useState(user.surname);
  const [tempGender, setTempGender] = useState<Gender>(user.gender);
  const [tempDob, setTempDob] = useState(user.dateOfBirth);

  const darkMode = settings.darkMode;
  const handleSave = () => {
    updateUser({
      name: tempName,
      surname: tempSurname,
      gender: tempGender,
      dateOfBirth: tempDob,
    });
    setIsEditing(false);
  };

  const confirmDeleteLocalData = () => {
    Alert.alert(
      "Delete Local Data",
      "Are you sure you want to delete all local data? This cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: clearLocalData, style: "destructive" },
      ]
    );
  };

  const deleteRemoteData = () => {
    console.log("[DEVELOPER] Request to delete remote data received");
    Alert.alert(
      "Remote Data Deletion",
      "Request to delete remote data has been logged. Administrator will process this request."
    );
  };

  return (
    <ScrollView>
      <SafeAreaView
        style={[styles.container, darkMode && styles.darkContainer]}
      >
        <Text style={[styles.header, darkMode && styles.darkText]}>
          Settings
        </Text>

        {/* User Settings Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>
            User Settings
          </Text>

          {isEditing ? (
            <>
              <View style={styles.row}>
                <Text style={[styles.label, darkMode && styles.darkText]}>
                  Name:
                </Text>
                <TextInput
                  style={[styles.input, darkMode && styles.darkInput]}
                  value={tempName}
                  onChangeText={setTempName}
                  placeholder="Enter name"
                />
              </View>

              <View style={styles.row}>
                <Text style={[styles.label, darkMode && styles.darkText]}>
                  Surname:
                </Text>
                <TextInput
                  style={[styles.input, darkMode && styles.darkInput]}
                  value={tempSurname}
                  onChangeText={setTempSurname}
                  placeholder="Enter surname"
                />
              </View>

              <View style={styles.row}>
                <Text style={[styles.label, darkMode && styles.darkText]}>
                  Gender:
                </Text>
                <Picker
                  selectedValue={tempGender}
                  onValueChange={setTempGender}
                  style={[styles.picker, darkMode && styles.darkPicker]}
                >
                  <Picker.Item label="Male" value="male" />
                  <Picker.Item label="Female" value="female" />
                </Picker>
              </View>

              <View style={styles.row}>
                <Text style={[styles.label, darkMode && styles.darkText]}>
                  Date of Birth:
                </Text>
                <TouchableOpacity
                  style={[styles.dateButton, darkMode && styles.darkDateButton]}
                  onPress={() => {
                    /* Date picker implementation */
                  }}
                >
                  <Text style={darkMode && styles.darkText}>
                    {tempDob.toLocaleDateString()}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setIsEditing(false)}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSave}
                >
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <View style={styles.row}>
                <Text style={[styles.label, darkMode && styles.darkText]}>
                  Name:
                </Text>
                <Text style={[styles.value, darkMode && styles.darkText]}>
                  {user.name} {tempSurname}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={[styles.label, darkMode && styles.darkText]}>
                  Gender:
                </Text>
                <Text style={[styles.value, darkMode && styles.darkText]}>
                  {tempGender}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={[styles.label, darkMode && styles.darkText]}>
                  Date of Birth:
                </Text>
                <Text style={[styles.value, darkMode && styles.darkText]}>
                  {tempDob.toLocaleDateString()}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={[styles.label, darkMode && styles.darkText]}>
                  User ID:
                </Text>
                <Text style={[styles.value, darkMode && styles.darkText]}>
                  {user.userId}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.editButton}
                onPress={() => setIsEditing(true)}
              >
                <Text style={styles.editButtonText}>Edit Profile</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* App Settings Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>
            App Settings
          </Text>

          <View style={styles.row}>
            <Text style={[styles.label, darkMode && styles.darkText]}>
              Dark Mode:
            </Text>
            <Switch
              value={darkMode}
              onValueChange={toggleDarkMode}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={darkMode ? "#f5dd4b" : "#f4f3f4"}
            />
          </View>

          <View style={styles.row}>
            <Text style={[styles.label, darkMode && styles.darkText]}>
              Language:
            </Text>
            <Picker
              selectedValue={settings.language}
              onValueChange={setLanguage}
              style={[styles.picker, darkMode && styles.darkPicker]}
            >
              <Picker.Item label="English" value="en" />
              <Picker.Item label="German" value="de" />
              <Picker.Item label="French" value="fr" />
            </Picker>
          </View>
        </View>

        {/* Data Settings Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>
            Data Settings
          </Text>

          <TouchableOpacity
            style={styles.dangerButton}
            onPress={confirmDeleteLocalData}
          >
            <Text style={styles.dangerButtonText}>Delete Local Data</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.dangerButton}
            onPress={deleteRemoteData}
          >
            <Text style={styles.dangerButtonText}>Delete Remote Data</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  darkContainer: {
    backgroundColor: "#121212",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000",
  },
  darkText: {
    color: "#fff",
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
  dateButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
  },
  darkDateButton: {
    borderColor: "#555",
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

export default SettingsScreen;
