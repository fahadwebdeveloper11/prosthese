// import Header from "@/components/shared/Header";
// import { useProstheses } from "@/context/ProsthesesContext";
// import { styles } from "@/styles/add-evaluations/add-evaluations";
// import { router, useLocalSearchParams } from "expo-router";
// import { useState } from "react";
// import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// export default function AddEvaluation() {
//   const { prosthesisId } = useLocalSearchParams();
//   const [score, setScore] = useState("");
//   const [notes, setNotes] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const { addEvaluation } = useProstheses();

//   const handleSubmit = async () => {
//     if (!score.trim()) {
//       Alert.alert("Validation Error", "Please enter an evaluation score");
//       return;
//     }

//     const scoreValue = parseInt(score);
//     if (isNaN(scoreValue)) {
//       Alert.alert("Validation Error", "Please enter a valid number for score");
//       return;
//     }

//     if (scoreValue < 0 || scoreValue > 100) {
//       Alert.alert("Validation Error", "Score must be between 0 and 100");
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       const newEvaluation = {
//         date: new Date().toISOString(),
//         score: scoreValue,
//         notes: notes.trim(),
//       };

//       await addEvaluation(prosthesisId as string, newEvaluation as any);
//       router.back();
//     } catch (error) {
//       Alert.alert("Error", "Failed to save evaluation");
//       console.error("Evaluation save error:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Header title="Add Feedback" />
//       <View style={styles.formContainer}>
//         <Text style={styles.label}>Evaluation Score (0-100):</Text>
//         <TextInput
//           style={styles.input}
//           value={score}
//           onChangeText={(text) => {
//             // Only allow numeric input
//             if (/^\d*$/.test(text) || text === "") {
//               setScore(text);
//             }
//           }}
//           keyboardType="numeric"
//           placeholder="Enter score (0-100)"
//           maxLength={3}
//         />

//         <Text style={styles.label}>Notes:</Text>
//         <TextInput
//           style={styles.notesInput}
//           value={notes}
//           onChangeText={setNotes}
//           multiline
//           numberOfLines={4}
//           placeholder="Additional notes..."
//           textAlignVertical="top"
//         />

//         <TouchableOpacity
//           style={[styles.saveButton, isSubmitting && styles.disabledButton]}
//           onPress={handleSubmit}
//           disabled={isSubmitting}
//         >
//           <Text style={styles.saveButtonText}>
//             {isSubmitting ? "Saving..." : "Save Evaluation"}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }

import FeedbackQuestion from "@/components/add-feeback/FeedbackQuestion";
import Header from "@/components/shared/Header";
import { questions } from "@/constants/feedback-questions";
import { styles } from "@/styles/add-feedback/styles";
import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const FeedbackForm = () => {
  const [score, setScore] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [answers, setAnswers] = useState({});

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
      score,
      notes,
      answers,
      // other data you need to submit
    };

    console.log("Submitting feedback:", feedbackData);
    // Here you would typically make an API call
    // After submission, reset the form or navigate away
    setIsSubmitting(false);
  };

  const renderItem = ({ item }: any) => (
    <FeedbackQuestion
      key={item.id}
      question={item.question}
      options={item.options}
      selectedOption={answers[item.id]}
      onSelect={(answer) => handleAnswerSelect(item.id, answer)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Add Feedback" />
      <View style={styles.formContainer}>
        {/* <Text style={styles.label}>Evaluation Score (0-100):</Text>
        <TextInput
          style={styles.input}
          value={score}
          onChangeText={(text) => {
            if (/^\d*$/.test(text) || text === "") {
              setScore(text);
            }
          }}
          keyboardType="numeric"
          placeholder="Enter score (0-100)"
          maxLength={3}
        /> */}

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
                {isSubmitting ? "Saving..." : "Submit Feedback"}
              </Text>
            </TouchableOpacity>
          )}
        />

        {/* <Text style={styles.label}>Notes:</Text>
        <TextInput
          style={styles.notesInput}
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={4}
          placeholder="Additional notes..."
          textAlignVertical="top"
        /> */}
      </View>
    </SafeAreaView>
  );
};

export default FeedbackForm;
