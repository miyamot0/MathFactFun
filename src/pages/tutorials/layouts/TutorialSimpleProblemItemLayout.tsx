/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { InitialTutorialBenchmarkState } from '../TutorialBenchmark';
import TutorialSimpleProblemFrame from '../views/TutorialSimpleProblemFrame';

export interface TutorialSimpleProblemItemLayout {
  state: InitialTutorialBenchmarkState;
  numberBoxReference1: React.RefObject<HTMLDivElement>;
  numberBoxReference2: React.RefObject<HTMLDivElement>;
  numberBoxReference3: React.RefObject<HTMLDivElement>;
}

export default function TutorialSimpleProblemItemLayout({
  state,
  numberBoxReference1,
  numberBoxReference2,
  numberBoxReference3,
}: TutorialSimpleProblemItemLayout): JSX.Element {
  return (
    <div
      className='box2-tutorial'
      style={{
        opacity: state.CoverProblemItem ? 0.5 : 1,
        backgroundColor: state.CoverProblemItem ? 'gray' : 'transparent',
      }}
    >
      <TutorialSimpleProblemFrame
        problemStem={state.ViewRepresentationInternal}
        coverProblemSpace={state.CoverProblemItem}
        entryString={state.EntryRepresentationInternal}
        numberBoxReference1={numberBoxReference1}
        numberBoxReference2={numberBoxReference2}
        numberBoxReference3={numberBoxReference3}
      />
    </div>
  );
}
