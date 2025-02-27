import { useState, useEffect } from "react";

const Input2 = ({ title, placeholder, value, onChange }) => {
  const [text, setText] = useState(value);

  useEffect(() => {
    setText(value);
  }, [value]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onChange(text);
      // Send Axios request here
    }, 800);

    return () => clearTimeout(delayDebounceFn);
  }, [text]);

  return (
    <div className="flex flex-row items-center  text-sm full-w justify-between">
      <div className="w-24">{title}</div>
      <input
        type="text"
        placeholder={placeholder}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={() => onChange(text)}
        className="w-56 px-2 py-1.5 border border-neutral-600 rounded-lg bg-transparent focus:outline-none"
      />
    </div>
  );
};

export default Input2;
