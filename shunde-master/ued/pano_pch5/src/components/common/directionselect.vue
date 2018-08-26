<template>
  <div class="directionselect" :style="{width: myWidth + 'px'}">
    <div>
      <input 
        class="header" 
        :class="{'cellDisable': onlyRead}"
        type="number" 
        v-model="myAngle" 
        v-bind:disabled="onlyRead"/>
      <div class="body" :style="{width: myWidth + 'px'}"
          @mousedown.stop="mousedownHandler($event)"
          @mousemove.stop="mousemoveHandler($event)"
          @mouseup.stop="mouseupHandler($event)"
          @mouseout.stop="mouseupHandler($event)">
        <img src="/static/pano/png1-1.png" style="width: 100%;display: block;"/>
        <img class="compassbg user-select-none" src="/static/pano/directioncompass.jpg">
        <img class="compassbg user-select-none" :style="{webkitTransform: 'rotateZ('+myAngle+'deg)',oTransform: 'rotateZ('+myAngle+'deg)',mozTransform: 'rotateZ('+myAngle+'deg)', transform: 'rotateZ('+myAngle+'deg)'}" src="/static/pano/directioncompass-inner.png" >
        <div class="compassbg"/>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'directionselect',
  props: {
    angle: null,
    width: null,
    onlyRead: false
  },
  data () {
    return {
      myWidth: this.width,
      myAngle: isNaN(this.angle) ? 0 : this.angle,
      mousedown: false
    }
  },
  methods: {
    setAngle () {},
    mousedownHandler (e) {
      if (this.onlyRead) {
        return
      }
      this.myAngle = isNaN(this.myAngle) ? 0 : this.myAngle
      let startOffset = this.getOffset(e)
      if (startOffset) {
        this.mousedown = true
        this.mousedownAngle = this.myAngle
        this.mousedownoffset = startOffset
        this.startAngle = this.getAngle(this.mousedownoffset.x - this.mousedownoffset.width / 2, this.mousedownoffset.y - this.mousedownoffset.height / 2)
      }
    },
    mousemoveHandler (e) {
      if (!this.mousedown) {
        return
      }
      let moveoffset = this.getOffset(e)
      if (moveoffset) {
        let curAngle = this.getAngle(moveoffset.x - moveoffset.width / 2, moveoffset.y - moveoffset.height / 2)
        let myAngle = this.toNumber(this.toNumber(this.mousedownAngle) + curAngle - this.startAngle)
        if (myAngle < 0) {
          myAngle += 360
        }
        myAngle %= 360
        // if (myAngle.toFixed) {
        //   myAngle = myAngle.toFixed(2)
        // }
        myAngle = Math.floor(myAngle)
        this.myAngle = myAngle
      }
    },
    mouseupHandler (e) {
      this.mousedown = false
    },
    toNumber (val) {
      return val * 1
    },
    getAngle (x, y) {
      // window.vue = this
      // console.log('x:' + x + ' y:' + y)
      // 获取相对于坐标系圆心的夹角 Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
      var x1 = 0
      var y1 = -1
      var x2 = x
      var y2 = y
      var a = Math.acos((x1 * x2 + y1 * y2) / (Math.sqrt(x1 * x1 + y1 * y1) * Math.sqrt(x2 * x2 + y2 * y2)))
      if (x < 0) {
        a = 2 * Math.PI - a
      }
      return this.$utils.radianToAngle(a)
      // return this.$utils.radianToAngle(Math.acos(x / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))))
    },
    getOffset (e) {
      if (e && e.currentTarget && e.currentTarget.getBoundingClientRect) {
        let bounding = e.currentTarget.getBoundingClientRect()
        return {
          x: e.clientX - bounding.left,
          y: e.clientY - bounding.top,
          width: bounding.width,
          height: bounding.height
        }
      }
      return false
    }
  },
  watch: {
    angle (value) {
      if (this.angle !== this.myAngle) {
        this.myAngle = this.angle
      }
    },
    myAngle () {
      this.$emit('direction-change', this.myAngle)
    }
  }
}
</script>

<style lang="scss" scoped>
  .directionselect{
    input{
      outline: none;
      padding: 0 10px;
    }
    border-radius:3px;
    background: #f8f8f8;
    display: inline-block;
    &>div{
      flex-flow:column nowrap;
      display: flex;
      flex:1;
    }
    .header{
      background: #fff;
      border: solid 1px rgba(0, 0, 0, 0.12);
      height:28px;
    }
    .body{position: relative}
    .compassbg{
      position:absolute;
      width:100%;
      height: 100%;
      left: 0;
      top:0;
    }
  }
</style>

