export default class baseInteractor {

    constructor() {
        this.view = undefined;
        this.model = undefined;
        this.eventbus = undefined;
        this.alert = undefined;
        this.toast = undefined;
        this.app = undefined;
        this.page = undefined;
        this.storage = undefined;
        this.tracker = undefined;
        this.nextId = "";
        this.isPullDownRefreshing = false;
        this.lastPage = false;
        this.loaded = false;
    }

    onLoad(options) {
        this.loaded = true;
        // 子类注册自己的eventbus
    }

    onShow() {

    }

    onHide() {

    }

    onUnload(options) {
        this.loaded = false;
        // 解绑eventbus
    }

    onReceiveFormId(formId) {
        // 发送formId
    }

    onPullDownRefresh() {
        this.isPullDownRefreshing = true;
        this.refresh();
    }

    refresh() {
        return this.getListData("");
    }

    onReachBottom(cardCount) {
        if (cardCount > 0 && !this.isPullDownRefreshing && !this.lastPage) {
            this.getListData(this.nextId);
        }
    }

    getListData(nextId) {
        this.page.showNavigationBarLoading();
        var result = this.getListRequest(nextId);
        result.then(res => {
            // console.log("列表数据刷新成功", res);
            this.onLoadSuccess(nextId, res.data);
        }, err => {
            // console.log("列表数据刷新失败", err);
            this.onLoadError(nextId, err);
        });
        if(this.showFirstLoadingToast() && !nextId) {
            this.toast.showLoading('正在加载');
            result.then(res=>{
                this.toast.hideLoading();
            },err=>{
                this.toast.hideLoading();
            });
        }

        return result;
    }

    showFirstLoadingToast() {
        return false;
    }

    onItemClicked(cardId) {
    }

    getListRequest(nextId) {
    }

    onLoadSuccess(nextId, data) {
        this.page.hideNavigationBarLoading();
        this.page.stopPullDownRefresh();
        this.view.setDataToList(nextId == "", data.data);
        this.nextId = data.nextId;
        this.lastPage = data.lastPage
        this.isPullDownRefreshing = false;
    }
    onLoadError(nextId, err) {
        this.page.hideNavigationBarLoading();
        this.isPullDownRefreshing = false;
        this.page.stopPullDownRefresh();
    }
}