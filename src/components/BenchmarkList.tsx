/**
 * Benchmark list widget
 */

import React from "react";

import { Link } from "react-router-dom";
import { StudentDataInterface } from "../models/StudentModel";

import "./BenchmarkList.css";

interface BenchmarkInterface {
  student: StudentDataInterface;
}

/** checkIfCompletedBenchmark
 *
 * Check to see if date within a days difference
 *
 * @param {StudentDataInterface} student student record
 * @param {string} benchmark benchmark
 * @returns {Bool}
 */
function checkIfCompletedBenchmark(
  student: StudentDataInterface,
  benchmark: string
) {
  if (student.completedBenchmark.length === 0) {
    return false;
  }

  const tag = `${benchmark} ${student.dueDate.toDate().toDateString()}`;

  if (student.completedBenchmark.includes(tag)) {
    return true;
  }

  return false;
}

/** generatedStyledFeedback
 *
 * Wrap info in a link, if benchmark is due
 *
 * @param {Bool} isCompleted if probe completed
 * @returns {Span}
 */
function generatedStyledFeedback(isCompleted): JSX.Element {
  return isCompleted ? (
    <span style={{ color: "green" }}> Completed</span>
  ) : (
    <span style={{ color: "red" }}> Incomplete</span>
  );
}

/** generateWrapper
 *
 * Wrap info in a link, if benchmark is due
 *
 * @param {Student} student document info
 * @param {string} benchmark benchmark string
 * @param {boolean} isCompleted boolean flag
 * @returns {Link}
 */
function generateWrapper(student, benchmark, isCompleted): JSX.Element {
  if (isCompleted)
    return <p className="benchmark-list-card-title">{benchmark}</p>;

  return (
    <Link to={`/benchmark/${student.id}/${benchmark}`} key={student.id}>
      {benchmark}
    </Link>
  );
}

export default function BenchmarkList({ student }: BenchmarkInterface) {
  return student ? (
    <div className="benchmark-list" key={student.id}>
      {student.currentBenchmarking.length === 0 && (
        <p>No benchmarking targets</p>
      )}
      {student.currentBenchmarking.map((benchmark) => {
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
            {generateWrapper(student, benchmark, benchmarkCompleted)}
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
    <div></div>
  );
}