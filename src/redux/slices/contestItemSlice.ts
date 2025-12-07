import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MatchItemState {
  item: any;
}

const initialState: MatchItemState = {
  item: {},
};

const contestItemSlice = createSlice({
  name: 'contestItem',
  initialState,
  reducers: {
    setContestItem: (state, action: PayloadAction<any>) => {
      // state.item = action.payload;
       state.item = {
        ...state.item,
        ...action.payload, // merge with existing fields
      };
    },
  },
});

export const { setContestItem } = contestItemSlice.actions;
export default contestItemSlice.reducer;