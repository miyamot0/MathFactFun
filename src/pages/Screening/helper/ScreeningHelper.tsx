import moment from "moment";
import { OnlyUnique, Sum } from "../../../utilities/LabelHelper";
import { PerformanceDataInterface } from "../../intervention/interfaces/InterventionInterfaces";
import {
  DailyPerformanceMetrics,
  RemappedPerformances,
} from "../../progress/interfaces/ProgressInterfaces";
import { FactDataInterface } from "../../setcreator/interfaces/SetCreatorInterfaces";

/** reducerPerOperation
 *
 * Reduce down into area-specific outcomes
 *
 * @param {PerformanceDataInterface[] | undefined} doc
 * @returns
 */
export function reducerPerOperation(
  doc: PerformanceDataInterface[]
): DailyPerformanceMetrics[] {
  // Reduce records down to key metrics and corresponding dates
  const performanceMetricsRemapped: RemappedPerformances[] = doc.map((doc) => {
    return {
      Items: doc.entries as FactDataInterface[],
      Date: new Date(doc.dateTimeStart),
      ShortDate: new Date(doc.dateTimeStart).toLocaleDateString("en-US"),
      Errors: doc.errCount,
      DigitsCorrect: doc.correctDigits,
      DigitsCorrectInitial: doc.nCorrectInitial,
      DigitsTotal: doc.totalDigits,
      SessionDuration: doc.sessionDuration,
      Method: doc.method,
    } as RemappedPerformances;
  });

  const performancesReducedToDays: DailyPerformanceMetrics[] =
    performanceMetricsRemapped
      .map((remapped) => remapped.ShortDate)
      .filter(OnlyUnique)
      .sort()
      .map((remappedShortDate) => {
        // Pull in relevant performance metrics by date
        const relevantData = performanceMetricsRemapped.filter(
          (obj) => obj.ShortDate === remappedShortDate
        );

        // Aggregate numbers per the date
        const totalDigitsCorr = relevantData
          .map((obj) => obj.DigitsCorrect)
          .reduce(Sum);
        const totalDigits = relevantData
          .map((obj) => obj.DigitsTotal)
          .reduce(Sum);
        const totalTime =
          relevantData.map((obj) => obj.SessionDuration).reduce(Sum) / 60.0;

        // Generate summary, given the date
        return {
          Date: remappedShortDate,
          DateObject: relevantData[0].Date,
          DCPM: totalDigitsCorr / totalTime,
          Accuracy: (totalDigitsCorr / totalDigits) * 100,
        } as DailyPerformanceMetrics;
      })
      .sort(
        (a: DailyPerformanceMetrics, b: DailyPerformanceMetrics) =>
          a.DateObject.valueOf() - b.DateObject.valueOf()
      );

  return performancesReducedToDays;
}

/** remapReducedEntriesToPoint
 *
 * @param metric
 * @returns
 */
export function remapReducedEntriesToPoint(metric: DailyPerformanceMetrics[]) {
  return metric.map((obj: DailyPerformanceMetrics) => {
    return {
      x: obj.DateObject.getTime(),
      y: Math.round(obj.DCPM * 100) / 100,
    };
  });
}
