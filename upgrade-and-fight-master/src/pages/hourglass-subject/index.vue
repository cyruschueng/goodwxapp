<template>
  <div class="container">
    <subject :subject-list="subjectList" @selectEmit="selectHandler" :select="select" :result="result" :current-subject-order="currentSubjectOrder" :current-item="currentItem" :type="1" :is-correct="isCorrect" :cls-name="clsName"></subject>
  </div>
</template>

<script>
// 闯关具体答题
import subject from '@/components/subject';
import { getHourglassSubject, getHourglassSubjectAnswer } from '@/api/hourglass';
import wx, { dialog } from '../../utils/wechat';

export default {
  name: 'hourglassSubject',
  components: {
    subject,
  },
  data() {
    return {
      subjectList: [],
      select: false,
      result: 0,
      currentSubjectOrder: 1,
      currentItem: '',
      timer: '',
      isCorrect: false,
      clsName: '',
    };
  },
  methods: {
    selectHandler({ item, index, order }) {
      this.currentItem = index;
      this.select = true;
      console.log(item);
      getHourglassSubjectAnswer({ chuangguan_id: this.chuangguanId, answer_id: item.answer_id }).then((response) => {
        console.log(response);
        const data = response.data.data;
        this.isCorrect = data.is_right;
        this.clsName = data.is_right ? 'active' : 'error';
        if (data.is_right) {
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
          this.isCorrect = false;
          this.clsName = '';
          this.currentSubjectOrder += 1;
          this.chuangguanId = this.chuangguanIds[this.currentSubjectOrder - 1].chuangguan_id;
          this.getEveryHourglassSubject(this.chuangguanId, this.currentSubjectOrder);
        }, 500);
      });
    },
    getEveryHourglassSubject(chuangguanId, order) {
      getHourglassSubject({ chuangguan_id: chuangguanId }).then((res) => {
        this.subjectList.length = 0;
        this.subjectList.push({
          order,
          title: res.data.data.question,
          list: res.data.data.answer,
        });
      });
    },
  },
  onHide() {
    console.log('onHide', this.currentSubjectOrder);
    this.subjectList.length = 0;
    this.select = false;
    this.result = 0;
    this.currentSubjectOrder = 1;
    this.currentItem = '';
    this.timer = '';
    this.isCorrect = false;
    this.clsName = '';
    clearTimeout(this.timer);
  },
  onLoad(opt) {
    console.log('onload', opt, this.currentSubjectOrder);
    this.chuangguanIds = JSON.parse(opt.chuangguan_ids);
    this.chuangguanId = this.chuangguanIds[this.currentSubjectOrder - 1].chuangguan_id;
    this.getEveryHourglassSubject(this.chuangguanId, this.currentSubjectOrder);
  },
};
</script>

<style lang="less" scoped>
.container {
  justify-content: flex-start;
}
</style>





