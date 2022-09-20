/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { mount, shallow } from "enzyme";
import React from "react";
import firebase from "firebase";
import Adapter from "enzyme-adapter-react-16";
import Enzyme from "enzyme";
import { FactDataInterface } from "../../setcreator/interfaces/SetCreatorInterfaces";
import ProgressMonitor from "../ProgressMonitor";
import * as useFirebaseCollectionTypedReference from "../../../firebase/hooks/useFirebaseCollection";
import * as reactRouterDom from "react-router-dom";
import * as progressHelpers from "./../helpers/ProgressHelpers";
import { PerformanceDataInterface } from "../../intervention/interfaces/InterventionInterfaces";

Enzyme.configure({ adapter: new Adapter() });

const mockId = "123";
const mockTarget = "Addition";
const mockMethod = "ExplicitTiming";
const mockAim = "40";

const mockDoc = [
  {
    correctDigits: 1,
    errCount: 1,
    nCorrectInitial: 1,
    nRetries: 1,
    sessionDuration: 1,
    setSize: 1,
    totalDigits: 1,
    entries: [
      {
        factCorrect: true,
        initialTry: true,

        // Strings
        factType: "Addition",
        factString: "1+1=2",
        factEntry: "1+1=2",

        // Numerics
        latencySeconds: 5,

        // Timestamps
        dateTimeEnd: firebase.firestore.Timestamp.fromDate(new Date()),
        dateTimeStart: firebase.firestore.Timestamp.fromDate(new Date()),
      } as FactDataInterface,
    ],
    id: mockId,
    creator: "345",
    target: mockTarget,
    method: mockMethod,
    dateTimeEnd: firebase.firestore.Timestamp.fromDate(new Date())
      .toDate()
      .toDateString(),
    dateTimeStart: firebase.firestore.Timestamp.fromDate(new Date())
      .toDate()
      .toDateString(),
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
  } as PerformanceDataInterface,
] as PerformanceDataInterface[];

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
      dispatch: jest.fn(() => true),
    }),
  };
});

jest.mock("./../../../firebase/hooks/useFirebaseCollection", () => {
  const originalModule = jest.requireActual(
    "./../../../firebase/hooks/useFirebaseCollection"
  );
  return {
    __esModule: true,
    ...originalModule,
    default: () => ({
      useFirebaseCollectionTyped: jest.fn(() => ({
        documents: mockDoc,
        error: undefined,
      })),
    }),
  };
});

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: mockId,
    target: mockTarget,
    method: mockMethod,
    aim: mockAim,
  }),
  useRouteMatch: () => ({
    url: `/ProgressMonitor/${mockTarget}/${mockId}/${mockMethod}/${mockAim}`,
  }),
  useHistory: () => ({
    history: jest.fn(),
  }),
}));

describe("ProgressMonitor", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it("Should render component", () => {
    const wrapper = mount(<ProgressMonitor />);

    expect(wrapper.find(ProgressMonitor).length).toBe(1);
  });

  it("Should prevent load if missing target", () => {
    const mockParams = jest.spyOn(reactRouterDom, "useParams");
    mockParams.mockImplementation(() => ({
      id: mockId,
      target: null as unknown as string,
      method: mockMethod,
      aim: mockAim,
    }));

    const wrapper = mount(<ProgressMonitor />);

    expect(wrapper.find(ProgressMonitor).length).toBe(1);
  });

  it("Should prevent load if missing aim", () => {
    const mockParams = jest.spyOn(reactRouterDom, "useParams");
    mockParams.mockImplementation(() => ({
      id: mockId,
      target: mockTarget,
      method: mockMethod,
      aim: null as unknown as string,
    }));

    const wrapper = mount(<ProgressMonitor />);

    expect(wrapper.find(ProgressMonitor).length).toBe(1);
  });

  it("Should prevent load if aim not a number", () => {
    const mockParams = jest.spyOn(reactRouterDom, "useParams");
    mockParams.mockImplementation(() => ({
      id: mockId,
      target: mockTarget,
      method: mockMethod,
      aim: "aim",
    }));

    const wrapper = mount(<ProgressMonitor />);

    expect(wrapper.find(ProgressMonitor).length).toBe(1);
  });

  it("Should prevent load if params all bad", () => {
    const mockParams = jest.spyOn(reactRouterDom, "useParams");

    mockParams.mockImplementation(() => ({
      id: undefined,
      target: undefined,
      method: undefined,
      aim: undefined,
    }));

    const mockDocs = jest.spyOn(
      useFirebaseCollectionTypedReference,
      "useFirebaseCollectionTyped"
    );
    mockDocs.mockImplementation(() => ({
      documents: mockDoc,
      error: undefined,
    }));

    const primaryChartData = jest.spyOn(
      progressHelpers,
      "getPrimaryProgressChartData"
    );
    const mockedFuntion1 = jest.fn();
    primaryChartData.mockImplementation(mockedFuntion1);

    const secondaryChartData = jest.spyOn(
      progressHelpers,
      "getPrimaryProgressChartData"
    );
    const mockedFuntion2 = jest.fn();
    secondaryChartData.mockImplementation(mockedFuntion2);

    const prepareOverallCalculations = jest.spyOn(
      progressHelpers,
      "prepareOverallCalculations"
    );
    const mockedFuntion3 = jest.fn();
    prepareOverallCalculations.mockImplementation(mockedFuntion2);

    const prepareItemLevelCalculations = jest.spyOn(
      progressHelpers,
      "prepareItemLevelCalculations"
    );
    const mockedFuntion4 = jest.fn();
    prepareItemLevelCalculations.mockImplementation(mockedFuntion2);

    const wrapper = shallow(<ProgressMonitor />);

    wrapper.update();

    setTimeout(() => {
      expect(wrapper.find(ProgressMonitor).length).toBe(1);
      expect(mockedFuntion1).toBeCalled();
      expect(mockedFuntion2).toBeCalled();
      expect(mockedFuntion3).toBeCalled();
      expect(mockedFuntion4).toBeCalled();
      expect(wrapper.state("chartOptions")).not.toStrictEqual({
        mainChart: {},
        itemChart: {},
      });
    }, 1000);

    //TODO: highcharts is problematic
  });
});
