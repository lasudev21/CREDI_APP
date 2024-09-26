/* eslint-disable @typescript-eslint/no-explicit-any */
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

// Register the necessary components
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
  value: number;
}

interface LineChartProps {
  dataNuevos: DataPoint[];
  dataRenovados: DataPoint[];
}

const BarChart: React.FC<LineChartProps> = ({ dataNuevos, dataRenovados }) => {
  const [labels, setLabels] = useState<string[]>([]);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    setLabels(compararTamanos(dataNuevos, dataRenovados));
    const handleResize = () => {
      const calculatedHeight = window.innerHeight - 350;
      setHeight(calculatedHeight);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dataNuevos, dataRenovados]);

  function compararTamanos(array1: any[], array2: any[]): string[] {
    if (array1.length > array2.length) {
      return array1.map((point) => point.label);
    } else if (array1.length < array2.length) {
      return array2.map((point) => point.label);
    } else {
      return array1.map((point) => point.label);
    }
  }

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Nuevos",
        data: dataNuevos.map((point) => point.value),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        borderRadius: Number.MAX_VALUE,
        borderSkipped: false,
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
      },
      {
        label: "Renovados",
        data: dataRenovados.map((point) => point.value),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 2,
        borderRadius: Number.MAX_VALUE,
        borderSkipped: false,
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };
  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  return (
    <div style={{ height }}>
      <Bar
        data={chartData}
        options={options}
      />
    </div>
  );
};

export default BarChart;
