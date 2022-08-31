/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import firebase from "firebase/app";

export interface CommentInterface {
  content?: string;
  displayName?: string;
  createdAt?: any;
  createdBy?: any;
  id?: number;
}

export interface StudentDataInterface {
  aimLine?: number;
  minForTask?: number;

  // Strings
  id?: string;
  creator?: string;
  currentApproach?: string;
  currentErrorApproach?: string;
  currentGrade?: string;
  currentSRApproach?: string;
  currentTarget?: string;
  details?: string;
  name?: string;
  problemSet?: string;

  // Timestamps
  createdAt?: firebase.firestore.Timestamp;
  dueDate?: firebase.firestore.Timestamp;
  lastActivity?: firebase.firestore.Timestamp;

  // Arrays
  comments: CommentInterface[];
  completedBenchmark: string[];
  currentBenchmarking: string[];
  factsMastered: string[];
  factsSkipped: string[];
  factsTargeted: string[];
}

interface StudentModelInterface {
  data: StudentDataInterface;
  CheckObject: () => boolean;
  SubmitObject: () => StudentDataInterface;
}

/** StudentModel
 *
 * Object representing instance of student
 *
 * @returns {StudentModelInterface}
 */
export function StudentModel(): StudentModelInterface {
  return {
    data: {
      // Numerics
      aimLine: 0,
      minForTask: 2,

      // Strings
      id: null,
      creator: null,
      currentApproach: "N/A",
      currentErrorApproach: null,
      currentGrade: null,
      currentSRApproach: null,
      currentTarget: "N/A",
      details: null,
      name: null,
      problemSet: "A",

      // Timestamps
      createdAt: null,
      dueDate: null,
      lastActivity: null,

      // Arrays
      comments: [],
      completedBenchmark: [],
      currentBenchmarking: [],
      factsMastered: [],
      factsSkipped: [],
      factsTargeted: [],
    },
    CheckObject: function () {
      if (typeof this.data.aimLine !== "number") return false;
      if (typeof this.data.minForTask !== "number") return false;

      if (typeof this.data.creator !== "string") return false;
      if (typeof this.data.currentApproach !== "string") return false;
      if (typeof this.data.currentErrorApproach !== "string") return false;
      if (typeof this.data.currentGrade !== "string") return false;
      if (typeof this.data.currentSRApproach !== "string") return false;
      if (typeof this.data.currentTarget !== "string") return false;
      if (typeof this.data.details !== "string") return false;
      if (typeof this.data.name !== "string") return false;
      if (typeof this.data.problemSet !== "string") return false;

      if (!(this.data.createdAt instanceof firebase.firestore.Timestamp))
        return false;
      if (!(this.data.lastActivity instanceof firebase.firestore.Timestamp))
        return false;
      if (!(this.data.dueDate instanceof firebase.firestore.Timestamp))
        return false;

      if (!Array.isArray(this.data.comments)) return false;
      if (!Array.isArray(this.data.completedBenchmark)) return false;
      if (!Array.isArray(this.data.currentBenchmarking)) return false;
      if (!Array.isArray(this.data.factsMastered)) return false;
      if (!Array.isArray(this.data.factsSkipped)) return false;
      if (!Array.isArray(this.data.factsTargeted)) return false;

      return true;
    },
    SubmitObject: function (): StudentDataInterface {
      return this.data;
    },
  };
}
