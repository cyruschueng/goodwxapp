import { combineReducers } from 'redux';
import * as reducer from './reducer';
import saga from './saga';

export default {
  name: 'switchTab',
  reducer: combineReducers(reducer),
  saga
}
