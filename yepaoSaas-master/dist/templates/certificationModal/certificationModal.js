
import * as homeService from '../../services/home-service';
import * as homedata from '../../utils/homedata-format';
import * as AuthService from '../../services/auth-service';

let mytimer

Component({
  properties: {
    //这里定义了modalHidden属性，属性值可以在组件使用时指定.写法为modal-hidden  
    modalHidden: {
      type: Boolean,
      value: true
    },
    modalIsCertificationMem: {
      type: Boolean,
      value: false,
    }
  },
  data: {

    // 显示文字
    reminTitle: '会员认证',
    // 输入框 输入的手机号码
    memTelephone: '',
    telephoneCode: '',
    // 输入框 的水印
    placeholderText: '请输入会员手机号',
    // 验证码 文字 和倒计时
    codeText: '',
    codeNum: 60,
    // 门店 列表
    gymList: [],
    gym: '',
    // 逻辑控制
    // 是否显示 输入手机号 界面 true 显示,fale 隐藏手机号界面 （显示门店列表界面）
    isGYMListHidden: false,

    // 是否允许再次发送验证码
    isAollowCodeTap: true,

    // 确定 验证 会员手机号
    isConfiMemPhone: true,
    // 确定 验证码
    isConfiCode: false,
    // 确定 门店
    isConfiGym: false,
    // 门店 是否隐藏 
    isGYMListHidden: false
  },
  ready() {
  },
  methods: {
    // 这里放置自定义方法  
    // 取消 按钮
    bindCancelBoxBtnTap() {
      this.setData({
        isCertificationMem: false,
        modalHidden: true
      })
    },
    // 确认 按钮
    bindConfirmBoxBtnTap() {

      // 1、确定验证 会员
      if (this.data.isConfiMemPhone) {
        // 判空
        if (this.data.memTelephone != '') {
          this.confirmCertification();
        }
      }
      // 2、确定 验证 验证码
      if (this.data.isConfiCode) {
        this.confirmPhoneCode();
        clearTimeout(mytimer);
      }
      // 3、确定门店
      if (this.data.isConfiGym) {
        this.confirmNewMemInfo();
      }
    },
    // 输入框 获取输入的 手机号/验证码
    bindCerMemInput(e) {
      if (this.data.codeText != '') {
        this.setData({
          telephoneCode: e.detail.value
        })
      } else {
        this.setData({
          memTelephone: e.detail.value
        })
      }
    },
    // 获取验证码 点击按钮
    bindGetPhoneCodeTap() {

      // 倒计时
      if (this.data.isAollowCodeTap) {
        this.setData({
          placeholderText: '请输入验证码'
        })
        this.setTimeOutPhoneCode(this);
        this.sendCodeMessage();
      }

    },
    // 发送手机验证码
    sendCodeMessage() {
      homeService.queryPhoneCode(this.data.memTelephone).then((result) => {
        this.setData({
          isConfiCode: true,
          cerInputNum: ''
        })
      }).catch((error) => {
        console.log(error);
      })
    },
    // 倒计时
    setTimeOutPhoneCode(that) {
      let codeNum = this.data.codeNum;

      if (codeNum == 0) {

        this.setData({
          isAollowCodeTap: true,
          codeText: '重新发送',
          codeNum: 60
        })

      } else {

        codeNum--;
        this.setData({
          isAollowCodeTap: false,
          codeText: codeNum + 's',
          codeNum: codeNum
        })
        mytimer = setTimeout(function () {
          that.setTimeOutPhoneCode(that)
        }, 1000)
      }
    },
    // 确定认证
    confirmCertification() {
      AuthService.queryCertificationMember(this.data.memTelephone).then((result) => {
        this.setData({
          isCertificationMem: true,
          modalHidden: true
        })
      }).catch((error) => {

        if (error.errMsg == 'request:fail') {
        } else {
          this.setData({
            reminTitle: '您还不是会员！',
            placeholderText: '请输入验证码',
            isConfiMemPhone: false,
            codeText: '获取验证码'
          })
        }
        console.log(error);
      })
    },
    // 确定 验证 验证码
    confirmPhoneCode() {

      homeService.uploadPhoneCode(this.data.telephoneCode, this.data.memTelephone).then((result) => {
        this.setData({
          isConfiGym: true,
          isConfiCode: false
        })

        // 获取 gym list 
        this.getGYMList();

      }).catch((error) => {
        console.log(error);
      })
    },
    // 获取 gym list 
    getGYMList() {
      homeService.queryGYMList().then((result) => {
        this.setData({
          gymList: homedata.formatGYMList(result.gymList),
          isGYMListHidden: true
        })
      }).catch((error) => {
        console.log(error);
      })
    },
    // 门店 列表 选择
    bindGymCellTap(e) {
      var gymList = this.data.gymList;
      var index = e.currentTarget.id;

      gymList.forEach(item => {
        item.checked = false;
      })
      gymList[index].checked = true;

      this.setData({
        gymList: gymList,
        gym: gymList[index].gym
      })

    },
    // 确定 选择 门店
    confirmNewMemInfo() {
      let infoDic = {
        memTelephone: this.data.memTelephone,
        gym: this.data.gym
      };

      homeService.uploadNewMem(infoDic).then((result) => {

        this.setData({
          isCertificationMem: true,
          modalHidden: true
        })
        // 保存 会员信息
        AuthService.saveMemberInfo(result.newMem);

      }).catch((error) => {
        console.log(error);
      })
    },
  }
})  