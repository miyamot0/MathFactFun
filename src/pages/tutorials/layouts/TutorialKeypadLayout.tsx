/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import TutorialKeyPad from '../views/TutorialKeypad'
import { InterventionFormat } from '../../../maths/Facts'
import { InitialTutorialBenchmarkState } from '../functionality/TutorialBenchmarkBehavior'

export interface TutorialKeyPadLayout {
    className: string
    state: InitialTutorialBenchmarkState
    intervention: string
    showEquals: boolean
    dispatch: React.Dispatch<any>
}

export default function TutorialKeyPadLayout({
    className,
    state,
    intervention,
    showEquals,
    dispatch,
}: TutorialKeyPadLayout): JSX.Element {
    // Note: this cuts off keys when not relevant
    const operatorScreen =
        intervention === InterventionFormat.CoverCopyCompare
            ? state.OperatorSymbol
            : undefined

    return (
        <div
            className={className}
            style={{
                opacity: state.CoverProblemItem ? 0.5 : 1,
            }}
        >
            <TutorialKeyPad
                state={state}
                dispatch={dispatch}
                operatorSymbol={operatorScreen}
                showEquals={showEquals}
            />
        </div>
    )
}
