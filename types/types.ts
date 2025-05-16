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
  date: Date;
  score: number;
  notes: string;
}
