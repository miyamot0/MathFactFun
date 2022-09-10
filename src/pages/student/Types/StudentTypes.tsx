import firebase from "firebase/app";
import { CommentInterface } from "../../../firebase/types/GeneralTypes";

export interface StudentDataInterface {
  id: string | undefined | null;
  aimLine: number;
  createdAt: firebase.firestore.Timestamp | null;
  dueDate: firebase.firestore.Timestamp | null;
  lastActivity: firebase.firestore.Timestamp | null;
  comments: CommentInterface[];
  completedBenchmark: string[];
  currentBenchmarking: string[];
  factsMastered: string[];
  factsSkipped: string[];
  factsTargeted: string[];

  creator: string | null;
  currentApproach: string | undefined;
  currentErrorApproach: string | undefined;
  currentGrade: string;
  currentSRApproach: string | undefined;
  currentTarget: string | undefined;
  details: string;
  name: string;
  problemSet: string;

  minForTask: number;
}

export interface StudentWidgetInterface {
  student: StudentDataInterface;
}

export enum StudentCreatorBehavior {
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
