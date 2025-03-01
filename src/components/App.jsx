import "./../App.css";

import DashPage from "./dash/DashPage";
import HomePage from "./home/HomePage";
import GraphPage from "./graph/GraphPage";
import AddGraphPage from "./graph/AddGraphPage";
import NotFound from "./NotFound";
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard/:dashboardId" element={<DashPage />} />
        <Route
          path="/dashboard/:dashboardId/graph/:graphId/"
          element={<GraphPage />}
        />
        <Route
          path="/dashboard/:dashboardId/addgraph/"
          element={<AddGraphPage />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
