// contexts/ProsthesisContext.tsx
import { Evaluation, Prosthesis } from "@/types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { ProsthesisContextType } from "./ContextTypes";

export const ProsthesisContext = createContext<ProsthesisContextType>({
  prostheses: [],
  isLoading: true,

  addProsthesis: async (data: any) => {
    return {
      id: "",
      type: data.type,
      hospitalName: data.hospitalName,
      date: data.date,
      prostheseName: data.prostheseName,
      evaluations: [],
      position: data.position,
    };
  },
  getProsthesisById: (id: string) => undefined,
  addEvaluation: async (prosthesisId: string, evaluation: Evaluation) => {},
  updateEvaluation: async (
    prosthesisId: string,
    evaluationId: string,
    updatedEvaluation: Evaluation
  ) => {},
});

export const ProsthesisProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [prostheses, setProstheses] = useState<Prosthesis[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    try {
      const json = await AsyncStorage.getItem("@prosthesis_app_data");
      console.log("json", json);

      if (json) setProstheses(JSON.parse(json));
    } catch (error) {
      console.error("Failed to load data", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveData = async (data: Prosthesis[]) => {
    console.log("data => ", data);

    try {
      await AsyncStorage.setItem("@prosthesis_app_data", JSON.stringify(data));
      setProstheses(data);
    } catch (error) {
      console.error("Failed to save data", error);
    }
  };

  const addProsthesis = async (data: any) => {
    const newProsthesis: Prosthesis = {
      id: Date.now().toString(),
      type: data.type,
      hospitalName: data.hospitalName,
      date: data.date,
      prostheseName: data.prostheseName,
      position: data.position,
      evaluations: [
        {
          id: Date.now().toString(),
          prostheseId: Date.now().toString(),
          prostheseType: data.type,
          date: new Date(),
          score: 85,
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
      ],
    };
    await saveData([...prostheses, newProsthesis]);
    return newProsthesis;
  };

  const addEvaluation = async (
    prosthesisId: string,
    evaluation: Evaluation
  ) => {
    const updatedProstheses = prostheses.map((prosthesis) => {
      if (prosthesis.id === prosthesisId) {
        return {
          ...prosthesis,
          evaluations: [...prosthesis.evaluations, evaluation],
        };
      }
      return prosthesis;
    });
    await saveData(updatedProstheses);
  };

  const updateEvaluation = async (
    prosthesisId: string,
    evaluationId: string,
    updatedEvaluation: Evaluation
  ) => {
    const updatedProstheses = prostheses.map((prosthesis) => {
      if (prosthesis.id === prosthesisId) {
        const updatedEvaluations = prosthesis.evaluations.map((evaluation) => {
          if (evaluation.id === evaluationId) {
            return {
              ...evaluation,
              ...updatedEvaluation,
              // Preserve the original date if not being updated
              date: updatedEvaluation.date || evaluation.date,
              // Ensure tests array exists
              tests: updatedEvaluation.tests || evaluation.tests || [],
            };
          }
          return evaluation;
        });
        return {
          ...prosthesis,
          evaluations: updatedEvaluations,
        };
      }
      return prosthesis;
    });

    await saveData(updatedProstheses);
  };

  const getProsthesisById = (id: string) => prostheses.find((p) => p.id === id);
  useEffect(() => {
    loadData();
  }, []);

  return (
    <ProsthesisContext.Provider
      value={{
        prostheses,
        isLoading,
        addProsthesis,
        getProsthesisById,
        addEvaluation,
        updateEvaluation,
      }}
    >
      {children}
    </ProsthesisContext.Provider>
  );
};

export const useProstheses = () =>
  useContext<ProsthesisContextType>(ProsthesisContext);
