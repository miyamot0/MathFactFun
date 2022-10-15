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
import { RoutedIdTargetParam } from '../../interfaces/RoutingInterfaces'
import { useHistory, useParams } from 'react-router-dom'
import { useFirebaseDocumentTyped } from '../../firebase/hooks/useFirebaseDocument'
import { useAuthorizationContext } from '../../context/hooks/useAuthorizationContext'
import { useFirestore } from '../../firebase/hooks/useFirestore'
import {
    StudentDataInterface,
    StudentTutorialInterface,
} from '../student/interfaces/StudentInterfaces'
import {
    buildBurstFigure,
    buildCircleFigure,
    buildStarFigure,
    getCoordsForReferencedDiv,
} from './helpers/ShapeHelpers'
import {
    BenchmarkTutorialReducer,
    InitialTutorialBenchmarkState,
    TutorialBenchmarkActions,
} from './functionality/TutorialBenchmarkBehavior'

import './styles/TutorialBenchmark.css'
import firebase from 'firebase'

export const DelCode = 'Del'
const DelayFeedbackResetPerItem = 1000

// eslint-disable-next-line @typescript-eslint/no-var-requires
const mojs = require('@mojs/core')

export default function TutorialBenchmark() {
    const { id, target } = useParams<RoutedIdTargetParam>()
    const history = useHistory()
    const { document } = useFirebaseDocumentTyped<StudentDataInterface>({
        collectionString: 'students',
        idString: id,
    })
    const { user } = useAuthorizationContext()
    const { addDocument, response: addResponse } = useFirestore(
        'tutorials',
        target.split('-')[0],
        id
    )

    const { updateDocument, response: updateResponse } = useFirestore(
        'students',
        undefined,
        undefined
    )

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
        if (user && document && state.DidLoad === false) {
            mojs.addShape('star', Star)

            let trainingItems: string[] = []

            switch (target) {
                case 'Addition-Sums to 18':
                    trainingItems = [
                        '1+2=3',
                        '4+2=6',
                        '2+6=8',
                        '3+2=5',
                        '1+6=7',
                    ]
                    break
                case 'Subtraction-Lessing From 18':
                    trainingItems = [
                        '8-4=4',
                        '6-3=3',
                        '5-4=1',
                        '7-2=5',
                        '3-2=1',
                    ]
                    break
                case 'Multiplication-Single Digit':
                    trainingItems = [
                        '2x3=6',
                        '8x2=16',
                        '7x3=21',
                        '5x5=25',
                        '6x4=24',
                    ]
                    break
                case 'Division-Single Digit':
                    trainingItems = [
                        '16/4=4',
                        '25/5=5',
                        '10/2=5',
                        '36/6=6',
                        '49/7=7',
                    ]
                    break
            }

            dispatch({
                type: TutorialBenchmarkActions.LoadInformation,
                payload: {
                    TrainingItems: trainingItems,
                },
            })
        }
    }, [user, document])

    async function logPerformance() {
        // TODO: time/latency check?
        const passedTrainingTask = state.Errors === 0

        if (!document || !state.StartTime) return

        const end = new Date()

        const uploadObject = {
            id: id,
            Tutorial: 'Benchmark',
            Target: target,
            Problems: state.Problems,
            Attempts: state.Attempts,
            InitialCorrect: state.InitialCorrect,
            Errors: state.Errors,
            SessionDuration: (end.getTime() - state.StartTime.getTime()) / 1000,
            createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        } as StudentTutorialInterface

        await addDocument(uploadObject)

        if (addResponse.error) {
            return
        }

        const {
            TutorialBenchmarkAddition,
            TutorialBenchmarkSubtraction,
            TutorialBenchmarkMultiplication,
            TutorialBenchmarkDivision,
        } = document

        const updateObject = {
            TutorialBenchmarkAddition,
            TutorialBenchmarkSubtraction,
            TutorialBenchmarkMultiplication,
            TutorialBenchmarkDivision,
        }

        switch (target) {
            case 'Addition-Sums to 18':
                updateObject.TutorialBenchmarkAddition = passedTrainingTask
                break
            case 'Subtraction-Lessing From 18':
                updateObject.TutorialBenchmarkSubtraction = passedTrainingTask
                break
            case 'Multiplication-Single Digit':
                updateObject.TutorialBenchmarkMultiplication =
                    passedTrainingTask
                break
            case 'Division-Single Digit':
                updateObject.TutorialBenchmarkDivision = passedTrainingTask
                break
        }

        await updateDocument(id, updateObject)

        if (!updateResponse.error) {
            history.push(`/probe/${id}`)
        }
    }

    function showFeedback() {
        const combinedResponse =
            state.ViewRepresentationInternal.split('=')[0] +
            '=' +
            state.EntryRepresentationInternal

        const isMatching =
            state.ViewRepresentationInternal.trim() === combinedResponse.trim()

        if (isMatching === false) {
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

        for (let i = nAnimationsToShow - 1; i >= 0; i--) {
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
            if (state.TrainingItems.length === 0) {
                logPerformance()
            }

            dispatch({
                type: TutorialBenchmarkActions.LoadNextItem,
                payload: {},
            })
        }, DelayFeedbackResetPerItem * nAnimationsToShow)
    }

    return (
        <div className="wrapper-tutorial" ref={domReference}>
            <TutorialBenchmarkHeader document={document} />

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
