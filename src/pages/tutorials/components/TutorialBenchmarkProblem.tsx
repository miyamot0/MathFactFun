/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import TutorialSimpleProblemFrame from "../views/TutorialSimpleProblemFrame";

export interface TutorialBenchmarkProblem {
  problemStem: string;
  coverProblemSpace: boolean;
  entryString: string;
}

export default function TutorialBenchmarkProblem({
  problemStem,
  coverProblemSpace,
  entryString,
}: TutorialBenchmarkProblem): JSX.Element {
  return (
    <div className="box2-tutorial">
      <TutorialSimpleProblemFrame
        problemStem={problemStem}
        coverProblemSpace={coverProblemSpace}
        entryString={entryString}
      />
    </div>
  );
}
