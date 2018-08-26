var api = require('../../api.js')
var util = require('../../utils/util.js')
var config = require('../../utils/config.js')
var base64 = require('../../utils/base64.js')
import { $wuxDialog } from '../../wux/wux'
var id
var name

var user_id
var user_name

var len
var list

var app = getApp();

Page({
    data: {
        showDialog: false,
        shenhe: new Date(2018, 1, 7) > new Date(),
        showSharePopup: false,
        showSharebutton:false,
    },
    onShow: function() {},
    toggleDialog: function() {
        var that = this;
        this.setData({
            showDialog: !this.data.showDialog
        });
    },
    onShareAppMessage: function() {
        return {
            title: (user_name ? user_name : name) + '的婚礼邀请函',
            imageUrl: '../../styles/wedding.jpg',
            path: "/pages/index/index?id=" + (user_id ? user_id : id) + "&name=" + (user_name ? user_name : name)
        }
    },
    onReady: function() {
        //获得dialog组件
        this.dialog = this.selectComponent("#dialog");
    },
    _showSharebutton() {
      // console.log(2)
        this.setData({
          showSharebutton:!this.data.showSharebutton
        });
    },

    //取消事件
    _cancelEvent() {
        console.log('你点击了取消');
        this.dialog.hideDialog();
    },
    //确认事件
    _confirmEvent() {
        console.log('你点击了确定');
        this.dialog.hideDialog();
    },

    onLoad: function(options) {
        var that = this
        if (options.id) {
            id = options.id
        }
        if (options.scene) {
            id = options.scene
        }
        if (options.name) {
            name = options.name
        } else {
            name = '王尼玛';
            len = 29;
            list = [{ "name": "良心在哪里", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/kYStkRwLUm0jtv2r61o5jmDPviaAu4rKdgFelOCpHanJHCfvOEDjdhrXBMrhMiah6ibtlQlQiahJvNx3714K6tqsqw/0" }, { "name": "🌸          骚瑞", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/fne49wJ3OqkEp6PcOH5jvMSKFpjCpalgibyCUKEmub8t5mQYTsIYLHuBLKblFkJ3vGA7wjKea0OcN0fFNb4jgwQ/0" }, { "name": "国际动不动尥蹶子巨星", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaELCtKovPV4liaicE3901T1WRuEgqAQd2t862UNooT6qxGaajZFBSzGibQMHUDEVicSVv0zC1iaYiau2Th3g/0" }, { "name": "悲伤曲调", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/X7fWDniaYIsCLNgkEywCJjo605uZnliaAH94wtJx36Fe2mg254S5L2YFIxoGaQ1s9c2kLGeoMr74Ad26XCkLGsXg/0" }, { "name": "煦", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoXUKteXiblKxbZRicE69XlELdBpjP6L4Fed66jLIKVmwn67QjRmFoedHibYug3Sug2GeU3eKJDl4cuQ/0" }, { "name": "宁", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLErtOqlaLAq8TmFH7B5uqfhTIVKcHeFsQC0PS1ibY91wjkJ8XRWaNZgZj1jkvKqa391NbrrvCgIAQ/0" }, { "name": "小草阿-", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJy2lZ6VEUkXf5rMk1ohl53xXPIFyibTTrRtHJlUp3MRmbm2DFu7X37nZjsxjuW22QGPIXn7Pp57AA/0" }, { "name": "Stranger🇨🇳", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/fhcBH7NoWflYM8HbuGZeffrfMpReBG4SiblI3ibkulQpuPkuVHDylrDjyxUiaT1GiaTRaQ9JGibsuwKaQ8iaUvCxALfw/0" }, { "name": "小桥流水", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/Jic159UiaiboUxSAxhwZ9BwWPDADRbFkWEuzIMwTiaZssaoqTe5ovxop7HMbAK9VrsSiaTqomZzLzIiauApWI5cOeZxQ/0" }, { "name": "寻  梦  圆", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLzEW1A9DMEskicKYPvd5Yy6JlNyo5uoBWH1vK4JmP40gW2N4yfOcalqscUKJrnjp5mjO2WttHXkaQ/0" }, { "name": "简单点 🍃", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83er8SkyARz1aP1a3D2EGYzRrrcsVicOAOhJvic9T7UIg6HbJFMyicR4hmZNl5s9AIz5b4kEBOP2ceW4Rw/0" }, { "name": "让未来的我去感谢如今看不起我的你", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJRAc5xQOtGlIft3H8D1Ur3fgarCt3X84Bict51UVwbGgLqDgveNS3mZ90BOtiaVTpcEG7ribrvcRuCg/0" }, { "name": "奋斗中成长", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eokXdLL8HXVU3OaXDRBibAUa8qS0xjYUsK3icQn15efhOWo7VXiaricYtROjSnzEdhOT1VEyImLNoG4PA/0" }, { "name": "……", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIJmcvZfGvrq5JhDGPZVpr0IJCSaClic5mmsEyn9TtQxGCnnu2xCGf5My74dwGAJatibicAu1P36aJZA/0" }, { "name": "࿐ཉ付🤓🤓刚ཉ࿐", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/MVSskmbLBI8mCggLfpEqxeMG9Ykv78cCsURfLvaHPMt62fXM3hroZ4EvJiaqPahVPEVyZGO6gVVsGbBiaxr4nMmw/0" }, { "name": "俄的温柔💋你不懂", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/cFsrz02ljW1vMgBaN1q6Piasaj3DqJYpJrsxwGxcfmHTVBFL5egicEkGGjCObW5uHawicMgfffbS0N8IviayTWkUKw/0" }, { "name": "倾此生只为美丽笑", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/csM5F3JzWVTqTTlM74ib4mqkhSXmzSIHK61llvUBzHVMhwF6X82JrThgZIgXoRp1p0CtiamefRENlZ69YUpeoFgg/0" }, { "name": "薛先生", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKsJgQKWpebpBYnrwhnlh0xjFIg0YmVrakIfPASRMUSNib1NfjEELs0MibrbiaicB8Cg3u4S0QXA6ibjDg/0" }, { "name": "无关风月", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epLptH8ShYyAUlW9jb1AGZTc6flB2Yia0AwUV7czViaZJ3Q11aPbEkxMPRA8xic2niaA8caDZ5tYofFhQ/0" }, { "name": "小能量", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/nu3oibGM5evSibvs5dvVF9daRImba5NUsGIichd5Xibh0jqEye9k8aLHyeevyEzteicvPIbOMS1DoludSj7JkoDtz3A/0" }, { "name": "℡拿稳我心你称王^", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/cMKY37LHhsmev0GKUGcIMAaYdhkmT8ibwRFyFh1RyYeT8iaQRxBoB0xqJnzRLVXzU6vcbUibffxf1Onr5va8DCAfw/0" }, { "name": "吾党拎虎冲", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJeGJFB788LqkyGMc1gET5jzeOBuPcmBoA7m2qPX3zSTkX0KmeibicINdZ8tKcjUfGRsqw7QxBYgwMg/0" }, { "name": "风格", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqr2x1iciaqBW1zBmltoicA0w69RmP2HNsZC4UAQam5GsrDtCdMvHbJ73uibleArJLPDVl94mkk4zpNLQ/0" }, { "name": "忆古草", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK201WFPMIbr3nQv6mHACiagob12ZLD2gdycOEq5YqECFEoajgZcHRYyLBful3qFEapG6jtibeAG9vA/0" }, { "name": "猪有蹄:", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJTAbxycl66R48sPrZwDIshZibxV7Pn8XmRJ9wx2lNBQ9lBGomwIxrRxu1M9u3kKoqqgAewR8wf7Pw/0" }, { "name": "A00000  許松盛", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/EBHrqsTNObbYPE5KopibBYXGn0EPoSD2FHSojWBE41Tm8gWoaHgxmn3yiaORcWrwWVJ4iaE8rSqTvZowqcT1xM82A/0" }, { "name": "小勇", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/fQBXo1bJlaP3jZ9WtSh7M2rjib8tyyvDXQ8rj2yPUYFXw8ugDQty3cVgibbWFAwcAwWMZVApB5og3Yjf3DkiaYMyQ/0" }, { "name": "闫秀梅", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/Bib5lnZumUUiaLXlZzejIpARZF8h6EEYMDGFZQLg7JsmBWauyJcEAmwMt12If1MlV6HjpUkicNlK0JDct5FRWv4eA/0" }, { "name": "辉", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLbZGRib1icCDjLK1icVamIXRr6prvtdylOQmzjKPOLkoCCNUoeEMIO69z8fhK0g478HnzOfdNSwJOzA/0" }];
        }
        wx.showNavigationBarLoading();
        wx.showToast({
            title: 'Loading……',
            duration: 2000,
            icon: 'loading'
        })
        api.login(function(user) {
            console.log(user)
            if (!id) {
                id = user.openid
            }

            if (options.name) {
                name = options.name
            }
            if (!id) {
                name = '王尼玛';
                len = 29;
                list = [{ "name": "良心在哪里", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/kYStkRwLUm0jtv2r61o5jmDPviaAu4rKdgFelOCpHanJHCfvOEDjdhrXBMrhMiah6ibtlQlQiahJvNx3714K6tqsqw/0" }, { "name": "🌸          骚瑞", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/fne49wJ3OqkEp6PcOH5jvMSKFpjCpalgibyCUKEmub8t5mQYTsIYLHuBLKblFkJ3vGA7wjKea0OcN0fFNb4jgwQ/0" }, { "name": "国际动不动尥蹶子巨星", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaELCtKovPV4liaicE3901T1WRuEgqAQd2t862UNooT6qxGaajZFBSzGibQMHUDEVicSVv0zC1iaYiau2Th3g/0" }, { "name": "悲伤曲调", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/X7fWDniaYIsCLNgkEywCJjo605uZnliaAH94wtJx36Fe2mg254S5L2YFIxoGaQ1s9c2kLGeoMr74Ad26XCkLGsXg/0" }, { "name": "煦", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoXUKteXiblKxbZRicE69XlELdBpjP6L4Fed66jLIKVmwn67QjRmFoedHibYug3Sug2GeU3eKJDl4cuQ/0" }, { "name": "宁", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLErtOqlaLAq8TmFH7B5uqfhTIVKcHeFsQC0PS1ibY91wjkJ8XRWaNZgZj1jkvKqa391NbrrvCgIAQ/0" }, { "name": "小草阿-", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJy2lZ6VEUkXf5rMk1ohl53xXPIFyibTTrRtHJlUp3MRmbm2DFu7X37nZjsxjuW22QGPIXn7Pp57AA/0" }, { "name": "Stranger🇨🇳", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/fhcBH7NoWflYM8HbuGZeffrfMpReBG4SiblI3ibkulQpuPkuVHDylrDjyxUiaT1GiaTRaQ9JGibsuwKaQ8iaUvCxALfw/0" }, { "name": "小桥流水", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/Jic159UiaiboUxSAxhwZ9BwWPDADRbFkWEuzIMwTiaZssaoqTe5ovxop7HMbAK9VrsSiaTqomZzLzIiauApWI5cOeZxQ/0" }, { "name": "寻  梦  圆", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLzEW1A9DMEskicKYPvd5Yy6JlNyo5uoBWH1vK4JmP40gW2N4yfOcalqscUKJrnjp5mjO2WttHXkaQ/0" }, { "name": "简单点 🍃", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83er8SkyARz1aP1a3D2EGYzRrrcsVicOAOhJvic9T7UIg6HbJFMyicR4hmZNl5s9AIz5b4kEBOP2ceW4Rw/0" }, { "name": "让未来的我去感谢如今看不起我的你", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJRAc5xQOtGlIft3H8D1Ur3fgarCt3X84Bict51UVwbGgLqDgveNS3mZ90BOtiaVTpcEG7ribrvcRuCg/0" }, { "name": "奋斗中成长", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eokXdLL8HXVU3OaXDRBibAUa8qS0xjYUsK3icQn15efhOWo7VXiaricYtROjSnzEdhOT1VEyImLNoG4PA/0" }, { "name": "……", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIJmcvZfGvrq5JhDGPZVpr0IJCSaClic5mmsEyn9TtQxGCnnu2xCGf5My74dwGAJatibicAu1P36aJZA/0" }, { "name": "࿐ཉ付🤓🤓刚ཉ࿐", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/MVSskmbLBI8mCggLfpEqxeMG9Ykv78cCsURfLvaHPMt62fXM3hroZ4EvJiaqPahVPEVyZGO6gVVsGbBiaxr4nMmw/0" }, { "name": "俄的温柔💋你不懂", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/cFsrz02ljW1vMgBaN1q6Piasaj3DqJYpJrsxwGxcfmHTVBFL5egicEkGGjCObW5uHawicMgfffbS0N8IviayTWkUKw/0" }, { "name": "倾此生只为美丽笑", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/csM5F3JzWVTqTTlM74ib4mqkhSXmzSIHK61llvUBzHVMhwF6X82JrThgZIgXoRp1p0CtiamefRENlZ69YUpeoFgg/0" }, { "name": "薛先生", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKsJgQKWpebpBYnrwhnlh0xjFIg0YmVrakIfPASRMUSNib1NfjEELs0MibrbiaicB8Cg3u4S0QXA6ibjDg/0" }, { "name": "无关风月", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epLptH8ShYyAUlW9jb1AGZTc6flB2Yia0AwUV7czViaZJ3Q11aPbEkxMPRA8xic2niaA8caDZ5tYofFhQ/0" }, { "name": "小能量", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/nu3oibGM5evSibvs5dvVF9daRImba5NUsGIichd5Xibh0jqEye9k8aLHyeevyEzteicvPIbOMS1DoludSj7JkoDtz3A/0" }, { "name": "℡拿稳我心你称王^", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/cMKY37LHhsmev0GKUGcIMAaYdhkmT8ibwRFyFh1RyYeT8iaQRxBoB0xqJnzRLVXzU6vcbUibffxf1Onr5va8DCAfw/0" }, { "name": "吾党拎虎冲", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJeGJFB788LqkyGMc1gET5jzeOBuPcmBoA7m2qPX3zSTkX0KmeibicINdZ8tKcjUfGRsqw7QxBYgwMg/0" }, { "name": "风格", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqr2x1iciaqBW1zBmltoicA0w69RmP2HNsZC4UAQam5GsrDtCdMvHbJ73uibleArJLPDVl94mkk4zpNLQ/0" }, { "name": "忆古草", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK201WFPMIbr3nQv6mHACiagob12ZLD2gdycOEq5YqECFEoajgZcHRYyLBful3qFEapG6jtibeAG9vA/0" }, { "name": "猪有蹄:", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJTAbxycl66R48sPrZwDIshZibxV7Pn8XmRJ9wx2lNBQ9lBGomwIxrRxu1M9u3kKoqqgAewR8wf7Pw/0" }, { "name": "A00000  許松盛", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/EBHrqsTNObbYPE5KopibBYXGn0EPoSD2FHSojWBE41Tm8gWoaHgxmn3yiaORcWrwWVJ4iaE8rSqTvZowqcT1xM82A/0" }, { "name": "小勇", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/fQBXo1bJlaP3jZ9WtSh7M2rjib8tyyvDXQ8rj2yPUYFXw8ugDQty3cVgibbWFAwcAwWMZVApB5og3Yjf3DkiaYMyQ/0" }, { "name": "闫秀梅", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/Bib5lnZumUUiaLXlZzejIpARZF8h6EEYMDGFZQLg7JsmBWauyJcEAmwMt12If1MlV6HjpUkicNlK0JDct5FRWv4eA/0" }, { "name": "辉", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLbZGRib1icCDjLK1icVamIXRr6prvtdylOQmzjKPOLkoCCNUoeEMIO69z8fhK0g478HnzOfdNSwJOzA/0" }];
            }
            user_id = user.openid
            user_name = user.user_name
            that.setData({
                name: name
            });

            api.yaoqinghanset(id, user.user_name, user.avatar, function(res) {
                console.log(JSON.stringify(res))
                if (!len) {
                    len = res.length;
                }

                var index = 0;
                if (len > 500) {
                    index = 4;
                } else if (len > 300) {
                    index = 3;
                } else if (len > 100) {
                    index = 2;
                } else if (len > 9) {
                    index = 1;
                }
                that.setData({
                    bg: 'http://icons.maiyizhi.cn/chenghao' + index + '.png',
                    len: len
                });
                if (!list) {
                    list = res
                }
                that.setData({
                    list: list
                }, function() {
                    wx.hideToast()
                    wx.hideNavigationBarLoading();
                });
            }, function() {
                wx.hideToast()
                wx.hideNavigationBarLoading();
            })
        }, function() {
            api.yaoqinghanget(id, function(res) {
                console.log(res)
                if (!len) {
                    len = res.length;
                }

                var index = 0;
                if (len > 500) {
                    index = 4;
                } else if (len > 300) {
                    index = 3;
                } else if (len > 100) {
                    index = 2;
                } else if (len > 9) {
                    index = 1;
                }
                that.setData({
                    bg: 'http://icons.maiyizhi.cn/chenghao' + index + '.png',
                    len: len
                });
                if (!list) {
                    list = res
                }
                that.setData({
                    list: list
                }, function() {
                    wx.hideToast()
                    wx.hideNavigationBarLoading();
                });

                wx.hideToast()
                wx.hideNavigationBarLoading();
            }, function() {
                wx.hideToast()
                wx.hideNavigationBarLoading();
            })
        }, '必须授权登录之后才能操作呢，是否重新授权登录？')
    },
    menu: function(e) {
        var that = this;
        let formId = e.detail.formId;
        api.login(function(user) {
            console.log(user)
            //util.dealFormIds(formId);
            that.toggleDialog()
        }, function() {}, '必须授权登录之后才能操作呢，是否重新授权登录？')
    },
    // onReady: function() {},
    toggleSharePopup: function() {
        this.setData({
            showSharePopup: !this.data.showSharePopup
        });
        console.log(this.data.showSharePopup);
    },
    share: function(e) {
        let self = this;

        self.setData({
          showSharebutton:!self.data.showSharebutton
        });
        api.login(function(user) {
            self.toggleSharePopup();
        }, function() {

        }, '必须授权登录之后才能操作呢，是否重新授权登录？')
    },
    shareToChats: function() {
        console.log('分享到微信');
       this._showSharebutton();

    },
    shareToMoments: function() {
        console.log('分享到朋友圈');
       
        this.generateInvitation(function(pic) {
            util.downloadAndPreview(pic, '我的婚礼邀请函', '/pages/index/index', '海报图片下载中');
        });
        this._showSharebutton();
    },
    // 生成小程序码，回调函数参数为生成的图片的地址
    generateInvitation: function(successCB) {
        wx.showToast({
            title: 'loading',
            duration: 20000,
            icon: 'loading'
        });

        let user = app.globalData.user;
        console.log(user);
        api.getQiniuAvatar(user.avatar, function(response) {
            let avatar = response.avatar + '?roundPic/radius/!50p&imageView2/0/w/100/h/100';
            let pic = 'http://pics.maiyizhi.cn/hunlifenxiang_1.jpg?watermark/3/image/' +
                base64.url_safe_base64_encode(avatar) +
                '/gravity/NorthWest/dx/70/dy/70';
            api.yaoqinghanqrcode(user.openid, user.user_name, 90, function(response) {
                pic += '/image/' +
                    base64.url_safe_base64_encode(response.url) +
                    '/gravity/SouthWest/dx/20/dy/20';
                wx.hideToast();
                successCB(pic);
            }, function(message) {
                wx.showToast({
                    title: 'message',
                    icon: 'none',
                });
                console.log(message);
            });
        }, function(message) {
            wx.showToast({
                title: 'message',
                icon: 'none',
            });
            console.log(message);
        });
    }
})