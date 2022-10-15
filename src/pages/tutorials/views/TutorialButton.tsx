/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {
  InitialTutorialBenchmarkState,
  TutorialSequenceBenchmark,
} from '../TutorialBenchmark';

export interface TutorialButton {
  char: string;
  classList: string;
  showKey: boolean;
  onClick: any;
  state: InitialTutorialBenchmarkState;
}

export default function TutorialButton({
  char,
  classList,
  showKey,
  onClick,
  state,
}: TutorialButton) {
  return (
    <button
      className={`${classList}`}
      style={{
        visibility: showKey ? 'visible' : 'hidden',
      }}
      onClick={(event: React.MouseEvent<HTMLElement>): void => {
        console.log(state);

        switch (state.CurrentAction) {
          case TutorialSequenceBenchmark.InitialLoading:
            return;

          case TutorialSequenceBenchmark.Responding:
            onClick(event, char.trim());

            return;

          case TutorialSequenceBenchmark.Correcting:
            return;
        }
      }}
    >
      <span className='content'>{char}</span>
    </button>
  );
}
