// Sidebar.js
// import React from "react";

const Sidebar = () => {
  return (
    <div className="w-64 h-full text-left text-white p-4 border-r border-neutral-700 border-1 ">
      <h2 className="text-lg ">Minimalytics</h2>
      <ul className="mt-4">
        <li className="py-2 cursor-pointer">Home</li>
        <li className="py-2 cursor-pointer">About</li>
        <li className="py-2 cursor-pointer">Services</li>
        <li className="py-2 cursor-pointer">Contact</li>
      </ul>
    </div>
  );
};

export default Sidebar;
