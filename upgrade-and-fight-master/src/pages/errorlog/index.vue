<template>
  <div class="error-log-container">
      <div class="all-error">
        <div class="error-item" v-for="(error,index) in errorLogs" :key="index">
          <div class="title">
            <div class="question">{{error.question}}</div>
            <div class="bookmark">取消收藏</div>
          </div>
          <div class="log-at">收藏于: {{error.logAt}}</div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errorLogs: [
        {
          question: '云客的全称是什么？',
          logAt: '2018-2-16 17:09:09',
          bookmark: true,
        },
        {
          question: '云客的全称是什么？云客的全称是什么？云客的全称是什么？云客的全称是什么？云客的全称是什么？云客的全称是什么？云客的全称是什么？云客的全称是什么？',
          logAt: '2018-2-16 17:09:09',
          bookmark: true,
        },
        {
          question: '云客的CEO是谁？',
          logAt: '2018-2-16 17:09:09',
          bookmark: true,
        },
        {
          question: '云客的CEO是谁？',
          logAt: '2018-2-16 17:09:09',
          bookmark: true,
        },
        {
          question: '云客的CEO是谁？',
          logAt: '2018-2-16 17:09:09',
          bookmark: true,
        },
      ],
    };
  },
};
</script>

<style lang="less">

.error-log-container {
  min-height: 100vh;
  background-color: #F2F2F2;
  .all-error {
    .error-item {
      padding-top: 50rpx;
      padding-bottom: 40rpx;
      border-bottom: 1rpx solid #797979;
      position: relative;
      .title {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        .question {
          font-size: 36rpx;
          color: #333333;
          word-wrap: auto;
          flex-grow: 1;
          max-width:500rpx;
        }
        .bookmark {
          font-size: 24rpx;
          text-align: center;
          line-height: 50rpx;
          width: 150rpx;
          height: 50rpx;
          padding: 10rpx 20rpx;
          border: 1rpx solid rgba(121,121,121,1);
          border-radius: 10rpx;
        }
      }
      .log-at {
        font-size: 18rpx;
        font-weight: 400;
        color: #333333;
        position: absolute;
        bottom: 0;
        right: 200rpx;
      }
    }
  }
}
</style>
