import "./../App.css";

import DashPage from "./dash/DashPage";
import HomePage from "./home/HomePage";
import GraphPage from "./graph/GraphPage";
import AddGraphPage from "./graph/AddGraphPage";
import NotFound from "./NotFound";
import { ToastProvider } from "./ui/ToastContext";
import { BrowserRouter, Routes, Route } from "react-router";
import { SkeletonTheme } from "react-loading-skeleton";

function App() {
  return (
    <SkeletonTheme
      containerClassName="flex-1"
      baseColor="#202020"
      highlightColor="#444"
      enableAnimation={true}
      duration={1.5}
    >
      <ToastProvider>
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
      </ToastProvider>
    </SkeletonTheme>
  );
}

export default App;
