import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";

export default function BackButton({ onClick, left, text }) {
  const Icon = () =>
    left ? (
      <ChevronLeft color="white" size={18} />
    ) : (
      <ChevronRight color="white" size={18} />
    );

  return (
    <div
      className="flex flex-row items-center gap-2 hover:bg-neutral-800 rounded-lg cursor-pointer p-1.5"
      onClick={onClick}
    >
      <div className="flex items-center justify-center ">
        <Icon />
      </div>
      {text ? <div className="text-sm">{text}</div> : <></>}
    </div>
  );
}
