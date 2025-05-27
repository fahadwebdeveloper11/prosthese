import TabHeader from "@/components/prosthese-graph/TabHeader";
import Chart from "@/components/shared/Chart";
import Header from "@/components/shared/Header";
import { monthNames } from "@/constants/prosthese-graph";
import { useProstheses } from "@/context/ProsthesesContext";
import { styles } from "@/styles/prosthese-graph/prosthese-graph";
import { Evaluation } from "@/types/types";
import { FontAwesome } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Dimensions,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const chartWidth = Dimensions.get("window").width * 0.98;

type EvaluationType = "pain" | "rom" | "happiness";

export default function GraphsScreen() {
  const { id } = useLocalSearchParams();
  const { prostheses } = useProstheses();
  const [activeTab, setActiveTab] = useState<EvaluationType>("pain");
  const [painLevel, setPainLevel] = useState<any[]>([]);
  const [rom, setRom] = useState<any[]>([]);
  const [happiness, setHappiness] = useState<any[]>([]);
  const [score, setScore] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const prosthesis = prostheses.find((p) => p.id === id);

  if (!prosthesis) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Prosthesis not found</Text>
      </SafeAreaView>
    );
  }

  const getCurrentTabData = () => {
    switch (activeTab) {
      case "pain":
        return painLevel;
      case "rom":
        return rom;
      case "happiness":
        return happiness;
    }
  };

  const setCurrentTabData = (data: Evaluation[]) => {
    switch (activeTab) {
      case "pain":
        setPainLevel(data);
        break;
      case "rom":
        setRom(data);
        break;
      case "happiness":
        setHappiness(data);
        break;
    }
  };

  const handleAddChartData = () => {
    if (!score) return;

    if (activeTab === "pain" && Number(score) > 10) {
      Alert.alert("Pain level cannot be greater than 10");
      return;
    }

    if (activeTab === "rom" && Number(score) > 120) {
      Alert.alert("ROM cannot be greater than 120");
      return;
    }

    if (activeTab === "happiness" && Number(score) > 10) {
      Alert.alert("Happiness level cannot be greater than 10");
      return;
    }

    if (date > new Date()) {
      Alert.alert("Date cannot be in the future");
      return;
    }

    const newData = {
      score: Number(score),
      date: new Date(date), // Create a new Date object to avoid reference issues
    };

    setCurrentTabData([...getCurrentTabData(), newData]);
    setScore("");
  };

  const getChartData = () => {
    return getCurrentTabData()
      .map((eva) => {
        const date = new Date(eva.date);
        const formattedDate = `${
          monthNames[date.getMonth()]
        } ${date.getDate()}`;
        const yValue = eva.score;

        return {
          x: formattedDate,
          y: yValue,
          label: `${yValue}`,
        };
      })
      .filter((item) => !isNaN(item.y));
  };
  const getTabData = () => {
    switch (activeTab) {
      case "pain":
        return {
          title: "Pain Level",
          icon: "heartbeat",
          min: 0,
          max: 10,
          unit: "",
          placeholder: "Enter pain level (0-10)",
        };
      case "rom":
        return {
          title: "Range of Motion",
          icon: "rotate-right",
          min: 0,
          max: 120,
          unit: "°",
          placeholder: "Enter ROM (0-120)",
        };
      case "happiness":
        return {
          title: "Happiness",
          icon: "smile-o",
          min: 0,
          max: 10,
          unit: "",
          placeholder: "Enter happiness (0-10)",
        };
    }
  };

  const currentTabData = getTabData();
  const chartData = getChartData();
  const labels = chartData.map((d) => d.x.toString());
  const dataPoints = chartData.map((d) => d.y);

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleShare = () => {
    console.log(painLevel, rom, happiness);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={"Prosthesis Graphs"} />
      <TabHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      <ScrollView style={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={currentTabData.placeholder}
            keyboardType="numeric"
            value={score}
            onChangeText={setScore}
          />
          <Text style={styles.unitText}>{currentTabData.unit}</Text>
        </View>

        <View style={styles.dateContainer}>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <FontAwesome name="calendar" size={20} color="#007AFF" />
            <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddChartData}
          >
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChangeDate}
            maximumDate={new Date()}
          />
        )}

        {chartData.length > 0 ? (
          <Chart
            chartWidth={chartWidth}
            dataPoints={dataPoints}
            labels={labels}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <FontAwesome name="area-chart" size={48} color="#ccc" />
            <Text style={styles.emptyText}>No data available</Text>
            <Text style={styles.emptySubtext}>
              Add data to see progress charts
            </Text>
          </View>
        )}
        <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
          <Text style={styles.shareBtnText}>Share</Text>
          <FontAwesome name="share-square" size={18} color="white" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
