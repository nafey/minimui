import { useState, useRef, useEffect } from "react";
import LabeledInput from "./LabeledInput";

const EditableLabel = ({ text }) => {
  const [isEditing, setEditing] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setEditing(false);
      }
    };

    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const onClick = () => {
    setEditing(true);
  };

  return (
    <div ref={ref}>
      {isEditing ? (
        <LabeledInput value={text} onChange={() => {}} />
      ) : (
        <div onClick={onClick}>{text}</div>
      )}
    </div>
  );
};

export default EditableLabel;
