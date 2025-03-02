const Input = ({ text, setText, placeholder, onChange }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={text}
      onChange={(e) => setText(e.target.value)}
      onBlur={() => onChange(text)}
      className="w-56 px-2 py-1.5 border border-neutral-600 rounded-lg bg-transparent focus:outline-none"
    />
  );
};

export default Input;
