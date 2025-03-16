import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { useToast } from "../ui/ToastContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import LineChart from "./LineChart";
import MenuButton from "../ui/MenuButton";
import MenuItem from "../ui/MenuItem";
import { Pen, RotateCw, Trash2 } from "lucide-react";

const GraphContainer = ({ graph, disableMenu, deleteAction }) => {
  const [eventName, setEventName] = useState("");
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
    let length = graph.length;

    const response2 = await fetch("/api/stat/", {
      method: "POST",
      body: JSON.stringify({
        event: event,
        period: period,
        length: length,
      }),
    });

    let result = await response2.json();
    let data = result.data;

    const counts = data.map((item) => item.count);
    data = counts;
    data.reverse();
    setCount(data);

    const labels = [];
    const now = new Date();

    if (period == "HOURLY") {
      for (let i = length - 1; i >= 0; i--) {
        const date = new Date(now);
        date.setHours(now.getHours() - i);

        const month = date.toLocaleString("default", { month: "short" });
        const day = date.getDate();
        let hour = date.getHours();
        const ampm = hour >= 12 ? "pm" : "am";
        hour = hour % 12 || 12;

        const formattedTime = `${month} ${day}, ${hour}${ampm}`;

        labels.push(formattedTime);
      }
    } else if (period == "MINUTELY") {
      for (let i = length - 1; i >= 0; i--) {
        const date = new Date(now);
        date.setMinutes(now.getMinutes() - i); // Subtract 'i' minutes from the current time

        let hour = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hour >= 12 ? "pm" : "am";
        hour = hour % 12 || 12; // Convert to 12-hour format

        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedTime = `${hour}:${formattedMinutes}${ampm}`;

        labels.push(formattedTime);
      }
    } else if (period == "DAILY") {
      for (let i = length - 1; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(now.getDate() - i);

        const month = date.toLocaleString("default", { month: "short" });
        const day = date.getDate();

        const formattedDate = `${month} ${day}`;

        labels.push(formattedDate);
      }
    } else {
      for (let i = 0; i < 60; i++) {
        labels.push(i);
      }
    }
    setEventName(graph.event);

    setLabels(labels);
  };

  const refresh = async () => {
    await getData();
    showToast("Refereshed the graph", "success");
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graph]);

  let link = "/dashboard/" + dashboardId + "/graph/" + id;

  return (
    <div className="flex flex-col gap-4 w-full h-72 border border-neutral-700 rounded-xl">
      <Link to={link}>
        <div className="flex flex-row justify-between border-b p-4 border-neutral-700 rounded-t-xl hover:bg-neutral-800 cursor-pointer select-none">
          {graph?.name ? (
            <div>{graph.name}</div>
          ) : (
            <Skeleton
              className="w-56 px-2 py-1.5 rounded-lg"
              height={30}
              containerClassName="flex-1"
            ></Skeleton>
          )}
          {!disableMenu && graph != null && (
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

      {graph == null ? (
        <div className="px-4">
          <Skeleton
            className="rounded-lg"
            height={180}
            containerClassName="flex-1"
          ></Skeleton>
        </div>
      ) : (
        <LineChart count={count} labels={labels} eventName={eventName} />
      )}
    </div>
  );
};

export default GraphContainer;
