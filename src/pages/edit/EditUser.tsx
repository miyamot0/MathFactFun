/**
 * Student Edit Page
 */

import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useFirestore } from "../../firebase/useFirestore";
import { useHistory } from "react-router-dom";
import { useFirebaseDocument } from "../../firebase/useFirebaseDocument";
import { UserDataInterface } from "../../models/UserModel";

const EditFormStyle = {
  maxWidth: "600px",
};

export default function EditUser() {
  const history = useHistory();
  const { id } = useParams();
  const { documentError, document } = useFirebaseDocument("users", id);
  const { updateDocument, response } = useFirestore("users");

  // form field values
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");

  const [formError, setFormError] = useState<string>();
  const [didBuild, setDidBuild] = useState(false);

  if (document && !didBuild) {
    setDidBuild(true);
    setName((document as UserDataInterface).displayName);
    setSchool((document as UserDataInterface).displaySchool);
  }

  /** handleEditFormSubmit
   *
   * Submission event for student edit form
   *
   * @param {React.FormEvent<HTMLFormElement>} event Submitted event
   */
  async function handleEditFormSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<any> {
    event.preventDefault();

    setFormError(null);

    if (!name) {
      setFormError("Please enter a valid name");
      return;
    }

    if (!school) {
      setFormError("Please enter a valid school name");
      return;
    }

    const teacherObject = {
      displayName: name,
      displaySchool: school,
    };

    await updateDocument(id, teacherObject);

    if (!response.error) {
      history.push("/admin");
    }

    return null;
  }

  if (documentError) {
    return <div className="error">{documentError}</div>;
  }

  if (!document) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div style={EditFormStyle}>
      <h2 className="global-page-title">Edit current teacher</h2>

      <form onSubmit={handleEditFormSubmit}>
        <label>
          <span>Teacher Name:</span>
          <input
            required
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          ></input>
        </label>
        <label>
          <span>Teacher School:</span>
          <textarea
            required
            onChange={(e) => setSchool(e.target.value)}
            value={school}
          ></textarea>
        </label>

        <button className="global-btn ">Edit Teacher</button>
        {formError && <p className="error">{formError}</p>}
      </form>
      <br></br>
    </div>
  );
}
