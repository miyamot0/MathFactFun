/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Sidebar widget
 */

import React from "react";
import { useAuthorizationContext } from "../context/useAuthorizationContext";

import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ConfirmIfInterventionScreen } from "../utilities/PathHelper";

import WindowSideBar from "../assets/window-sidebar.svg";
import PlusSquare from "../assets/plus-square.svg";
import InfoCircle from "../assets/info-circle.svg";
import PlayIcon from "../assets/play.svg";
import BarChartLineFill from "../assets/bar-chart-line-fill.svg";
import House from "../assets/house.svg";

import "./Sidebar.css";

export default function Sidebar(): JSX.Element {
  const location = useLocation();

  const { authIsReady } = useAuthorizationContext();

  return ConfirmIfInterventionScreen(location.pathname) && authIsReady ? (
    <></>
  ) : (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="user">
          <li className="logo">
            <img src={BarChartLineFill} alt="site logo"></img>
            <span>Math Fact Fun</span>
          </li>
        </div>
        <nav className="links">
          <ul>
            <li>
              <NavLink exact to="/">
                <img src={House} alt="dashboard" />
                <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/information">
                <img src={InfoCircle} alt="information" />
                <span>Information</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/dashboard`}>
                <img src={WindowSideBar} alt="dashboard" />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/practice`}>
                <img src={PlayIcon} alt="practice" />
                <span>Practice</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/create">
                <img src={PlusSquare} alt="add student" />
                <span>Add Student</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
