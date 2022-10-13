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
import CreateStudent from "../CreateStudent";
import { FirestoreState } from "../../../firebase/interfaces/FirebaseInterfaces";

Enzyme.configure({ adapter: new Adapter() });

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

var mockVerifySingleStudentCreate: jest.Mock<any, any>;
jest.mock("./../helpers/StudentHelpers", () => {
  mockVerifySingleStudentCreate = jest.fn();
  return {
      verifySingleStudentCreate: mockVerifySingleStudentCreate
  };
});

jest.mock("react-router-dom", () => {
  return {
    useParams: () => ({ }),
    useHistory: () => ({
      push: jest.fn(),
    }),
    useRouteMatch: () => jest.fn(),
  };
});

describe("CreateStudent", () => {
  it("Will render as normal", () => {
    const wrapper = shallow(<CreateStudent />);

    expect(wrapper.find(".create-student-page").length).toBe(1);
  });

  it("Will call function designed", () => {
    const wrapper = shallow(<CreateStudent />);

    wrapper.find("form").first().simulate("submit", {
      preventDefault: jest.fn()
    });

    expect(mockVerifySingleStudentCreate).toBeCalled();
  });
});
