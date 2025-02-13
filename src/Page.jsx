import { useEffect, useState, useContext } from "react";
import { MyContext } from "./MyContext";
import GraphContainer from "./GraphContainer";

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

const Page = () => {
  const { dashId } = useContext(MyContext);
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
  }, [dashId, setDetails, setGraphs]);

  return (
    <div>
      <div className="mb-8">{details.name}</div>
      <div className="flex flex-col gap-8">
        {graphs.map((item, i) => {
          return <GraphContainer key={i} item={item} />;
        })}
      </div>
      <div></div>
    </div>
  );
};

export default Page;
