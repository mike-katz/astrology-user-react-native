import store from '../../../src/redux/store';

const initState = {
  loading: false,
};

const AppActivityReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOADING_ACTIVITY':
      return {
        loading: action.payload,
      };
  }
  return state;
};

export default AppActivityReducer;

export const activitySpinner = (loading = true) => {
  store.dispatch({ type: 'LOADING_ACTIVITY', payload: loading });
};
