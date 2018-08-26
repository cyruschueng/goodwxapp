//logs.js
import logsInteractor from './logsInteractor';
import logsService from './logsService';
import factory from '../../common/mip/InteractorFactory';
import extend from '../../lib/extend';

let interactor;
var pageConfig = {

    //--------view 接口----------
    view: function () {
        return {
            setLogs: self.setLogs,
        }
    },
    //---------view 实现---------
    /**
     * 页面的初始数据
     */
    data: {
        logs: []
    },

    onLoad(options) {
        self = this;
        interactor = factory.createInteractor(logsInteractor, self.view(), new logsService(), this);
        interactor.onLoad(options);
    },

    setLogs(data) {
        this.setData({
            logs: data
        });
    }


};

var conf = extend(true, pageConfig, {});
Page(conf);
