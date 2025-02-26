const Select = ({ title, value, values, onChange }) => {
  return (
    <div className="flex flex-row items-center text-sm full-w justify-between">
      <div className="w-24">{title}</div>
      <select
        className="w-56 px-2 py-1.5 border border-neutral-600 rounded-lg bg-transparent focus:outline-none"
        name="cars"
        id="cars"
        value={value}
        onChange={onChange}
      >
        {values?.map((item, i) => (
          <option key={i} value={item[0]}>
            {item[1]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
