/* eslint-disable react/prop-types */
import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";

export default function CollapseButton({ onClick, left }) {
  return (
    <div className="flex justify-start" onClick={onClick}>
      <div className="flex items-center justify-center w-8 h-8 hover:bg-neutral-800 rounded-lg cursor-pointer">
        {left ? (
          <ChevronLeft color="white" size={18} />
        ) : (
          <ChevronRight color="white" size={18} />
        )}
      </div>
    </div>
  );
}
