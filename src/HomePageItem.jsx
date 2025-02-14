const HomePageItem = ({ dash }) => {
  return (
    <div className="w-80 border border-neutral-700 rounded-lg p-4 select-none cursor-pointer hover:bg-neutral-800 ">
      <div>{dash.name}</div>
    </div>
  );
};

export default HomePageItem;
