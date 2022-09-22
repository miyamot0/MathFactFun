/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import { useState } from "react";

import { StudentFilterInterface } from "../types/DashboardTypes";
import { handleFilterEvent } from "./helpers/StudentFilterHelpers";

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

  return (
    <div className="student-filter">
      <nav>
        <p>Filter Students by: </p>
        {GradeFilterList.map((f) => (
          <button
            key={f}
            data-testid={`student-filter-${f}`}
            className={currentFilter === f ? "active student-filter-btn" : "student-filter-btn"}
            onClick={() => handleFilterEvent(f, setCurrentFilter, changeFilter)}
          >
            {f}
          </button>
        ))}
      </nav>
    </div>
  );
}
