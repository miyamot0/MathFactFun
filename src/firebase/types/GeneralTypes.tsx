import firebase from "firebase/app";

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

export class StudentDataInterface {
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

export class FactDataInterface {
  constructor(
    // Bools
    readonly factCorrect: boolean | null,
    readonly initialTry: boolean | null,

    // Strings
    readonly factType: string | undefined,
    readonly factString: string | undefined,
    readonly factEntry: string | undefined,

    // Numerics
    readonly latencySeconds: number | null,

    // Timestamps
    readonly dateTimeEnd: firebase.firestore.Timestamp,
    readonly dateTimeStart: firebase.firestore.Timestamp
  ) {
    this.factCorrect = factCorrect;
    this.initialTry = initialTry;
    this.factType = factType;
    this.factString = factString;
    this.factEntry = factEntry;
    this.latencySeconds = latencySeconds;

    // Timestamps
    this.dateTimeEnd = dateTimeEnd;
    this.dateTimeStart = dateTimeStart;
  }
}

export class PerformanceDataInterface {
  constructor(
    // Numerics
    readonly correctDigits: number,
    readonly errCount: number,
    readonly nCorrectInitial: number,
    readonly nRetries: number,
    readonly sessionDuration: number,
    readonly setSize: number,
    readonly totalDigits: number,

    // Arrays
    readonly entries: FactDataInterface[],

    // Strings
    readonly id: string | undefined | null,
    readonly creator: string | undefined,
    readonly target: string | undefined,
    readonly method: string | undefined,
    readonly dateTimeEnd: string | undefined,
    readonly dateTimeStart: string | undefined,

    // Timestamps
    readonly createdAt?: firebase.firestore.Timestamp | null
  ) {
    this.correctDigits = correctDigits;
    this.errCount = errCount;
    this.nCorrectInitial = nCorrectInitial;
    this.nRetries = nRetries;
    this.sessionDuration = sessionDuration;
    this.setSize = setSize;
    this.totalDigits = totalDigits;

    // Timestamps
    this.createdAt = createdAt;

    // Arrays
    this.entries = entries;

    // Strings
    this.id = id;
    this.creator = creator;
    this.target = target;
    this.method = method;
    this.dateTimeEnd = dateTimeEnd;
    this.dateTimeStart = dateTimeStart;
  }
}

export type CurrentObjectTypeArrays =
  | StudentDataInterface[]
  | PerformanceDataInterface[]
  | UserDataInterface[]
  | null;

export type PossibleCollectionType =
  | StudentDataInterface[]
  | PerformanceDataInterface[]
  | UserDataInterface[]
  | null;

export interface UseFirebaseDocument {
  document: StudentDataInterface | UserDataInterface | null | undefined;
  documentError: string | undefined;
}

export interface UseFirebaseCollection {
  documents: any[] | null;
  error: string | undefined;
}

export interface CollectionInputInterface {
  collectionString: string;
  queryString: string[] | undefined;
  orderString: string[] | undefined;
}

export interface DocumentInputInterface {
  collectionString: string;
  idString: string | undefined;
}