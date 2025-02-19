// import { useContext } from "react";
import { ChartColumn } from "lucide-react";
import { Link } from "react-router";
// import { MyContext } from "./MyContext";
//
const DashboardItem = ({ item, isSelected }) => {
  // const { setDashId } = useContext(MyContext);

  let className =
    "py-2 flex flex-row gap-4 cursor-pointer rounded-lg p-4 select-none";
  if (isSelected) {
    className += " bg-[#2D2D2D] ";
  } else {
    className += " hover:bg-[#2D2D2D]/50";
  }

  let path = "/dashboard/" + item.id;
  return (
    <Link to={path}>
      <li className={className} onClick={() => {}}>
        <ChartColumn color="#919191" size={18} />
        <div className="text-sm text-neutral-100">{item.name}</div>
      </li>
    </Link>
  );
};

export default DashboardItem;
