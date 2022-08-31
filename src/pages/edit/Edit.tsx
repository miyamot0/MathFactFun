/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Student Edit Page
 */

import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { timestamp } from "../../firebase/config";
import { useFirestore } from "../../firebase/useFirestore";
import { useHistory } from "react-router-dom";
import { useFirebaseDocument } from "../../firebase/useFirebaseDocument";
import {
  Grades,
  Operations,
  BenchmarkSets,
  InterventionApproach,
  ErrorCorrection,
  Contingencies,
} from "../../maths/Facts";
import { FormatDate } from "../../utilities/LabelHelper";

// components
import Select from "react-select";
import { StudentDataInterface } from "../../models/StudentModel";

const EditFormStyle = {
  maxWidth: "600px",
};

interface SelectOption {
  value: string;
  label: string;
}

interface RoutedStudentSet {
  id?: string;
};

export default function Edit() {
  const { id } = useParams<RoutedStudentSet>();
  const { documentError, document } = useFirebaseDocument("students", id);
  const history = useHistory();
  const { updateDocument, response } = useFirestore("students", undefined, undefined);

  // form field values
  const [name, setName] = useState<string>();
  const [details, setDetails] = useState<string>();
  const [dueDate, setDueDate] = useState<string>();
  const [currentGrade, setCurrentGrade] = useState<SelectOption>();
  const [currentTarget, setCurrentTarget] = useState<SelectOption>();
  const [currentApproach, setCurrentApproach] = useState<SelectOption>();
  const [currentBenchmarking, setCurrentBenchmarking] = useState(null);
  const [currentBenchmarkSet, setCurrentBenchmarkSet] =
    useState<SelectOption>();
  const [currentErrorApproach, setCurrentErrorApproach] =
    useState<SelectOption>();
  const [currentSRApproach, setCurrentSRApproach] = useState<SelectOption>();
  const [formError, setFormError] = useState<string>();
  const [didBuild, setDidBuild] = useState(false);
  const [aimLineValue, setAimLineValue] = useState(0);
  const [durationTask, setDurationTask] = useState(-1);

  const CoreOperations = Operations.filter((op) => op.value !== "N/A");

  if (document && !didBuild) {
    setDidBuild(true);
    setName((document as StudentDataInterface).name);
    setDetails((document as StudentDataInterface).details);
    setDueDate(FormatDate((document as StudentDataInterface).dueDate.toDate()));
    setAimLineValue((document as StudentDataInterface).aimLine);
    setDurationTask((document as StudentDataInterface).minForTask);

    let benchmarkingAreas = [];

    Operations.forEach((op) => {
      if (op.value === (document as StudentDataInterface).currentTarget) {
        setCurrentTarget(op);
      }

      if ((document as StudentDataInterface).currentBenchmarking.includes(op.label)) {
        benchmarkingAreas.push(op);
      }
    });

    setCurrentBenchmarking(benchmarkingAreas);

    BenchmarkSets.forEach((set) => {
      if (set.value === (document as StudentDataInterface).problemSet) {
        setCurrentBenchmarkSet(set);
      }
    });

    Grades.forEach((gr) => {
      if (gr.value === (document as StudentDataInterface).currentGrade) {
        setCurrentGrade(gr);
      }
    });

    InterventionApproach.forEach((ia) => {
      if (ia.value === (document as StudentDataInterface).currentApproach) {
        setCurrentApproach(ia);
      }
    });

    ErrorCorrection.forEach((ia) => {
      if (ia.value === (document as StudentDataInterface).currentErrorApproach) {
        setCurrentErrorApproach(ia);
      }
    });

    Contingencies.forEach((ia) => {
      if (ia.value === (document as StudentDataInterface).currentSRApproach) {
        setCurrentSRApproach(ia);
      }
    });
  }

  /** handleEditFormSubmit
   *
   * Submission event for student edit form
   *
   * @param {React.FormEvent<HTMLFormElement>} event Submitted event
   */
  async function handleEditFormSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<any> {
    event.preventDefault();

    setFormError(null);

    if (!currentGrade) {
      setFormError("Please select current grade");
      return;
    }

    if (
      currentApproach.value === undefined ||
      currentApproach.value.trim().length < 1
    ) {
      setFormError("Please select an intervention approach");
      return;
    }

    if (currentBenchmarking === undefined || currentBenchmarking.length < 1) {
      setFormError("Please select benchmarking options");
      return;
    }

    let date = new Date(dueDate);
    date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

    const targetedList =
      currentTarget.value === (document as StudentDataInterface).currentTarget
        ? (document as StudentDataInterface).factsTargeted
        : [];

    const studentObject = {
      name,
      details,
      currentGrade: currentGrade.value,
      currentTarget: currentTarget.value,
      currentApproach: currentApproach.value,
      currentBenchmarking: currentBenchmarking.map(
        (benchmark) => benchmark.label
      ),
      currentErrorApproach: currentErrorApproach.value,
      currentSRApproach: currentSRApproach.value,
      dueDate: timestamp.fromDate(date),
      aimLine: aimLineValue,
      minForTask: durationTask,
      problemSet: currentBenchmarkSet.value,
      factsTargeted: targetedList,
    };

    await updateDocument(id, studentObject);

    if (!response.error) {
      history.push(`/dashboard`);
    }

    return null;
  }

  if (documentError) {
    return <div className="error">{documentError}</div>;
  }

  if (!document) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div style={EditFormStyle}>
      <h2 className="global-page-title">Edit current student</h2>

      <form onSubmit={handleEditFormSubmit}>
        <label>
          <span>Student ID:</span>
          <input
            required
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          ></input>
        </label>
        <label>
          <span>Student Details:</span>
          <textarea
            required
            onChange={(e) => setDetails(e.target.value)}
            value={details}
          ></textarea>
        </label>
        <label>
          <span>Next Benchmark Date:</span>
          <input
            required
            type="date"
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
          ></input>
        </label>
        <label>
          <span>Current Grade</span>
          <Select
            options={Grades}
            onChange={(option) => setCurrentGrade(option)}
            value={currentGrade}
          />
        </label>
        <label>
          <span>Target For Benchmarking</span>
          <Select
            options={CoreOperations}
            onChange={(option) => setCurrentBenchmarking(option)}
            value={currentBenchmarking}
            isMulti={true}
          />
        </label>
        <label>
          <span>Benchmark Set</span>
          <Select
            options={BenchmarkSets}
            onChange={(option) => setCurrentBenchmarkSet(option)}
            value={currentBenchmarkSet}
          />
        </label>
        <label>
          <span>Target For Intervention</span>
          <Select
            options={Operations}
            onChange={(option) => setCurrentTarget(option)}
            value={currentTarget}
          />
        </label>
        <label>
          <span>Intervention Approach</span>
          <Select
            options={InterventionApproach}
            onChange={(option) => setCurrentApproach(option)}
            value={currentApproach}
          />
        </label>
        <label>
          <span>Error Correction Procedures</span>
          <Select
            options={ErrorCorrection}
            onChange={(option) => setCurrentErrorApproach(option)}
            value={currentErrorApproach}
          />
        </label>
        <label>
          <span>Reinforcement Procedures</span>
          <Select
            options={Contingencies}
            onChange={(option) => setCurrentSRApproach(option)}
            value={currentSRApproach}
          />
        </label>
        <label>
          <span>Target Aim Line</span>
          <input
            type="number"
            min="0"
            max="80"
            value={aimLineValue}
            onChange={(option) =>
              setAimLineValue(parseInt(option.target.value))
            }
          />
        </label>
        <label>
          <span>Duration for Task (Minutes; Explicit Timing Only)</span>
          <input
            type="number"
            min="1"
            max="10"
            value={durationTask}
            onChange={(option) =>
              setDurationTask(parseInt(option.target.value))
            }
          />
        </label>

        <button className="global-btn ">Edit Student</button>
        {formError && <p className="error">{formError}</p>}
      </form>
      <br></br>
    </div>
  );
}
