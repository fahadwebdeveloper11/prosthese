import { styles } from "@/styles/prostheses/prostheses-card";
import { EvaluationWithType } from "@/types/types";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

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
  path: string;
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
  darkMode?: boolean;
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
  darkMode,
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

  const handleNavigate = () => {
    router.push({
      pathname: `/single-prosthese/${item.path}` as any,
      params: { item: JSON.stringify(item) },
    });
  };

  return (
    <TouchableOpacity onPress={handleNavigate} activeOpacity={1}>
      <View style={[styles.item, containerStyle, darkMode && styles.darkItem]}>
        <View style={[styles.itemHeader, headerStyle]}>
          {renderIcon()}
          <Text
            style={[styles.title, titleStyle, darkMode && styles.darkTitle]}
            numberOfLines={1}
          >
            {item.type} Prosthesis
          </Text>
        </View>

        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1715531786031-7c4e30a45c62?q=80&w=1996&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
          style={styles.image}
          // resizeMode="contain"
        />
        {/* <View style={styles.detailContainer}> */}

        {/* <View style={{flex:1}}> */}
        <View style={styles.detailRow}>
          <Text
            style={[styles.label, labelStyle, darkMode && styles.darkLabel]}
          >
            Name:
          </Text>
          <Text
            style={[styles.value, valueStyle, darkMode && styles.darkValue]}
          >
            {item.prostheseName}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text
            style={[styles.label, labelStyle, darkMode && styles.darkLabel]}
          >
            Position:
          </Text>
          <Text
            style={[styles.value, valueStyle, darkMode && styles.darkValue]}
          >
            {item.position || "-"}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text
            style={[styles.label, labelStyle, darkMode && styles.darkLabel]}
          >
            Hospital:
          </Text>
          <Text
            style={[styles.value, valueStyle, darkMode && styles.darkValue]}
          >
            {item.hospitalName}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text
            style={[styles.label, labelStyle, darkMode && styles.darkLabel]}
          >
            Date:
          </Text>
          <Text
            style={[styles.value, valueStyle, darkMode && styles.darkValue]}
          >
            {new Date(item.date).toLocaleDateString()}
          </Text>
        </View>
        {/* </View> */}
        {/* </View> */}
      </View>
    </TouchableOpacity>
  );
};

export default ProsthesesCard;
