/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import { useState, useEffect } from "react";

interface TimerInterface {
  secondsTotal: number;
  startTimerTime: Date | null;
  callbackFunction: () => void;
}

export default function Timer({
  secondsTotal,
  startTimerTime,
  callbackFunction,
}: TimerInterface): JSX.Element {
  const [secondCounter, setSecondCounter] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timer>();
  const [fireCallback, setFireCallback] = useState(false);

  useEffect(() => {
    if (startTimerTime) {
      let intervalIdValue: NodeJS.Timer = setInterval(() => {
        setSecondCounter((secondCounter) => secondCounter + 1);
      }, 1000);

      setIntervalId(intervalIdValue);
      return () => clearInterval(intervalId);
    }

    // TODO: Dependency issue to explore
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startTimerTime]);

  useEffect(() => {
    if (fireCallback) {
      setTimeout(function () {
        callbackFunction();
      }, 3000);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fireCallback]);

  const relevantSeconds = secondsTotal - secondCounter;

  function padTimeDigits(num: number) {
    return String(num).padStart(2, "0");
  }

  const secondsToDisplay = relevantSeconds % 60;
  const minutesRemaining = (relevantSeconds - secondsToDisplay) / 60;
  const minutesToDisplay = minutesRemaining % 60;

  if (startTimerTime && relevantSeconds <= 0 && !fireCallback) {
    clearInterval(intervalId);
    setFireCallback(true);
  }

  return (
    <span>
      {padTimeDigits(minutesToDisplay)}:{padTimeDigits(secondsToDisplay)}
    </span>
  );
}
