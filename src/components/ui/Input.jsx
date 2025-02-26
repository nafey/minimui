const Input = ({ title, placeholder, value, onChange }) => {
  return (
    <div className="flex flex-row items-center  text-sm full-w justify-between">
      <div className="w-24">{title}</div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-56 px-2 py-1.5 border border-neutral-600 rounded-lg bg-transparent focus:outline-none"
      />
    </div>
  );
};

export default Input;
