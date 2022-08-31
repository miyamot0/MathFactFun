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
import { PerformanceDataInterface } from "../models/PerformanceModel";

const CollectionError = "Unable to retrieve data";

interface UseFirebaseCollectionAddition {
  additionDocuments: PerformanceDataInterface[] | undefined;
  additionError: string | undefined;
}

interface UseFirebaseCollectionSubtraction {
  subtractionDocuments: PerformanceDataInterface[] | undefined;
  subtractionError: string | undefined;
}

interface UseFirebaseCollectionMultiplication {
  multiplicationDocuments: PerformanceDataInterface[] | undefined;
  multiplicationError: string | undefined;
}

interface UseFirebaseCollectionDivision {
  divisionDocuments: PerformanceDataInterface[] | undefined;
  divisionError: string | undefined;
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
  queryString: string[] | undefined,
  orderString: string[] | undefined
): UseFirebaseCollectionAddition {
  const [additionDocuments, setAdditionDocuments] = useState<PerformanceDataInterface[]>();
  const [additionError, setError] = useState<string>();

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
      const [fieldPath, direction] = orderBy;

      ref = ref.orderBy(fieldPath, direction as OrderByDirection);
    }

    const unsubscribe = ref.onSnapshot(
      (snapshot) => {

        let results = Array<PerformanceDataInterface>();

        snapshot.docs.forEach((doc) => {
          let preDoc = doc.data() as PerformanceDataInterface;
          preDoc.id = doc.id;
          results.push(preDoc);
        });

        setAdditionDocuments(results);
        setError(undefined);
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
  queryString: string[] | undefined,
  orderString: string[] | undefined
): UseFirebaseCollectionSubtraction {
  const [subtractionDocuments, setSubtractionDocuments] = useState<PerformanceDataInterface[]>();
  const [subtractionError, setError] = useState<string>();

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
      const [fieldPath, direction] = orderBy;

      ref = ref.orderBy(fieldPath, direction as OrderByDirection);
    }

    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        let results = Array<PerformanceDataInterface>();

        snapshot.docs.forEach((doc) => {
          let preDoc = doc.data() as PerformanceDataInterface;
          preDoc.id = doc.id;
          results.push(preDoc);
        });

        setSubtractionDocuments(results);
        setError(undefined);
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
  queryString: string[] | undefined,
  orderString: string[] | undefined
): UseFirebaseCollectionMultiplication {
  const [multiplicationDocuments, setMultiplicationDocuments] = useState<PerformanceDataInterface[]>();
  const [multiplicationError, setError] = useState<string>();

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
      const [fieldPath, direction] = orderBy;

      ref = ref.orderBy(fieldPath, direction as OrderByDirection);
    }

    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        let results = Array<PerformanceDataInterface>();

        snapshot.docs.forEach((doc) => {
          let preDoc = doc.data() as PerformanceDataInterface;
          preDoc.id = doc.id;
          results.push(preDoc);
        });

        setMultiplicationDocuments(results);
        setError(undefined);
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
  queryString: string[] | undefined,
  orderString: string[] | undefined
): UseFirebaseCollectionDivision {
  const [divisionDocuments, setDivisionDocuments] = useState<PerformanceDataInterface[]>();
  const [divisionError, setError] = useState<string>();

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
      const [fieldPath, direction] = orderBy;

      ref = ref.orderBy(fieldPath, direction as OrderByDirection);
    }

    const unsubscribe = ref.onSnapshot(
      (snapshot) => {

        let results = Array<PerformanceDataInterface>();

        snapshot.docs.forEach((doc) => {
          let preDoc = doc.data() as PerformanceDataInterface;
          preDoc.id = doc.id;
          results.push(preDoc);
        });

        setDivisionDocuments(results);
        setError(undefined);
      },
      (error) => {
        setError(CollectionError);
      }
    );

    return () => unsubscribe();
  }, [idString, query, orderBy]);

  return { divisionDocuments, divisionError };
}
