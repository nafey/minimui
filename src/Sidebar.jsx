// Sidebar.js
// import React from "react";

import CollapseButton from "./CollapseButton";
import { useState } from "react";

const Sidebar = () => {
  const [show, setShow] = useState(true);

  const onClick = () => {
    setShow(!show);
  };

  const open = (
    <div className="w-64 h-full text-left text-white p-4 border-r border-neutral-700 border-1 ">
      <h2 className="flex text-lg justify-between">
        <div className="mr-16">Minimalytics</div>
        <CollapseButton onClick={onClick} />
      </h2>
      <ul className="mt-4">
        <li className="py-2 cursor-pointer">Home</li>
        <li className="py-2 cursor-pointer">About</li>
        <li className="py-2 cursor-pointer">Services</li>
        <li className="py-2 cursor-pointer">Contact</li>
      </ul>
    </div>
  );

  const closed = <CollapseButton onClick={onClick} />;

  if (show) {
    return open;
  } else {
    return closed;
  }
};

export default Sidebar;
