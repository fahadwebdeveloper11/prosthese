import Header from "@/components/shared/Header";
import { useProstheses } from "@/context/ProsthesesContext";
import { styles } from "@/styles/add-prosthese/add-prosthese";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ProsthesisType = "Hip" | "Knee" | "Shoulder";

export default function AddProsthesis() {
  const [type, setType] = useState<ProsthesisType>("Hip");
  const [surgicalAccesses, setSurgicalAccesses] = useState("2");
  const { addProsthesis } = useProstheses();

  const handleSubmit = async () => {
    if (!type || !surgicalAccesses) {
      alert("Please fill all fields");
      return;
    }

    const accessesNumber = parseInt(surgicalAccesses);
    if (isNaN(accessesNumber)) {
      alert("Please enter a valid number for surgical accesses");
      return;
    }

    try {
      await addProsthesis(type, accessesNumber);
      router.back();
    } catch (error) {
      alert("Failed to save prosthesis");
      console.error("Save error:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Add Prosthesis" />

      <View style={styles.formContainer}>
        <Text style={styles.label}>Prosthesis Type:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={type}
            onValueChange={(itemValue) => setType(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Hip" value="Hip" />
            <Picker.Item label="Knee" value="Knee" />
            <Picker.Item label="Shoulder" value="Shoulder" />
          </Picker>
        </View>

        <Text style={styles.label}>Number of Surgical Accesses:</Text>
        <TextInput
          style={styles.input}
          value={surgicalAccesses}
          onChangeText={setSurgicalAccesses}
          keyboardType="numeric"
          placeholder="Enter number (1-4)"
          maxLength={1}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
          <Text style={styles.saveButtonText}>Save Prosthesis</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
