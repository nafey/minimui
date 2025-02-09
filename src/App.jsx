import LineChart2 from "./LineChart";
import "./App.css";
import {} from "recharts";
import Sidebar from "./Sidebar";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { ChevronLeft } from "lucide-react";

function App() {
  return (
    <div className="flex h-full">
      {/* <Navbar /> */}
      <Sidebar />
      <div className="flex-1 p-8 flex flex-col justify-start gap-16">
        <div className="flex justify-start">
          <div className="flex items-center justify-center w-8 h-8 hover:bg-neutral-800 rounded-lg cursor-pointer">
            <ChevronLeft color="white" size={18} />
          </div>
        </div>
        <LineChart2 />
      </div>
    </div>
  );
}

export default App;
