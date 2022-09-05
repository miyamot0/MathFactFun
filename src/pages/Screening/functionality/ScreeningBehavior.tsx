import moment from "moment";
import {
  FactDataInterface,
  PerformanceDataInterface,
} from "../../../firebase/types/GeneralTypes";
import { OnlyUnique, Sum } from "../../../utilities/LabelHelper";
import { DailyPerformanceMetrics } from "../../progress/types/ProgressTypes";

/** reducerPerOperation
 *
 * Reduce down into area-specific outcomes
 *
 * @param {PerformanceDataInterface[] | undefined} doc
 * @returns
 */
export function reducerPerOperation(
  doc: PerformanceDataInterface[] | undefined
): DailyPerformanceMetrics[] {
  const mappedDocument = doc!.map((doc) => {
    return {
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

  return mappedDocument
    .map((obj) => obj.ShortDate)
    .filter(OnlyUnique)
    .sort()
    .map((date) => {
      // Pull in relevant content by date
      let relevantData = mappedDocument.filter((obj) => obj.ShortDate === date);

      let totalDigitsCorr = relevantData
        .map((obj) => obj.DigitsCorrect)
        .reduce(Sum);
      let totalDigits = relevantData.map((obj) => obj.DigitsTotal).reduce(Sum);
      let totalTime =
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
