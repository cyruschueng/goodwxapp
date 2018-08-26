<template>
  <div class="user-logan">
    <div class="pic-logan" ><img class="photo" alt="" :src="userInfo.photo"/></div>
    <div class="name-logan">{{userInfo.userName}}</div>
    <div class="access-logan" style="margin-top:5px">
      <el-popover trigger="hover" placement="bottom">
        <span style="margin-right:5px" v-for="item in accessInfo">{{item.name}}</span>
        <div  slot="reference" class="name-wrapper">
          <span style="fontSize:12px; width:100px" class="el-dropdown-link"  >我的权限<i class="el-icon-arrow-down "></i></span>
        </div>
      </el-popover>
    </div>
    <div class="department-logan">{{userInfo.departmentName}}</div>
    <div  class="connect-logan">
      <div   class="phone">{{ '电话:' + userInfo.phone}}</div>
      <div   class="email">{{ '邮箱:' + userInfo.email}}</div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        accessInfo: [],
        accessInfo1: [{
          name: '全景管理'
        }, {
          name: '空间管理'
        }, {
          name: '专题管理'
        }, {
          name: '发布管理'
        }, {
          name: '拍摄需求'
        }],
        accessInfo2: [{
          name: '全景管理'
        }, {
          name: '空间管理'
        }, {
          name: '专题管理'
        }, {
          name: '发布管理'
        }, {
          name: '三维管理'
        }, {
          name: '业务统计'
        }, {
          name: '拍摄需求'
        }],
        accessInfo3: [{
          name: '全景管理'
        }, {
          name: '空间管理'
        }, {
          name: '专题管理'
        }, {
          name: '发布管理'
        }, {
          name: '三维管理'
        }, {
          name: '业务统计'
        }, {
          name: '拍摄需求'
        }, {
          name: '权限分配'
        }]
      }
    },
    created () {
      if (this.userInfo.roleId === 3) {
        this.accessInfo = this.accessInfo3
      } else if (this.userInfo.roleId === 2) {
        this.accessInfo = this.accessInfo2
      } else {
        this.accessInfo = this.accessInfo1
      }
    },
    mounted () {
    },
    methods: {
    },
    computed: {
      userInfo () {
        return this.$store.state.userInfo
      }
    }
  }
</script>
<style scoped lang="scss" >
  .user-logan{
    width: 40%;
    margin: 0 auto;
    padding: 20px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .pic-logan{
      .photo{
        width:80px;
        height:80px;
        border-radius:11px;
      }
    }
    .name-logan{
      color: white;
    }
    .access-logan{
      span{
        background-color: #ff7f00;
        color: white;
      }
    }
    .department-logan{
      color: white;
      font-size:12px;
      margin-top: 5px
    }
    .connect-logan{
      display: flex;
      align-items: center;
      flex-direction: row;
      text-align: center;
      justify-content: space-between;
      .phone{
        color: white;
        font-size: 12px;
      }
      .email{
        color: white;
        margin-left: 5px;
        font-size: 12px;
      }
    }
  }
</style>
