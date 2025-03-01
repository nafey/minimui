import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="p-32 text-xl">
        404: Not Found.
        <br /> Click here to go to{" "}
        <Link to="/">
          <a className="text-blue-800 underline">home</a>.
        </Link>{" "}
      </div>
    </div>
  );
};

export default NotFound;
