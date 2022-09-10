import firebase from "firebase/app";

import { UserDataInterface } from "../../models/UserModel";
import { StudentDataInterface } from "../../pages/student/types/StudentTypes";

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
