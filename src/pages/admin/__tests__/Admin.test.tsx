/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme from "enzyme";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import Admin from "../Admin";
import * as useFirebaseCollectionTypedReference from "../../../firebase/hooks/useFirebaseCollection";
import { UserDataInterface } from "../../user/types/UserTypes";

Enzyme.configure({ adapter: new Adapter() });

describe("Admin", () => {
  it("Render", () => {
    const mockDocs = jest.spyOn(
      useFirebaseCollectionTypedReference,
      "useFirebaseCollectionTyped"
    );
    mockDocs.mockImplementationOnce(() => ({
      documents: [
        {
          id: "123",
          displayEmail: "",
          displayName: "",
          displaySchool: "",
        } as UserDataInterface,
        {
          id: "456",
          displayEmail: "",
          displayName: "",
          displaySchool: "",
        } as UserDataInterface,
      ] as UserDataInterface[],
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
