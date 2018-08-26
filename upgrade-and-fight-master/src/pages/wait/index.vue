<template>
  <div class="container wait-wrap">
    <div class="wait-friendhead">
      <head-photo :user-info="userInfo"></head-photo>
    </div>
    <div class="wait-loading">等待好友响应.......</div>
    <div class="wait-selfhead">
      <head-photo :user-info="userInfo"></head-photo>
    </div>
    <div class="wait-btn">
      <button type="button" v-show="isFriend" @click="startPk">开始PK</button>
      <button type="button" @click="cancelHandler">取消</button>
    </div>
  </div>
</template>

<script>
// 邀请好友等待页面
import headPhoto from '@/components/head-photo';
import { wxNavigateTo } from '@/utils/wechat';
import getWechatInfo from '@/utils/mixins';

export default {
  components: {
    headPhoto,
  },
  data() {
    return {
      userInfo: {},
      isFriend: false,
      scene: '',
    };
  },
  mixins: [getWechatInfo],
  methods: {
    cancelHandler() {
      wxNavigateTo('../pk/main');
    },
    startPk() {
      wxNavigateTo(`../pk-subject/main?type=${this.scene}`);
    },
  },
  mounted() {
    // this.getUserInfo();
  },
  onLoad(opt) {
    console.log(opt, 'onLoad wait');
    if (+opt.type === 1007) {
      this.isFriend = true;
      this.scene = opt.type;
      console.log('邀请的好友进来了');
    }
  },
};
</script>

<style lang="less" scoped>
@import '../../assets/less/index.less';
@import '../../assets/iconfont/iconfont.wxss';

  .wait-wrap {
    justify-content: flex-start;
    .wait-friendhead, .wait-selfhead {
      flex: 0 0 200px;
      display: flex;
      align-items: center;
    }
    .wait-btn {
      flex: 0 0 40px;
      display: flex;
      flex-direction: column;
      align-items: center;
      button {
        flex: 0 0 40px;
        display: block;
        width: 120px;
        border: 1px solid @color-bdr;
        line-height: 40px;
        margin-top: 10px;
      }
    }
  }
</style>

