/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import firebase from "firebase";
import { FirestoreState } from "../../../../firebase/interfaces/FirebaseInterfaces";
import { InterventionFormat } from "../../../../maths/Facts";
import { StudentDataInterface } from "../../../student/interfaces/StudentInterfaces";
import {
  InitialInterventionState,
  SharedActionSequence,
} from "../../functionality/InterventionBehavior";
import { commonKeyListener } from "../KeyHandlingHelper";
import * as InteractionHelpers from "./../InteractionHelpers";
import * as DispatchHelpers from "./../DispatchingHelpers";
import { InterventionState } from "../../interfaces/InterventionInterfaces";

describe("commonKeyListener", () => {
  const state = InitialInterventionState;

  const target = "Addition-Sums to 18";

  it("Correct key routing based on intervention (1): CCC", () => {
    const key = { key: "1" } as React.KeyboardEvent<HTMLElement>;

    const docMock1 = jest.spyOn(DispatchHelpers, "commonKeyHandler");
    const mockCommonKeyHandler = jest.fn(() => true);
    docMock1.mockImplementation(() => mockCommonKeyHandler());

    const captureButtonAction = jest.fn();
    const captureItemClick = jest.fn();
    const openModal = jest.fn();
    const addDocument = jest.fn();
    const updateDocument = jest.fn();
    const dispatch = jest.fn();
    const response = { error: null } as FirestoreState;
    const history = { push: jest.fn() };

    const user = { uid: "456" } as firebase.User;
    const id = "123";

    const document = {} as StudentDataInterface;

    commonKeyListener({
      key,
      state,
      currentApproach: InterventionFormat.CoverCopyCompare,
      captureItemClick,
      user,
      id,
      target,
      document,
      openModal,
      addDocument,
      updateDocument,
      response,
      history,
      dispatch,
    });

    expect(mockCommonKeyHandler).toBeCalled();
    expect(captureButtonAction).not.toBeCalled();
    expect(captureItemClick).not.toBeCalled();
  });

  it("Correct key routing based on intervention (*): CCC", () => {
    const key = { key: "*" } as React.KeyboardEvent<HTMLElement>;

    const docMock1 = jest.spyOn(DispatchHelpers, "commonKeyHandler");
    const mockCommonKeyHandler = jest.fn(() => true);
    docMock1.mockImplementation(() => mockCommonKeyHandler());

    const captureButtonAction = jest.fn();
    const captureItemClick = jest.fn();
    const openModal = jest.fn();
    const addDocument = jest.fn();
    const updateDocument = jest.fn();
    const dispatch = jest.fn();
    const response = { error: null } as FirestoreState;
    const history = { push: jest.fn() };

    const user = { uid: "456" } as firebase.User;
    const id = "123";

    const document = {} as StudentDataInterface;

    commonKeyListener({
      key,
      state,
      currentApproach: InterventionFormat.CoverCopyCompare,
      captureItemClick,
      user,
      id,
      target,
      document,
      openModal,
      addDocument,
      updateDocument,
      response,
      history,
      dispatch,
    });

    expect(mockCommonKeyHandler).toBeCalled();
    expect(captureButtonAction).not.toBeCalled();
    expect(captureItemClick).not.toBeCalled();
  });

  it("Correct key routing based on intervention (Enter): CCC", () => {
    const key = { key: "Enter" } as React.KeyboardEvent<HTMLElement>;

    const docMock1 = jest.spyOn(DispatchHelpers, "commonKeyHandler");
    const mockCommonKeyHandler = jest.fn(() => true);
    docMock1.mockImplementation(() => mockCommonKeyHandler());

    const captureButtonAction = jest.fn();
    const captureItemClick = jest.fn();
    const openModal = jest.fn();
    const addDocument = jest.fn();
    const updateDocument = jest.fn();
    const dispatch = jest.fn();
    const response = { error: null } as FirestoreState;
    const history = { push: jest.fn() };

    const user = { uid: "456" } as firebase.User;
    const id = "123";

    const document = {} as StudentDataInterface;

    commonKeyListener({
      key,
      state,
      currentApproach: InterventionFormat.CoverCopyCompare,
      captureItemClick,
      user,
      id,
      target,
      document,
      openModal,
      addDocument,
      updateDocument,
      response,
      history,
      dispatch,
    });

    expect(mockCommonKeyHandler).toBeCalled();
    expect(captureButtonAction).not.toBeCalled();
    expect(captureItemClick).not.toBeCalled();
  });

  it("Correct key routing (Space, Entry) based on intervention: CCC", () => {
    const key = { key: " " } as React.KeyboardEvent<HTMLElement>;

    const docMock1 = jest.spyOn(DispatchHelpers, "commonKeyHandler");
    const mockCommonKeyHandler = jest.fn(() => true);
    docMock1.mockImplementation(() => mockCommonKeyHandler());

    const captureButtonAction = jest.fn();
    const captureItemClick = jest.fn();
    const openModal = jest.fn();
    const addDocument = jest.fn();
    const updateDocument = jest.fn();
    const dispatch = jest.fn();
    const response = { error: null } as FirestoreState;
    const history = { push: jest.fn() };

    const user = { uid: "456" } as firebase.User;
    const id = "123";

    const document = {} as StudentDataInterface;

    const state2 = {
      ...state,
      CurrentAction: SharedActionSequence.Entry,
      NextLiItem: undefined,
    } as InterventionState;

    commonKeyListener({
      key,
      state: state2,
      currentApproach: InterventionFormat.CoverCopyCompare,
      captureItemClick,
      user,
      id,
      target,
      document,
      openModal,
      addDocument,
      updateDocument,
      response,
      history,
      dispatch,
    });

    // TODO: explore why this is true
    expect(mockCommonKeyHandler).not.toBeCalled();
    expect(captureButtonAction).not.toBeCalled();
    expect(captureItemClick).not.toBeCalled();
  });

  it("Correct key routing (Backspace) based on intervention: CCC", () => {
    const key = { key: "Backspace" } as React.KeyboardEvent<HTMLElement>;

    const docMock1 = jest.spyOn(DispatchHelpers, "commonKeyHandler");
    const mockCommonKeyHandler = jest.fn(() => true);
    docMock1.mockImplementation(() => mockCommonKeyHandler());

    const captureButtonAction = jest.fn();
    const captureItemClick = jest.fn();
    const openModal = jest.fn();
    const addDocument = jest.fn();
    const updateDocument = jest.fn();
    const dispatch = jest.fn();
    const response = { error: null } as FirestoreState;
    const history = { push: jest.fn() };

    const user = { uid: "456" } as firebase.User;
    const id = "123";

    const document = {} as StudentDataInterface;

    const state2 = {
      ...state,
      CurrentAction: SharedActionSequence.Start,
      NextLiItem: undefined,
    } as InterventionState;

    commonKeyListener({
      key,
      state: state2,
      currentApproach: InterventionFormat.CoverCopyCompare,
      captureItemClick,
      user,
      id,
      target,
      document,
      openModal,
      addDocument,
      updateDocument,
      response,
      history,
      dispatch,
    });

    expect(mockCommonKeyHandler).toBeCalled();
    expect(captureButtonAction).not.toBeCalled();
    expect(captureItemClick).not.toBeCalled();
  });

  it("Correct key routing (Delete) based on intervention: CCC", () => {
    const key = { key: "Delete" } as React.KeyboardEvent<HTMLElement>;

    const docMock1 = jest.spyOn(DispatchHelpers, "commonKeyHandler");
    const mockCommonKeyHandler = jest.fn(() => true);
    docMock1.mockImplementation(() => mockCommonKeyHandler());

    const captureButtonAction = jest.fn();
    const captureItemClick = jest.fn();
    const openModal = jest.fn();
    const addDocument = jest.fn();
    const updateDocument = jest.fn();
    const dispatch = jest.fn();
    const response = { error: null } as FirestoreState;
    const history = { push: jest.fn() };

    const user = { uid: "456" } as firebase.User;
    const id = "123";

    const document = {} as StudentDataInterface;

    const state2 = {
      ...state,
      CurrentAction: SharedActionSequence.Start,
      NextLiItem: undefined,
    } as InterventionState;

    commonKeyListener({
      key,
      state: state2,
      currentApproach: InterventionFormat.CoverCopyCompare,
      captureItemClick,
      user,
      id,
      target,
      document,
      openModal,
      addDocument,
      updateDocument,
      response,
      history,
      dispatch,
    });

    expect(mockCommonKeyHandler).toBeCalled();
    expect(captureButtonAction).not.toBeCalled();
    expect(captureItemClick).not.toBeCalled();
  });

  it("Correct key routing (Space, CC) based on intervention: CCC", () => {
    const key = { key: " " } as React.KeyboardEvent<HTMLElement>;

    const docMock1 = jest.spyOn(DispatchHelpers, "commonKeyHandler");
    const mockCommonKeyHandler = jest.fn(() => true);
    docMock1.mockImplementation(() => mockCommonKeyHandler());

    const captureButtonAction = jest.fn();
    const captureItemClick = jest.fn();
    const openModal = jest.fn();
    const addDocument = jest.fn();
    const updateDocument = jest.fn();
    const dispatch = jest.fn();
    const response = { error: null } as FirestoreState;
    const history = { push: jest.fn() };

    const user = { uid: "456" } as firebase.User;
    const id = "123";

    const document = {} as StudentDataInterface;

    const state2 = {
      ...state,
      CurrentAction: SharedActionSequence.CoverCopy,
      NextLiItem: undefined,
    } as InterventionState;

    commonKeyListener({
      key,
      state: state2,
      currentApproach: InterventionFormat.CoverCopyCompare,
      captureItemClick,
      user,
      id,
      target,
      document,
      openModal,
      addDocument,
      updateDocument,
      response,
      history,
      dispatch,
    });

    expect(mockCommonKeyHandler).not.toBeCalled();
    expect(captureButtonAction).not.toBeCalled();
    expect(captureItemClick).not.toBeCalled();
  });

  it("Correct key routing (Space, CC) based on intervention, has li item: CCC", () => {
    const key = { key: " " } as React.KeyboardEvent<HTMLElement>;

    const docMock1 = jest.spyOn(DispatchHelpers, "commonKeyHandler");
    const mockCommonKeyHandler = jest.fn(() => true);
    docMock1.mockImplementation(() => mockCommonKeyHandler());

    const captureButtonAction = jest.fn();
    const captureItemClick = jest.fn();
    const openModal = jest.fn();
    const addDocument = jest.fn();
    const updateDocument = jest.fn();
    const dispatch = jest.fn();
    const response = { error: null } as FirestoreState;
    const history = { push: jest.fn() };

    const user = { uid: "456" } as firebase.User;
    const id = "123";

    const document = {} as StudentDataInterface;

    const state2 = {
      ...state,
      CurrentAction: SharedActionSequence.Entry,
      EntryRepresentationInternal: "1+2=4",
      ViewRepresentationInternal: "1+2=3",
      NextLiItem: "1+5=6",
    } as InterventionState;

    commonKeyListener({
      key,
      state: state2,
      currentApproach: InterventionFormat.CoverCopyCompare,
      captureItemClick,
      user,
      id,
      target,
      document,
      openModal,
      addDocument,
      updateDocument,
      response,
      history,
      dispatch,
    });

    expect(mockCommonKeyHandler).not.toBeCalled();
    expect(captureButtonAction).not.toBeCalled();
    expect(captureItemClick).toBeCalled();
  });

  it("Unexpected key routing (Space, CC) based on intervention: CCC", () => {
    const key = { key: "p" } as React.KeyboardEvent<HTMLElement>;

    const docMock1 = jest.spyOn(DispatchHelpers, "commonKeyHandler");
    const mockCommonKeyHandler = jest.fn(() => true);
    docMock1.mockImplementation(() => mockCommonKeyHandler());

    const captureButtonAction = jest.fn();
    const captureItemClick = jest.fn();
    const openModal = jest.fn();
    const addDocument = jest.fn();
    const updateDocument = jest.fn();
    const dispatch = jest.fn();
    const response = { error: null } as FirestoreState;
    const history = { push: jest.fn() };

    const user = { uid: "456" } as firebase.User;
    const id = "123";

    const document = {} as StudentDataInterface;

    const state2 = {
      ...state,
      CurrentAction: SharedActionSequence.CoverCopy,
      NextLiItem: undefined,
    } as InterventionState;

    commonKeyListener({
      key,
      state: state2,
      currentApproach: InterventionFormat.CoverCopyCompare,
      captureItemClick,
      user,
      id,
      target,
      document,
      openModal,
      addDocument,
      updateDocument,
      response,
      history,
      dispatch,
    });

    expect(mockCommonKeyHandler).not.toBeCalled();
    expect(captureButtonAction).not.toBeCalled();
    expect(captureItemClick).not.toBeCalled();
  });

  it("Correct key routing based on intervention (1): ET", () => {
    const key = { key: "1" } as React.KeyboardEvent<HTMLElement>;

    const docMock1 = jest.spyOn(DispatchHelpers, "commonKeyHandler");
    const mockCommonKeyHandler = jest.fn(() => true);
    docMock1.mockImplementation(() => mockCommonKeyHandler());

    const captureButtonAction = jest.fn();
    const captureItemClick = jest.fn();
    const openModal = jest.fn();
    const addDocument = jest.fn();
    const updateDocument = jest.fn();
    const dispatch = jest.fn();
    const response = { error: null } as FirestoreState;
    const history = { push: jest.fn() };

    const user = { uid: "456" } as firebase.User;
    const id = "123";

    const document = {} as StudentDataInterface;

    commonKeyListener({
      key,
      state,
      currentApproach: InterventionFormat.ExplicitTiming,
      captureItemClick,
      user,
      id,
      target,
      document,
      openModal,
      addDocument,
      updateDocument,
      response,
      history,
      dispatch,
    });

    expect(mockCommonKeyHandler).toBeCalled();
    expect(captureButtonAction).not.toBeCalled();
    expect(captureItemClick).not.toBeCalled();
  });

  it("Correct key routing based on intervention (*): ET", () => {
    const key = { key: "*" } as React.KeyboardEvent<HTMLElement>;

    const docMock1 = jest.spyOn(DispatchHelpers, "commonKeyHandler");
    const mockCommonKeyHandler = jest.fn(() => true);
    docMock1.mockImplementation(() => mockCommonKeyHandler());

    const captureButtonAction = jest.fn();
    const captureItemClick = jest.fn();
    const openModal = jest.fn();
    const addDocument = jest.fn();
    const updateDocument = jest.fn();
    const dispatch = jest.fn();
    const response = { error: null } as FirestoreState;
    const history = { push: jest.fn() };

    const user = { uid: "456" } as firebase.User;
    const id = "123";

    const document = {} as StudentDataInterface;

    commonKeyListener({
      key,
      state,
      currentApproach: InterventionFormat.ExplicitTiming,
      captureItemClick,
      user,
      id,
      target,
      document,
      openModal,
      addDocument,
      updateDocument,
      response,
      history,
      dispatch,
    });

    expect(mockCommonKeyHandler).toBeCalled();
    expect(captureButtonAction).not.toBeCalled();
    expect(captureItemClick).not.toBeCalled();
  });

  it("Correct key routing based on intervention (Enter): ET", () => {
    const key = { key: "Enter" } as React.KeyboardEvent<HTMLElement>;

    const docMock1 = jest.spyOn(DispatchHelpers, "commonKeyHandler");
    const mockCommonKeyHandler = jest.fn(() => true);
    docMock1.mockImplementation(() => mockCommonKeyHandler());

    const captureButtonAction = jest.fn();
    const captureItemClick = jest.fn();
    const openModal = jest.fn();
    const addDocument = jest.fn();
    const updateDocument = jest.fn();
    const dispatch = jest.fn();
    const response = { error: null } as FirestoreState;
    const history = { push: jest.fn() };

    const user = { uid: "456" } as firebase.User;
    const id = "123";

    const document = {} as StudentDataInterface;

    commonKeyListener({
      key,
      state,
      currentApproach: InterventionFormat.ExplicitTiming,
      captureItemClick,
      user,
      id,
      target,
      document,
      openModal,
      addDocument,
      updateDocument,
      response,
      history,
      dispatch,
    });

    expect(mockCommonKeyHandler).not.toBeCalled();
    expect(captureButtonAction).not.toBeCalled();
    expect(captureItemClick).not.toBeCalled();
  });

  it("Correct key routing (Space, Entry) based on intervention: ET", () => {
    const key = { key: " " } as React.KeyboardEvent<HTMLElement>;

    const docMock1 = jest.spyOn(DispatchHelpers, "commonKeyHandler");
    const mockCommonKeyHandler = jest.fn(() => true);
    docMock1.mockImplementation(() => mockCommonKeyHandler());

    const captureButtonAction = jest.fn();
    const captureItemClick = jest.fn();
    const openModal = jest.fn();
    const addDocument = jest.fn();
    const updateDocument = jest.fn();
    const dispatch = jest.fn();
    const response = { error: null } as FirestoreState;
    const history = { push: jest.fn() };

    const user = { uid: "456" } as firebase.User;
    const id = "123";

    const document = {} as StudentDataInterface;

    const state2 = {
      ...state,
      CurrentAction: SharedActionSequence.Entry,
      NextLiItem: undefined,
    } as InterventionState;

    commonKeyListener({
      key,
      state: state2,
      currentApproach: InterventionFormat.ExplicitTiming,
      captureItemClick,
      user,
      id,
      target,
      document,
      openModal,
      addDocument,
      updateDocument,
      response,
      history,
      dispatch,
    });

    expect(mockCommonKeyHandler).not.toBeCalled();
    expect(captureButtonAction).not.toBeCalled();
    expect(captureItemClick).not.toBeCalled();
  });

  it("Correct key routing (Backspace) based on intervention: ET", () => {
    const key = { key: "Backspace" } as React.KeyboardEvent<HTMLElement>;

    const docMock1 = jest.spyOn(DispatchHelpers, "commonKeyHandler");
    const mockCommonKeyHandler = jest.fn(() => true);
    docMock1.mockImplementation(() => mockCommonKeyHandler());

    const captureButtonAction = jest.fn();
    const captureItemClick = jest.fn();
    const openModal = jest.fn();
    const addDocument = jest.fn();
    const updateDocument = jest.fn();
    const dispatch = jest.fn();
    const response = { error: null } as FirestoreState;
    const history = { push: jest.fn() };

    const user = { uid: "456" } as firebase.User;
    const id = "123";

    const document = {} as StudentDataInterface;

    const state2 = {
      ...state,
      CurrentAction: SharedActionSequence.Start,
      NextLiItem: undefined,
    } as InterventionState;

    commonKeyListener({
      key,
      state: state2,
      currentApproach: InterventionFormat.ExplicitTiming,
      captureItemClick,
      user,
      id,
      target,
      document,
      openModal,
      addDocument,
      updateDocument,
      response,
      history,
      dispatch,
    });

    expect(mockCommonKeyHandler).toBeCalled();
    expect(captureButtonAction).not.toBeCalled();
    expect(captureItemClick).not.toBeCalled();
  });

  it("Correct key routing (Delete) based on intervention: ET", () => {
    const key = { key: "Delete" } as React.KeyboardEvent<HTMLElement>;

    const docMock1 = jest.spyOn(DispatchHelpers, "commonKeyHandler");
    const mockCommonKeyHandler = jest.fn(() => true);
    docMock1.mockImplementation(() => mockCommonKeyHandler());

    const captureButtonAction = jest.fn();
    const captureItemClick = jest.fn();
    const openModal = jest.fn();
    const addDocument = jest.fn();
    const updateDocument = jest.fn();
    const dispatch = jest.fn();
    const response = { error: null } as FirestoreState;
    const history = { push: jest.fn() };

    const user = { uid: "456" } as firebase.User;
    const id = "123";

    const document = {} as StudentDataInterface;

    const state2 = {
      ...state,
      CurrentAction: SharedActionSequence.Start,
      NextLiItem: undefined,
    } as InterventionState;

    commonKeyListener({
      key,
      state: state2,
      currentApproach: InterventionFormat.ExplicitTiming,
      captureItemClick,
      user,
      id,
      target,
      document,
      openModal,
      addDocument,
      updateDocument,
      response,
      history,
      dispatch,
    });

    expect(mockCommonKeyHandler).toBeCalled();
    expect(captureButtonAction).not.toBeCalled();
    expect(captureItemClick).not.toBeCalled();
  });

  it("Correct key routing (Space, ET) based on intervention: ET", () => {
    const key = { key: " " } as React.KeyboardEvent<HTMLElement>;

    const docMock1 = jest.spyOn(DispatchHelpers, "commonKeyHandler");
    const mockCommonKeyHandler = jest.fn(() => true);
    docMock1.mockImplementation(() => mockCommonKeyHandler());

    const captureButtonAction = jest.fn();
    const captureItemClick = jest.fn();
    const openModal = jest.fn();
    const addDocument = jest.fn();
    const updateDocument = jest.fn();
    const dispatch = jest.fn();
    const response = { error: null } as FirestoreState;
    const history = { push: jest.fn() };

    const user = { uid: "456" } as firebase.User;
    const id = "123";

    const document = {} as StudentDataInterface;

    const state2 = {
      ...state,
      CurrentAction: SharedActionSequence.Answer,
      NextLiItem: undefined,
      ViewRepresentationInternal: "1+1=2",
      EntryRepresentationInternal: "1+1=2",
    } as InterventionState;

    commonKeyListener({
      key,
      state: state2,
      currentApproach: InterventionFormat.ExplicitTiming,
      captureItemClick,
      user,
      id,
      target,
      document,
      openModal,
      addDocument,
      updateDocument,
      response,
      history,
      dispatch,
    });

    expect(mockCommonKeyHandler).not.toBeCalled();
    expect(captureButtonAction).not.toBeCalled();
    expect(captureItemClick).not.toBeCalled();
  });

  it("Correct key routing (=, ET) based on intervention: ET", () => {
    const key = { key: "=" } as React.KeyboardEvent<HTMLElement>;

    const docMock1 = jest.spyOn(DispatchHelpers, "commonKeyHandler");
    const mockCommonKeyHandler = jest.fn(() => true);
    docMock1.mockImplementation(() => mockCommonKeyHandler());

    const captureButtonAction = jest.fn();
    const captureItemClick = jest.fn();
    const openModal = jest.fn();
    const addDocument = jest.fn();
    const updateDocument = jest.fn();
    const dispatch = jest.fn();
    const response = { error: null } as FirestoreState;
    const history = { push: jest.fn() };

    const user = { uid: "456" } as firebase.User;
    const id = "123";

    const document = {} as StudentDataInterface;

    const state2 = {
      ...state,
      CurrentAction: SharedActionSequence.Answer,
      NextLiItem: undefined,
      ViewRepresentationInternal: "1+1=2",
      EntryRepresentationInternal: "1+1=2",
    } as InterventionState;

    commonKeyListener({
      key,
      state: state2,
      currentApproach: InterventionFormat.ExplicitTiming,
      captureItemClick,
      user,
      id,
      target,
      document,
      openModal,
      addDocument,
      updateDocument,
      response,
      history,
      dispatch,
    });

    expect(mockCommonKeyHandler).not.toBeCalled();
    expect(captureButtonAction).not.toBeCalled();
    expect(captureItemClick).not.toBeCalled();
  });

  it("Unexpected key routing (P, ET) based on intervention: ET", () => {
    const key = { key: "p" } as React.KeyboardEvent<HTMLElement>;

    const docMock1 = jest.spyOn(DispatchHelpers, "commonKeyHandler");
    const mockCommonKeyHandler = jest.fn(() => true);
    docMock1.mockImplementation(() => mockCommonKeyHandler());

    const captureButtonAction = jest.fn();
    const captureItemClick = jest.fn();
    const openModal = jest.fn();
    const addDocument = jest.fn();
    const updateDocument = jest.fn();
    const dispatch = jest.fn();
    const response = { error: null } as FirestoreState;
    const history = { push: jest.fn() };

    const user = { uid: "456" } as firebase.User;
    const id = "123";

    const document = {} as StudentDataInterface;

    const state2 = {
      ...state,
      CurrentAction: SharedActionSequence.Answer,
      NextLiItem: undefined,
    } as InterventionState;

    commonKeyListener({
      key,
      state: state2,
      currentApproach: InterventionFormat.ExplicitTiming,
      captureItemClick,
      user,
      id,
      target,
      document,
      openModal,
      addDocument,
      updateDocument,
      response,
      history,
      dispatch,
    });

    expect(mockCommonKeyHandler).not.toBeCalled();
    expect(captureButtonAction).not.toBeCalled();
    expect(captureItemClick).not.toBeCalled();
  });

  it("Throw error upon bad routing", () => {
    const key = { key: "1" } as React.KeyboardEvent<HTMLElement>;

    const docMock1 = jest.spyOn(InteractionHelpers, "commonKeyHandlerCCC");
    const mockedFunctionCC = jest.fn(() => true);
    docMock1.mockImplementation(() => mockedFunctionCC());

    const docMock2 = jest.spyOn(InteractionHelpers, "commonKeyHandlerET");
    const mockedFunctionET = jest.fn(() => true);
    docMock2.mockImplementation(() => mockedFunctionET());

    const captureItemClick = jest.fn();
    const openModal = jest.fn();
    const addDocument = jest.fn();
    const updateDocument = jest.fn();
    const dispatch = jest.fn();
    const response = { error: null } as FirestoreState;
    const history = { push: jest.fn() };

    const user = { uid: "456" } as firebase.User;
    const id = "123";

    const document = {} as StudentDataInterface;

    expect(() =>
      commonKeyListener({
        key,
        state,
        currentApproach: "asdf",
        captureItemClick,
        user,
        id,
        target,
        document,
        openModal,
        addDocument,
        updateDocument,
        response,
        history,
        dispatch,
      })
    ).toThrowError(Error("No intervention type specified"));
  });

  it("Correct key routing based on intervention (1): Benchmark", () => {
    const key = { key: "1" } as React.KeyboardEvent<HTMLElement>;

    const docMock1 = jest.spyOn(DispatchHelpers, "commonKeyHandler");
    const mockCommonKeyHandler = jest.fn(() => true);
    docMock1.mockImplementation(() => mockCommonKeyHandler());

    const captureButtonAction = jest.fn();
    const captureItemClick = jest.fn();
    const openModal = jest.fn();
    const addDocument = jest.fn();
    const updateDocument = jest.fn();
    const dispatch = jest.fn();
    const response = { error: null } as FirestoreState;
    const history = { push: jest.fn() };

    const user = { uid: "456" } as firebase.User;
    const id = "123";

    const document = {} as StudentDataInterface;

    commonKeyListener({
      key,
      state,
      currentApproach: "Benchmark",
      captureItemClick,
      user,
      id,
      target,
      document,
      openModal,
      addDocument,
      updateDocument,
      response,
      history,
      dispatch,
    });

    expect(mockCommonKeyHandler).toBeCalled();
    expect(captureButtonAction).not.toBeCalled();
    expect(captureItemClick).not.toBeCalled();
  });

  it("Correct key routing based on intervention (*): Benchmark", () => {
    const key = { key: "*" } as React.KeyboardEvent<HTMLElement>;

    const docMock1 = jest.spyOn(DispatchHelpers, "commonKeyHandler");
    const mockCommonKeyHandler = jest.fn(() => true);
    docMock1.mockImplementation(() => mockCommonKeyHandler());

    const captureButtonAction = jest.fn();
    const captureItemClick = jest.fn();
    const openModal = jest.fn();
    const addDocument = jest.fn();
    const updateDocument = jest.fn();
    const dispatch = jest.fn();
    const response = { error: null } as FirestoreState;
    const history = { push: jest.fn() };

    const user = { uid: "456" } as firebase.User;
    const id = "123";

    const document = {} as StudentDataInterface;

    commonKeyListener({
      key,
      state,
      currentApproach: "Benchmark",
      captureItemClick,
      user,
      id,
      target,
      document,
      openModal,
      addDocument,
      updateDocument,
      response,
      history,
      dispatch,
    });

    expect(mockCommonKeyHandler).toBeCalled();
    expect(captureButtonAction).not.toBeCalled();
    expect(captureItemClick).not.toBeCalled();
  });

  it("Correct key routing based on intervention (Enter): Benchmark", () => {
    const key = { key: "Enter" } as React.KeyboardEvent<HTMLElement>;

    const docMock1 = jest.spyOn(DispatchHelpers, "commonKeyHandler");
    const mockCommonKeyHandler = jest.fn(() => true);
    docMock1.mockImplementation(() => mockCommonKeyHandler());

    const captureButtonAction = jest.fn();
    const captureItemClick = jest.fn();
    const openModal = jest.fn();
    const addDocument = jest.fn();
    const updateDocument = jest.fn();
    const dispatch = jest.fn();
    const response = { error: null } as FirestoreState;
    const history = { push: jest.fn() };

    const user = { uid: "456" } as firebase.User;
    const id = "123";

    const document = {} as StudentDataInterface;

    commonKeyListener({
      key,
      state,
      currentApproach: "Benchmark",
      captureItemClick,
      user,
      id,
      target,
      document,
      openModal,
      addDocument,
      updateDocument,
      response,
      history,
      dispatch,
    });

    expect(mockCommonKeyHandler).not.toBeCalled();
    expect(captureButtonAction).not.toBeCalled();
    expect(captureItemClick).not.toBeCalled();
  });

  it("Correct key routing (Space, Entry) based on intervention: Benchmark", () => {
    const key = { key: " " } as React.KeyboardEvent<HTMLElement>;

    const docMock1 = jest.spyOn(DispatchHelpers, "commonKeyHandler");
    const mockCommonKeyHandler = jest.fn(() => true);
    docMock1.mockImplementation(() => mockCommonKeyHandler());

    const captureButtonAction = jest.fn();
    const captureItemClick = jest.fn();
    const openModal = jest.fn();
    const addDocument = jest.fn();
    const updateDocument = jest.fn();
    const dispatch = jest.fn();
    const response = { error: null } as FirestoreState;
    const history = { push: jest.fn() };

    const user = { uid: "456" } as firebase.User;
    const id = "123";

    const document = {} as StudentDataInterface;

    const state2 = {
      ...state,
      CurrentAction: SharedActionSequence.Entry,
      NextLiItem: undefined,
    } as InterventionState;

    commonKeyListener({
      key,
      state: state2,
      currentApproach: "Benchmark",
      captureItemClick,
      user,
      id,
      target,
      document,
      openModal,
      addDocument,
      updateDocument,
      response,
      history,
      dispatch,
    });

    expect(mockCommonKeyHandler).not.toBeCalled();
    expect(captureButtonAction).not.toBeCalled();
    expect(captureItemClick).not.toBeCalled();
  });

  it("Correct key routing (Backspace) based on intervention: Benchmark", () => {
    const key = { key: "Backspace" } as React.KeyboardEvent<HTMLElement>;

    const docMock1 = jest.spyOn(DispatchHelpers, "commonKeyHandler");
    const mockCommonKeyHandler = jest.fn(() => true);
    docMock1.mockImplementation(() => mockCommonKeyHandler());

    const captureButtonAction = jest.fn();
    const captureItemClick = jest.fn();
    const openModal = jest.fn();
    const addDocument = jest.fn();
    const updateDocument = jest.fn();
    const dispatch = jest.fn();
    const response = { error: null } as FirestoreState;
    const history = { push: jest.fn() };

    const user = { uid: "456" } as firebase.User;
    const id = "123";

    const document = {} as StudentDataInterface;

    const state2 = {
      ...state,
      CurrentAction: SharedActionSequence.Start,
      NextLiItem: undefined,
    } as InterventionState;

    commonKeyListener({
      key,
      state: state2,
      currentApproach: "Benchmark",
      captureItemClick,
      user,
      id,
      target,
      document,
      openModal,
      addDocument,
      updateDocument,
      response,
      history,
      dispatch,
    });

    expect(mockCommonKeyHandler).toBeCalled();
    expect(captureButtonAction).not.toBeCalled();
    expect(captureItemClick).not.toBeCalled();
  });

  it("Correct key routing (Delete) based on intervention: Benchmark", () => {
    const key = { key: "Delete" } as React.KeyboardEvent<HTMLElement>;

    const docMock1 = jest.spyOn(DispatchHelpers, "commonKeyHandler");
    const mockCommonKeyHandler = jest.fn(() => true);
    docMock1.mockImplementation(() => mockCommonKeyHandler());

    const captureButtonAction = jest.fn();
    const captureItemClick = jest.fn();
    const openModal = jest.fn();
    const addDocument = jest.fn();
    const updateDocument = jest.fn();
    const dispatch = jest.fn();
    const response = { error: null } as FirestoreState;
    const history = { push: jest.fn() };

    const user = { uid: "456" } as firebase.User;
    const id = "123";

    const document = {} as StudentDataInterface;

    const state2 = {
      ...state,
      CurrentAction: SharedActionSequence.Start,
      NextLiItem: undefined,
    } as InterventionState;

    commonKeyListener({
      key,
      state: state2,
      currentApproach: "Benchmark",
      captureItemClick,
      user,
      id,
      target,
      document,
      openModal,
      addDocument,
      updateDocument,
      response,
      history,
      dispatch,
    });

    expect(mockCommonKeyHandler).toBeCalled();
    expect(captureButtonAction).not.toBeCalled();
    expect(captureItemClick).not.toBeCalled();
  });

  it("Correct key routing (Space, Benchmark) based on intervention: Benchmark", () => {
    const key = { key: " " } as React.KeyboardEvent<HTMLElement>;

    const docMock1 = jest.spyOn(DispatchHelpers, "commonKeyHandler");
    const mockCommonKeyHandler = jest.fn(() => true);
    docMock1.mockImplementation(() => mockCommonKeyHandler());

    const captureButtonAction = jest.fn();
    const captureItemClick = jest.fn();
    const openModal = jest.fn();
    const addDocument = jest.fn();
    const updateDocument = jest.fn();
    const dispatch = jest.fn();
    const response = { error: null } as FirestoreState;
    const history = { push: jest.fn() };

    const user = { uid: "456" } as firebase.User;
    const id = "123";

    const document = {} as StudentDataInterface;

    const state2 = {
      ...state,
      CurrentAction: SharedActionSequence.Answer,
      NextLiItem: undefined,
      ViewRepresentationInternal: "1+1=2",
      EntryRepresentationInternal: "1+1=2",
    } as InterventionState;

    commonKeyListener({
      key,
      state: state2,
      currentApproach: "Benchmark",
      captureItemClick,
      user,
      id,
      target,
      document,
      openModal,
      addDocument,
      updateDocument,
      response,
      history,
      dispatch,
    });

    expect(mockCommonKeyHandler).not.toBeCalled();
    expect(captureButtonAction).not.toBeCalled();
    expect(captureItemClick).not.toBeCalled();
  });

  it("Correct key routing (=, Benchmark) based on intervention: Benchmark", () => {
    const key = { key: "=" } as React.KeyboardEvent<HTMLElement>;

    const docMock1 = jest.spyOn(DispatchHelpers, "commonKeyHandler");
    const mockCommonKeyHandler = jest.fn(() => true);
    docMock1.mockImplementation(() => mockCommonKeyHandler());

    const captureButtonAction = jest.fn();
    const captureItemClick = jest.fn();
    const openModal = jest.fn();
    const addDocument = jest.fn();
    const updateDocument = jest.fn();
    const dispatch = jest.fn();
    const response = { error: null } as FirestoreState;
    const history = { push: jest.fn() };

    const user = { uid: "456" } as firebase.User;
    const id = "123";

    const document = {} as StudentDataInterface;

    const state2 = {
      ...state,
      CurrentAction: SharedActionSequence.Answer,
      NextLiItem: undefined,
      ViewRepresentationInternal: "1+1=2",
      EntryRepresentationInternal: "1+1=2",
    } as InterventionState;

    commonKeyListener({
      key,
      state: state2,
      currentApproach: "Benchmark",
      captureItemClick,
      user,
      id,
      target,
      document,
      openModal,
      addDocument,
      updateDocument,
      response,
      history,
      dispatch,
    });

    expect(mockCommonKeyHandler).not.toBeCalled();
    expect(captureButtonAction).not.toBeCalled();
    expect(captureItemClick).not.toBeCalled();
  });

  it("Unexpected key routing (P, Benchmark) based on intervention: Benchmark", () => {
    const key = { key: "p" } as React.KeyboardEvent<HTMLElement>;

    const docMock1 = jest.spyOn(DispatchHelpers, "commonKeyHandler");
    const mockCommonKeyHandler = jest.fn(() => true);
    docMock1.mockImplementation(() => mockCommonKeyHandler());

    const captureButtonAction = jest.fn();
    const captureItemClick = jest.fn();
    const openModal = jest.fn();
    const addDocument = jest.fn();
    const updateDocument = jest.fn();
    const dispatch = jest.fn();
    const response = { error: null } as FirestoreState;
    const history = { push: jest.fn() };

    const user = { uid: "456" } as firebase.User;
    const id = "123";

    const document = {} as StudentDataInterface;

    const state2 = {
      ...state,
      CurrentAction: SharedActionSequence.Answer,
      NextLiItem: undefined,
    } as InterventionState;

    commonKeyListener({
      key,
      state: state2,
      currentApproach: "Benchmark",
      captureItemClick,
      user,
      id,
      target,
      document,
      openModal,
      addDocument,
      updateDocument,
      response,
      history,
      dispatch,
    });

    expect(mockCommonKeyHandler).not.toBeCalled();
    expect(captureButtonAction).not.toBeCalled();
    expect(captureItemClick).not.toBeCalled();
  });
});
