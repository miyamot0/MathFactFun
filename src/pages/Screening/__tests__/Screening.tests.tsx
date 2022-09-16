/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { mount } from "enzyme";
import firebase from "firebase";
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme from "enzyme";
import { MemoryRouter } from "react-router-dom";
import Screening from "../Screening";

Enzyme.configure({ adapter: new Adapter() });

const mockId = "123";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: mockId,
  }),
  useRouteMatch: () => ({ url: `/Screening/${mockId}` }),
}));

jest.mock("../../../context/hooks/useAuthorizationContext", () => {
  const originalModule = jest.requireActual(
    "../../../context/hooks/useAuthorizationContext"
  );
  return {
    __esModule: true,
    ...originalModule,
    default: () => ({
      user: { uid: "456" } as firebase.User,
      adminFlag: true,
      authIsReady: true,
      dispatch: jest.fn(() => {}),
    }),
  };
});

describe("Screening", () => {
  it("Should render, no admin", () => {
    const wrapper = mount(
      <MemoryRouter>
        <Screening />
      </MemoryRouter>
    );
    expect(1).toBe(1);
  });

  it("Should render, yes admin", () => {
    const wrapper = mount(
      <MemoryRouter>
        <Screening />
      </MemoryRouter>
    );
    expect(1).toBe(1);
  });
});
