/* eslint-disable @typescript-eslint/no-explicit-any */
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";

// Register the necessary components
ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
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

const LineChart: React.FC<LineChartProps> = ({ dataNuevos, dataRenovados }) => {
  const [labels, setLabels] = useState<string[]>([]);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    setLabels(compararTamanos(dataNuevos, dataRenovados));
    const handleResize = () => {
      const calculatedHeight = window.innerHeight - 370;
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
        pointRadius: 5,
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
      },
      {
        label: "Renovados",
        data: dataRenovados.map((point) => point.value),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 2,
        pointRadius: 5,
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
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: false,
          text: "Fecha",
        },
      },
      y: {
        title: {
          display: true,
          text: "Cantidad",
        },
      },
    },
  };

  return (
    <div style={{ height, maxHeight: height  }}>
      <Line
        // height={"100%"}
        data={chartData}
        options={options}
      />
    </div>
  );
};

export default LineChart;
