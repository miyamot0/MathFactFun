/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useEffect } from "react";
import { scheduleProblemOutput, speakProblem } from "./helpers/SpeechHelpers";
import { TimerButtonInterface } from "./interfaces/TimerButtonInterfaces";

export default function TimerButton({
  callBackFunction,
  nProblems,
  delta,
}: TimerButtonInterface): JSX.Element {
  const timeIntervalTick = 1000;

  const [seconds, setSeconds] = useState(0);
  const [trial, setTrial] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const [intervalId, setIntervalId] = useState<NodeJS.Timer>();

  //if (!("speechSynthesis" in window)) {
  //  throw Error("TTS functionality not available");
  // }
  //const synthesis = new SpeechSynthesisUtterance();

  function toggle() {
    if (!isActive) {
      setIsActive(true);
    }
  }

  useEffect(() => {
    if (isActive && seconds <= nProblems * delta) {
      const interval: NodeJS.Timer = setInterval(() => {
        scheduleProblemOutput(
          seconds,
          delta,
          trial,
          nProblems,
          setTrial,
          callBackFunction,
          {} as SpeechSynthesisUtterance
        );

        setSeconds((seconds) => seconds + 1);
      }, timeIntervalTick);

      setIntervalId(interval);
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [isActive, seconds]);

  return (
    <button className="global-btn global-btn-orange" onClick={toggle}>
      {isActive ? `Trial #${trial}` : "Start Timed Problems"}
    </button>
  );
}
