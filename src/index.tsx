/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthorizationContextProvider } from "./context/AuthorizationContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthorizationContextProvider>
      <App />
    </AuthorizationContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
