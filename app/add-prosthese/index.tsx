import { DatePickerButton } from "@/components/shared/DatePickerBtn";
import Header from "@/components/shared/Header";
import { Input, Select } from "@/components/shared/InputAndSelect";
import { Colors } from "@/constants/Colors";
import { prostheseTypes } from "@/constants/prosthese-types";
import { useProstheses } from "@/context/ProsthesesContext";
import { styles } from "@/styles/add-prosthese/add-prosthese";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ProsthesisType = "Hip" | "Knee" | "Shoulder";

export default function AddProsthesis() {
  const [data, setData] = useState({
    type: "Hip",
    prostheseName: "",
    date: new Date(),
    hospitalName: "",
    position: "",
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const { addProsthesis } = useProstheses();

  const handleSubmit = useCallback(async () => {
    if (
      !data.prostheseName ||
      !data.hospitalName ||
      !data.type ||
      !data.date ||
      !data.position
    ) {
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
  }, [addProsthesis, data, router]);

  const onChangeDate = useCallback(
    (event: any, selectedDate?: Date) => {
      setShowDatePicker(false);
      if (selectedDate) {
        setData({
          ...data,
          date: selectedDate,
        });
      }
    },
    [data, setData]
  );

  const handleInputChange = useCallback(
    (val: string, key: string) => {
      setData({
        ...data,
        [key]: val,
      });
    },
    [data, setData]
  );
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Add Prosthesis" />

      <View style={styles.formContainer}>
        <Input
          label="Prosthese Name"
          value={data.prostheseName}
          onChangeText={(val) => handleInputChange(val, "prostheseName")}
          placeholder="Enter prosthese name"
        />

        <Select
          label="Prosthesis Type"
          selectedValue={data.type}
          onValueChange={(itemValue) => handleInputChange(itemValue, "type")}
          items={prostheseTypes}
        />

        <Input
          label="Hospital Name"
          value={data.hospitalName}
          onChangeText={(val) => handleInputChange(val, "hospitalName")}
          placeholder="Enter hospital name"
        />

        <Input
          label="Position"
          value={data.position}
          onChangeText={(val) => handleInputChange(val, "position")}
          placeholder="Position (Left, Right, T1, T2, etc.)"
        />

        <DatePickerButton
          date={data.date}
          onPress={() => setShowDatePicker(true)}
          containerStyle={styles.dateContainer}
          buttonStyle={styles.dateButton}
          isLabel
          textStyle={{
            color: data.date > new Date() ? Colors.yellow : Colors.green,
          }}
          iconColor={data.date > new Date() ? Colors.yellow : Colors.green}
        />

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
          // maximumDate={new Date()}
        />
      )}
    </SafeAreaView>
  );
}
