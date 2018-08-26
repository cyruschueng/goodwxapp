<template>
  <div class="toast toastrunend">
    <div class="wordp ab">
      <!--closebtn-->
      <div class="closebtn ab" @click="closeyuyue"><img src="./../assets/images/r_closebtn.png"></div>
      <!--word-->
      <div class="word ab">
        <img class="re tbg" src="./../assets/images/r_toastformbg.png">
        <!--form-->
        <div class="form-con ab">
          <input class="name-li" v-model="uname" type="text" placeholder="请输入您的姓名">
          <select class="sexy-li" v-model="sel_sexy" @change="chooseSexy">
            <option value="">请选择您的性别</option>
            <option value="boy">男</option>
            <option value="girl">女</option>
          </select>
          <input class="phone-li" v-model="uphone" type="number" placeholder="请输入您的号码">
          <input class="address-li" type="text" v-model="uaddress" placeholder="请输入您的联系地址">
          <select class="yifu-li" v-model="sel_yifi" v-html="yifuOption"></select>
          <select class="shoes-li" v-model="sel_shoes" v-html="shoeOption"></select>
        </div>
        <!--提交按钮-->
        <div class="tjbtn ab" @click="tjmes">
          <img class="quanimg" src="./../assets/images/r_messurebtn.png">
        </div>
        <!--修改按钮-->
        <div v-show="actInfo.isfulled" class="updatebtn ab" @click="tjmes">
          <img class="quanimg" src="./../assets/images/r_updatebtn.png">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  name: 'Toastyuyue',
  components:{
  },
  data () {
    return {
      uname:'',
      sel_sexy:'',
      uphone:'',
      uaddress:'',
      sel_yifi:'',
      sel_shoes:'',
      yifuOption:"<option value=''>请选择您的衣服尺码</option><option value='XS'>XS</option><option value='S'>S</option><option value='M'>M</option><option value='L'>L</option><option value='XL'>XL</option>",
      shoeOption:"<option value=''>请选择您的鞋子尺码</option><option value='35'>35</option><option value='36'>36</option><option value='37'>37</option><option value='38'>38</option><option value='39'>39</option>",
    }
  },
  methods: {
    chooseSexy(){
      console.log(this.sel_sexy);
      this.sel_yifi='';
      this.sel_shoes='';
      if(this.sel_sexy=='boy'){
        this.yifuOption="<option value=''>请选择您的衣服尺码</option><option value='S'>S</option><option value='M'>M</option><option value='L'>L</option><option value='XL'>XL</option><option value='2XL'>2XL</option>";
        this.shoeOption="<option value=''>请选择您的鞋子尺码</option><option value='39'>39</option><option value='40'>40</option><option value='41'>41</option><option value='42'>42</option><option value='43'>43</option><option value='44'>44</option>";
      }else if(this.sel_sexy=='girl'){
        this.yifuOption="<option value=''>请选择您的衣服尺码</option><option value='XS'>XS</option><option value='S'>S</option><option value='M'>M</option><option value='L'>L</option><option value='XL'>XL</option>";
        this.shoeOption="<option value=''>请选择您的鞋子尺码</option><option value='35'>35</option><option value='36'>36</option><option value='37'>37</option><option value='38'>38</option><option value='39'>39</option>";
      }else if(this.sel_sexy==''){

      }
    },
    closeyuyue(){
      this.$store.dispatch('showBaominToast',{isShowyuyue:false});
    },
    tjmes(){
      var Reg = {
        phoneReg: /^1\d{10}$/,
      }
      if(!this.uname || !this.sel_sexy || !this.uaddress || !this.sel_yifi || !this.sel_shoes || !this.uphone){
        return this.setDialog({time: 2000, msg: '信息填写不能为空哦！'})
      }
      if( !Reg.phoneReg.test(this.uphone) ){
        return this.setDialog({time: 2000, msg: '请填写正确的手机号！'})
      }

      var dataObj={
        name:this.uname,
        sexy:this.sel_sexy,
        phone:this.uphone,
        address:this.uaddress,
        size_cloth:this.sel_yifi,
        size_shoe:this.sel_shoes,
      };
      console.log(dataObj);
      this.$store.dispatch('baoming',dataObj);
    },
    ...mapActions({
      setDialog: 'setDialog',
      setMum: 'setMum'
    })
  },
  computed: {
    ...mapGetters({
      actInfo: 'actInfo',
      isShowyuyue:'isShowyuyue',
    }),
  },
  mounted: function () {

    if(this.actInfo.is_fulled){
      this.uname=this.actInfo.info.name;
      this.sel_sexy=this.actInfo.info.sexy;
      this.uphone=this.actInfo.info.phone;
      this.uaddress=this.actInfo.info.address;
      if(this.actInfo.info.sexy == 'boy'){
        this.yifuOption="<option value=''>请选择您的衣服尺码</option><option value='S'>S</option><option value='M'>M</option><option value='L'>L</option><option value='XL'>XL</option><option value='2XL'>2XL</option>";
        this.shoeOption="<option value=''>请选择您的鞋子尺码</option><option value='39'>39</option><option value='40'>40</option><option value='41'>41</option><option value='42'>42</option><option value='43'>43</option><option value='44'>44</option>";
      }else if(this.actInfo.info.sexy == 'girl'){
        this.yifuOption="<option value=''>请选择您的衣服尺码</option><option value='XS'>XS</option><option value='S'>S</option><option value='M'>M</option><option value='L'>L</option><option value='XL'>XL</option>";
        this.shoeOption="<option value=''>请选择您的鞋子尺码</option><option value='35'>35</option><option value='36'>36</option><option value='37'>37</option><option value='38'>38</option><option value='39'>39</option>";
      }
      this.sel_yifi=this.actInfo.info.size_cloth;
      this.sel_shoes=this.actInfo.info.size_shoe;
    }

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" scoped lang="scss">
  .wordp{
    top: 50%;
    left: 50%;
    width: 600px;
    height: 642px;
    position: absolute;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    .word{
      width: 600px;
      height: 642px;
      .tbg{
        width: 600px;
        height: 642px;
      }
      .form-con{
        width: 330px;
        height: 350px;
        top:56px;
        left: 180px;
        select{
          width: 330px;
          height: 50px;
          font-size: 24px;
          line-height: 50px;
          color: #7095f3;
          border: none;
          border-radius: 0;
          background: transparent;
          box-shadow:none;
          -webkit-box-shadow:none;
          -moz-box-shadow:none;
          -webkit-appearance:none;
        }
        select:focus{
          color: white;
          color: #7095f3;
          background: transparent;
          outline:none;
          border: none;
          box-shadow:none;
          -webkit-box-shadow:none;
          -moz-box-shadow:none;
          -webkit-appearance:none;
        }
        /*select option:checked { color: white}*/
        input{
          color: white;
          width: 330px;
          font-size: 24px;
          height: 50px;
          line-height: 50px;
          border:none;
          background: transparent;
          color: #7095f3;
        }
        input:focus{
          color: white;
          background: transparent;
          outline:none;
          border: none;
          box-shadow:none;
          -webkit-box-shadow:none;
          -moz-box-shadow:none;
          -webkit-appearance:none;
          color: #7095f3;
        }
        input::-webkit-input-placeholder{
          color: #7095f3;
        }

        .name-li{
          margin-top: 0px;
        }
        .sexy-li{
          margin-top: 10px;
        }
        .phone-li{
          margin-top: 10px;
        }
        .address-li{
          margin-top: 10px;
        }
        .shoes-li{
          margin-top: 10px;
        }
        .yifu-li{
          margin-top: 10px;
        }
      }

      .tjbtn{
        width: 260px;
        height: 70px;
        top:520px;
        left: 170px;
      }
      .updatebtn{
        width: 260px;
        height: 70px;
        top:520px;
        left: 170px;
      }
    }
  }

  /*关闭按钮*/
  .closebtn{
    width: 30px;
    height: 30px;
    right: 10px;
    top:10px;
    z-index: 4;
    img{
      width: 100%;
    }
  }
</style>
