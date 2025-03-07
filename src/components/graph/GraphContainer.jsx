import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { useToast } from "../ui/ToastContext";

import MyLineChart from "./MyLineChart";
import MenuButton from "../ui/MenuButton";
import MenuItem from "../ui/MenuItem";
import { Pen, RotateCw, Trash2 } from "lucide-react";

const GraphContainer = ({ graph, disableMenu, deleteAction }) => {
  const [labels, setLabels] = useState([]);
  const [count, setCount] = useState([]);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const { dashboardId } = useParams();
  const { id } = { ...graph };

  const getData = async () => {
    if (!graph) return;
    if (!graph.event || !graph.period) return;

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
  };

  const refresh = async () => {
    await getData();
    showToast("Refereshed the graph", "success");
  };

  useEffect(() => {
    getData();
  }, [graph]);

  if (!graph) {
    return <div>Loading</div>;
  }

  let link = "/dashboard/" + dashboardId + "/graph/" + id;

  return (
    <div className="flex flex-col gap-4 w-full h-72 border border-neutral-700 rounded-xl">
      <Link to={link}>
        <div className="flex flex-row justify-between border-b p-4 border-neutral-700 rounded-t-xl hover:bg-neutral-800 cursor-pointer select-none">
          <div>{graph.name}</div>
          {!disableMenu && (
            <MenuButton>
              <MenuItem Icon={Pen} text="Edit" action={() => navigate(link)} />
              <MenuItem Icon={RotateCw} text="Refresh" action={refresh} />
              <MenuItem
                Icon={Trash2}
                text="Delete"
                action={() => deleteAction(id)}
              />
            </MenuButton>
          )}
        </div>
      </Link>
      <MyLineChart count={count} labels={labels} />
    </div>
  );
};

export default GraphContainer;
