import moment from "moment";
import {
  GetOperatorFromLabel,
  OnlyUnique,
  Sum,
} from "../../../utilities/LabelHelper";
import { PerformanceDataInterface } from "../../intervention/types/InterventionTypes";
import { FactDataInterface } from "../../setcreator/types/SetCreatorTypes";
import {
  DailyPerformanceMetrics,
  ItemPerformanceMetrics,
  RemappedPerformances,
} from "../types/ProgressTypes";

/** modifyDate
 *
 * Modify the date to standardize for days
 *
 * @param {Date} newDate Raw date object
 * @returns {Date} Amended date object
 */
export function modifyDate(newDate: Date = new Date()): Date {
  const modDate = newDate;
  modDate.setHours(0);
  modDate.setMinutes(0);
  modDate.setSeconds(0);

  return modDate;
}

/** getMappedColor
 *
 * Map for chart
 *
 * @param {number} accuracy Accuracy numbers
 * @returns {string} Color for marker
 */
export function getMappedColor(accuracy: number): "red" | "orange" | "green" {
  if (accuracy < 50) {
    return "red";
  } else if (accuracy < 80) {
    return "orange";
  } else {
    return "green";
  }
}

/** getMappedMarker
 *
 * Map for chart
 *
 * @param {number} latency Latency numbers
 * @returns {string} Shape for marker
 */
export function getMappedMarker(
  latency: number
): "circle" | "triangle" | "diamond" | "square" {
  if (latency < 5) {
    return "circle";
  } else if (latency < 10) {
    return "triangle";
  } else if (latency < 15) {
    return "diamond";
  } else {
    return "square";
  }
}

/** remapPerformances
 *
 * Map doc to intermediate array
 *
 * @param {PerformanceDataInterface[]} documents
 * @returns {RemappedPerformances[]}
 */
export function remapPerformances(
  documents: PerformanceDataInterface[]
): RemappedPerformances[] {
  return documents.map((doc) => {
    return {
      // TODO: clean up this flip flopping
      Items: doc.entries as FactDataInterface[],
      Date: new Date(doc.dateTimeStart!),
      ShortDate: new Date(doc.dateTimeStart!).toLocaleDateString("en-US"),
      Errors: doc.errCount,
      DigitsCorrect: doc.correctDigits,
      DigitsCorrectInitial: doc.nCorrectInitial,
      DigitsTotal: doc.totalDigits,
      SessionDuration: doc.sessionDuration,
      Method: doc.method,
    };
  });
}

/** aggregatePerformances
 *
 * Aggreg data by day
 *
 * @param {RemappedPerformances[]} mappedDocument
 * @returns {DailyPerformanceMetrics[]}
 */
export function aggregatePerformances(
  mappedDocument: RemappedPerformances[]
): DailyPerformanceMetrics[] {
  return mappedDocument
    .map((obj) => obj.ShortDate)
    .filter(OnlyUnique)
    .sort()
    .map((date) => {
      const relevantData = mappedDocument.filter(
        (obj) => obj.ShortDate === date
      );

      const totalDigitsCorr = relevantData
        .map((obj) => obj.DigitsCorrect)
        .reduce(Sum);
      const totalDigits = relevantData
        .map((obj) => obj.DigitsTotal)
        .reduce(Sum);
      const totalTime =
        relevantData.map((obj) => obj.SessionDuration).reduce(Sum) / 60.0;

      return {
        Date: date,
        DCPM: totalDigitsCorr / totalTime,
        Accuracy: (totalDigitsCorr / totalDigits) * 100,
      };
    })
    .sort(
      (a, b) =>
        moment(b.Date).toDate().valueOf() - moment(a.Date).toDate().valueOf()
    );
}

/** aggregateItemLevelPerformances
 *
 * Aggreg by item
 *
 * @param {(string | undefined)[]} uniqueMathFacts
 * @param {FactDataInterface[]} flatItemSummaries
 * @param {string | undefined} target
 * @returns
 */
export function aggregateItemLevelPerformances(
  uniqueMathFacts: (string | undefined)[],
  flatItemSummaries: FactDataInterface[],
  target: string | undefined
): ItemPerformanceMetrics[] {
  return uniqueMathFacts!.map((itemString) => {
    // Select matching performances from array of objects
    const relevantPerformances = flatItemSummaries.filter(
      (obj) => obj.factString === itemString
    );

    // Sum problems correctly copied
    const itemsCorrect = relevantPerformances
      .map((item) => (item.factCorrect ? 1.0 : 0.0) as number)
      .reduce(Sum);

    // Sum latency to correct responding
    const itemLatency = relevantPerformances
      .map((item) => Math.abs(item.latencySeconds!))
      .reduce(Sum);

    // Construct object for plotting
    return {
      FactString: itemString,
      X: parseInt(itemString!.split(GetOperatorFromLabel(target!))[0]),
      Y: parseInt(
        itemString!.split(GetOperatorFromLabel(target!))[1].split("=")[0]
      ),
      Latency: itemLatency / relevantPerformances.length,
      AverageCorrect: (itemsCorrect / relevantPerformances.length) * 100,
      Correct: itemsCorrect,
      Total: relevantPerformances.length,
    };
  });
}
