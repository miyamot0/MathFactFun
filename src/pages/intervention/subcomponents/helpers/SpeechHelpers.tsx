/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/** speakProblem
 *
 */
export function speakProblem(utterance: SpeechSynthesisUtterance): void {
  global.window.speechSynthesis.speak(utterance);
}

/** scheduleProblemOutput
 *
 * @param seconds
 * @param delta
 * @param trial
 * @param nProblems
 * @param setTrial
 * @param callBackFunction
 * @param synthesis
 */
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

    speakProblem(synthesis);
  }
}
