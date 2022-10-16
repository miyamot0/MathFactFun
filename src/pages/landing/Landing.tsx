/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import AnimatedHero from './views/AnimatedHero'
import { Link } from 'react-router-dom'

// styles
import './styles/Landing.css'
import LandingPanel from './views/LandingPanel'

export default function Landing() {
    return (
        <>
            <AnimatedHero />
            <div className="landing-width-wrapper">
                <div className="landing-form-list">
                    <LandingPanel
                        Title={`Math Facts Fun (MFF; beta: v${process.env.REACT_APP_VERSION})`}
                        Content={[
                            `Welcome to the beta testing version of the MFF web-app. This is an active project being designed and evaluated to help support teachers improve early math acquisition and fluency specific to basic math facts.`,
                            `Aspects of the site are subject to change at any time, though your consultants will inform you of any major upcoming changes.`,
                        ]}
                    />

                    <LandingPanel
                        Title={'What is this for?'}
                        Content={[
                            'The MFF web-app is being evaluted to (1) streamline the benchmarking of math facts for K-6 learners, (2) facilitate progress-monitoring for students receiving Tier II and Tier III supports, and (3) as means of providing supplemental math fact practice.',
                            'At present, the app currently supports the use of Explicit Timing and Cover-Copy-Compare for basic math facts.',
                        ]}
                    />

                    <LandingPanel
                        Title={'Where do I begin?'}
                        Content={[
                            'For educators, you must start by adding students to your roster. You may do with with individual students, or alternatively, your consultant can assist you in mass-importing students (quicker if adding whole a classroom).',
                            'You can add individual students by navigating to the "Add Student" page available on the side bar',
                            'More detailed information is available on the "Getting Started" page.',
                        ]}
                    />
                </div>
            </div>
        </>
    )
}
