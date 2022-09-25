/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import firebase from "firebase";
import { FirestoreState } from "../../../../firebase/interfaces/FirebaseInterfaces";
import { ErrorHandling, InterventionFormat } from "../../../../maths/Facts";
import { FactsOnFire } from "../../../../maths/Mind";
import { FactDataInterface } from "../../../setcreator/interfaces/SetCreatorInterfaces";
import { StudentDataInterface } from "../../../student/interfaces/StudentInterfaces";
import {
  InitialInterventionState,
  SharedActionSequence,
} from "../../functionality/InterventionBehavior";
import { InterventionState } from "../../interfaces/InterventionInterfaces";
import {
  checkLiNullUndefinedBlank,
  DetermineErrorCorrection,
  getCoreProblemSet,
  getSetFromArray,
  getUniqueProblems,
  loadWorkingDataBenchmark,
  sharedButtonActionSequence,
  shouldShowFeedback,
  submitPerformancesToFirebase,
} from "../InterventionHelpers";
import * as DispatchHelpers from "./../DispatchingHelpers";

describe("DetermineErrorCorrection", () => {
  it("ErrorHandling.Never should return false", () => {
    const errorDetected = true;
    const setting = ErrorHandling.Never;

    const result = DetermineErrorCorrection(errorDetected, setting);

    expect(result).toBe(false);
  });

  it("ErrorHandling.EveryTime should return true", () => {
    const errorDetected = true;
    const setting = ErrorHandling.EveryTime;

    const result = DetermineErrorCorrection(errorDetected, setting);

    expect(result).toBe(true);
  });

  it("ErrorHandling.ThrowError should return false", () => {
    const errorDetected = true;
    const setting = ErrorHandling.ThrowError;

    const result = DetermineErrorCorrection(errorDetected, setting);

    expect(result).toBe(false);
  });
});

describe("shouldShowFeedback", () => {
  it("ErrorHandling.Never should return false", () => {
    const errorDetected = true;

    const setting = ErrorHandling.Never;

    const document = {
      currentErrorApproach: setting,
    } as StudentDataInterface;

    const result = shouldShowFeedback(errorDetected, document);

    expect(result).toBe(false);
  });

  it("ErrorHandling.EveryTime should return true", () => {
    const errorDetected = true;
    const setting = ErrorHandling.EveryTime;

    const document = {
      currentErrorApproach: setting,
    } as StudentDataInterface;

    const result = shouldShowFeedback(errorDetected, document);

    expect(result).toBe(true);
  });

  it("ErrorHandling.ThrowError should return false", () => {
    const errorDetected = true;
    const setting = ErrorHandling.ThrowError;

    const document = {
      currentErrorApproach: setting,
    } as StudentDataInterface;

    const result = shouldShowFeedback(errorDetected, document);

    expect(result).toBe(false);
  });
});

describe("checkLiNullUndefinedBlank", () => {
  it("Should return true: null", () => {
    const value = null;
    const result = checkLiNullUndefinedBlank(value as unknown as string);
    expect(result).toBe(true);
  });

  it("Should return true: undefined", () => {
    const value = undefined;
    const result = checkLiNullUndefinedBlank(value as unknown as string);
    expect(result).toBe(true);
  });

  it("Should return true: empty", () => {
    const value = "";
    const result = checkLiNullUndefinedBlank(value);
    expect(result).toBe(true);
  });

  it("Should return false: valid string", () => {
    const value = "string";
    const result = checkLiNullUndefinedBlank(value);
    expect(result).toBe(false);
  });
});

describe("getCoreProblemSet", () => {
  it("Should return accurate set: Addition", () => {
    const value = "Addition";
    const result = getCoreProblemSet(value);
    expect(result).toStrictEqual(FactsOnFire.Addition);
  });
  it("Should return accurate set: Subtraction", () => {
    const value = "Subtraction";
    const result = getCoreProblemSet(value);
    expect(result).toStrictEqual(FactsOnFire.Subtraction);
  });
  it("Should return accurate set: Division", () => {
    const value = "Division";
    const result = getCoreProblemSet(value);
    expect(result).toStrictEqual(FactsOnFire.Division);
  });
  it("Should return accurate set: Multiplication", () => {
    const value = "Multiplication";
    const result = getCoreProblemSet(value);
    expect(result).toStrictEqual(FactsOnFire.Multiplication);
  });

  it("Should throw error: bad target", () => {
    const value = "asdf";

    expect(() => getCoreProblemSet(value)).toThrow(
      Error("Target for problem set missing")
    );
  });
});

describe("getSetFromArray", () => {
  const target = "Addition";
  const coreItems = getCoreProblemSet(target);
  const problemSet = "A";
  const coreSet = getSetFromArray(coreItems, problemSet);

  it("Should return accurate set: A", () => {
    const start = 0,
      end = 5;
    const problems: string[][] = coreItems.slice(start, end);

    const result = problems.reduce(
      (accumulator, value) => accumulator.concat(value),
      [] as string[]
    );

    expect(getSetFromArray(coreItems, "A")).toStrictEqual(result);
  });
  it("Should return accurate set: B", () => {
    const start = 6,
      end = 11;
    const problems: string[][] = coreItems.slice(start, end);

    const result = problems.reduce(
      (accumulator, value) => accumulator.concat(value),
      [] as string[]
    );

    expect(getSetFromArray(coreItems, "B")).toStrictEqual(result);
  });
  it("Should return accurate set: C", () => {
    const start = 12,
      end = 17;
    const problems: string[][] = coreItems.slice(start, end);

    const result = problems.reduce(
      (accumulator, value) => accumulator.concat(value),
      [] as string[]
    );

    expect(getSetFromArray(coreItems, "C")).toStrictEqual(result);
  });
});

describe("getUniqueProblems", () => {
  it("Should return unique sets: Addition", () => {
    const problems = ["1+2=3", "2+1=3", "2+2=4"];
    const result = getUniqueProblems(problems, "+");

    expect(result).toStrictEqual(["1+2=3", "2+2=4"]);
  });

  it("Should return unique sets: Subtraction", () => {
    const problems = ["3-1=2", "2-1=1", "3-1=2"];
    const result = getUniqueProblems(problems, "-");

    expect(result).toStrictEqual(["3-1=2", "2-1=1"]);
  });

  // TODO: add in division/multiplication
});

describe("loadWorkingDataBenchmark", () => {
  it("Should return unique sets: Addition", () => {
    const student = { problemSet: "A" } as StudentDataInterface;
    const target = "Addition";

    const result = loadWorkingDataBenchmark(student, target);

    expect(result).toStrictEqual([
      "9+8=17",
      "5+3=8",
      "6+9=15",
      "3+3=6",
      "6+7=13",
      "9+4=13",
      "5+2=7",
      "3+8=11",
      "7+7=14",
      "6+5=11",
      "4+4=8",
      "2+8=10",
    ]);
  });

  // TODO: add for other operations as well
});

/*
TODO Remove once TP is updated
describe("keyHandler", () => {
  it("Number key: trigger key cb but not button callback", () => {
    const currentAction = SharedActionSequence.Start;
    const mockKeyCallback = jest.fn((char: string) => {});
    const mockButtonCallback = jest.fn(() => {});

    const key = {
      key: "1",
    } as React.KeyboardEvent<HTMLElement>;

    keyHandler(key, mockKeyCallback, mockButtonCallback, currentAction);

    expect(mockKeyCallback).toBeCalledTimes(1);
    expect(mockButtonCallback).toBeCalledTimes(0);
  });

  it("Space key: trigger button cb but not key callback", () => {
    const currentAction = SharedActionSequence.CoverCopy;
    const mockKeyCallback = jest.fn((char: string) => {});
    const mockButtonCallback = jest.fn(() => {});

    const key = {
      key: "1",
    } as React.KeyboardEvent<HTMLElement>;

    keyHandler(key, mockKeyCallback, mockButtonCallback, currentAction);

    expect(mockKeyCallback).toBeCalledTimes(0);
    expect(mockButtonCallback).toBeCalledTimes(1);
  });

  it("Unrelated key: trigger neither callback", () => {
    const currentAction = SharedActionSequence.Start;
    const mockKeyCallback = jest.fn((char: string) => {});
    const mockButtonCallback = jest.fn(() => {});

    const key = {
      key: "t",
    } as React.KeyboardEvent<HTMLElement>;

    keyHandler(key, mockKeyCallback, mockButtonCallback, currentAction);

    expect(mockKeyCallback).toBeCalledTimes(0);
    expect(mockButtonCallback).toBeCalledTimes(0);
  });
});
*/

describe("sharedButtonActionSequence", () => {
  const user = { uid: "456" } as firebase.User;
  const id = "123";
  const document = { id: "123" } as StudentDataInterface;
  const state: InterventionState = {
    ...InitialInterventionState,
    //WorkingData: ["1+1=2:123123123"],
  };
  const response = {} as FirestoreState;

  it("Should route correctly based on approach identified: CCC", () => {
    const openModal = jest.fn();
    const addDocument = jest.fn();
    const updateDocument = jest.fn();
    const history = jest.fn();
    const dispatch = jest.fn();

    const target = "Addition-Sums to 18";

    const result = sharedButtonActionSequence(
      user,
      id,
      target,
      InterventionFormat.CoverCopyCompare,
      document,
      state,
      openModal,
      addDocument,
      updateDocument,
      response,
      history,
      dispatch
    );

    const docMock1 = jest.spyOn(DispatchHelpers, "coverCopyCompareSequence");
    const mockedFunctionCC = jest.fn(
      (
        user,
        id,
        target,
        InterventionFormat,
        document,
        state,
        openModal,
        addDocument,
        updateDocument,
        response,
        history,
        dispatch
      ) => true
    );
    docMock1.mockImplementation(() =>
      mockedFunctionCC(
        user,
        id,
        target,
        InterventionFormat.CoverCopyCompare,
        document,
        state,
        openModal,
        addDocument,
        updateDocument,
        response,
        history,
        dispatch
      )
    );

    const docMock2 = jest.spyOn(DispatchHelpers, "explicitTimingSequence");
    const mockedFunctionET = jest.fn(
      (
        user,
        id,
        target,
        InterventionFormat,
        document,
        state,
        openModal,
        addDocument,
        updateDocument,
        response,
        history,
        dispatch
      ) => true
    );
    docMock2.mockImplementation(() =>
      mockedFunctionET(
        user,
        id,
        target,
        InterventionFormat.ExplicitTiming,
        document,
        state,
        openModal,
        addDocument,
        updateDocument,
        response,
        history,
        dispatch
      )
    );

    sharedButtonActionSequence(
      user,
      id,
      target,
      InterventionFormat.CoverCopyCompare,
      document,
      state,
      openModal,
      addDocument,
      updateDocument,
      response,
      history,
      dispatch
    );

    expect(mockedFunctionCC).toBeCalled();
    expect(mockedFunctionET).not.toBeCalled();
  });

  it("Should route correctly based on approach identified: ET", () => {
    const openModal = jest.fn();
    const addDocument = jest.fn();
    const updateDocument = jest.fn();
    const history = jest.fn();
    const dispatch = jest.fn();

    const target = "Addition-Sums to 18";

    const docMock1 = jest.spyOn(DispatchHelpers, "coverCopyCompareSequence");
    const mockedFunctionCC = jest.fn(
      (
        user,
        id,
        target,
        InterventionFormat,
        document,
        state,
        openModal,
        addDocument,
        updateDocument,
        response,
        history,
        dispatch
      ) => true
    );
    docMock1.mockImplementation(() =>
      mockedFunctionCC(
        user,
        id,
        target,
        InterventionFormat.CoverCopyCompare,
        document,
        state,
        openModal,
        addDocument,
        updateDocument,
        response,
        history,
        dispatch
      )
    );

    const docMock2 = jest.spyOn(DispatchHelpers, "explicitTimingSequence");
    const mockedFunctionET = jest.fn(
      (
        user,
        id,
        target,
        InterventionFormat,
        document,
        state,
        openModal,
        addDocument,
        updateDocument,
        response,
        history,
        dispatch
      ) => true
    );
    docMock2.mockImplementation(() =>
      mockedFunctionET(
        user,
        id,
        target,
        InterventionFormat.ExplicitTiming,
        document,
        state,
        openModal,
        addDocument,
        updateDocument,
        response,
        history,
        dispatch
      )
    );

    sharedButtonActionSequence(
      user,
      id,
      target,
      InterventionFormat.ExplicitTiming,
      document,
      state,
      openModal,
      addDocument,
      updateDocument,
      response,
      history,
      dispatch
    );

    expect(mockedFunctionCC).not.toBeCalled();
    expect(mockedFunctionET).toBeCalled();
  });

  it("Should throw if no user", () => {
    const openModal = jest.fn();
    const addDocument = jest.fn();
    const updateDocument = jest.fn();
    const history = jest.fn();
    const dispatch = jest.fn();

    const target = "Addition-Sums to 18";

    expect(() =>
      sharedButtonActionSequence(
        null as unknown as firebase.User,
        id,
        target,
        InterventionFormat.ExplicitTiming,
        document,
        state,
        openModal,
        addDocument,
        updateDocument,
        response,
        history,
        dispatch
      )
    ).toThrowError(Error("Document or user is null"));
  });

  it("Should throw if no user", () => {
    const openModal = jest.fn();
    const addDocument = jest.fn();
    const updateDocument = jest.fn();
    const history = jest.fn();
    const dispatch = jest.fn();

    const target = "Addition-Sums to 18";

    expect(() =>
      sharedButtonActionSequence(
        user,
        id,
        target,
        InterventionFormat.ExplicitTiming,
        null as unknown as StudentDataInterface,
        state,
        openModal,
        addDocument,
        updateDocument,
        response,
        history,
        dispatch
      )
    ).toThrowError(Error("Document or user is null"));
  });

  it("Should throw if invalid route", () => {
    const openModal = jest.fn();
    const addDocument = jest.fn();
    const updateDocument = jest.fn();
    const history = jest.fn();
    const dispatch = jest.fn();

    const target = "Addition-Sums to 18";

    expect(() =>
      sharedButtonActionSequence(
        user,
        id,
        target,
        "asdf",
        document,
        state,
        openModal,
        addDocument,
        updateDocument,
        response,
        history,
        dispatch
      )
    ).toThrowError(Error("No routing information supplied"));
  });

  // TODO: add for other intervention
});

describe("submitPerformancesToFirebase", () => {
  const user = { uid: "456" } as firebase.User;
  const id = "123";
  const document = {
    id: "123",
    currentTarget: "Addition",
    factsTargeted: ["1+1=2"],
  } as StudentDataInterface;

  const target = "Addition-Sums to 18";

  const state: InterventionState = {
    ...InitialInterventionState,
    TotalDigitsCorrect: 1,
    NumErrors: 0,
    NumRetries: 0,
    TotalDigits: 1,
    FactModelList: [
      {
        // Bools
        factCorrect: true,
        initialTry: true,

        // Strings
        factType: "Addition",
        factString: "1+1=2",
        factEntry: "1+1=2",

        // Numerics
        latencySeconds: 1,

        // Timestamps
        dateTimeEnd: firebase.firestore.Timestamp.fromDate(new Date()),
        dateTimeStart: firebase.firestore.Timestamp.fromDate(new Date()),
      },
    ] as FactDataInterface[],
    StartTime: new Date(),
    //WorkingData: ["1+1=2:123123123"],
  };

  it("Should error out if missing user, doc, or id", () => {
    const addDocument = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve());
    const updateDocument = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve());
    const history = { push: jest.fn() };
    const response = { error: null } as FirestoreState;

    submitPerformancesToFirebase({
      user: null as unknown as firebase.User,
      id: null as unknown as string,
      target,
      interventionFormat: InterventionFormat.CoverCopyCompare,
      finalFactObject: null,
      document,
      state,
      response,
      addDocument,
      updateDocument,
      history,
    });

    expect(addDocument).not.toBeCalled();
    expect(updateDocument).not.toBeCalled();
    expect(history.push).not.toBeCalled();
    expect(addDocument).not.toBeCalled();
  });

  it("Should pass if fields are defined, no added item at end", async () => {
    const addDocument = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve());
    const updateDocument = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve());
    const history = { push: jest.fn() };
    const response = { error: null } as FirestoreState;

    const result = await submitPerformancesToFirebase({
      user,
      id,
      target,
      interventionFormat: InterventionFormat.CoverCopyCompare,
      finalFactObject: null,
      document,
      state,
      response,
      addDocument,
      updateDocument,
      history,
    });

    expect(addDocument).toBeCalled();
    expect(updateDocument).toBeCalled();
    expect(history.push).toBeCalled();
  });

  it("Should pass if fields are defined, added item at end", async () => {
    const addDocument = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve());
    const updateDocument = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve());
    const history = { push: jest.fn() };
    const response = { error: null } as FirestoreState;

    const result = await submitPerformancesToFirebase({
      user,
      id,
      target,
      interventionFormat: InterventionFormat.CoverCopyCompare,
      finalFactObject: {
        // Bools
        factCorrect: true,
        initialTry: true,

        // Strings
        factType: "Addition",
        factString: "1+1=2",
        factEntry: "1+1=2",

        // Numerics
        latencySeconds: 1,

        // Timestamps
        dateTimeEnd: firebase.firestore.Timestamp.fromDate(new Date()),
        dateTimeStart: firebase.firestore.Timestamp.fromDate(new Date()),
      } as FactDataInterface,
      document,
      state,
      response,
      addDocument,
      updateDocument,
      history,
    });

    expect(addDocument).toBeCalled();
    expect(updateDocument).toBeCalled();
    expect(history.push).toBeCalled();
  });
});
