import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import GraphContainer from "./GraphContainer";
import GraphProperties from "./GraphProperties";
import BackButton from "../ui/BackButton";

const GraphPage = () => {
  const { dashboardId, graphId } = useParams();
  const [graph, setGraph] = useState({ name: "", event: "", period: "" });

  let navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/graphs/" + graphId);
      const result = await response.json();
      const data = result.data;
      setGraph(data);
    })();
  }, [dashboardId, graphId]);

  const onSave = (consolidateGraph) => {
    setGraph(consolidateGraph);

    fetch("/api/graphs/" + graphId, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(consolidateGraph),
    });
  };

  const onCancel = (g) => {
    setGraph(g);
  };

  const onValueChange = (graphChanged) => {
    if (!graphChanged) return;

    if (graphChanged.event != graph.event) {
      setGraph({ ...graph, event: graphChanged.event });
    }

    if (graphChanged.period != graph.period) {
      setGraph({ ...graph, period: graphChanged.period });
    }
  };

  return (
    <div className="flex flex-col gap-4 py-12 px-16">
      <div className="flex flex-row gap-4 items-center mb-8">
        <BackButton
          left={true}
          text={"Go Back to Dashboard"}
          onClick={() => {
            navigate("/dashboard/" + dashboardId);
          }}
        />
      </div>
      <div className="flex flex-row gap-4">
        <div className="flex flex-col gap-4 w-80">
          <GraphProperties
            initGraph={graph}
            onValueChange={onValueChange}
            onSave={onSave}
            onCancel={onCancel}
          />
        </div>
        <GraphContainer graph={graph} />
      </div>
    </div>
  );
};

export default GraphPage;
