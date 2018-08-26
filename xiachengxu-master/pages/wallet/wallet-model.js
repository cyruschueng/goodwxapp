import { Base } from '../../utils/base.js';
import mockData from '../../data/mock-data.js';


class Wallet extends Base {
  constructor() {
    super();
  }

  getCardList(params, callback) {
    // var param = {
    //   url: '/wxserver/hb/getMyBonus',
    //   type: 'POST',
    //   data: params,
    //   sCallback: function (data) {
    //     typeof callback == 'function' && callback(data);
    //   },
    //   eCallback: data => {
    //     callback && callback({ status: false });
    //   }
    // };
    // this.request(param);

    setTimeout(() => {
      callback(params.data.current == 0 ? mockData.cardList : mockData.uselessCardList);
    }, 500);
  }
}

module.exports = {
  Wallet
}