<script>
import { wxNavigateTo, wxShowShareMenu, wxGetShareInfo } from '@/utils/wechat';
import { debounce } from '@/utils/index';

export default {
  created() {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
    console.log('app created and cache logs by setStorageSync');
  },
  onLaunch(opt) {
    console.log(opt, 'app页面 onlaunch');
    wxShowShareMenu().then((res) => {
      console.log('wxShowShareMenu app页面', res);
    });
  },
  methods: {
    debounceNavigateTo: debounce(wxNavigateTo, 500),
  },
  onLoad() {},
  onShow(opt) {
    console.log(opt.scene, opt, 'app页面');
    // 邀请个人
    if (+opt.scene === 1007) {
      this.debounceNavigateTo('/pages/wait/main?type=1007');
    }

    // 邀请群聊,冲群聊入库进入,注意邀请单个好友时，返回的opt参数内没有shareTicket参数
    if (+opt.scene === 1044) {
      wxGetShareInfo(opt.shareTicket).then((res) => {
        console.log('wxGetShareInfo', res);
      });
      this.debounceNavigateTo('/pages/wait/main?type=1044');
    }
  },
};
</script>

<style lang="less">
@import (reference) './assets/less/index.less';
/*
Blue #20A0FF Success #13CE66 Warning #F7BA2A Danger #FF4949
Black #1F2D3D  Light Black #324057 Extra Light Black #475669
Dark White #F9FAFC Extra Light Gray #d1dbe5
*/ 
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  background-color: @color-body-bg;
  color: @color-font1;
  overflow: hidden;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}

page {
  height: 100%;
}
</style>
