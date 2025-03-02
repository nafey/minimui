import { useState, useRef, useEffect } from "react";
// import LabeledInput from "./LabeledInput";
import Input from "./Input";

const EditableLabel = ({ text }) => {
  const [isEditing, setEditing] = useState(false);
  const ref = useRef(null);
  const inputRef = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setEditing(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const onClick = () => {
    setEditing(true);
  };

  const onChange = (t) => {
    console.log(t);
  };

  return (
    <div ref={ref}>
      {isEditing ? (
        // <LabeledInput value={text} onChange={() => {}} />
        <Input passref={inputRef} value={text} onChange={onChange} />
      ) : (
        <div className="w-56 px-2 py-1.5 cursor-text" onClick={onClick}>
          {text}
        </div>
      )}
    </div>
  );
};

export default EditableLabel;
