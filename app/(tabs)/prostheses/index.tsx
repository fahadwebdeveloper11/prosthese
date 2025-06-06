import ProsthesesCard from "@/components/prostheses/ProsthesesCard";
import ScreenLoader from "@/components/shared/ScreenLoader";
import { useUserContext } from "@/context/AuthContext";
import { useProstheses } from "@/context/ProsthesesContext";
import { styles } from "@/styles/prostheses/prostheses";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProsthesesList() {
  const { prostheses, isLoading } = useProstheses();
  const { settings } = useUserContext();

  const renderItem = ({ item }: { item: any }) => (
    <ProsthesesCard item={item} darkMode={settings.darkMode} />
  );
  if (isLoading) <ScreenLoader />;

  if (!prostheses?.length) {
    return (
      <SafeAreaView style={[styles.emptyContainer, settings.darkMode && styles.darkEmptyContainer]}>
        <FontAwesome name="list-alt" size={48} color="#ccc" />
        <Text style={styles.emptyText}>No prostheses found</Text>
        <Link href="/add-prosthese" asChild>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+ Add First Prosthesis</Text>
          </TouchableOpacity>
        </Link>
      </SafeAreaView>
    );
  }

  return (
    <View
      style={[styles.container, settings.darkMode && styles.darkContainer]}
    >
      <FlatList
        data={prostheses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListFooterComponent={() => (
          <Link href="/add-prosthese" asChild>
            <TouchableOpacity style={styles.addButton}>
              <FontAwesome name="plus" size={18} color="white" />
              <Text style={styles.addButtonText}> Add Prosthesis</Text>
            </TouchableOpacity>
          </Link>
        )}
      />
    </View>
  );
}
