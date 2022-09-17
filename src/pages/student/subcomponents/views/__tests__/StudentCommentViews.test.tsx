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
import { StudentDataInterface } from "../../../interfaces/StudentInterfaces";
import {
  renderCommentForm,
  renderCommentListView,
} from "../StudentCommentsViews";
import { FirestoreState } from "../../../../../firebase/interfaces/FirebaseInterfaces";
import { CommentInterface } from "../../types/CommentTypes";

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
  currentApproach: "N/A",
  currentErrorApproach: "",
  currentGrade: "",
  currentSRApproach: "",
  currentTarget: "",
  details: "",
  name: "",
  problemSet: "",

  minForTask: 2,
};

describe("renderCommentListView", () => {
  it("Should render li with comments", () => {
    const mockData2 = {
      ...mockData,
      comments: [
        {
          id: 123,
          displayName: "display Name",
          createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        } as CommentInterface,
      ],
    } as StudentDataInterface;

    const user = {} as firebase.User;
    const cb = jest.fn();

    const result = renderCommentListView(user, true, mockData2, cb);
    const resultString = JSON.stringify(result);

    expect(resultString.includes("li")).toBe(true);
  });

  it("Should render li but not fire if id student id is null", () => {
    window.confirm = jest.fn(() => true);

    const mockData2 = {
      ...mockData,
      comments: [
        {
          id: 123,
          displayName: "display Name",
          createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        } as CommentInterface,
      ],
    } as StudentDataInterface;

    const user = { id: null } as unknown as firebase.User;
    const cb = jest.fn();

    const wrapper = mount(renderCommentListView(user, true, mockData2, cb));
    wrapper.find("a").simulate("click");

    setTimeout(() => {
      expect(cb).toBeCalledTimes(0);
    }, 1000);
  });

  it("Should render li but not fire if id student id is undefined", () => {
    window.confirm = jest.fn(() => true);

    const mockData2 = {
      ...mockData,
      comments: [
        {
          id: 123,
          displayName: "display Name",
          createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        } as CommentInterface,
      ],
    } as StudentDataInterface;

    const user = { id: undefined } as unknown as firebase.User;
    const cb = jest.fn();

    const wrapper = mount(renderCommentListView(user, true, mockData2, cb));
    wrapper.find("a").simulate("click");

    setTimeout(() => {
      expect(cb).toBeCalledTimes(0);
    }, 1000);
  });

  it("Should have working callback", () => {
    const mockData2 = {
      ...mockData,
      comments: [
        {
          id: 123,
          displayName: "display Name",
          createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        } as CommentInterface,
      ],
    } as StudentDataInterface;

    const user = {} as firebase.User;
    const cb = jest.fn();

    const wrapper = mount(renderCommentListView(user, true, mockData2, cb));
    wrapper.find("a").simulate("click");

    setTimeout(() => {
      expect(cb).toHaveBeenCalled();
    }, 1000);
  });

  it("Should render no li with no comments", () => {
    const mockData2 = {
      ...mockData,
    } as StudentDataInterface;

    const user = {} as firebase.User;
    const cb = jest.fn();

    const result = renderCommentListView(user, true, mockData2, cb);
    const resultString = JSON.stringify(result);

    expect(resultString.includes("li")).toBe(false);
  });
});

describe("renderCommentForm", () => {
  it("Should render the form", () => {
    const cb = () => jest.fn();
    const cb2 = jest.fn();
    const newComment = "asdf";
    const user = {} as firebase.User;
    const mockData2 = {
      ...mockData,
      comments: [
        {
          id: 123,
          displayName: "display Name",
          createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        } as CommentInterface,
      ],
    } as StudentDataInterface;

    const result = renderCommentForm(
      newComment,
      user,
      mockData2,
      cb,
      cb2,
      {} as FirestoreState
    );
    const resultString = JSON.stringify(result);

    expect(resultString.includes("textarea")).toBe(true);
  });

  it("Should trigger relevant button callbacks if well formed", () => {
    const cb = () => jest.fn();
    const cb2 = jest.fn();
    const newComment = "asdf";
    const user = {} as firebase.User;
    const mockData2 = {
      ...mockData,
      comments: [
        {
          id: 123,
          displayName: "display Name",
          createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        } as CommentInterface,
      ],
    } as StudentDataInterface;

    const wrapper = mount(
      renderCommentForm(
        newComment,
        user,
        mockData2,
        cb,
        cb2,
        {} as FirestoreState
      )
    );
    const event = { target: { value: "sometext" } };
    wrapper.find("textarea").simulate("change", event);

    setTimeout(() => {
      expect(cb).toHaveBeenCalled();
    }, 1000);
  });

  it("Should trigger relevant button callbacks if well formed", () => {
    const cb = () => jest.fn();
    const cb2 = jest.fn();
    const newComment = "asdf";
    const user = {} as firebase.User;
    const mockData2 = {
      ...mockData,
      comments: [
        {
          id: 123,
          displayName: "display Name",
          createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        } as CommentInterface,
      ],
    } as StudentDataInterface;

    const wrapper = mount(
      renderCommentForm(
        newComment,
        user,
        mockData2,
        cb,
        cb2,
        {} as FirestoreState
      )
    );
    wrapper.find("button").simulate("click");

    setTimeout(() => {
      expect(cb).toHaveBeenCalled();
    }, 1000);
  });

  it("Should not trigger relevant button callbacks if user is null", () => {
    const cb = () => jest.fn();
    const cb2 = jest.fn();
    const newComment = "asdf";
    const user = null;
    const mockData2 = {
      ...mockData,
      comments: [
        {
          id: 123,
          displayName: "display Name",
          createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        } as CommentInterface,
      ],
    } as StudentDataInterface;

    const wrapper = mount(
      renderCommentForm(
        newComment,
        user,
        mockData2,
        cb,
        cb2,
        {} as FirestoreState
      )
    );

    wrapper.find("button").simulate("click");

    setTimeout(() => {
      expect(cb).toHaveBeenCalledTimes(0);
    }, 1000);
  });

  it("Should trigger relevant button callbacks if well formed and error if bad save", () => {
    const cb = () => jest.fn();
    const cb2 = jest.fn();
    const newComment = "asdf";
    const user = {} as firebase.User;
    const mockData2 = {
      ...mockData,
      comments: [
        {
          id: 123,
          displayName: "display Name",
          createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        } as CommentInterface,
      ],
    } as StudentDataInterface;

    const wrapper = mount(
      renderCommentForm(newComment, user, mockData2, cb, cb2, {
        error: "Bad save",
      } as FirestoreState)
    );
    wrapper.find("button").simulate("click");

    setTimeout(() => {
      expect(cb).toHaveBeenCalled();
    }, 1000);
  });
});
