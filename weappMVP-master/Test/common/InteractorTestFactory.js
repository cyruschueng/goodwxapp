/**
 * Created by kHRYSTAL on 17/11/27.
 */
import eventbus from './mock/notification'
import toast from './mock/toast.js';
import alert from './mock/alert';
import page from './mock/page';
import globalData from  './mock/globalData.js';
import storage from './mock/storage.js';
import tracker from './mock/tracker.js';

function createTestInteractor(interactor, view, model) {
    var instance = new interactor();
    instance.view = view;
    instance.model = model;
    // inject common view
    injectCommonView(instance);
    return instance;
}

function injectCommonView(instance) {
    instance.eventbus = eventbus;
    instance.alert = alert;
    instance.toast = toast;
    instance.page = page;
    instance.globalData = globalData;
    instance.storage = storage;
    instance.tracker = new tracker();
}

module.exports = {
    createTestInteractor: createTestInteractor
};
