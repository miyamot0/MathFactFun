/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import { Link } from "react-router-dom";

// styles
import "./styles/Information.css";

export default function Information(): JSX.Element {
  return (
    <>
      <h2 className="global-page-title">Information and Start-up Guide</h2>
      <div className="info-form-list">
        <div className="info-panel">
          <h2 className="global-page-title">Is this web-app evidence-based?</h2>
          <hr></hr>
          <p>
            This web-app, Math Fact Fun, is based on the Measures and
            Interventions for Numeracy Development (
            <a href="https://brianponcy.wixsite.com/mind">MIND</a>), an
            established resource for school-age children.{" "}
          </p>
          <p>
            The specific math problems, presentation procedures, curricular
            sequencing, and intervention strategies have been adapted from this
            resources into an electronic, web-based form.
          </p>
        </div>

        <div className="info-panel">
          <h2 className="global-page-title">Where do I begin?</h2>
          <hr></hr>
          <p>
            The web-app facilitates the tools and materials featured in the MIND
            and the MIND can be used strategically (e.g.,{" "}
            <a href="https://brianponcy.wixsite.com/mind/explicit-timing">
              Explicit Timing
            </a>{" "}
            exercises,{" "}
            <a href="https://brianponcy.wixsite.com/mind/cover-copy-compare">
              Cover-Copy-Compare
            </a>
            ) or as an element of Tier I programming to support screening and
            fluency development (i.e., supplement to universal instruction).
          </p>
          <p>
            Regardless of the specific goals, users would need to begin by first
            adding students to their dashboard (i.e., corresponding to their
            group, classroom).
          </p>
        </div>

        <div className="info-panel">
          <h2 className="global-page-title">How do I add a student?</h2>
          <hr></hr>
          <p>
            To add a new student, users should navigate to the{" "}
            <Link to={"/create"}>Create Student</Link> tab in the side bar. In
            this area, you should list the basic indicators for the student
            (e.g., initials, ID number, grade) as well as specify the types of
            math content you wish to focus on.
          </p>
          <p>
            Specifically, you will need to indicate (1) targets to be included
            in benchmarks (e.g., semesterly, monthly) and/or (2) a target for
            behavioral intervention.
          </p>
        </div>

        <div className="info-panel">
          <h2 className="global-page-title">Setting up Benchmarking</h2>
          <hr></hr>
          <p>
            To set up benchmarking for each student, you will need to supply a
            set of information. First, you will need to set a benchmark date
            that corresponds with when benchmarking is due next for that
            student. For example, a student beginning in the fall may have their
            Fall benchmark set for October 1.
          </p>
          <p>
            Second, you will need to identify which targets to include in the
            benchmark. For example, a 1st grade student may need to be screened
            for Addition and Subtraction problems but not for Multiplication or
            Division.
          </p>
          <p>
            Third, you will need to select a problem set (e.g., Set A, Set B,
            Set C). As a working default, Set A is likely sufficient to start
            but may need to be alternated in the subsequent benchmarks.
          </p>
        </div>

        <div className="info-panel">
          <h2 className="global-page-title">
            Completing Benchmarks (Tier I, Tier II)
          </h2>
          <hr></hr>
          <p>
            Once a student is added, and benchmarking targets and dates are
            entered, information related to benchmarking will be displayed on
            the <Link to={`/dashboard`}>Student Dashboard</Link>.
          </p>
          <p>
            If the probe is either not yet due or completed, there will not be
            an indicator that a probe is due. However, if a probe is warranted,
            then a link will be available for the student to complete each of
            the respective probes (e.g., Addition, Subtraction).
          </p>
        </div>

        <div className="info-panel">
          <h2 className="global-page-title">
            Selecting an Intervention (Tier II, Tier III)
          </h2>
          <hr></hr>
          <p>
            In some cases, you may wish to conduct benchmarking across multiple
            targets (e.g., Addition, Subtraction) but also include a more
            intense intervention on a specific target (e.g., Addition). In the{" "}
            <Link to={"/create"}>Create Student</Link> page, you should
            designate the target in the &apos;Target for Intervention&apos;
            widget and the intervention approach in the &apos;Intervention
            Approach&apos; widget.
          </p>
          <p>
            You may also adjust your rules for responding to student errors and
            strategies for motivating students (i.e., reinforcement strategies).
          </p>
        </div>

        <div className="info-panel">
          <h2 className="global-page-title">
            Intervention Option: Cover-Copy-Compare
          </h2>
          <hr></hr>
          <p>
            Cover-Copy-Compare (CCC) is a self-guided procedure by which
            students work to improve their accuracy and fluency. For CCC with
            basic math facts, this consists of a student visually inspecting a
            complete math problem (e.g., 2+6=8), covering the complete math
            problem, copying it from memory, and then comparing their answer to
            the original cue.
          </p>
          <p>
            A detailed description of CCC and its applications within the MIND
            are available at{" "}
            <a href="https://brianponcy.wixsite.com/mind/cover-copy-compare">
              here
            </a>
            .
          </p>
        </div>

        <div className="info-panel">
          <h2 className="global-page-title">
            Intervention Option: Explicit Timing
          </h2>
          <hr></hr>
          <p>
            Explicit Timing (ET) is another self-guided procedure by which
            students work to improve their fluency completing math problems. For
            ET with basic math facts, this consists of a student setting a goal
            to complete as many math problems as they can, correctly, within a
            set amount of time (e.g., 2 minutes).
          </p>
          <p>
            A detailed description of ET and its applications within the MIND
            are available{" "}
            <a href="https://brianponcy.wixsite.com/mind/explicit-timing">
              here
            </a>
            .
          </p>
        </div>

        <div className="info-panel">
          <h2 className="global-page-title">
            Selecting/Customizing Intervention Problems
          </h2>
          <hr></hr>
          <p>
            Apart from selecting an intervention type (e.g., CCC), it is also
            important to select math problems that are appropriate in terms of
            difficulty (e.g., not too easy, too hard) and not too numerous
            (e.g., 8 vs 50).
          </p>
          <p>
            Once a student is added to a group/classroom, and an intervention is
            selected, math problems can be added by selecting a student on the{" "}
            <Link to={`/dashboard`}>Dashboard</Link> and then press the button
            labeled &apos;Targeted Item Sets.&apos; If you do not see this
            button displayed under the Benchmarking and Intervention Settings
            heading, it is likely that you did not select an intervention for
            the student (see &apos;Selecting an Intervention&apos; heading
            above). Once you press the &apos;Targeted Item Sets&apos; button,
            you will be at a screen where you have items Available (i.e., in the
            bank), items Targeted (i.e., those being worked on), items Mastered
            (i.e., previously worked on), and items Skipped.
          </p>
          <p>
            It is important to be mindful about working from the same Tier I
            set, so if benchmarking uses Set A, it would be best to draw items
            from Set A1, A2, A3, etc. There is no pre-defined targeted Set Size
            and it is up to the educator/clinician to determine what fits best
            for each student.
          </p>
        </div>

        <div className="info-panel">
          <h2 className="global-page-title">
            Viewing Overall and Intervention-specific Progress
          </h2>
          <hr></hr>
          <p>
            Regular practice and visual inspection of progress is critical and
            the web-app supports the visual inspection of student performance at
            global (i.e., across multiple benchmarked targets) and at
            skill-specific levels. Regarding global performance (e.g., across
            Addition and Subtraction benchmarks), a students overall fluency
            across all targeted benchmarks can be viewed by selecting the
            student in the <Link to={`/dashboard`}>Dashboard</Link> and clicking
            on the &apos;Overall Math&apos; button under the heading &apos;View
            Student Performance.&apos;
          </p>
          <p>
            In this page, a student&apos;s fluency across all targeted skills
            will be displayed as a function of time (i.e., all skills across
            time). However, there is another option to view more detailed,
            item-level information resulting from progress-monitoring and
            intervention.
          </p>
          <p>
            {" "}
            To view more in-depth information regarding the intervention target
            (e.g., Addition), you can select the &apos;Intervention-specific
            Targets&apos; button. This functionality provides overall accuracy
            and fluency information, as well as the item-level performances that
            exist across various sets.
          </p>
        </div>

        <div className="info-panel">
          <h2 className="global-page-title">
            Delivering Intervention Sessions
          </h2>
          <hr></hr>
          <p>
            For students receiving benchmarking and intervention, each activity
            (i.e., benchmarking, intervention) begins in a different dashboard.
            Specifically, benchmarking is available through a link on the{" "}
            <Link to={`/dashboard`}>Student Dashboard</Link> and intervention
            through a link on the{" "}
            <Link to={`/practice`}>Practice Dashboard</Link>. To assist teachers
            and interventionists in tracking practice sessions, the{" "}
            <Link to={`/practice`}>Practice Dashboard</Link> lists the most
            recently record practice session. A green indicator means that a
            practice session was run today whereas a red indicator means no new
            data has been recorded for the day.
          </p>
        </div>

        <div className="info-panel">
          <h2 className="global-page-title">
            Maneuvering the Intervention Interface
          </h2>
          <hr></hr>
          <p>
            Although students are surely most familiar with pencil-and-paper
            math applications, this modality has some limitations (e.g., cost,
            lack of automatation, fine motor dexterity limits). The interface
            provided through Math Fact Fun provides a combination of
            point-and-click/touch and keyboard input options. For example,
            learners working through a tablet are likely able to work most
            quickly by using the On-Screen Keyboard provided in the interface.
            However, learners working at a desktop/laptop may fine the physical
            keyboard to be quicker and easier.
          </p>
        </div>

        <div className="info-panel">
          <h2 className="global-page-title">Keyboard Hotkeys</h2>
          <hr></hr>
          <p>
            In addition to number keys, the numpad available on keyboards has
            been repurposed to minimize the need for the use of a mouse during
            practice sessions (i.e., improves fluency, simplifies responding). A
            number of Hotkeys and their functions are listed below:
          </p>
          <ul className="information-element">
            <li>
              Space = Check/advance to the next problem (CCC/ET/Benchmark)
            </li>
            <li>
              Enter = Functions as the &apos;=&apos; operator, so that work can
              remain on the numpad exclusively
            </li>
            <li>
              Delete/Backspace = Removes the trailing character in the inputted
              answer (ET/Benchmark)/math problem (CCC)
            </li>
          </ul>
        </div>
      </div>{" "}
    </>
  );
}
