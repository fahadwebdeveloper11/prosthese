import { FontAwesome } from "@expo/vector-icons";

export const tabs = [
  {
    name: "prostheses/index",
    options: {
      title: "Prostheses",
      tabBarIcon: ({ color }: { color: string }) => (
        <FontAwesome name="list" size={24} color={color} />
      ),
    },
  },
  {
    name: "all-prostheses/index",
    options: {
      title: "All Prostheses",
      tabBarIcon: ({ color }: { color: string }) => (
        <FontAwesome name="check-square-o" size={24} color={color} />
      ),
    },
  }, 
  // {
  //   name: "evaluations/index",
  //   options: {
  //     title: "Evaluations",
  //     tabBarIcon: ({ color }: { color: string }) => (
  //       <FontAwesome name="check-square-o" size={24} color={color} />
  //     ),
  //   },
  // },
  {
    name: "settings/index",
    options: {
      title: "Settings",
      tabBarIcon: ({ color }: { color: string }) => (
        <FontAwesome name="cog" size={24} color={color} />
      ),
    },
  },
];
