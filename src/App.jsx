import "./App.css";
import DashPage from "./DashPage";
import HomePage from "./HomePage";
import GraphPage from "./GraphPage";
import { BrowserRouter, Routes, Route, Link } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard/:dashId" element={<DashPage />} />
        <Route
          path="/dashboard/:dashId/graph/:graphId/"
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
