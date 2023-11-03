/* @refresh reload */
import { render } from "solid-js/web";
import App from "./App";
import Explorer from "./routes/explorer";
import { Router, Route, Routes } from "@solidjs/router";

import "./preflight.css";
import "./global.css";

render(() =>
(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/explorer" element={<Explorer />} />
    </Routes>
  </Router>
),
  document.getElementById("root") as HTMLElement);
