/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Global app file
 */
import React from "react";

import { useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { useAuthorizationContext } from "./context/useAuthorizationContext";

// Components
import Navbar from "./components/Navbar";
import SideBar from "./components/Sidebar";

// Pages
import Landing from "./pages/landing/Landing";
import Information from "./pages/information/Information";
import Login from "./pages/login/Login";

import CreateStudent from "./pages/student/CreateStudent";
import CreateBulkStudents from "./pages/student/CreateBulkStudents";
import DisplayStudent from "./pages/student/DisplayStudent";
import EditStudent from "./pages/student/EditStudent";
import SetCreator from "./pages/setcreator/SetCreator";

import Admin from "./pages/admin/Admin";
import DashboardDisplay from "./pages/dashboard/DashboardDisplay";
import DashboardPractice from "./pages/dashboard/DashboardPractice";
import DashboardBenchmark from "./pages/dashboard/DashboardBenchmark";
import Screening from "./pages/Screening/Screening";
import ProgressMonitor from "./pages/progress/ProgressMonitor";

import CreateUser from "./pages/user/CreateUser";
import EditUser from "./pages/user/EditUser";

import Benchmark from "./pages/intervention/Benchmark";
import CoverCopyCompare from "./pages/intervention/CoverCopyCompare";
import ExplicitTiming from "./pages/intervention/ExplicitTiming";
import TapedProblems from "./pages/intervention/TapedProblems";

// Styles
import "./App.css";

export type AppInterface = JSX.Element;

function App(): AppInterface {
  const { user, authIsReady, adminFlag } = useAuthorizationContext();

  useEffect(() => {
    document.title = "Math Fact Fun";
  }, []);

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          {user && <SideBar />}
          <div className="container">
            <Navbar />
            <Switch>
              <Route exact path="/">
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
              <Route path="/CoverCopyCompare/:target/:id">
                {!user && <Redirect to="/login" />}
                {user && <CoverCopyCompare />}
              </Route>
              <Route path="/ExplicitTiming/:target/:id">
                {!user && <Redirect to="/login" />}
                {user && <ExplicitTiming />}
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
                {user && !adminFlag && <Redirect to="/dashboard" />}
                {user && adminFlag && <Admin />}
              </Route>
              <Route path="/createUser">
                {user && !adminFlag && <Redirect to="/dashboard" />}
                {user && adminFlag && <CreateUser />}
              </Route>
              <Route path="/editUser/:id">
                {user && !adminFlag && <Redirect to="/dashboard" />}
                {user && adminFlag && <EditUser />}
              </Route>
              <Route path="/createStudents/:id">
                {user && !adminFlag && <Redirect to="/dashboard" />}
                {user && adminFlag && <CreateBulkStudents />}
              </Route>
              <Route path="/login">
                {user && <Redirect to="/" />}
                {!user && <Login />}
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
