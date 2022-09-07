import { StudentDataInterface } from "../../../firebase/types/GeneralTypes";

export interface CallbackInterface {
  (arg0: string): void;
}

export interface StudentFilterInterface {
  changeFilter: CallbackInterface;
}

export type StudentListInterface = {
  students: StudentDataInterface[];
}

export interface PracticeListInterface {
  students: StudentDataInterface[];
}

export interface BenchmarkInterface {
  student: StudentDataInterface;
}
