import { ChartColumn } from "lucide-react";
import { Link } from "react-router";
import MenuButton from "../ui/MenuButton";
import MenuItem from "../ui/MenuItem";
import { Trash2, Link as LinkIcon, CaseSensitive } from "lucide-react";

const DashboardItem = ({ item, isSelected, renameAction }) => {
  // const { setDashId } = useContext(MyContext);

  let className =
    "py-2 flex flex-row gap-4 cursor-pointer rounded-lg p-2 px-4 select-none";
  if (isSelected) {
    className += " bg-[#2D2D2D] ";
  } else {
    className += " hover:bg-[#2D2D2D]/50";
  }

  let path = "/dashboard/" + item.id;
  return (
    <Link to={path}>
      <li className={className} onClick={() => {}}>
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-row gap-4 items-center">
            <ChartColumn color="#919191" size={18} />
            <div className="text-sm text-neutral-100 my-1 ">{item.name}</div>
          </div>
          {isSelected && (
            <div className="flex">
              <MenuButton>
                <MenuItem
                  Icon={CaseSensitive}
                  text="Rename"
                  action={() => renameAction()}
                />
                {/* <MenuItem Icon={RotateCw} text="Refresh" /> */}
                <MenuItem Icon={LinkIcon} text="Copy Link" />
                <MenuItem Icon={Trash2} text="Delete" />
              </MenuButton>
            </div>
          )}
        </div>
      </li>
    </Link>
  );
};

export default DashboardItem;
