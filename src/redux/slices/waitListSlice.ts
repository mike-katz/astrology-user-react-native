import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  waitlist: [] as any[],
};
const waitListSlice = createSlice({
  name: 'userDetails',
initialState,
  reducers: {
      setWaitList(state, action) {
      const incoming = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];

      const map = new Map();

      state.waitlist.forEach(item => map.set(item.id, item));
      incoming.forEach(item => map.set(item.id, item));

      state.waitlist = Array.from(map.values());
    },
    updateWaitListItem: (state, action) => {
      if (!state.waitlist.length) return;

      const { id, changes } = action.payload;
      const index = state.waitlist.findIndex(item => item.id === id);

      if (index !== -1) {
        state.waitlist[index] = {
          ...state.waitlist[index],
          ...changes,
        };
      }
    },
    removeWaitListItem: (state, action) => {
       if (!state.waitlist.length) return;
      const id = action.payload;
      state.waitlist = state.waitlist.filter(item => item.id !== id);
    },
    removeWaitListItemOrder: (state, action) => {
        if (!state.waitlist.length) return;

        const orderId = action.payload;
        state.waitlist = state.waitlist.filter(
          item => item.order_id !== orderId
        );
      },
      resetWaitListData: () => initialState,
  },
});

export const { setWaitList ,updateWaitListItem,removeWaitListItem,removeWaitListItemOrder,resetWaitListData} = waitListSlice.actions;
export default waitListSlice.reducer;