import FeedbackQuestion from "@/components/add-feeback/FeedbackQuestion";
import Header from "@/components/shared/Header";
import { useUserContext } from "@/context/AuthContext";
import { styles } from "@/styles/add-feedback/styles";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const FeedbackForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [answers, setAnswers] = useState<any>({});

  const {settings} = useUserContext();
  const { item }: any = useLocalSearchParams();
  const questions = item ? JSON.parse(item) : null;

  const handleAnswerSelect = (questionId: string, answer: string) => {
    setAnswers({
      ...answers,
      [questionId]: answer,
    });
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Prepare your submission data
    const feedbackData = {
      answers,
    };

    console.log("Submitting feedback:", feedbackData);
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  };

  const renderItem = ({ item }: any) => (
    <FeedbackQuestion
      key={item.id}
      darkMode={settings.darkMode}
      question={item.question}
      options={item.options}
      selectedOption={answers[item.id]}
      onSelect={(answer) => handleAnswerSelect(item.id, answer)}
    />
  );

  return (
    <SafeAreaView style={[styles.container, settings.darkMode && styles.darkContainer]}>
      <Header title="Add Feedback"  darkMode={settings.darkMode}/>
      <View style={styles.formContainer}>
        {/* Render multiple choice questions */}
        <FlatList
          data={questions}
          contentContainerStyle={{ padding: 20 }}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ListFooterComponent={() => (
            <TouchableOpacity
              style={[styles.saveButton, isSubmitting && styles.disabledButton]}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              <Text style={styles.saveButtonText}>
                {isSubmitting ? "Submitting..." : "Submit Feedback"}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default FeedbackForm;
