import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { persistStore } from 'redux-persist';
import Logrocket from 'logrocket';

import reducers from './reducer';

const middleware = [thunkMiddleware, Logrocket.reduxMiddleware()];

const makeConfiguredStore = (reducers, initialState) => createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

/**
 * @type {object} options
 */
export default function makeStore(initialState = {}, options) {
  if (options && options.isServer) {
    return makeConfiguredStore(reducers, initialState);
  }

  const store = makeConfiguredStore(reducers, initialState);

  store.__persistor = persistStore(store);

  return store;
}
