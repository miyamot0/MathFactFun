/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Admin Page
 */

import React from "react";

import { Link } from "react-router-dom";
import { CurrentObjectTypeArrays } from "../../firebase/types/GeneralTypes";
import { useFirebaseCollection } from "../../firebase/useFirebaseCollection";
import { UserDataInterface } from "../../models/UserModel";

// styles
import "./Admin.css";

const userConverter = (userArray: CurrentObjectTypeArrays) => {
  return userArray!.map((usr) => usr as unknown as UserDataInterface);
};

export default function Admin(): JSX.Element {
  const { documents, error } = useFirebaseCollection(
    "users",
    undefined,
    undefined
  );

  return (
    <div>
      <h2 className="global-page-title">Administrative Dashboard</h2>
      {error && <p className="error">{error}</p>}

      {documents && documents.length > 0 ? (
        <table className="adminTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Name</th>
              <th>School</th>
              <th>Edit</th>
              <th>Roster</th>
            </tr>
          </thead>
          <tbody>
            {userConverter(documents).map((indivUser) => (
              <tr key={`${indivUser.id}-link2`}>
                <td>{indivUser.id}</td>
                <td>{indivUser.displayEmail}</td>
                <td>{indivUser.displayName}</td>
                <td>{indivUser.displaySchool}</td>
                <td>
                  <Link
                    to={`/editUser/${indivUser.id}`}
                    key={`${indivUser.id}-link1`}
                  >
                    <button className="global-btn global-btn-orange btn-grow-horiz">
                      Edit
                    </button>
                  </Link>
                </td>
                <td>
                  <Link
                    to={`/createStudents/${indivUser.id}`}
                    key={`${indivUser.id}-link2`}
                  >
                    <button className="global-btn btn-grow-horiz">
                      Add Student(s)
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <></>
      )}

      <Link to={`/createUser`}>
        <button className="global-btn global-btn-light-red new-user-btn">
          Create New User
        </button>
      </Link>
    </div>
  );
}
