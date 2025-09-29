import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DEFAULT_PRICE_RANGE, DEFAULT_SORT_OPTION } from "../../constants";

export const fetchContents = createAsyncThunk(
  "content/fetchContents",
  async () => {
    const response = await axios.get(
      "https://closet-recruiting-api.azurewebsites.net/api/data"
    );

    return response.data;
  }
);

const contentSlice = createSlice({
  name: "content",
  initialState: {
    items: [],
    status: "idle",
    error: null,
    pricingOptionApplied: [],
    query: "",
    sortBy: DEFAULT_SORT_OPTION,
    priceRange: DEFAULT_PRICE_RANGE,
  },
  reducers: {
    setFilter(state, action) {
      state.pricingOptionApplied = action.payload;
      state.priceRange = DEFAULT_PRICE_RANGE; // Reset price range when filters change
    },
    setQuery(state, action) {
      state.query = action.payload;
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
    setPriceRange(state, action) {
      state.priceRange = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchContents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchContents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setFilter, setQuery, setSortBy, setPriceRange } =
  contentSlice.actions;
export default contentSlice.reducer;
