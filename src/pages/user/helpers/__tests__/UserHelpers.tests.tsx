/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Adapter from "enzyme-adapter-react-16";
import Enzyme from "enzyme";

import { FirestoreState } from "../../../../firebase/interfaces/FirebaseInterfaces";

import { UserDataInterface } from "../../types/UserTypes";
import { UserDataInitialState } from "../../functionality/UserFunctionality";
import { verifyUserCreate, verifyUserEdit } from "../UserHelpers";
import { UserDataState } from "../../interfaces/UserInterfaces";

Enzyme.configure({ adapter: new Adapter() });

const history = {
  push: (id: any) => true,
};

const addDocument = jest.fn();
const response = {} as FirestoreState;
const dispatch = jest.fn();

const mockId = "123";

const mockDoc = {
  id: null as unknown as string,
  displayEmail: null as unknown as string,
  displayName: null as unknown as string,
  displaySchool: null as unknown as string,
} as UserDataInterface;

const mockState = {
  Name: null as unknown as string,
  Email: null as unknown as string,
  Password: null as unknown as string,
  School: null as unknown as string,
  id: null as unknown as string,
  FormError: undefined,
  DidBuild: false,
} as UserDataState;

describe("verifyUserCreate", () => {
  let confirmSpy: jest.SpyInstance<boolean, [message?: string | undefined]>;
  let alertSpy: jest.SpyInstance<void, [message?: any]>;

  beforeAll(() => {
    confirmSpy = jest.spyOn(global, 'confirm');
    confirmSpy.mockImplementation(jest.fn(() => true));
    alertSpy = jest.spyOn(global, 'alert');
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    alertSpy.mockImplementation(() => { });
  })

  afterAll(() => {
    confirmSpy.mockRestore();
    alertSpy.mockRestore();
  })

  it("Should dispatch out at blank state", () => {
    const state = mockState;

    verifyUserCreate(state, history, addDocument, response, dispatch);

    expect(dispatch).toBeCalled();
    expect(addDocument).toBeCalledTimes(0);
  });

  it("Should submit at initial state", () => {
    const state = UserDataInitialState;

    verifyUserCreate(state, history, addDocument, response, dispatch);

    expect(dispatch).toBeCalled();
    expect(addDocument).toBeCalledTimes(1);
  });

  it("Should dispatch out at Name", () => {
    const state = mockState;

    verifyUserCreate(state, history, addDocument, response, dispatch);

    expect(dispatch).toBeCalledTimes(2);
    expect(addDocument).toBeCalledTimes(0);
  });

  it("Should dispatch out at Email", () => {
    const state = {
      ...mockState,
      Name: "valid name",
    };

    verifyUserCreate(state, history, addDocument, response, dispatch);

    expect(dispatch).toBeCalledTimes(2);
    expect(addDocument).toBeCalledTimes(0);
  });

  it("Should dispatch out at School", () => {
    const state = {
      ...mockState,
      Name: "valid name",
      Email: "valid email",
    };

    verifyUserCreate(state, history, addDocument, response, dispatch);

    expect(dispatch).toBeCalledTimes(2);
    expect(addDocument).toBeCalledTimes(0);
  });

  it("Should get to end", () => {
    const state = {
      ...mockState,
      Name: "valid name",
      Email: "valid email",
      School: "valid school",
    };

    verifyUserCreate(state, history, addDocument, response, dispatch);

    expect(dispatch).toBeCalledTimes(1);
    expect(addDocument).toBeCalledTimes(1);
  });

  it("Should get to end, should get to end but note failure", () => {
    const state = {
      ...mockState,
      Name: "valid name",
      Email: "valid email",
      School: "valid school",
    };

    const response2 = {
      ...response,
      error: "error",
    };

    verifyUserCreate(state, history, addDocument, response2, dispatch);

    expect(dispatch).toBeCalledTimes(1);
    expect(addDocument).toBeCalledTimes(1);
  });
});

describe("verifyUserEdit", () => {
  const id = "123";

  let confirmSpy: jest.SpyInstance<boolean, [message?: string | undefined]>;
  let alertSpy: jest.SpyInstance<void, [message?: any]>;

  beforeAll(() => {
    confirmSpy = jest.spyOn(global, 'confirm');
    confirmSpy.mockImplementation(jest.fn(() => true));
    alertSpy = jest.spyOn(global, 'alert');
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    alertSpy.mockImplementation(() => { });
  })

  afterAll(() => {
    confirmSpy.mockRestore();
    alertSpy.mockRestore();
  })

  it("Should dispatch out at blank state", () => {
    const state = mockState;

    verifyUserEdit(id, state, history, addDocument, response, dispatch);

    expect(dispatch).toBeCalled();
    expect(addDocument).toBeCalledTimes(0);
  });

  it("Should submit at initial state", () => {
    const state = UserDataInitialState;

    verifyUserEdit(id, state, history, addDocument, response, dispatch);

    expect(dispatch).toBeCalled();
    expect(addDocument).toBeCalledTimes(1);
  });

  it("Should fail at initial state if uid is undefined", () => {
    const state = UserDataInitialState;

    verifyUserEdit(
      undefined as unknown as string,
      state,
      history,
      addDocument,
      response,
      dispatch
    );

    expect(dispatch).not.toBeCalled();
    expect(addDocument).toBeCalledTimes(0);
  });

  it("Should dispatch out at Name", () => {
    const state = mockState;

    verifyUserEdit(id, state, history, addDocument, response, dispatch);

    expect(dispatch).toBeCalledTimes(2);
    expect(addDocument).toBeCalledTimes(0);
  });

  it("Should dispatch out at School", () => {
    const state = {
      ...mockState,
      Name: "valid name",
      Email: "valid email",
    };

    verifyUserEdit(id, state, history, addDocument, response, dispatch);

    expect(dispatch).toBeCalledTimes(2);
    expect(addDocument).toBeCalledTimes(0);
  });

  it("Should get to end", () => {
    const state = {
      ...mockState,
      Name: "valid name",
      Email: "valid email",
      School: "valid school",
    };

    verifyUserEdit(id, state, history, addDocument, response, dispatch);

    expect(dispatch).toBeCalledTimes(1);
    expect(addDocument).toBeCalledTimes(1);
  });

  it("Should get to end, should get to end but note failure", () => {
    const state = {
      ...mockState,
      Name: "valid name",
      Email: "valid email",
      School: "valid school",
    };

    const response2 = {
      ...response,
      error: "error",
    };

    verifyUserEdit(id, state, history, addDocument, response2, dispatch);

    expect(dispatch).toBeCalledTimes(1);
    expect(addDocument).toBeCalledTimes(1);
  });
});
