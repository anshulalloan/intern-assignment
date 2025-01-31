import React from "react";
import StockDropdown from "./components/StockDropdown";
import DurationSelector from "./components/DurationSelector";
import StockGraph from "./components/StockGraph";

const App: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Stock Graph Viewer</h1>
      <StockDropdown />
      <DurationSelector />
      <StockGraph />
    </div>
  );
};

export default App;
