export interface Indicator {
  name: string;
  preSurgery: boolean | number | string;
  postSurgery: boolean | number | string;
  type: "boolean" | "number" | "text";
}

export interface Prosthesis {
  id: string;
  type: string;
  surgicalAccesses: number;
  evaluations: Evaluation[];
  indicators: Indicator[];
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
