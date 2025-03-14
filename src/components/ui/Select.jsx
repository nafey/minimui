import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Select = ({ title, value, values, onChange }) => {
  return (
    <div className="flex flex-row items-center text-sm full-w justify-between">
      <div className="w-24">{title}</div>

      {value == null ? (
        <Skeleton
          className="w-56 px-2 py-1.5 rounded-lg"
          height={30}
          containerClassName="flex-1"
        />
      ) : (
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
      )}
    </div>
  );
};

export default Select;
