import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserDetailsState {
  userDetails: any;
}

const initialState: UserDetailsState = {
  userDetails: {},
};

const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    setUserDetails: (state, action: PayloadAction<any>) => {
      // state.userDetails = action.payload;
      state.userDetails = {
        ...state.userDetails,
        ...action.payload, // merge with existing fields
      };
    },
    resetUserData: () => initialState,
  },
});

export const { setUserDetails ,resetUserData} = userDetailsSlice.actions;
export default userDetailsSlice.reducer;