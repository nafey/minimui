import { useState, useEffect, useRef } from "react";

const MenuButton = () => {
  let [isVisible, setVisible] = useState(false);

  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      if (isVisible) {
        setVisible(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [isVisible]);

  return (
    <div className="dropdown relative inline-block float-right">
      <button
        className="dropbtn bg-red-800"
        onClick={() => {
          setVisible(!isVisible);
        }}
      >
        Menu
      </button>
      <div
        ref={ref}
        className={
          "dropdown-content absolute z-1 right-0 min-w-32 bg-black " +
          (isVisible ? "" : "invisible")
        }
      >
        <a className="block p-2" href="#">
          Link 1
        </a>
        <a className="block p-2" href="#">
          Link 2
        </a>
        <a className="block p-2" href="#">
          Link 3
        </a>
      </div>
    </div>
  );
};

export default MenuButton;
