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
import { FirestoreState } from "../../../firebase/interfaces/FirebaseInterfaces";
import CreateBulkStudents from "../CreateBulkStudents";

import * as StudentHelpers from "./../helpers/StudentHelpers";

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

describe("CreateBulkStudents", () => {
  it("Will render", () => {
    const wrapper = mount(<CreateBulkStudents />);

    expect(wrapper.find(".create-bulk-student-page").length).toBe(1);
  });

  it("Will call function designed", () => {
    const docMock = jest.spyOn(StudentHelpers, "verifyBulkStudentCreate");
    const mockedFuntion = jest.fn();
    docMock.mockImplementation(() => mockedFuntion());

    const wrapper = mount(<CreateBulkStudents />);
    const form = wrapper.find("form").first();
    form.simulate("submit");

    setTimeout(() => {
      expect(mockedFuntion).toHaveBeenCalled();
    }, 1000);

    expect(wrapper.find(".create-bulk-student-page").length).toBe(1);
  });
});
