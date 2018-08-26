// template/toast/toastText.js
let _compData = {
    '_toast_.isHidden': false,
    '_toast_.content': ''
}

let toastPannel = {
    show: function (data) {
        let that = this;
        this.setData({
            '_toast_.isHidden': true,
            '_toast_.content': data
        });

        setTimeout(function () {
            that.setData({
                '_toast_.isHidden': false
            })
        }, 2000);
    }
}

function ToastPannel() {
    // 当前页面对象
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1];
    this.__page = currentPage;
    Object.assign(currentPage, toastPannel);
    // 附加到page上方便访问
    currentPage.toastPannel = this;
    // 把组件的数据合并到页面的data中
    currentPage.setData(_compData);

    return this;
}

module.exports = {
    ToastPannel
}

