<template>
  <div class="compagenumber">
    <div  @click.stop>
      <div class="pageLast" :class="{enable: curnumber > 1}" @click.stop='toLast'>
        <div class="el-icon-caret-left" />
      </div>
      <div class="pagenumbercomtainer">
        <div class="pagenumbercell cursor-pointer" 
          v-for='number in numbers' 
          @click.stop='toNumber(number)'
          :class="{active: curnumber == number}"
          v-text="number"
          />
      </div>
      <div class="pageLast" :class="{enable: curnumber < mytotalnumber}" @click.stop='toNext'>
        <div class="el-icon-caret-right" />
      </div>
    </div>
  </div>
</template>
<script>
/**
 * <editableword class="name" :text="word" @text-change="log" @text-change-end="log"/>
 */
export default {
  name: 'compagenumber',
  props: {
    pagenumber: null,
    totalnumber: null
  },
  data () {
    return {
      mytotalnumber: this.totalnumber,
      curnumber: this.pagenumber,
      numbersize: 5, // 显示出多少个number
      numbers: []
    }
  },
  mounted () {
    this.updatestyle()
  },
  methods: {
    updatestyle () {
      let halfsize = Math.floor(this.numbersize / 2)

      let _number = this.curnumber - 1
      let newnumberarr = [this.curnumber]
      let halfindex = 0
      while (_number >= 1 && halfindex < halfsize) {
        newnumberarr.unshift(_number)
        halfindex += 1
        _number -= 1
      }
      halfsize = Math.max(this.numbersize - newnumberarr.length, halfsize)
      _number = this.curnumber + 1
      while (_number <= this.mytotalnumber && newnumberarr.length < this.numbersize) {
        newnumberarr.push(_number)
        _number += 1
      }
      var max = 10
      while (newnumberarr.length < this.numbersize && newnumberarr[0] > 1 && max > 0) {
        newnumberarr.unshift(newnumberarr[0] - 1)
        max--
      }
      this.numbers = newnumberarr
    },
    toLast () {
      let number = this.curnumber
      number -= 1
      this.toNumber(number)
    },
    toNext () {
      let number = this.curnumber
      number += 1
      this.toNumber(number)
    },
    toNumber (number) {
      if (isNaN(number)) {
        number = 1
      }
      if (number < 1) {
        number = 1
      }
      if (number > this.totalnumber) {
        number = this.totalnumber
      }
      // this.curnumber = number
      this.$emit('number-change-to', number)
    }
  },
  watch: {
    curnumber () {
      if (this.pagenumber !== this.curnumber) {
        this.$emit('number-changed', this.curnumber)
      }
      this.updatestyle()
    },
    pagenumber () {
      if (this.pagenumber !== this.curnumber) {
        this.curnumber = this.pagenumber
      }
    },
    totalnumber () {
      if (this.totalnumber !== this.mytotalnumber) {
        this.mytotalnumber = this.totalnumber
      }
      this.updatestyle()
    }
  }
}
</script>

<style lang="scss" scoped>
  $colord3: #d3d3d3;
  $color6f: #6f6f6f;
  $color1b: #1bb1e6;

  .compagenumber{
    display: flex;
    height: 24px;
    justify-content: center;
    >div{
      display: flex;
    }
    .pageLast,.pageNext{
      color:$colord3;
      display: flex;
      align-items: center;
      &.enable{
        cursor: pointer;
        &:hover{
          color: $color6f;
        }
      }
    }
    .pagenumbercomtainer{
      display: flex;
      .pagenumbercell{
        width: 24px;
        height: 24px;
        box-sizing: border-box;
        border:2px solid $colord3;
        margin: 0 3px;
        color: $colord3;
        display: flex;
        justify-content: center;
        align-items: center;
        user-select:none;
        &:hover, &.active{
          border:none;
          background:#1bb1e6;
          color: #fff;
        }
      }
    }
  }
</style>

