/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react"
import firebase from "firebase"
import { StudentDataInterface } from "../../student/interfaces/StudentInterfaces"

export interface DashboardMessageInterface {
    documentError: string | undefined,
    dataType: string
}

/** DashboardErrorMessage
 * 
 * @returns {JSX.Element}
 */
export function DashboardErrorMessage({ documentError, dataType }: DashboardMessageInterface): JSX.Element {
    if (!documentError) {
        throw Error("Unexpected undefined")
    }

    return <div className="error">`Error loading ${dataType} data: ${documentError}`</div>
}



/** DashboardLoadingMessage
 * 
 * @returns {JSX.Element}
 */
export function DashboardLoadingMessage({ documentError, dataType }: DashboardMessageInterface): JSX.Element {
    if (documentError) {
        throw Error("Unexpected error found")
    }
    return <div className="loading">`Loading ${dataType} data...`</div>
}

/** studentFilterMap
 * 
 * @param {StudentDataInterface[] | null} docs 
 * @param {firebase.User | null} usr 
 * @param {string} filter 
 * @returns {StudentDataInterface[] | null} 
 */
export function studentFilterMap(docs: StudentDataInterface[] | null, usr: firebase.User | null, filter: string): StudentDataInterface[] | null {
    if (!docs || !usr) {
        return null;
    } else {
        return docs.filter((document: StudentDataInterface) => {
            switch (filter) {
                case "All":
                    return true;
                case "Mine":
                    return document.creator === usr.uid;
                case "K":
                case "1st":
                case "2nd":
                case "3rd":
                case "4th":
                case "5th":
                case "6th":
                    return document.currentGrade === filter;
                default:
                    return true;
            }
        });
    }
}

/** practiceFilterMap
 * 
 * @param {StudentDataInterface[] | null} docs 
 * @param {firebase.User | null} usr 
 * @param {string} filter 
 * @returns {StudentDataInterface[] | null} 
 */
export function practiceFilterMap(docs: StudentDataInterface[] | null, usr: firebase.User | null, filter: string): StudentDataInterface[] | null {
    if (!docs || !usr) {
        return null;
    } else {
        return docs.filter((document) => {
            switch (filter) {
                case "All":
                    return document.currentApproach !== "NA";
                case "Mine":
                    return (
                        document.creator === usr.uid &&
                        document.currentApproach !== "NA"
                    );
                case "K":
                case "1st":
                case "2nd":
                case "3rd":
                case "4th":
                case "5th":
                case "6th":
                    return (
                        document.currentGrade === filter &&
                        document.currentApproach !== "NA"
                    );
                default:
                    return document.currentApproach !== "NA";
            }
        });
    }
}