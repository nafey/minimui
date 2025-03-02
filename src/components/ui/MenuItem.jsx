const MenuItem = ({ text, Icon }) => {
  const onClick = (e) => {
    e.preventDefault();
  };
  return (
    <div
      className="flex flex-row items-center gap-4 p-2 pl-4 pr-8 hover:bg-neutral-800  "
      // href="#"
      onClick={onClick}
    >
      {Icon ? <Icon size={18} /> : <></>}
      {/* <Pen size={18} /> */}
      <div className="ml-4">{text}</div>
    </div>
  );
};

export default MenuItem;
