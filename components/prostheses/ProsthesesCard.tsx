import { styles } from "@/styles/prostheses/prostheses-card";
import { EvaluationWithType } from "@/types/types";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { StyleProp, Text, TextStyle, View, ViewStyle } from "react-native";

// Define your types
type ProsthesisItem = {
  id: string;
  type: string;
  evaluations: EvaluationWithType[];
  hospitalName: string;
  date: Date | string;
  prostheseName: string;
  position: string;
  surgicalAccesses?: number;
};

type ProsthesisListItemProps = {
  item: ProsthesisItem;
  containerStyle?: StyleProp<any>;
  headerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  valueStyle?: StyleProp<TextStyle>;
  iconSize?: number;
  iconColor?: string;
};

const ProsthesesCard: React.FC<ProsthesisListItemProps> = ({
  item,
  containerStyle,
  headerStyle,
  titleStyle,
  iconSize = 20,
  iconColor = "#007AFF",
  labelStyle,
  valueStyle,
}) => {
  const renderIcon = () => {
    switch (item.type) {
      case "Hip":
        return (
          <FontAwesome name="wheelchair" size={iconSize} color={iconColor} />
        );
      case "Knee":
        return <Ionicons name="walk" size={iconSize} color={iconColor} />;
      default:
        return <FontAwesome name="user-md" size={iconSize} color={iconColor} />;
    }
  };

  return (
    <Link href={`/single-prosthese/${item.id}`}>
      <View style={[styles.item, containerStyle]}>
        <View style={[styles.itemHeader, headerStyle]}>
          {renderIcon()}
          <Text style={[styles.title, titleStyle]} numberOfLines={1}>
            {item.type} Prosthesis
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={[styles.label, labelStyle]}>Name:</Text>
          <Text style={[styles.value, valueStyle]}>{item.prostheseName}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={[styles.label, labelStyle]}>Position:</Text>
          <Text style={[styles.value, valueStyle]}>{item.position || "-"}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={[styles.label, labelStyle]}>Hospital:</Text>
          <Text style={[styles.value, valueStyle]}>{item.hospitalName}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={[styles.label, labelStyle]}>Date:</Text>
          <Text style={[styles.value, valueStyle]}>
            {new Date(item.date).toLocaleDateString()}
          </Text>
        </View>
      </View>
    </Link>
  );
};

export default ProsthesesCard;
