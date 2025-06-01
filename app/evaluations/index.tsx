import EvalCard from "@/components/evaluations/EvalCard";
import Header from "@/components/shared/Header";
import { useUserContext } from "@/context/AuthContext";
import { styles } from "@/styles/evaluations/styles";
import { Evaluation, EvaluationWithType } from "@/types/types";
import { getDefaultTests } from "@/utils/getDefualtTests";
import { FontAwesome } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { FlatList, KeyboardAvoidingView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EvaluationsList() {
  const { settings } = useUserContext();
  const { item }: any = useLocalSearchParams();

  const evals = item ? JSON.parse(item) : null;

  const [evaluations, setEvaluations] = React.useState<EvaluationWithType[]>(
    []
  );

  React.useEffect(() => {
    if (evals) {
      // Get all evaluations from all prostheses with type information
      const allEvaluations: any[] =
        evals.map((e: Evaluation) => ({
          ...e,
          prosthesisType: e.prostheseType,

          tests: e.tests || getDefaultTests(e.prostheseType),
        })) || [];

      // Sort evaluations by date (newest first)
      const sortedEvaluations = [...allEvaluations].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      setEvaluations(sortedEvaluations);
    }
  }, []);

  const updateEvaluation = async (
    prosthesisId: string,
    evaluationId: string,
    updatedEvaluation: any
  ) => {
    console.log("evaluationId => ", evaluationId);
    setEvaluations((prevEvaluations) =>
      prevEvaluations.map((evaluation) =>
        evaluation.id === evaluationId
          ? {
              ...evaluation,
              ...updatedEvaluation,
              date: updatedEvaluation.date || evaluation.date,
              tests: updatedEvaluation.tests || evaluation.tests || [],
            }
          : evaluation
      )
    );
  };

  if (evaluations.length === 0) {
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
    <SafeAreaView
      style={[styles.container, settings.darkMode && styles.darkContainer]}
    >
      <Header title="Evaluations" darkMode={settings.darkMode} />
      <KeyboardAvoidingView behavior="padding">
        <FlatList
          data={evaluations}
          renderItem={({ item }: { item: EvaluationWithType }) => (
            <EvalCard
              allEvaluations={evaluations}
              item={item}
              updateEvaluation={updateEvaluation}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
