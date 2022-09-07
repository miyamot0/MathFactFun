import { useEffect, useRef } from "react";
import { StudentDataInterface } from "../../../firebase/types/GeneralTypes";
import { FactsOnFire } from "../../../maths/Mind";
import { GetOperatorFromLabel } from "../../../utilities/LabelHelper";
import { BenchmarkActions, BenchmarkState } from "../types/InterventionTypes";

export const DelCode = "Del";

/** getCoreProblemSet
 *
 * Pull to appropriate problem type from MIND
 *
 * @param {string} target target for probes
 * @returns {string[][]}
 */
export function getCoreProblemSet(target: string): string[][] {
  switch (target) {
    case "Addition":
      return FactsOnFire.Addition;
    case "Subtraction":
      return FactsOnFire.Subtraction;
    case "Division":
      return FactsOnFire.Division;
    case "Multiplication":
      return FactsOnFire.Multiplication;
    default:
      return FactsOnFire.Addition;
  }
}

/** getSetFromArray
 *
 * Pull the appropriate subset of problems from MIND
 *
 * @param {string[][]} array mass array of MIND problem sets
 * @param {string} set set tag
 * @returns {string[]}
 */
export function getSetFromArray(array: string[][], set: string): string[] {
  let start = 0;
  let end = 5;

  if (set === "B") {
    start = 6;
    end = 11;
  }

  if (set === "C") {
    start = 12;
    end = 17;
  }

  let problems: string[][] = array.slice(start, end);

  return problems.reduce(
    (accumulator, value) => accumulator.concat(value),
    [] as string[]
  );

  //return [].concat.apply([], array.slice(start, end));
}

/** getUniqueProblems
 *
 * Filter out reciprocals, per BP
 *
 * @param {string[]} arrayProblems array of problems
 * @param {string} operatorSymbol operator symbol, for parsing
 * @returns {string[]}
 */
export function getUniqueProblems(
  arrayProblems: string[],
  operatorSymbol: string
) {
  const firstWave = [...new Set(arrayProblems)];
  let secondWave = [...new Set(arrayProblems)];

  let probsToRemove: string[] = [];

  // First as truth
  firstWave.forEach((problem) => {
    const probA = problem.split("=")[0];

    // Two nums
    const numsA = probA.split(operatorSymbol);

    if (probsToRemove.includes(problem)) return;

    secondWave.forEach((otherProblem) => {
      // Skip matching conditions
      if (problem === otherProblem) return;

      const probB = otherProblem.split("=")[0];
      const numsB = probB.split(operatorSymbol);

      // its a reciprocal
      if (numsA[0] === numsB[1] && numsA[1] === numsB[0]) {
        probsToRemove.push(otherProblem);
      }
    });
  });

  secondWave = secondWave.filter((value, i) => !probsToRemove.includes(value));

  return secondWave;
}

export function loadWorkingDataBenchmark(
  document: StudentDataInterface,
  target: string
) {
  const targetTrim = target!.split("-")[0];
  const coreItems = getCoreProblemSet(targetTrim);
  const coreSet = getSetFromArray(coreItems, document.problemSet!);

  return getUniqueProblems(coreSet, GetOperatorFromLabel(targetTrim));
}

/** useEventListener
 *
 * listener for events
 *
 * @param {string} eventName ...
 * @param {(key: React.KeyboardEvent<HTMLElement>) => void} handler ...
 * @param {Window} element ...
 */
export function useEventListener(
  eventName: string,
  handler: (key: React.KeyboardEvent<HTMLElement>) => void,
  element: Window = window
): void {
  const savedHandler = useRef({});
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);
  useEffect(
    () => {
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;

      const eventListener = (event: any) => {
        if (typeof savedHandler.current === "function") {
          savedHandler.current(event);
        }
      };

      element.addEventListener(eventName, eventListener);

      return () => {
        element.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element] // Re-run if eventName or element changes
  );
}

export const InitialBenchmarkState: BenchmarkState = {
  ViewRepresentationInternal: "",
  EntryRepresentationInternal: "",
  OperatorSymbol: "",
  ButtonText: "Start",
  CurrentAction: "ActionSequence.Start",
  WorkingData: [],
  SecondsLeft: 0,
  LoadedData: false,
  CoverProblemItem: false,
  FactModelList: [],
  StartTime: null,
  PreTrialTime: null,
  OnInitialTry: true,
  NumCorrectInitial: 0,
  NumErrors: 0,
  TotalDigits: 0,
  TotalDigitsCorrect: 0,
  NumbTrials: 0,
  NumRetries: 0,
  ModalIsOpen: false,
};

/**
 * Reducer for submission
 *
 * @param {BenchmarkState} state
 * @param {any} action
 * @returns {BenchmarkState}
 */
export const InterventionReducer = (
  state: BenchmarkState,
  action: any
): BenchmarkState => {
  switch (action.type) {
    case BenchmarkActions.BenchmarkUpdateEntry:
      return { ...state, EntryRepresentationInternal: action.payload };
    case BenchmarkActions.BenchmarkBatchStartPreflight:
      return {
        ...state,
        WorkingData: action.payload.uWorkingData,
        SecondsLeft: action.payload.uTimer,
        LoadedData: action.payload.uLoadedData,
      };
    case BenchmarkActions.BenchmarkBatchStartBegin:
      return {
        ...state,
        ButtonText: action.payload.ButtonText,
        CoverProblemItem: action.payload.CoverProblem,
        EntryRepresentationInternal: action.payload.UpdateEntry,
        ViewRepresentationInternal: action.payload.UpdateView,
        WorkingData: action.payload.WorkingData,
        StartTime: action.payload.StartTime,
        PreTrialTime: action.payload.TrialTime,
        CurrentAction: action.payload.CurrentAction,
      };
    case BenchmarkActions.BenchmarkBatchStartIncrement:
      return {
        ...state,
        NumCorrectInitial: action.payload.uNumberCorrectInitial,
        NumErrors: action.payload.uNumberErrors,
        TotalDigits: action.payload.uTotalDigits,
        TotalDigitsCorrect: action.payload.uTotalDigitsCorrect,
        NumbTrials: action.payload.uNumberTrials,
        OnInitialTry: action.payload.uInitialTry,
        PreTrialTime: action.payload.uTrialTime,
      };
    case BenchmarkActions.BenchmarkBatchStartIncrementPost:
      return {
        ...state,
        FactModelList: action.payload.uFactModel,
        WorkingData: action.payload.uWorkingData,
        ViewRepresentationInternal: action.payload.uView,
        EntryRepresentationInternal: action.payload.uEntry,
      };

    default:
      throw new Error();
  }
};
