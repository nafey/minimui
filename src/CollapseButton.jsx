/* eslint-disable react/prop-types */
import { ChevronLeft } from "lucide-react";

export default function CollapseButton({ onClick }) {
  return (
    <div className="flex justify-start" onClick={onClick}>
      <div className="flex items-center justify-center w-8 h-8 hover:bg-neutral-800 rounded-lg cursor-pointer">
        <ChevronLeft color="white" size={18} />
      </div>
    </div>
  );
}
