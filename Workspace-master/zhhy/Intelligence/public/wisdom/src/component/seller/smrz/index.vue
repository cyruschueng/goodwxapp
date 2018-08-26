<template>
  <div class="page-smrz">
    <div class="banner1">
      <img :src="banner1Img">
    </div>
    <div class="list">
      <div class="item clearfix">
        <div class="item-img-box text-center">
          <img :src="listData[0].img" class="item-img">
        </div>
        <div class="item-input-box">
          <input type="text" class="item-input" v-model="name" :placeholder="listData[0].placehold" @focus="inputFocus($event)" @blur="inputBlur($event)"> 
        </div>
      </div>
      <div class="item clearfix">
        <div class="item-img-box text-center">
          <img :src="listData[1].img" class="item-img">
        </div>
        <div class="item-input-box">
          <input type="text" class="item-input" v-model="ads" :placeholder="listData[1].placehold" @focus="inputFocus($event)" @blur="inputBlur($event)">
        </div>
      </div>
      <div class="item clearfix">
        <div class="item-img-box text-center">
          <img :src="listData[2].img" class="item-img">
        </div>
        <div class="item-input-box">
          <div class="item-input" @click="showType">
              {{types}}
          </div>
        </div>
      </div>
      <div class="item clearfix">
        <div class="item-img-box text-center">
          <img :src="listData[3].img" class="item-img">
        </div>
        <div class="item-input-box">
          <input type="text" class="item-input" v-model="person" :placeholder="listData[3].placehold" @focus="inputFocus($event)" @blur="inputBlur($event)">
        </div>
      </div>
      <div class="item clearfix">
        <div class="item-img-box text-center">
          <img :src="listData[4].img" class="item-img">
        </div>
        <div class="item-input-box">
          <input type="tel" class="item-input" v-model="phone" :placeholder="listData[4].placehold" @focus="inputFocus($event)" @blur="inputBlur($event)">
        </div>
      </div>
      <div class="item clearfix">
        <div class="item-img-box text-center">
          <img :src="listData[5].img" class="item-img">
        </div>
        <div class="item-input-box">
          <input type="text" class="item-input" v-model="serviceName" :placeholder="listData[5].placehold" @focus="inputFocus($event)" @blur="inputBlur($event)">
        </div>
      </div>
      <div class="item clearfix">
        <div class="item-img-box text-center">
          <img :src="listData[6].img" class="item-img">
        </div>
        <div class="item-input-box">
          <input type="tel" class="item-input" v-model="service" :placeholder="listData[6].placehold" @focus="inputFocus($event)" @blur="inputBlur($event)">
        </div>
      </div>
      <div class="item clearfix">
        <div class="item-img-box text-center">
          <img :src="listData[7].img" class="item-img">
        </div>
        <div class="item-input-box" style="width: 50%;">
          <input type="text" class="item-input" v-model="valinum" :placeholder="listData[7].placehold" @focus="inputFocus($event)" @blur="inputBlur($event)">
        </div>
        <div style="width: 30%;" class="text-center">
          <img :src="valiImg" class="vali-img" @click="getVali">
        </div>
      </div>
    </div>
    <bannerBtn name="tjsh" v-on:commit="submit"></bannerBtn>
  </div>  
</template>

<script>
import topNav from '../../topNav.vue'
import bannerBtn from '../../bannerBtn.vue'

export default {
  components: { topNav, bannerBtn },
  data() {
    return {
      banner1Img: config.picURL.smrzBanner1,
      listData: config.smrzList,
      name: this.$store.state.smrzData.name || '',
      ads: this.$store.state.smrzData.ads || '',
      types: this.$store.state.smrzData.types || '经营范围(必选)',
      typeIDs: this.$store.state.smrzData.typeIDs || '',
      person: this.$store.state.smrzData.person || '',
      phone: this.$store.state.smrzData.phone || '',
      service: this.$store.state.smrzData.service || '',
      valinum: '',
      serviceName: this.$store.state.smrzData.serviceName || '',
      valiImg: '',
      rzStatu: 0,
      openID: window.localStorage.getItem('zhhy_openid'),
      userID: window.localStorage.getItem('zhhy_user_id')
    }
  },
  mounted (){},
  methods: {
    inputFocus: function(event){
      ZHHY.smrz.inputOn(event)
    },
    inputBlur: function(event){
      ZHHY.smrz.inputOff(event)
    },
    submit: function(){
      var vm = this
      ZHHY.smrz.submit(vm)
    },
    showType: function(){
      var vm = this
      ZHHY.smrz.showType(vm)
    },
    getVali: function(){
      var vm = this
      ZHHY.smrz.getVali(vm)
    }
  },
  beforeMount: function(){
    var vm = this
    ZHHY.smrz.getUserByOpenID(vm)
    ZHHY.smrz.getVali(vm)
  }
}
</script>