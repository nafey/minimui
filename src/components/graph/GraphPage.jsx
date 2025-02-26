import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import GraphContainer from "./GraphContainer";
import BackButton from "../ui/BackButton";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Select from "../ui/Select";

const GraphPage = () => {
  const { dashboardId, graphId } = useParams();
  const [graph, setGraph] = useState({ name: "", event: "", period: "" });
  const [graphEdit, setGraphEdit] = useState({
    name: "",
    event: "",
    period: "",
  });

  // Cancel will set to this value
  const [graphCancel, setGraphCancel] = useState({
    name: "",
    event: "",
    period: "",
  });

  const [eventList, setEventList] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/graphs/" + graphId);
      const result = await response.json();
      const data = result.data;
      setGraph(data);
      setGraphEdit(data);
      setGraphCancel(data);
    })();

    (async () => {
      const response = await fetch("/api/events/");
      const result = await response.json();
      const data = result.data;

      let values = data.map((item) => [item.event, item.event]);
      setEventList(values);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dashboardId, graphId]);

  const handleNameChange = (e) => {
    setGraphEdit({
      ...graph,
      name: e.target.value,
    });
  };

  const handleEventChange = (e) => {
    setGraph({
      ...graph,
      event: e.target.value,
    });
  };

  const handlePeriodChange = (e) => {
    setGraph({
      ...graph,
      period: e.target.value,
    });
  };

  const saveChanges = () => {
    let consolidateGraph = {
      name: graphEdit.name,
      event: graph.event,
      period: graph.period,
    };

    setGraph(consolidateGraph);
    setGraphEdit(consolidateGraph);
    setGraphCancel(consolidateGraph);

    fetch("/api/graphs/" + graphId, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(consolidateGraph),
    });
  };

  const cancel = () => {
    console.log(graphCancel);
    setGraph(graphCancel);
    setGraphEdit(graphCancel);
  };

  const hasChanged = () => {
    return (
      graph.name != graphEdit.name ||
      graph.event != graphEdit.event ||
      graph.period != graphEdit.period
    );
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
          <div className="flex flex-row justify-between">
            <div className="text-lg select-none">Graph Properties</div>
          </div>
          <Input
            title={"Name"}
            value={graphEdit.name}
            onChange={handleNameChange}
          />
          <Select
            title={"Event"}
            value={graph.event}
            values={eventList}
            onChange={handleEventChange}
          />
          <Select
            title={"Period"}
            value={graph.period}
            values={[
              ["DAILY", "Day"],
              ["HOURLY", "Hour"],
              ["MINUTELY", "Minute"],
            ]}
            onChange={handlePeriodChange}
          />
          {hasChanged() ? (
            <div className="flex flex-row justify-end gap-4">
              <Button text="Cancel" outline={false} onClick={cancel} />
              <Button text="Save" outline={true} onClick={saveChanges} />
            </div>
          ) : (
            <></>
          )}
        </div>
        <GraphContainer graph={graph} />
      </div>
    </div>
  );
};

export default GraphPage;
