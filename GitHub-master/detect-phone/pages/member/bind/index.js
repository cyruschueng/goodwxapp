var t = getApp(),
  e = t.requirejs("core"),
  i = t.requirejs("foxui"),
  a = t.requirejs("jquery");
Page({
  data: {
    member: {},
    binded: false,
    endtime: 0,
    postData: {},
    submit: false,
    subtext: "立即绑定"
  },
  onLoad: function (i) {
    t.url(i),
      e.loading(),
      this.getInfo()
  },
  getInfo: function () {
    var t,
      i = this;
    e.get("member/bind", {}, function (e) {
      if (e.error)
        return void wx.redirectTo({
          url: "/pages/member/index/index"
        });
      var a = {
        member: e.member,
        binded: e.binded,
        endtime: e.endtime,
        show: true
      };
      a.postData = {
        mobile: e.member.mobile,
        code: "",
        password: "",
        password1: ""
      },
        i.setData(a),
        e.endtime > 0 && i.endTime(),
        t = e.binded ? "更换绑定手机号" : "绑定手机号",
        wx.setNavigationBarTitle({
          title: t
        })
    }, true, true, true)
  },
  endTime: function () {
    var t = this,
      e = t.data.endtime;
    if (e > 0) {
      t.setData({
        endtime: e - 1
      });
      setTimeout(function () {
        t.endTime()
      }, 1e3)
    }
  },
  inputChange: function (t) {
    var i = this.data.postData,
      s = e.pdata(t).type,
      o = t.detail.value;
    i[s] = a.trim(o),
      this.setData({
        postData: i
      })
  },
  getCode: function (t) {
    var s = this;
    if (!(s.data.endtime > 0)) {
      var o = s.data.postData.mobile;
      if (!a.isMobile(o))
        return void i.toast(s, "请填写正确的手机号");
      e.get("sms/changemobie", {
        mobile: o
      }, function (t) {
        if (0 != t.error)
          return void i.toast(s, t.message);
        i.toast(s, "短信发送成功"),
          s.setData({
            endtime: 60
          }),
          s.endTime()
      }, true, true, true)
    }
  },
  submit: function (t) {
    if (!this.data.submit) {
      var s = this,
        o = this.data.postData;
      if (!a.isMobile(o.mobile))
        return void i.toast(this, "请填写正确的手机号");
      if (5 != o.code.length)
        return void i.toast(this, "请填写5位短信验证码");
      if (!o.password || "" == o.password)
        return void i.toast(this, "请填写登录密码");
      if (!o.password1 || "" == o.password1)
        return void i.toast(this, "请确认登录密码");
      if (o.password != o.password1)
        return void i.toast(this, "两次输入的密码不一致");
      this.setData({
        submit: true,
        subtext: "正在绑定..."
      }),
        e.post("member/bind/submit", o, function (t) {
          return 92001 == t.error || 92002 == t.error ? void e.confirm(t.message, function () {
            o.confirm = 1,
              e.post("member/bind/submit", o, function (t) {
                t.error > 0 ? (i.toast(s, t.message), s.setData({
                  submit: false,
                  subtext: "立即绑定",
                  "postData.confirm": 0
                })) : wx.navigateBack()
              }, true, true, true)
          }) : 0 != t.error ? (i.toast(s, t.message), void s.setData({
            submit: false,
            subtext: "立即绑定"
          })) : void wx.navigateBack()
        }, true, true, true)
    }
  }
})