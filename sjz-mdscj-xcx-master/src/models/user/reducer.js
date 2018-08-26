import * as types from '../../types';

export function avatar (state = '', {type, payload}) {
  switch (type) {
    case types.USER_LOGIN_SUCCESS:
      return payload.avatar;
    case types.USER_NEED_RELOGIN:
      return '';
    default: return state;
  }
}

export function id (state = 0, {type, payload}) {
  switch (type) {
    case types.USER_LOGIN_SUCCESS:
      return payload.id;
    case types.USER_NEED_RELOGIN:
      return 0;
    default: return state;
  }
}

export function nickname (state = '', {type, payload}) {
  switch (type) {
    case types.USER_LOGIN_SUCCESS:
      return payload.nickname;
    case types.USER_NEED_RELOGIN:
      return '';
    default: return state;
  }
}

export function sex (state = -1, {type, payload}) {
  switch (type) {
    case types.USER_LOGIN_SUCCESS:
      return payload.sex;
    case types.USER_NEED_RELOGIN:
      return -1;
    default: return state;
  }
}

export function previousAuthAction (state = null, {type, payload}) {
  switch (type) {
    case types.AUTH_ACTION_DISPATCH:
      return payload;
    case types.USER_LOGIN_SUCCESS:
      return null;
    default: return state;
  }
}
