import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
interface FeedbackQuestionProps {
  question: string;
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
}

const FeedbackQuestion: React.FC<FeedbackQuestionProps> = ({
  question,
  options,
  selectedOption,
  onSelect,
}) => {
  return (
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>{question}</Text>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.optionButton,
            selectedOption === option && styles.selectedOption,
          ]}
          onPress={() => onSelect(option)}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  optionButton: {
    padding: 12,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  selectedOption: {
    backgroundColor: '#e3f2fd',
    borderColor: '#2196f3',
  },
  optionText: {
    fontSize: 14,
  },
});

export default FeedbackQuestion;