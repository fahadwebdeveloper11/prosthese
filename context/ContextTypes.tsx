import { Prosthesis } from "@/types/types";

export type ProsthesisContextType = {
  prostheses: Prosthesis[];
  isLoading: boolean;
  addProsthesis: (data: any) => Promise<Prosthesis>;
  getProsthesisById: (id: string) => Prosthesis | undefined;
  // addEvaluation: (
  //   prosthesisId: string,
  //   evaluation: Evaluation
  // ) => Promise<void>;
  // updateEvaluation: (
  //   prosthesisId: string,
  //   evaluationId: string,
  //   updatedEvaluation: Evaluation
  // ) => Promise<void>;
  deleteAllProsthesis: () => Promise<void>;
};
