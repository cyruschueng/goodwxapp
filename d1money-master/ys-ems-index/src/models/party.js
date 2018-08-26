import { queryAllParty, queryPartyUsers } from '../services/party';

export default {
    namespace: 'party',

    state: {
        loading: false,
        list: [],
    },

    effects: {
        *fetch({ payload }, { call, put }) {
            yield put({
                type: 'changeLoading',
                payload: true,
            });
            // 获取全部部门 (通讯录)
            const list = yield call(queryAllParty);
            yield put({
                type: 'saveParty',
                payload: Array.isArray(list) ? list : [],
            });
            yield put({
                type: 'changeLoading',
                payload: false,
            });
        },
    },

    reducers: {
        saveParty(state, action) {
            return {
                ...state,
                list: state.list.concat(action.payload),
            };
        },
        changeLoading(state, action) {
            return {
                ...state,
                loading: action.payload,
            };
        },
    },
};
