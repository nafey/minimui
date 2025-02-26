const Button = ({ text, outline, onClick }) => {
  let style =
    "flex items-center text-sm select-none hover:bg-neutral-800 rounded-lg cursor-pointer px-4 py-1.5 border-neutral-700 ";

  if (outline) {
    style += "border";
  }

  return (
    <div onClick={onClick} className={style}>
      {text}
    </div>
  );
};

export default Button;
