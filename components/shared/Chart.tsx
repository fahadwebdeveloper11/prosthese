import { Colors } from "@/constants/Colors";
import { useUserContext } from "@/context/AuthContext";
import React, { FC } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";

interface CharProps {
  labels: string[];
  dataPoints: number[];
  chartWidth: number;
}

const Chart: FC<CharProps> = ({ labels, dataPoints, chartWidth }) => {
  const { settings } = useUserContext();
  const darkMode = settings.darkMode;
  const chartConfig = {
    backgroundColor: darkMode ? Colors.dark_container : "transparent",
    backgroundGradientFrom: darkMode
      ? Colors.dark_container
      : Colors.background,
    backgroundGradientTo: darkMode ? Colors.dark_container : Colors.background,
    decimalPlaces: 1,
    color: (opacity = 1) =>
      darkMode ? Colors.primary_blue : Colors.primary_blue,
    labelColor: (opacity = 1) =>
      darkMode
        ? `rgba(200, 200, 200, ${opacity})`
        : `rgba(0, 0, 0, ${opacity})`,
    propsForDots: {
      r: "4",
      strokeWidth: "2",
      stroke: darkMode ? Colors.dark_stroke : Colors.stroke,
    },
    style: {
      borderRadius: 16,
    },
  };

  return (
    <ScrollView horizontal contentContainerStyle={styles.chartContainer}>
      <LineChart
        data={{
          labels,
          datasets: [
            {
              data: dataPoints,
              strokeWidth: 2,
            },
          ],
        }}
        width={chartWidth}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={{ borderRadius: 16 }}
      />
    </ScrollView>
  );
};

export default Chart;

const styles = StyleSheet.create({
  chartContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 30,
    flex: 1,
  },
});
