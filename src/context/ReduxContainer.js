
import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import cardsSlice from '../features/cards/cardsSlice';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: cardsSlice.reducer,
  middleware: [ sagaMiddleware ]
});

sagaMiddleware.run(rootSaga);

export default function ReduxContainer(props) {
  return (
    <Provider store={store}>
      {props.children}
    </Provider>
  );
}