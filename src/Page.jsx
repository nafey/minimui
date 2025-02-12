import { useEffect, useState, useContext } from "react";
import { MyContext } from "./MyContext";

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
        // console.log(dashData);
        // console.log(dashGraphs);
      }
    })();
  }, [dashId, setDetails, setGraphs]);

  let dashText = JSON.stringify(details);
  // let graphText = JSON.stringify(graphs);

  return (
    <div>
      <div> Page {dashText} </div>
      {graphs.map((item, i) => {
        let itemText = JSON.stringify(item);

        return <div key={i}>{itemText}</div>;
      })}
      <div></div>
    </div>
  );
};

export default Page;
