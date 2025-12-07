import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LeagueLevelState {
  item: any;
}

const initialState: LeagueLevelState = {
  item: {},
};

const leagueLevelSlice = createSlice({
  name: 'leagueLevel',
  initialState,
  reducers: {
    setLeagueLevel: (state, action: PayloadAction<any>) => {
      // state.item = action.payload;
       state.item = {
        ...state.item,
        ...action.payload, // merge with existing fields
      };
    },
  },
});

export const { setLeagueLevel } = leagueLevelSlice.actions;
export default leagueLevelSlice.reducer;