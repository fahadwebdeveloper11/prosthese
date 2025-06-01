export const evaluations = [
  {
    id: Date.now().toString(),
    prostheseId: Date.now().toString(),
    date: new Date(),
    total_score: 85,
    notes: "Patient adapting well to the new prosthesis",
    tests: [
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
        selectedOption: "Comfortable",
        score: 80,
      },
    ],
  },
  {
    id: 2,
    prostheseId: 2,
    date: new Date(),
    total_score: 99,
    notes: "Patient adapting well to the new prosthesis",
    tests: [
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
        selectedOption: "Comfortable",
        score: 99,
      },
      {
        id: "ankles_mobility",
        question: "Ankles mobility",
        options: [
          "Very comfortable",
          "Comfortable",
          "Neutral",
          "Uncomfortable",
          "Very uncomfortable",
        ],
        selectedOption: "Comfortable",
        score: 90,
      },
    ],
  },
];
