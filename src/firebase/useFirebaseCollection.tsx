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

const CollectionError = "Unable to retrieve data";

interface UseFirebaseCollection {
  documents: StudentDataInterface[] | CommentInterface[] | PerformanceDataInterface[];
  error: string;
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
  queryString: string[],
  orderString: string[]
): UseFirebaseCollection {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  const query = useRef(queryString).current;
  const orderBy = useRef(orderString).current;

  useEffect(() => {
    let ref: Query = projectFirestore.collection(collectionString);

    if (query) {
      const [fieldPath, opString, value] = query;

      ref = ref.where(fieldPath, opString as WhereFilterOp, value);
    }
    if (orderBy) {
      const [fieldPath, direction] = query;

      ref = ref.orderBy(fieldPath, direction as OrderByDirection);
    }

    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });

        setDocuments(results);
        setError(null);
      },
      (error) => {
        setError(CollectionError);
      }
    );

    return () => unsubscribe();
  }, [collectionString, query, orderBy]);

  return { documents, error };
}
