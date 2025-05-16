import Header from "@/components/shared/Header";
import { useProstheses } from "@/context/ProsthesesContext";
import { styles } from "@/styles/prosthese-indicator/prosthese-indicator";
import { useLocalSearchParams } from "expo-router";
import {
  ScrollView,
  Switch,
  Text,
  TextInput,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function IndicatorsScreen() {
  const { id } = useLocalSearchParams();
  const { prostheses, updateIndicator } = useProstheses();

  const prosthesis = prostheses.find((p) => p.id === id);

  if (!prosthesis) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Prosthesis not found</Text>
      </SafeAreaView>
    );
  }

  const handleValueChange = async (
    indicatorIndex: number,
    field: "preSurgery" | "postSurgery",
    value: any
  ) => {
    try {
      await updateIndicator(prosthesis.id, indicatorIndex, field, value);
    } catch (error) {
      console.error("Error updating indicator:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={prosthesis.type + " Indicators"} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pre-Surgery Indicators</Text>
          {prosthesis.indicators.map((indicator, index) => (
            <View key={`pre-${index}`} style={styles.indicatorCard}>
              <Text style={styles.indicatorName}>{indicator.name}</Text>
              {indicator.type === "boolean" ? (
                <Switch
                  value={indicator.preSurgery as boolean}
                  onValueChange={(val) =>
                    handleValueChange(index, "preSurgery", val)
                  }
                />
              ) : indicator.type === "number" ? (
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={String(indicator.preSurgery)}
                  onChangeText={(val) =>
                    handleValueChange(index, "preSurgery", Number(val))
                  }
                />
              ) : (
                <TextInput
                  style={[styles.input, { height: 80 }]}
                  multiline
                  value={indicator.preSurgery as string}
                  onChangeText={(val) =>
                    handleValueChange(index, "preSurgery", val)
                  }
                />
              )}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Post-Surgery Indicators</Text>
          {prosthesis.indicators.map((indicator, index) => (
            <View key={`post-${index}`} style={styles.indicatorCard}>
              <Text style={styles.indicatorName}>{indicator.name}</Text>
              {indicator.type === "boolean" ? (
                <Switch
                  value={indicator.postSurgery as boolean}
                  onValueChange={(val) =>
                    handleValueChange(index, "postSurgery", val)
                  }
                />
              ) : indicator.type === "number" ? (
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={String(indicator.postSurgery)}
                  onChangeText={(val) =>
                    handleValueChange(index, "postSurgery", Number(val))
                  }
                />
              ) : (
                <TextInput
                  style={[styles.input, { height: 80 }]}
                  multiline
                  value={indicator.postSurgery as string}
                  onChangeText={(val) =>
                    handleValueChange(index, "postSurgery", val)
                  }
                />
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
