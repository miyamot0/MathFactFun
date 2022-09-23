/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { scheduleProblemOutput, speakProblem } from "../SpeechHelpers";

describe("speakProblem", () => {
  beforeAll(() => {
    global.window.speechSynthesis = {
      speak: jest.fn(),
    } as unknown as SpeechSynthesis;
  });

  afterAll(() => {
    global.window.speechSynthesis = {} as unknown as SpeechSynthesis;
  });

  it("should run", () => {
    speakProblem({} as SpeechSynthesisUtterance);
  });
});

describe("scheduleProblemOutput", () => {
  beforeAll(() => {
    global.window.speechSynthesis = {
      speak: jest.fn(),
    } as unknown as SpeechSynthesis;
  });

  afterAll(() => {
    global.window.speechSynthesis = {} as unknown as SpeechSynthesis;
  });

  it("should run, and fire", () => {
    const seconds = 5;
    const delta = 5;
    const trial = 0;
    const nProblems = 1;
    const setTrial = jest.fn();
    const callBackFunction = jest.fn();
    const speech = {} as SpeechSynthesisUtterance;

    scheduleProblemOutput(
      seconds,
      delta,
      trial,
      nProblems,
      setTrial,
      callBackFunction,
      speech
    );
  });

  it("should run, and return", () => {
    const seconds = 5;
    const delta = 5;
    const trial = 1;
    const nProblems = 1;
    const setTrial = jest.fn();
    const callBackFunction = jest.fn();
    const speech = {} as SpeechSynthesisUtterance;

    scheduleProblemOutput(
      seconds,
      delta,
      trial,
      nProblems,
      setTrial,
      callBackFunction,
      speech
    );
  });
});

/*
describe("first", () => {
  beforeAll(() => {
    global.window.speechSynthesis = {
      speak: jest.fn(),
    } as unknown as SpeechSynthesis;
  });

  afterAll(() => {
    global.window.speechSynthesis = {} as unknown as SpeechSynthesis;
  });

  it("should run", () => {
    const seconds = 5;
    const delta = 5;
    const trial = 0;
    const nProblems = 1;
    const setTrial = jest.fn();
    const callBackFunction = jest.fn();
    const speech = {} as SpeechSynthesisUtterance;

    scheduleProblemOutput(
      seconds,
      delta,
      trial,
      nProblems,
      setTrial,
      callBackFunction,
      speech
    );
  });
});
*/
