import firebase from "firebase/app";

import { PerformanceDataInterface } from "../../models/PerformanceModel";
import { UserDataInterface } from "../../models/UserModel";

export class CommentInterface {
  constructor(
    readonly content: string,
    readonly displayName: string,
    readonly createdAt: any,
    readonly createdBy: any,
    readonly id: number
  ) {
    this.content = content;
    this.displayName = displayName;
    this.createdAt = createdAt;
    this.createdBy = createdBy;
    this.id = id;
  }
}

export type StudentDataInterface = {
  aimLine?: number;
  minForTask?: number;

  // Strings
  id: string | undefined | null;
  creator?: string;
  currentApproach?: string | undefined;
  currentErrorApproach?: string | undefined;
  currentGrade?: string;
  currentSRApproach?: string | undefined;
  currentTarget?: string | undefined;
  details?: string;
  name?: string;
  problemSet?: string;

  // Timestamps
  createdAt: firebase.firestore.Timestamp | null;
  dueDate: firebase.firestore.Timestamp | null;
  lastActivity: firebase.firestore.Timestamp | null;

  // Arrays
  comments: CommentInterface[];
  completedBenchmark: string[];
  currentBenchmarking: string[];
  factsMastered: string[];
  factsSkipped: string[];
  factsTargeted: string[];
};

export class StudentObject {
  constructor(
    // Strings
    readonly id: string | undefined | null,
    readonly aimLine: number,
    readonly createdAt: firebase.firestore.Timestamp | null,
    readonly dueDate: firebase.firestore.Timestamp | null,
    readonly lastActivity: firebase.firestore.Timestamp | null,
    readonly comments: CommentInterface[],
    readonly completedBenchmark: string[],
    readonly currentBenchmarking: string[],
    readonly factsMastered: string[],
    readonly factsSkipped: string[],
    readonly factsTargeted: string[],

    readonly creator?: string,
    readonly currentApproach?: string | undefined,
    readonly currentErrorApproach?: string | undefined,
    readonly currentGrade?: string,
    readonly currentSRApproach?: string | undefined,
    readonly currentTarget?: string | undefined,
    readonly details?: string,
    readonly name?: string,
    readonly problemSet?: string,

    readonly minForTask?: number
  ) {
    // Strings
    this.id = id;
    this.aimLine = aimLine;
    this.createdAt = createdAt;
    this.dueDate = dueDate;
    this.lastActivity = lastActivity;
    this.comments = comments;
    this.completedBenchmark = completedBenchmark;
    this.currentBenchmarking = currentBenchmarking;
    this.factsMastered = factsMastered;
    this.factsSkipped = factsSkipped;
    this.factsTargeted = factsTargeted;

    this.creator = creator;
    this.currentApproach = currentApproach;
    this.currentErrorApproach = currentErrorApproach;
    this.currentGrade = currentGrade;
    this.currentSRApproach = currentSRApproach;
    this.currentTarget = currentTarget;
    this.details = details;
    this.name = name;
    this.problemSet = problemSet;

    this.minForTask = minForTask;
  }
}

export type CurrentObjectTypes =
  | StudentDataInterface
  | PerformanceDataInterface;

export type CurrentObjectTypeArrays =
  | StudentDataInterface[]
  | PerformanceDataInterface[]
  | UserDataInterface[];

export type PossibleCollectionType =
  | StudentDataInterface[]
  | PerformanceDataInterface[]
  | UserDataInterface[]
  | null;

export interface UseFirebaseDocument {
  document: StudentDataInterface | UserDataInterface | null;
  documentError: string | undefined;
}

export interface UseFirebaseCollection {
  documents: CurrentObjectTypeArrays | null;
  error: string | undefined;
}
