import store from '../../../src/redux/store';

const initState = {
  appState: -1, // 0 --> Login, 1 --> Registration
  isStoreSelected: true,
  //   isUpdateAvailable: false,
  //   storeURLs: '',
};

const AppSateReducer = (state = initState, action) => {
  console.log(action.type);
  switch (action.type) {
    case 'CHANGE_APP_STATE':
      return {
        ...state,
        appState: action.payload,
      };
    case 'STORE_SELECTED':
      return {
        ...state,
        isStoreSelected: action.payload,
      };
  }
  return state;
};

export default AppSateReducer;

export const changeAppStatus = (appState = 0) => {
  store.dispatch({ type: 'CHANGE_APP_STATE', payload: appState });
};
export const changeStoreSelection = (selection = false) => {
  store.dispatch({ type: 'STORE_SELECTED', payload: selection });
};
// export const changeAppVersion = (isUpdateAvailable = false) => {
//   store.dispatch({
//     type: 'CHANGE_APP_STATE',
//     [payload.isUpdateAvailable]: isUpdateAvailable,
//   });
// };
// export const changeAppStoreURL = (storeURLs = '') => {
//   store.dispatch({type: 'CHANGE_APP_STATE', [payload.storeURLs]: storeURLs});
// };
