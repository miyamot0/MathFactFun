import firebase from "firebase/app";
import { MultiValue } from "react-select";
import { SingleOptionType } from "../../../types/SharedComponentTypes";
import { CommentInterface } from "../subcomponents/types/CommentTypes";

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
  currentApproach: string;
  currentErrorApproach: string;
  currentGrade: string;
  currentSRApproach: string;
  currentTarget: string;
  details: string;
  name: string;
  problemSet: string;

  minForTask: number;
}

export interface StudentCreateState {
  Name: string;
  Names: string[];
  Details: string;
  FormError: undefined | string;
  DueDate: string;
  CurrentApproach: SingleOptionType;
  CurrentGrade: SingleOptionType;
  CurrentTarget: SingleOptionType;
  CurrentErrorApproach: SingleOptionType;
  CurrentSRApproach: SingleOptionType;
  CurrentBenchmarking: MultiValue<SingleOptionType>;
  DidBuild: boolean;
  AimLine: number;
  ExplicitTime: number;
  CurrentProblemSet: SingleOptionType;
}

export interface StudentWidgetInterface {
  student: StudentDataInterface;
}
