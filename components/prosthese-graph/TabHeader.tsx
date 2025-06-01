import { styles } from "@/styles/prosthese-graph/tab-header";
import { FontAwesome } from "@expo/vector-icons";
import React, { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  activeTab: string;
  setActiveTab: any;
  darkMode: boolean;
};
const TabHeader: FC<Props> = ({ activeTab, setActiveTab, darkMode }) => {
  return (
    <View style={[styles.tabContainer, darkMode && styles.darkTabContainer]}>
      <TouchableOpacity
        style={[styles.tab, activeTab === "pain" && styles.activeTab, ]}
        onPress={() => setActiveTab("pain")}
      >
        <FontAwesome
          name="heartbeat"
          size={20}
          color={activeTab === "pain" ? "#007AFF" : "#666"}
        />
        <Text
          style={[styles.tabText, activeTab === "pain" && styles.activeTabText]}
        >
          Pain
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, activeTab === "rom" && styles.activeTab]}
        onPress={() => setActiveTab("rom")}
      >
        <FontAwesome
          name="rotate-right"
          size={20}
          color={activeTab === "rom" ? "#007AFF" : "#666"}
        />
        <Text
          style={[styles.tabText, activeTab === "rom" && styles.activeTabText]}
        >
          ROM
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, activeTab === "happiness" && styles.activeTab]}
        onPress={() => setActiveTab("happiness")}
      >
        <FontAwesome
          name="smile-o"
          size={20}
          color={activeTab === "happiness" ? "#007AFF" : "#666"}
        />
        <Text
          style={[
            styles.tabText,
            activeTab === "happiness" && styles.activeTabText,
          ]}
        >
          Happiness
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TabHeader;
