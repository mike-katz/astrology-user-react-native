import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MatchItemState {
  item: any;
}

const initialState: MatchItemState = {
  item: {},
};

const activeContestItemSlice = createSlice({
  name: 'activeContestItem',
  initialState,
  reducers: {
    setActiveContestItem: (state, action: PayloadAction<any>) => {
      // state.item = action.payload;
       state.item = {
        ...state.item,
        ...action.payload, // merge with existing fields
      };
    },
  },
});

export const { setActiveContestItem } = activeContestItemSlice.actions;
export default activeContestItemSlice.reducer;