import Immutable from 'seamless-immutable';

import * as types from '../../types';
import { enumRefundType, enumRefundReason } from '../../constant';

export function dataRefunds (state = Immutable({
  enumRefundType,
  enumRefundReason,
  refundType: 'REFUND',
  refundReason: 'AGREETWOSIDE',
  refundTypeIndex: 0,
  refundReasonIndex: 0,
  refundMemo: ''
}), {type, payload}) {
  switch (type) {
    case types.REFUND_CHANGE_END: {
      return Immutable({
        ...state,
        ...payload
      });
    }
    default:
      return state;
  }
}

export function dataRefundDetails (state = [], { type, payload }) {
  switch (type) {
    case types.REFUND_DETAIL_SUCCESS: {
      return payload;
    }
    default:
      return state;
  }
}
