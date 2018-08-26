// pages/relation/relation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      list:[
        {
          title:'同学/老师',
          active: false,
          inx:0,
          types: [
              {
                title:'同学',
                active:false,
                inx:0
              },
              {
                title: '大学同学',
                active: false
              }, {
                title: '高中同学',
                active: false
              }, {
                title: '初中同学',
                active: false
              }, {
                title: '小学同学',
                active: false
              }, {
                title: '研究生同学',
                active: false
              }, {
                title: '老师',
                active: false
              }, {
                title: '导师',
                active: false
              }, {
                title: '学生',
                active: false
              }
            ]
        },
        {
          title: '朋友/恋人',
          active: false,
           inx:1,
          types: [
              {
                title: '导师',
                active: false
              }, {
                title: '朋友',
                active: false
              }, {
                title: '恋人',
                active: false
              }, {
                title: '情人',
                active: false
              }, {
                title: '密友',
                active: false
              }, {
                title: '死党',
                active: false
              }, {
                title: '闺密',
                active: false
              }, {
                title: '多年好友',
                active: false
              }, {
                title: '玩伴',
                active: false
              }, {
                title: '知己',
                active: false
              }, {
                title: '老友',
                active: false
              }, {
                title: '战友',
                active: false
              }
          ]
        },
        {
          title: '家人/亲戚',
          active: false,
          inx: 2,
          types: [
            {
              title: '老婆',
              active: false
            }, {
              title: '老公',
              active: false
            }, {
              title: '亲戚',
              active: false
            }, {
              title: '家人',
              active: false
            }, {
              title: '母亲',
              active: false
            }, {
              title: '父亲',
              active: false
            }, {
              title: '岳母',
              active: false
            }, {
              title: '岳父',
              active: false
            }, {
              title: '公公',
              active: false
            }, {
              title: '婆婆',
              active: false
            }, {
              title: '女儿',
              active: false
            }, {
              title: '儿子',
              active: false
            }, {
              title: '儿媳',
              active: false
            }, {
              title: '女婿',
              active: false
            }, {
              title: '姐姐',
              active: false
            }, {
              title: '妹妹',
              active: false
            }, {
              title: '哥哥',
              active: false
            }, {
              title: '弟弟',
              active: false
            }, {
              title: '爷爷',
              active: false
            }, {
              title: '外公',
              active: false
            }, {
              title: '奶奶',
              active: false
            }, {
              title: '外婆',
              active: false
            }, {
              title: '孙子',
              active: false
            }, {
              title: '外孙',
              active: false
            }, {
              title: '孙女',
              active: false
            }, {
              title: '外孙女',
              active: false
            }
          ]
        },
        {
          title: '同事/伙伴',
          active:false,
          inx: 3,
          types: [
            {
              title: '同事',
              active: false
            }, {
              title: '合作伙伴',
              active: false
            }, {
              title: '合伙人',
              active: false
            }, {
              title: '领导',
              active: false
            }, {
              title: '下属',
              active: false
            }, {
              title: '商业合作',
              active: false
            }, {
              title: '客户',
              active: false
            }
          ]
        }
      ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },
  save(){
    console.log("save");
    let that = this;
    let list = that.data.list;
    let keyword = [];
    for(let i = 0;i<list.length;i++){
      for (let j = 0; j < list[i].types.length; j++){
        if (list[i].types[j].active == true){
          keyword.push(list[i].types[j].title);
        }
      }
    }
    wx.setStorageSync('keyword', keyword);
    wx.navigateBack({
      url: '../findAdd/findAdd'
    })
  },
  del(e){
      let that = this;
      let list = that.data.list;
      let friendIndex = e.currentTarget.dataset.friendindex;
      let index = e.currentTarget.dataset.index;
      list[friendIndex].types[index].active = !list[friendIndex].types[index].active;
      that.setData({
        list: list
      })
  },
  // group
  group(e){
      let that = this;
      let list = that.data.list;
      let active = e.currentTarget.dataset.active;
      let groupidx = e.currentTarget.dataset.groupidx;
      list[groupidx].active;
      that.setData({
        list:list,
        nowIndex: groupidx
      })
  },
  checked(e){
      console.log(e);
      let that = this;
      let list = that.data.list;
      let active = e.currentTarget.dataset.active;
      let friendIndex = e.target.dataset.friendindex; //父
      let index = e.currentTarget.dataset.index;
      let arr = that.data.arr;
      console.log(active, index, friendIndex);
      list[friendIndex].types[index].active = !list[friendIndex].types[index].active;
      setTimeout(function(){
          that.setData({
            list
          })
      },20)
  }

})