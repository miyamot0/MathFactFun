/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import { TutorialKeyItem } from './TutorialKeyItem'
import { InitialTutorialBenchmarkState } from '../functionality/TutorialBenchmarkBehavior'

// styles
import '../styles/TutorialKeypad.css'

export interface TutorialKeyPad {
    dispatch: React.Dispatch<any>
    operatorSymbol: string | undefined
    showEquals: boolean
    state: InitialTutorialBenchmarkState
}

export default function TutorialKeyPad({
    dispatch,
    operatorSymbol,
    showEquals = true,
    state,
}: TutorialKeyPad) {
    return (
        <div className="key-pad-wrapper">
            <TutorialKeyItem
                char={' 1 '}
                state={state}
                showEquals={showEquals}
                addedClass={'key1'}
                operatorSymbol={operatorSymbol}
                dispatch={dispatch}
            />
            <TutorialKeyItem
                char={' 2 '}
                state={state}
                showEquals={showEquals}
                addedClass={'key2'}
                operatorSymbol={operatorSymbol}
                dispatch={dispatch}
            />
            <TutorialKeyItem
                char={' 3 '}
                state={state}
                showEquals={showEquals}
                addedClass={'key3'}
                operatorSymbol={operatorSymbol}
                dispatch={dispatch}
            />
            <TutorialKeyItem
                char={' + '}
                state={state}
                showEquals={showEquals}
                addedClass={'key4'}
                operatorSymbol={operatorSymbol}
                dispatch={dispatch}
            />

            <TutorialKeyItem
                char={' 4 '}
                state={state}
                showEquals={showEquals}
                addedClass={'key5'}
                operatorSymbol={operatorSymbol}
                dispatch={dispatch}
            />
            <TutorialKeyItem
                char={' 5 '}
                state={state}
                showEquals={showEquals}
                addedClass={'key6'}
                operatorSymbol={operatorSymbol}
                dispatch={dispatch}
            />
            <TutorialKeyItem
                char={' 6 '}
                state={state}
                showEquals={showEquals}
                addedClass={'key7'}
                operatorSymbol={operatorSymbol}
                dispatch={dispatch}
            />
            <TutorialKeyItem
                char={' - '}
                state={state}
                showEquals={showEquals}
                addedClass={'key8'}
                operatorSymbol={operatorSymbol}
                dispatch={dispatch}
            />
            <TutorialKeyItem
                char={' 7 '}
                state={state}
                showEquals={showEquals}
                addedClass={'key9'}
                operatorSymbol={operatorSymbol}
                dispatch={dispatch}
            />
            <TutorialKeyItem
                char={' 8 '}
                state={state}
                showEquals={showEquals}
                addedClass={'key10'}
                operatorSymbol={operatorSymbol}
                dispatch={dispatch}
            />
            <TutorialKeyItem
                char={' 9 '}
                state={state}
                showEquals={showEquals}
                addedClass={'key11'}
                operatorSymbol={operatorSymbol}
                dispatch={dispatch}
            />
            <TutorialKeyItem
                char={' x '}
                state={state}
                showEquals={showEquals}
                addedClass={'key12'}
                operatorSymbol={operatorSymbol}
                dispatch={dispatch}
            />

            <TutorialKeyItem
                char={'Del'}
                state={state}
                showEquals={showEquals}
                addedClass={'key13'}
                operatorSymbol={operatorSymbol}
                dispatch={dispatch}
            />
            <TutorialKeyItem
                char={' 0 '}
                state={state}
                showEquals={showEquals}
                addedClass={'key14'}
                operatorSymbol={operatorSymbol}
                dispatch={dispatch}
            />
            <TutorialKeyItem
                char={' = '}
                state={state}
                showEquals={showEquals}
                addedClass={'key15'}
                operatorSymbol={operatorSymbol}
                dispatch={dispatch}
            />
            <TutorialKeyItem
                char={'\u00F7'}
                state={state}
                showEquals={showEquals}
                addedClass={'key16'}
                operatorSymbol={operatorSymbol}
                dispatch={dispatch}
            />
        </div>
    )
}
