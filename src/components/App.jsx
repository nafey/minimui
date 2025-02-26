import "./../App.css";
import DashPage from "./dash/DashPage";
import HomePage from "./home/HomePage";
import GraphPage from "./graph/GraphPage";
import { BrowserRouter, Routes, Route, Link } from "react-router";

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
          path="*"
          element={
            <div className="p-32 text-xl">
              404: Not Found.
              <br /> Click here to go to{" "}
              <Link to="/">
                <a className="text-blue-800 underline">home</a>.
              </Link>{" "}
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
