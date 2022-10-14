/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { PlayFunction } from "use-sound/dist/types";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const mojs = require("@mojs/core");
const RADIUS = 28;

/** buildCircleFigure
 *
 * Build out shape for animation
 *
 */
export function buildCircleFigure() {
  return new mojs.Shape({
    left: 0,
    top: 0,
    stroke: "#FF9C00",
    strokeWidth: { [3 * RADIUS]: 0 },
    fill: "none",
    scale: { 0: 1, easing: "quad.out" },
    radius: RADIUS,
    duration: 450,
    onComplete: function () {
      this.el.parentNode.removeChild(this.el);
    },
  });
}

/** buildBurstFigure
 *
 * Build out shape for animation
 *
 */
export function buildBurstFigure() {
  const nParticles = Math.floor(Math.random() * 10) + 4;

  return new mojs.Burst({
    left: 0,
    top: 0,
    radius: { 4: RADIUS },
    angle: { 15: 45 },
    count: nParticles,
    timeline: { delay: 500 },
    children: {
      radius: "rand(2, 4)",
      direction: [-1],
      fill: [
        { "#9EC9F5": "#9ED8C6" },
        { "#91D3F7": "#9AE4CF" },

        { "#DC93CF": "#E3D36B" },
        { "#CF8EEF": "#CBEB98" },

        { "#87E9C6": "#1FCC93" },
        { "#A7ECD0": "#9AE4CF" },

        { "#87E9C6": "#A635D9" },
        { "#D58EB3": "#E0B6F5" },

        { "#F48BA2": "#CF8EEF" },
        { "#91D3F7": "#A635D9" },

        { "#CF8EEF": "#CBEB98" },
        { "#87E9C6": "#A635D9" },
      ],
      scale: { 1: 0, easing: "quad.in" },
      pathScale: [0.8, null],
      degreeShift: [13, null],
      swirlFrequency: "rand(2, 4)",
      duration: [750, 1500],
      easing: "quint.out",
    },
    onComplete: function () {
      this.el.parentNode.removeChild(this.el);
    },
  });
}

/** buildStarFigure
 *
 * Build out shape for animation
 *
 */
export function buildStarFigure(playBoop: PlayFunction) {
  return new mojs.Shape({
    left: 0,
    top: 0,
    shape: "star",
    fill: "#FF9C00",
    scale: { 0: 1 },
    easing: "elastic.out",
    duration: 2000,
    delay: 300,
    radius: RADIUS / 1.5,
    onStart: function () {
      playBoop();
    },
    onComplete: function () {
      this.el.parentNode.removeChild(this.el);
    },
  });
}
