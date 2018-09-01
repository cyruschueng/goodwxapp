var _util = require("../utils/util");
var API = "http://japi.zto.cn/zto/api_utf8/baseArea?msg_type=GET_AREA&data=";
var selectArea = {
    addDot: function e(t) {
        if (t instanceof Array) {
            t.map(function(e) {
                if (e.fullName.length > 4) {
                    e.fullNameDot = e.fullName.slice(0, 4) + "...";
                    return e
                } else {
                    e.fullNameDot = e.fullName;
                    return e
                }
            })
        }
    },
    load: function e(t) {
        t.setData({
            isShow: false
        });
        (0, _util.Promise)(wx.request, {
            url: API + "0",
            method: "GET"
        }).then(function(e) {
            var a = e.data.result[0];
            selectArea.addDot(e.data.result);
            t.setData({
                proviceData: e.data.result,
                "selectedProvince.index": 0,
                "selectedProvince.code": a.code,
                "selectedProvince.fullName": a.fullName
            });
            return (0, _util.Promise)(wx.request, {
                url: API + a.code,
                method: "GET"
            })
        }).then(function(e) {
            var a = e.data.result[0];
            selectArea.addDot(e.data.result);
            t.setData({
                cityData: e.data.result,
                "selectedCity.index": 0,
                "selectedCity.code": a.code,
                "selectedCity.fullName": a.fullName
            });
            return (0, _util.Promise)(wx.request, {
                url: API + a.code,
                method: "GET"
            })
        }).then(function(e) {
            var a = e.data.result[0];
            selectArea.addDot(e.data.result);
            t.setData({
                districtData: e.data.result,
                "selectedDistrict.index": 0,
                "selectedDistrict.code": a.code,
                "selectedDistrict.fullName": a.fullName
            })
        }).
        catch (function(e) {
            console.log(e)
        })
    },
    tapProvince: function e(t, a) {
        var l = t.currentTarget.dataset;
        (0, _util.Promise)(wx.request, {
            url: API + l.code,
            method: "GET"
        }).then(function(e) {
            selectArea.addDot(e.data.result);
            a.setData({
                cityData: e.data.result,
                "selectedProvince.code": l.code,
                "selectedProvince.fullName": l.fullName,
                "selectedCity.code": e.data.result[0].code,
                "selectedCity.fullName": e.data.result[0].fullName
            });
            return (0, _util.Promise)(wx.request, {
                url: API + e.data.result[0].code,
                method: "GET"
            })
        }).then(function(e) {
            selectArea.addDot(e.data.result);
            a.setData({
                districtData: e.data.result,
                "selectedProvince.index": t.currentTarget.dataset.index,
                "selectedCity.index": 0,
                "selectedDistrict.index": 0,
                "selectedDistrict.code": e.data.result[0].code,
                "selectedDistrict.fullName": e.data.result[0].fullName
            })
        }).
        catch (function(e) {
            console.log(e)
        })
    },
    tapCity: function e(t, a) {
        var l = t.currentTarget.dataset;
        (0, _util.Promise)(wx.request, {
            url: API + l.code,
            method: "GET"
        }).then(function(e) {
            selectArea.addDot(e.data.result);
            a.setData({
                districtData: e.data.result,
                "selectedCity.index": t.currentTarget.dataset.index,
                "selectedCity.code": l.code,
                "selectedCity.fullName": l.fullName,
                "selectedDistrict.index": 0,
                "selectedDistrict.code": e.data.result[0].code,
                "selectedDistrict.fullName": e.data.result[0].fullName
            })
        }).
        catch (function(e) {
            console.log(e)
        })
    },
    tapDistrict: function e(t, a) {
        var l = t.currentTarget.dataset;
        a.setData({
            "selectedDistrict.index": t.currentTarget.dataset.index,
            "selectedDistrict.code": l.code,
            "selectedDistrict.fullName": l.fullName
        })
    },
    confirm: function e(t, a) {
        a.setData({
            address: a.data.selectedProvince.fullName + " " + a.data.selectedCity.fullName + " " + a.data.selectedDistrict.fullName,
            isShow: false
        })
    },
    cancel: function e(t) {
        t.setData({
            isShow: false
        })
    },
    choosearea: function e(t) {
        t.setData({
            isShow: true
        })
    }
};
module.exports = {
    SA: selectArea
};