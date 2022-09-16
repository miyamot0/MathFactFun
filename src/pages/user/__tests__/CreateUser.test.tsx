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
import CreateUser from "../CreateUser";

Enzyme.configure({ adapter: new Adapter() });

jest.mock("../../../firebase/hooks/useFirebaseDocument", () => {
  const originalModule = jest.requireActual(
    "../../../firebase/hooks/useFirebaseDocument"
  );
  return {
    __esModule: true,
    ...originalModule,
    default: () => ({
      addDocument: jest.fn(),
      response: {} as FirestoreState,
    }),
  };
});

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    history: jest.fn(),
  }),
}));

describe("CreateUser", () => {
  it("Should render component", () => {
    const wrapper = mount(<CreateUser />);

    expect(wrapper.containsMatchingElement(<CreateUser />)).toEqual(true);
  });

  // TODO
});
