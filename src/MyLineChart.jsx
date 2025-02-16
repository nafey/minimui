// LineChart.js
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

const MyLineChart = ({ count, labels }) => {
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

  ChartJS.register({
    id: "uniqueid5", //typescript crashes without id
    afterDraw: function (chart) {
      if (!chart) return;
      if (!chart["tooltip"]) return;
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

  let data = {
    labels: labels,
    datasets: [
      {
        label: "My First Dataset",
        data: count,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        pointRadius: 0,
      },
    ],
  };

  let options = {
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
      // tooltip: {
      //   titleColor: "white",
      //   bodyColor: "white",
      // },
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
    animation: false,
  };

  let style = {
    height: "200px",
    width: "99%",
    // position: "relative",
  };

  return (
    <>
      <div style={style}>
        <Line className="m-2" data={data} options={options} />
      </div>
    </>
  );
};

export default MyLineChart;
