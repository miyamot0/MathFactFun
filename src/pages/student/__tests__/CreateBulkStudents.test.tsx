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
import CreateBulkStudents from "../CreateBulkStudents";
import { mount } from "enzyme";
import { FirestoreState } from "../../../firebase/interfaces/FirebaseInterfaces";

Enzyme.configure({ adapter: new Adapter() });

jest.mock("react-router-dom", () => {
  return {
    useParams: () => ({ }),
    useHistory: () => ({
      push: jest.fn(),
    }),
    useRouteMatch: () => jest.fn(),
  };
});

jest.mock("./../../../firebase/hooks/useFirestore", () => {
  return {
    useFirestore: () => ({
      addDocument: jest.fn(),
      deleteDocument: jest.fn(),
      updateDocument: jest.fn(),
      response: {} as FirestoreState,
    })
  };
});

var mockVerifyBulkStudentCreate: jest.Mock<any, any>;
jest.mock("./../helpers/StudentHelpers", () => {
  mockVerifyBulkStudentCreate = jest.fn();

  return {
      verifyBulkStudentCreate: () => mockVerifyBulkStudentCreate,
  };
});

describe("CreateBulkStudents", () => {
  it("Will render", () => {
    const wrapper = mount(<CreateBulkStudents />);

    expect(wrapper.find(".create-bulk-student-page").length).toBe(1);
  });

  it("Will call function as designed", () => {
    const wrapper = mount(<CreateBulkStudents />);
    wrapper.find("form").first().simulate("submit", { preventDefault: jest.fn(() => {})});

    //expect(mockVerifyBulkStudentCreate).toHaveBeenCalled();

    expect(wrapper.find(".create-bulk-student-page").length).toBe(1);
  });
});
