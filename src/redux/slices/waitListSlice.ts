import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const waitListSlice = createSlice({
  name: 'userDetails',
  initialState:{
    waitlist: [] as any[],
  },
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
  },
});

export const { setWaitList ,updateWaitListItem,removeWaitListItem,removeWaitListItemOrder} = waitListSlice.actions;
export default waitListSlice.reducer;