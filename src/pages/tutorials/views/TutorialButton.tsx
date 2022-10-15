/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import { commonKeyHandlerTutorialBenchmark } from '../../intervention/helpers/InteractionHelpers'
import {
    InitialTutorialBenchmarkState,
    TutorialSequenceBenchmark,
} from '../functionality/TutorialBenchmarkBehavior'

export interface TutorialButton {
    char: string
    classList: string
    showKey: boolean
    dispatch: React.Dispatch<any>
    state: InitialTutorialBenchmarkState
}

export default function TutorialButton({
    char,
    classList,
    showKey,
    dispatch,
    state,
}: TutorialButton) {
    let opacity = 1

    if (state.EmphasizeDelete === true && classList.includes('key13')) {
        opacity = 1
    } else if (state.EmphasizeDelete === true && !classList.includes('key13')) {
        opacity = 0.5
    }

    return (
        <button
            className={`${classList}`}
            style={{
                visibility: showKey ? 'visible' : 'hidden',
                opacity: opacity,
            }}
            onClick={(): void => {
                switch (state.CurrentAction) {
                    case TutorialSequenceBenchmark.InitialLoading:
                        return

                    case TutorialSequenceBenchmark.Responding:
                        commonKeyHandlerTutorialBenchmark(
                            char.trim(),
                            state,
                            dispatch
                        )

                        return

                    case TutorialSequenceBenchmark.Correcting:
                        return
                }
            }}
        >
            <span className="content">{char}</span>
        </button>
    )
}
