import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery } from 'redux-saga';
import { take, fork } from 'redux-saga/effects';
import { persistStore, autoRehydrate } from 'redux-persist';
import reduxPersist from './config/redux-persist';
import Immutable from 'seamless-immutable';

import models from './models/index';
import * as types from './types';

export default function () {
  const middleware = [];
  const enhancers = [];

  // saga中间件
  const sagaMiddleware = createSagaMiddleware();
  middleware.push(sagaMiddleware);

  // log中间件
  // if (__DEV__) {
  //   const logger = createLogger();
  //   middleware.push(logger);
  // }

  // 合并中间件
  enhancers.push(applyMiddleware(...middleware));

  enhancers.push(autoRehydrate());

  const store = createStore(models.reducers, Immutable({}), compose(...enhancers));

  // persist
  persistStore(store, reduxPersist, () => store.dispatch({type: types.STORE_READY}));

  // kick off root saga
  store.runSaga = sagaMiddleware.run;

  function runRootSaga () {
    store.runSaga(function * () {
      yield models.sagas.map(saga => fork(saga));
    }).done.catch(e => {
      // wx.showModal({title: 'Error', content: JSON.stringify(e) || ''});
      runRootSaga();
    });
  }

  store.runSaga(function *() {
    yield takeEvery('*', (action) => {
      console.info('*action* [' + action.type + ']');
    });
  });
  runRootSaga();

  return store;
};
