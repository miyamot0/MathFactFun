import firebase from "firebase/app";
import { CommentInterface } from "../types/GeneralTypes";

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

/*
export const studentConverter: StudentConverterType = {
  toFirestore(student: StudentDataInterface): firebase.firestore.DocumentData {
    return {};
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): StudentDataInterface {
    const data = snapshot.data(options);
    return new StudentDataInterface(
      data.content,
      data.displayName,
      data.createdAt,
      data.createdBy,
      data.id
    );
  },
};
*/

export type StudentDataInterface = {};
