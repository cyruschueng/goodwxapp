
function errImgFun(e, that) {
        var _errImg = e.target.dataset.errImg;
        var _errObj = {};
        _errObj[_errImg] = "../../images/default.png";
        console.error(e.detail.errMsg + "----" + "----" + _errImg);
        that.setData(_errObj); 
}

module.exports = {
        errImgFun: errImgFun
}  