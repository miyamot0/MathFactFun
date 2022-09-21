/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useReducer, useEffect, useState } from "react";
import { StudentDataInterface } from "../../pages/student/interfaces/StudentInterfaces";
import { UserDataInterface } from "../../pages/user/types/UserTypes";
import { projectFirestore } from "../config";

import { FirebaseError } from "@firebase/util";
import {
  FirestoreAction,
  FirestoreState,
  UseFirestore,
} from "../interfaces/FirebaseInterfaces";
import { PerformanceDataInterface } from "../../pages/intervention/interfaces/InterventionInterfaces";
import { complexCollectionGetter, dispatchIfNotCancelledHelper } from "./helpers/FirebaseDispatchHelpers";

export enum FirestoreCollections {
  Students = "students",
  Performances = "performances",
  Users = "users",
}

export enum FirestoreStates {
  PENDING = "PENDING",
  ADDED = "ADDED",
  DELETED = "DELETED",
  UPDATED = "UPDATED",
  ERROR = "ERROR",
  THROW = "THROW",
}

/** firestoreReducer
 *
 * Reducer firestore interactions
 *
 * @param {Enum} state Current state
 * @param {Object} action Action type
 * @returns {FirestoreState}
 */
export function firestoreReducer(
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
  targetSkill: string | undefined,
  studentId: string | undefined
): UseFirestore {
  const [response, dispatch] = useReducer(firestoreReducer, {
    document: null,
    isPending: false,
    error: null,
    success: false,
  });
  const [isCancelled, setIsCancelled] = useState(false);

  const ref = complexCollectionGetter(collection, studentId, projectFirestore, targetSkill);

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
  async function addDocument(
    doc: StudentDataInterface | UserDataInterface | PerformanceDataInterface
  ): Promise<void> {
    dispatch({
      type: FirestoreStates.PENDING,
      payload: null,
      error: null,
    });

    try {
      const addedDocument = await ref.add({ ...doc });

      dispatchIfNotCancelledHelper({
        action: {
          type: FirestoreStates.ADDED,
          payload: addedDocument,
          error: null,
        },
        isCancelled,
        dispatch
      })
      /*
      dispatchIfNotCancelled({
        type: FirestoreStates.ADDED,
        payload: addedDocument,
        error: null,
      });
      */
    } catch (err: unknown) {
      dispatchIfNotCancelledHelper({
        action: {
          type: FirestoreStates.ERROR,
          payload: null,
          error: "error",
        },
        isCancelled,
        dispatch
      })

      /*
      dispatchIfNotCancelled({
        type: FirestoreStates.ERROR,
        payload: null,
        error: "error",
      });
      */
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

      /*
      dispatchIfNotCancelled({
        type: FirestoreStates.DELETED,
        payload: null,
        error: null,
      });
      */
    } catch (err: unknown) {
      dispatchIfNotCancelled({
        type: FirestoreStates.ERROR,
        payload: null,
        error: "error",
      });

      /*
      dispatchIfNotCancelled({
        type: FirestoreStates.ERROR,
        payload: null,
        error: "error",
      });
      */
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
  async function updateDocument(id: string, updates: any): Promise<void> {
    dispatch({
      type: FirestoreStates.PENDING,
      payload: null,
      error: null,
    });

    try {
      const updatedDocument = await ref.doc(id).update(updates);

      dispatchIfNotCancelledHelper({
        action: {
          type: FirestoreStates.UPDATED,
          payload: null,
          error: null,
        },
        isCancelled,
        dispatch
      })

      /*
      dispatchIfNotCancelled({
        type: FirestoreStates.UPDATED,
        payload: null,
        error: null,
      });
      */

      return updatedDocument;
    } catch (err: unknown) {

      dispatchIfNotCancelledHelper({
        action: {
          type: FirestoreStates.ERROR,
          payload: null,
          error: "error",
        },
        isCancelled,
        dispatch
      })

      /*
      dispatchIfNotCancelled({
        type: FirestoreStates.ERROR,
        payload: null,
        error: "error",
      });
      */

      return;
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return {
    addDocument,
    deleteDocument,
    updateDocument,
    response,
  };
}
