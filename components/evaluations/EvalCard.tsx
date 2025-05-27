import { styles } from "@/styles/evaluations/eval-card";
import { Evaluation, EvaluationTest, EvaluationWithType } from "@/types/types";
import { calculateAverageTestScore } from "@/utils/calculateAvgTestScore";
import { calculateScoreFromOption } from "@/utils/calculateScroeFromOption";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

type Props = {
  item: EvaluationWithType;
  allEvaluations: any[];
  updateEvaluation: (
    prosthesisId: string,
    evaluationId: string,
    updatedEvaluation: Evaluation
  ) => Promise<void>;
};

const EvalCard: React.FC<Props> = ({
  item,
  allEvaluations,
  updateEvaluation,
}) => {
  const [editingEvaluationId, setEditingEvaluationId] = useState<string | null>(
    null
  );
  const [editedTests, setEditedTests] = useState<any[]>([]);

  const startEditing = (evaluation: any) => {
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

  return (
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

      {/* Details Section */}
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

      {/* Tests Section */}
      <View style={styles.testsSection}>
        {(editingEvaluationId === item.id ? editedTests : item.tests || []).map(
          (test) => (
            <View key={test.id} style={styles.testContainer}>
              <Text style={styles.testQuestion}>{test.question}</Text>

              <View style={styles.optionsContainer}>
                {test.options.map((option: string) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.optionButton,
                      (editingEvaluationId === item.id
                        ? test.selectedOption === option
                        : test.selectedOption === option) &&
                        styles.selectedOption,
                      editingEvaluationId !== item.id && styles.disabledOption,
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
                  <Text style={styles.scoreDisplay}>{test.score || "--"}</Text>
                )}
              </View>
            </View>
          )
        )}
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
  );
};

export default EvalCard;
