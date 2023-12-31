/* @refresh reload */
import { render } from "solid-js/web";
import ExplorerPage from "./routes/explorer";
import EditorPage from "./routes/editor";
import { Router, Route, Routes } from "@solidjs/router";
import Layout from "./layout/main";
import HomePage from "./routes/home";

import "./preflight.css";
import "./global.css";
import Titlebar from "./components/titlebar";

render(() =>
(
  <>
    <Router>
      <Titlebar />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/editor/:route" element={<EditorPage />} />
          <Route path="/explorer" element={<ExplorerPage />} />
        </Routes>
      </Layout>
    </Router>
  </>
),
  document.getElementById("root") as HTMLElement);
