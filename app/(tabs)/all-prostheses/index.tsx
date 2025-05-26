import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AllProstheses = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>AllProstheses</Text>
    </SafeAreaView>
  );
};

export default AllProstheses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    padding:20
  },
});
