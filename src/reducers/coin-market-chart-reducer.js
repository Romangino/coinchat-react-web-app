import {createSlice} from "@reduxjs/toolkit";
import marketData from "../data/coin-detail/coin-market";
import {CoinMCThunk} from "../services/detail-thunks";

const initialState = {
    marketData,
    fetching: true
}

const CoinMarketChartReducer = createSlice({
    name: 'CoinMarketChartReducer',
    initialState,
    extraReducers: {
        [CoinMCThunk.pending]: (s) => {
            s.fetching = true;
        },

        [CoinMCThunk.rejected]: (s) => {
            s.fetching = false;
            console.log("CoinMCThunk Rejected")
        },

        [CoinMCThunk.fulfilled]: (state, action) => {
            state.marketData = action.payload;
            state.fetching = false;
        }
    }
})

export default CoinMarketChartReducer.reducer;