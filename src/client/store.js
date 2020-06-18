import { createStore } from 'redux';

import reducer from '../reducers';

const configureStore = () => {
  const preloadedState = window.PRELOADED_STATE;

  const store = createStore(
    reducer,
    preloadedState,
  );

  return store;
};

export default configureStore;