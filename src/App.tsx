/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { lazy, Suspense } from 'react'

import { useEffect } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { useAuthorizationContext } from './context/hooks/useAuthorizationContext'

// Components
import Navbar from './components/Navbar'
import SideBar from './components/Sidebar'

// Pages
const Landing = lazy(() => import('./pages/landing/Landing'))
const Information = lazy(() => import('./pages/information/Information'))
const Login = lazy(() => import('./pages/login/Login'))

const CreateStudent = lazy(() => import('./pages/student/CreateStudent'))
const CreateBulkStudents = lazy(
    () => import('./pages/student/CreateBulkStudents')
)
const DisplayStudent = lazy(() => import('./pages/student/DisplayStudent'))
const EditStudent = lazy(() => import('./pages/student/EditStudent'))
const SetCreator = lazy(() => import('./pages/setcreator/SetCreator'))

const Admin = lazy(() => import('./pages/admin/Admin'))
const DashboardDisplay = lazy(
    () => import('./pages/dashboard/DashboardDisplay')
)
const DashboardPractice = lazy(
    () => import('./pages/dashboard/DashboardPractice')
)
const DashboardBenchmark = lazy(
    () => import('./pages/dashboard/DashboardBenchmark')
)
const Screening = lazy(() => import('./pages/screening/Screening'))
const ProgressMonitor = lazy(() => import('./pages/progress/ProgressMonitor'))

const CreateUser = lazy(() => import('./pages/user/CreateUser'))
const EditUser = lazy(() => import('./pages/user/EditUser'))

const Benchmark = lazy(() => import('./pages/intervention/Benchmark'))
const TutorialBenchmark = lazy(
    () => import('./pages/tutorials/TutorialBenchmark')
)

const CoverCopyCompare = lazy(
    () => import('./pages/intervention/CoverCopyCompare')
)
const TutorialCoverCopyCompare = lazy(
    () => import('./pages/tutorials/TutorialCoverCopyCompare')
)

const ExplicitTiming = lazy(() => import('./pages/intervention/ExplicitTiming'))
const TutorialExplicitTiming = lazy(
    () => import('./pages/tutorials/TutorialExplicitTiming')
)

const TapedProblems = lazy(() => import('./pages/intervention/TapedProblems'))

// Styles
import './App.css'
import Home from './pages/home/Home'
import EditBulkStudents from './pages/student/EditBulkStudents'

export type AppInterface = JSX.Element

export function App(): AppInterface {
    const { user, authIsReady, adminFlag } = useAuthorizationContext()

    useEffect(() => {
        document.title = 'Math Fact Fun'
    }, [])

    return (
        <div className="App" data-testid={'App-id'}>
            {authIsReady && (
                <BrowserRouter>
                    {user && <SideBar />}
                    <div className="container">
                        <Navbar />
                        <Suspense fallback={<div>Loading...</div>}>
                            <Switch>
                                <Route exact path="/">
                                    {!user && <Home />}
                                    {user && <Landing />}
                                </Route>
                                <Route exact path="/landing">
                                    {!user && <Redirect to="/login" />}
                                    {user && <Landing />}
                                </Route>
                                <Route path="/dashboard">
                                    {!user && <Redirect to="/login" />}
                                    {user && <DashboardDisplay />}
                                </Route>
                                <Route path="/practice">
                                    {!user && <Redirect to="/login" />}
                                    {user && <DashboardPractice />}
                                </Route>
                                <Route path="/information">
                                    {!user && <Redirect to="/login" />}
                                    {user && <Information />}
                                </Route>
                                <Route path="/create">
                                    {!user && <Redirect to="/login" />}
                                    {user && <CreateStudent />}
                                </Route>
                                <Route path="/student/:id">
                                    {!user && <Redirect to="/login" />}
                                    {user && <DisplayStudent />}
                                </Route>
                                <Route path="/edit/:id">
                                    {!user && <Redirect to="/login" />}
                                    {user && <EditStudent />}
                                </Route>
                                <Route path="/set/:target/:id">
                                    {!user && <Redirect to="/login" />}
                                    {user && <SetCreator />}
                                </Route>
                                <Route path="/probe/:id">
                                    {!user && <Redirect to="/login" />}
                                    {user && <DashboardBenchmark />}
                                </Route>
                                <Route path="/benchmark/:id/:target">
                                    {!user && <Redirect to="/login" />}
                                    {user && <Benchmark />}
                                </Route>
                                <Route path="/tutorial/benchmark/:id/:target">
                                    {!user && <Redirect to="/login" />}
                                    {user && <TutorialBenchmark />}
                                </Route>
                                <Route path="/CoverCopyCompare/:target/:id">
                                    {!user && <Redirect to="/login" />}
                                    {user && <CoverCopyCompare />}
                                </Route>
                                <Route path="/tutorial/CoverCopyCompare/:id">
                                    {!user && <Redirect to="/login" />}
                                    {user && <TutorialCoverCopyCompare />}
                                </Route>
                                <Route path="/ExplicitTiming/:target/:id">
                                    {!user && <Redirect to="/login" />}
                                    {user && <ExplicitTiming />}
                                </Route>
                                <Route path="/tutorial/ExplicitTiming/:id">
                                    {!user && <Redirect to="/login" />}
                                    {user && <TutorialExplicitTiming />}
                                </Route>
                                <Route path="/TapedProblems/:target/:id">
                                    {!user && <Redirect to="/login" />}
                                    {user && <TapedProblems />}
                                </Route>
                                <Route path="/ProgressMonitor/:target/:id/:method/:aim">
                                    {!user && <Redirect to="/login" />}
                                    {user && <ProgressMonitor />}
                                </Route>
                                <Route path="/Screening/:id">
                                    {!user && <Redirect to="/login" />}
                                    {user && <Screening />}
                                </Route>
                                <Route path="/admin">
                                    {user && !adminFlag && (
                                        <Redirect to="/dashboard" />
                                    )}
                                    {user && adminFlag && <Admin />}
                                </Route>
                                <Route path="/createUser">
                                    {user && !adminFlag && (
                                        <Redirect to="/dashboard" />
                                    )}
                                    {user && adminFlag && <CreateUser />}
                                </Route>
                                <Route path="/editUser/:id">
                                    {user && !adminFlag && (
                                        <Redirect to="/dashboard" />
                                    )}
                                    {user && adminFlag && <EditUser />}
                                </Route>
                                <Route path="/createStudents/:id">
                                    {user && !adminFlag && (
                                        <Redirect to="/dashboard" />
                                    )}
                                    {user && adminFlag && (
                                        <CreateBulkStudents />
                                    )}
                                </Route>
                                <Route path="/editStudents/:id">
                                    {user && !adminFlag && (
                                        <Redirect to="/dashboard" />
                                    )}
                                    {user && adminFlag && <EditBulkStudents />}
                                </Route>
                                <Route path="/login">
                                    {user && <Redirect to="/" />}
                                    {!user && <Login />}
                                </Route>
                                <Route path="/">
                                    {!user && <Redirect to="/login" />}
                                    {user && <Landing />}
                                </Route>
                            </Switch>
                        </Suspense>
                    </div>
                </BrowserRouter>
            )}
        </div>
    )
}

export default App
