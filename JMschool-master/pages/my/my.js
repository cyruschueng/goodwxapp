// pages/my/my.js
//获取应用实例
var app = getApp();
Page({
  data: {
    user: {}
  },
  onShow: function () {
    this.getData();
  },
  getData: function () {
    var _this = this,
      student_bianhao = app._user.we.student_bianhao;
    _this.setData({
      'user': app._user,
      'time': app._time,
      'is_bind': !!app._user.is_bind
    });
    if (student_bianhao) {
      var student_nianji = student_bianhao.substring(0, 4),
        student_banji = student_bianhao.substring(10, 12),
        student_fenyuan = _this.toFenyuan(student_bianhao.substring(4, 6)),
        student_zhuanye = _this.toZhuanye(student_bianhao.substring(4, 10));
      _this.setData({
        'user.we.student_nianji': student_nianji,
        'user.we.student_banji': student_banji,
        'user.we.student_fenyuan': student_fenyuan,
        'user.we.student_zhuanye': student_zhuanye,
      });
    }
  },

  //学号解析
  toFenyuan: function (student_fenyuan) {
    student_fenyuan = student_fenyuan.replace('01', '土木建筑分院')
    student_fenyuan = student_fenyuan.replace('02', '电气与信息工程分院')
    student_fenyuan = student_fenyuan.replace('04', '机电工程分院')
    student_fenyuan = student_fenyuan.replace('05', '经济管理分院')
    student_fenyuan = student_fenyuan.replace('07', '人文与法学分院')
    return student_fenyuan;
  },

  toZhuanye: function (string) {
    // 土木建筑分院
    string = string.replace('011001', '土木工程')
    string = string.replace('011002', '交通工程')
    string = string.replace('011003', '工程管理')
    string = string.replace('011007', '给排水科学与工程')
    string = string.replace('011008', '建筑学')
    string = string.replace('011009', '艺术设计')
    string = string.replace('011010', '道路桥梁与渡河工程')
    string = string.replace('011011', '环境设计')
    string = string.replace('011012', '视觉传达设计')
    string = string.replace('011013', '工程造价')
    string = string.replace('011107', '建筑工程')
    string = string.replace('011112', '铁道工程')

    //  电气与信息工程分院
    string = string.replace('021041', '电子信息')
    string = string.replace('021042', '通信工程')
    string = string.replace('021043', '信息计算机')
    string = string.replace('021044', '计算机科学')
    string = string.replace('021045', '信息管理')
    string = string.replace('021046', '电子商务')
    string = string.replace('021047', '电气工程及其自动化')
    string = string.replace('021048', '网络工程')
    string = string.replace('021049', '软件工程')
    string = string.replace('021110', '电力系统及其自动化')
    string = string.replace('021111', '电力牵引与传动控制')

    // 机电工程分院
    string = string.replace('041021', '材料')
    string = string.replace('041022', '机制')
    string = string.replace('041027', '汽服')
    string = string.replace('041028', '物流')
    string = string.replace('041029', '机电')
    string = string.replace('041030', '车辆')

    // 经济管理分院
    string = string.replace('051063', '会计')
    string = string.replace('051062', '金融')
    string = string.replace('051065', '人资')
    string = string.replace('051064', '营销')
    string = string.replace('051066', '酒管')

    // 人文法学分院
    string = string.replace('071081', '法学')
    string = string.replace('071082', '英语')
    string = string.replace('071083', '公管')

    return string;
  }
});