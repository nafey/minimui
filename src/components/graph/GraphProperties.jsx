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

      if (graph && graph.event == "") {
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
    let selectedItem = e.target.value;

    let length = 60;
    let period = "DAILY";

    if (selectedItem === "1HOUR") {
      length = 60;
      period = "MINUTELY";
    } else if (selectedItem === "1DAY") {
      length = 24;
      period = "HOURLY";
    } else if (selectedItem === "2DAY") {
      length = 48;
      period = "HOURLY";
    } else if (selectedItem === "1WEEK") {
      length = 7;
      period = "DAILY";
    } else if (selectedItem === "2WEEK") {
      length = 14;
      period = "DAILY";
    } else if (selectedItem === "1MONTH") {
      length = 30;
      period = "DAILY";
    } else if (selectedItem === "1YEAR") {
      length = 365;
      period = "DAILY";
    } else {
      length = 90;
      period = "DAILY";
    }

    setGraph({
      ...graph,
      period: period,
      length: length,
    });
  };

  const handleSave = () => {
    onSave();
  };

  const getPeriodSelectVal = () => {
    if (!graph) return null;
    let period = graph.period;
    let length = graph.length;

    if (period === "MINUTELY") {
      return "1HOUR";
    } else if (period === "HOURLY") {
      if (length === 24) {
        return "1DAY";
      } else {
        return "2DAY";
      }
    } else if (period === "DAILY") {
      if (length === 7) {
        return "1WEEK";
      } else if (length === 14) {
        return "2WEEK";
      } else if (length === 30) {
        return "1MONTH";
      } else if (length === 90) {
        return "3MONTH";
      } else if (length === 365) {
        return "1YEAR";
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 w-80">
      <div className="text-lg select-none">Graph Properties</div>
      <LabeledInput
        title={"Name"}
        value={graph?.name}
        // value={null}
        onChange={handleNameChange}
      />
      <Select
        title={"Event"}
        value={graph?.event}
        values={eventList}
        onChange={handleEventChange}
      />
      <Select
        title={"Period"}
        value={getPeriodSelectVal()}
        values={[
          ["1HOUR", "Last Hour"],
          ["1DAY", "Last Day"],
          ["2DAY", "Last 2 Days"],
          ["1WEEK", "Last Week"],
          ["2WEEK", "Last 2 Weeks"],
          ["1MONTH", "Last 1 Month"],
          ["3MONTH", "Last 3 Months"],
          ["1YEAR", "Last 1 Year"],
        ]}
        onChange={handlePeriodChange}
      />
      <div className="flex flex-row justify-end gap-4">
        {graph == null ? (
          <></>
        ) : (
          <Button
            text={actionText ? actionText : "Save"}
            outline={true}
            onClick={handleSave}
          />
        )}
      </div>
    </div>
  );
};

export default GraphProperties;
