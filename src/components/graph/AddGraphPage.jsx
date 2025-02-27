import { useState } from "react";
import { useParams } from "react-router";
import BackButton from "../ui/BackButton";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import GraphContainer from "./GraphContainer";
import GraphProperties from "./GraphProperties";
import Input2 from "../ui/Input2";

const AddGraphPage = () => {
  const { dashboardId } = useParams();
  const [graph, setGraph] = useState({
    name: "New Graph",
    event: "",
    period: "DAILY",
  });

  useEffect(() => {}, [dashboardId]);

  let navigate = useNavigate();

  const onValueChange = (graphChanged) => {
    if (!graphChanged) return;

    if (graphChanged.event != graph.event) {
      setGraph({ ...graph, event: graphChanged.event });
    }

    if (graphChanged.period != graph.period) {
      setGraph({ ...graph, period: graphChanged.period });
    }
  };

  const onSave = () => {};

  const onCancel = () => {};

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
      <Input2 title="Hello" value={"Hello"} />
      <div className="flex flex-row gap-4">
        <GraphProperties
          graph={graph}
          setGraph={setGraph}
          onValueChange={onValueChange}
          onSave={onSave}
          onCancel={onCancel}
        />
        <GraphContainer graph={graph} />
      </div>
    </div>
  );
};

export default AddGraphPage;
