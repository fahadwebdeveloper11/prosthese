import { styles } from "@/styles/prostheses/prostheses-card";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React, { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ProsthesesCardProps {
  item: any;
}

const ProsthesesCard: FC<ProsthesesCardProps> = ({ item }) => {
  return (
    <Link href={`/single-prosthese/${item.id}`} asChild>
      <TouchableOpacity style={styles.item}>
        <View style={styles.itemHeader}>
          {(item.type === "Hip" && (
            <FontAwesome name="wheelchair" size={20} color="#007AFF" />
          )) ||
            (item.type === "Knee" && (
              <Ionicons name="walk" size={20} color="#007AFF" />
            )) || <FontAwesome name="user-md" size={20} color="#007AFF" />}
          <Text style={styles.title}>{item.type} Prosthesis</Text>
        </View>
        <Text style={styles.detail}>
          Surgical Accesses: {item.surgicalAccesses || 0}
        </Text>
        <Text style={styles.detail}>
          Evaluations: {item.evaluations?.length || 0}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default ProsthesesCard;
