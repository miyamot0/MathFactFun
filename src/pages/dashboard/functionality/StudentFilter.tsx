/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import { useState } from "react";

//import "./styles/StudentFilter.css"
import { StudentFilterInterface } from "../types/DashboardTypes";

export const GradeFilterList = [
  "All",
  "Mine",
  "K",
  "1st",
  "2nd",
  "3rd",
  "4th",
  "5th",
  "6th",
];

export default function StudentFilter({
  changeFilter,
}: StudentFilterInterface) {
  const [currentFilter, setCurrentFilter] = useState("Mine");

  /** handleFilterEvent
   *
   * Update interface with filter
   *
   * @param {String} newFilter Filter criteria
   */
  function handleFilterEvent(newFilter: string): void {
    setCurrentFilter(newFilter);
    changeFilter(newFilter);
  }

  return (
    <div className="student-filter">
      <nav>
        <p>Filter Students by: </p>
        {GradeFilterList.map((f) => (
          <button
            key={f}
            data-testid={`student-filter-${f}`}
            className={currentFilter === f ? "active" : ""}
            onClick={() => handleFilterEvent(f)}
          >
            {f}
          </button>
        ))}
      </nav>
    </div>
  );
}
