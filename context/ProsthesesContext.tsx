// contexts/ProsthesisContext.tsx
import { defaultIndicators } from "@/constants/indicators";
import { Evaluation, Prosthesis } from "@/types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { ProsthesisContextType } from "./ContextTypes";

export const ProsthesisContext = createContext<ProsthesisContextType>({
  prostheses: [],
  isLoading: true,
  addProsthesis: async (type: string, surgicalAccesses: number) => {
    return {
      id: "",
      type,
      surgicalAccesses,
      evaluations: [],
      indicators: [],
    };
  },
  updateIndicator: async (
    prosthesisId: string,
    indicatorIndex: number,
    field: "preSurgery" | "postSurgery",
    value: any
  ) => {},
  getProsthesisById: (id: string) => undefined,
  addEvaluation: async (prosthesisId: string, evaluation: Evaluation) => {},
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

  const addProsthesis = async (type: string, surgicalAccesses: number) => {
    const newProsthesis: Prosthesis = {
      id: Date.now().toString(),
      type,
      surgicalAccesses,
      evaluations: [],
      indicators: JSON.parse(JSON.stringify(defaultIndicators)), // Deep copy
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

  const updateIndicator = async (
    prosthesisId: string,
    indicatorIndex: number,
    field: "preSurgery" | "postSurgery",
    value: any
  ) => {
    const updatedProstheses = prostheses.map((p) => {
      if (p.id === prosthesisId) {
        const updatedIndicators = [...p.indicators];
        updatedIndicators[indicatorIndex] = {
          ...updatedIndicators[indicatorIndex],
          [field]: value,
        };
        return { ...p, indicators: updatedIndicators };
      }
      return p;
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
        updateIndicator,
        getProsthesisById,
        addEvaluation,
      }}
    >
      {children}
    </ProsthesisContext.Provider>
  );
};

export const useProstheses = () =>
  useContext<ProsthesisContextType>(ProsthesisContext);
