import Header from "@/components/shared/Header";
import SectionLink from "@/components/shared/SectionLink";
import { useProstheses } from "@/context/ProsthesesContext";
import { styles } from "@/styles/single-prosthese/single-prosthese";
import { Prosthesis } from "@/types/types";
import { Link, useLocalSearchParams } from "expo-router";
import { Button, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProsthesisDetail() {
  const { id } = useLocalSearchParams();
  const { prostheses } = useProstheses();

  const prosthesis: any = prostheses.find((p: Prosthesis) => p.id == id);

  if (!prosthesis) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Prosthesis not found</Text>
      </SafeAreaView>
    );
  }

  const actualType =
    typeof prosthesis.type === "string"
      ? prosthesis.type
      : prosthesis.type?.type || "Unknown";

  const surgicalAccesses =
    typeof prosthesis.type === "object"
      ? prosthesis.type.surgicalAccesses
      : prosthesis.surgicalAccesses;

  const renderItem = ({ item: eva, index }: any) => (
    <View key={`${eva.date}-${index}`} style={styles.evaluation}>
      <Text>Date: {new Date(eva?.date)?.toLocaleDateString().split("/").join('-') || "Unknown date"}</Text>
      <Text>Score: {eva.score || "No score"}</Text>
      {eva.notes && <Text>Notes: {eva.notes}</Text>}
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header title="Prostheses Details" />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{actualType} Prostheses</Text>
          {/* <Text>Surgical Accesses: {surgicalAccesses || 0}</Text> */}

          <View style={styles.section}>
            {/* <Text style={styles.sectionTitle}>Evaluations</Text> */}
            {/* <FlatList
              scrollEnabled={false}
              data={prosthesis.evaluations || []}
              renderItem={renderItem}
              ListEmptyComponent={<Text>No evaluations yet</Text>}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            /> */}
            <Link href={`/add-feedback/add?prosthesisId=${id}`} asChild>
              <Button title="Add FeedBack" />
            </Link>
          </View>

          <SectionLink
            title="Progress Tracking"
            href={`/prosthese-graph/${id}`}
            linkText="View Progress Charts"
          />

          <SectionLink
            title="Evaluations"
            href={`/evaluations`}
            buttonTitle="View Evaluations"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
