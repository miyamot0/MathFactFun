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
  TutorialBenchmarkActions,
  TutorialSequenceBenchmark,
} from '../TutorialBenchmark';

export default function TutorialButtonLayout({
  //user,
  //id,
  //target,
  //approach,
  //document,
  state,
  //openModal,
  //addDocument,
  //updateDocument,
  //addResponse,
  //history,
  dispatch,
  className,
  displayFeedback,
}: {
  /*
    user: firebase.User | null;
    id: string;
    target: string;
    approach: string;
    document: StudentDataInterface | null;
    */
  state: InitialTutorialBenchmarkState,
  /*
    openModal: any;
    addDocument: any;
    updateDocument: any;
    addResponse: any;
    history: any;
    */
  dispatch: any,
  className: string,
  displayFeedback: any,
}): JSX.Element {
  //console.log("in ccc load");

  return (
    <div className={className}>
      <section>
        {state.ShowButton && (
          <button
            className='global-btn'
            type='button'
            onClick={event => {
              if (state.IsAnimating) return;

              switch (state.CurrentAction) {
                case TutorialSequenceBenchmark.InitialLoading:
                  dispatch({ type: TutorialBenchmarkActions.LoadTrainingItem });
                  break;
                case TutorialSequenceBenchmark.Responding:
                  console.log('answer');

                  displayFeedback();

                  break;
              }

              //switch

              /*
                            if (checkIfSubmittedViaClick(event) === true) {
                                return;
                            } else {
                                sharedButtonActionSequence(
                                    user,
                                    id,
                                    target,
                                    approach,
                                    document,
                                    state,
                                    openModal,
                                    addDocument,
                                    updateDocument,
                                    addResponse,
                                    history,
                                    dispatch
                                );
                            }
                            */
            }}
          >
            {state.ButtonText}
          </button>
        )}
      </section>
    </div>
  );
}
