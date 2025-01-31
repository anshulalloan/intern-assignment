import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface Stock {
  id: string;
  name: string;
  available: string[];
}

interface GraphData {
  data: string[];
  values: number[];
}

interface StockState {
  stocks: Stock[];
  selectedStock: Stock | null;
  selectedDuration: string | null;
  graphData: GraphData;
  loading: boolean;
}

const initialState: StockState = {
  stocks: [],
  selectedStock: null,
  selectedDuration: null,
  graphData: { data: [], values: [] },
  loading: false,
};

export const fetchStocks = createAsyncThunk("stocks/fetchStocks", async () => {
  const response = await axios.get("http://localhost:3000/api/stocks");
  return response.data;
});

export const fetchStockData = createAsyncThunk(
  "stocks/fetchStockData",
  async ({ id, duration }: { id: string; duration: string }) => {
    const response = await axios.post(
      `http://localhost:3000/api/stocks/${id}`,
      { duration }
    );
    return response.data;
  }
);

const stockSlice = createSlice({
  name: "stocks",
  initialState,
  reducers: {
    setSelectedStock: (state, action) => {
      state.selectedStock = action.payload;
      state.selectedDuration = null;
    },
    setSelectedDuration: (state, action) => {
      state.selectedDuration = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStocks.fulfilled, (state, action) => {
        state.stocks = action.payload;
      })
      .addCase(fetchStockData.pending, (state) => {
        state.loading = true;
      })
      // .addCase(fetchStockData.fulfilled, (state, action) => {
      //   state.graphData = {
      //     data: action.payload.data.map((item: any) => item.timestamp),
      //     values: action.payload.data.map((item: any) => item.price),
      //   };
      //   state.loading = false;
      // })
      .addCase(fetchStockData.fulfilled, (state, action) => {
        const { data } = action.payload;
        if (data && Array.isArray(data)) {
          state.graphData = {
            data: data.map((item: any) => item.timestamp),
            values: data.map((item: any) => item.price),
          };
        } else {
          console.error("Data is undefined or not an array:", data);
        }
        state.loading = false;
      })
      .addCase(fetchStockData.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setSelectedStock, setSelectedDuration } = stockSlice.actions;
export default stockSlice.reducer;
