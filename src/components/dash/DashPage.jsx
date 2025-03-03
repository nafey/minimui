import { useEffect, useState } from "react";

import GraphContainer from "../graph/GraphContainer";
import Sidebar from "./Sidebar";
import Button from "../ui/Button";
import EditableLabel from "../ui/EditableLabel";
import { Link, useParams } from "react-router";

const DashPage = () => {
  let { dashboardId } = useParams();

  const [details, setDetails] = useState({});
  const [graphs, setGraphs] = useState([]);
  const [dashlist, setDashlist] = useState([]);
  const [isEditingDashname, setEditingDashname] = useState(false);

  const getDashboard = async (dashboardId) => {
    const response = await fetch("/api/dashboards/" + dashboardId, {});
    const result = await response.json();
    const data = result.data;
    return data;
  };

  const getDashboards = async () => {
    const response = await fetch("/api/dashboards/", {});
    const result = await response.json();

    if (!(result && result.data)) {
      return [];
    }

    return result.data;
  };

  const updateDashName = async (name) => {
    setDetails({ ...details, name: name });

    await fetch("/api/dashboards/" + dashboardId, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
      }),
    });

    let dashData = await getDashboard(dashboardId);
    let dashGraphs = dashData?.graphs ? dashData.graphs : [];

    setDetails(dashData);
    setGraphs(dashGraphs);

    let data = await getDashboards();
    setDashlist(data);
  };

  const renameAction = () => {
    setEditingDashname(true);
  };

  useEffect(() => {
    (async () => {
      if (dashboardId) {
        let dashData = await getDashboard(dashboardId);
        let dashGraphs = dashData?.graphs ? dashData.graphs : [];

        setDetails(dashData);
        setGraphs(dashGraphs);
      }
    })();

    (async () => {
      let data = await getDashboards();
      setDashlist(data);
    })();
  }, [dashboardId]);

  return (
    <div className="flex h-screen max-w-screen">
      <Sidebar dashlist={dashlist} renameAction={renameAction} />

      <div className="flex-1 p-8 flex flex-col gap-8 overflow-scroll">
        <div className="flex flex-row justify-between">
          <EditableLabel
            isEditing={isEditingDashname}
            setEditing={setEditingDashname}
            text={details.name}
            onChange={(newName) => updateDashName(newName)}
          />
        </div>
        {graphs.map((graph, i) => {
          return <GraphContainer key={i} graph={graph} />;
        })}
        <div className="flex justify-center w-32 text-neutral-300">
          <Link to={"/dashboard/" + dashboardId + "/addgraph/"}>
            <Button text="+ Add Graph" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashPage;
