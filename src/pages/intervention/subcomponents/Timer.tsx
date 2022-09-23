/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useState } from "react";
import { padTimeDigits } from "./helpers/ProblemHelpers";
import { TimerInterface } from "./interfaces/TimerInterfaces";

export default function Timer({
  secondsTotal,
  startTimerTime,
  callbackFunction,
}: TimerInterface): JSX.Element {
  const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null);
  const [fireCallback, setFireCallback] = useState(false);
  const [secondCounter, setSecondCounter] = useState<number>(0);

  useEffect(() => {
    if (startTimerTime) {
      const intervalIdValue: NodeJS.Timer = setInterval(() => {
        setSecondCounter((secondCounter) => secondCounter + 1);
      }, 1000);

      setIntervalId(intervalIdValue);
      return () => clearInterval(intervalId ? intervalId : undefined);
    } else {
      return;
    }

    // TODO: Dependency issue to explore
  }, [startTimerTime]);

  useEffect(() => {
    if (fireCallback) {
      setTimeout(function () {
        callbackFunction();
      }, 1000);
    }
  }, [fireCallback]);

  const relevantSeconds = secondsTotal - secondCounter;

  const secondsToDisplay = relevantSeconds % 60;
  const minutesRemaining = (relevantSeconds - secondsToDisplay) / 60;
  const minutesToDisplay = minutesRemaining % 60;

  if (
    startTimerTime &&
    relevantSeconds <= 0 &&
    fireCallback === false &&
    intervalId !== null
  ) {
    clearInterval(intervalId);
    setFireCallback(true);
  }

  return (
    <span>
      {padTimeDigits(minutesToDisplay)}:{padTimeDigits(secondsToDisplay)}
    </span>
  );
}
