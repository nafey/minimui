import { useEffect, useState } from "react";
// import { MyContext } from "./MyContext";
import GraphContainer from "../graph/GraphContainer";
import Sidebar from "./Sidebar";
import Button from "../ui/Button";
import { Link, useParams } from "react-router";

const getDashboard = async (dashboardId) => {
  const response = await fetch("/api/dashboards/" + dashboardId, {});
  const result = await response.json();
  const data = result.data;
  return data;
};

// const getDashGraphs = async (dashId) => {
//   const response = await fetch("/api/dashboards/" + dashId + "/graphs/", {});
//   const result = await response.json();
//   const data = result.data;
//   return data;
// };

const DashPage = () => {
  let { dashboardId } = useParams();

  const [details, setDetails] = useState({});
  const [graphs, setGraphs] = useState([]);

  useEffect(() => {
    (async () => {
      if (dashboardId) {
        let dashData = await getDashboard(dashboardId);
        let dashGraphs = dashData?.graphs ? dashData.graphs : [];

        setDetails(dashData);
        setGraphs(dashGraphs);
      }
    })();
  }, [dashboardId]);

  return (
    <div className="flex h-screen max-w-screen">
      <Sidebar />

      <div className="flex-1 p-8 flex flex-col justify-between gap-32">
        <div>
          <div className="mb-8 ">{details.name}</div>
          <div className="flex flex-col gap-8">
            {graphs.map((graph, i) => {
              return <GraphContainer key={i} graph={graph} />;
            })}
          </div>
          <div className="flex justify-center w-32 mt-8 text-neutral-300">
            <Link to={"/dashboard/" + dashboardId + "/addgraph/"}>
              <Button text="+ Add Graph" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashPage;
