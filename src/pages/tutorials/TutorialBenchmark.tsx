/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useReducer, useRef } from 'react'
import useSound from 'use-sound'
import Boop from '../../assets/Blop_Mark_DiAngelo-79054334.mp3'
import TutorialBenchmarkHeader from './views/TutorialBenchmarkHeader'
import TutorialKeyPadLayout from './layouts/TutorialKeypadLayout'
import TutorialButtonLayout from './layouts/TutorialButtonLayout'
import TutorialSimpleProblemItemLayout from './layouts/TutorialSimpleProblemItemLayout'
import { Star } from './animations/Star'
import {
    buildBurstFigure,
    buildCircleFigure,
    buildStarFigure,
    getCoordsForReferencedDiv,
} from './helpers/ShapeHelpers'

import './styles/TutorialBenchmark.css'
import {
    BenchmarkTutorialReducer,
    InitialTutorialBenchmarkState,
    TutorialBenchmarkActions,
} from './functionality/TutorialBenchmarkBehavior'

export const DelCode = 'Del'
const DelayFeedbackResetPerItem = 1000

// eslint-disable-next-line @typescript-eslint/no-var-requires
const mojs = require('@mojs/core')

export default function TutorialBenchmark() {
    const [playBoop] = useSound(Boop)
    const [state, dispatch] = useReducer(
        BenchmarkTutorialReducer,
        InitialTutorialBenchmarkState
    )

    const domReference = useRef<HTMLDivElement>(null)
    const numberBoxReference1 = useRef<HTMLDivElement>(null)
    const numberBoxReference2 = useRef<HTMLDivElement>(null)
    const numberBoxReference3 = useRef<HTMLDivElement>(null)

    let timeline: mojs.Timeline

    useEffect(() => {
        if (state.DidLoad === false) {
            mojs.addShape('star', Star)

            dispatch({
                type: TutorialBenchmarkActions.LoadInformation,
                payload: {
                    playBoop,
                },
            })
        }
    })

    function showFeedback() {
        const combinedResponse =
            state.ViewRepresentationInternal.split('=')[0] +
            '=' +
            state.EntryRepresentationInternal

        const isMatching =
            state.ViewRepresentationInternal.trim() === combinedResponse.trim()

        if (isMatching === false) {
            // TODO: Error correction guidance

            dispatch({
                type: TutorialBenchmarkActions.ClearResponseAndRetry,
                payload: {},
            })
            return
        }

        const nAnimationsToShow = state.EntryRepresentationInternal.length

        dispatch({
            type: TutorialBenchmarkActions.DeliverFeedback,
            payload: {},
        })

        timeline = new mojs.Timeline({ speed: 1.5 })

        const coords = [{}, {}, {}]

        coords[2] = getCoordsForReferencedDiv(numberBoxReference1)
        coords[1] = getCoordsForReferencedDiv(numberBoxReference2)
        coords[0] = getCoordsForReferencedDiv(numberBoxReference3)

        for (let i = 0; i < nAnimationsToShow; i++) {
            const coordLocal = coords[i]

            const circle = buildCircleFigure({ delay: i * 500 })
            const burst = buildBurstFigure({ delay: i * 500 })
            const star = buildStarFigure({ delay: i * 500, playBoop })

            burst.tune(coordLocal)
            circle.tune(coordLocal)
            star.tune(coordLocal)

            timeline.add(burst, circle, star)
        }

        timeline.replay()

        setTimeout(() => {
            dispatch({
                type: TutorialBenchmarkActions.LoadNextItem,
                payload: {},
            })
        }, DelayFeedbackResetPerItem * nAnimationsToShow)
    }

    return (
        <div className="wrapper-tutorial" ref={domReference}>
            <TutorialBenchmarkHeader />

            <TutorialSimpleProblemItemLayout
                state={state}
                numberBoxReference1={numberBoxReference1}
                numberBoxReference2={numberBoxReference2}
                numberBoxReference3={numberBoxReference3}
            />

            <TutorialButtonLayout
                className="box3-tutorial"
                state={state}
                dispatch={dispatch}
                displayFeedback={showFeedback}
            />

            <TutorialKeyPadLayout
                className="box5-tutorial"
                state={state}
                intervention={'Benchmark'}
                showEquals={false}
                dispatch={dispatch}
            />
        </div>
    )
}
