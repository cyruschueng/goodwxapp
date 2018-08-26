<template>
  <div class="container">
    <subject :type="2" :subject-list="subjectList" @selectEmit="selectHandler" :select="select" :result="result" :current-subject-order="currentSubjectOrder" :current-item="currentItem" :user-info="userInfo" :time="countDown"></subject>
  </div>
</template>

<script>
// PK答题
import subject from '@/components/subject';
import getWechatInfo from '@/utils/mixins';
import subjectList from './data';
import wx, { dialog } from '../../utils/wechat';

const TIME_INTERVAL = 5;

export default {
  name: 'pkSubject',
  components: {
    subject,
  },
  mixins: [getWechatInfo],
  data() {
    return {
      subjectList,
      select: false,
      result: 0,
      currentSubjectOrder: 1,
      currentItem: '',
      timer: '',
      userInfo: {},
      countDown: TIME_INTERVAL,
      intervalTimer: '',
    };
  },
  methods: {
    selectHandler({ item, index, order }) {
      clearInterval(this.intervalTimer);
      this.currentItem = index;
      this.select = true;
      if (item.isCorrect) {
        this.result += 0.5;
      }
      if (+order >= 10) {
        const str = this.result >= 3 ? '恭喜少年闯关成功!' : '很遗憾闯关失败!';
        const content = `${str},摘得${this.result}颗星星`;
        dialog({
          title: '',
          showCancel: false,
          content,
        }).then((res) => {
          if (res.confirm) {
            wx.navigateTo({ url: '../hourglass/main' });
          }
        });
        return;
      }
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.currentItem = '';
        this.select = false;
        this.currentSubjectOrder += 1;
        this.countDown = TIME_INTERVAL;
        this.countTime();
      }, 500);
    },
    countDownHandler() {
      this.countDown -= 1;
    },
    countTime() {
      this.intervalTimer = setInterval(() => {
        if (this.countDown <= 0) {
          clearInterval(this.intervalTimer);
          console.log(this.currentSubjectOrder);
          this.selectHandler({ item: {}, index: -1, order: this.currentSubjectOrder });
          return;
        }
        this.countDownHandler();
      }, 1000);
    },
  },
  mounted() {
    // 调用应用实例的方法获取全局数据
    // this.getUserInfo();
    this.countTime();
  },
  destroyed() {
    clearInterval(this.intervalTimer);
    clearTimeout(this.timer);
  },
  onLoad(opt) {
    if (opt.type === 1007) {
      this.scene = opt.type;
      console.log('邀请的好友进来了pk答题页面');
    }
  },
};
</script>

<style lang="less" scoped>
.container {
  justify-content: flex-start;
}
</style>





