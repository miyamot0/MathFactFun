/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import firebase from "firebase";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { mount } from "enzyme";
import { CommentInterface } from "../../types/CommentTypes";
import { StudentDataInterface } from "../../../interfaces/StudentInterfaces";
import {
  renderAdministrativeButtons,
  renderSetCreatorButton,
  renderSpecificOutcomesButton,
} from "../StudentSummaryViews";
import { FirestoreState } from "../../../../../firebase/interfaces/FirebaseInterfaces";
import * as SummaryHelpers from "./../../helpers/StudentSummaryHelpers";

Enzyme.configure({ adapter: new Adapter() });

const mockData = {
  id: "123",
  aimLine: 40,
  createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
  dueDate: firebase.firestore.Timestamp.fromDate(new Date()),
  lastActivity: firebase.firestore.Timestamp.fromDate(new Date()),
  comments: [] as CommentInterface[],
  completedBenchmark: [],
  currentBenchmarking: [],
  factsMastered: [],
  factsSkipped: [],
  factsTargeted: [],

  creator: "456",
  currentApproach: "NA",
  currentErrorApproach: "",
  currentGrade: "",
  currentSRApproach: "",
  currentTarget: "",
  details: "",
  name: "",
  problemSet: "",

  minForTask: 2,
} as StudentDataInterface;

describe("renderSpecificOutcomesButton", () => {
  it("Should render buttons with a target", () => {
    const mockData2 = {
      ...mockData,
      currentTarget: "ExplicitTiming",
    } as StudentDataInterface;

    const result = renderSpecificOutcomesButton({ student: mockData2 });
    const resultString = JSON.stringify(result);

    expect(resultString.includes("Intervention-specific Targets")).toBe(true);
    expect(resultString.includes("no-specific-outcomes-button")).toBe(false);
  });

  it("Should not render buttons without a target", () => {
    const mockData2 = {
      ...mockData,
      currentTarget: "NA",
    } as StudentDataInterface;

    const result = renderSpecificOutcomesButton({ student: mockData2 });
    const resultString = JSON.stringify(result);

    expect(resultString.includes("Intervention-specific Targets")).toBe(false);
    expect(resultString.includes("no-specific-outcomes-button")).toBe(true);
  });
});

describe("renderSetCreatorButton", () => {
  it("Should render buttons with a target", () => {
    const mockData2 = {
      ...mockData,
      currentTarget: "ExplicitTiming",
    } as StudentDataInterface;

    const result = renderSetCreatorButton(mockData2);
    const resultString = JSON.stringify(result);

    expect(resultString.includes("Targeted Item Sets")).toBe(true);
    expect(resultString.includes("no-set-items-button")).toBe(false);
  });

  it("Should not render buttons without a target", () => {
    const mockData2 = {
      ...mockData,
      currentTarget: "NA",
    } as StudentDataInterface;

    const result = renderSetCreatorButton(mockData2);
    const resultString = JSON.stringify(result);

    expect(resultString.includes("Targeted Item Sets")).toBe(false);
    expect(resultString.includes("no-set-items-button")).toBe(true);
  });
});

describe("renderAdministrativeButtons", () => {
  it("Should render buttons with a target", () => {
    const user = {} as firebase.User;
    const adminFlag = false;
    const handleDeleteEvent = jest.fn();
    const response = {} as FirestoreState;
    const history = jest.fn();

    const result = renderAdministrativeButtons(
      user,
      adminFlag,
      mockData,
      handleDeleteEvent,
      response,
      history
    );

    const resultString = JSON.stringify(result);

    expect(resultString.includes("Advanced and Administrative Options")).toBe(
      false
    );
    expect(resultString.includes("no-admin-panel")).toBe(true);
  });

  it("Should render buttons with a target", () => {
    const user = {} as firebase.User;
    const adminFlag = true;
    const handleDeleteEvent = jest.fn();
    const response = {} as FirestoreState;
    const history = jest.fn();

    const result = renderAdministrativeButtons(
      user,
      adminFlag,
      mockData,
      handleDeleteEvent,
      response,
      history
    );
    const resultString = JSON.stringify(result);

    expect(resultString.includes("Advanced and Administrative Options")).toBe(
      true
    );
    expect(resultString.includes("no-admin-panel")).toBe(false);
  });

  it("Should render buttons with a target and trigger event", () => {
    const docMock = jest.spyOn(SummaryHelpers, "handleStudentDelete");
    const mockedFuntion = jest.fn();
    docMock.mockImplementation(() => mockedFuntion());

    const user = { uid: "123" } as firebase.User;
    const adminFlag = true;
    const handleDeleteEvent = jest.fn();
    const response = {} as FirestoreState;
    const history = jest.fn();

    const wrapper = mount(
      renderAdministrativeButtons(
        user,
        adminFlag,
        mockData,
        handleDeleteEvent,
        response,
        history
      )
    );

    const button = wrapper.find("button").first();
    button.simulate("click");

    setTimeout(() => {
      expect(mockedFuntion).toHaveBeenCalled();
    }, 1000);
  });
});
