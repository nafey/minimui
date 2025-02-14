import CollapseButton from "./CollapseButton";
import DashboardItem from "./DashboardItem";
import { useState, useEffect, useContext } from "react";
import { MyContext } from "./MyContext";

const getDashboards = async () => {
  const response = await fetch("/api/dashboards/", {});
  const result = await response.json();

  if (!(result && result.data)) {
    return [];
  }

  return result.data;
};

const Sidebar = () => {
  const [show, setShow] = useState(true);
  const [dashlist, setDashlist] = useState([]);
  const { dashId, setDashId } = useContext(MyContext);

  const onClick = () => {
    setShow(!show);
  };

  useEffect(() => {
    (async () => {
      let data = await getDashboards();
      console.log(data);
      setDashlist(data);

      if (!dashId) {
        let selectedDash = localStorage.getItem("selectedDash");
        if (!selectedDash && data.length > 0) {
          localStorage.setItem("selectedDash", data[0].id);
          selectedDash = data[0].id;
        }

        setDashId(selectedDash);
      }
    })();
  }, [dashId, setDashId]);

  const open = (
    <div className="w-64 h-full text-left text-white p-4 border-r border-neutral-700 border-1 ">
      <h2 className="flex text-lg justify-between">
        <div className="mr-16 select-none">Minimalytics</div>
        <CollapseButton onClick={onClick} left={show} />
      </h2>
      <ul className="flex flex-col gap-2 mt-6">
        {dashlist &&
          dashlist.map((item, i) => {
            return (
              <DashboardItem
                item={item}
                isSelected={item.id == dashId}
                key={i}
              />
            );
          })}
      </ul>
    </div>
  );

  const closed = (
    <div className="p-4">
      <CollapseButton onClick={onClick} left={show} />
    </div>
  );

  if (show) {
    return open;
  } else {
    return closed;
  }
};

export default Sidebar;
