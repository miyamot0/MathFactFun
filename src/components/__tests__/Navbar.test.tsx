/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { shallow, mount } from 'enzyme';
import React from 'react';
import ReactModal from 'react-modal';
import Navbar from '../Navbar';

import { render, screen } from '@testing-library/react';
import { AuthorizationContext } from '../../context/AuthorizationContext';
import { BrowserRouter, MemoryRouter, Redirect, Route, Switch, useLocation } from 'react-router-dom';

import firebase from 'firebase';
import App from '../../App';
import Login from '../../pages/login/Login';
import Admin from '../../pages/admin/Admin';
import DashboardBenchmark from '../../pages/dashboard/DashboardBenchmark';
import DashboardDisplay from '../../pages/dashboard/DashboardDisplay';
import DashboardPractice from '../../pages/dashboard/DashboardPractice';
import Information from '../../pages/information/Information';
import Benchmark from '../../pages/intervention/Benchmark';
import CoverCopyCompare from '../../pages/intervention/CoverCopyCompare';
import ExplicitTiming from '../../pages/intervention/ExplicitTiming';
import TapedProblems from '../../pages/intervention/TapedProblems';
import Landing from '../../pages/landing/Landing';
import ProgressMonitor from '../../pages/progress/ProgressMonitor';
import Screening from '../../pages/screening/Screening';
import SetCreator from '../../pages/setcreator/SetCreator';
import CreateBulkStudents from '../../pages/student/CreateBulkStudents';
import CreateStudent from '../../pages/student/CreateStudent';
import DisplayStudent from '../../pages/student/DisplayStudent';
import EditStudent from '../../pages/student/EditStudent';
import CreateUser from '../../pages/user/CreateUser';
import EditUser from '../../pages/user/EditUser';

Enzyme.configure({ adapter: new Adapter() });

function outputRelevantDirectory(authObject: any) {
    return <MemoryRouter initialEntries={['/']}>
        <Navbar />
        <Switch>
            <Route exact path="/">
                {!authObject.user && <Redirect to="/login" />}
                {authObject.user && <Landing />}
            </Route>
            <Route path="/dashboard">
                {!authObject.user && <Redirect to="/login" />}
                {authObject.user && <DashboardDisplay />}
            </Route>
            <Route path="/practice">
                {!authObject.user && <Redirect to="/login" />}
                {authObject.user && <DashboardPractice />}
            </Route>
            <Route path="/information">
                {!authObject.user && <Redirect to="/login" />}
                {authObject.user && <Information />}
            </Route>
            <Route path="/create">
                {!authObject.user && <Redirect to="/login" />}
                {authObject.user && <CreateStudent />}
            </Route>
            <Route path="/student/:id">
                {!authObject.user && <Redirect to="/login" />}
                {authObject.user && <DisplayStudent />}
            </Route>
            <Route path="/edit/:id">
                {!authObject.user && <Redirect to="/login" />}
                {authObject.user && <EditStudent />}
            </Route>
            <Route path="/set/:target/:id">
                {!authObject.user && <Redirect to="/login" />}
                {authObject.user && <SetCreator />}
            </Route>
            <Route path="/probe/:id">
                {!authObject.user && <Redirect to="/login" />}
                {authObject.user && <DashboardBenchmark />}
            </Route>
            <Route path="/benchmark/:id/:target">
                {!authObject.user && <Redirect to="/login" />}
                {authObject.user && <Benchmark />}
            </Route>
            <Route path="/CoverCopyCompare/:target/:id">
                {!authObject.user && <Redirect to="/login" />}
                {authObject.user && <CoverCopyCompare />}
            </Route>
            <Route path="/ExplicitTiming/:target/:id">
                {!authObject.user && <Redirect to="/login" />}
                {authObject.user && <ExplicitTiming />}
            </Route>
            <Route path="/TapedProblems/:target/:id">
                {!authObject.user && <Redirect to="/login" />}
                {authObject.user && <TapedProblems />}
            </Route>
            <Route path="/ProgressMonitor/:target/:id/:method/:aim">
                {!authObject.user && <Redirect to="/login" />}
                {authObject.user && <ProgressMonitor />}
            </Route>
            <Route path="/Screening/:id">
                {!authObject.user && <Redirect to="/login" />}
                {authObject.user && <Screening />}
            </Route>
            <Route path="/admin">
                {authObject.user && !authObject.adminFlag && <Redirect to="/dashboard" />}
                {authObject.user && authObject.adminFlag && <Admin />}
            </Route>
            <Route path="/createUser">
                {authObject.user && !authObject.adminFlag && <Redirect to="/dashboard" />}
                {authObject.user && authObject.adminFlag && <CreateUser />}
            </Route>
            <Route path="/editUser/:id">
                {authObject.user && !authObject.adminFlag && <Redirect to="/dashboard" />}
                {authObject.user && authObject.adminFlag && <EditUser />}
            </Route>
            <Route path="/createStudents/:id">
                {authObject.user && !authObject.adminFlag && <Redirect to="/dashboard" />}
                {authObject.user && authObject.adminFlag && <CreateBulkStudents />}
            </Route>
            <Route path="/login">
                {authObject.user && <Redirect to="/" />}
                {!authObject.user && <Login />}
            </Route>
        </Switch>
    </MemoryRouter>;
}

describe('Check Navbar Conditional Display', () => {
    ReactModal.setAppElement = () => null;

    const generalAuthObj = {
        user: null,
        authIsReady: false,
        adminFlag: false,
        dispatch: jest.fn()
    }

    it('Do not show: Explicit Timing Page', async () => {
        const unauthedObject = {
            ...generalAuthObj,
            user: null,
            authIsReady: true,
            adminFlag: false,
        }

        const wrapper = mount(
            <AuthorizationContext.Provider value={{ ...unauthedObject }}>
                {outputRelevantDirectory(unauthedObject)}
            </AuthorizationContext.Provider>
        );

        expect(wrapper.find('div.navbar')).toHaveLength(0);
        expect(wrapper.find(Login)).toHaveLength(1);
    });

})
