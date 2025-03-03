import { useState, useEffect } from "react";
const Input = ({ placeholder, value, onChange, onKeyPress, passref }) => {
  const [text, setText] = useState(value);

  useEffect(() => {
    setText(value);
  }, [value]);

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={text}
      ref={passref ? passref : null}
      onChange={(e) => setText(e.target.value)}
      onBlur={onChange ? () => onChange(text) : () => {}}
      onKeyPress={onKeyPress}
      className="w-56 px-2 py-1.5 border border-neutral-600 rounded-lg bg-transparent focus:outline-none"
    />
  );
};

export default Input;
