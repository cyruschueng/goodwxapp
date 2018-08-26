import { combineReducers } from 'redux';

const sagas = [];
const reducers = [];

function addReducerAndSaga (model) {
  model.reducer && reducers.push({name: model.name, reducer: model.reducer});
  model.saga && sagas.push(model.saga);
}

addReducerAndSaga(require('./user'));
addReducerAndSaga(require('./product'));
addReducerAndSaga(require('./order'));
addReducerAndSaga(require('./orderDetail'));
addReducerAndSaga(require('./address'));
addReducerAndSaga(require('./region'));
addReducerAndSaga(require('./viewConfig'));
addReducerAndSaga(require('./switchTab'));
addReducerAndSaga(require('./refund'));
addReducerAndSaga(require('./middle'));
addReducerAndSaga(require('./groups'));
addReducerAndSaga(require('./coupons'));

export default {
  reducers: combineReducers(reducers.reduce((p, c) => {
    p[c.name] = c.reducer;
    return p;
  }, {})),
  sagas
}
