export const evaluations = [
  {
    id: Date.now().toString(),
    prostheseId: Date.now().toString(),
    date: new Date('2022-09-16'),
    total_score: 25,
    notes: "Patient adapting well to the new prosthesis but has some pain",
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
        selectedOption: "Uncomfortable",
        score: 40,
      },
    ],
  },
  
];
