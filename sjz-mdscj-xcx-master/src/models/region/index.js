import { combineReducers } from 'redux';
import * as reducer from './reducer';
import saga from './saga';

export default {
  name: 'region',
  reducer: combineReducers(reducer),
  saga
}
