/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import { Link } from "react-router-dom";
import PlayIcon from "../../../../assets/play.svg"
import { formatDate } from "../../../../utilities/LabelHelper";
import { StudentDataInterface } from "../../../student/interfaces/StudentInterfaces";
import { checkIfDateCurrent, generateRouteBaseOnStrategy, InterventionRoutingLink, warnNoProblemsAssigned } from "../helpers/DashboardSubcomponentHelpers";

export interface PracticeStatusView {
  student: StudentDataInterface;
}

/** PracticeStatusView
 *
 * Wrap info in a view
 *
 * @param {StudentDataInterface} student document info
 * @returns {Link}
 */
export default function PracticeStatusView({
  student,
}: PracticeStatusView): JSX.Element {
  if (student.currentApproach === "CoverCopyCompare" && student.tutorialCCC === false) {
    return (
      <div className="horizontal-practice-list-guide"
        style={{
          display: 'inline-block',
          width: '100%',
        }}>
        <p style={{ display: 'inline-block' }}>
          <p className="p-needs-training">
            <span className="needs-training"> </span>
            Complete Cover, Copy, Compare Tutorial
          </p>
        </p>

        <Link
          to={`/tutorial/${student.currentApproach}/${student.id}`}
          key={student.id}
          style={{ display: 'inline-block', float: 'right' }}
          className="student-list-settings-link"
        >
          <img
            src={PlayIcon}
            alt="Settings link"></img>
        </Link>
      </div>
    )
  } else if (student.currentApproach === "ExplicitTiming" && student.tutorialET === false) {
    return (
      <div className="horizontal-practice-list-guide"
        style={{
          display: 'inline-block',
          width: '100%',
        }}>
        <p style={{ display: 'inline-block' }}>
          <p className="p-needs-training">
            <span className="needs-training"> </span>
            Complete Explicit Timing Tutorial
          </p>
        </p>

        <Link
          to={`/tutorial/${student.currentApproach}/${student.id}`}
          key={student.id}
          style={{ display: 'inline-block', float: 'right' }}
          className="student-list-settings-link"
        >
          <img
            src={PlayIcon}
            alt="Settings link"></img>
        </Link>
      </div>
    )
  } else {
    const checkForProblems = student.factsTargeted && student.factsTargeted.length > 0 ?
      <Link
        to={generateRouteBaseOnStrategy(
          student.currentApproach,
          student.currentTarget,
          student.id
        )}
        key={student.id}
        style={{ display: 'inline-block', float: 'right' }}
        className="student-list-settings-link"
      >
        <img
          src={PlayIcon}
          alt="Settings link"></img>
      </Link> :
      <Link
        to={"#!"}
        key={student.id}
        style={{ display: 'inline-block', float: 'right' }}
        className="student-list-settings-link"
        onClick={() => {
          warnNoProblemsAssigned();
        }}
      >
        <img
          src={PlayIcon}
          alt="Settings link"></img>
      </Link>;

    return (
      <div className="horizontal-practice-list-guide"
        style={{
          display: 'inline-block',
          width: '100%',
        }}>
        <p style={{ display: 'inline-block' }}>
          <p>
            {checkIfDateCurrent(student.lastActivity) ? (
              <span className="practiced-today"> </span>
            ) : (
              <span className="needs-practice"> </span>
            )}{" "}
            Last Practice:{" "}
            {formatDate({ date: student.lastActivity.toDate(), format: "display" })}
          </p>
        </p>

        {checkForProblems}
      </div>
    );
  }
}
