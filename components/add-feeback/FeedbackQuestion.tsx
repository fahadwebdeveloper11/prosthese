import { styles } from "@/styles/add-feedback/feedback-question";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
interface FeedbackQuestionProps {
  question: string;
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
  darkMode?: boolean;
}

const FeedbackQuestion: React.FC<FeedbackQuestionProps> = ({
  question,
  options,
  selectedOption,
  onSelect,
  darkMode,
}) => {
  return (
    <View style={styles.questionContainer}>
      <Text style={[styles.questionText, darkMode && styles.darkQuestionText]}>
        {question}
      </Text>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.optionButton,
            darkMode
              ? selectedOption === option
                ? styles.darkSelectedOption
                : styles.darkOptionButton
              : selectedOption === option
              ? styles.selectedOption
              : undefined,
          ]}
          onPress={() => onSelect(option)}
        >
          <Text style={[styles.optionText, darkMode && styles.darkOptionText]}>
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default FeedbackQuestion;
