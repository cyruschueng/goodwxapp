<template>
  <div class="rank-container">
      <div class="rank-overview">
        <div class="rank-avatar">假装是头像</div>
        <div class="rank-rst">
          <div class="total-ov">总榜: NO {{myRank.total}}</div>
          <div class="pk-ov">PK榜: NO {{myRank.pk}}</div>
          <div class="final-ov">考核榜: NO {{myRank.final}}</div>
        </div>
      </div>
      <div class="rank-page">
        <div class="tabs">
          <div class="tab"  
            v-for="(rankType,index) in rankTypes" :key="index"
            @click="e => switchTab(e,rankType.key)">
            {{rankType.title}}
          </div>
        </div>
        <div class="tab-content">
          <ranklist :type="selectedTab" :ranklist="rankData[selectedTab]"></ranklist>          
        </div>
      </div>
  </div>
</template>

<script>
import ranklist from './ranklist';

export default {
  components: {
    ranklist,
  },
  data() {
    return {
      currentTab: 'total',
      myRank: {
        total: 1,
        pk: 3,
        final: 3,
      },
      rankTypes: [
        {
          title: '总榜',
          key: 'total',
        },
        {
          title: 'PK榜',
          key: 'pk',
        },
        {
          title: '考核榜',
          key: 'final',
        },
      ],
      rankData: {
        total: [
          {
            img: '',
            name: '小王',
            star: 40,
          },
          {
            img: '',
            name: '小王',
            star: 30,
          },
          {
            img: '',
            name: '小王',
            star: 20,
          },
          {
            img: '',
            name: '小王',
            star: 10,
          },
          {
            img: '',
            name: 'yuki',
            star: 40,
          },
        ],
        pk: [
          {
            img: '',
            name: '小王',
            result: '5胜1负',
            star: 40,
          },
          {
            img: '',
            name: '小王',
            result: '5胜1负',
            star: 30,
          },
          {
            img: '',
            name: '小王',
            result: '5胜1负',
            star: 20,
          },
          {
            img: '',
            name: '小王',
            result: '5胜1负',
            star: 10,
          },
          {
            img: '',
            name: 'yuki',
            result: '5胜1负',
            star: 40,
          },
        ],
        final: [
          {
            img: '',
            name: '小王',
            avgScore: '99分/5次',
          },
          {
            img: '',
            name: '小王',
            avgScore: '99分/5次',
          },
          {
            img: '',
            name: '小王',
            avgScore: '99分/5次',
          },
          {
            img: '',
            name: '小王',
            avgScore: '99分/5次',
          },
          {
            img: '',
            name: '小王',
            avgScore: '99分/5次',
          },
        ],
      },
    };
  },
  computed: {
    selectedTab() {
      return this.currentTab;
    },
  },
  methods: {
    switchTab(e, tabKey) {
      this.currentTab = tabKey;
      console.log(tabKey, 'adsfa');
    },
  },
};
</script>

<style lang="less">
.rank-container {
  .rank-overview {
    position: relative;
    margin-top: 100rpx;
    .rank-avatar {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
    .rank-rst {
      background-color: #FFFFFF;
      width: 640rpx;
      height: 300rpx;
      border: 1px solid rgba(121,121,121,1);
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin: auto;
    }
  }
  .rank-page {
    background-color: #8f949a;
    min-height: 60vh;
    .tabs {
      display: flex;
      justify-content: space-between;
      .tab {
        background-color: #ffffff;
      }
    }
  }
}
</style>
