import { evaluations } from "@/app/single-prosthese/location-of-intervention/evaluations";
import Header from "@/components/shared/Header";
import SectionLink from "@/components/shared/SectionLink";
import { useUserContext } from "@/context/AuthContext";
import { styles } from "@/styles/single-prosthese/single-prosthese";
import { useLocalSearchParams } from "expo-router";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { questions } from "./feedbacks";
const description =
  "This page displays the location of intervention for a specific prosthese. You can track the progress of your prosthese over time by adding feedback. The progress tracking feature is available on the 'Progress Tracking' section below.";
export default function ProsthesisDetail() {
  const { id } = useLocalSearchParams();
  const { settings } = useUserContext();

  const { item }: any = useLocalSearchParams();

  const prosthese = item ? JSON.parse(item) : null;

  const actualType = prosthese.type;
  return (
    <SafeAreaView
      style={[styles.container, settings.darkMode && styles.darkContainer]}
    >
      <Header title="Prostheses Details" darkMode={settings.darkMode} />
      <ScrollView>
        <View style={styles.contentContainer}>
          <Text style={[styles.title, settings.darkMode && styles.darkTitle]}>
            {actualType} Prostheses
          </Text>

          <Text
            style={[
              styles.description,
              settings.darkMode && styles.darkDescription,
            ]}
          >
            {description}
          </Text>

          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1715531786031-7c4e30a45c62?q=80&w=1996&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
            style={styles.image}
            resizeMode="cover"
          />

          {!prosthese.isFromAll && (
            <>
              <SectionLink
                data={questions}
                title="Add Feedback"
                href={`/add-feedback/add`}
                linkText="Add FeedBack"
              />

              <SectionLink
                data={[]}
                title="Progress Tracking"
                href={`/prosthese-graph/${id}`}
                linkText="View Progress Charts"
              />

              <SectionLink
                data={evaluations.map((e) => ({
                  ...e,
                  prostheseType: actualType,
                }))}
                title="Evaluations"
                href={`/evaluations`}
                buttonTitle="View Evaluations"
              />
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
