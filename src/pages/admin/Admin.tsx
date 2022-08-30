/**
 * Admin Page
 */

import React from "react";
import { Link } from "react-router-dom";
import { useFirebaseCollection } from "../../firebase/useFirebaseCollection";

// styles
import "./Admin.css";

export default function Admin(): JSX.Element {
  const { documents, error } = useFirebaseCollection("users", null, null);

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
            {documents.map((indivUser) => (
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