import { queryFakeList } from '../services/api';
import { queryApplist } from '../services/enterpriseApplication';

export default {
    namespace: 'enterpriseApplication',

    state: {
        applist: [],
        loading: false,
    },

    effects: {
        *fetch({ payload }, { call, put }) {
            yield put({
                type: 'changeLoading',
                payload: true,
            });
            const applist = yield call(queryApplist)
            yield put({
                type: 'appendAppList',
                payload: Array.isArray(applist) ? applist : [],
            });
            console.log()
            yield put({
                type: 'changeLoading',
                payload: false,
            });
        },
    },

    reducers: {
        appendAppList(state, action) {
            return {
                ...state,
                applist: state.applist.concat(action.payload),
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
