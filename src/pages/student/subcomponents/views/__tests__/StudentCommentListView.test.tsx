/* eslint-disable @typescript-eslint/no-unused-vars */
/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import firebase from "firebase";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow } from "enzyme";
import { StudentDataInterface } from "../../../interfaces/StudentInterfaces";
import { FirestoreState } from "../../../../../firebase/interfaces/FirebaseInterfaces";
import { CommentInterface } from "../../types/CommentTypes";
import { waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import React from "react";
import StudentCommentFormView from "../StudentCommentFormView";
import StudentCommentListView from "../StudentCommentListView";

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

describe("CommentListView", () => {
  let confirmSpy: jest.SpyInstance<boolean, [message?: string | undefined]>;
  let alertSpy: jest.SpyInstance<void, [message?: any]>;

  beforeAll(() => {
    confirmSpy = jest.spyOn(window, "confirm");
    confirmSpy.mockImplementation(jest.fn(() => true));
    alertSpy = jest.spyOn(window, "alert");
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    alertSpy.mockImplementation(() => { });
  });

  afterAll(() => {
    confirmSpy.mockRestore();
    alertSpy.mockRestore();
  });

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
    const adminFlag = false;

    const wrapper = shallow(
      <StudentCommentListView
        user={user}
        adminFlag={adminFlag}
        student={mockData2}
        updateDocument={cb}
      />
    );

    expect(wrapper.find("li").length).not.toBe(0);
  });

  it("Should render li but not fire if id student id is null", async () => {
    await act(async () => {
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
      const adminFlag = true;

      const wrapper = shallow(
        <StudentCommentListView
          user={user}
          adminFlag={adminFlag}
          student={mockData2}
          updateDocument={cb}
        />
      );

      wrapper.find("a").first().simulate("click");

      wrapper.update();
      wrapper.render();

      await waitFor(() => {
        expect(cb).toBeCalledTimes(0);
      });
    });
  });

  it("Should render li but not fire if id student id is undefined", async () => {
    await act(async () => {
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
      const adminFlag = true;

      const wrapper = shallow(
        <StudentCommentListView
          user={user}
          adminFlag={adminFlag}
          student={mockData2}
          updateDocument={cb}
        />
      );

      wrapper.find("a").first().simulate("click");

      wrapper.update();
      wrapper.render();

      await waitFor(() => {
        expect(cb).toBeCalledTimes(0);
      });
    });
  });

  it("comment listview: Should have working callback", async () => {
    await act(async () => {
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

      const user = { uid: "123" } as firebase.User;
      const cb = jest.fn((_id: string) => Promise.resolve());
      const adminFlag = true;

      cb.mockImplementationOnce(() => Promise.resolve());

      confirmSpy.mockReturnValueOnce(true);

      const wrapper = shallow(
        <StudentCommentListView
          user={user}
          adminFlag={adminFlag}
          student={mockData2}
          updateDocument={cb}
        />
      );

      wrapper.find("a").first().simulate("click");

      wrapper.update();
      wrapper.render();

      await waitFor(() => {
        expect(cb).toHaveBeenCalled();
      });
    });
  });

  it("Should render no li with no comments", () => {
    const mockData2 = {
      ...mockData,
    } as StudentDataInterface;

    const user = { uid: "123" } as firebase.User;
    const cb = jest.fn();
    const adminFlag = false;

    const wrapper = shallow(
      <StudentCommentListView
        user={user}
        adminFlag={adminFlag}
        student={mockData2}
        updateDocument={cb}
      />
    );

    expect(wrapper.find("li").length).toBe(0);
  });
});

describe("CommentFormView", () => {
  it("Should render the form", () => {
    const cb = jest.fn((_id: string, _updates: any) => Promise.resolve());
    const cb2 = jest.fn();
    const newComment = "asdf";
    const user = {} as firebase.User;
    const response = { error: "Bad save" } as FirestoreState;
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

    const wrapper = shallow(
      <StudentCommentFormView
        newComment={newComment}
        user={user}
        student={mockData2}
        dispatch={cb2}
        updateDocument={cb}
        response={response}
      />
    );

    expect(wrapper.find("textarea").length).toBe(1);
  });

  it("Should trigger relevant button callbacks if well formed", async () => {
    await act(async () => {
      const cb = jest.fn((_id: string, _updates: any) => Promise.resolve());
      const cb2 = jest.fn();
      const newComment = "asdf";
      const user = {} as firebase.User;
      const response = { error: "Bad save" } as FirestoreState;
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

      const wrapper = shallow(
        <StudentCommentFormView
          newComment={newComment}
          user={user}
          student={mockData2}
          dispatch={cb2}
          updateDocument={cb}
          response={response}
        />
      );

      const event = { target: { value: "sometext" } };

      expect(wrapper.find("textarea").length).toBe(1);

      wrapper.find("textarea").simulate("change", event);

      wrapper.update();
      wrapper.render();

      await waitFor(() => {
        expect(cb2).toHaveBeenCalled();
      });
    });
  });

  it("Should trigger relevant button callbacks if well formed", async () => {
    await act(async () => {
      const cb = jest.fn((_id: string, _updates: any) => Promise.resolve());
      const cb2 = jest.fn();
      const newComment = "asdf";
      const user = {} as firebase.User;
      const response = { error: "Bad save" } as FirestoreState;
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

      const wrapper = shallow(
        <StudentCommentFormView
          newComment={newComment}
          user={user}
          student={mockData2}
          dispatch={cb2}
          updateDocument={cb}
          response={response}
        />
      );

      wrapper.find("button").simulate("click");

      await waitFor(() => {
        expect(cb).toHaveBeenCalled();
      });
    });
  });

  it("Should not trigger relevant button callbacks if user is null", async () => {
    await act(async () => {
      const cb = jest.fn((_id: string, _updates: any) => Promise.resolve());
      const cb2 = jest.fn();
      const newComment = "asdf";
      const user = null;
      const response = { error: "Bad save" } as FirestoreState;
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

      const wrapper = shallow(
        <StudentCommentFormView
          newComment={newComment}
          user={user}
          student={mockData2}
          dispatch={cb2}
          updateDocument={cb}
          response={response}
        />
      );

      wrapper.find("button").simulate("click");

      await waitFor(() => {
        expect(cb).toHaveBeenCalledTimes(0);
      });
    });
  });

  it("Should trigger relevant button callbacks if well formed and error if bad save", async () => {
    await act(async () => {
      const cb = jest.fn((_id: string, _updates: any) => Promise.resolve());
      const cb2 = jest.fn();
      const newComment = "asdf";
      const user = { uid: "123" } as firebase.User;
      const response = { error: "Bad save" } as FirestoreState;
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

      const wrapper = shallow(
        <StudentCommentFormView
          newComment={newComment}
          user={user}
          student={mockData2}
          dispatch={cb2}
          updateDocument={cb}
          response={response}
        />
      );

      const button = wrapper.find("button");
      expect(button.length).toBe(1);

      button.simulate("click");

      wrapper.update();
      wrapper.render();

      await waitFor(() => {
        expect(cb).toHaveBeenCalled();
      });
    });
  });
});
