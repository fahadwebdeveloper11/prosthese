import { Colors } from "@/constants/Colors";
import { useUserContext } from "@/context/AuthContext";
import { styles } from "@/styles/shared/search-bar";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { TextInput, View } from "react-native";

type Props = {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

const SearchBar: React.FC<Props> = ({ searchQuery, setSearchQuery }) => {
  const { settings } = useUserContext();
  return (
    <View
      style={[
        styles.searchContainer,
        settings.darkMode && styles.darkSearchContainer,
      ]}
    >
      <FontAwesome
        name="search"
        size={20}
        color={settings.darkMode ? "#ccc" : "#888"}
        style={styles.icon}
      />
      <TextInput
        style={[styles.input, settings.darkMode && styles.darkInput]}
        placeholder="Search prostheses (type or name)"
        placeholderTextColor={Colors.gray}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    </View>
  );
};

export default SearchBar;
