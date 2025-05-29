import {
  Section,
  SectionButton,
  SectionRow,
  SectionSwitch,
} from "@/components/shared/SettingSection";
import { Colors } from "@/constants/Colors";
import { Gender, useUserContext } from "@/context/AuthContext";
import { useProstheses } from "@/context/ProsthesesContext";
import { styles } from "@/styles/settings";
import { FontAwesome } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SettingsScreen = () => {
  // User data from store
  const { user, settings, updateUser, toggleDarkMode } = useUserContext();

  const { deleteAllProsthesis } = useProstheses();
  const [showDatePicker, setShowDatePicker] = useState(false);
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
        { text: "Delete", onPress: deleteAllProsthesis, style: "destructive" },
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
        <>
          <Section title="Settings" darkMode={darkMode}>
            {isEditing ? (
              <>
                <SectionRow
                  label="Name"
                  darkMode={darkMode}
                  isEditing
                  editComponent={
                    <TextInput
                      style={[styles.input, darkMode && styles.darkInput]}
                      value={tempName}
                      onChangeText={setTempName}
                      placeholder="Enter name"
                      placeholderTextColor={Colors.gray}
                    />
                  }
                />

                <SectionRow
                  label="Surname"
                  darkMode={darkMode}
                  isEditing
                  editComponent={
                    <TextInput
                      style={[styles.input, darkMode && styles.darkInput]}
                      value={tempSurname}
                      onChangeText={setTempSurname}
                      placeholder="Enter surname"
                      placeholderTextColor={Colors.gray}
                    />
                  }
                />

                <SectionRow
                  label="Gender"
                  darkMode={darkMode}
                  isEditing
                  editComponent={
                    <Picker
                      selectedValue={tempGender}
                      onValueChange={setTempGender}
                      style={[styles.picker, darkMode && styles.darkPicker]}
                    >
                      <Picker.Item label="Male" value="male" />
                      <Picker.Item label="Female" value="female" />
                    </Picker>
                  }
                />
                <SectionRow
                  label="Date of Birth"
                  darkMode={darkMode}
                  isEditing
                  editComponent={
                    <>
                      <TouchableOpacity
                        style={[
                          styles.dateButton,
                          darkMode && styles.darkDateButton,
                        ]}
                        onPress={() => setShowDatePicker(true)}
                      >
                        <FontAwesome
                          name={"calendar"}
                          size={20}
                          color={Colors.primary_blue}
                        />
                        <Text
                          style={[styles.dateText, darkMode && styles.darkText]}
                        >
                          {tempDob.toLocaleDateString()}
                        </Text>
                      </TouchableOpacity>
                      {showDatePicker && (
                        <DateTimePicker
                          value={tempDob}
                          mode="date"
                          display="default"
                          onChange={(event, selectedDate) => {
                            setShowDatePicker(false);
                            if (selectedDate) {
                              setTempDob(selectedDate);
                            }
                          }}
                          maximumDate={new Date()}
                        />
                      )}
                    </>
                  }
                />

                <View style={styles.buttonRow}>
                  <SectionButton
                    title="Cancel"
                    onPress={() => setIsEditing(false)}
                    style={styles.cancelButton}
                  />
                  <SectionButton
                    title="Save"
                    onPress={handleSave}
                    style={styles.saveButton}
                  />
                </View>
              </>
            ) : (
              <>
                <SectionRow
                  label="Name"
                  value={`${user.name} ${tempSurname}`}
                  darkMode={darkMode}
                />

                <SectionRow
                  label="Gender"
                  value={tempGender}
                  darkMode={darkMode}
                />

                <SectionRow
                  label="Date of Birth"
                  value={tempDob.toLocaleDateString()}
                  darkMode={darkMode}
                />

                <SectionRow
                  label="User ID"
                  value={user.userId}
                  darkMode={darkMode}
                />

                <SectionButton
                  title="Edit Profile"
                  onPress={() => setIsEditing(true)}
                  style={styles.editButton}
                />
              </>
            )}
          </Section>

          <Section title="App Settings" darkMode={darkMode}>
            <SectionSwitch
              label="Dark Mode"
              value={darkMode}
              onValueChange={toggleDarkMode}
              darkMode={darkMode}
            />
          </Section>

          <Section title="Data Settings" darkMode={darkMode}>
            <SectionButton
              title="Delete Local Data"
              onPress={confirmDeleteLocalData}
              isDanger
            />
            <SectionButton
              title="Delete Remote Data"
              onPress={deleteRemoteData}
              isDanger
            />
          </Section>
        </>
      </SafeAreaView>
    </ScrollView>
  );
};

export default SettingsScreen;
