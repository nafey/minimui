import LineChart2 from "./LineChart";
import "./App.css";
import {} from "recharts";
import Sidebar from "./Sidebar";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
// import { ChevronLeft } from "lucide-react";
import CollapseButton from "./CollapseButton";

function App() {
  return (
    <div className="flex h-full">
      {/* <Navbar /> */}
      <Sidebar />
      <div className="flex-1 p-8 flex flex-col justify-start gap-16">
        {/* <CollapseButton /> */}
        <LineChart2 />
      </div>
    </div>
  );
}

export default App;
