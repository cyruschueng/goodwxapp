import baseInteractor from '../../common/mip/baseInteractor'
import util from '../../utils/util';

export default class logsInteractor extends baseInteractor {

    constructor() {
        super();
    }

    onLoad(options) {
        var data = (this.storage.getStorageSync('logs')||[]).map(log=>{
           return util.formatTime(new Date(log));
        });
    }
}