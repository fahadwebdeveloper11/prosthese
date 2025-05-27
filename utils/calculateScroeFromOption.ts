export const calculateScoreFromOption = (option?: string): number => {
    const optionScores: Record<string, number> = {
      Excellent: 100,
      "Very comfortable": 100,
      "Very stable": 100,
      "Full range": 100,
      Good: 80,
      Comfortable: 80,
      Stable: 80,
      Average: 60,
      Neutral: 60,
      Poor: 40,
      Uncomfortable: 40,
      "Somewhat unstable": 40,
      Limited: 40,
      "Very poor": 20,
      "Very uncomfortable": 20,
      "Very limited": 20,
      "Very unstable": 20,
    };

    return option ? optionScores[option] || 0 : 0;
  };
