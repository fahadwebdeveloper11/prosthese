import { ReactNode } from "react";

export interface SectionProps {
  title: string;
  darkMode?: boolean;
  children: ReactNode;
  style?: object;
}

export interface SectionRowProps {
  label: string;
  value?: string;
  darkMode?: boolean;
  isEditing?: boolean;
  editComponent?: ReactNode;
  style?: object;
}

export interface SectionButtonProps {
  title: string;
  onPress: () => void;
  isDanger?: boolean;
  style?: object ;
}

export interface SectionSwitchProps {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  darkMode?: boolean;
  style?: object;
}
