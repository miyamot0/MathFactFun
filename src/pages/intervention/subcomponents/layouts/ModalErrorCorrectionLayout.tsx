/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import Modal from "react-modal";

import { ErrorModalCustomStyle } from "../styles/ModalStyles";

export default function ModalErrorCorrection({
  modalIsOpen,
  closeModal,
}: {
  modalIsOpen: boolean;
  closeModal: any;
}) {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={false}
      preventScroll={true}
      style={ErrorModalCustomStyle}
      ariaHideApp={!(process.env.NODE_ENV === "test")}
      contentLabel="Example Modal"
    >
      <h2>Double-check your math!</h2>
      <div style={{ marginTop: "5px", marginBottom: "10px" }}>
        Close this window, and then try again.
      </div>
      <button
        className="modal-close"
        style={{ float: "right" }}
        onClick={() => {
          closeModal();
        }}
      >
        Close
      </button>
    </Modal>
  );
}
