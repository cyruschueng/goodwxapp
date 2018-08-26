// pages/user/userTemplate/userItem.js
let compData = {
    "_compData_.image": "",
    "_compData_.text": "",
    "_compData_.next": "",
    "_compData_.isNextHide": false,
    "_compData_.destinationController": null
}

let compEvent = {
    tap2trans: function (callBack) {
        if (typeof callBack == "function") {
            callBack()
        }
    }
}

function UserItem() {
    let pages = getCurrentPages()
    let currentPage = pages[pages.length - 1];
    this.__page = currentPage;

    Object.assign(currentPage, compEvent)
    currentPage.setData(compData)
}

module.exports = {
    UserItem
} 