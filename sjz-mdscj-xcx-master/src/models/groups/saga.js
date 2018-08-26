import * as types from '../../types';
import { call, put, take, fork, select } from 'redux-saga/effects';
import * as services from '../../services/groups';
import {qnParser, dateFormat} from '../../utils/filter';

function *getGroupsDetail () {
  while (1) {
    const { payload: { groupOrderNo } } = yield take(types.GROUPS_DETAIL_REQUEST);
    const userId = yield select(state => state.user.id);

    yield put({type: types.UPDATE_VIEW_CONFIG, payload: {pageLoading: true}});
    const params = {
      groupOrderNo
    };
    try {
      const res = yield call(services.getGroupsDetail, params);
      let dataDetail = res.data;
      const users = res.data.users;

      // 结束时间处理
      if (dataDetail.endTime) {
        dataDetail.endTime = dateFormat(dataDetail.endTime, 'yyyy-MM-dd hh:mm:ss');
      }
      // 商品详情
      dataDetail.productVO.descElements = dataDetail.productVO.descElements.map(desc => {
        let nDesc = desc;
        if (nDesc.type === 'IMAGE') {
          nDesc.content = qnParser(nDesc.content, 750);
        }
        return nDesc;
      });
      // 拼团头像列表数据拼装
      dataDetail.usersPaid = users.filter(item=> item.status === 'PAID');
      while(dataDetail.usersPaid.length < dataDetail.memberLimit) {
        dataDetail.usersPaid.push({});
      }
      // 拼团数据处理
      dataDetail.users = dataDetail.users.map(item=> {
        item.paidAt = dateFormat(item.paidAt, 'yyyy-MM-dd hh:mm:ss');
        return item;
      });

      // 用户比对
      let dataTemp = {};
      for (let i = 0, len = users.length; i < len; i++) {
        if (users[i].buyId === userId) {
          if (['CANCELLED'].indexOf(users[i].status) === -1) {
            dataTemp.isMember = true;
            dataTemp.orderNo = users[i].orderNo;
            dataTemp.userStatus = users[i].status;
          }
          break;
        }
      }
      dataTemp.lackMembers = dataDetail.memberLimit - users.filter(item=> item.status === 'PAID').length;
      dataTemp.islock = false;

      yield put({type: types.GROUPS_DETAIL_SUCCESS, payload: {dataDetail, dataTemp}});
      yield put({type: types.UPDATE_VIEW_CONFIG, payload: {pageLoading: false}});
    } catch (e) {
      if (e && e.type !== 'API_ERROR') {
        throw e;
      }
    }
  }
}

function *getProductTuanList () {
  while (1) {
    yield take(types.PRODUCT_TUAN_LIST_REQUEST);
    const { page, size } = yield select(state => state.groups.dataProTuan);

    const params = {
      page,
      size,
      appKey: 'maidao'
    };
    try {
      const res = yield call(services.getProductTuanList, params);

      // 显示价格处理
      res.data.data = res.data.data.map(item=> {
        item.promotion = item.promotion || {};
        item.priceSummary = item.priceSummary || {};
        // 现价处理
        if (item.priceSummary.minPromotionPrice) {
          // 不显示区间价，只显示最低价，下同
          item.priceCurrent = (item.priceSummary.minPromotionPrice / 100).toFixed(2);
        } else if (item.priceSummary.minDiscountPrice) {
          item.priceCurrent = (item.priceSummary.minDiscountPrice / 100).toFixed(2);
        } else if (item.priceSummary.minSkuPrice) {
          item.priceCurrent = (item.priceSummary.minSkuPrice / 100).toFixed(2);
        }
        // 原价处理
        item.priceOld = (item.priceSummary.minSkuPrice / 100).toFixed(2);
        if (item.priceCurrent === item.priceOld) {
          item.priceOld = '';
        }
        return item;
      });

      yield put({type: types.PRODUCT_TUAN_LIST_SUCCESS, payload: res.data});
    } catch (e) {
      if (e && e.type !== 'API_ERROR') {
        throw e;
      }
    }
  }
}

export default function * () {
  yield fork(getGroupsDetail);
  yield fork(getProductTuanList);
}
