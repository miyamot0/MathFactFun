/**
 * Firestore hook
 */

import { useReducer, useEffect, useState } from "react";
import { PerformanceDataInterface } from "../models/PerformanceModel";
import { StudentDataInterface } from "../models/StudentModel";
import { UserDataInterface } from "../models/UserModel";
import { projectFirestore, timestamp } from "./config";

export enum FirestoreStates {
  PENDING = "PENDING",
  ADDED = "ADDED",
  DELETED = "DELETED",
  UPDATED = "UPDATED",
  ERROR = "ERROR",
}

interface FirestoreState {
  isPending: boolean;
  document: any;
  success: boolean;
  error: string;
}

interface FirestoreAction {
  type: FirestoreStates;
  payload: any;
  error: string;
}

interface UseFirestore {
  addDocument: (doc: StudentDataInterface | UserDataInterface | PerformanceDataInterface) => Promise<void>;
  deleteDocument: (id: string) => Promise<void>;
  updateDocument: (id: string, updates: {}) => Promise<void>;
  response: FirestoreState;
}

/** firestoreReducer
 *
 * Reducer firestore interactions
 *
 * @param {Enum} state Current state
 * @param {Object} action Action type
 * @returns {FirestoreState}
 */
function firestoreReducer(
  state: FirestoreState,
  action: FirestoreAction
): FirestoreState {
  switch (action.type) {
    case FirestoreStates.PENDING:
      return {
        isPending: true,
        document: null,
        success: false,
        error: null,
      };
    case FirestoreStates.ADDED:
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case FirestoreStates.DELETED:
      return {
        isPending: false,
        document: null,
        success: true,
        error: null,
      };
    case FirestoreStates.UPDATED:
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case FirestoreStates.ERROR:
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.error,
      };
    default:
      return state;
  }
}

/** useFirestore
 *
 * Core firebase interaction methods
 *
 * @param {string} collection collection address
 * @param {string} targetSkill skill targeted
 * @param {string} studentId id for student
 * @returns {UseFirestore}
 */
export function useFirestore(
  collection: string,
  targetSkill: string = null,
  studentId: string = null
): UseFirestore {
  const [response, dispatch] = useReducer(firestoreReducer, {
    document: null,
    isPending: false,
    error: null,
    success: null,
  });
  const [isCancelled, setIsCancelled] = useState(false);

  const ref =
    collection !== ""
      ? projectFirestore.collection(collection)
      : projectFirestore
        .collection("performances")
        .doc(targetSkill)
        .collection(studentId);

  // only dispatch is not cancelled
  function dispatchIfNotCancelled(action: FirestoreAction): void {
    if (!isCancelled) {
      dispatch(action);
    }
  }

  /** addDocument
   *
   * add a document
   *
   * @param {StudentModel | PerformanceModel} doc document to upload
   * @returns {Promise<void>}
   */
  async function addDocument(doc: StudentDataInterface | UserDataInterface | PerformanceDataInterface): Promise<void> {
    dispatch({
      type: FirestoreStates.PENDING,
      payload: null,
      error: null,
    });

    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedDocument = await ref.add({ ...doc, createdAt });

      dispatchIfNotCancelled({
        type: FirestoreStates.ADDED,
        payload: addedDocument,
        error: null,
      });
    } catch (err) {
      dispatchIfNotCancelled({
        type: FirestoreStates.ERROR,
        payload: null,
        error: err.message,
      });
    }
  }

  /** deleteDocument
   *
   * delete a document
   *
   * @param {string} id document address for removal
   * @returns {Promise<void>}
   */
  async function deleteDocument(id: string): Promise<void> {
    dispatch({
      type: FirestoreStates.PENDING,
      payload: null,
      error: null,
    });

    try {
      await ref.doc(id).delete();
      dispatchIfNotCancelled({
        type: FirestoreStates.DELETED,
        payload: null,
        error: null,
      });
    } catch (err) {
      dispatchIfNotCancelled({
        type: FirestoreStates.DELETED,
        payload: null,
        error: "Could not delete",
      });
    }
  }

  /** updateDocument
   *
   * update a document
   *
   * @param {string} id document address for removal
   * @param {updates} updates object with features to update
   * @returns {Promise<void>}
   */
  async function updateDocument(id: string, updates: {}): Promise<void> {
    dispatch({
      type: FirestoreStates.PENDING,
      payload: null,
      error: null,
    });

    try {
      const updatedDocument = await ref.doc(id).update(updates);
      dispatchIfNotCancelled({
        type: FirestoreStates.UPDATED,
        payload: null,
        error: null
      });
      return updatedDocument;
    } catch (err) {
      dispatchIfNotCancelled({
        type: FirestoreStates.ERROR,
        payload: null,
        error: err.message,
      });
      return null;
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, deleteDocument, updateDocument, response };
}
