/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import firebase from "firebase";
import Adapter from "enzyme-adapter-react-16";
import Enzyme from "enzyme";
import { FirestoreState } from "../../../../../firebase/interfaces/FirebaseInterfaces";
import { StudentDataInterface } from "../../../interfaces/StudentInterfaces";
import { CommentInterface } from "../../types/CommentTypes";
import { confirmDeletion, handleStudentDelete } from "../StudentSummaryHelpers";

Enzyme.configure({ adapter: new Adapter() });

//const docMock = jest.spyOn(SummaryHelpers, "confirmDeletion");
//const winMock = jest.spyOn(global, "confirm" as any);
//let confirmSpy: jest.SpyInstance<boolean, [message?: string | undefined]>;

describe("confirmDeletion", () => {
  describe("Override choices: true", () => {
    it("Should result in true", () => {
      jest.spyOn(global, "confirm" as any).mockReturnValueOnce(true);
      const result = confirmDeletion();
      expect(result).toBe(true);
    });
  });

  describe("Override choices: false", () => {
    it("Should result in false", () => {
      jest.spyOn(global, "confirm" as any).mockReturnValueOnce(false);
      const result = confirmDeletion();
      expect(result).toBe(false);
    });
  });
});

describe("handleStudentDelete", () => {
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
    currentApproach: "",
    currentErrorApproach: "",
    currentGrade: "",
    currentSRApproach: "",
    currentTarget: "",
    details: "",
    name: "",
    problemSet: "",

    minForTask: 2,
  } as StudentDataInterface;

  describe("Override choices: true", () => {
    it("Should fire if confirmed and id is good", () => {
      jest.spyOn(global, "confirm" as any).mockReturnValueOnce(true);

      const student = mockData;
      const deleteDocument = jest.fn();
      const response = {} as FirestoreState;
      const history = {
        push: (id: string) => true,
      };

      handleStudentDelete(student, deleteDocument, response, history);

      setTimeout(() => {
        expect(deleteDocument).toBeCalled();
        expect(history).toBeCalled();
      }, 1000);
    });

    it("Should fire if confirmed and id is good, but bad response", () => {
      jest.spyOn(global, "confirm" as any).mockReturnValueOnce(true);

      const student = mockData;
      const deleteDocument = jest.fn();
      const response = { error: "error" } as FirestoreState;
      const history = {
        push: (id: string) => true,
      };

      handleStudentDelete(student, deleteDocument, response, history);

      setTimeout(() => {
        expect(deleteDocument).toBeCalled();
        expect(history).toBeCalledTimes(0);
      }, 1000);
    });
  });

  describe("Override choices: false", () => {
    it("Should NOT fire if not confirmed", () => {
      jest.spyOn(global, "confirm" as any).mockReturnValueOnce(false);

      const student = mockData;
      const deleteDocument = jest.fn();
      const response = {} as FirestoreState;
      const history = {
        push: (id: string) => true,
      };

      handleStudentDelete(student, deleteDocument, response, history);

      setTimeout(() => {
        expect(deleteDocument).toBeCalledTimes(0);
        expect(history).toBeCalledTimes(0);
      }, 1000);
    });
  });
});
