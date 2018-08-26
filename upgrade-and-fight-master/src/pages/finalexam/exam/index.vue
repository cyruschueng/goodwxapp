<template>
  <div class="container">
    <!-- <div class="all-exams"
      v-for="(exam,index) in examList" :key="index">
      <div class="exam-item">
        <div class="exam-title" @click="e => startExam(e,exam.key)">{{exam.title}}</div>  
        <div class="exam-result">{{exam.score}}/{{exam.total}}</div>
      </div>  
    </div> -->
    题目一
  </div>
</template>

<script>
import subject from '@/components/subject';
// import subjectList from './data';

export default {
  data() {
    return {
      examList: [
        {
          title: '【移动销售】专题测试一',
          key: 'ceshiyi',
          score: '95分',
          total: '100分',
        },
        {
          title: '【移动销售】专题测试二',
          score: '95分',
          total: '100分',
        },
        {
          title: '【渠道管家】专题测试一',
          score: '95分',
          total: '100分',
        },
        {
          title: '【渠道管家】专题测试二',
          score: '95分',
          total: '100分',
        },
        {
          title: '【来访登记】专题测试一',
          score: null,
          total: '100分',
        },
        {
          title: '【来访登记】专题测试二',
          score: null,
          total: '100分',
        },
        {
          title: '【再现开盘】专题测试一',
          score: null,
          total: '100分',
        },
        {
          title: '【再现开盘】专题测试二',
          score: null,
          total: '100分',
        },
        {
          title: '【云行销】专题测试一',
          score: null,
          total: '100分',
        },
        {
          title: '【模拟测试一】',
          score: null,
          total: '100分',
        },
      ],
    };
  },
  components: {
    subject,
  },
  methods: {
    startExam() {

    },
  },
};
</script>

<style lang="less">

</style>
