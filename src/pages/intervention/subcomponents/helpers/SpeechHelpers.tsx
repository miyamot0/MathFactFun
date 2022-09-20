/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export function speakProblem(
  msg: string,
  synthesis: SpeechSynthesisUtterance
): void {
  const plusser = parseInt(msg) + 1;

  synthesis.text = msg + "+ 1 =";

  window.speechSynthesis.speak(synthesis);

  const speakAnswer = () => {
    synthesis.text = plusser.toString();
    window.speechSynthesis.speak(synthesis);
    return;
  };

  setTimeout(speakAnswer, 1000);
}

export function scheduleProblemOutput(
  seconds: number,
  delta: number,
  trial: number,
  nProblems: number,
  setTrial: any,
  callBackFunction: any,
  synthesis: SpeechSynthesisUtterance
) {
  if (seconds % delta === 0 && trial < nProblems) {
    setTrial((trial: number) => trial + 1);
    callBackFunction(`fire ${seconds} ${trial}`);

    speakProblem(trial.toString(), synthesis);
  }
}
