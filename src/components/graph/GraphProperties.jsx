import { useState, useEffect } from "react";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Button from "../ui/Button";

const GraphProperties = ({ initGraph, onValueChange, onSave, onCancel }) => {
  const [eventList, setEventList] = useState([]);

  const [graph, setGraph] = useState({ ...initGraph });
  const [savedGraph, setSavedGraph] = useState({ ...initGraph });

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/events/");
      const result = await response.json();
      const data = result.data;

      let values = data.map((item) => [item.event, item.event]);
      setEventList(values);
    })();
  }, []);

  useEffect(() => {
    setGraph({ ...initGraph });
    setSavedGraph({ ...initGraph });
  }, [initGraph]);

  const handleNameChange = (e) => {
    setGraph({
      ...graph,
      name: e.target.value,
    });

    onValueChange({ ...graph });
  };

  const handleEventChange = (e) => {
    setGraph({
      ...graph,
      event: e.target.value,
    });

    onValueChange({ ...graph });
  };

  const handlePeriodChange = (e) => {
    setGraph({
      ...graph,
      period: e.target.value,
    });

    onValueChange({ ...graph });
  };

  const handleCancel = () => {
    setGraph(savedGraph);
    onCancel(savedGraph);
  };

  const handleSave = () => {
    onSave(graph);
    setSavedGraph(graph);
  };

  const hasChanged = () => {
    return (
      graph.name != savedGraph.name ||
      graph.event != savedGraph.event ||
      graph.period != savedGraph.period
    );
  };

  return (
    <div className="flex flex-col gap-4 w-80">
      <div className="text-lg select-none">Graph Properties</div>
      <Input title={"Name"} value={graph.name} onChange={handleNameChange} />
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
          <Button text="Cancel" outline={false} onClick={handleCancel} />
          <Button text="Save" outline={true} onClick={handleSave} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default GraphProperties;
