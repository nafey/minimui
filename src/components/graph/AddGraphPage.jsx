import { useState } from "react";
import { useParams } from "react-router";
import BackButton from "../ui/BackButton";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import GraphContainer from "./GraphContainer";
import GraphProperties from "./GraphProperties";

const AddGraphPage = () => {
  const { dashboardId } = useParams();
  const [graph, setGraph] = useState({
    name: "New Graph",
    event: "",
    period: "DAILY",
  });

  useEffect(() => {}, [dashboardId]);

  let navigate = useNavigate();

  const onSave = async () => {
    await fetch("/api/graphs/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...graph, dashboardId: parseInt(dashboardId) }),
    });

    navigate("/dashboard/" + dashboardId);
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
        <GraphProperties
          graph={graph}
          setGraph={setGraph}
          onSave={onSave}
          actionText="Save"
        />
        <GraphContainer graph={graph} />
      </div>
    </div>
  );
};

export default AddGraphPage;
