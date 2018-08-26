import { queryPartyUsers } from '../services/partyUser';

export default {
    namespace: 'partyUser',

    state: {
        loading: false,
        list: [],
        pagination: {
            pageNo: 1,
            pageSize: 5,
            pageCount: 1,
            totalCount: 0,
        },
    },

    effects: {
        * fetch({ payload }, { call, put }) {
            yield put({
                type: 'changeLoading',
                payload: true,
            });
            // 获取当前部门成员 (通讯录)
            const { list, pageNo, pageCount, totalCount } = yield call(queryPartyUsers, payload);
            yield put({
                type: 'save',
                payload: {
                    list: Array.isArray(list) ? list : [],
                    pageNo,
                    pageCount,
                    totalCount,
                },
            });
            yield put({
                type: 'changeLoading',
                payload: false,
            });
        },
    },

    reducers: {
        save(state, action) {
            return {
                ...state,
                list: state.list.concat(action.payload.list),
                pagination: {
                    ...state.pagination,
                    pageNo: action.payload.pageNo,
                    pageCount: action.payload.pageCount,
                    totalCount: action.payload.totalCount,
                },
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
