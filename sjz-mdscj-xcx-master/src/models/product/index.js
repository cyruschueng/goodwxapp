import { combineReducers } from 'redux';
import * as reducer from './reducer';
import saga from './saga';

export default {
  name: 'product',
  reducer: combineReducers(reducer),
  saga
}
