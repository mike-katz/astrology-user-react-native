// src/redux/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import contestItemReducer from './slices/contestItemSlice';
import userDetailsReducer from './slices/userDetailsSlice';
import activeContestItemReducer from './slices/activeContestItemSlice';
import leagueLevelReducer from './slices/leagueLevelSlice';
const rootReducer = combineReducers({
  auth: authReducer,
  contestItem:contestItemReducer,
  userDetails:userDetailsReducer,
  activeContestItem:activeContestItemReducer,
  leagueLevel: leagueLevelReducer,
});

export default rootReducer;
