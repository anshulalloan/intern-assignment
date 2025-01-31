import React, { useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { fetchStockData } from "../store/stockSlice";
import { AppDispatch, RootState } from "../store/store";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const StockGraph: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const chartRef = useRef(null);

  const { selectedStock, selectedDuration, graphData, loading } = useSelector(
    (state: RootState) => state.stocks
  );

  useEffect(() => {
    if (selectedStock && selectedDuration) {
      dispatch(
        fetchStockData({ id: selectedStock.id, duration: selectedDuration })
      );
    }
  }, [selectedStock, selectedDuration, dispatch]);

  if (!selectedStock || !selectedDuration) return null;

  const data = {
    labels: graphData.data,
    datasets: [
      {
        label: `${selectedStock.name} (${selectedDuration})`,
        data: graphData.values,
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        pointRadius: window.innerWidth < 768 ? 2 : 3,
        fill: false,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
        labels: {
          boxWidth: window.innerWidth < 768 ? 10 : 40,
          font: {
            size: window.innerWidth < 768 ? 12 : 14,
          },
        },
      },
      tooltip: {
        enabled: true,
        mode: "index" as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 45,
          font: {
            size: window.innerWidth < 768 ? 10 : 12,
          },
          maxTicksLimit: window.innerWidth < 768 ? 6 : 12,
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          font: {
            size: window.innerWidth < 768 ? 10 : 12,
          },
        },
      },
    },
  };

  return (
    <div className="w-full px-2 md:px-4">
      {loading ? (
        <div className="flex justify-center items-center w-full h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500" />
        </div>
      ) : (
        <div className="w-full bg-white shadow rounded-lg">
          <div className="h-[300px] md:h-[400px] lg:h-[500px] p-2 md:p-4">
            <Line data={data} options={options} ref={chartRef} />
          </div>
        </div>
      )}
    </div>
  );
};

export default StockGraph;
