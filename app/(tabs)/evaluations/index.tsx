import { useProstheses } from "@/context/ProsthesesContext";
import { Evaluation } from "@/types/types";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface EvaluationWithType extends Evaluation {
  prosthesisType: string;
}

export default function EvaluationsList() {
  const { prostheses, isLoading } = useProstheses();

  // Get all evaluations from all prostheses with type information
  const allEvaluations: EvaluationWithType[] = prostheses.flatMap(
    (p) =>
      p.evaluations?.map((e: Evaluation) => ({
        ...e,
        prosthesisType: p.type,
        prosthesisId: p.id,
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
          <View>
            <TouchableOpacity style={styles.item}>
              <View style={styles.itemHeader}>
                {(item.prosthesisType === "Hip" && (
                  <FontAwesome name="wheelchair" size={20} color="#007AFF" />
                )) ||
                  (item.prosthesisType === "Knee" && (
                    <Ionicons name="walk" size={20} color="#007AFF" />
                  )) || (
                    <FontAwesome name="user-md" size={20} color="#007AFF" />
                  )}
                <Text style={styles.title}>
                  {item.prosthesisType} Evaluation
                </Text>
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
              {item.notes && (
                <Text style={styles.notes} numberOfLines={2}>
                  Notes: {item.notes}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => `${item.date}-${index}`}
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
    padding: 20,
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
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
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
    color: "#333",
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
    color: "#666",
  },
  scoreValue: {
    fontWeight: "bold",
    color: "#007AFF",
  },
  notes: {
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
  },
});
