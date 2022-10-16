/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import Particles from 'react-tsparticles'
import { useCallback } from 'react'
import { loadFull } from 'tsparticles'
import { Engine } from 'tsparticles-engine'
import { tsParticles } from 'tsparticles-engine'
import { loadTextShape } from 'tsparticles-shape-text'

loadTextShape(tsParticles)

export default function LoginAnimatedBackground() {
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadFull(engine)
    }, [])

    const particlesLoaded = useCallback(async (container: any) => {
        await console.log(container)
    }, [])

    return (
        <div className="landing-hero">
            <Particles
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                options={{
                    fullScreen: {
                        enable: true,
                        zIndex: -1,
                    },
                    particles: {
                        number: {
                            value: 120,
                            density: {
                                enable: true,
                                value_area: 800,
                            },
                        },
                        color: {
                            value: '#000000',
                        },
                        shape: {
                            type: 'char',
                            character: {
                                value: [
                                    '2+3=5',
                                    '6+2=8',
                                    '7-2=5',
                                    '12-8=4',
                                    '6x4=24',
                                    '5x3=15',
                                    '30/6=5',
                                    '24/8=3',
                                ],
                                font: 'Verdana',
                                style: '',
                                weight: '400',
                                fill: true,
                            },
                        },
                        stroke: {
                            width: 1,
                            color: '#ffffff',
                        },
                        opacity: {
                            value: 0.5,
                            random: false,
                            anim: {
                                enable: true,
                                speed: 1,
                                opacity_min: 0.1,
                                sync: false,
                            },
                        },
                        size: {
                            value: 16,
                            random: false,
                            anim: {
                                enable: false,
                                speed: 10,
                                size_min: 10,
                                sync: false,
                            },
                        },
                        line_linked: {
                            enable: false,
                            distance: 150,
                            color: '#ffffff',
                            opacity: 0.4,
                            width: 1,
                        },
                        move: {
                            enable: true,
                            speed: 2,
                            direction: 'none',
                            random: false,
                            straight: false,
                            out_mode: 'out',
                            attract: {
                                enable: false,
                                rotateX: 600,
                                rotateY: 1200,
                            },
                        },
                    },
                    interactivity: {
                        events: {
                            onhover: {
                                enable: true,
                                mode: 'repulse',
                                parallax: {
                                    enable: false,
                                    force: 60,
                                    smooth: 10,
                                },
                            },
                            onclick: {
                                enable: true,
                                mode: 'push',
                            },
                            resize: true,
                        },
                        modes: {
                            grab: {
                                distance: 400,
                                line_linked: {
                                    opacity: 1,
                                },
                            },
                            bubble: {
                                distance: 400,
                                size: 40,
                                duration: 2,
                                opacity: 0.8,
                                speed: 3,
                            },
                            repulse: {
                                distance: 200,
                            },
                            push: {
                                particles_nb: 4,
                            },
                            remove: {
                                particles_nb: 2,
                            },
                        },
                    },
                    retina_detect: true,
                    background: {
                        color: 'transparent',
                        image: '',
                        position: '50% 50%',
                        repeat: 'no-repeat',
                        size: 'cover',
                    },
                }}
            />
        </div>
    )
}
