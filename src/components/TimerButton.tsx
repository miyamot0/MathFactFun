import React, { useState, useEffect } from "react";

const timeIntervalTick = 1000;

interface CallbackInterface {
  (string): void;
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

  if (!("speechSynthesis" in window)) {
    alert("TTS functionality not available");
  }

  const synthesis = new SpeechSynthesisUtterance();

  function speak(msg): void {
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
    let interval = null;
    if (isActive && seconds <= nProblems * delta) {
      interval = setInterval(() => {
        fire();

        setSeconds((seconds) => seconds + 1);
      }, timeIntervalTick);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
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
