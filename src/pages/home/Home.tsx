/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'

import { Link } from 'react-router-dom'
import StickerTitle from '../../components/StickerTitle'
import AnimatedBackground from '../login/views/LoginAnimatedBackground'

// styles
import './styles/Home.css'

export default function Landing() {
    return (
        <div className="home-width-wrapper">
            <StickerTitle />
            <div className="home-form-list">
                <div className="home-panel">
                    <h2 className="global-page-title">
                        {`Math Fact Fun (Beta: v${process.env.REACT_APP_VERSION})`}
                    </h2>
                    <hr></hr>
                    <p>
                        Welcome to the beta version of the Math Facts Fun
                        web-app. This is a on-going project being developed and
                        evaluated to support the acquisition and fluency of
                        basic math facts. At present, this project is
                        invite-only to select teachers and researchers working
                        in the area of early numeracy.
                    </p>
                </div>

                <div className="home-panel">
                    <h2 className="global-page-title">
                        I&apos;m a researcher and collaborator, what do I do?
                    </h2>
                    <hr></hr>
                    <p>
                        You should have been assigned a login from the project
                        administrator. You will need to log into the site (see
                        the link in the navigation bar) to access the the
                        academic functionality.
                    </p>
                </div>

                <div className="home-panel">
                    <h2 className="global-page-title">
                        I&apos;m a teacher that is part of the project, what do
                        I do?
                    </h2>
                    <hr></hr>
                    <p>
                        You should have received a login from a research
                        collaborator, school consultant, and/or the site
                        administrator. You will need to log into the site before
                        you can begin administering math content/probes.
                    </p>
                </div>

                <div className="home-panel">
                    <h2 className="global-page-title">
                        I&apos;m interested in the project, where can I learn
                        more?
                    </h2>
                    <hr></hr>
                    <p>
                        This project and research is part of two Free/Open
                        Source projects. First, the math content included here
                        is part of the Measures and Interventions for Numeracy
                        Development (MIND) developed by Dr. Brian Poncy. Second,
                        the technical translation of those methods and materials
                        is supported by Dr. Shawn Gilroy. These methods and
                        interfaces are developed open on Dr. Gilroy&apos;s
                        GitHub account (
                        <Link to={'https://github.com/miyamot0'}>
                            https://github.com/miyamot0
                        </Link>
                        ).
                    </p>
                </div>
            </div>
            <AnimatedBackground />
        </div>
    )
}
