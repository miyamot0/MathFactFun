/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'

import { Link } from 'react-router-dom'
import AnimatedHero from './views/AnimatedHero'

// styles
import './styles/Landing.css'

export default function Landing() {
    return (
        <div className="landing-width-wrapper">
            <AnimatedHero />

            <div className="landing-form-list">
                <div className="landing-panel">
                    <h2 className="global-page-title">Welcome</h2>
                    <hr></hr>
                    <p>
                        Welcome to the Math Facts Fun web-app. This resource was
                        designed to supplement existing educational practices
                        related to early math acquisition and fluency. The app
                        is designed to be accessible to teachers,
                        administrators, building-level intervention teams, and
                        primary-school students.
                    </p>
                </div>

                <div className="landing-panel">
                    <h2 className="global-page-title">
                        What can this web-app do?
                    </h2>
                    <hr></hr>
                    <p>
                        The web-app can be used for (1) benchmarking math facts
                        for K-6 learners, (2) progress-monitoring for students
                        receiving Tier II and Tier III supports, or (3) as an
                        avenue for supplemental math fact practice. At present,
                        the app currently supports the use of Explicit Timing
                        and Cover-Copy-Compare for basic math facts.
                    </p>
                </div>

                <div className="landing-panel">
                    <h2 className="global-page-title">Where do I start?</h2>
                    <hr></hr>
                    <p>
                        For teachers and administrators, you must begin by first
                        adding students to your small-groups or classrooms by
                        using the navigation bar on the side of the screen to
                        access the{' '}
                        <Link to={'/create'}>Create Student Page</Link>.
                        Additional information regarding setup, individual
                        student settings, and information on the{' '}
                        <Link to={'/information'}>Information Page</Link>{' '}
                        available on the navigation bar. Current students can be
                        viewed and their settings modified from the{' '}
                        <Link to={`/dashboard`}>Student Dashboard</Link>, and
                        lastly, students with programmed intervention can access
                        their programming from the{' '}
                        <Link to={`/practice`}>Practice Dashboard</Link>.
                    </p>
                </div>
            </div>
        </div>
    )
}
