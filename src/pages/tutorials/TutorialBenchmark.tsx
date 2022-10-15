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

// eslint-disable-next-line @typescript-eslint/no-var-requires
const mojs = require("@mojs/core");

export interface InitialTutorialBenchmarkState {
    ShowButton: boolean;
    ViewRepresentationInternal: string;
    EntryRepresentationInternal: string;
    OperatorSymbol: string;
    ButtonText: string;
    CoverProblemItem: boolean;
    DidLoad: boolean;
    Animations: boolean;
    KeyRefs: any[3];
}

const InitialTutorialBenchmarkState: InitialTutorialBenchmarkState = {
    ShowButton: false,
    ViewRepresentationInternal: "",
    EntryRepresentationInternal: "",
    OperatorSymbol: "+",
    ButtonText: "Start",
    CoverProblemItem: true,
    DidLoad: false,
    Animations: false,
    KeyRefs: [undefined, undefined, undefined,],
}

export const enum TutorialBenchmarkActions {
    LoadInformation,
    LoadTrainingItem,
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
                ShowButton: false,
                ViewRepresentationInternal: "1+2=",
                EntryRepresentationInternal: "",
                OperatorSymbol: "+",
                ButtonText: "Start",
                CoverProblemItem: false,
                Animations: true,
            }

        case TutorialBenchmarkActions.UpdateEntry:
            return {
                ...state,
                EntryRepresentationInternal: action.payload.EntryRepresentationInternal
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

    //let circle: any[];
    //let burst: any[];
    //let star: any[];
    let timeline: any;

    useEffect(() => {
        if (state.DidLoad === false) {
            mojs.addShape("star", Star);

            /*
            // Prevent multiple loads
            if (circle && circle[0].current) return;
            if (burst && burst[0].current) return;
            if (star && star[0].current) return;

            circle[0] = buildCircleFigure();
            burst[0] = buildBurstFigure();
            star[0] = buildStarFigure(playBoop);
            */

            dispatch({
                type: TutorialBenchmarkActions.LoadInformation,
                payload: {
                    playBoop
                }
            })
            console.log(`dispatch: TutorialBenchmarkActions.LoadInformation`)
        }
    });

    /*
    function fireAnimations() {
        console.log('fireAnimations');

        const correctResponse = true;

        if (correctResponse) {
            const coords = { x: 100, y: 100 };

            circle = buildCircleFigure();
            burst = buildBurstFigure();
            star = buildStarFigure(playBoop);

            timeline = new mojs.Timeline({ speed: 1.5 });
            timeline.add(burst, circle, star);

            burst.tune(coords);
            circle.tune(coords);
            star.tune(coords);
            timeline.replay();
        }
    }
    */

    function clickHandler(e: any, char: string) {
        const correctResponse = true;
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

            /*

            circle[1] = buildCircleFigure();
            burst[1] = buildBurstFigure();
            star[1] = buildStarFigure(playBoop);

            burst[1].tune(coords2);
            circle[1].tune(coords2);
            star[1].tune(coords2);

            const coords3 = getCoordsForReferencedDiv(numberBoxReference3);

            circle[2] = buildCircleFigure();
            burst[2] = buildBurstFigure();
            star[2] = buildStarFigure(playBoop);

            burst[2].tune(coords3);
            circle[2].tune(coords3);
            star[2].tune(coords3);
            */



            timeline.replay();

            
        }
    }

    //style={{ userSelect: 'none' }}
    /**
    <ul>TODO:
        <li>Video Playthrough?</li>
        <li>- E2E video with button press visuals?</li>
        <li>Model correct entry w/ clicks</li>
        <li>- check for accuracy</li>
        <li>Model correct entry w/ key presses</li>
        <li>- check for accuracy</li>
    </ul>
     */
    //onClick={clickHandler}
    return (
        <div
            className="wrapper-tutorial"
            ref={domReference}
            >

            <TutorialBenchmarkHeader />

            <TutorialSimpleProblemItemLayout state={state}             
                numberBoxReference1={numberBoxReference1}
                numberBoxReference2={numberBoxReference2}
                numberBoxReference3={numberBoxReference3}
            />

            <TutorialButtonLayout
                className="box3-tutorial"
                state={state}
                dispatch={dispatch}
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