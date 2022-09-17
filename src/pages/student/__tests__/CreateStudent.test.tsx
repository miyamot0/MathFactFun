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
import { mount } from "enzyme";
import CreateStudent from "../CreateStudent";
import { FirestoreState } from "../../../firebase/interfaces/FirebaseInterfaces";
import { act } from "react-dom/test-utils";

Enzyme.configure({ adapter: new Adapter() });

jest.mock("../helpers/StudentHelpers");

const mockId = "123";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: mockId,
  }),
  useHistory: () => ({
    push: jest.fn(),
  }),
  useRouteMatch: () => ({ url: `/create/${mockId}` }),
}));

/*
jest.mock("../helpers/StudentHelpers", () => ({
  ...jest.requireActual("../helpers/StudentHelpers"),
  verifySingleStudentCreate: mockVerify,
}));
*/

jest.mock("./../../../firebase/hooks/useFirestore", () => {
  const originalModule = jest.requireActual(
    "./../../../firebase/hooks/useFirestore"
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

describe("CreateStudent", () => {
  it("Will render", () => {
    const wrapper = mount(<CreateStudent />);

    expect(wrapper.find(".create-student-page").length).toBe(1);
  });
});
