// src/redux/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import contestItemReducer from './slices/contestItemSlice';
import userDetailsReducer from './slices/userDetailsSlice';
import activeContestItemReducer from './slices/activeContestItemSlice';
import leagueLevelReducer from './slices/leagueLevelSlice';
import waitListReducer from './slices/waitListSlice';
import profileListReducer from './slices/profileListSlice';
const rootReducer = combineReducers({
  contestItem:contestItemReducer,
  userDetails:userDetailsReducer,
  activeContestItem:activeContestItemReducer,
  leagueLevel: leagueLevelReducer,
  waitList:waitListReducer,
  profileList:profileListReducer,
});

export default rootReducer;
