Component({
  behaviors: [],
  properties: {
    mainOperation: Object,
    subOperation: Array,
  },
  data: {
    subOperation: [
      {
        id: 1,
        eventName: '_toIndex',
        picUrl: '/img/icon-fenxiang@2x.png',
        text: "test"
      },
      {
        id: 2,
        eventName: '_toIndex',
        picUrl: '/img/icon-fenxiang@2x.png',
        text: '删除'
      },
      {
        id: 3,
        eventName: '_toIndex',
        picUrl: '/img/icon-fenxiang@2x.png',
        text: '编辑'
      },
      {
        id: 4,
        eventName: '_toIndex',
        picUrl: '/img/icon-fenxiang@2x.png',
        text: '私密性设置'
      }
    ],
    mainOperation: {
      value: '分享'
    }
  },
  attached: function (e) {
    console.log(this)
  },
  detached: function () {
  },
  methods: {
    _toIndex(){
      this.checkFunc('_toIndex')
      app.href('/pages/discoverProject/discoverProject')
      this.triggerEvent()
    },
    checkFunc(funcName){
      this.data.subOperation.forEach(x=>{
        if(x.func){
          if(x.eventName == funcName){
            x.func()
          }
        }
      })
    }
  }
})