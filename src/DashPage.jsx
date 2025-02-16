import { useEffect, useState } from "react";
// import { MyContext } from "./MyContext";
import GraphContainer from "./GraphContainer";
import Sidebar from "./Sidebar";
import { useParams } from "react-router";

const getDashboard = async (dashId) => {
  const response = await fetch("/api/dashboards/" + dashId, {});
  const result = await response.json();
  const data = result.data;
  return data;
};

const getDashGraphs = async (dashId) => {
  const response = await fetch("/api/dashboards/" + dashId + "/graphs/", {});
  const result = await response.json();
  const data = result.data;
  return data;
};

const DashPage = () => {
  let { dashId } = useParams();
  // const { dashId } = useContext(MyContext);
  const [details, setDetails] = useState({});
  const [graphs, setGraphs] = useState([]);

  useEffect(() => {
    (async () => {
      if (dashId) {
        let dashData = await getDashboard(dashId);
        let dashGraphs = await getDashGraphs(dashId);

        setDetails(dashData);
        setGraphs(dashGraphs);
      }
    })();
  }, [dashId]);

  return (
    <div className="flex h-screen max-w-screen">
      <Sidebar />

      <div className="flex-1 p-8 flex flex-col justify-start gap-16">
        <div>
          <div className="mb-8 ">{details.name}</div>
          <div className="flex flex-col gap-8">
            {graphs.map((item, i) => {
              return <GraphContainer key={i} item={item} />;
            })}
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default DashPage;
