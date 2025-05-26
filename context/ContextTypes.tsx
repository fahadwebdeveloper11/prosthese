import { Evaluation, Prosthesis } from "@/types/types";

export type ProsthesisContextType = {
  prostheses: Prosthesis[];
  isLoading: boolean;
  addProsthesis: (
    type: string,
    surgicalAccesses: number
  ) => Promise<Prosthesis>;
  updateIndicator: (
    prosthesisId: string,
    indicatorIndex: number,
    field: "preSurgery" | "postSurgery",
    value: any
  ) => Promise<void>;
  getProsthesisById: (id: string) => Prosthesis | undefined;
  addEvaluation: (
    prosthesisId: string,
    evaluation: Evaluation
  ) => Promise<void>;
  updateEvaluation: (
    prosthesisId: string,
    evaluationId: string,
    updatedEvaluation: Evaluation
  ) => Promise<void>;
};
