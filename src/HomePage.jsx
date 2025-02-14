import { useEffect, useState } from "react";
import HomePageItem from "./HomePageItem";

const getDashboards = async () => {
  const response = await fetch("/api/dashboards/", {});
  const result = await response.json();

  if (!(result && result.data)) {
    return [];
  }

  return result.data;
};

const HomePage = () => {
  const [dashlist, setDashlist] = useState([]);

  useEffect(() => {
    (async () => {
      setDashlist(await getDashboards());
    })();
  }, [setDashlist]);

  return (
    <div className="flex flex-col gap-8 p-32">
      <div className="text-4xl mb-4">Minimalytics</div>
      <div className="text-xl">Your Dashboards</div>
      <div className="flex flex-wrap gap-8">
        {dashlist.map((dash, i) => {
          return <HomePageItem key={i} dash={dash} />;
        })}
      </div>
    </div>
  );
};

export default HomePage;
