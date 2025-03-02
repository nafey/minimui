import Input from "./Input";

const LabeledInput = ({ title, placeholder, value, onChange }) => {
  return (
    <div className="flex flex-row items-center  text-sm full-w justify-between">
      <div className="w-24">{title}</div>
      <Input value={value} placeholder={placeholder} onChange={onChange} />
    </div>
  );
};

export default LabeledInput;
