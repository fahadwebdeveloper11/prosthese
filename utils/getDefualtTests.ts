import { EvaluationTest } from "@/types/types";

export const getDefaultTests = (type: string): EvaluationTest[] => {
  const commonTests = [
    {
      id: "comfort",
      question: "Comfort level",
      options: [
        "Very comfortable",
        "Comfortable",
        "Neutral",
        "Uncomfortable",
        "Very uncomfortable",
      ],
    },
    {
      id: "functionality",
      question: "Daily functionality",
      options: ["Excellent", "Good", "Average", "Poor", "Very poor"],
    },
  ];

  if (type === "Hip") {
    return [
      ...commonTests,
      {
        id: "hip_mobility",
        question: "Hip mobility",
        options: ["Full range", "Good", "Limited", "Very limited"],
      },
    ];
  } else if (type === "Knee") {
    return [
      ...commonTests,
      {
        id: "knee_stability",
        question: "Knee stability",
        options: [
          "Very stable",
          "Stable",
          "Somewhat unstable",
          "Very unstable",
        ],
      },
    ];
  }

  return commonTests;
};
