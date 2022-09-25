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
import BenchmarkItemStatusView from "./views/BenchmarkItemStatusView";

export default function BenchmarkList({
  student,
}: BenchmarkInterface): JSX.Element {
  if (student === null || student.currentBenchmarking.length === 0) {
    return <p className="benchmark-no-targets">No benchmarking targets</p>;
  } else {
    return (
      <div className="benchmark-list" key={student.id}>
        {student.currentBenchmarking.map((benchmark: string) => {
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
                <b>Benchmark Period:</b>{" "}
                {student.dueDate.toDate().toDateString()}
              </p>
              <BenchmarkItemStatusView
                benchmarkCompleted={benchmarkCompleted}
              />
            </div>
          );
        })}
      </div>
    );
  }
}
