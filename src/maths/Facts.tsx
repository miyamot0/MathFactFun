/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// eslint-disable-next-line
export const Grades = [
  { value: "K", label: "Kindergarten" },
  { value: "1st", label: "First Grade" },
  { value: "2nd", label: "Second Grade" },
  { value: "3rd", label: "Third Grade" },
  { value: "4th", label: "Fourth Grade" },
  { value: "5th", label: "Fifth Grade" },
  { value: "6th", label: "Sixth Grade" },
];

// eslint-disable-next-line
export const Operations = [
  { value: "NA", label: "No Current Target" },
  { value: "Addition", label: "Addition-Sums to 18" },
  { value: "Subtraction", label: "Subtraction-Lessing From 18" },
  { value: "Multiplication", label: "Multiplication-Single Digit" },
  { value: "Division", label: "Division-Single Digit" },
];

// eslint-disable-next-line
export const BenchmarkSets = [
  { value: "A", label: "A" },
  { value: "B", label: "B" },
  { value: "C", label: "C" },
];

// eslint-disable-next-line
export const InterventionApproach = [
  { value: "NA", label: "No Current Intervention" },
  { value: "CoverCopyCompare", label: "Cover Copy Compare" },
  //{ value: "Cloze", label: "Cloze" },
  { value: "TapedProblems", label: "Taped Problems" },
  { value: "ExplicitTiming", label: "Explicit Timing" },
];

export enum ErrorHandling {
  EveryTime = "Everytime",
  Never = "Never",
  ThrowError = "ThrowError",
}

// eslint-disable-next-line
export const ErrorCorrection = [
  { value: ErrorHandling.EveryTime, label: "Give feedback every time" },
  { value: ErrorHandling.Never, label: "Do not give error feedback" },
];

// eslint-disable-next-line
export const Contingencies = [
  { value: "None", label: "No programmed contingencies" },
];

// eslint-disable-next-line
export const RelevantKeys = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "+",
  "-",
  "x",
  "*",
  "/",
  "=",
  "Backspace",
  "Delete",
  "Enter",
  " ",
];

// eslint-disable-next-line
export const InterventionFormat = {
  CoverCopyCompare: "CCC",
  Cloze: "Cloze",
  ExplicitTiming: "ExplicitTiming",
  TapedProblems: "TapedProblems",
};
