import ProsthesesCard from "@/components/prostheses/ProsthesesCard";
import ScreenLoader from "@/components/shared/ScreenLoader";
import SearchBar from "@/components/shared/SearchBar";
import { useUserContext } from "@/context/AuthContext";
import { useProstheses } from "@/context/ProsthesesContext";
import { styles } from "@/styles/prostheses/prostheses";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AllProstheses() {
  const { prostheses, isLoading } = useProstheses();
  const { settings } = useUserContext();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filteredProstheses, setFilteredProstheses] =
    React.useState(prostheses);

  // Filter prostheses based on search query
  React.useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProstheses(prostheses);
    } else {
      const filtered = prostheses.filter((item) => {
        return item.type
          .toLowerCase()
          .includes(
            searchQuery.toLowerCase() || item.prostheseName.toLowerCase()
          );
      });
      setFilteredProstheses(filtered);
    }
  }, [searchQuery, prostheses]);

  const renderItem = ({ item }: { item: any }) => (
    <ProsthesesCard darkMode={settings.darkMode} item={item} />
  );

  if (isLoading) return <ScreenLoader />;

  if (!prostheses?.length) {
    return (
      <SafeAreaView
        style={[
          styles.emptyContainer,
          settings.darkMode && styles.darkEmptyContainer,
        ]}
      >
        <FontAwesome name="list-alt" size={48} color="#ccc" />
        <Text style={styles.emptyText}>No prostheses found</Text>
      </SafeAreaView>
    );
  }

  return (
    <ScrollView
      style={[
        styles.scrollContainer,
        settings.darkMode && styles.darkContainer,
      ]}
    >
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <FlatList
        scrollEnabled={false}
        data={filteredProstheses.map((p) => ({ ...p, isFromAll: true }))}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No matching prostheses found</Text>
          </View>
        }
      />
    </ScrollView>
  );
}
