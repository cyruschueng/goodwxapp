function showToast(title = "正在加载", duration = 2000, mask = false, image = "", icon = "loading") {
}

//菊花图标
function showLoadingToast(title = "正在加载", duration = 2000, mask = false) {
}

//对号图标
function showSuccessToast(title = "提交成功", duration = 2000, mask = false) {
}

function hideToast() {
}

//
function showLoading(title = "加载中...", mask = true) {
}

function hideLoading() {

}

module.exports = {
    showLoadingToast: showLoadingToast,
    hideToast: hideToast,
    showLoading: showLoading,
    hideLoading: hideLoading,
    showSuccessToast: showSuccessToast
}