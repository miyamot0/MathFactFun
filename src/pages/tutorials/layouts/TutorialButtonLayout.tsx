/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import {
    InitialTutorialBenchmarkState,
    TutorialBenchmarkActions,
    TutorialSequenceBenchmark,
} from '../functionality/TutorialBenchmarkBehavior'

export interface TutorialButtonLayout {
    state: InitialTutorialBenchmarkState
    dispatch: any
    className: string
    displayFeedback: any
}

export default function TutorialButtonLayout({
    state,
    dispatch,
    className,
    displayFeedback,
}: TutorialButtonLayout): JSX.Element {
    return (
        <div className={className}>
            <section>
                {state.ShowButton && (
                    <button
                        className="global-btn"
                        type="button"
                        onClick={() => {
                            if (state.IsAnimating) return

                            switch (state.CurrentAction) {
                                case TutorialSequenceBenchmark.InitialLoading:
                                    dispatch({
                                        type: TutorialBenchmarkActions.LoadTrainingItem,
                                    })
                                    break
                                case TutorialSequenceBenchmark.Responding:
                                    displayFeedback()
                                    break
                            }
                        }}
                    >
                        {state.ButtonText}
                    </button>
                )}
            </section>
        </div>
    )
}
