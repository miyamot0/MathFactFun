/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Benchmark list widget
 */

import React from "react";

import {
  checkIfCompletedBenchmark,
  generatedStyledFeedback,
  generateWrapperBenchmarkList,
} from "./helpers/DashboardSubcomponentHelpers";
import { BenchmarkInterface } from "../types/DashboardTypes";

import "./styles/BenchmarkList.css";

export default function BenchmarkList({
  student,
}: BenchmarkInterface): JSX.Element {
  const errMessage =
    student.currentBenchmarking.length === 0 ? (
      <p>No benchmarking targets</p>
    ) : (
      <></>
    );

  const outputDisplay = student ? (
    <div className="benchmark-list" key={student.id}>
      {errMessage}

      {student.currentBenchmarking.map((benchmark: any) => {
        const benchmarkCompleted = checkIfCompletedBenchmark(
          student,
          benchmark
        );

        return (
          <div
            className="benchmark-list-card"
            style={{ opacity: benchmarkCompleted ? 0.5 : 1 }}
            key={`${student.id}-${benchmark}`}
          >
            {generateWrapperBenchmarkList(
              student,
              benchmark,
              benchmarkCompleted
            )}
            <hr />
            <p>
              <b>Due Date:</b> {student.dueDate.toDate().toDateString()}
            </p>
            <p>
              <b>Status:</b> {generatedStyledFeedback(benchmarkCompleted)}
            </p>
            <br></br>
          </div>
        );
      })}
    </div>
  ) : (
    <></>
  );

  return (
    <>
      {errMessage}
      {outputDisplay}
    </>
  );
}
