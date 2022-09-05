import { FactDataInterface } from "../../../firebase/types/GeneralTypes";

export interface RoutedStudentProgressSet {
  id?: string;
  target?: string;
  method?: string;
  aim?: string;
}

export interface RemappedPerformances {
  Items: FactDataInterface[];
  Date: Date;
  ShortDate: string;
  Errors: number;
  DigitsCorrect: number;
  DigitsCorrectInitial: number;
  DigitsTotal: number;
  SessionDuration: number;
  Method: string | undefined;
}

export interface DailyPerformanceMetrics {
  Date: string;
  DCPM: number;
  Accuracy: number;
}

export interface ItemPerformanceMetrics {
  FactString: string | undefined;
  X: number;
  Y: number;
  Latency: number;
  AverageCorrect: number;
  Correct: number;
  Total: number;
}
