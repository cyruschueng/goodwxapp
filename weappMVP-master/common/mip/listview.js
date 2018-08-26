// 设置数据至列表
// @args isUpper: 是否为下拉刷新
function extendPageWithList(pageConf) {

    pageConf.setDataToList = function (isUpper, dataList) {
        this.setData({
            dataList: isUpper ? dataList : this.data.dataList.concat(dataList),
        });
    };
    pageConf.getDataList = function () {
        return this.data.dataList;
    };
    pageConf.onPullDownRefresh = function () {
        this.interactor.onPullDownRefresh();
    };
    pageConf.onReachBottom = function () {
        let count = this.data.dataList ? this.data.dataList.length : 0;
        this.interactor.onReachBottom(count);
    };
    pageConf.clickItem = function (e) {
        var itemId = e.currentTarget.dataset.itemid;
        this.interactor.onItemClicked(itemId);
    };

}

function extendViewWithList(view, pageConf) {
    view.setDataToList = pageConf.setDataToList;
    view.setDataToList.bind(pageConf);
    view.getDataList = pageConf.getDataList;
    view.getDataList.bind(pageConf);
    return view;
}

module.exports = {
    extendPageWithList: extendPageWithList,
    extendViewWithList: extendViewWithList,
};