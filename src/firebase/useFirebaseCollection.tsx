/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Firebase collection
 */

import { useEffect, useState, useRef } from "react";
import { projectFirestore } from "./config";

import {
  Query,
  WhereFilterOp,
  OrderByDirection,
} from "@firebase/firestore-types";
import { CommentInterface, StudentDataInterface } from "../models/StudentModel";
import { PerformanceDataInterface } from "../models/PerformanceModel";
import { UserDataInterface } from "../models/UserModel";

const CollectionError = "Unable to retrieve data";

export type CurrentObjectTypes = StudentDataInterface | CommentInterface | PerformanceDataInterface;
export type CurrentObjectTypeArrays = StudentDataInterface[] | CommentInterface[] | PerformanceDataInterface[] | UserDataInterface[];

interface UseFirebaseCollection {
  documents: CurrentObjectTypeArrays | null;
  error: string | undefined;
}

/** useFirebaseCollection
 *
 * Access a collection
 *
 * @param {string} collectionString collection address
 * @param {string[]} queryString string array for query
 * @param {string[]} orderString string array for order
 * @returns {UseFirebaseCollection}
 */
export function useFirebaseCollection(
  collectionString: string,
  queryString: string[] | undefined,
  orderString: string[] | undefined
): UseFirebaseCollection {
  const [documents, setDocuments] = useState<StudentDataInterface[] | CommentInterface[] | PerformanceDataInterface[] | UserDataInterface[] | null>(null);
  const [error, setError] = useState<string>();

  const query = useRef(queryString).current;
  const orderBy = useRef(orderString).current;

  useEffect(() => {
    let ref: Query = projectFirestore.collection(collectionString);

    if (query) {
      const [fieldPath, opString, value] = query;

      ref = ref.where(fieldPath, opString as WhereFilterOp, value);
    }
    if (orderBy) {
      const [fieldPath, direction] = orderBy;

      ref = ref.orderBy(fieldPath, direction as OrderByDirection);
    }

    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        let results = Array<CurrentObjectTypes | null>();

        snapshot.docs.forEach((doc) => {
          let preDoc = doc.data() as CurrentObjectTypes;
          preDoc.id = doc.id;
          results.push(preDoc);
        });

        setDocuments(results as StudentDataInterface[] | CommentInterface[] | PerformanceDataInterface[] | UserDataInterface[]);
        setError(undefined);
      },
      (error) => {
        setError(CollectionError);
      }
    );

    return () => unsubscribe();
  }, [collectionString, query, orderBy]);

  return { documents, error };
}
