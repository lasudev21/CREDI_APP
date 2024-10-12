import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DataPoint {
  label: string;
  value1: number;
  value2: number;
}

interface LineChartProps {
  data: DataPoint[];
  titulos: string[];
}

const BarChart: React.FC<LineChartProps> = ({ data, titulos }) => {
  const [labels, setLabels] = useState<string[]>([]);
  // const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    setLabels(data.map((point) => point.label));
    // const handleResize = () => {
    //   const calculatedHeight = window.innerHeight - 450;
    //   setHeight(calculatedHeight);
    // };

    // handleResize();

    // window.addEventListener("resize", handleResize);

    // return () => {
    //   window.removeEventListener("resize", handleResize);
    // };
  }, [data]);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: titulos[0],
        data: data.map((point) => point.value1),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        borderRadius: Number.MAX_VALUE,
        borderSkipped: false,
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
      },
      {
        label: titulos[1],
        data: data.map((point) => point.value2),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 2,
        borderRadius: Number.MAX_VALUE,
        borderSkipped: false,
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Gráfica anual",
      },
    },
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Bar
        data={chartData}
        options={options}
      />
    </div>
  );
};

export default BarChart;
