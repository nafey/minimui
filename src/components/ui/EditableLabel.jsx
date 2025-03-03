import { useRef, useEffect } from "react";
import Input from "./Input";

const EditableLabel = ({ isEditing, setEditing, text, onChange }) => {
  const ref = useRef(null);
  const inputRef = useRef(null);

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
  }, [setEditing]);

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const onClick = () => {
    setEditing(true);
  };

  const handleChange = (t) => {
    onChange(t);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      const t = inputRef.current.value;

      onChange(t);
      setEditing(false);
    }
  };

  return (
    <div ref={ref}>
      {isEditing ? (
        // <LabeledInput value={text} onChange={() => {}} />
        <Input
          passref={inputRef}
          value={text}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
      ) : (
        <div className="w-56 px-2 py-1.5 cursor-text" onClick={onClick}>
          {text}
        </div>
      )}
    </div>
  );
};

export default EditableLabel;
