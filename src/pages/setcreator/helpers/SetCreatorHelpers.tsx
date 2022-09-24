/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { FirestoreState } from "../../../firebase/interfaces/FirebaseInterfaces";
import { FactsOnFire } from "../../../maths/Mind";
import {
  GetOperatorFromLabel,
  OnlyUnique,
  Sum,
} from "../../../utilities/LabelHelper";
import { PerformanceDataInterface } from "../../intervention/interfaces/InterventionInterfaces";
import { StudentDataInterface } from "../../student/interfaces/StudentInterfaces";
import {
  FactDataInterface,
  FactStructure,
  ItemHistory,
  ItemMetrics,
  SetItem,
} from "../interfaces/SetCreatorInterfaces";
import {
  ColumnObject,
  ColumnSnapsot,
  DragDropActions,
} from "../types/SetCreatorTypes";

/** isEmpty
 *
 */
export function isEmpty(obj: object) {
  return Object.keys(obj).length === 0;
}

/** checkIfNullUndefinedOrEmpty
 *
 * @param obj
 * @returns
 */
export function checkIfNullUndefinedOrEmpty(obj: object) {
  return obj === null || obj === undefined || isEmpty(obj);
}

/** loadMathFacts
 *
 * Load relevant math facts
 *
 * @param {StudentDataInterface} student Student document from firestore
 * @returns {Array} Mind facts
 */
export function loadMathFacts(
  student: StudentDataInterface
): FactStructure[][] {
  let factsOnFire = FactsOnFire.Addition;

  switch (student.currentTarget) {
    case "Addition":
      factsOnFire = FactsOnFire.Addition;
      break;
    case "Subtraction":
      factsOnFire = FactsOnFire.Subtraction;
      break;
    case "Multiplication":
      factsOnFire = FactsOnFire.Multiplication;
      break;
    case "Division":
      factsOnFire = FactsOnFire.Division;
      break;
    default:
      factsOnFire = FactsOnFire.Addition;
      break;
  }

  return factsOnFire.map(function (array, setNum) {
    return array.map(function (answer, posInArray) {
      return {
        Answer: answer,
        id: `${answer}:${setNum}:${posInArray}`,
      } as FactStructure;
    });
  });
}

/** formatTextBox
 *
 * Format text output regarding decimal points
 *
 * @param {number} entry Value supplied
 * @param {number} dec Decimal points
 * @returns {string} Formatted string
 */
export function formatTextBox(entry: number, dec: number) {
  if (entry === undefined) {
    return "---";
  } else {
    return entry.toFixed(dec);
  }
}

/** formatBackgroundColor
 *
 * Formats the background color based on criteria
 *
 * @param {SetItem} entry Summarized math fact info
 * @returns {String} Color for background
 */
export function formatBackgroundColor(entry: SetItem): string {
  const backgroundColor = "#456C86";

  if (
    entry.OTRs === undefined ||
    entry.Accuracy === undefined ||
    entry.Latency === undefined
  ) {
    return backgroundColor;
  }

  if (entry.OTRs > 5 && entry.Accuracy > 80 && entry.Latency < 10) {
    return "#42c966";
  }

  return backgroundColor;
}

/** generateItemHistory
 *
 * @param uniqueProblems
 * @param flatItemSummaries
 * @param target
 * @returns
 */
export function generateItemHistory(
  uniqueProblems: string[],
  flatItemSummaries: FactDataInterface[],
  target: string
) {
  return uniqueProblems.map((itemString) => {
    const relevantItems = flatItemSummaries.filter(
      (obj) => obj.factString === itemString
    );

    const itemsCorrect = relevantItems
      .map((item) => (item.factCorrect ? 1 : 0) as number)
      .reduce(Sum);

    const itemLatency = relevantItems
      .map((item) => Math.abs(item.latencySeconds))
      .reduce(Sum);

    return {
      FactString: itemString,
      X: parseInt(itemString.split(GetOperatorFromLabel(target))[0]),
      Y: parseInt(
        itemString.split(GetOperatorFromLabel(target))[1].split("=")[0]
      ),
      Latency: itemLatency / relevantItems.length,
      AverageCorrect: (itemsCorrect / relevantItems.length) * 100,
      Correct: itemsCorrect,
      Total: relevantItems.length,
    };
  });
}

/** populateColumnMetrics
 *
 * @param facts
 * @param itemHistory
 * @returns
 */
export function populateColumnMetrics(
  facts: string[],
  itemHistory: ItemHistory[]
) {
  return facts.map((element) => {
    let otrs = 0,
      accuracy = 0,
      latency = 0;

    const releventResult = itemHistory.filter(
      (obj) => obj.FactString === element.split(":")[0]
    );

    if (releventResult && releventResult.length === 1) {
      otrs = releventResult[0].Total;
      accuracy = releventResult[0].AverageCorrect;
      latency = releventResult[0].Latency;

      return {
        Answer: element.split(":")[0],
        id: element,
        OTRs: otrs,
        Accuracy: accuracy,
        Latency: latency,
      };
    } else {
      return {
        Answer: element.split(":")[0],
        id: element,
        OTRs: otrs,
        Accuracy: accuracy,
        Latency: latency,
      };
    }
  });
}

/** getRelevantCCCSet
 *
 * Get the relevant set of problems from MIND
 *
 * @param {String} target Type of problem
 * @returns {Object} Bank of math fact problems
 */
export function getRelevantCCCSet(target: string): string[][] {
  switch (target) {
    case "Addition":
      return FactsOnFire.Addition;
    case "Subtraction":
      return FactsOnFire.Subtraction;
    case "Multiplication":
      return FactsOnFire.Multiplication;
    case "Division":
      return FactsOnFire.Division;
    default:
      return FactsOnFire.Addition;
  }
}

/** populationCoreInformation
 *
 * @param documents
 * @param target
 * @param callbackFromReducer
 * @param dispatch
 */
export function populateCoreInformation(
  documents: PerformanceDataInterface[],
  target: string,
  callbackFromReducer: any,
  dispatch: any
) {
  const mappedDocument = documents.map((doc) => {
    return {
      Items: doc.entries as FactDataInterface[],
      Date: new Date(doc.dateTimeStart),
      ShortDate: new Date(doc.dateTimeStart).toLocaleDateString("en-US"),
      Errors: doc.errCount,
      DigitsCorrect: doc.correctDigits,
      DigitsCorrectInitial: doc.nCorrectInitial,
      DigitsTotal: doc.totalDigits,
      SessionDuration: doc.sessionDuration,
    } as ItemMetrics;
  });

  // Pull out fact models alone, array of array
  const itemSummaries: FactDataInterface[][] = mappedDocument.map(
    (items) => items.Items
  );

  const flatItemSummaries: FactDataInterface[] = itemSummaries.reduce(
    (accumulator, value) => accumulator.concat(value)
  );

  const uniqueProblems: string[] = flatItemSummaries
    .map((obj) => obj.factString)
    .filter(OnlyUnique)
    .sort();

  const uniqueQuants = generateItemHistory(
    uniqueProblems,
    flatItemSummaries,
    target
  );

  dispatch({ type: DragDropActions.SetItemHistory, payload: uniqueQuants });

  dispatch({
    type: DragDropActions.LoadCallback,
    payload: callbackFromReducer,
  });
}

/** generateColumnSnapshotPreview
 *
 * @param callbackColumns
 * @param callbackColumnsPre
 * @returns
 */
export function generateColumnSnapshotPreview(
  callbackColumns: ColumnObject,
  callbackColumnsPre: ColumnObject
) {
  const factsTargeted: string[] = callbackColumns.Targeted.items.map(
    (a: FactStructure) => a.id
  );
  const factsSkipped: string[] = callbackColumns.Skipped.items.map(
    (a: FactStructure) => a.id
  );
  const factsMastered: string[] = callbackColumns.Mastered.items.map(
    (a: FactStructure) => a.id
  );

  const factsTargetedPrev: string[] = callbackColumnsPre.Targeted.items.map(
    (a: FactStructure) => a.id
  );
  const factsSkippedPrev: string[] = callbackColumnsPre.Skipped.items.map(
    (a: FactStructure) => a.id
  );
  const factsMasteredPrev: string[] = callbackColumnsPre.Mastered.items.map(
    (a: FactStructure) => a.id
  );

  return {
    Preview: {
      factsTargeted: factsTargetedPrev,
      factsSkipped: factsSkippedPrev,
      factsMastered: factsMasteredPrev,
    },
    Current: {
      factsTargeted: factsTargeted,
      factsSkipped: factsSkipped,
      factsMastered: factsMastered,
    },
  } as ColumnSnapsot;
}

/** saveUpdatedDataToFirebase
 *
 * @param id
 * @param comparisonObjects
 * @param updateDocument
 * @param response
 * @returns
 */
export async function saveUpdatedDataToFirebase(
  id: string,
  comparisonObjects: ColumnSnapsot,
  updateDocument: any,
  response: FirestoreState
) {
  await updateDocument(id, comparisonObjects.Current);

  if (response.error) {
    window.alert("There was an error saving to the database");
  } else {
    return;
  }
}
