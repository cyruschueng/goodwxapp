<template>
  <div class="i-container">
    <img src="/static/direction.png" class="photo"/>
    <div class="item1">
      <div class="north-btn" @click="northClick"></div>
    </div>
    <div class="item2">
      <div class="west-btn" @click="westClick"></div>
      <div class="east-btn" @click="eastClick"></div>
    </div>
    <div class="item3">
      <div class="south-btn" @click="southClick"></div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'direction',
    props: {
      imageUrl: String
    },
    data () {
      return {
        url: this.imageUrl
      }
    },
    created () {
    },
    methods: {
      northClick () {
        this.$emit('northclick')
      },
      westClick () {
        this.$emit('westclick')
      },
      eastClick () {
        this.$emit('eastclick')
      },
      southClick () {
        this.$emit('southclick')
      }
    },
    watch: {
      imageUrl (value) {
        this.url = value
      }
    },
    computed: {},
    components: {}
  }
</script>
<style lang="scss">
  .i-container {
    width: 120px;
    height: 98px;
    z-index: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    .photo {
      width: 100%;
      height: 100%;
      position: absolute;
    }
    .item1 {
      margin-top: 19%;
      height: 14%;
      display: flex;
      flex-direction: row;
      z-index: 50;
      justify-content: center;
      .north-btn {
        width: 25%;
      }
    }
    .item2 {
      height: 15%;
      display: flex;
      z-index: 50;
      flex-direction: row;
      justify-content: space-between;
      .west-btn {
        width: 40%;
      }
      .east-btn {
        width: 40%;
      }
    }
    .item3 {
      height: 37%;
      display: flex;
      z-index: 50;
      flex-direction: row;
      justify-content: center;
      .south-btn {
        width: 30%;
      }
    }

  }


</style>
