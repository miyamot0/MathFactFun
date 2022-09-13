/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Nav widget
 */

import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useFirebaseLogout } from "../firebase/hooks/useFirebaseLogout";
import { useAuthorizationContext } from "../context/hooks/useAuthorizationContext";
import { useLocation } from "react-router-dom";
import { confirmIfInterventionScreen } from "../utilities/PathHelper";
import Modal from "react-modal";

// styles & images
import "./styles/Navbar.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function Navbar() {
  const { logout, logoutPending } = useFirebaseLogout();
  const { user, authIsReady, adminFlag } = useAuthorizationContext();
  const location = useLocation();

  // modal stuff
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal(): void {
    setIsOpen(true);
  }

  function closeModal(): void {
    setIsOpen(false);
  }

  Modal.setAppElement("#root");

  return confirmIfInterventionScreen(location.pathname) ||
    location.pathname.includes("login") ? (
    <></>
  ) : (
    <div className="navbar" data-testid={"Navbar-id"}>
      {user && <p>Logged in: {user.email}</p>}

      <ul>
        {!user && (
          <li style={{ float: "left" }}>
            <Link to="/login">Login</Link>
          </li>
        )}

        <button className="global-btn" onClick={openModal}>
          Licenses
        </button>

        {user && authIsReady && adminFlag && (
          <li>
            <Link
              className="global-btn global-btn-orange admin-class"
              to="/admin"
            >
              Administration
            </Link>
          </li>
        )}

        {user && (
          <li>
            {!logoutPending && (
              <button className="global-btn global-btn-red" onClick={logout}>
                Logout
              </button>
            )}
            {logoutPending && (
              <button className="global-btn" onClick={logout}>
                Logging out...
              </button>
            )}
          </li>
        )}
      </ul>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={false}
        preventScroll={true}
        style={customStyles}
        ariaHideApp={!(process.env.NODE_ENV === "test")}
        contentLabel="Example Modal"
      >
        <h2>Open Source Licenses</h2>
        <div className="navbar-modal">
          <p className="navbar-modal-p">
            Math Fact Fun is Free/Open Source Software. It relies on the
            following packages:
          </p>
          <ul>
            <li>
              Measures and Interventions for Numeracy Development (MIND) - Brian
              Poncy
            </li>

            <li>firebase - Google (Apache 2.0)</li>

            <li>highcharts - Highsoft (Non-Commercial)</li>

            <li>highcharts-react-official - Highsoft (MIT)</li>

            <li>moment - JS Foundation and other contributors (MIT)</li>

            <li>react - Facebook (MIT)</li>

            <li>react-beautiful-dnd - Atlassian Pty Ltd (Apache 2.0)</li>

            <li>react-dom - Facebook (MIT)</li>

            <li>react-modal - Ryan Florence (MIT)</li>

            <li>react-router-dom - Remix Software (MIT)</li>

            <li>react-scripts - Facebook (MIT)</li>

            <li>react-select - Jed Watson (MIT)</li>
          </ul>
        </div>
        <button
          className="global-btn "
          style={{ float: "right" }}
          onClick={() => {
            closeModal();
          }}
        >
          Close
        </button>
      </Modal>
    </div>
  );
}
