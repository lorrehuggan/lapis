/* @refresh reload */
import { render } from "solid-js/web";
import ExplorerPage from "./routes/explorer";
import EditorPage from "./routes/editor";
import { Router, Route, Routes } from "@solidjs/router";

import "./preflight.css";
import "./global.css";
import Layout from "./layout/main";

render(() =>
(
  <>
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<EditorPage />} />
          <Route path="/explorer" element={<ExplorerPage />} />
        </Routes>
      </Layout>
    </Router>
  </>
),
  document.getElementById("root") as HTMLElement);
