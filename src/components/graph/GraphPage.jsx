import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import GraphContainer from "./GraphContainer";
import GraphProperties from "./GraphProperties";
import BackButton from "../ui/BackButton";

const GraphPage = () => {
  const { dashboardId, graphId } = useParams();
  const [graph, setGraph] = useState(null);

  let navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/graphs/" + graphId);
      const result = await response.json();
      const data = result.data;
      setGraph(data);
    })();
  }, [dashboardId, graphId]);

  const onSave = async () => {
    await fetch("/api/graphs/" + graphId, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(graph),
    });

    navigate("/dashboard/" + dashboardId);
  };

  return (
    <SkeletonTheme
      containerClassName="flex-1"
      baseColor="#202020"
      highlightColor="#444"
      enableAnimation={true}
      duration={1.5}
    >
      <div className="flex flex-col gap-4 py-12 px-16">
        <div className="flex flex-row gap-4 items-center mt-4 mb-8">
          <BackButton
            left={true}
            text={"Go Back to Dashboard"}
            onClick={() => {
              navigate("/dashboard/" + dashboardId);
            }}
          />
        </div>
        <div className="flex flex-row gap-4">
          <GraphProperties
            graph={graph}
            setGraph={setGraph}
            onSave={onSave}
            actionText="Done"
          />
          <GraphContainer graph={graph} disableMenu={true} />
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default GraphPage;
