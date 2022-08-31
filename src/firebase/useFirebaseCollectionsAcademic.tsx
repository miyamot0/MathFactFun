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
import {
  Query,
  WhereFilterOp,
  OrderByDirection,
} from "@firebase/firestore-types";

import { projectFirestore } from "./config";

const CollectionError = "Unable to retrieve data";

interface UseFirebaseCollectionAddition {
  additionDocuments: any;
  additionError: string;
}

interface UseFirebaseCollectionSubtraction {
  subtractionDocuments: any;
  subtractionError: string;
}

interface UseFirebaseCollectionMultiplication {
  multiplicationDocuments: any;
  multiplicationError: string;
}

interface UseFirebaseCollectionDivision {
  divisionDocuments: any;
  divisionError: string;
}

/** useFirebaseCollectionAddition
 *
 * Access a collection (addition)
 *
 * @param {string} collectionString collection address
 * @param {string[]} queryString string array for query
 * @param {string[]} orderString string array for order
 * @returns {UseFirebaseCollectionAddition}
 */
export function useFirebaseCollectionAddition(
  idString: string,
  queryString: string[],
  orderString: string[]
): UseFirebaseCollectionAddition {
  const [additionDocuments, setAdditionDocuments] = useState(null);
  const [additionError, setError] = useState(null);

  const query = useRef(queryString).current;
  const orderBy = useRef(orderString).current;

  useEffect(() => {
    let ref: Query = projectFirestore.collection(
      `performances/Addition/${idString}`
    );

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

        setAdditionDocuments(results);
        setError(null);
      },
      (error) => {
        setError(CollectionError);
      }
    );

    return () => unsubscribe();
  }, [idString, query, orderBy]);

  return { additionDocuments, additionError };
}

/** useFirebaseCollectionSubtraction
 *
 * Access a collection (subtraction)
 *
 * @param {string} collectionString collection address
 * @param {string[]} queryString string array for query
 * @param {string[]} orderString string array for order
 * @returns {UseFirebaseCollectionSubtraction}
 */
export function useFirebaseCollectionSubtraction(
  idString: string,
  queryString: string[],
  orderString: string[]
): UseFirebaseCollectionSubtraction {
  const [subtractionDocuments, setSubtractionDocuments] = useState(null);
  const [subtractionError, setError] = useState(null);

  const query = useRef(queryString).current;
  const orderBy = useRef(orderString).current;

  useEffect(() => {
    let ref: Query = projectFirestore.collection(
      `performances/Subtraction/${idString}`
    );

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

        setSubtractionDocuments(results);
        setError(null);
      },
      (error) => {
        setError(CollectionError);
      }
    );

    return () => unsubscribe();
  }, [idString, query, orderBy]);

  return { subtractionDocuments, subtractionError };
}

/** useFirebaseCollectionMultiplication
 *
 * Access a collection (multiplication)
 *
 * @param {string} collectionString collection address
 * @param {string[]} queryString string array for query
 * @param {string[]} orderString string array for order
 * @returns {UseFirebaseCollectionMultiplication}
 */
export function useFirebaseCollectionMultiplication(
  idString: string,
  queryString: string[],
  orderString: string[]
): UseFirebaseCollectionMultiplication {
  const [multiplicationDocuments, setMultiplicationDocuments] = useState(null);
  const [multiplicationError, setError] = useState(null);

  const query = useRef(queryString).current;
  const orderBy = useRef(orderString).current;

  useEffect(() => {
    let ref: Query = projectFirestore.collection(
      `performances/Multiplication/${idString}`
    );

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

        setMultiplicationDocuments(results);
        setError(null);
      },
      (error) => {
        setError(CollectionError);
      }
    );

    return () => unsubscribe();
  }, [idString, query, orderBy]);

  return { multiplicationDocuments, multiplicationError };
}

/** useFirebaseCollectionDivision
 *
 * Access a collection (division)
 *
 * @param {string} collectionString collection address
 * @param {string[]} queryString string array for query
 * @param {string[]} orderString string array for order
 * @returns {UseFirebaseCollectionDivision}
 */
export function useFirebaseCollectionDivision(
  idString: string,
  queryString: string[],
  orderString: string[]
): UseFirebaseCollectionDivision {
  const [divisionDocuments, setDivisionDocuments] = useState(null);
  const [divisionError, setError] = useState(null);

  const query = useRef(queryString).current;
  const orderBy = useRef(orderString).current;

  useEffect(() => {
    let ref: Query = projectFirestore.collection(
      `performances/Division/${idString}`
    );

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

        setDivisionDocuments(results);
        setError(null);
      },
      (error) => {
        setError(CollectionError);
      }
    );

    return () => unsubscribe();
  }, [idString, query, orderBy]);

  return { divisionDocuments, divisionError };
}
