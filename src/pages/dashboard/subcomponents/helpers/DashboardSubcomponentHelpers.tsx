
import React from "react"
import firebase from "firebase"
import { Link } from "react-router-dom";
import { StudentDataInterface } from "../../../student/interfaces/StudentInterfaces";

/** generateRouteBaseOnStrategy
 *
 * Generate a link to practice screen
 *
 * @param {string} strategy Intervention type
 * @param {string} target Intervention target
 * @param {string} id Personal id
 * @returns {string} path
 */
export function generateRouteBaseOnStrategy(
    strategy: string | undefined,
    target: string | undefined,
    id: string | undefined | null
): string {
    if (strategy === undefined || target === undefined || id === undefined) {
        return "#!";
    }

    return `/${strategy}/${target}/${id}`;
}

/** checkIfDateCurrent
 *
 * Check to see if date within a days difference
 *
 * @param {firebase.firestore.Timestamp} date Stored date, to compare with current
 * @returns {Bool}
 */
export function checkIfDateCurrent(
    date: firebase.firestore.Timestamp | null
): boolean {
    if (date === null) {
        return false;
    }

    const dateObj = date.toDate();
    dateObj.setHours(0, 0, 0, 0);

    const dateNow = new Date();
    dateNow.setHours(0, 0, 0, 0);

    return dateNow.getTime() <= dateObj.getTime() ? true : false;
}

/** dynamicallyGenerateLink
 *
 * Build out a widget based on whether student has programming
 *
 * @param {StudentDataInterface} student student instance
 * @returns {JSX.Element}
 */
export function dynamicallyGenerateLink(student: StudentDataInterface, callback: any): JSX.Element {
    if (student.factsTargeted && student.factsTargeted.length === 1) {
        return (
            <Link
                to={generateRouteBaseOnStrategy(
                    student.currentApproach,
                    student.currentTarget,
                    student.id
                )}
                key={student.id}
            >
                {student.name} ({student.currentGrade})
            </Link>
        );
    } else {
        return (
            <Link
                to={'#!'}
                key={student.id}
                onClick={callback}
            >
                {student.name} ({student.currentGrade})
            </Link>
        );
    }
}

export function warnNoProblemsAssigned() {
    alert("No math problems have been added to the targeted list yet.");
}

/** checkIfCompletedBenchmark
 *
 * Check to see if date within a days difference
 *
 * @param {StudentDataInterface} student student record
 * @param {string} benchmark benchmark
 * @returns {boolean}
 */
export function checkIfCompletedBenchmark(
    student: StudentDataInterface,
    benchmark: string
): boolean {
    if (student.completedBenchmark.length === 0) {
        return false;
    }

    const tag = `${benchmark} ${student.dueDate.toDate().toDateString()}`;

    if (student.completedBenchmark.includes(tag)) {
        return true;
    } else {
        return false;
    }
}


/** checkIfProgrammingCurrent
 *
 * Check to confirm if programming is up to date
 *
 * @param {firebase.firestore.Timestamp} date Check if programming is up to date
 * @returns {boolean}
 */
export function checkIfProgrammingCurrent(
    date: firebase.firestore.Timestamp | null
): boolean {
    if (date === null) {
        return false;
    }

    const dateObj = date.toDate();
    const dateNow = new Date();
    const difference = dateNow.getTime() - dateObj.getTime();
    const daysSince = Math.ceil(difference / (1000 * 3600 * 24));

    const areOnSameDay = date.toDate().toDateString() === dateNow.toDateString();

    //const areOnSameDay =
    //    dateObj.getFullYear() === dateNow.getFullYear() &&
    //    dateObj.getMonth() === dateNow.getMonth() &&
    //    dateObj.getDate() === dateNow.getDate();

    return areOnSameDay || daysSince < 1 ? false : true;
}

/** checkIfBenchmarksCompleted
 *
 * Check to see if benchmarks completed
 *
 * @param {StudentDataInterface} student student record
 * @returns {Bool}
 */
export function checkIfBenchmarksCompleted(student: StudentDataInterface): boolean {
    let confirmedCompleted = true;

    student.currentBenchmarking.forEach((bm) => {
        if (!confirmedCompleted) return;

        const tag = `${bm} ${student.dueDate.toDate().toDateString()}`;

        if (!student.completedBenchmark.includes(tag)) {
            confirmedCompleted = false;
        }
    });

    return confirmedCompleted;
}

/** generateWrapper
 *
 * Wrap info in a link, if benchmark is due
 *
 * @param {StudentDataInterface} student document info
 * @returns {Link}
 */
export function generateWrapperStudentList(student: StudentDataInterface): JSX.Element {
    const isBenchmarkingCurrent = checkIfProgrammingCurrent(student.dueDate);
    const isBenchmarkingCompleted = checkIfBenchmarksCompleted(student);

    if (isBenchmarkingCurrent) {
        return (
            <p>
                <span className="on-track"></span>
                {""}Next Benchmark(s): {student.dueDate.toDate().toDateString()}
            </p>
        );
    }

    if (isBenchmarkingCompleted) {
        return (
            <p>
                <span className="on-track"></span>
                {""}Current Benchmark(s) Completed
            </p>
        );
    }

    return (
        <Link to={`/probe/${student.id}`}>
            <span className="needs-review"></span>
            {""}Benchmarking Needed
        </Link>
    );
}

/** generatedStyledFeedback
 *
 * Wrap info in a link, if benchmark is due
 *
 * @param {boolean} isCompleted if probe completed
 * @returns {JSX.Element}
 */
export function generatedStyledFeedback(isCompleted: boolean): JSX.Element {
    return isCompleted ? (
        <span style={{ color: "green" }}> Completed</span>
    ) : (
        <span style={{ color: "red" }}> Incomplete</span>
    );
}

/** generateWrapper
 *
 * Wrap info in a link, if benchmark is due
 *
 * @param {StudentDataInterface} student document info
 * @param {string} benchmark benchmark string
 * @param {boolean} isCompleted boolean flag
 * @returns {Link}
 */
export function generateWrapperBenchmarkList(
    student: StudentDataInterface,
    benchmark: string,
    isCompleted: boolean
): JSX.Element {

    if (isCompleted) {
        return <p className="benchmark-list-card-title">{benchmark}</p>;
    } else {
        return (
            <Link to={`/benchmark/${student.id}/${benchmark}`} key={student.id}>
                {benchmark}
            </Link>
        );

    }
}
