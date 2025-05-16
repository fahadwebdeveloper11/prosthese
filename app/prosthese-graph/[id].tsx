import Chart from "@/components/shared/Chart";
import Header from "@/components/shared/Header";
import { monthNames } from "@/constants/prosthese-graph";
import { useProstheses } from "@/context/ProsthesesContext";
import { styles } from "@/styles/prosthese-graph/prosthese-graph";
import { FontAwesome } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { Dimensions, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const chartWidth = Dimensions.get("window").width;

export default function GraphsScreen() {
  const { id } = useLocalSearchParams();
  const { prostheses } = useProstheses();

  const prosthesis = prostheses.find((p) => p.id === id);

  if (!prosthesis) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Prosthesis not found</Text>
      </SafeAreaView>
    );
  }

  const getChartData = () => {
    return prosthesis.evaluations
      .map((eva: any) => {
        const date = new Date(eva.date); // should be like "May 16, 2025"

        const formattedDate = `${
          monthNames[date.getMonth()]
        } ${date.getDate()}`;
        console.log("formattedDate", formattedDate);
        const yValue = eva.score;

        return {
          x: formattedDate,
          y: yValue,
          label: `${yValue}`,
        };
      })
      .filter((item) => !isNaN(item.y));
  };

  const chartData = getChartData();
  const labels = chartData.map((d) => d.x.toString());
  const dataPoints = chartData.map((d) => d.y);

  return (
    <SafeAreaView style={styles.container}>
      <Header title={"Prosthesis Graphs"} />
      <View style={styles.contentContainer}>
        <View style={styles.tab}>
          <FontAwesome name={"heartbeat"} size={20} color={"#007AFF"} />
          <Text style={styles.activeTabText}>Pain Level</Text>
        </View>

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
              Add evaluations to see progress charts
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
