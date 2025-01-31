import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStocks, setSelectedStock } from "../store/stockSlice";
import { AppDispatch, RootState } from "../store/store";

const StockDropdown: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const stocks = useSelector((state: RootState) => state.stocks.stocks);

  useEffect(() => {
    dispatch(fetchStocks());
  }, [dispatch]);

  return (
    <div className="w-full max-w-sm mx-auto">
      <select
        onChange={(e) =>
          dispatch(
            setSelectedStock(
              stocks.find((stock) => stock.id === e.target.value)
            )
          )
        }
        className="w-full p-2 border rounded bg-white"
      >
        <option value="">Select a stock</option>
        {stocks.map((stock) => (
          <option key={stock.id} value={stock.id}>
            {stock.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StockDropdown;
