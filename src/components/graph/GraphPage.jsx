import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import GraphContainer from "./GraphContainer";
import BackButton from "../ui/BackButton";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Select from "../ui/Select";

const GraphPage = () => {
  const { dashboardId, graphId } = useParams();
  const [graphData, setGraphData] = useState(null);
  const [eventList, setEventList] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/graphs/" + graphId);
      const result = await response.json();
      const data = result.data;
      setGraphData(data);
    })();

    (async () => {
      const response = await fetch("/api/events/");
      const result = await response.json();
      const data = result.data;

      let values = data.map((item) => [item.event, item.event]);
      setEventList(values);
    })();
  }, [graphId]);

  let graphName = "";
  if (graphData?.name) {
    graphName = graphData.name;
  }

  let graphEvent = "";
  if (graphData?.event) {
    graphEvent = graphData.event;
  }

  let graphPeriod = "";
  if (graphData?.period) {
    graphPeriod = graphData.period;
  }

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
      <div className="flex flex-row justify-between">
        <div className="text-lg select-none">Edit Dashboard</div>
        {/* <div>Save</div> */}
      </div>
      <div className="flex flex-row gap-4">
        <div className="flex flex-col gap-4 w-80">
          <Input title={"Name"} value={graphName} />
          <Select title={"Event"} value={graphEvent} values={eventList} />
          <Select
            title={"Period"}
            value={graphPeriod}
            values={[
              ["DAILY", "Day"],
              ["HOURLY", "Hour"],
              ["MINUTELY", "Minute"],
            ]}
          />
          <div className="flex flex-row justify-end gap-4">
            <Button text="Cancel" outline={false} />
            <Button text="Save" outline={true} />
          </div>
        </div>
        <GraphContainer item={graphData} />
      </div>
    </div>
  );
};

export default GraphPage;
