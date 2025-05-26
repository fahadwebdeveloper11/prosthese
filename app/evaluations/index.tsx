// // Define types
type EvaluationTest = {
  id: string;
  question: string;
  options: string[];
  selectedOption?: string;
  score?: number;
};

type EvaluationWithType = {
  id: string;
  date: string;
  score: number;
  notes?: string;
  prosthesisType: string;
  prosthesisId: string;
  tests?: EvaluationTest[];
};

import { useProstheses } from "@/context/ProsthesesContext";
import { Evaluation } from "@/types/types";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EvaluationsList() {
  const { prostheses, isLoading, updateEvaluation } = useProstheses();
  const [editingEvaluationId, setEditingEvaluationId] = useState<string | null>(
    null
  );
  // const [editedTests, setEditedTests] = useState<EvaluationTest[]>([]);
  const [editedTests, setEditedTests] = useState<any[]>([]);

  // Get all evaluations from all prostheses with type information
  const allEvaluations: EvaluationWithType[] = prostheses.flatMap(
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

  const getDefaultTests = (type: string): EvaluationTest[] => {
    const commonTests = [
      {
        id: "comfort",
        question: "Comfort level",
        options: [
          "Very comfortable",
          "Comfortable",
          "Neutral",
          "Uncomfortable",
          "Very uncomfortable",
        ],
      },
      {
        id: "functionality",
        question: "Daily functionality",
        options: ["Excellent", "Good", "Average", "Poor", "Very poor"],
      },
    ];

    if (type === "Hip") {
      return [
        ...commonTests,
        {
          id: "hip_mobility",
          question: "Hip mobility",
          options: ["Full range", "Good", "Limited", "Very limited"],
        },
      ];
    } else if (type === "Knee") {
      return [
        ...commonTests,
        {
          id: "knee_stability",
          question: "Knee stability",
          options: [
            "Very stable",
            "Stable",
            "Somewhat unstable",
            "Very unstable",
          ],
        },
      ];
    }

    return commonTests;
  };

  const startEditing = (evaluation: EvaluationWithType) => {
    setEditingEvaluationId(evaluation.id);
    setEditedTests(evaluation.tests ? [...evaluation.tests] : []);
  };

  const handleTestOptionSelect = (testId: string, option: string) => {
    setEditedTests((prevTests) =>
      prevTests.map((test) =>
        test.id === testId
          ? {
              ...test,
              selectedOption: option,
              score: calculateScoreFromOption(option),
            }
          : test
      )
    );
  };

  const handleTestScoreChange = (testId: string, score: string) => {
    if (/^\d*$/.test(score)) {
      setEditedTests((prevTests) =>
        prevTests.map((test) =>
          test.id === testId
            ? {
                ...test,
                score: score ? parseInt(score) : undefined,
              }
            : test
        )
      );
    }
  };

  const calculateScoreFromOption = (option?: string): number => {
    const optionScores: Record<string, number> = {
      Excellent: 100,
      "Very comfortable": 100,
      "Very stable": 100,
      "Full range": 100,
      Good: 80,
      Comfortable: 80,
      Stable: 80,
      Average: 60,
      Neutral: 60,
      Poor: 40,
      Uncomfortable: 40,
      "Somewhat unstable": 40,
      Limited: 40,
      "Very poor": 20,
      "Very uncomfortable": 20,
      "Very limited": 20,
      "Very unstable": 20,
    };

    return option ? optionScores[option] || 0 : 0;
  };

  const saveEvaluation = (
    prosthesisId: string,
    evaluationId: string,
    editedTests: EvaluationTest[]
  ) => {
    if (
      editedTests.some(
        (test) => test.score === undefined || test.score > 100 || test.score < 0
      )
    ) {
      Alert.alert("Please ensure all test scores are between 0 and 100.");
      return;
    }
    const updatedEvaluation = {
      ...allEvaluations.find((e) => e.id === evaluationId),
      tests: editedTests,
      score: calculateAverageTestScore(editedTests),
    };

    updateEvaluation(prosthesisId, evaluationId, updatedEvaluation as any);
    setEditingEvaluationId(null);
  };

  const calculateAverageTestScore = (tests: EvaluationTest[] = []): number => {
    if (tests.length === 0) return 0;
    const validTests = tests.filter((t) => t.score !== undefined);
    if (validTests.length === 0) return 0;
    const sum = validTests.reduce(
      (total, test) => total + (test.score || 0),
      0
    );
    return Math.round(sum / validTests.length);
  };

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
          <View style={styles.item}>
            <View style={styles.itemHeader}>
              {(item.prosthesisType === "Hip" && (
                <FontAwesome name="wheelchair" size={20} color="#007AFF" />
              )) ||
                (item.prosthesisType === "Knee" && (
                  <Ionicons name="walk" size={20} color="#007AFF" />
                )) || <FontAwesome name="user-md" size={20} color="#007AFF" />}
              <Text style={styles.title}>{item.prosthesisType} Evaluation</Text>
            </View>

            <View style={styles.details}>
              <Text style={styles.date}>
                {new Date(item.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </Text>
              <Text style={styles.score}>
                Score: <Text style={styles.scoreValue}>{item.score}/100</Text>
              </Text>
            </View>

            {/* Tests Section - Always visible */}
            <View style={styles.testsSection}>
              {(editingEvaluationId === item.id
                ? editedTests
                : item.tests || []
              ).map((test) => (
                <View key={test.id} style={styles.testContainer}>
                  <Text style={styles.testQuestion}>{test.question}</Text>

                  <View style={styles.optionsContainer}>
                    {test.options.map((option) => (
                      <TouchableOpacity
                        key={option}
                        style={[
                          styles.optionButton,
                          (editingEvaluationId === item.id
                            ? test.selectedOption === option
                            : test.selectedOption === option) &&
                            styles.selectedOption,
                          editingEvaluationId !== item.id &&
                            styles.disabledOption,
                        ]}
                        onPress={() =>
                          editingEvaluationId === item.id &&
                          handleTestOptionSelect(test.id, option)
                        }
                        disabled={editingEvaluationId !== item.id}
                      >
                        <Text style={styles.optionText}>{option}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <View style={styles.testScoreContainer}>
                    <Text style={styles.scoreLabel}>Score:</Text>
                    {editingEvaluationId === item.id ? (
                      <TextInput
                        style={styles.scoreInput}
                        value={test.score?.toString() || ""}
                        onChangeText={(text) =>
                          handleTestScoreChange(test.id, text)
                        }
                        maxLength={3}
                        keyboardType="numeric"
                        placeholder="0-100"
                      />
                    ) : (
                      <Text style={styles.scoreDisplay}>
                        {test.score || "--"}
                      </Text>
                    )}
                  </View>
                </View>
              ))}
            </View>

            {/* Edit/Save Buttons */}
            <View style={styles.buttonContainer}>
              {editingEvaluationId === item.id ? (
                <>
                  <TouchableOpacity
                    style={[styles.button, styles.cancelButton]}
                    onPress={() => setEditingEvaluationId(null)}
                  >
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.saveButton]}
                    onPress={() =>
                      saveEvaluation(item.prosthesisId, item.id, editedTests)
                    }
                  >
                    <Text style={styles.buttonText}>Save</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => startEditing(item)}
                >
                  <Text style={styles.buttonText}>Edit Evaluation</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#999",
    marginTop: 8,
  },
  listContent: {
    padding: 16,
  },
  item: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  itemHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: "#666",
  },
  score: {
    fontSize: 14,
  },
  scoreValue: {
    fontWeight: "bold",
  },
  notes: {
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
    marginBottom: 12,
  },
  testsSection: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 12,
  },
  testContainer: {
    marginBottom: 16,
  },
  testQuestion: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
  },
  optionButton: {
    padding: 8,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    backgroundColor: "#f9f9f9",
  },
  selectedOption: {
    backgroundColor: "#e3f2fd",
    borderColor: "#007AFF",
  },
  disabledOption: {
    opacity: 0.7,
  },
  optionText: {
    fontSize: 13,
  },
  testScoreContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  scoreLabel: {
    fontSize: 13,
    marginRight: 8,
    color: "#666",
  },
  scoreInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 6,
    width: 60,
    fontSize: 13,
  },
  scoreDisplay: {
    fontSize: 13,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#007AFF",
    borderRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    marginLeft: 8,
  },
  cancelButton: {
    backgroundColor: "#f44336",
  },
});
