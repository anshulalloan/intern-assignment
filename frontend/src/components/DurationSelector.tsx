import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedDuration } from "../store/stockSlice";
import { RootState } from "../store/store";

const DurationSelector: React.FC = () => {
  const dispatch = useDispatch();
  const selectedStock = useSelector(
    (state: RootState) => state.stocks.selectedStock
  );
  const selectedDuration = useSelector(
    (state: RootState) => state.stocks.selectedDuration
  );

  if (!selectedStock) return null;

  return (
    <div className="flex flex-wrap gap-2 justify-center mt-4">
      {selectedStock.available.map((duration) => (
        <button
          key={duration}
          onClick={() => dispatch(setSelectedDuration(duration))}
          className={`p-2 rounded transition ${
            selectedDuration === duration
              ? "bg-blue-700 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white"
          }`}
        >
          {duration}
        </button>
      ))}
    </div>
  );
};

export default DurationSelector;
