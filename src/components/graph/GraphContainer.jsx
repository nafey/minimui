import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import MyLineChart from "./MyLineChart";

const GraphContainer = ({ graph }) => {
  const [labels, setLabels] = useState([]);
  const [count, setCount] = useState([]);

  const { dashboardId } = useParams();
  const { id } = { ...graph };

  useEffect(() => {
    (async () => {
      if (!graph) return;

      let event = graph.event;
      let period = graph.period;

      let path = "";

      if (period === "DAILY") {
        path = "/api/stat/daily/";
      } else if (period === "HOURLY") {
        path = "/api/stat/hourly/";
      } else if (period == "MINUTELY") {
        path = "/api/stat/minutes/";
      } else {
        return;
      }

      const response = await fetch(path, {
        method: "POST",
        body: JSON.stringify({
          event: event,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      let data = result.data;

      const counts = data.map((item) => item.count);
      data = counts;
      data.reverse();

      setCount(data);

      const labels = [];
      for (let i = 0; i < 60; i++) {
        labels.push(i);
      }

      setLabels(labels);
    })();
  }, [graph]);

  if (!graph) {
    return <div>Loading</div>;
  }

  let link = "/dashboard/" + dashboardId + "/graph/" + id;

  return (
    <div className="flex flex-col gap-4 w-full h-72 border border-neutral-700 rounded-xl">
      <Link to={link}>
        <div className="border-b p-4 border-neutral-700 rounded-t-xl hover:bg-neutral-800 cursor-pointer select-none">
          {graph.name}
        </div>
      </Link>
      <MyLineChart count={count} labels={labels} />
    </div>
  );
};

export default GraphContainer;
