import firebase from "firebase/app";
import { StudentDataInterface } from "../../pages/student/types/StudentTypes";
import {
  CommentInterface,
  FactDataInterface,
  PerformanceDataInterface,
} from "../types/GeneralTypes";

export type CommentConverterType =
  firebase.firestore.FirestoreDataConverter<CommentInterface>;

export const commentConverter: CommentConverterType = {
  toFirestore(comment: CommentInterface): firebase.firestore.DocumentData {
    return {
      content: comment.content,
      displayName: comment.displayName,
      createdAt: comment.createdAt,
      createdBy: comment.createdBy,
      id: comment.id,
    };
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): CommentInterface {
    const data = snapshot.data(options);
    return new CommentInterface(
      data.content,
      data.displayName,
      data.createdAt,
      data.createdBy,
      data.id
    );
  },
};

export type FactConverterType =
  firebase.firestore.FirestoreDataConverter<FactDataInterface>;

export const factConverter: FactConverterType = {
  toFirestore(fact: FactDataInterface): firebase.firestore.DocumentData {
    return {
      factCorrect: fact.factCorrect,
      initialTry: fact.initialTry,
      factType: fact.factType,
      factString: fact.factString,
      factEntry: fact.factEntry,
      latencySeconds: fact.latencySeconds,

      // Timestamps
      dateTimeEnd: fact.dateTimeEnd,
      dateTimeStart: fact.dateTimeStart,
    };
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): FactDataInterface {
    const data = snapshot.data(options);
    return new FactDataInterface(
      data.factCorrect,
      data.initialTry,
      data.factType,
      data.factString,
      data.factEntry,
      data.latencySeconds,

      // Timestamps
      data.dateTimeEnd,
      data.dateTimeStart
    );
  },
};

export type PerformanceConverterType =
  firebase.firestore.FirestoreDataConverter<PerformanceDataInterface>;

export const performanceConverter: PerformanceConverterType = {
  toFirestore(
    performance: PerformanceDataInterface
  ): firebase.firestore.DocumentData {
    return {
      correctDigits: performance.correctDigits,
      errCount: performance.errCount,
      nCorrectInitial: performance.nCorrectInitial,
      nRetries: performance.nRetries,
      sessionDuration: performance.sessionDuration,
      setSize: performance.setSize,
      totalDigits: performance.totalDigits,

      // Arrays
      entries: performance.entries,

      // Strings
      id: performance.id,
      creator: performance.creator,
      target: performance.target,
      method: performance.method,
      dateTimeEnd: performance.dateTimeEnd,
      dateTimeStart: performance.dateTimeStart,

      // Timestamps
      createdAt: performance.createdAt,
    };
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): PerformanceDataInterface {
    const data = snapshot.data(options);

    return new PerformanceDataInterface(
      data.correctDigits,
      data.errCount,
      data.nCorrectInitial,
      data.nRetries,
      data.sessionDuration,
      data.setSize,
      data.totalDigits,

      // Arrays
      data.entries,

      // Strings
      data.id,
      data.creator,
      data.target,
      data.method,
      data.dateTimeEnd,
      data.dateTimeStart,

      // Timestamps
      data.createdAt
    );
  },
};
