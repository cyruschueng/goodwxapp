var e = getApp(),
  t = e.requirejs("core");
Page({
  data: {},
  onLoad: function (e) { },
  onShow: function () {
    this.getData()
  },
  getData: function () {
    var e = this;
    t.get("commission/register", {}, function (t) {
      if (70003 == t.error)
        return void wx.redirectTo({
          url: "/pages/commission/index"
        });
      t.show = true,
        wx.setNavigationBarTitle({
          title: "申请成为" + t.set.texts.agent || "申请"
        }),
        e.setData(t)
    })
  },
  inputChange: function (e) {
    "realname" == e.target.id ? this.setData({
      "member.realname": e.detail.value
    }) : "mobile" == e.target.id ? this.setData({
      "member.mobile": e.detail.value
    }) : "weixin" == e.target.id && this.setData({
      "member.weixin": e.detail.value
    })
  },
  submit: function (e) {
    if (!this.data.member.realname)
      return void t.alert("请填写,真实姓名!");
    if (!this.data.member.mobile)
      return void t.alert("请填写,手机号!");
    var i = {
      agentid: this.data.mid,
      realname: this.data.member.realname,
      mobile: this.data.member.mobile,
      weixin: this.data.member.weixin
    };
    t.post("commission/register", i, function (e) {
      if (0 == e.error)
        return void wx.redirectTo({
          url: 1 == e.check ? "/pages/commission/index" : "/pages/commission/register/index"
        });
      t.alert(e.message)
    })
  }
})