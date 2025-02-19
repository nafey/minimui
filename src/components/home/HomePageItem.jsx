import { Link } from "react-router";

const HomePageItem = ({ dash }) => {
  let path = "/dashboard/" + dash.id;

  return (
    <Link to={path}>
      <div className="w-80 border border-neutral-700 rounded-lg p-4 select-none cursor-pointer hover:bg-neutral-800 ">
        <div>{dash.name}</div>
      </div>
    </Link>
  );
};

export default HomePageItem;
