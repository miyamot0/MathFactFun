/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import firebase from "firebase";
import ButtonLayout from "../ButtonLayout";
import Enzyme, { mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { StudentDataInterface } from "../../../../student/interfaces/StudentInterfaces";
import { InitialInterventionState } from "../../../functionality/InterventionBehavior";
import { FirestoreState } from "../../../../../firebase/interfaces/FirebaseInterfaces";
import { act } from "react-dom/test-utils";
import { waitFor } from "@testing-library/react";
import * as InterventionHelpers from "./../../../helpers/InterventionHelpers";
import * as ButtonHelpers from "./../../../../../utilities/ButtonHelpers";
import { InterventionState } from "../../../interfaces/InterventionInterfaces";

Enzyme.configure({ adapter: new Adapter() });

describe("ButtonLayout", () => {
  const spyButtonSequence = jest.spyOn(
    InterventionHelpers,
    "sharedButtonActionSequence"
  );
  const spyButtonHelper = jest.spyOn(ButtonHelpers, "checkIfSubmittedViaClick");

  it("Should render", () => {
    const user = { uid: "123" } as firebase.User;
    const id = "234";
    const target = "Addition";
    const approach = "Benchmark";
    const document = {} as StudentDataInterface;
    const state = InitialInterventionState;
    const openModal = jest.fn();
    const addDocument = jest.fn();
    const updateDocument = jest.fn();
    const addResponse = {} as FirestoreState;
    const dispatch = jest.fn();
    const className = "box3";

    const wrapper = shallow(
      <ButtonLayout
        user={user}
        id={id}
        target={target}
        approach={approach}
        document={document}
        state={state}
        openModal={openModal}
        addDocument={addDocument}
        updateDocument={updateDocument}
        addResponse={addResponse}
        history={history}
        dispatch={dispatch}
        className={className}
      />
    );

    expect(wrapper.find(`div.${className}`).length).toBe(1);
  });

  it('Should render and "click" through', async () => {
    spyButtonSequence.mockImplementation(
      (
        user: firebase.User | null,
        id: string,
        target: string,
        approach: string,
        document: StudentDataInterface | null,
        state: InterventionState,
        openModal: any,
        addDocument: any,
        updateDocument: any,
        response: any,
        history: any,
        dispatch: any
      ) => true
    );
    spyButtonHelper.mockImplementation(
      (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => false
    );

    await act(async () => {
      const user = { uid: "123" } as firebase.User;
      const id = "234";
      const target = "Addition";
      const approach = "Benchmark";
      const document = {} as StudentDataInterface;
      const state = {
        ...InitialInterventionState,
        ShowButton: true
      };
      const openModal = jest.fn();
      const addDocument = jest.fn();
      const updateDocument = jest.fn();
      const addResponse = {} as FirestoreState;
      const dispatch = jest.fn();
      const className = "box3";

      const wrapper = mount(
        <ButtonLayout
          user={user}
          id={id}
          target={target}
          approach={approach}
          document={document}
          state={state}
          openModal={openModal}
          addDocument={addDocument}
          updateDocument={updateDocument}
          addResponse={addResponse}
          history={history}
          dispatch={dispatch}
          className={className}
        />
      );

      expect(wrapper.find("button.global-btn").length).toBe(1);

      wrapper.find("button.global-btn").first().simulate("click");

      wrapper.update();
      wrapper.render();

      await waitFor(() => {
        expect(spyButtonSequence).toBeCalled();
      });
    });
  });

  it('Should render and NOT "key" through', async () => {
    spyButtonSequence.mockImplementation(
      (
        user: firebase.User | null,
        id: string,
        target: string,
        approach: string,
        document: StudentDataInterface | null,
        state: InterventionState,
        openModal: any,
        addDocument: any,
        updateDocument: any,
        response: any,
        history: any,
        dispatch: any
      ) => true
    );
    spyButtonHelper.mockImplementation(
      (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => true
    );

    await act(async () => {
      const user = { uid: "123" } as firebase.User;
      const id = "234";
      const target = "Addition";
      const approach = "Benchmark";
      const document = {} as StudentDataInterface;
      const state = {
        ...InitialInterventionState,
        ShowButton: true
      };
      const openModal = jest.fn();
      const addDocument = jest.fn();
      const updateDocument = jest.fn();
      const addResponse = {} as FirestoreState;
      const dispatch = jest.fn();
      const className = "box3";

      const wrapper = mount(
        <ButtonLayout
          user={user}
          id={id}
          target={target}
          approach={approach}
          document={document}
          state={state}
          openModal={openModal}
          addDocument={addDocument}
          updateDocument={updateDocument}
          addResponse={addResponse}
          history={history}
          dispatch={dispatch}
          className={className}
        />
      );

      expect(wrapper.find("button.global-btn").length).toBe(1);

      wrapper.find("button.global-btn").first().simulate("click");

      wrapper.update();
      wrapper.render();

      await waitFor(() => {
        expect(spyButtonSequence).toBeCalledTimes(0);
      });
    });
  });
});
