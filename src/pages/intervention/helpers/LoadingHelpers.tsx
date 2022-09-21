/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { GetOperatorFromLabel } from "../../../utilities/LabelHelper";
import { StudentDataInterface } from "../../student/interfaces/StudentInterfaces";
import { InterventionState } from "../interfaces/InterventionInterfaces";
import { completeLoadingDispatch } from "./DispatchingHelpers";

export function GeneralDataLoader({ intervention, state, document, dispatch }:
    {
        intervention: string;
        state: InterventionState;
        document: StudentDataInterface | null;
        dispatch: any;
    }) {
    if (document !== null && state.LoadedData === false) {
        completeLoadingDispatch({
            intervention: intervention,
            workingData: document.factsTargeted,
            operatorSymbol: GetOperatorFromLabel(document.currentTarget),
            dispatch,
        });
    }
    else {
        return;
    }
}