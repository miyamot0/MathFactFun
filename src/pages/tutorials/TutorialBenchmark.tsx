/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useRef } from "react";
import useSound from 'use-sound';
import Boop from '../../assets/Blop_Mark_DiAngelo-79054334.mp3';
import { Star } from "./animations/Star";
import { buildBurstFigure, buildCircleFigure, buildStarFigure } from "./helpers/ShapeHelpers";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const mojs = require("@mojs/core");

export default function TutorialBenchmark() {
    const [playBoop] = useSound(Boop);

    const domReference = useRef<HTMLDivElement>(null);

    let circle: any;
    let burst: any;
    let star: any;
    let timeline: any;

    useEffect(() => {
        mojs.addShape("star", Star);

        if (circle && circle.current) return;
        if (burst && burst.current) return;
        if (star && star.current) return;

        circle = buildCircleFigure();
        burst = buildBurstFigure();
        star = buildStarFigure(playBoop);

        //timeline = new mojs.Timeline({ speed: 1.5 });
        //timeline.add(burst, circle, star);
    });

    function clickHandler(e: any) {
        e.persist();

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

    return (
        <div ref={domReference} onClick={clickHandler} style={{ userSelect: 'none' }}>
            <ul>TODO:
                <li>Video Playthrough?</li>
                <li>- E2E video with button press visuals?</li>
                <li>Model correct entry w/ clicks</li>
                <li>- check for accuracy</li>
                <li>Model correct entry w/ key presses</li>
                <li>- check for accuracy</li>
            </ul>
        </div>
    )
}