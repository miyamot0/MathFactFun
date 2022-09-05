import firebase from "firebase/app";
import {
  CommentInterface,
  FactDataInterface,
  PerformanceDataInterface,
  StudentDataInterface,
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

export type StudentConverterType =
  firebase.firestore.FirestoreDataConverter<StudentDataInterface>;

export const studentConverter: StudentConverterType = {
  toFirestore(data: StudentDataInterface): firebase.firestore.DocumentData {
    return {
      id: data.id,
      aimLine: data.aimLine,
      createdAt: data.createdAt,
      dueDate: data.dueDate,
      lastActivity: data.lastActivity,
      comments: data.comments,
      completedBenchmark: data.completedBenchmark,
      currentBenchmarking: data.currentBenchmarking,
      factsMastered: data.factsMastered,
      factsSkipped: data.factsSkipped,
      factsTargeted: data.factsTargeted,
      creator: data.creator,
      currentApproach: data.currentApproach,
      currentErrorApproach: data.currentErrorApproach,
      currentGrade: data.currentGrade,
      currentSRApproach: data.currentSRApproach,
      currentTarget: data.currentTarget,
      details: data.details,
      name: data.name,
      problemSet: data.problemSet,
      minForTask: data.minForTask,
    };
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): StudentDataInterface {
    const data = snapshot.data(options);
    return new StudentDataInterface(
      data.id,
      data.aimLine,
      data.createdAt,
      data.dueDate,
      data.lastActivity,
      data.comments,
      data.completedBenchmark,
      data.currentBenchmarking,
      data.factsMastered,
      data.factsSkipped,
      data.factsTargeted,
      data.creator,
      data.currentApproach,
      data.currentErrorApproach,
      data.currentGrade,
      data.currentSRApproach,
      data.currentTarget,
      data.details,
      data.name,
      data.problemSet,
      data.minForTask
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
