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
import { CommentInterface } from "../../subcomponents/types/CommentTypes";
import {
  StudentCreateState,
  StudentDataInterface,
} from "../../interfaces/StudentInterfaces";
import { StudentCreateSingleInitialState } from "../../functionality/StudentFunctionality";
import { FirestoreState } from "../../../../firebase/interfaces/FirebaseInterfaces";
import {
  onLoadSingleStudentEdit,
  verifyBulkStudentCreate,
  verifySingleStudentCreate,
  verifySingleStudentEdit,
} from "../StudentHelpers";
import { SingleOptionType } from "../../../../types/SharedComponentTypes";
import { ErrorHandling } from "../../../../maths/Facts";
import { MultiValue } from "react-select";

Enzyme.configure({ adapter: new Adapter() });

const mockData = {
  Name: undefined,
  Names: undefined,
  Details: undefined,
  FormError: undefined,
  DueDate: undefined,
  CurrentApproach: undefined,
  CurrentGrade: undefined,
  CurrentTarget: undefined,
  CurrentErrorApproach: undefined,
  CurrentSRApproach: undefined,
  CurrentBenchmarking: undefined,
  DidBuild: undefined,
  AimLine: undefined,
  ExplicitTime: undefined,
  CurrentProblemSet: undefined,
} as unknown as StudentCreateState;

const history = {
  push: (id: any) => true,
};

const addDocument = jest.fn();
const response = {} as FirestoreState;
const dispatch = jest.fn();

const mockComment = {
  content: "string",
  displayName: "string",
  createdAt: "",
  createdBy: "",
  id: 0,
};

const mockId = "123";

const mockDoc = {
  id: mockId,
  aimLine: 0,
  createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
  dueDate: firebase.firestore.Timestamp.fromDate(new Date()),
  lastActivity: firebase.firestore.Timestamp.fromDate(new Date()),
  comments: [mockComment] as CommentInterface[],
  completedBenchmark: [],
  currentBenchmarking: ["a", "b"],
  factsMastered: ["", ""],
  factsSkipped: ["", ""],
  factsTargeted: ["1+1=2", "1+2=3"],

  creator: "",
  currentApproach: "",
  currentErrorApproach: "",
  currentGrade: "",
  currentSRApproach: "",
  currentTarget: "Addition",
  details: "",
  name: "",
  problemSet: "",

  minForTask: 2,
} as StudentDataInterface;

describe("verifySingleStudentCreate", () => {
  it("Should dispatch out at base state", () => {
    const user = { uid: "123" } as firebase.User;
    const state = StudentCreateSingleInitialState;

    verifySingleStudentCreate(
      user,
      state,
      history,
      addDocument,
      response,
      dispatch
    );

    expect(dispatch).toBeCalled();
    expect(addDocument).toBeCalledTimes(0);
  });

  it("Should drop out at base state with null user", () => {
    const user = null as unknown as firebase.User;
    const state = StudentCreateSingleInitialState;

    verifySingleStudentCreate(
      user,
      state,
      history,
      addDocument,
      response,
      dispatch
    );

    expect(dispatch).toBeCalledTimes(0);
    expect(addDocument).toBeCalledTimes(0);
  });

  it("Should drop out at base state with undefined user", () => {
    const user = undefined as unknown as firebase.User;
    const state = StudentCreateSingleInitialState;

    verifySingleStudentCreate(
      user,
      state,
      history,
      addDocument,
      response,
      dispatch
    );

    expect(dispatch).toBeCalledTimes(0);
    expect(addDocument).toBeCalledTimes(0);
  });

  it("Should dispatch out at Grade", () => {
    const user = { uid: "123" } as firebase.User;
    const state = mockData;

    verifySingleStudentCreate(
      user,
      state,
      history,
      addDocument,
      response,
      dispatch
    );

    expect(dispatch).toBeCalledTimes(1);
    expect(addDocument).toBeCalledTimes(0);
  });

  it("Should dispatch out at CurrentTarget", () => {
    const user = { uid: "123" } as firebase.User;
    const state = {
      ...mockData,
      CurrentGrade: {
        value: "N/A",
        label: "No Current Intervention",
      } as SingleOptionType,
    };

    verifySingleStudentCreate(
      user,
      state,
      history,
      addDocument,
      response,
      dispatch
    );

    expect(dispatch).toBeCalledTimes(1);
    expect(addDocument).toBeCalledTimes(0);
  });

  it("Should dispatch out at CurrentApproach", () => {
    const user = { uid: "123" } as firebase.User;
    const state = {
      ...mockData,
      CurrentGrade: {
        value: "N/A",
        label: "No Current Intervention",
      } as SingleOptionType,
      CurrentTarget: {
        value: "N/A",
        label: "No Current Target",
      } as SingleOptionType,
    };

    verifySingleStudentCreate(
      user,
      state,
      history,
      addDocument,
      response,
      dispatch
    );

    expect(dispatch).toBeCalledTimes(1);
    expect(addDocument).toBeCalledTimes(0);
  });

  it("Should dispatch out at CurrentErrorApproach", () => {
    const user = { uid: "123" } as firebase.User;
    const state = {
      ...mockData,
      CurrentGrade: {
        value: "N/A",
        label: "No Current Intervention",
      } as SingleOptionType,
      CurrentTarget: {
        value: "N/A",
        label: "No Current Target",
      } as SingleOptionType,
      CurrentApproach: {
        value: "N/A",
        label: "No Current Intervention",
      } as SingleOptionType,
    };

    verifySingleStudentCreate(
      user,
      state,
      history,
      addDocument,
      response,
      dispatch
    );

    expect(dispatch).toBeCalledTimes(1);
    expect(addDocument).toBeCalledTimes(0);
  });

  it("Should dispatch out at CurrentSRApproach", () => {
    const user = { uid: "123" } as firebase.User;
    const state = {
      ...mockData,
      CurrentGrade: {
        value: "N/A",
        label: "No Current Intervention",
      } as SingleOptionType,
      CurrentTarget: {
        value: "N/A",
        label: "No Current Target",
      } as SingleOptionType,
      CurrentApproach: {
        value: "N/A",
        label: "No Current Intervention",
      } as SingleOptionType,
      CurrentErrorApproach: {
        value: ErrorHandling.EveryTime,
        label: "Give feedback every time",
      } as SingleOptionType,
    };

    verifySingleStudentCreate(
      user,
      state,
      history,
      addDocument,
      response,
      dispatch
    );

    expect(dispatch).toBeCalledTimes(1);
    expect(addDocument).toBeCalledTimes(0);
  });

  it("Should make it to submit", () => {
    const user = { uid: "123" } as firebase.User;
    const state = {
      Name: "",
      Names: [],
      Details: "",
      FormError: undefined,
      DueDate: "",
      CurrentApproach: {
        value: "N/A",
        label: "No Current Intervention",
      } as SingleOptionType,
      CurrentGrade: {
        value: "N/A",
        label: "No Current Intervention",
      } as SingleOptionType,
      CurrentTarget: {
        value: "N/A",
        label: "No Current Target",
      } as SingleOptionType,
      CurrentErrorApproach: {
        value: ErrorHandling.EveryTime,
        label: "Give feedback every time",
      } as SingleOptionType,
      CurrentSRApproach: {
        value: "None",
        label: "No programmed contingencies",
      } as SingleOptionType,
      CurrentBenchmarking: [
        {
          value: "Asdf",
          label: "Asdf",
        },
      ] as MultiValue<SingleOptionType>,
      DidBuild: false,
      AimLine: 0,
      ExplicitTime: 2,
      CurrentProblemSet: {
        value: "A",
        label: "A",
      } as SingleOptionType,
    };

    verifySingleStudentCreate(
      user,
      state,
      history,
      addDocument,
      response,
      dispatch
    );

    expect(dispatch).toBeCalledTimes(1);
    expect(addDocument).toBeCalledTimes(1);
  });

  it("Should make it to submit but trip response error", () => {
    const user = { uid: "123" } as firebase.User;
    const state = {
      Name: "",
      Names: [],
      Details: "",
      FormError: undefined,
      DueDate: "",
      CurrentApproach: {
        value: "N/A",
        label: "No Current Intervention",
      } as SingleOptionType,
      CurrentGrade: {
        value: "N/A",
        label: "No Current Intervention",
      } as SingleOptionType,
      CurrentTarget: {
        value: "N/A",
        label: "No Current Target",
      } as SingleOptionType,
      CurrentErrorApproach: {
        value: ErrorHandling.EveryTime,
        label: "Give feedback every time",
      } as SingleOptionType,
      CurrentSRApproach: {
        value: "None",
        label: "No programmed contingencies",
      } as SingleOptionType,
      CurrentBenchmarking: [
        {
          value: "Asdf",
          label: "Asdf",
        },
      ] as MultiValue<SingleOptionType>,
      DidBuild: false,
      AimLine: 0,
      ExplicitTime: 2,
      CurrentProblemSet: {
        value: "A",
        label: "A",
      } as SingleOptionType,
    };

    const response2 = {
      ...response,
      error: "error",
    };

    verifySingleStudentCreate(
      user,
      state,
      history,
      addDocument,
      response2,
      dispatch
    );

    expect(dispatch).toBeCalledTimes(1);
    expect(addDocument).toBeCalledTimes(1);
  });
});

describe("verifySingleStudentEdit", () => {
  it("Should dispatch out at base state", () => {
    const id = "123";
    const state = StudentCreateSingleInitialState;
    const document = mockDoc;

    verifySingleStudentEdit(
      id,
      state,
      document,
      history,
      addDocument,
      response,
      dispatch
    );

    expect(dispatch).toBeCalled();
    expect(addDocument).toBeCalledTimes(0);
  });

  it("Should drop out at base state with null user", () => {
    const id = null as unknown as string;
    const state = StudentCreateSingleInitialState;
    const document = mockDoc;

    verifySingleStudentEdit(
      id,
      state,
      document,
      history,
      addDocument,
      response,
      dispatch
    );

    expect(dispatch).toBeCalledTimes(0);
    expect(addDocument).toBeCalledTimes(0);
  });

  it("Should drop out at base state with undefined user", () => {
    const id = undefined;
    const state = StudentCreateSingleInitialState;
    const document = mockDoc;

    verifySingleStudentEdit(
      id,
      state,
      document,
      history,
      addDocument,
      response,
      dispatch
    );

    expect(dispatch).toBeCalledTimes(0);
    expect(addDocument).toBeCalledTimes(0);
  });

  it("Should dispatch out at Grade", () => {
    const id = "123";
    const state = mockData;
    const document = mockDoc;

    verifySingleStudentEdit(
      id,
      state,
      document,
      history,
      addDocument,
      response,
      dispatch
    );

    expect(dispatch).toBeCalledTimes(1);
    expect(addDocument).toBeCalledTimes(0);
  });

  it("Should dispatch out at CurrentTarget", () => {
    const id = "123";
    const document = mockDoc;
    const state = {
      ...mockData,
      CurrentGrade: {
        value: "N/A",
        label: "No Current Intervention",
      } as SingleOptionType,
    };

    verifySingleStudentEdit(
      id,
      state,
      document,
      history,
      addDocument,
      response,
      dispatch
    );

    expect(dispatch).toBeCalledTimes(1);
    expect(addDocument).toBeCalledTimes(0);
  });

  it("Should dispatch out at CurrentApproach", () => {
    const id = "123";
    const document = mockDoc;
    const state = {
      ...mockData,
      CurrentGrade: {
        value: "N/A",
        label: "No Current Intervention",
      } as SingleOptionType,
      CurrentTarget: {
        value: "N/A",
        label: "No Current Target",
      } as SingleOptionType,
    };

    verifySingleStudentEdit(
      id,
      state,
      document,
      history,
      addDocument,
      response,
      dispatch
    );

    expect(dispatch).toBeCalledTimes(1);
    expect(addDocument).toBeCalledTimes(0);
  });

  it("Should dispatch out at CurrentErrorApproach", () => {
    const id = "123";
    const document = mockDoc;
    const state = {
      ...mockData,
      CurrentGrade: {
        value: "N/A",
        label: "No Current Intervention",
      } as SingleOptionType,
      CurrentTarget: {
        value: "N/A",
        label: "No Current Target",
      } as SingleOptionType,
      CurrentApproach: {
        value: "N/A",
        label: "No Current Intervention",
      } as SingleOptionType,
    };

    verifySingleStudentEdit(
      id,
      state,
      document,
      history,
      addDocument,
      response,
      dispatch
    );

    expect(dispatch).toBeCalledTimes(1);
    expect(addDocument).toBeCalledTimes(0);
  });

  it("Should dispatch out at CurrentSRApproach", () => {
    const id = "123";
    const document = mockDoc;
    const state = {
      ...mockData,
      CurrentGrade: {
        value: "N/A",
        label: "No Current Intervention",
      } as SingleOptionType,
      CurrentTarget: {
        value: "N/A",
        label: "No Current Target",
      } as SingleOptionType,
      CurrentApproach: {
        value: "N/A",
        label: "No Current Intervention",
      } as SingleOptionType,
      CurrentErrorApproach: {
        value: ErrorHandling.EveryTime,
        label: "Give feedback every time",
      } as SingleOptionType,
    };

    verifySingleStudentEdit(
      id,
      state,
      document,
      history,
      addDocument,
      response,
      dispatch
    );

    expect(dispatch).toBeCalledTimes(1);
    expect(addDocument).toBeCalledTimes(0);
  });

  it("Should make it to submit", () => {
    const id = "123";
    const document = mockDoc;
    const state = {
      Name: "",
      Names: [],
      Details: "",
      FormError: undefined,
      DueDate: "",
      CurrentApproach: {
        value: "N/A",
        label: "No Current Intervention",
      } as SingleOptionType,
      CurrentGrade: {
        value: "N/A",
        label: "No Current Intervention",
      } as SingleOptionType,
      CurrentTarget: {
        value: "N/A",
        label: "No Current Target",
      } as SingleOptionType,
      CurrentErrorApproach: {
        value: ErrorHandling.EveryTime,
        label: "Give feedback every time",
      } as SingleOptionType,
      CurrentSRApproach: {
        value: "None",
        label: "No programmed contingencies",
      } as SingleOptionType,
      CurrentBenchmarking: [
        {
          value: "Asdf",
          label: "Asdf",
        },
      ] as MultiValue<SingleOptionType>,
      DidBuild: false,
      AimLine: 0,
      ExplicitTime: 2,
      CurrentProblemSet: {
        value: "A",
        label: "A",
      } as SingleOptionType,
    };

    verifySingleStudentEdit(
      id,
      state,
      document,
      history,
      addDocument,
      response,
      dispatch
    );

    expect(dispatch).toBeCalledTimes(1);
    expect(addDocument).toBeCalledTimes(1);
  });

  it("Should make it to submit, without blanking facts", () => {
    const id = "123";
    const document = mockDoc;
    const state = {
      Name: "",
      Names: [],
      Details: "",
      FormError: undefined,
      DueDate: "",
      CurrentApproach: {
        value: "N/A",
        label: "No Current Intervention",
      } as SingleOptionType,
      CurrentGrade: {
        value: "N/A",
        label: "No Current Intervention",
      } as SingleOptionType,
      CurrentTarget: {
        value: "Addition",
        label: "Addition",
      } as SingleOptionType,
      CurrentErrorApproach: {
        value: ErrorHandling.EveryTime,
        label: "Give feedback every time",
      } as SingleOptionType,
      CurrentSRApproach: {
        value: "None",
        label: "No programmed contingencies",
      } as SingleOptionType,
      CurrentBenchmarking: [
        {
          value: "Asdf",
          label: "Asdf",
        },
      ] as MultiValue<SingleOptionType>,
      DidBuild: false,
      AimLine: 0,
      ExplicitTime: 2,
      CurrentProblemSet: {
        value: "A",
        label: "A",
      } as SingleOptionType,
    };

    verifySingleStudentEdit(
      id,
      state,
      document,
      history,
      addDocument,
      response,
      dispatch
    );

    expect(dispatch).toBeCalledTimes(1);
    expect(addDocument).toBeCalledTimes(1);
  });

  it("Should make it to submit but trip response error", () => {
    const id = "123";
    const document = mockDoc;
    const state = {
      Name: "",
      Names: [],
      Details: "",
      FormError: undefined,
      DueDate: "",
      CurrentApproach: {
        value: "N/A",
        label: "No Current Intervention",
      } as SingleOptionType,
      CurrentGrade: {
        value: "N/A",
        label: "No Current Intervention",
      } as SingleOptionType,
      CurrentTarget: {
        value: "N/A",
        label: "No Current Target",
      } as SingleOptionType,
      CurrentErrorApproach: {
        value: ErrorHandling.EveryTime,
        label: "Give feedback every time",
      } as SingleOptionType,
      CurrentSRApproach: {
        value: "None",
        label: "No programmed contingencies",
      } as SingleOptionType,
      CurrentBenchmarking: [
        {
          value: "Asdf",
          label: "Asdf",
        },
      ] as MultiValue<SingleOptionType>,
      DidBuild: false,
      AimLine: 0,
      ExplicitTime: 2,
      CurrentProblemSet: {
        value: "A",
        label: "A",
      } as SingleOptionType,
    };

    const response2 = {
      ...response,
      error: "error",
    };

    verifySingleStudentEdit(
      id,
      state,
      document,
      history,
      addDocument,
      response2,
      dispatch
    );

    expect(dispatch).toBeCalledTimes(1);
    expect(addDocument).toBeCalledTimes(1);
  });
});

describe("onLoadSingleStudentEdit", () => {
  it("Should dispatch out at base state", () => {
    const document = {
      ...mockDoc,
      currentTarget: "Addition",
    } as StudentDataInterface;
    const dispatch = jest.fn();

    onLoadSingleStudentEdit(document, dispatch);
  });
});

describe("verifyBulkStudentCreate", () => {
  it("Should dispatch out at Grade", () => {
    const id = "123";
    const state = mockData;

    verifyBulkStudentCreate(
      id,
      state,
      history,
      addDocument,
      response,
      dispatch
    );

    expect(dispatch).toBeCalled();
    expect(addDocument).toBeCalledTimes(0);
  });

  it("Should dispatch out at CurrentTarget", () => {
    const id = "123";
    const state = {
      ...mockData,
      CurrentGrade: {
        value: "N/A",
        label: "No Current Intervention",
      } as SingleOptionType,
    };

    verifyBulkStudentCreate(
      id,
      state,
      history,
      addDocument,
      response,
      dispatch
    );

    expect(dispatch).toBeCalledTimes(1);
    expect(addDocument).toBeCalledTimes(0);
  });

  it("Should dispatch out at CurrentApproach", () => {
    const id = "123";
    const state = {
      ...mockData,
      CurrentGrade: {
        value: "N/A",
        label: "No Current Intervention",
      } as SingleOptionType,
      CurrentTarget: {
        value: "N/A",
        label: "No Current Target",
      } as SingleOptionType,
    };

    verifyBulkStudentCreate(
      id,
      state,
      history,
      addDocument,
      response,
      dispatch
    );

    expect(dispatch).toBeCalledTimes(1);
    expect(addDocument).toBeCalledTimes(0);
  });

  it("Should dispatch out at CurrentErrorApproach", () => {
    const id = "123";
    const state = {
      ...mockData,
      CurrentGrade: {
        value: "N/A",
        label: "No Current Intervention",
      } as SingleOptionType,
      CurrentTarget: {
        value: "N/A",
        label: "No Current Target",
      } as SingleOptionType,
      CurrentApproach: {
        value: "N/A",
        label: "No Current Intervention",
      } as SingleOptionType,
    };

    verifyBulkStudentCreate(
      id,
      state,
      history,
      addDocument,
      response,
      dispatch
    );

    expect(dispatch).toBeCalledTimes(1);
    expect(addDocument).toBeCalledTimes(0);
  });

  it("Should dispatch out at CurrentSRApproach", () => {
    const id = "123";
    const state = {
      ...mockData,
      CurrentGrade: {
        value: "N/A",
        label: "No Current Intervention",
      } as SingleOptionType,
      CurrentTarget: {
        value: "N/A",
        label: "No Current Target",
      } as SingleOptionType,
      CurrentApproach: {
        value: "N/A",
        label: "No Current Intervention",
      } as SingleOptionType,
      CurrentErrorApproach: {
        value: ErrorHandling.EveryTime,
        label: "Give feedback every time",
      } as SingleOptionType,
    };

    verifyBulkStudentCreate(
      id,
      state,
      history,
      addDocument,
      response,
      dispatch
    );

    expect(dispatch).toBeCalledTimes(1);
    expect(addDocument).toBeCalledTimes(0);
  });

  it("Should dispatch out at CurrentBenchmarking", () => {
    const id = "123";
    const state = {
      ...mockData,
      CurrentGrade: {
        value: "N/A",
        label: "No Current Intervention",
      } as SingleOptionType,
      CurrentTarget: {
        value: "N/A",
        label: "No Current Target",
      } as SingleOptionType,
      CurrentApproach: {
        value: "N/A",
        label: "No Current Intervention",
      } as SingleOptionType,
      CurrentErrorApproach: {
        value: ErrorHandling.EveryTime,
        label: "Give feedback every time",
      } as SingleOptionType,
      CurrentSRApproach: {
        value: "None",
        label: "No programmed contingencies",
      } as SingleOptionType,
    };

    verifyBulkStudentCreate(
      id,
      state,
      history,
      addDocument,
      response,
      dispatch
    );

    expect(dispatch).toBeCalledTimes(2);
    expect(addDocument).toBeCalledTimes(0);
  });

  it("Should dispatch out at CurrentBenchmarking (empty array)", () => {
    const id = "123";
    const state = {
      ...mockData,
      CurrentGrade: {
        value: "N/A",
        label: "No Current Intervention",
      } as SingleOptionType,
      CurrentTarget: {
        value: "N/A",
        label: "No Current Target",
      } as SingleOptionType,
      CurrentApproach: {
        value: "N/A",
        label: "No Current Intervention",
      } as SingleOptionType,
      CurrentErrorApproach: {
        value: ErrorHandling.EveryTime,
        label: "Give feedback every time",
      } as SingleOptionType,
      CurrentSRApproach: {
        value: "None",
        label: "No programmed contingencies",
      } as SingleOptionType,
      CurrentBenchmarking: [] as MultiValue<SingleOptionType>,
    };

    verifyBulkStudentCreate(
      id,
      state,
      history,
      addDocument,
      response,
      dispatch
    );

    expect(dispatch).toBeCalledTimes(2);
    expect(addDocument).toBeCalledTimes(0);
  });

  it("Should make it to submit", () => {
    const id = "123";
    const state = {
      Name: "Kid 1\nKid 2",
      Names: ["Kid 1", "Kid 2"],
      Details: "",
      FormError: undefined,
      DueDate: "",
      CurrentApproach: {
        value: "N/A",
        label: "No Current Intervention",
      } as SingleOptionType,
      CurrentGrade: {
        value: "N/A",
        label: "No Current Intervention",
      } as SingleOptionType,
      CurrentTarget: {
        value: "N/A",
        label: "No Current Target",
      } as SingleOptionType,
      CurrentErrorApproach: {
        value: ErrorHandling.EveryTime,
        label: "Give feedback every time",
      } as SingleOptionType,
      CurrentSRApproach: {
        value: "None",
        label: "No programmed contingencies",
      } as SingleOptionType,
      CurrentBenchmarking: [
        {
          value: "Asdf",
          label: "Asdf",
        },
      ] as MultiValue<SingleOptionType>,
      DidBuild: false,
      AimLine: 0,
      ExplicitTime: 2,
      CurrentProblemSet: {
        value: "A",
        label: "A",
      } as SingleOptionType,
    };

    verifyBulkStudentCreate(
      id,
      state,
      history,
      addDocument,
      response,
      dispatch
    );

    expect(dispatch).toBeCalledTimes(1);
    expect(addDocument).toBeCalledTimes(1);
  });

  it("Should make it to submit, but have to skip empty lines", () => {
    const id = "123";
    const state = {
      Name: "Kid 1\n",
      Names: ["Kid 1", "Kid 2"],
      Details: "",
      FormError: undefined,
      DueDate: "",
      CurrentApproach: {
        value: "N/A",
        label: "No Current Intervention",
      } as SingleOptionType,
      CurrentGrade: {
        value: "N/A",
        label: "No Current Intervention",
      } as SingleOptionType,
      CurrentTarget: {
        value: "N/A",
        label: "No Current Target",
      } as SingleOptionType,
      CurrentErrorApproach: {
        value: ErrorHandling.EveryTime,
        label: "Give feedback every time",
      } as SingleOptionType,
      CurrentSRApproach: {
        value: "None",
        label: "No programmed contingencies",
      } as SingleOptionType,
      CurrentBenchmarking: [
        {
          value: "Asdf",
          label: "Asdf",
        },
      ] as MultiValue<SingleOptionType>,
      DidBuild: false,
      AimLine: 0,
      ExplicitTime: 2,
      CurrentProblemSet: {
        value: "A",
        label: "A",
      } as SingleOptionType,
    };

    verifyBulkStudentCreate(
      id,
      state,
      history,
      addDocument,
      response,
      dispatch
    );

    expect(dispatch).toBeCalledTimes(1);
    expect(addDocument).toBeCalledTimes(1);
  });

  it("Should make it to submit but trip response error", () => {
    const id = "123";
    const state = {
      Name: "Kid 1\nKid 2",
      Names: ["Kid 1", "Kid 2"],
      Details: "",
      FormError: undefined,
      DueDate: "",
      CurrentApproach: {
        value: "N/A",
        label: "No Current Intervention",
      } as SingleOptionType,
      CurrentGrade: {
        value: "N/A",
        label: "No Current Intervention",
      } as SingleOptionType,
      CurrentTarget: {
        value: "N/A",
        label: "No Current Target",
      } as SingleOptionType,
      CurrentErrorApproach: {
        value: ErrorHandling.EveryTime,
        label: "Give feedback every time",
      } as SingleOptionType,
      CurrentSRApproach: {
        value: "None",
        label: "No programmed contingencies",
      } as SingleOptionType,
      CurrentBenchmarking: [
        {
          value: "Asdf",
          label: "Asdf",
        },
      ] as MultiValue<SingleOptionType>,
      DidBuild: false,
      AimLine: 0,
      ExplicitTime: 2,
      CurrentProblemSet: {
        value: "A",
        label: "A",
      } as SingleOptionType,
    };

    const response2 = {
      ...response,
      error: "error",
    };

    verifyBulkStudentCreate(
      id,
      state,
      history,
      addDocument,
      response2,
      dispatch
    );

    expect(dispatch).toBeCalledTimes(1);
    expect(addDocument).toBeCalledTimes(1);
  });
});
