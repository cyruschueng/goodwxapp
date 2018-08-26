//index.js
import indexInteractor from './indexInteractor';
import indexService from './indexService';
import factory from '../../common/mip/InteractorFactory';
import extend from '../../lib/extend'

let interactor;
var pageConfig = {
    //--------view 接口----------
    view: function () {
        return {
            setUserInfo: self.setUserInfo,
        }
    },
    //---------view 实现---------
    /**
     * 页面的初始数据
     */
    data: {
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
    },

    onLoad(options) {
        self = this;
        interactor = factory.createInteractor(indexInteractor, self.view(), new indexService(), this);
        interactor.onLoad(options);
    },

    setUserInfo(userInfo) {
      this.setData({
          userInfo: userInfo,
          hasUserInfo: true
      })
    },

    onClickUserInfo(e) {
        interactor.onClickUserInfo(e);
    },

    onClickUserAvatar() {
        interactor.onClickUserAvatar();
    }
};

var conf = extend(true, pageConfig, {});
Page(conf);
