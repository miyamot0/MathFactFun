/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import { StudentCreatorBehavior } from "../pages/student/types/StudentTypes";
import Select, { MultiValue, SingleValue } from "react-select";
import { SingleOptionType } from "../types/SharedComponentTypes";
import { UserCreatorBehavior } from "../pages/user/types/UserTypes";
import {
  StudentDataDispatches,
  StudentDispatchUpdateAimLine,
  StudentDispatchUpdateCurrentApproach,
  StudentDispatchUpdateCurrentBenchmarking,
  StudentDispatchUpdateCurrentErrorApproach,
  StudentDispatchUpdateCurrentGrade,
  StudentDispatchUpdateCurrentProblemSet,
  StudentDispatchUpdateCurrentSRApproach,
  StudentDispatchUpdateCurrentTarget,
  StudentDispatchUpdateDetails,
  StudentDispatchUpdateDueDate,
  StudentDispatchUpdateExplicitTime,
  StudentDispatchUpdateName
} from "../pages/student/interfaces/StudentInterfaces";
import { UserDispatchUpdateName, UserDispatchUpdateSchool } from "../pages/user/interfaces/UserInterfaces";

export interface StandardEntryFieldText {
  label: string;
  currentValue: string;
  type: StudentCreatorBehavior | UserCreatorBehavior;
  dispatch: any;
}

/** standardEntryFieldText
 *
 * @param currentValue
 * @param type
 * @param dispatch
 * @returns
 */
export function StandardEntryFieldText({
  label,
  currentValue,
  type,
  dispatch }: StandardEntryFieldText) {
  return (
    <label>
      <span>{label}:</span>
      <input
        required
        type="text"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          switch (type) {
            case StudentCreatorBehavior.SetName:
              dispatch(new StudentDispatchUpdateName({
                type,
                payload: {
                  Name: e.target.value
                }
              }));
              break;
            case UserCreatorBehavior.SetName:
              dispatch(new UserDispatchUpdateName({
                type,
                payload: {
                  Name: e.target.value
                }
              }));
              break;
          }
        }}
        value={currentValue}
      ></input>
    </label>
  );
}

/** standardEmailFieldText
 *
 * @param currentValue
 * @param type
 * @param dispatch
 * @returns
 */
export function standardEmailFieldText(
  label: string,
  currentValue: string,
  type: StudentCreatorBehavior | UserCreatorBehavior,
  dispatch: any
) {
  return (
    <label>
      <span>{label}:</span>
      <input
        required
        type="email"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          dispatch({
            type: type,
            payload: e.target.value,
          });
        }}
        value={currentValue}
      ></input>
    </label>
  );
}

/** standardPasswordFieldText
 *
 * @param currentValue
 * @param type
 * @param dispatch
 * @returns
 */
export function standardPasswordFieldText(
  label: string,
  currentValue: string,
  type: StudentCreatorBehavior | UserCreatorBehavior,
  dispatch: any
) {
  return (
    <label>
      <span>{label}:</span>
      <input
        required
        type="password"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          dispatch({
            type: type,
            payload: e.target.value,
          });
        }}
        value={currentValue}
      ></input>
    </label>
  );
}

export interface StandardEntryFieldTextArea {
  label: string;
  currentValue: string;
  type: StudentCreatorBehavior | UserCreatorBehavior;
  dispatch: any;
}

/** standardEntryFieldTextArea
 *
 * @param label
 * @param currentValue
 * @param type
 * @param dispatch
 * @returns
 */
export function StandardEntryFieldTextArea({
  label,
  currentValue,
  type,
  dispatch }: StandardEntryFieldTextArea) {
  return (
    <label>
      <span>{label}:</span>
      <textarea
        required
        onChange={(e) => {
          switch (type) {
            case StudentCreatorBehavior.SetDetails:
              dispatch(new StudentDispatchUpdateDetails({
                type: StudentCreatorBehavior.SetDetails,
                payload: {
                  Details: e.target.value
                }
              }));
              break;

            case UserCreatorBehavior.SetName:
              dispatch(new UserDispatchUpdateName({
                type: UserCreatorBehavior.SetName,
                payload: {
                  Name: e.target.value
                }
              }));
              break;

            case UserCreatorBehavior.SetSchool:
              dispatch(new UserDispatchUpdateSchool({
                type: UserCreatorBehavior.SetSchool,
                payload: {
                  School: e.target.value
                }
              }));
              break;
          }
        }}
        value={currentValue}
      ></textarea>
    </label>
  );
}

export interface StandardEntryFieldNumber {
  label: string;
  currentValue: number;
  type: StudentCreatorBehavior;
  dispatch: React.Dispatch<StudentDataDispatches>;
}

/** standardEntryFieldNumber
 *
 * @param label
 * @param currentValue
 * @param type
 * @param dispatch
 * @returns
 */
export function StandardEntryFieldNumber({
  label,
  currentValue,
  type,
  dispatch }: StandardEntryFieldNumber) {
  return (
    <label>
      <span>{label}:</span>
      <input
        required
        type="number"
        min="0"
        max="80"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          switch (type) {
            case StudentCreatorBehavior.SetAimLine:
              dispatch(new StudentDispatchUpdateAimLine({
                type: StudentCreatorBehavior.SetAimLine,
                payload: {
                  AimLine: parseInt(e.target.value)
                }
              }));
              break;
            case StudentCreatorBehavior.SetExplicitTime:
              dispatch(new StudentDispatchUpdateExplicitTime({
                type: StudentCreatorBehavior.SetExplicitTime,
                payload: {
                  ExplicitTime: parseInt(e.target.value)
                }
              }));
              break;
          }
        }}
        value={currentValue}
      ></input>
    </label>
  );
}

export interface StandardEntryFieldDate {
  label: string;
  currentValue: string;
  type: StudentCreatorBehavior | UserCreatorBehavior;
  dispatch: React.Dispatch<StudentDataDispatches>;
}

/** StandardEntryFieldDate
 *
 * @param label
 * @param currentValue
 * @param type
 * @param dispatch
 * @returns
 */
export function StandardEntryFieldDate({
  label,
  currentValue,
  type,
  dispatch }: StandardEntryFieldDate) {
  return (
    <label>
      <span>{label}:</span>
      <input
        required
        type="date"
        onChange={(e) => {
          dispatch(new StudentDispatchUpdateDueDate({
            type,
            payload: {
              DueDate: e.target.value
            }
          }));
        }}
        value={currentValue}
      ></input>
    </label>
  );
}

export interface StandardSelectField {
  label: string;
  options: SingleOptionType[];
  currentValue: SingleOptionType;
  type: StudentCreatorBehavior;
  dispatch: React.Dispatch<StudentDataDispatches>;
}

/**
 *
 * @param label
 * @param options
 * @param currentValue
 * @param type
 * @param dispatch
 * @returns
 */
export function StandardSelectField({
  label,
  options,
  currentValue,
  type,
  dispatch }: StandardSelectField) {
  return (
    <>
      <label htmlFor="single-field" className="select-label">
        {label}:
      </label>
      <Select
        name={"single-field"}
        inputId={"single-field"}
        options={options}
        onChange={(option: SingleValue<SingleOptionType>) => {
          switch (type) {
            case StudentCreatorBehavior.SetCurrentGrade:
              dispatch(new StudentDispatchUpdateCurrentGrade({
                type,
                payload: {
                  CurrentGrade: option as SingleOptionType
                }
              }));
              break;
            case StudentCreatorBehavior.SetCurrentTarget:
              dispatch(new StudentDispatchUpdateCurrentTarget({
                type,
                payload: {
                  CurrentTarget: option as SingleOptionType
                }
              }));
              break;
            case StudentCreatorBehavior.SetCurrentApproach:
              dispatch(new StudentDispatchUpdateCurrentApproach({
                type,
                payload: {
                  CurrentApproach: option as SingleOptionType
                }
              }));
              break;
            case StudentCreatorBehavior.SetCurrentErrorApproach:
              dispatch(new StudentDispatchUpdateCurrentErrorApproach({
                type,
                payload: {
                  CurrentErrorApproach: option as SingleOptionType
                }
              }));
              break;
            case StudentCreatorBehavior.SetCurrentSRApproach:
              dispatch(new StudentDispatchUpdateCurrentSRApproach({
                type,
                payload: {
                  CurrentSRApproach: option as SingleOptionType
                }
              }));
              break;
            case StudentCreatorBehavior.SetProblemSet:
              dispatch(new StudentDispatchUpdateCurrentProblemSet({
                type,
                payload: {
                  CurrentProblemSet: option as SingleOptionType
                }
              }));
              break;
          }
        }}
        value={currentValue}
      />
    </>
  );
}

export interface StandardSelectFieldMulti {
  label: string;
  options: SingleOptionType[];
  currentValue: MultiValue<SingleOptionType>;
  type: StudentCreatorBehavior;
  dispatch: React.Dispatch<StudentDataDispatches>;
}

/** standardSelectFieldMulti
 *
 * @param label
 * @param options
 * @param currentValue
 * @param type
 * @param dispatch
 * @returns
 */
export function StandardSelectFieldMulti({
  label,
  options,
  currentValue,
  type,
  dispatch }: StandardSelectFieldMulti) {
  return (
    <>
      <label htmlFor="multi-field" className="select-label">
        {label}:
      </label>
      <Select
        name={"multi-field"}
        inputId={"multi-field"}
        options={options}
        onChange={(option: MultiValue<SingleOptionType>) => {
          dispatch(new StudentDispatchUpdateCurrentBenchmarking({
            type,
            payload: {
              CurrentBenchmarking: option
            }
          }));
        }}
        value={currentValue}
        isMulti={true}
      />
    </>
  );
}

export interface StandardErrorField {
  formError: string | undefined | null;
}

/** standardErrorField
 *
 * @param formError
 * @returns
 */
export function StandardErrorField({
  formError }: StandardErrorField) {
  if (formError === undefined) {
    return <></>;
  } else {
    return <p className="error">{formError}</p>;
  }
}
