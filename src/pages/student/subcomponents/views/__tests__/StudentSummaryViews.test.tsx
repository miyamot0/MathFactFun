/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import firebase from "firebase";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import Enzyme, { shallow } from "enzyme";
import { CommentInterface } from "../../types/CommentTypes";
import { StudentDataInterface } from "../../../interfaces/StudentInterfaces";
import { FirestoreState } from "../../../../../firebase/interfaces/FirebaseInterfaces";
import { ShowAdministrativeButtons, ShowSetCreatorButton, 
  ShowSpecificOutcomesButton } from "../StudentSummaryViews";
import { MemoryRouter } from "react-router-dom";

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

var mockHandleStudentDelete: jest.Mock<any, any>;

jest.mock("./../../helpers/StudentSummaryHelpers", () => {
  mockHandleStudentDelete = jest.fn();

  return {
      handleStudentDelete: () => mockHandleStudentDelete,
  };
});

describe("renderSpecificOutcomesButton", () => {
  it("Should render buttons with a target", () => {
    const mockData2 = {
      ...mockData,
      currentApproach: "ExplicitTiming",
    } as StudentDataInterface;

    const wrapper = shallow(<MemoryRouter>
      <ShowSpecificOutcomesButton student={ mockData2 } />
    </MemoryRouter>);
    
    expect(wrapper.html().includes("Intervention-specific Targets")).toBe(true);
    expect(wrapper.html().includes("no-specific-outcomes-button")).toBe(false);
  });

  it("Should not render buttons without a target", () => {
    const mockData2 = {
      ...mockData,
      currentApproach: "NA",
    } as StudentDataInterface;

    const wrapper = shallow(<MemoryRouter>
      <ShowSpecificOutcomesButton student={ mockData2 } />
    </MemoryRouter>);

    expect(wrapper.html().includes("Intervention-specific Targets")).toBe(false);
    expect(wrapper.html().includes("no-specific-outcomes-button")).toBe(true);
  });
});

describe("renderSetCreatorButton", () => {
  it("Should render buttons with a target", () => {
    const mockData2 = {
      ...mockData,
      currentTarget: "ExplicitTiming",
    } as StudentDataInterface;

    const wrapper = shallow(<MemoryRouter>
      <ShowSetCreatorButton student={ mockData2 } />
    </MemoryRouter>);

    expect(wrapper.html().includes("Targeted Item Sets")).toBe(true);
    expect(wrapper.html().includes("no-set-items-button")).toBe(false);
  });

  it("Should not render buttons without a target", () => {
    const mockData2 = {
      ...mockData,
      currentTarget: "NA",
    } as StudentDataInterface;

    const wrapper = shallow(<MemoryRouter>
      <ShowSetCreatorButton student={ mockData2 } />
    </MemoryRouter>);

    expect(wrapper.html().includes("Targeted Item Sets")).toBe(false);
    expect(wrapper.html().includes("no-set-items-button")).toBe(true);
  });
});

describe("renderAdministrativeButtons", () => {
  it("Should render buttons with a target", () => {
    const user = {} as firebase.User;
    const adminFlag = false;
    const handleDeleteEvent = jest.fn();
    const response = {} as FirestoreState;
    const history = jest.fn();

    const wrapper = shallow(<ShowAdministrativeButtons user={user}
    adminFlag={adminFlag} deleteDocument={handleDeleteEvent} response={response}
    history={history} student={mockData} />);

    expect(wrapper.html().includes("Advanced and Administrative Options")).toBe(
      false
    );
    expect(wrapper.html().includes("no-admin-panel")).toBe(true);
  });

  it("Should render buttons with a target", () => {
    const user = {} as firebase.User;
    const adminFlag = true;
    const handleDeleteEvent = jest.fn();
    const response = {} as FirestoreState;
    const history = jest.fn();

    const wrapper = shallow(<ShowAdministrativeButtons user={user}
    adminFlag={adminFlag} deleteDocument={handleDeleteEvent} response={response}
    history={history} student={mockData} />);

    expect(wrapper.html().includes("Advanced and Administrative Options")).toBe(
      true
    );
    expect(wrapper.html().includes("no-admin-panel")).toBe(false);
  });

  it("Should render buttons with a target and trigger event", () => {
    const user = { uid: "123" } as firebase.User;
    const adminFlag = true;
    const handleDeleteEvent = jest.fn();
    const response = {} as FirestoreState;
    const history = jest.fn();

    const wrapper = shallow(<ShowAdministrativeButtons user={user}
    adminFlag={adminFlag} deleteDocument={handleDeleteEvent} response={response}
    history={history} student={mockData} />);

    wrapper.find("button").first().simulate("click");
  });
});
