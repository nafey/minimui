import { useState, useEffect } from "react";
import LabeledInput from "../ui/LabeledInput";
import Select from "../ui/Select";
import Button from "../ui/Button";

const GraphProperties = ({ graph, setGraph, onSave, actionText }) => {
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/events/");
      const result = await response.json();
      const data = result.data;

      let values = data.map((item) => [item.event, item.event]);
      setEventList(values);

      if (graph.event == "") {
        if (!data || !data[0] || !data[0].event) return;
        let e = data[0].event;

        setGraph({
          ...graph,
          event: e,
        });
      }
    })();
  }, [graph, setGraph]);

  const handleNameChange = (text) => {
    setGraph({
      ...graph,
      name: text,
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

  const handleSave = () => {
    onSave();
  };

  return (
    <div className="flex flex-col gap-4 w-80">
      <div className="text-lg select-none">Graph Properties</div>
      <LabeledInput
        title={"Name"}
        value={graph.name}
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
      <div className="flex flex-row justify-end gap-4">
        <Button
          text={actionText ? actionText : "Save"}
          outline={true}
          onClick={handleSave}
        />
      </div>
    </div>
  );
};

export default GraphProperties;
