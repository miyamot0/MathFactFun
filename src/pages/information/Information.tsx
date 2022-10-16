/* eslint-disable react/jsx-key */
/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import Fade from 'react-reveal'
import AnimatedHero from '../landing/views/AnimatedHero'
import InformationPanels from './views/InformationPanels'
import StudentSummaryCurrentBenchmarking from '../student/subcomponents/views/StudentSummaryCurrentBenchmarking'
import StudentSummaryCurrentIntervention from '../student/subcomponents/views/StudentSummaryCurrentIntervention'

import NavigationButton from '../../components/NavigationButton'
import SettingsButton from '../../components/SettingsButton'

import AddIcon from '../../assets/plus-square.svg'
import PlayIcon from '../../assets/play.svg'
import DashboardIcon from '../../assets/window-sidebar.svg'
import SettingsIcon from '../../assets/gear.svg'
import ItemSetsIcon from '../../assets/plus-slash-minus.svg'
import ProgressIcon from '../../assets/graph-up.svg'

import { StudentDataInterface } from '../student/interfaces/StudentInterfaces'

// styles
import './styles/Information.css'

export default function Information(): JSX.Element {
    return (
        <>
            <AnimatedHero />
            <div className="information-page-width-wrapper">
                <h2 className="global-page-title">
                    Information and Start-up Guide
                </h2>

                <div className="info-form-list">
                    <Fade>
                        <InformationPanels
                            Title={'Is the MFF app evidence-based?'}
                            Content={[
                                <p>
                                    This web-app is based on the Measures and
                                    Interventions for Numeracy Development (
                                    <a href="https://brianponcy.wixsite.com/mind">
                                        MIND
                                    </a>
                                    ). The MIND is an established resource for
                                    students learning K-8 math.
                                </p>,
                                <p>
                                    The specific math problems, teaching
                                    procedures, curricular sequencing, and
                                    intervention strategies from the MIND have
                                    been adapted into an electronic, web-based
                                    form.
                                </p>,
                            ]}
                        />
                        <InformationPanels
                            Title={'Where do I begin?'}
                            Content={[
                                <p>
                                    MFF is an designed to help teachers (1){' '}
                                    <b>
                                        monitor student performance related to
                                        math facts
                                    </b>{' '}
                                    and (2){' '}
                                    <b>
                                        provide supplemental math fact practice
                                    </b>
                                    . You may wish to begin with monitoring
                                    performance first and then consider
                                    intervention after data is collected.
                                </p>,
                                <p>
                                    To get started, you need to start adding
                                    students to your dashboard by selecting the{' '}
                                    <NavigationButton
                                        Icon={AddIcon}
                                        Text={'Add Student'}
                                        BackgroundColor={'#33a7e4'}
                                        AltText={'Add a new student'}
                                    />{' '}
                                    link on the sidebar.
                                </p>,
                            ]}
                        />
                        <InformationPanels
                            Title={'Adding my first student (Screeners)'}
                            Content={[
                                <p>
                                    You can easily a a student by visiting the{' '}
                                    <NavigationButton
                                        Icon={AddIcon}
                                        Text={'Add Student'}
                                        BackgroundColor={'#33a7e4'}
                                        AltText={'Add a new student'}
                                    />{' '}
                                    page, which is displayed in the side bar. On
                                    the <br />
                                    <NavigationButton
                                        Icon={AddIcon}
                                        Text={'Add Student'}
                                        BackgroundColor={'#33a7e4'}
                                        AltText={'Add a new student'}
                                    />{' '}
                                    page, you will need to provide some basic
                                    details for the student (e.g., ID number,
                                    grade) and highlight the types of math you
                                    need to benchmark for the semester.
                                </p>,
                                <p>
                                    By default, benchmarking covers{' '}
                                    <StudentSummaryCurrentBenchmarking
                                        ButtonOnly
                                        student={
                                            {
                                                currentBenchmarking: [
                                                    'Addition-Sums to 18',
                                                ],
                                            } as unknown as StudentDataInterface
                                        }
                                    />
                                    ,{' '}
                                    <StudentSummaryCurrentBenchmarking
                                        ButtonOnly
                                        student={
                                            {
                                                currentBenchmarking: [
                                                    'Subtraction-Lessing to 18',
                                                ],
                                            } as unknown as StudentDataInterface
                                        }
                                    />
                                    ,{' '}
                                    <StudentSummaryCurrentBenchmarking
                                        ButtonOnly
                                        student={
                                            {
                                                currentBenchmarking: [
                                                    'Multiplication-Single Digit',
                                                ],
                                            } as unknown as StudentDataInterface
                                        }
                                    />
                                    , and{' '}
                                    <StudentSummaryCurrentBenchmarking
                                        ButtonOnly
                                        student={
                                            {
                                                currentBenchmarking: [
                                                    'Division-Single Digit',
                                                ],
                                            } as unknown as StudentDataInterface
                                        }
                                    />
                                </p>,
                            ]}
                        />
                        <InformationPanels
                            Title={'Setting up Student Benchmarking'}
                            Content={[
                                <p>
                                    MFF assist teachers by streamlining how
                                    benchmarking is scheduled and implemented.
                                    Once you select the skills to benchmark
                                    (e.g.,{' '}
                                    <StudentSummaryCurrentBenchmarking
                                        ButtonOnly
                                        student={
                                            {
                                                currentBenchmarking: [
                                                    'Addition-Sums to 18',
                                                ],
                                            } as unknown as StudentDataInterface
                                        }
                                    />
                                    ), the app will ask when the benchmarking
                                    should begin (e.g., October 1st).
                                </p>,
                                <p>
                                    The app will provide cues regarding when
                                    benchmarking for individual students is{' '}
                                    <br />{' '}
                                    <span className="benchmark-completed" />{' '}
                                    <span
                                        style={{
                                            color: '#0ebb50',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        Completed
                                    </span>{' '}
                                    or <span className="needs-benchmark" />{' '}
                                    <span
                                        style={{
                                            color: '#ff5733',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        Due
                                    </span>{' '}
                                    .
                                </p>,
                            ]}
                        />
                        <InformationPanels
                            Title={'Programming Interventions'}
                            Content={[
                                <p>
                                    After reviewing student progress, you may
                                    wish to have the student complete
                                    benchmarking as well as gain extra practice
                                    with math facts. You can edit student
                                    programming by visiting the dashboard (i.e.,{' '}
                                    <NavigationButton
                                        Icon={DashboardIcon}
                                        Text={'Dashboard'}
                                        BackgroundColor={'#33a7e4'}
                                        AltText={'Visit dashboard'}
                                    />
                                    ) and pressing the{' '}
                                    <SettingsButton
                                        Icon={SettingsIcon}
                                        BackgroundColor={'rgb(51, 146, 235)'}
                                        AltText={'Edit settings'}
                                    />{' '}
                                    to navigate to that individual
                                    student&apos;s settings.
                                </p>,
                                <p>
                                    Changes made in the{' '}
                                    <SettingsButton
                                        Icon={SettingsIcon}
                                        BackgroundColor={'rgb(51, 146, 235)'}
                                        AltText={'Edit settings'}
                                    />{' '}
                                    page occur in real-time.
                                </p>,
                            ]}
                        />
                        <InformationPanels
                            Title={'Intervention: Cover-Copy-Compare'}
                            Content={[
                                <p>
                                    The{' '}
                                    <StudentSummaryCurrentIntervention
                                        ButtonOnly
                                        student={
                                            {
                                                currentApproach:
                                                    'CoverCopyCompare',
                                            } as StudentDataInterface
                                        }
                                    />{' '}
                                    intervention (CCC) is a self-guided math
                                    practice procedure where students work to
                                    improve their math fact accuracy and
                                    fluency. It has been used extensively in the
                                    area of basic numeracy.
                                </p>,
                                <p>
                                    A detailed description of <br />
                                    <StudentSummaryCurrentIntervention
                                        ButtonOnly
                                        student={
                                            {
                                                currentApproach:
                                                    'CoverCopyCompare',
                                            } as StudentDataInterface
                                        }
                                    />{' '}
                                    and its applications within the MIND are
                                    available at{' '}
                                    <a href="https://brianponcy.wixsite.com/mind/cover-copy-compare">
                                        here
                                    </a>
                                    .
                                </p>,
                            ]}
                        />
                        <InformationPanels
                            Title={'Intervention: Explicit Timing'}
                            Content={[
                                <p>
                                    The{' '}
                                    <StudentSummaryCurrentIntervention
                                        ButtonOnly
                                        student={
                                            {
                                                currentApproach:
                                                    'ExplicitTiming',
                                            } as StudentDataInterface
                                        }
                                    />{' '}
                                    intervention (ET) is another self-guided
                                    procedure by which students work to improve
                                    their <b>fluency</b> completing math
                                    problems. For <br />
                                    <StudentSummaryCurrentIntervention
                                        ButtonOnly
                                        student={
                                            {
                                                currentApproach:
                                                    'ExplicitTiming',
                                            } as StudentDataInterface
                                        }
                                    />{' '}
                                    with basic math facts, this consists of a
                                    student setting a goal to complete as many
                                    math problems as they can, correctly, within
                                    a set amount of time (e.g., 2 minutes).
                                </p>,
                                <p>
                                    A detailed description of <br />
                                    <StudentSummaryCurrentIntervention
                                        ButtonOnly
                                        student={
                                            {
                                                currentApproach:
                                                    'ExplicitTiming',
                                            } as StudentDataInterface
                                        }
                                    />{' '}
                                    and its applications within the MIND are
                                    available at{' '}
                                    <a href="https://brianponcy.wixsite.com/mind/explicit-timing">
                                        here
                                    </a>
                                    .
                                </p>,
                            ]}
                        />

                        <InformationPanels
                            Title={'Targeting Specific Math Facts'}
                            Content={[
                                <p>
                                    When using either and intervention like{' '}
                                    <br />
                                    <StudentSummaryCurrentIntervention
                                        ButtonOnly
                                        student={
                                            {
                                                currentApproach:
                                                    'CoverCopyCompare',
                                            } as StudentDataInterface
                                        }
                                    />{' '}
                                    or <br />
                                    <StudentSummaryCurrentIntervention
                                        ButtonOnly
                                        student={
                                            {
                                                currentApproach:
                                                    'ExplicitTiming',
                                            } as StudentDataInterface
                                        }
                                    />{' '}
                                    , you can use either pre-made item sets or
                                    choose to customize your own.
                                </p>,
                                <p>
                                    You can modify item sets by navigating to
                                    the{' '}
                                    <NavigationButton
                                        Icon={DashboardIcon}
                                        Text={'Dashboard'}
                                        BackgroundColor={'#33a7e4'}
                                        AltText={'Visit dashboard'}
                                    />
                                    ), enter the settings menu for the
                                    respective student (i.e.,{' '}
                                    <SettingsButton
                                        Icon={SettingsIcon}
                                        BackgroundColor={'rgb(51, 146, 235)'}
                                        AltText={'Edit settings'}
                                    />
                                    ) and then pressing the{' '}
                                    <SettingsButton
                                        Icon={ItemSetsIcon}
                                        BackgroundColor={'rgb(51, 146, 235)'}
                                        AltText={'Edit item set'}
                                    />{' '}
                                    to enter the Set Creator page.
                                </p>,
                            ]}
                        />

                        <InformationPanels
                            Title={'Using the Set Creator'}
                            Content={[
                                <p>
                                    The Set Creator page (i.e.,{' '}
                                    <SettingsButton
                                        Icon={ItemSetsIcon}
                                        BackgroundColor={'rgb(51, 146, 235)'}
                                        AltText={'Edit item set'}
                                    />
                                    ) allows teachers and consultants to edit
                                    programming, in real-time, with a
                                    drag-and-drop interface. Information on
                                    specific math problems (e.g., latency,
                                    accuracy) is available to determine which
                                    items are considered <b>Mastered</b>, which
                                    should be <b>Targeted</b>, and which may
                                    need to be <b>Skipped</b>.
                                </p>,
                                <p>
                                    Items targeted in the{' '}
                                    <SettingsButton
                                        Icon={ItemSetsIcon}
                                        BackgroundColor={'rgb(51, 146, 235)'}
                                        AltText={'Edit item set'}
                                    />{' '}
                                    page are only relevant to the{' '}
                                    <StudentSummaryCurrentIntervention
                                        ButtonOnly
                                        student={
                                            {
                                                currentApproach:
                                                    'CoverCopyCompare',
                                            } as StudentDataInterface
                                        }
                                    />{' '}
                                    and{' '}
                                    <StudentSummaryCurrentIntervention
                                        ButtonOnly
                                        student={
                                            {
                                                currentApproach:
                                                    'ExplicitTiming',
                                            } as StudentDataInterface
                                        }
                                    />{' '}
                                    interventions.
                                </p>,
                            ]}
                        />

                        <InformationPanels
                            Title={'Viewing Progress (Screening)'}
                            Content={[
                                <p>
                                    The MFF app makes it easy to view student
                                    performance over time. You can view the
                                    results of on-going benchmarking and
                                    intervention for individual students by
                                    navigating to the{' '}
                                    <NavigationButton
                                        Icon={DashboardIcon}
                                        Text={'Dashboard'}
                                        BackgroundColor={'#33a7e4'}
                                        AltText={'Visit dashboard'}
                                    />{' '}
                                    and entering the{' '}
                                    <SettingsButton
                                        Icon={SettingsIcon}
                                        BackgroundColor={'rgb(51, 146, 235)'}
                                        AltText={'Edit settings'}
                                    />{' '}
                                    page for the respective student.
                                </p>,
                                <p>
                                    The{' '}
                                    <SettingsButton
                                        Icon={SettingsIcon}
                                        BackgroundColor={'rgb(51, 146, 235)'}
                                        AltText={'Edit settings'}
                                    />{' '}
                                    page will provide a high-level overview of
                                    current settings and overall performance
                                    over time.
                                </p>,
                            ]}
                        />

                        <InformationPanels
                            Title={'Viewing Progress (Intervention)'}
                            Content={[
                                <p>
                                    The MFF app provides a more intense, more
                                    detailed visualization of student
                                    performance when an intervention is
                                    programmed. To view intervention progress,
                                    navigate to the{' '}
                                    <NavigationButton
                                        Icon={DashboardIcon}
                                        Text={'Dashboard'}
                                        BackgroundColor={'#33a7e4'}
                                        AltText={'Visit dashboard'}
                                    />{' '}
                                    and enter the{' '}
                                    <SettingsButton
                                        Icon={ProgressIcon}
                                        BackgroundColor={'rgb(15, 175, 79)'}
                                        AltText={'View intervention progress'}
                                    />{' '}
                                    page for the respective student.
                                </p>,
                                <p>
                                    The{' '}
                                    <SettingsButton
                                        Icon={ProgressIcon}
                                        BackgroundColor={'rgb(15, 175, 79)'}
                                        AltText={'View intervention progress'}
                                    />{' '}
                                    page provides both overall and item-level
                                    information regarding student performance.
                                    Item-level performance is helpful for
                                    updating the Item Sets, as necessary.
                                </p>,
                            ]}
                        />

                        <InformationPanels
                            Title={'Running Interventions'}
                            Content={[
                                <p>
                                    To facilitate easy navigation for students,
                                    a separate dashboard is dedicated to
                                    intervention practice. The dashboard
                                    specific to intervention is available at{' '}
                                    <NavigationButton
                                        Icon={PlayIcon}
                                        Text={'Practice'}
                                        BackgroundColor={'#33a7e4'}
                                        AltText={'Visit practice dashboard'}
                                    />
                                    .
                                </p>,
                                <p>
                                    Like the other dashboard, students
                                    programmed to received intervention on the{' '}
                                    <NavigationButton
                                        Icon={PlayIcon}
                                        Text={'Practice'}
                                        BackgroundColor={'#33a7e4'}
                                        AltText={'Visit practice dashboard'}
                                    />{' '}
                                    will be displayed along with their current
                                    status. The app will provide cues regarding
                                    whether the student has completed their
                                    daily practice (i.e.,{' '}
                                    <span className="benchmark-completed" />{' '}
                                    <span
                                        style={{
                                            color: '#0ebb50',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        Completed
                                    </span>
                                    ) or have yet to complete their daily
                                    practice (i.e.,{' '}
                                    <span className="needs-benchmark" />{' '}
                                    <span
                                        style={{
                                            color: '#ff5733',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        Due
                                    </span>
                                    ) .
                                </p>,
                            ]}
                        />

                        <InformationPanels
                            Title={'Accessibility Options'}
                            Content={[
                                <p>
                                    By default, students have the opportunity to
                                    practice their math skills using a mouse, a
                                    touchscreen, or a keyboard. At present,
                                    there are no restrictions on these options
                                    and teachers are encouraged to assist
                                    students in determining which approach works
                                    best for them and their physical abilities.
                                </p>,
                                <p>
                                    Generally speaking, most young learners have
                                    greater exposure to touchscreen interfaces
                                    than they do with mice and keyboards. As a
                                    starting point, that may be the easiest
                                    place to begin (technology permitting, of
                                    course). Transition to the keyboard may most
                                    the most sense when mouse movement and
                                    touchscreen gestures begin to negative
                                    impact overall fluency.
                                </p>,
                            ]}
                        />

                        <InformationPanels
                            Title={'Keyboard Hotkeys'}
                            Content={[
                                <p>
                                    For students using the keyboard, both the
                                    number keys and various other keys are
                                    recognized as valid input. The numberpad
                                    available on on most keyboards has been
                                    repurposed to minimize the need for both a
                                    mouse AND keyboard during practice (i.e.,
                                    simplifies responding, requires less
                                    coordination).
                                </p>,
                                <p>
                                    A number of Hotkeys and their functions are
                                    listed below:
                                </p>,
                                <ul className="information-element">
                                    <li>
                                        Space = Check/advance to the next
                                        problem (CCC/ET/Benchmark)
                                    </li>
                                    <li>
                                        Enter = Functions as the &apos;=&apos;
                                        operator, so that work can remain on the
                                        numpad exclusively
                                    </li>
                                    <li>
                                        Delete/Backspace = Removes the trailing
                                        character in the inputted answer
                                        (ET/Benchmark)/math problem (CCC)
                                    </li>
                                </ul>,
                            ]}
                        />
                    </Fade>
                </div>
            </div>
        </>
    )
}
