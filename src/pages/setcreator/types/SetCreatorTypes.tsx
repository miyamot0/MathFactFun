import { FactDataInterface } from "../../../firebase/types/GeneralTypes";

export interface FactStructure {
  Answer: string;
  id: string;
}

export interface ItemHistory {
  FactString: string;
  X: number;
  Y: number;
  Latency: number;
  AverageCorrect: number;
  Correct: number;
  Total: number;
}

export interface SetItem {
  Answer: string;
  id: string;
  OTRs: number;
  Accuracy: number;
  Latency: number;
}

export interface DragColumnContents {
  name: string;
  items: SetItem[];
}

export interface DragColumnsInterface {
  [key: string]: DragColumnContents | null;
}

export interface ItemMetrics {
  Items: FactDataInterface[];
  Date: Date;
  ShortDate: string;
  Errors: number;
  DigitsCorrect: number;
  DigitsCorrectInitial: number;
  DigitsTotal: number;
  SessionDuration: number;
}
