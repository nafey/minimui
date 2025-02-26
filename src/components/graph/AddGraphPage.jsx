import { useState } from "react";
import { useParams } from "react-router";
import BackButton from "../ui/BackButton";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import GraphContainer from "./GraphContainer";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Button from "../ui/Button";

const AddGraphPage = () => {
  const { dashboardId } = useParams();
  const [eventList, setEventList] = useState([]);
  const [graph, setGraph] = useState({
    name: "New Graph",
    event: "",
    period: "DAILY",
  });

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/events/");
      const result = await response.json();
      const data = result.data;

      let values = data.map((item) => [item.event, item.event]);
      setEventList(values);
      console.log(data);
      if (data.length > 0) {
        setGraph({
          ...graph,
          event: data[0].event,
        });
      }
    })();
  }, [dashboardId]);

  let navigate = useNavigate();

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
          <div className="text-lg select-none">Graph Properties</div>
          <Input
            title={"Name"}
            value={graph.name}
            // onChange={handleNameChange}
          />
          <Select
            title={"Event"}
            value={graph.event}
            values={eventList}
            // onChange={handleEventChange}
          />
          <Select
            title={"Period"}
            value={graph.period}
            values={[
              ["DAILY", "Day"],
              ["HOURLY", "Hour"],
              ["MINUTELY", "Minute"],
            ]}
            // onChange={handlePeriodChange}
          />
          <div className="flex flex-row justify-end gap-4">
            <Button text="Cancel" outline={false} />
            <Button text="Save" outline={true} />
          </div>
        </div>
        <GraphContainer graph={graph} />
      </div>
    </div>
  );
};

export default AddGraphPage;
