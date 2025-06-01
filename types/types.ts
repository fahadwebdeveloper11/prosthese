// // Define types
export type EvaluationTest = {
  id: string;
  question: string;
  options: string[];
  selectedOption?: string;
  score?: number;
};

export interface Prosthesis {
  id: string;
  type: string;
  evaluations?: Evaluation[];
  hospitalName: string;
  date: Date;
  prostheseName: string;
  position: string;
  path: string;
}

export interface Evaluation {
  id: string;
  date: Date;
  prostheseId: string;
  prostheseType: string;
  score: number;
  notes: string;
  tests?: {
    id: string;
    question: string;
    options: string[];
    selectedOption: string;
    score: number;
  }[];
}

export type EvaluationWithType = {
  id: string;
  date: string;
  total_score: number;
  notes?: string;
  prosthesisType: string;
  prosthesisId: string;
  tests?: EvaluationTest[];
};
