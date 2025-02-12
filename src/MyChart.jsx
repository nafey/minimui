// LineChart.js
import { useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

let data = [];

ChartJS.register({
  id: "uniqueid5", //typescript crashes without id
  afterDraw: function (chart) {
    if (chart.tooltip._active && chart.tooltip._active.length) {
      const activePoint = chart.tooltip._active[0];
      const ctx = chart.ctx;
      const x = activePoint.element.x;
      const topY = chart.scales.y.top;
      const bottomY = chart.scales.y.bottom;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x, topY);
      ctx.lineTo(x, bottomY);
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#535353";
      ctx.stroke();
      ctx.restore();
    }
  },
});

try {
  const response = await fetch("/api/stat/daily/", {
    method: "POST",
    body: JSON.stringify({
      event: "DUMMY_EVENT",
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const result = await response.json();

  data = result.data;

  const counts = data.map((item) => item.count);
  data = counts;
  data.reverse();
} catch (err) {
  console.log(err);
  // setError(err.message);
} finally {
  // setLoading(false);
}

const labels = [];
for (let i = 0; i < 60; i++) {
  labels.push(i);
}

console.log(labels);

const MyChart = () => {
  useEffect(() => {
    const fetchData = async () => {};

    fetchData();
  }, []);

  const d = {
    labels: labels,
    datasets: [
      {
        label: "My First Dataset",
        data: data,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    interaction: {
      mode: "index",
      intersect: false,
    },
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top",
        labels: {
          color: "white",
        },
      },
      // title: {
      //   display: true,
      //   text: "Dark Themed Line Chart Example",
      //   color: "white", // Title text color
      // },
      tooltip: {
        titleColor: "white",
        bodyColor: "white",
        // position: "vertical", // Position the tooltip nearest to the point
        // callbacks: {
        //   label: function (context) {
        //     return `${context.dataset.label}: ${context.raw}`; // Customize tooltip label
        //   },
        // },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 12,
          color: "white",
        },
      },
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 5,
          color: "white",
        },
      },
    },
    elements: {
      point: {
        backgroundColor: "rgb(75, 192, 192)",
      },
    },
    backgroundColor: "black",
  };

  let style = {
    height: "200px",
    width: "600px",
  };

  return (
    <>
      <div style={style}>
        <Line data={d} options={options} />
      </div>
    </>
  );
};

export default MyChart;
