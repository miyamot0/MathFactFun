import { StudentDataInterface } from "../../../firebase/types/GeneralTypes";

export interface StudentWidgetInterface {
  student: StudentDataInterface;
}

export enum UserCreatorBehavior {
  SetName,
  SetDetails,
  SetDueDate,
  SetFormError,
  SetCurrentApproach,
  SetCurrentGrade,
  SetCurrentTarget,
  SetCurrentErrorApproach,
  SetCurrentSRApproach,
  SetCurrentBenchmarking,
  SetAimLine,
  SetExplicitTime,
  SetBuilt,
  SetLoadedStudent,
}
