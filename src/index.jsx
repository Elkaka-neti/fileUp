import React from "react";
import ReactDOM from "react-dom";
import Main from "./main.jsx"
import {LayoutFunc} from "./database.jsx";

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('Service Worker registrado', reg))
      .catch(err => console.log('Erro ao registrar SW', err));
  });
}

ReactDOM.render(
  <React.StrictMode>
    <LayoutFunc>
      <Main/>
    </LayoutFunc>
  </React.StrictMode>,
  document.getElementById("root")
);
