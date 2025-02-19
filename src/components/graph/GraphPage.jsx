import { useEffect, useState } from "react";
import { useParams } from "react-router";
import GraphContainer from "./GraphContainer";
import BackButton from "../ui/BackButton";
import Button from "../ui/Button";

const GraphPage = () => {
  const { graphId } = useParams();
  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/graphs/" + graphId, {});
      const result = await response.json();
      const data = result.data;
      setGraphData(data);
      return data;
    })();
  }, [graphId]);

  let graphName = "";

  if (graphData?.name) {
    graphName = graphData.name;
  }

  console.log(graphData);

  return (
    <div className="flex flex-col gap-4 py-12 px-32">
      <div className="flex flex-row gap-4 items-center mb-8">
        <BackButton left={true} text={"Go Back to Dashboard"} />
      </div>
      <div className="flex flex-row justify-between">
        <div className="text-lg select-none">Edit Dashboard</div>
        {/* <div>Save</div> */}
        <div className="flex flex-row gap-4">
          <Button text="Cancel" outline={false} />
          <Button text="Save" outline={true} />
        </div>
      </div>
      <GraphContainer item={graphData} />
      <div className="flex flex-row items-center gap-4 text-sm">
        <div>Name</div>
        <input
          type="text"
          placeholder="Enter your text"
          value={graphName}
          className="px-4 py-2 border border-neutral-600 rounded-lg bg-transparent focus:outline-none"
        />
      </div>
    </div>
  );
};

export default GraphPage;
