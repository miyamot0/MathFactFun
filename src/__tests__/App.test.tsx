/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from '../App';
import { AuthorizationContext } from '../context/AuthorizationContext';
import ReactModal from 'react-modal';

describe('Check Auth Context Routes', () => {
    ReactModal.setAppElement = () => null;
    const dispatch = jest.fn();

    test('Not ready: should render nothing', () => {
        render(
            <AuthorizationContext.Provider value={{
                user: null,
                authIsReady: false,
                adminFlag: false,
                dispatch
            }}>
                <App />
            </AuthorizationContext.Provider>
        )

        const appElement = screen.getByTestId('App-id');

        expect(appElement.childNodes.length).toBe(0)
    });

    test('Ready: should render something', () => {
        render(
            <AuthorizationContext.Provider value={{
                user: null,
                authIsReady: true,
                adminFlag: false,
                dispatch
            }}>
                <App />
            </AuthorizationContext.Provider>
        )

        const appElement = screen.getByTestId('App-id');

        // Has browser router
        expect(appElement.childNodes.length).toBe(1)
    });

    test('Ready: Navigate to login', () => {
        render(
            <AuthorizationContext.Provider value={{
                user: null,
                authIsReady: true,
                adminFlag: false,
                dispatch
            }}>
                <App />
            </AuthorizationContext.Provider>
        )

        const appElement = screen.getByTestId('App-id');

        // Has browser router
        expect(appElement.childNodes.length).toBe(1)
    });
})
