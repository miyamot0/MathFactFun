/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Sidebar widget
 */

import React from "react";
import firebase from "firebase/app";

import { Link } from "react-router-dom";
import { GetApproachStringFromLabel } from "../utilities/LabelHelper";

import "./PracticeList.css";
import { StudentDataInterface } from "../firebase/types/GeneralTypes";

interface PracticeListInterface {
  students: StudentDataInterface[];
}

const anchorStyle = {
  marginTop: "5px",
};

/** generateRouteBaseOnStrategy
 *
 * Generate a link to practice screen
 *
 * @param {string} strategy Intervention type
 * @param {string} target Intervention target
 * @param {string} id Personal id
 * @returns {string} path
 */
function generateRouteBaseOnStrategy(
  strategy: string | undefined,
  target: string | undefined,
  id: string | undefined | null
): string {
  if (strategy === undefined || target === undefined || id === undefined) {
    return "#!";
  }

  return `/${strategy}/${target}/${id}`;
}

/** checkIfDateCurrent
 *
 * Check to see if date within a days difference
 *
 * @param {firebase.firestore.Timestamp} date Stored date, to compare with current
 * @returns {Bool}
 */
function checkIfDateCurrent(
  date: firebase.firestore.Timestamp | null
): boolean {
  if (date === null) {
    return false;
  }

  let dateObj = date.toDate();
  dateObj.setHours(0, 0, 0, 0);

  let dateNow = new Date();
  dateNow.setHours(0, 0, 0, 0);

  return dateNow.getTime() <= dateObj.getTime() ? true : false;
}

/** dynamicallyGenerateLink
 *
 * Build out a widget based on whether student has programming
 *
 * @param {StudentDataInterface} student student instance
 * @returns {JSX.Element}
 */
function dynamicallyGenerateLink(student: StudentDataInterface): JSX.Element {
  if (student.factsTargeted.length < 1) {
    return (
      <a
        href="#!"
        key={student.id}
        onClick={() =>
          alert("No math problems have been added to the targeted list yet.")
        }
      >
        {student.name} ({student.currentGrade})
      </a>
    );
  }

  return (
    <Link
      to={generateRouteBaseOnStrategy(
        student.currentApproach,
        student.currentTarget,
        student.id
      )}
      key={student.id}
    >
      {student.name} ({student.currentGrade})
    </Link>
  );
}

export default function PracticeList({
  students,
}: PracticeListInterface): JSX.Element {
  return students ? (
    <div className="practice-list">
      {students.length === 0 && (
        <p>No students receiving intervention in this category.</p>
      )}
      {students.map((student) => (
        <div className="practice-list-card" key={student.id}>
          {dynamicallyGenerateLink(student)}
          <hr />
          <p style={anchorStyle}>
            <b>Approach:</b>{" "}
            {GetApproachStringFromLabel(student.currentApproach)}
          </p>
          <p style={anchorStyle}>
            <b>Target:</b> {student.currentTarget} (
            {student.factsTargeted.length} in Set)
          </p>
          <p style={anchorStyle}>
            <b>Items in Set:</b> {student.factsTargeted.length}
          </p>
          <br></br>
          <p>
            {checkIfDateCurrent(student.lastActivity) ? (
              <span className="practiced-today"> </span>
            ) : (
              <span className="needs-practice"> </span>
            )}{" "}
            Last Practice: {student.lastActivity!.toDate().toDateString()}
          </p>
        </div>
      ))}
    </div>
  ) : (
    <div></div>
  );
}
