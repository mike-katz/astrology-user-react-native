import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const profileListSlice = createSlice({
  name: 'profileList',
  initialState:{
    profilelist: [] as any[],
  },
  reducers: {
      setProfileList(state, action) {
      const incoming = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];

      const map = new Map();

      state.profilelist.forEach(item => map.set(item.id, item));
      incoming.forEach(item => map.set(item.id, item));

      state.profilelist = Array.from(map.values());
    },
    // updateProfileListItem: (state, action) => {
    //   if (!state.profilelist.length) return;

    //   const { id, changes } = action.payload;
    //   const index = state.profilelist.findIndex(item => item.id === id);

    //   if (index !== -1) {
    //     state.profilelist[index] = {
    //       ...state.profilelist[index],
    //       ...changes,
    //     };
    //   }
    // },
    updateProfileListItem: (
      state,
      action: PayloadAction<{ id: string | number; changes: Partial<any> }>
    ) => {
      const { id, changes } = action.payload;

      const index = state.profilelist.findIndex(item => item.id === id);
      if (index === -1) return;

      state.profilelist[index] = {
        ...state.profilelist[index],
        ...changes, // ✅ only these fields change
      };
    },
    removeProfileListItem: (state, action) => {
       if (!state.profilelist.length) return;
      const id = action.payload;
      state.profilelist = state.profilelist.filter(item => item.id !== id);
    },
    clearProfileList: (state) => {
      state.profilelist = [];
    },
  },
});

export const { setProfileList ,updateProfileListItem,removeProfileListItem,clearProfileList} = profileListSlice.actions;
export default profileListSlice.reducer;