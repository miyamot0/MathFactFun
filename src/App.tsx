/**
 * Global app file
 */
import React from "react";

import { useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { useAuthorizationContext } from "./context/useAuthorizationContext";

// styles
import "./App.css";

// components
import Navbar from "./components/Navbar";
import SideBar from "./components/Sidebar";

// pages
import Edit from "./pages/edit/Edit";
import Login from "./pages/login/Login";
import Create from "./pages/create/Create";
import Student from "./pages/student/Student";
import Landing from "./pages/landing/Landing";
import Information from "./pages/information/Information";

// Dashboards
import DashboardDisplay from "./pages/dashboard/DashboardDisplay";
import DashboardPractice from "./pages/dashboard/DashboardPractice";
import DashboardBenchmark from "./pages/dashboard/DashboardBenchmark";

// Users/Settings
import Admin from "./pages/admin/Admin";
import SetCreator from "./pages/setcreator/SetCreator";
import Screening from "./pages/Screening/Screening";
import ProgressMonitor from "./pages/progress/ProgressMonitor";
import EditUser from "./pages/edit/EditUser";
import CreateUser from "./pages/create/CreateUser";
import CreateBulk from "./pages/create/CreateBulk";

// Intervention/Probes
import Benchmark from "./pages/benchmark/Benchmark";
import CoverCopyCompare from "./pages/intervention/CoverCopyCompare";
import ExplicitTiming from "./pages/intervention/ExplicitTiming";
import TapedProblems from "./pages/intervention/TapedProblems";

export type AppInterface = JSX.Element;

function App() {
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
                {user && <Create />}
              </Route>
              <Route path="/student/:id">
                {!user && <Redirect to="/login" />}
                {user && <Student />}
              </Route>
              <Route path="/edit/:id">
                {!user && <Redirect to="/login" />}
                {user && <Edit />}
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
                {user && adminFlag && <CreateBulk />}
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
