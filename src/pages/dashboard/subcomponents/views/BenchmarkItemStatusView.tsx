/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import { generatedStyledFeedback } from "../helpers/DashboardSubcomponentHelpers";

/** BenchmarkItemStatusView
 *
 * @param {StudentDataInterface} student document info
 * @returns {Link}
 */
export default function BenchmarkItemStatusView({
  benchmarkCompleted,
}: {
  benchmarkCompleted: boolean;
}): JSX.Element {
  return (
    <p>
      <b>Status:</b> {generatedStyledFeedback(benchmarkCompleted)}
    </p>
  );
}
