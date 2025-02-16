import BackButton from "./BackButton";

const GraphPage = () => {
  return (
    <div className="flex flex-col gap-4 py-24 px-32">
      <div className="flex flex-row gap-4 items-center">
        <BackButton left={true} />
        {/* <div>Go Back to Dashboard</div> */}
      </div>
      <div className=""> Dash Edit </div>
    </div>
  );
};

export default GraphPage;
