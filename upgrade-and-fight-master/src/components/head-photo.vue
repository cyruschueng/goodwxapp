<template>
  <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
</template>

<script>
// 头像
export default {
  name: 'headPhoto',
  props: {
    userInfo: Object,
  },
};
</script>

<style lang="less" scoped>
.userinfo-avatar {
    width: 64px;
    height: 64px;
    margin: 10px;
    border-radius: 50%;
  }
</style>


