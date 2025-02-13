import Page from "./Page";
import "./App.css";
import Sidebar from "./Sidebar";

function App() {
  return (
    <div className="flex h-screen max-w-screen">
      <Sidebar />
      <div className="flex-1 p-8 flex flex-col justify-start gap-16">
        <Page />
      </div>
    </div>
  );
}

export default App;
