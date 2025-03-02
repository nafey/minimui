import { useState, useEffect, useRef } from "react";
import { EllipsisVertical } from "lucide-react";

const MenuButton = ({ children }) => {
  const [isVisible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        if (isVisible) {
          setVisible(false);
        }
      }
    };

    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [isVisible]);

  const style = {
    "background-color": "#1a1a1a",
  };

  return (
    <div className="dropdown relative inline-block float-right">
      <button
        className={
          "dropbtn hover:bg-neutral-700 rounded-lg cursor-pointer p-1.5 " +
          (isVisible ? " bg-neutral-700 " : "")
        }
        onClick={(event) => {
          setVisible(!isVisible);
          event.preventDefault();
        }}
      >
        <EllipsisVertical size={16} />
      </button>
      <div
        ref={ref}
        className={
          "dropdown-content absolute z-10 right-0 min-w-48 bg-neutral-700 rounded-lg mt-1 border border-neutral-700  " +
          (isVisible ? "" : "invisible")
        }
        style={style}
      >
        <div className="flex flex-col rounded-lg">{children}</div>
      </div>
    </div>
  );
};

export default MenuButton;
