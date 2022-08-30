/**
 * Create new student object
 */

import React from "react";
import { useState } from "react";
import Select from "react-select";

import { timestamp } from "../../firebase/config";
import { useAuthorizationContext } from "../../context/useAuthorizationContext";
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
import { StudentModel } from "../../models/StudentModel";

const CreateFormStyle = {
  maxWidth: "600px",
};

// Page to create new students
export default function Create() {
  const history = useHistory();
  const { addDocument, response } = useFirestore("students");
  const { user } = useAuthorizationContext();

  // field values
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
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

    let studentInformation = StudentModel();
    studentInformation.data.name = name;
    studentInformation.data.details = details;
    studentInformation.data.currentGrade = currentGrade.value;
    studentInformation.data.currentTarget = currentTarget.value;
    studentInformation.data.currentApproach = currentApproach.value;
    studentInformation.data.currentErrorApproach = currentErrorApproach.value;
    studentInformation.data.currentSRApproach = currentSRApproach.value;
    studentInformation.data.currentBenchmarking = currentBenchmarking.map(
      (benchmark) => benchmark.label
    );
    studentInformation.data.creator = user.uid;
    studentInformation.data.dueDate = timestamp.fromDate(new Date(dueDate));
    studentInformation.data.lastActivity = timestamp.fromDate(laggedDate);
    studentInformation.data.createdAt = timestamp.fromDate(new Date());

    // Sanity check for all required components
    if (!studentInformation.CheckObject()) {
      alert("Firebase data was not well-formed");
      return;
    }

    await addDocument(studentInformation.SubmitObject());

    if (!response.error) {
      history.push(`/dashboard`);
    }
  }

  return (
    <div style={CreateFormStyle}>
      <h2 className="global-page-title">Add a new student</h2>

      <form onSubmit={handleCreateStudentSubmit}>
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
          Create New Student
        </button>
        {formError && <p className="error">{formError}</p>}
      </form>
      <br></br>
    </div>
  );
}
