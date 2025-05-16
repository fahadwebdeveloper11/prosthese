import { chartConfig } from "@/constants/prosthese-graph";
import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

interface CharProps {
  labels: string[];
  dataPoints: number[];
  chartWidth: number;
}

const Chart: FC<CharProps> = ({ labels, dataPoints, chartWidth }) => {
  return (
    <View style={styles.chartContainer}>
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
    </View>
  );
};

export default Chart;

const styles = StyleSheet.create({
  chartContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
