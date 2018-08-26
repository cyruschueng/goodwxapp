import eventbus from '../notification/notification';
import toast from '../view/toast';
import alert from '../view/alert';
import page from '../view/page';
import storage from '../persistence/storage';
import globalData from '../persistence/globalData';
import tracker from '../tracker/tracker';

function createInteractor(interactor, view, model) {
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
    instance.storage = storage;
    instance.globalData = globalData;
    instance.tracker = new tracker();
}

module.exports = {
    createInteractor: createInteractor
};