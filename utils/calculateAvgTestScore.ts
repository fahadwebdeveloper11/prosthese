import { EvaluationTest } from "@/types/types";

export const calculateAverageTestScore = (
  tests: EvaluationTest[] = []
): number => {
  if (tests.length === 0) return 0;
  const validTests = tests.filter((t) => t.score !== undefined);
  if (validTests.length === 0) return 0;
  const sum = validTests.reduce((total, test) => total + (test.score || 0), 0);
  return Math.round(sum / validTests.length);
};
