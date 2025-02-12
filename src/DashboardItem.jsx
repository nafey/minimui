/* eslint-disable react/prop-types */
import { ChartColumn } from "lucide-react";
const DashboardItem = ({ item, isSelected }) => {
  let className = "py-2 flex flex-row gap-4 cursor-pointer rounded-lg p-4 ";
  if (isSelected) {
    className += " bg-[#2D2D2D] ";
  } else {
    className += " hover:bg-[#2D2D2D]/50";
  }

  return (
    <li className={className}>
      <ChartColumn color="#919191" size={18} />
      <div className="text-sm text-neutral-100">{item.name}</div>
    </li>
  );
};

export default DashboardItem;
