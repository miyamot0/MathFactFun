/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useReducer, useRef } from "react";
import useSound from 'use-sound';
import Boop from '../../assets/Blop_Mark_DiAngelo-79054334.mp3';
import TutorialBenchmarkHeader from "./views/TutorialBenchmarkHeader";
import TutorialKeyPadLayout from "./layouts/TutorialKeypadLayout";
import TutorialButtonLayout from "./layouts/TutorialButtonLayout";
import TutorialSimpleProblemItemLayout from "./layouts/TutorialSimpleProblemItemLayout";
import { Star } from "./animations/Star";
import {
    buildBurstFigure,
    buildCircleFigure,
    buildStarFigure,
    getCoordsForReferencedDiv
} from "./helpers/ShapeHelpers";

import './styles/TutorialBenchmark.css'

export const DelCode = "Del";
const DelayFeedbackReset = 3000;

const PreSetTrainingItems = [
    "1+2=3",
    "4+2=8",
    "2+6=6",
    "3+2=5",
    "1+6=7"
]

// eslint-disable-next-line @typescript-eslint/no-var-requires
const mojs = require("@mojs/core");

export interface InitialTutorialBenchmarkState {
    CurrentAction: string,
    TrainingItems: string[],
    ShowButton: boolean;
    ViewRepresentationInternal: string;
    EntryRepresentationInternal: string;
    OperatorSymbol: string;
    ButtonText: string;
    CoverProblemItem: boolean;
    DidLoad: boolean;
    Animations: boolean;
    IsAnimating: boolean;
}

export const TutorialSequenceBenchmark = {
    InitialLoading: "InitialLoading",
    Responding: "Responding",
    Correcting: "Correcting",
}

const InitialTutorialBenchmarkState: InitialTutorialBenchmarkState = {
    CurrentAction: TutorialSequenceBenchmark.InitialLoading,
    TrainingItems: PreSetTrainingItems,
    ShowButton: false,
    ViewRepresentationInternal: "",
    EntryRepresentationInternal: "",
    OperatorSymbol: "+",
    ButtonText: "Start",
    CoverProblemItem: true,
    DidLoad: false,
    Animations: false,
    IsAnimating: false,
}


export const enum TutorialBenchmarkActions {
    LoadInformation,
    LoadTrainingItem,
    LoadNextItem,
    UpdateEntry,
    DeliverFeedback,
}

/**
 * Reducer for submission
 *
 * @param {InterventionState} state
 * @param {any} action
 * @returns {InterventionState}
 */
export const TutorialReducer = (
    state: InitialTutorialBenchmarkState,
    action: any
): InitialTutorialBenchmarkState => {
    switch (action.type) {
        case TutorialBenchmarkActions.LoadInformation:
            return {
                ...state,
                DidLoad: true,
                ShowButton: true
            }

        case TutorialBenchmarkActions.LoadTrainingItem:
            return {
                ...state,
                IsAnimating: false,
                ShowButton: false,
                ViewRepresentationInternal: state.TrainingItems[0],
                EntryRepresentationInternal: "",
                OperatorSymbol: "+",
                ButtonText: "Start",
                CoverProblemItem: false,
                Animations: true,
                TrainingItems: state.TrainingItems.slice(1),
                CurrentAction: TutorialSequenceBenchmark.Responding,
            }

        case TutorialBenchmarkActions.LoadNextItem:

            // eslint-disable-next-line no-case-declarations
            const nextItem = state.TrainingItems[0];
            // eslint-disable-next-line no-case-declarations
            const remainingItems = state.TrainingItems.slice(1);

            if (!remainingItems) {
                throw new Error("Training item not found")
            }

            return {
                ...state,
                IsAnimating: false,
                ShowButton: true,
                ViewRepresentationInternal: nextItem,
                EntryRepresentationInternal: "",
                OperatorSymbol: "+",
                ButtonText: "Check",
                CoverProblemItem: false,
                Animations: true,
                TrainingItems: remainingItems,
                CurrentAction: TutorialSequenceBenchmark.Responding,
            }

        case TutorialBenchmarkActions.UpdateEntry:
            return {
                ...state,
                EntryRepresentationInternal: action.payload.EntryRepresentationInternal,
                ShowButton: true,
                ButtonText: state.ButtonText !== "Check" ? "Check" : state.ButtonText,
                CurrentAction: TutorialSequenceBenchmark.Responding,
            }

        case TutorialBenchmarkActions.DeliverFeedback:
            return {
                ...state,
                IsAnimating: true,
            }

        default:
            throw new Error("Tutorial action type error");
    }
};

export default function TutorialBenchmark() {
    const [playBoop] = useSound(Boop);
    const [state, dispatch] = useReducer(TutorialReducer, InitialTutorialBenchmarkState);

    const domReference = useRef<HTMLDivElement>(null);
    const numberBoxReference1 = useRef<HTMLDivElement>(null);
    const numberBoxReference2 = useRef<HTMLDivElement>(null);
    const numberBoxReference3 = useRef<HTMLDivElement>(null);

    let timeline: mojs.Timeline;

    useEffect(() => {
        if (state.DidLoad === false) {
            mojs.addShape("star", Star);

            dispatch({
                type: TutorialBenchmarkActions.LoadInformation,
                payload: {
                    playBoop
                }
            })
            console.log(`dispatch: TutorialBenchmarkActions.LoadInformation`)
        }
    });

    function showFeedback() {
        /**
            const combinedResponse =
            state.ViewRepresentationInternal.split('=')[0] +
            '=' +
            state.EntryRepresentationInternal;

            const isMatching =
            state.ViewRepresentationInternal.trim() ===
            combinedResponse.trim();
        */

        dispatch({type: TutorialBenchmarkActions.DeliverFeedback, payload: {}})

        
        timeline = new mojs.Timeline({ speed: 1.5 });

        const tune1 = getCoordsForReferencedDiv(numberBoxReference1);

        const circle1 = buildCircleFigure({delay: 0});
        const burst1 = buildBurstFigure({delay: 0});
        const star1 = buildStarFigure({delay: 0, playBoop});

        burst1.tune(tune1);
        circle1.tune(tune1);
        star1.tune(tune1);

        const tune2 = {
            ...getCoordsForReferencedDiv(numberBoxReference2)
        };

        const circle2 = buildCircleFigure({delay: 500});
        const burst2 = buildBurstFigure({delay: 500});
        const star2 = buildStarFigure({delay: 800, playBoop});

        burst2.tune(tune2);
        circle2.tune(tune2);
        star2.tune(tune2);

        const tune3 = {
            ...getCoordsForReferencedDiv(numberBoxReference3)
        };

        const circle3 = buildCircleFigure({delay: 1500});
        const burst3 = buildBurstFigure({delay: 1500});
        const star3 = buildStarFigure({delay: 1800, playBoop});

        burst3.tune(tune3);
        circle3.tune(tune3);
        star3.tune(tune3);

        timeline.add(
            burst1, circle1, star1,
            burst2, circle2, star2,
            burst3, circle3, star3
            );

        timeline.replay();
        
        setTimeout(() => {
            dispatch({type: TutorialBenchmarkActions.LoadNextItem, payload: {}})
        }, DelayFeedbackReset)
    }

    function clickHandler(e: any, char: string) {   
        if (state.IsAnimating) return;

        if (char === DelCode) {
            // # Rule #7: Exit out if nothin to delete
            if (state.EntryRepresentationInternal.length === 0) return;

            dispatch({
                type: TutorialBenchmarkActions.UpdateEntry,
                payload: {
                EntryRepresentationInternal: state.EntryRepresentationInternal.slice(
                    0,
                    -1
                ),
                },
            }
            );
        } else {
            if (state.EntryRepresentationInternal.length >= 3) {
            return;
            } else {
            dispatch(
                {
                type: TutorialBenchmarkActions.UpdateEntry,
                payload: {
                    EntryRepresentationInternal:
                    state.EntryRepresentationInternal + char,
                },
                }
            );
            }
        }



        return;
        const correctResponse = true;


        //return
        if (state.Animations === false || !correctResponse) return;
        e.persist();

        if (correctResponse) {
            timeline = new mojs.Timeline({ speed: 1.5 });

            const tune1 = getCoordsForReferencedDiv(numberBoxReference1);

            const circle1 = buildCircleFigure({delay: 0});
            const burst1 = buildBurstFigure({delay: 0});
            const star1 = buildStarFigure({delay: 0, playBoop});

            burst1.tune(tune1);
            circle1.tune(tune1);
            star1.tune(tune1);

            const tune2 = {
                ...getCoordsForReferencedDiv(numberBoxReference2)
            };

            const circle2 = buildCircleFigure({delay: 500});
            const burst2 = buildBurstFigure({delay: 500});
            const star2 = buildStarFigure({delay: 800, playBoop});

            burst2.tune(tune2);
            circle2.tune(tune2);
            star2.tune(tune2);

            const tune3 = {
                ...getCoordsForReferencedDiv(numberBoxReference3)
            };

            const circle3 = buildCircleFigure({delay: 1500});
            const burst3 = buildBurstFigure({delay: 1500});
            const star3 = buildStarFigure({delay: 1800, playBoop});

            burst3.tune(tune3);
            circle3.tune(tune3);
            star3.tune(tune3);

            timeline.add(
                burst1, circle1, star1,
                burst2, circle2, star2,
                burst3, circle3, star3
                );

            timeline.replay();            
        }
    }

    return (
        <div
            className="wrapper-tutorial"
            ref={domReference}
            >

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
                intervention={"Benchmark"}
                showEquals={false}
                dispatch={dispatch}
                callBackFunction={clickHandler}
            />

        </div>
    )
}