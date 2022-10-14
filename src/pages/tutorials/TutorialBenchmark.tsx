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
    buildStarFigure
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
    LoadReferences,
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
                ShowButton: true,
            }

        case TutorialBenchmarkActions.LoadReferences:
            return {
                ...state,
                KeyRefs: [],
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
            }

        case TutorialBenchmarkActions.UpdateEntry:
            //state.FunctionReference();

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

    let circle: any;
    let burst: any;
    let star: any;
    let timeline: any;

    useEffect(() => {
        if (state.DidLoad === false) {
            mojs.addShape("star", Star);

            if (circle && circle.current) return;
            if (burst && burst.current) return;
            if (star && star.current) return;

            circle = buildCircleFigure();
            burst = buildBurstFigure();
            star = buildStarFigure(playBoop);

            dispatch({
                type: TutorialBenchmarkActions.LoadInformation,
                payload: {
                    playBoop
                }
            })
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
        console.log(e)
        //if (state.Animations === false) return;

        e.persist();

        //commonKeyHandlerTutorialBenchmark(key, state, dispatch, feedback);

        const correctResponse = true;
        console.log(e);

        if (correctResponse) {
            const coords = { x: e.pageX, y: e.pageY };

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

            style={{ userSelect: 'none' }}>

            <TutorialBenchmarkHeader />

            <TutorialSimpleProblemItemLayout state={state} />

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