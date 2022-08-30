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
