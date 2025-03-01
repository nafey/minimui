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
        <EllipsisVertical size={18} />
      </button>
      <div
        ref={ref}
        className={
          "dropdown-content absolute z-10 right-0 min-w-32 bg-neutral-700 rounded-lg mt-1 " +
          (isVisible ? "" : "invisible")
        }
      >
        <div className="flex flex-col">{children}</div>
      </div>
    </div>
  );
};

export default MenuButton;
