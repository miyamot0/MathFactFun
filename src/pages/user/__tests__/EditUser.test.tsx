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
import * as useFirebaseDocumentTyped from "./../../../firebase/hooks/useFirebaseDocument";
import * as UserHelpers from "./../helpers/UserHelpers";

Enzyme.configure({ adapter: new Adapter() });

const mockId = "123";

const mockDoc = {
  id: mockId,
  displayEmail: "asdf@asdf.com",
  displayName: "asdf",
  displaySchool: "asdf",
} as UserDataInterface;

jest.mock("../helpers/UserHelpers");

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: mockId,
  }),
  useHistory: () => ({
    push: jest.fn(),
  }),
  useRouteMatch: () => ({ url: `/editUser/${mockId}` }),
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
      useFirebaseDocumentTyped: jest.fn(() => ({
        document: mockDoc,
        documentError: undefined,
      })),
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
  it("Should render component: modified state", () => {
    const docMock = jest.spyOn(
      useFirebaseDocumentTyped,
      "useFirebaseDocumentTyped"
    );
    docMock.mockImplementation(() => ({
      document: mockDoc,
      documentError: undefined,
    }));

    const wrapper = mount(<EditUser />);

    setTimeout(() => {
      expect(wrapper.find(".edit-user-page").length).toBe(1);
    }, 1000);
  });

  it("Will render error upon error", () => {
    const docMock = jest.spyOn(
      useFirebaseDocumentTyped,
      "useFirebaseDocumentTyped"
    );
    docMock.mockImplementation(() => ({
      document: null,
      documentError: "error",
    }));

    const wrapper = mount(<EditUser />);

    setTimeout(() => {
      expect(wrapper.find(".error").length).toBe(1);
    }, 1000);
  });

  it("Will render loading upon loading", () => {
    const docMock = jest.spyOn(
      useFirebaseDocumentTyped,
      "useFirebaseDocumentTyped"
    );
    docMock.mockImplementation(() => ({
      document: null,
      documentError: undefined,
    }));

    const wrapper = mount(<EditUser />);

    setTimeout(() => {
      expect(wrapper.find(".loading").length).toBe(1);
    }, 1000);
  });

  it("Will call function as designed", () => {
    const docMock = jest.spyOn(
      useFirebaseDocumentTyped,
      "useFirebaseDocumentTyped"
    );
    docMock.mockImplementation(() => ({
      document: mockDoc,
      documentError: undefined,
    }));

    const docMock2 = jest.spyOn(UserHelpers, "verifyUserEdit");
    const mockedFuntion = jest.fn();
    docMock2.mockImplementation(() => mockedFuntion());

    const wrapper = mount(<EditUser />);
    const form = wrapper.find("form").first();
    form.simulate("submit");

    setTimeout(() => {
      expect(mockedFuntion).toHaveBeenCalled();
    }, 1000);

    setTimeout(() => {
      expect(wrapper.find(".edit-user-page").length).toBe(1);
    }, 1000);
  });
});
