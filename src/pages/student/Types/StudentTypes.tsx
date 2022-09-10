import firebase from "firebase/app";
import { CommentInterface } from "../../../firebase/types/GeneralTypes";

export interface StudentDataInterface {
  id: string | undefined | null;
  aimLine: number;
  createdAt: firebase.firestore.Timestamp;
  dueDate: firebase.firestore.Timestamp;
  lastActivity: firebase.firestore.Timestamp;
  comments: CommentInterface[];
  completedBenchmark: string[];
  currentBenchmarking: string[];
  factsMastered: string[];
  factsSkipped: string[];
  factsTargeted: string[];

  creator: string;
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
