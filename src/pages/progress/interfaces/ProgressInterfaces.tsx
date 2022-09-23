/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { FactDataInterface } from "../../setcreator/interfaces/SetCreatorInterfaces";

export interface RoutedStudentProgressSet {
  id: string;
  target: string;
  method: string;
  aim: string;
}

export interface RemappedPerformances {
  Items: FactDataInterface[];
  Date: Date;
  ShortDate: string;
  Errors: number;
  DigitsCorrect: number;
  DigitsCorrectInitial: number;
  DigitsTotal: number;
  SessionDuration: number;
  Method: string | undefined;
}

export interface DailyPerformanceMetrics {
  Date: string;
  DCPM: number;
  Accuracy: number;
}

export interface ItemPerformanceMetrics {
  FactString: string | undefined;
  X: number;
  Y: number;
  Latency: number;
  AverageCorrect: number;
  Correct: number;
  Total: number;
}

export interface OverallCalculationObject {
  MappedDocument: RemappedPerformances[];
  AggregatePerformancesDaily: DailyPerformanceMetrics[];
  DateArray: number[];
  MaxDate: Date;
  MinDate: Date;
  MaxYAxis: number;
}

export interface ItemLevelCalculationsObject {
  ItemSummaries: FactDataInterface[][];
  FlatItemSummaries: FactDataInterface[] | null;
  UniqueMathFacts: string[] | null;
  UniqueQuants: ItemPerformanceMetrics[] | null;
}

export interface ChartInformation {
  chart: any;
  title: any;
  series: any;
  xAxis: any;
  yAxis: any;
  tooltip: any;
  annotations: any;
}
