import "./../App.css";

import DashPage from "./dash/DashPage";
import HomePage from "./home/HomePage";
import GraphPage from "./graph/GraphPage";
import AddGraphPage from "./graph/AddGraphPage";
import NotFound from "./NotFound";
import { ToastProvider } from "./ui/ToastContext";
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/ui/" element={<HomePage />} />
          <Route path="/ui/dashboard/:dashboardId" element={<DashPage />} />
          <Route
            path="/ui/dashboard/:dashboardId/graph/:graphId/"
            element={<GraphPage />}
          />
          <Route
            path="/ui/dashboard/:dashboardId/addgraph/"
            element={<AddGraphPage />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
