import Header from "@/components/shared/Header";
import { prostheseTypes } from "@/constants/prosthese-types";
import { useProstheses } from "@/context/ProsthesesContext";
import { styles } from "@/styles/add-prosthese/add-prosthese";
import { FontAwesome } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ProsthesisType = "Hip" | "Knee" | "Shoulder";

export default function AddProsthesis() {
  const [data, setData] = useState({
    type: "Hip",
    prostheseName: "",
    date: new Date(),
    hospitalName: "",
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const { addProsthesis } = useProstheses();

  const handleSubmit = async () => {
    if (!data.prostheseName || !data.hospitalName || !data.type || !data.date) {
      alert("Please fill all fields");
      return;
    }

    try {
      await addProsthesis(data);
      router.back();
    } catch (error) {
      alert("Failed to save prosthesis");
      console.error("Save error:", error);
    }
  };

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setData({
        ...data,
        date: selectedDate,
      });
    }
  };

  const handleInputChange = (val: string, key: string) => {
    setData({
      ...data,
      [key]: val,
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Add Prosthesis" />

      <View style={styles.formContainer}>
        <Text style={styles.label}>Prosthese Name</Text>
        <TextInput
          style={styles.input}
          value={data.prostheseName}
          onChangeText={(val) => handleInputChange(val, "prostheseName")}
          placeholder="Enter prosthese name"
        />
        <Text style={styles.label}>Prosthesis Type:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={data.type}
            onValueChange={(itemValue) => handleInputChange(itemValue, "type")}
            style={styles.picker}
          >
            {prostheseTypes.map((item, index) => (
              <Picker.Item key={index} label={item} value={item} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Hospital Name</Text>
        <TextInput
          style={styles.input}
          value={data.hospitalName}
          onChangeText={(val) => handleInputChange(val, "hospitalName")}
          placeholder="Enter hospital name"
        />
        <View style={styles.dateContainer}>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <FontAwesome name="calendar" size={20} color="#007AFF" />
            <Text style={styles.dateText}>
              {data.date.toLocaleDateString()}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
          <Text style={styles.saveButtonText}>Save Prosthesis</Text>
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={data.date}
          mode="date"
          display="default"
          onChange={onChangeDate}
          maximumDate={new Date()}
        />
      )}
    </SafeAreaView>
  );
}
