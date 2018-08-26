/**
 * Created by kHRYSTAL on 17/11/27.
 */
import eventbus from './mock/notification'
import globalData from './mock/globalData';
import toast from './mock/toast.js';
import alert from './mock/alert';
import page from './mock/page';

import sinon from 'sinon';


function spyObj(sandbox, obj) {
    if (obj == 'undefined')
        return;
    Object.getOwnPropertyNames(obj)
        .sort()
        .forEach(val => {
            if(obj[val]['restore']) {
              obj[val].restore();
              // console.log('+++++++++')
              // console.log(val+':restored');
              // console.log('++++++++++')
            }
            if (sandbox == 'undefined') {
                sinon.spy(obj, val);
            } else {
                sandbox.spy(obj, val);
            }
        });
}

function spyAll(sandbox) {
    sandbox.restore();
    spyObj(sandbox, eventbus);
    spyObj(sandbox, alert);
    spyObj(sandbox, toast);
    spyObj(sandbox, page);
    spyObj(sandbox, globalData);
}

module.exports = {
    spyObj: spyObj,
    spyAll: spyAll,
};
