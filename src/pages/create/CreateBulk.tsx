/**
 * Create multiple new student object
 */

import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Select from "react-select";
import { timestamp } from "../../firebase/config";
import { useFirestore } from "../../firebase/useFirestore";
import { useHistory } from "react-router-dom";
import {
  Grades,
  Operations,
  InterventionApproach,
  ErrorCorrection,
  Contingencies,
  ErrorHandling,
} from "../../maths/Facts";

const CreateFormStyle = {
  maxWidth: "600px",
};

// Page to create new students
export default function CreateBulk() {
  const history = useHistory();
  const { id } = useParams();
  const { addDocument, response } = useFirestore("students");

  // field values
  const [studentIdBank, setStudentIdBank] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [currentGrade, setCurrentGrade] = useState({ value: "", label: "" });
  const [currentApproach, setCurrentApproach] = useState({
    value: "N/A",
    label: "No Current Intervention",
  });
  const [currentBenchmarking, setCurrentBenchmarking] = useState(null);
  const [currentTarget, setCurrentTarget] = useState({
    value: "N/A",
    label: "No Current Target",
  });
  const [currentErrorApproach, setCurrentErrorApproach] = useState({
    value: ErrorHandling.EveryTime,
    label: "Give feedback every time",
  });
  const [currentSRApproach, setCurrentSRApproach] = useState({
    value: "None",
    label: "No programmed contingencies",
  });

  const [formError, setFormError] = useState(null);

  const CoreOperations = Operations.filter((op) => op.value !== "N/A");

  /** handleCreateStudentSubmit
   *
   * Event for creating a student
   *
   * @param {React.FormEvent<HTMLFormElement>} event
   */
  async function handleCreateStudentSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    setFormError(null);

    if (!currentGrade) {
      setFormError("Please select current grade");
      return;
    }

    if (currentBenchmarking === undefined || currentBenchmarking.length < 1) {
      setFormError("Please select benchmarking options");
      return;
    }

    if (
      currentTarget.value === undefined ||
      currentTarget.value.trim().length < 1
    ) {
      setFormError("Please select a target");
      return;
    }

    if (
      currentApproach.value === undefined ||
      currentApproach.value.trim().length < 1
    ) {
      setFormError("Please select an intervention approach");
      return;
    }

    if (
      currentErrorApproach.value === undefined ||
      currentErrorApproach.value.trim().length < 1
    ) {
      setFormError("Please select an error correct approach");
      return;
    }

    if (
      currentSRApproach.value === undefined ||
      currentSRApproach.value.trim().length < 1
    ) {
      setFormError("Please select a reinforcement strategy");
      return;
    }

    const laggedDate = new Date();
    laggedDate.setDate(laggedDate.getDate() - 1);

    const comments = [];
    const factsTargeted = [];
    const factsMastered = [];
    const factsSkipped = [];
    const aimLine = 0;
    const minForTask = 2;

    const arrayTextAreaLines = studentIdBank.split("\n");

    for (let i = 0; i < arrayTextAreaLines.length; i++) {
      const currentStudentID = arrayTextAreaLines[i].trim();

      if (currentStudentID.length < 1) continue;

      const studentObject = {
        name: currentStudentID,
        details: "",
        currentGrade: currentGrade.value,
        currentTarget: currentTarget.value,
        currentApproach: currentApproach.value,
        currentErrorApproach: currentErrorApproach.value,
        currentSRApproach: currentSRApproach.value,
        currentBenchmarking: currentBenchmarking.map(
          (benchmark) => benchmark.label
        ),
        completedBenchmark: [],
        creator: id,
        dueDate: timestamp.fromDate(new Date(dueDate)),
        lastActivity: timestamp.fromDate(laggedDate),
        comments,
        factsTargeted,
        factsMastered,
        factsSkipped,
        aimLine,
        minForTask,
        problemSet: "A",
      };

      await addDocument(studentObject);
    }

    if (!response.error) {
      history.push(`/dashboard/true`);
    }
  }

  return (
    <div style={CreateFormStyle}>
      <h2 className="global-page-title">Add new students to class/group</h2>

      <form onSubmit={handleCreateStudentSubmit}>
        <label>
          <span>Student IDs (one on each line):</span>
          <textarea
            required
            onChange={(e) => setStudentIdBank(e.target.value)}
            value={studentIdBank}
          ></textarea>
        </label>
        <label>
          <span>Next Benchmark Date for Student(s):</span>
          <input
            required
            type="date"
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
          ></input>
        </label>
        <label>
          <span>Current Grade for Student(s)</span>
          <Select
            options={Grades}
            onChange={(option) => setCurrentGrade(option)}
          />
        </label>
        <label>
          <span>Target(s) For Benchmarking</span>
          <Select
            options={CoreOperations}
            onChange={(option) => setCurrentBenchmarking(option)}
            value={currentBenchmarking}
            isMulti={true}
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

        <button className="global-btn global-btn-light-red">
          Create New Student(s)
        </button>
        {formError && <p className="error">{formError}</p>}
      </form>
      <br></br>
    </div>
  );
}
