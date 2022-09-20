/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import firebase from "firebase";
import Adapter from "enzyme-adapter-react-16";
import Enzyme from "enzyme";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import Admin from "../Admin";
import * as useFirebaseCollectionTypedReference from "../../../firebase/hooks/useFirebaseCollection";

Enzyme.configure({ adapter: new Adapter() });

describe("Admin", () => {
  it("Render", () => {
    const mockDocs = jest.spyOn(
      useFirebaseCollectionTypedReference,
      "useFirebaseCollectionTyped"
    );
    mockDocs.mockImplementationOnce(() => ({
      documents: [
        { uid: "123" } as firebase.User,
        { uid: "456" } as firebase.User,
      ],
      error: undefined,
    }));

    const wrapper = mount(
      <MemoryRouter>
        <Admin></Admin>
      </MemoryRouter>
    );

    expect(wrapper.find(".new-user-btn").length).toBe(1);
  });

  it("Render, with no users", () => {
    const mockDocs = jest.spyOn(
      useFirebaseCollectionTypedReference,
      "useFirebaseCollectionTyped"
    );
    mockDocs.mockImplementationOnce(() => ({
      documents: [],
      error: "Result",
    }));

    const wrapper = mount(
      <MemoryRouter>
        <Admin></Admin>
      </MemoryRouter>
    );

    expect(wrapper.find(".new-user-btn").length).toBe(1);
  });
});
