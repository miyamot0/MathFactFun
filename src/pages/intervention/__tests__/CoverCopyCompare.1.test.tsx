/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import firebase from "firebase";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { mount, shallow } from "enzyme";
import { DocumentInputInterface, FirestoreState } from "../../../firebase/interfaces/FirebaseInterfaces";
import { CommentInterface } from "../../student/subcomponents/types/CommentTypes";
import { StudentDataInterface } from "../../student/interfaces/StudentInterfaces";
import { MemoryRouter } from "react-router-dom";
import CoverCopyCompare from "../CoverCopyCompare";

import * as KeyHandling from "./../helpers/KeyHandlingHelper";
import * as InterventionHelper from "./../helpers/InterventionHelpers";
import { waitFor } from "@testing-library/react";
import { InitialInterventionState as StartingState } from "../functionality/InterventionBehavior";
import { InterventionState } from "../interfaces/InterventionInterfaces";

import * as FirestoreHooks from './../../../firebase/hooks/useFirestore'
import * as FirestoreDocs from './../../../firebase/hooks/useFirebaseDocument'
import ReactModal from "react-modal";

Enzyme.configure({ adapter: new Adapter() });

const mockAddDocument = jest.fn();
const mockUpdateDocument = jest.fn();
const mockResponse = jest.fn();
const mockUseFirebaseDocumentTyped = jest.fn()

ReactModal.setAppElement = () => null;

jest.mock("./../../../firebase/hooks/useFirebaseDocument", () => {
  const firebase = require('firebase')
  const mockId = "123";
  const mockTarget = "Addition";
  const mockComment = {
    content: "string",
    displayName: "string",
    createdAt: "",
    createdBy: "",
    id: 0,
  };

  return {
    useFirebaseDocumentTyped: () => ({
      document: {
        id: mockId,
        aimLine: 0,
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        dueDate: firebase.firestore.Timestamp.fromDate(new Date()),
        lastActivity: firebase.firestore.Timestamp.fromDate(new Date()),
        comments: [mockComment] as CommentInterface[],
        completedBenchmark: [],
        currentBenchmarking: [],
        factsMastered: [],
        factsSkipped: [],
        factsTargeted: ["5+3=8:8:0", "1+2=3:8:1"],

        creator: "",
        currentApproach: "N/A",
        currentErrorApproach: "",
        currentGrade: "",
        currentSRApproach: "",
        currentTarget: mockTarget,
        details: "",
        name: "",
        problemSet: "",

        minForTask: 2,
      } as StudentDataInterface,
      documentError: undefined,
    }),
  };
});

jest.mock("./../../../firebase/hooks/useFirestore", () => {
  return {
    useFirestore: () => ({
      addDocument: mockAddDocument,
      updateDocument: mockUpdateDocument,
      response: mockResponse,
    })
  };
});

describe("CoverCopyCompare.1", () => {
  it('should render', () => {
    const wrapper = mount(
      <MemoryRouter>
        <CoverCopyCompare />
      </MemoryRouter>
    );

    expect(wrapper.find('div.box4').length).toBe(1)
  })
})