/**
 * @jest-environment jsdom
 */

/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import ReactModal from "react-modal";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import firebase from "firebase";
import Navbar from "../components/Navbar";
import Landing from "../pages/landing/Landing";
import DashboardDisplay from "../pages/dashboard/DashboardDisplay";
import DashboardPractice from "../pages/dashboard/DashboardPractice";
import Information from "../pages/information/Information";
import Admin from "../pages/admin/Admin";
import DashboardBenchmark from "../pages/dashboard/DashboardBenchmark";
import Benchmark from "../pages/intervention/Benchmark";
import CoverCopyCompare from "../pages/intervention/CoverCopyCompare";
import ExplicitTiming from "../pages/intervention/ExplicitTiming";
import TapedProblems from "../pages/intervention/TapedProblems";
import Login from "../pages/login/Login";
import ProgressMonitor from "../pages/progress/ProgressMonitor";
import Screening from "../pages/screening/Screening";
import SetCreator from "../pages/setcreator/SetCreator";
import CreateBulkStudents from "../pages/student/CreateBulkStudents";
import CreateStudent from "../pages/student/CreateStudent";
import DisplayStudent from "../pages/student/DisplayStudent";
import EditStudent from "../pages/student/EditStudent";
import CreateUser from "../pages/user/CreateUser";
import EditUser from "../pages/user/EditUser";

import { AuthorizationContext } from "../context/AuthorizationContext";
import { mount } from "enzyme";
import { Redirect, Route, Router, Switch } from "react-router-dom";
import { createMemoryHistory } from "history";

Enzyme.configure({ adapter: new Adapter() });

const generalAuthObj = {
  user: null,
  authIsReady: false,
  adminFlag: false,
  dispatch: jest.fn(),
};

describe("Routing (No Admin)", () => {
  ReactModal.setAppElement = () => null;

  it("Should display conditionally selectively", async () => {
    const unauthedObject = {
      ...generalAuthObj,
      user: { uid: "123" } as firebase.User,
      authIsReady: true,
      adminFlag: false,
    };

    const history = createMemoryHistory();

    const wrapper = mount(
      <AuthorizationContext.Provider value={{ ...unauthedObject }}>
        <Router history={history}>
          <Navbar />
          <Switch>
            <Route exact path="/">
              {!unauthedObject.user && <Redirect to="/login" />}
              {unauthedObject.user && <Landing />}
            </Route>
            <Route path="/dashboard">
              {!unauthedObject.user && <Redirect to="/login" />}
              {unauthedObject.user && <DashboardDisplay />}
            </Route>
            <Route path="/practice">
              {!unauthedObject.user && <Redirect to="/login" />}
              {unauthedObject.user && <DashboardPractice />}
            </Route>
            <Route path="/information">
              {!unauthedObject.user && <Redirect to="/login" />}
              {unauthedObject.user && <Information />}
            </Route>
            <Route path="/create">
              {!unauthedObject.user && <Redirect to="/login" />}
              {unauthedObject.user && <CreateStudent />}
            </Route>
            <Route path="/student/:id">
              {!unauthedObject.user && <Redirect to="/login" />}
              {unauthedObject.user && <DisplayStudent />}
            </Route>
            <Route path="/edit/:id">
              {!unauthedObject.user && <Redirect to="/login" />}
              {unauthedObject.user && <EditStudent />}
            </Route>
            <Route path="/set/:target/:id">
              {!unauthedObject.user && <Redirect to="/login" />}
              {unauthedObject.user && <SetCreator />}
            </Route>
            <Route path="/probe/:id">
              {!unauthedObject.user && <Redirect to="/login" />}
              {unauthedObject.user && <DashboardBenchmark />}
            </Route>
            <Route path="/benchmark/:id/:target">
              {!unauthedObject.user && <Redirect to="/login" />}
              {unauthedObject.user && <Benchmark />}
            </Route>
            <Route path="/CoverCopyCompare/:target/:id">
              {!unauthedObject.user && <Redirect to="/login" />}
              {unauthedObject.user && <CoverCopyCompare />}
            </Route>
            <Route path="/ExplicitTiming/:target/:id">
              {!unauthedObject.user && <Redirect to="/login" />}
              {unauthedObject.user && <ExplicitTiming />}
            </Route>
            <Route path="/TapedProblems/:target/:id">
              {!unauthedObject.user && <Redirect to="/login" />}
              {unauthedObject.user && <TapedProblems />}
            </Route>
            <Route path="/ProgressMonitor/:target/:id/:method/:aim">
              {!unauthedObject.user && <Redirect to="/login" />}
              {unauthedObject.user && <ProgressMonitor />}
            </Route>
            <Route path="/Screening/:id">
              {!unauthedObject.user && <Redirect to="/login" />}
              {unauthedObject.user && <Screening />}
            </Route>
            <Route path="/admin">
              {unauthedObject.user && !unauthedObject.adminFlag && (
                <Redirect to="/dashboard" />
              )}
              {unauthedObject.user && unauthedObject.adminFlag && <Admin />}
            </Route>
            <Route path="/createUser">
              {unauthedObject.user && !unauthedObject.adminFlag && (
                <Redirect to="/dashboard" />
              )}
              {unauthedObject.user && unauthedObject.adminFlag && (
                <CreateUser />
              )}
            </Route>
            <Route path="/editUser/:id">
              {unauthedObject.user && !unauthedObject.adminFlag && (
                <Redirect to="/dashboard" />
              )}
              {unauthedObject.user && unauthedObject.adminFlag && <EditUser />}
            </Route>
            <Route path="/createStudents/:id">
              {unauthedObject.user && !unauthedObject.adminFlag && (
                <Redirect to="/dashboard" />
              )}
              {unauthedObject.user && unauthedObject.adminFlag && (
                <CreateBulkStudents />
              )}
            </Route>
            <Route path="/login">
              {unauthedObject.user && <Redirect to="/" />}
              {!unauthedObject.user && <Login />}
            </Route>
          </Switch>
        </Router>
      </AuthorizationContext.Provider>
    );

    history.push("/");

    // Landing, True
    expect(wrapper.find("div.navbar")).toHaveLength(1);
    expect(wrapper.find(Landing)).toHaveLength(1);

    history.push("/information");
    wrapper.update();

    expect(wrapper.find("div.navbar")).toHaveLength(1);
    expect(wrapper.find(Information)).toHaveLength(1);

    history.push("/dashboard");
    wrapper.update();

    expect(wrapper.find("div.navbar")).toHaveLength(1);
    expect(wrapper.find(DashboardDisplay)).toHaveLength(1);

    history.push("/practice");
    wrapper.update();

    expect(wrapper.find("div.navbar")).toHaveLength(1);
    expect(wrapper.find(DashboardPractice)).toHaveLength(1);

    history.push("/create");
    wrapper.update();

    expect(wrapper.find("div.navbar")).toHaveLength(1);
    expect(wrapper.find(CreateStudent)).toHaveLength(1);

    history.push("/ProgressMonitor/Addition/123/ExplicitTiming/40");
    wrapper.update();

    expect(wrapper.find("div.navbar")).toHaveLength(1);
    expect(wrapper.find(ProgressMonitor)).toHaveLength(1);

    history.push("/ExplicitTiming/Addition/123");
    wrapper.update();

    expect(wrapper.find("div.navbar")).toHaveLength(0);
    expect(wrapper.find(ExplicitTiming)).toHaveLength(1);

    history.push("/CoverCopyCompare/Addition/123");
    wrapper.update();

    expect(wrapper.find("div.navbar")).toHaveLength(0);
    expect(wrapper.find(CoverCopyCompare)).toHaveLength(1);

    history.push("/benchmark/Addition/123");
    wrapper.update();

    expect(wrapper.find("div.navbar")).toHaveLength(0);
    expect(wrapper.find(Benchmark)).toHaveLength(1);
  });
});
