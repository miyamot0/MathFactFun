import React from "react";
import { StudentCreatorBehavior } from "../pages/student/types/StudentTypes";
import Select, { MultiValue } from "react-select";
import { SingleOptionType } from "../types/SharedComponentTypes";

/** studentEntryFieldText
 * 
 * @param currentValue 
 * @param type 
 * @param dispatch 
 * @returns 
 */
export function studentEntryFieldText(label: string, currentValue: string, type: StudentCreatorBehavior, dispatch: any) {
    return <label>
        <span>{label}:</span>
        <input
            required
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch({
                    type: type,
                    payload: e.target.value,
                });
            }}
            value={currentValue}
        ></input>
    </label>;
}

/** studentEntryFieldTextArea
 * 
 * @param label 
 * @param currentValue 
 * @param type 
 * @param dispatch 
 * @returns 
 */
export function studentEntryFieldTextArea(label: string, currentValue: string, type: StudentCreatorBehavior, dispatch: any) {
    return <label>
        <span>{label}:</span>
        <textarea
            required
            onChange={(e) => {
                dispatch({
                    type: type,
                    payload: e.target.value,
                });
            }}
            value={currentValue}
        ></textarea>
    </label>;
}

/** studentEntryFieldDate
 * 
 * @param label 
 * @param currentValue 
 * @param type 
 * @param dispatch 
 * @returns 
 */
export function studentEntryFieldDate(label: string, currentValue: string, type: StudentCreatorBehavior, dispatch: any) {
    return <label>
        <span>{label}:</span>
        <input
            required
            type="date"
            onChange={(e) => {
                dispatch({
                    type: type,
                    payload: e.target.value,
                });
            }}
            value={currentValue}
        ></input>
    </label>;
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
export function studentSelectField(label: string, options: any, currentValue: SingleOptionType, type: StudentCreatorBehavior, dispatch: any) {
    return <label>
        <span>{label}:</span>
        <Select
            options={options}
            onChange={(option) => {
                dispatch({
                    type: type,
                    payload: option,
                });
            }}
        />
    </label>;
}

/** studentSelectFieldMulti
 * 
 * @param label 
 * @param options 
 * @param currentValue 
 * @param type 
 * @param dispatch 
 * @returns 
 */
export function studentSelectFieldMulti(label: string, options: any, currentValue: MultiValue<SingleOptionType>, type: StudentCreatorBehavior, dispatch: any) {
    return <label>
        <span>{label}</span>
        <Select
            options={options}
            onChange={(option: MultiValue<SingleOptionType>) => {
                dispatch({
                    type: type,
                    payload: option,
                });
            }}
            value={currentValue}
            isMulti={true}
        />
    </label>;
}

/** studentErrorField
 * 
 * @param formError 
 * @returns 
 */
export function studentErrorField(formError: string | undefined | null) {
    if (formError === undefined) {
        return <></>
    } else {
        return formError && <p className="error">{formError}</p>;
    }
}