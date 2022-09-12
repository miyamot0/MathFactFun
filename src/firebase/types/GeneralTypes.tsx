import firebase from "firebase/app";
import { PerformanceDataInterface } from "../../pages/intervention/types/InterventionTypes";
import { FactDataInterface } from "../../pages/setcreator/types/SetCreatorTypes";

import { StudentDataInterface } from "../../pages/student/Types/StudentTypes";
import { UserDataInterface } from "../../pages/user/types/UserTypes";

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
