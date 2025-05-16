import { Indicator } from "@/types/types";

export const defaultIndicators: Indicator[] = [
  {
    name: "Pain Level",
    type: "number",
    preSurgery: 0,
    postSurgery: 0,
  },
  {
    name: "Swelling",
    type: "boolean",
    preSurgery: false,
    postSurgery: false,
  },
  {
    name: "Mobility Notes",
    type: "text",
    preSurgery: "",
    postSurgery: "",
  },
];