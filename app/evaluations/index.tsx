import EvalCard from "@/components/evaluations/EvalCard";
import { useProstheses } from "@/context/ProsthesesContext";
import { styles } from "@/styles/evaluations/styles";
import { Evaluation, EvaluationWithType } from "@/types/types";
import { getDefaultTests } from "@/utils/getDefualtTests";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EvaluationsList() {
  const { prostheses, isLoading, updateEvaluation } = useProstheses();

  // Get all evaluations from all prostheses with type information
  const allEvaluations: any[] = prostheses.flatMap(
    (p) =>
      p.evaluations
        ?.filter((e: Evaluation) => e.prostheseId === p.id)
        .map((e: Evaluation) => ({
          ...e,
          prosthesisType: p.type,
          prosthesisId: p.id,
          tests: e.tests || getDefaultTests(p.type),
        })) || []
  );

  // Sort evaluations by date (newest first)
  const sortedEvaluations = [...allEvaluations].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text>Loading evaluations...</Text>
      </SafeAreaView>
    );
  }

  if (sortedEvaluations.length === 0) {
    return (
      <SafeAreaView style={styles.emptyContainer}>
        <FontAwesome name="clipboard" size={48} color="#ccc" />
        <Text style={styles.emptyText}>No evaluations found</Text>
        <Text style={styles.emptySubtext}>
          Add evaluations to see them here
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={sortedEvaluations}
        renderItem={({ item }: { item: EvaluationWithType }) => (
          <EvalCard
            allEvaluations={allEvaluations}
            item={item}
            updateEvaluation={updateEvaluation}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}
