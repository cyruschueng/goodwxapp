import { wxSetStorage, wxLogin, wxGetUserInfo, wxGetStorage } from '@/utils/wechat';
import { saveUserInfo, getSessionKey } from '@/api/common';

export default {
  methods: {
    loginWeChat() {
      wxLogin().then((res) => {
        console.log('login', res, saveUserInfo);
        getSessionKey({ code: res.code }).then((response) => {
          console.log(response);
        });
        return wxGetUserInfo();
      }).then((response) => {
        console.log(JSON.parse(response.rawData));
        this.userInfo = response.userInfo;
        saveUserInfo({ userInfo: JSON.parse(response.rawData) }).then((res) => {
          console.log(res);
        });
        wxSetStorage({ key: 'userInfo', data: JSON.stringify(response.userInfo) });
      });
    },
    getUserInfo() {
      // 调用登录接口
      wxGetStorage('userInfo').then((res) => {
        if (res.data) {
          this.userInfo = JSON.parse(res.data);
          return;
        }
        this.loginWeChat();
      }).catch(() => {
        this.loginWeChat();
      });
    },
  },
};
