/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow } from "enzyme";
import Admin from "../Admin";
import { mockCollection, mockOnSnapshot, mockOrderBy, mockWhere } from "../../../setupTests";
import { UserDataInterface } from "../../user/types/UserTypes";
import { FactDataInterface } from "../../setcreator/interfaces/SetCreatorInterfaces";

Enzyme.configure({ adapter: new Adapter() });

// per hoisting
var mockUseFirebaseCollectionTyped: jest.Mock<any, any>;

jest.mock('../../../firebase/hooks/useFirebaseCollection', () => {
  mockUseFirebaseCollectionTyped = jest.fn();
  return {
    useFirebaseCollectionTyped: mockUseFirebaseCollectionTyped
  };
});

describe("Admin", () => {
  beforeEach(() => {
    mockCollection.mockClear();
  })

  it("Render with docs", () => {
    mockUseFirebaseCollectionTyped.mockImplementation(() => ({
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

    const wrapper = shallow(
        <Admin/>
    );

    expect(wrapper.find(".new-user-btn").length).toBe(1);
  });

  it("Render with no docs", () => {
    mockUseFirebaseCollectionTyped.mockImplementation(() => ({
      documents: [] as UserDataInterface[],
      error: 'err',
    }));

    const wrapper = shallow(
        <Admin/>
    );

    expect(wrapper.find(".new-user-btn").length).toBe(1);
  });
});
