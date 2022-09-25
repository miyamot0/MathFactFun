/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  DelCode,
  InitialInterventionState,
  SharedActionSequence,
} from "../../functionality/InterventionBehavior";
import { InterventionState } from "../../interfaces/InterventionInterfaces";
import { commonKeyHandlerCCC, commonKeyHandlerET } from "../InteractionHelpers";

describe("commonKeyHandlerCCC", () => {
  const state = InitialInterventionState;

  it("CCC, Rule #1: exit out key action if not in Cover/Copy", () => {
    const char = "1";
    const dispatch = jest.fn();

    commonKeyHandlerCCC(char, state, dispatch);

    expect(dispatch).not.toBeCalled();
  });

  it("CCC, Rule #2: exit out if more than 1 operators in string", () => {
    const char = "+";
    const dispatch = jest.fn();

    const state2 = {
      ...state,
      EntryRepresentationInternal: "1+1=",
      CurrentAction: SharedActionSequence.CoverCopy,
      OperatorSymbol: "+",
    } as InterventionState;

    commonKeyHandlerCCC(char, state2, dispatch);

    expect(dispatch).not.toBeCalled();
  });

  it("CCC, Rule #3: exit out if more than 1 equality sign in string", () => {
    const char = "=";
    const dispatch = jest.fn();

    const state2 = {
      ...state,
      EntryRepresentationInternal: "1+1=",
      CurrentAction: SharedActionSequence.CoverCopy,
      OperatorSymbol: "+",
    } as InterventionState;

    commonKeyHandlerCCC(char, state2, dispatch);

    expect(dispatch).not.toBeCalled();
  });

  it("CCC, Rule #4: exit out if equality sign is before operator in string", () => {
    const char = "=";
    const dispatch = jest.fn();

    const state2 = {
      ...state,
      EntryRepresentationInternal: "1",
      CurrentAction: SharedActionSequence.CoverCopy,
      OperatorSymbol: "+",
    } as InterventionState;

    commonKeyHandlerCCC(char, state2, dispatch);

    expect(dispatch).not.toBeCalled();
  });

  it("CCC, Rule #5: exit out if equality sign if no part of string", () => {
    const char = "=";
    const dispatch = jest.fn();

    const state2 = {
      ...state,
      EntryRepresentationInternal: "1",
      CurrentAction: SharedActionSequence.CoverCopy,
      OperatorSymbol: "+",
    } as InterventionState;

    commonKeyHandlerCCC(char, state2, dispatch);

    expect(dispatch).not.toBeCalled();
  });

  it("CCC, Rule #5: exit out if equality sign if no part of string", () => {
    const char = "=";
    const dispatch = jest.fn();

    const state2 = {
      ...state,
      EntryRepresentationInternal: "1+",
      CurrentAction: SharedActionSequence.CoverCopy,
      OperatorSymbol: "+",
    } as InterventionState;

    commonKeyHandlerCCC(char, state2, dispatch);

    expect(dispatch).not.toBeCalled();
  });

  it("CCC, Rule #6: exit out if equality sign is immediately following an operator in string", () => {
    const char = "=";
    const dispatch = jest.fn();

    const state2 = {
      ...state,
      EntryRepresentationInternal: "1+",
      CurrentAction: SharedActionSequence.CoverCopy,
      OperatorSymbol: "+",
    } as InterventionState;

    commonKeyHandlerCCC(char, state2, dispatch);

    expect(dispatch).not.toBeCalled();
  });

  it("CCC, Rule #6a: exit out if equality sign is immediately following an operator in string", () => {
    const char = "=";
    const dispatch = jest.fn();

    const state2 = {
      ...state,
      EntryRepresentationInternal: "1+1",
      CurrentAction: SharedActionSequence.CoverCopy,
      OperatorSymbol: "+",
    } as InterventionState;

    commonKeyHandlerCCC(char, state2, dispatch);

    expect(dispatch).toBeCalled();
  });

  it("CCC, Del code: remove trailing character", () => {
    const char = DelCode;
    const dispatch = jest.fn();

    const state2 = {
      ...state,
      EntryRepresentationInternal: "1+1",
      CurrentAction: SharedActionSequence.CoverCopy,
      OperatorSymbol: "+",
    } as InterventionState;

    commonKeyHandlerCCC(char, state2, dispatch);

    expect(dispatch).toBeCalled();
  });

  it("CCC, Del code: DO NOT remove trailing character", () => {
    const char = DelCode;
    const dispatch = jest.fn();

    const state2 = {
      ...state,
      EntryRepresentationInternal: "",
      CurrentAction: SharedActionSequence.CoverCopy,
      OperatorSymbol: "+",
    } as InterventionState;

    commonKeyHandlerCCC(char, state2, dispatch);

    expect(dispatch).not.toBeCalled();
  });
});

describe("commonKeyHandlerET", () => {
  const state = InitialInterventionState;

  /*
    it('ET, fire outside of del key to add char', () => {
        const char = "asdf";
        const dispatch = jest.fn();

        const state2 = {
            ...state,
            EntryRepresentationInternal: "1",
            CurrentAction: SharedActionSequence.Answer,
            OperatorSymbol: "+"
        } as InterventionState

        commonKeyHandlerET(
            char,
            state2,
            dispatch
        );

        expect(dispatch).toBeCalled();
    })
    */

  it("ET, Del code: remove trailing character", () => {
    const char = DelCode;
    const dispatch = jest.fn();

    const state2 = {
      ...state,
      EntryRepresentationInternal: "1+1",
      CurrentAction: SharedActionSequence.Answer,
      OperatorSymbol: "+",
    } as InterventionState;

    commonKeyHandlerET(char, state2, dispatch);

    expect(dispatch).toBeCalled();
  });

  it("CCC, Del code: DO NOT remove trailing character", () => {
    const char = DelCode;
    const dispatch = jest.fn();

    const state2 = {
      ...state,
      EntryRepresentationInternal: "",
      CurrentAction: SharedActionSequence.Answer,
      OperatorSymbol: "+",
    } as InterventionState;

    commonKeyHandlerET(char, state2, dispatch);

    expect(dispatch).not.toBeCalled();
  });
});
