import BackButton from "./../ui/BackButton";
import DashboardItem from "./DashboardItem";
import { useState } from "react";
import { useParams, Link } from "react-router";

const Sidebar = ({ dashlist, renameAction, deleteAction }) => {
  let { dashboardId } = useParams();
  const [show, setShow] = useState(true);

  const onClick = () => {
    setShow(!show);
  };

  const open = (
    <div className="w-64 h-full text-left text-white p-4 border-r border-neutral-700 border-1 ">
      <h2 className="flex text-lg justify-between">
        <Link to="/">
          <div className="mr-16 select-none">Minimalytics</div>
        </Link>
        <BackButton onClick={onClick} left={show} text={""} />
      </h2>
      <ul className="flex flex-col gap-2 mt-6">
        {dashlist &&
          dashlist.map((item, i) => {
            return (
              <DashboardItem
                item={item}
                isSelected={item.id == dashboardId}
                key={i}
                renameAction={renameAction}
                deleteAction={deleteAction}
              />
            );
          })}
      </ul>
    </div>
  );

  const closed = (
    <div className="p-4">
      <BackButton onClick={onClick} left={show} />
    </div>
  );

  if (show) {
    return open;
  } else {
    return closed;
  }
};

export default Sidebar;
