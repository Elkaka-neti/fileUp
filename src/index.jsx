import React from "react";
import ReactDOM from "react-dom";
import Main from "./main.jsx"
import {LayoutFunc} from "./database.jsx";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

serviceWorkerRegistration.register();

ReactDOM.render(
  <React.StrictMode>
    <LayoutFunc>
      <Main/>
    </LayoutFunc>
  </React.StrictMode>,
  document.getElementById("root")
);
