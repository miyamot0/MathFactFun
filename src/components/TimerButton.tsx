/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useEffect } from "react";

const timeIntervalTick = 1000;

interface CallbackInterface {
  (arg0: string): void;
}

interface TimerButtonInterface {
  callBackFunction: CallbackInterface;
  nProblems: number;
  delta: number;
}

function Timer({
  callBackFunction,
  nProblems = 5,
  delta = 5,
}: TimerButtonInterface): JSX.Element {
  const [seconds, setSeconds] = useState(0);
  const [trial, setTrial] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const [intervalId, setIntervalId] = useState<NodeJS.Timer>();

  if (!("speechSynthesis" in window)) {
    alert("TTS functionality not available");
  }

  const synthesis = new SpeechSynthesisUtterance();

  function speak(msg: string): void {
    const plusser = parseInt(msg) + 1;

    synthesis.text = msg + "+ 1 =";

    window.speechSynthesis.speak(synthesis);

    let speakAnswer = () => {
      synthesis.text = plusser.toString();
      window.speechSynthesis.speak(synthesis);
      return;
    };

    setTimeout(speakAnswer, 1000);
  }

  function toggle() {
    if (!isActive) {
      setIsActive(true);
    }
  }

  function fire() {
    if (seconds % delta === 0 && trial < nProblems) {
      setTrial((trial) => trial + 1);
      callBackFunction(`fire ${seconds} ${trial}`);

      speak(trial.toString());
    }
  }

  useEffect(() => {

    if (isActive && seconds <= nProblems * delta) {
      let interval: NodeJS.Timer = setInterval(() => {
        fire();

        setSeconds((seconds) => seconds + 1);
      }, timeIntervalTick);

      setIntervalId(interval);
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, seconds]);

  return (
    <button className="global-btn global-btn-orange" onClick={toggle}>
      {isActive ? `Trial #${trial}` : "Start Timed Problems"}
    </button>
  );
}

export default Timer;
function speak(msg: any) {
  throw new Error("Function not implemented.");
}
