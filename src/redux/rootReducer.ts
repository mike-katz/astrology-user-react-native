// src/redux/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import userDetailsReducer from './slices/userDetailsSlice';
import waitListReducer from './slices/waitListSlice';
import profileListReducer from './slices/profileListSlice';
const rootReducer = combineReducers({
  userDetails:userDetailsReducer,
  waitList:waitListReducer,
  profileList:profileListReducer,
});

export default rootReducer;
