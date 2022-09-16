/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { mount } from "enzyme";
import { FirestoreState } from "../../../firebase/interfaces/FirebaseInterfaces";
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme from "enzyme";
import EditUser from "../EditUser";
import { UserDataInterface } from "../types/UserTypes";

Enzyme.configure({ adapter: new Adapter() });

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: 123,
  }),
  useRouteMatch: () => ({ url: `/editUser/${123}` }),
}));

jest.mock("../../../firebase/hooks/useFirestore", () => {
  const originalModule = jest.requireActual(
    "../../../firebase/hooks/useFirestore"
  );
  return {
    __esModule: true,
    ...originalModule,
    default: () => ({
      updateDocument: jest.fn(),
      response: {} as FirestoreState,
    }),
  };
});

jest.mock("../../../firebase/hooks/useFirebaseDocument", () => {
  const originalModule = jest.requireActual(
    "../../../firebase/hooks/useFirebaseDocument"
  );
  return {
    __esModule: true,
    ...originalModule,
    default: () => ({
      document: {} as UserDataInterface,
      documentError: undefined,
    }),
  };
});

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: "123",
  }),
  useRouteMatch: () => ({ url: `/editUser/123` }),
  useHistory: () => ({
    history: jest.fn(),
  }),
}));

describe("EditUser", () => {
  it("Should render component", () => {
    const wrapper = mount(<EditUser />);

    expect(wrapper.containsMatchingElement(<EditUser />)).toEqual(true);
  });

  // TODO
});
