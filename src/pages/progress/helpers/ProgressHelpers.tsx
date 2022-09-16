/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import moment from "moment";
import {
  GetOperatorFromLabel,
  OnlyUnique,
  Sum,
} from "../../../utilities/LabelHelper";
import { PerformanceDataInterface } from "../../intervention/types/InterventionTypes";
import { FactDataInterface } from "../../setcreator/interfaces/SetCreatorInterfaces";
import {
  DailyPerformanceMetrics,
  ItemLevelCalculationsObject,
  ItemPerformanceMetrics,
  OverallCalculationObject,
  RemappedPerformances,
} from "../interfaces/ProgressInterfaces";

/** modifyDate
 *
 * Modify the date to standardize for days
 *
 * @param {Date} newDate Raw date object
 * @returns {Date} Amended date object
 */
export function modifyDate(newDate: Date): Date {
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
      Date: new Date(doc.dateTimeStart),
      ShortDate: new Date(doc.dateTimeStart).toLocaleDateString("en-US"),
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
 * @param {string[]} uniqueMathFacts
 * @param {FactDataInterface[]} flatItemSummaries
 * @param {string} target
 * @returns
 */
export function aggregateItemLevelPerformances(
  uniqueMathFacts: string[],
  flatItemSummaries: FactDataInterface[],
  target: string
): ItemPerformanceMetrics[] {
  return uniqueMathFacts.map((itemString) => {
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
      .map((item) => Math.abs(item.latencySeconds))
      .reduce(Sum);

    // Construct object for plotting
    return {
      FactString: itemString,
      X: parseInt(itemString.split(GetOperatorFromLabel(target))[0]),
      Y: parseInt(
        itemString.split(GetOperatorFromLabel(target))[1].split("=")[0]
      ),
      Latency: itemLatency / relevantPerformances.length,
      AverageCorrect: (itemsCorrect / relevantPerformances.length) * 100,
      Correct: itemsCorrect,
      Total: relevantPerformances.length,
    };
  });
}

/** prepareOverallCalculations
 * 
 * @param documents 
 * @param aim 
 * @returns 
 */
export function prepareOverallCalculations(documents: PerformanceDataInterface[], aim: string) {

  // Generate object from document collection
  const mappedDocument = remapPerformances(documents);

  // Bring together all performances, by day
  const aggregatePerformancesDaily = aggregatePerformances(mappedDocument);

  // Extract all dates
  const dateArr = mappedDocument.map((d) => d.Date.getTime());
  const maxDate = modifyDate(new Date(Math.max.apply(null, dateArr)));
  const minDate = modifyDate(new Date(Math.min.apply(null, dateArr)));

  // Extract max for y-axis
  let maxYAxis = Math.ceil(
    Math.max.apply(
      null,
      aggregatePerformancesDaily.map((obj) => obj.DCPM)
    )
  );

  // Extend out, if aim line exceeds current max
  maxYAxis = maxYAxis < parseInt(aim) ? parseInt(aim) + 1 : maxYAxis + 1;

  return {
    MappedDocument: mappedDocument,
    AggregatePerformancesDaily: aggregatePerformancesDaily,
    DateArray: dateArr,
    MaxDate: maxDate,
    MinDate: minDate,
    MaxYAxis: maxYAxis
  } as OverallCalculationObject
}

/** getPrimaryProgressChartData
 * 
 * @param overallCalculations 
 * @param aim 
 * @returns 
 */
export function getPrimaryProgressChartData(overallCalculations: OverallCalculationObject, aim: string) {
  return {
    chart: {
      height: "600px",
    },
    title: {
      text: null,
    },
    series: {
      name: "Digits Correct Per Minute",
      data: overallCalculations.AggregatePerformancesDaily.map((obj) => {
        return {
          x: moment(obj.Date).toDate().getTime(),
          y: Math.round(obj.DCPM * 100) / 100,
        };
      }),
      type: "line",
    },
    xAxis: {
      type: "datetime",
      minTickInterval: 24 * 3600 * 1000,
    },
    yAxis: {
      title: {
        text: "Digits Correct/Minute (DCPM)",
      },
      min: 0,
      max: overallCalculations.MaxYAxis,
    },
    annotations: [
      {
        draggable: "",
        shapeOptions: {
          type: "path",
          dashStyle: "Solid",
          strokeWidth: 1,
          stroke: "red",
          fill: "red",
        },
        shapes: [
          {
            type: "path",
            points: [
              {
                x: overallCalculations.MinDate.getTime(),
                y: parseInt(aim),
                xAxis: 0,
                yAxis: 0,
              },
              {
                x: overallCalculations.MaxDate.getTime(),
                y: parseInt(aim),
                xAxis: 0,
                yAxis: 0,
              },
            ],
          },
        ],
      },
    ],
  }
}

/** prepareItemLevelCalculations
 * 
 * @param overallCalculations 
 * @param target 
 * @returns 
 */
export function prepareItemLevelCalculations(overallCalculations: OverallCalculationObject, target: string) {
  const itemSummaries = overallCalculations.MappedDocument.map(({ Items }) => Items);

  const flatItemSummaries: FactDataInterface[] = itemSummaries.reduce(
    (accumulator, value) => accumulator.concat(value)
  );

  const uniqueMathFacts = flatItemSummaries
    .map((obj) => obj.factString)
    .filter(OnlyUnique)
    .sort();

  const uniqueQuants = aggregateItemLevelPerformances(
    uniqueMathFacts,
    flatItemSummaries,
    target
  );

  return {
    ItemSummaries: itemSummaries,
    FlatItemSummaries: flatItemSummaries,
    UniqueMathFacts: uniqueMathFacts,
    UniqueQuants: uniqueQuants
  } as ItemLevelCalculationsObject;
}

/** getSecondaryProgressChartData
 * 
 * @param itemLevelCalculations 
 * @param target 
 * @returns 
 */
export function getSecondaryProgressChartData(itemLevelCalculations: ItemLevelCalculationsObject, target: string) {
  return {
    title: {
      text: null,
    },
    chart: {
      type: "scatter",
      zoomType: "xy",
      height: "600px",
    },
    tooltip: {
      formatter: function (this: Highcharts.Point): string {
        return (
          "Problem: " +
          this.x +
          GetOperatorFromLabel(target) +
          this.y +
          "</b>"
        );
      },
    },
    series: {
      name: "Item Metrics",
      data: itemLevelCalculations.UniqueQuants.map((item) => {
        return {
          x: item.X,
          y: item.Y,
          marker: {
            symbol: getMappedMarker(item.Latency),
            fillColor: getMappedColor(item.AverageCorrect),
            radius: item.Total > 5 ? 5 + 1 : item.Total + 1,
          },
        };
      }),
    },
    yAxis: {
      title: {
        text: "Magnitude Change",
      },
      min: 0,
      gridLineWidth: 1,
    },
    xAxis: {
      title: {
        text: "Base Value",
      },
      min: 0,
      gridLineWidth: 1,
    },
  };
}