//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
     activeColor: '#ffc935',
    char_lt:">",    //选好了的符号
    array:[
      {
        name:"新品推荐",
        imgSrc:"../../images/tea3.jpg"
      },
       {
         name: "星厨系列",
         imgSrc: "../../images/tea3.jpg"
      },
       {
         name: "经典套餐",
         imgSrc: "../../images/tea3.jpg"
       },
       {
         name: "开心儿童套餐",
         imgSrc: "../../images/tea3.jpg"
       },
       {
         name: "小食甜品",
         imgSrc: "../../images/tea3.jpg"
       },
       {
         name: "主食",
         imgSrc: "../../images/tea2.jpg"
       }
    ],
    teaArray: [
      {
        aId: "list0",
        listArr: [
          {
            teaName: '鲜花抹茶1',
            moneyCode: "￥",
            imgSrc: '../../images/tea4.jpg',
            money: 17,
            star: '*',
            sizeId: 0,
            sizeArr: [
              {
                cupZize: '大杯',
                del: '-',
                num: 0,
                add: '+',
                money:22
              },
              {
                cupZize: '中杯',
                del: '-',
                num: 0,
                add: '+',
                money: 19
              },
              {
                cupZize: '小杯',
                del: '-',
                num: 0,
                add: '+',
                money: 17
              }
            ]
          }

        ]
      },
      {
        aId: "list1",
        listArr: [
          {
            teaName: '鲜奶抹茶1',
            imgSrc: '../../images/tea3.jpg',
            moneyCode: "￥",
            money: 17,
            sizeId: 0,
            star: '*',
            sizeArr: [
              {
                cupZize: '大杯',
                del: '-',
                num: 0,
                add: '+',
                monty: '',
                money: 22
              },
              {
                cupZize: '中杯',
                del: '-',
                num: 0,
                add: '+',
                monty: '',
                money: 19
              },
              {
                cupZize: '小杯',
                del: '-',
                num: 0,
                add: '+',
                money: 17
              }
            ]
          },
          {
            teaName: '柠檬绿',
            moneyCode: "￥",
            imgSrc: '../../images/tea1.jpg',
            money: 17,
            star: '*',
            sizeId: 1,
            sizeArr: [
              {
                cupZize: '大杯',
                del: '-',
                num: 0,
                add: '+',
                money: 22
              },
              {
                cupZize: '中杯',
                del: '-',
                num: 0,
                add: '+',
                money: 19
              },
              {
                cupZize: '小杯',
                del: '-',
                num: 0,
                add: '+',
                money: 17
              }
            ]
          },
          {
            teaName: '烧仙草',
            moneyCode: "￥",
            imgSrc: '../../images/tea2.jpg',
            money: 17,
            star: '*',
            sizeId: 2,
            sizeArr: [
              {
                cupZize: '大杯',
                del: '-',
                num: 0,
                add: '+',
                money: 22
              },
              {
                cupZize: '中杯',
                del: '-',
                num: 0,
                add: '+',
                money: 19
              },
              {
                cupZize: '小杯',
                del: '-',
                num: 0,
                add: '+',
                money: 17
              }
            ]
          },
          {
            teaName: '鲜花抹茶2',
            moneyCode: "￥",
            imgSrc: '../../images/tea4.jpg',
            money: 17,
            star: '*',
            sizeId: 3,
            sizeArr: [
              {
                cupZize: '大杯',
                del: '-',
                num: 0,
                add: '+',
                money:22
              },
              {
                cupZize: '中杯',
                del: '-',
                num: 0,
                add: '+',
                money: 19
              },
              {
                cupZize: '小杯',
                del: '-',
                num: 0,
                add: '+',
                money: 17
              }
            ]
          },
          {
            teaName: '鲜花抹茶3',
            moneyCode: "￥",
            imgSrc: '../../images/tea4.jpg',
            money: 17,
            star: '*',
            sizeId: 4,
            sizeArr: [
              {
                cupZize: '大杯',
                del: '-',
                num: 0,
                add: '+',
                money: 22
              },
              {
                cupZize: '中杯',
                del: '-',
                num: 0,
                add: '+',
                money: 19
              },
              {
                cupZize: '小杯',
                del: '-',
                num: 0,
                add: '+',
                money:17
              }
            ]
          },
          {
            teaName: '鲜花抹茶4',
            moneyCode: "￥",
            imgSrc: '../../images/tea4.jpg',
            money: 17,
            star: '*',
            sizeId: 5,
            sizeArr: [
              {
                cupZize: '大杯',
                del: '-',
                num: 0,
                add: '+',
                money: 22
              },
              {
                cupZize: '中杯',
                del: '-',
                num: 0,
                add: '+',
                money: 19
              },
              {
                cupZize: '小杯',
                del: '-',
                num: 0,
                add: '+',
                money: 17
              }
            ]
          },
          {
            teaName: '鲜花抹茶5',
            moneyCode: "￥",
            imgSrc: '../../images/tea4.jpg',
            money: 17,
            star: '*',
            sizeId: 6,
            sizeArr: [
              {
                cupZize: '大杯',
                del: '-',
                num: 0,
                add: '+',
                money: 22
              },
              {
                cupZize: '中杯',
                del: '-',
                num: 0,
                add: '+',
                money: 19
              },
              {
                cupZize: '小杯',
                del: '-',
                num: 0,
                add: '+',
                money: 17
              }
            ]
          },
          {
            teaName: '鲜花抹茶6',
            moneyCode: "￥",
            imgSrc: '../../images/tea4.jpg',
            money: 17,
            star: '*',
            sizeId: 7,
            sizeArr: [
              {
                cupZize: '大杯',
                del: '-',
                num: 0,
                add: '+',
                money: 22
              },
              {
                cupZize: '中杯',
                del: '-',
                num: 0,
                add: '+',
                money: 19
              },
              {
                cupZize: '小杯',
                del: '-',
                num: 0,
                add: '+',
                money: 17
              }
            ]
          }
        ]
      },
      {
        aId: "list2",
        listArr: [
          {
            teaName: '鲜花抹茶7',
            moneyCode: "￥",
            imgSrc: '../../images/tea4.jpg',
            money: 17,
            star: '*',
            sizeId: 0,
            sizeArr: [
              {
                cupZize: '大杯',
                del: '-',
                num: 0,
                add: '+',
                money: 22
              },
              {
                cupZize: '中杯',
                del: '-',
                num: 0,
                add: '+',
                money: 19
              },
              {
                cupZize: '小杯',
                del: '-',
                num: 0,
                add: '+',
                money: 17
              }
            ]
          },
          {
            teaName: '鲜花抹茶8',
            moneyCode: "￥",
            imgSrc: '../../images/tea4.jpg',
            money: 17,
            star: '*',
            sizeId: 1,
            sizeArr: [
              {
                cupZize: '大杯',
                del: '-',
                num: 0,
                add: '+',
                money: 22
              },
              {
                cupZize: '中杯',
                del: '-',
                num: 0,
                add: '+',
                money: 19
              },
              {
                cupZize: '小杯',
                del: '-',
                num: 0,
                add: '+',
                money: 17
              }
            ]
          }
        ]
      },
      {
        aId: "list3",
        listArr: [
          {
            teaName: '鲜花抹茶9',
            moneyCode: "￥",
            imgSrc: '../../images/tea4.jpg',
            money: 17,
            star: '*',
            sizeId: 0,
            sizeArr: [
              {
                cupZize: '大杯',
                del: '-',
                num: 0,
                add: '+',
                money: 22
              },
              {
                cupZize: '中杯',
                del: '-',
                num: 0,
                add: '+',
                money: 19
              },
              {
                cupZize: '小杯',
                del: '-',
                num: 0,
                add: '+',
                money: 17
              }
            ]
          },
          {
            teaName: '鲜花抹茶10',
            moneyCode: "￥",
            imgSrc: '../../images/tea4.jpg',
            money: 17,
            star: '*',
            sizeId: 1,
            sizeArr: [
              {
                cupZize: '大杯',
                del: '-',
                num: 0,
                add: '+',
                money: 22
              },
              {
                cupZize: '中杯',
                del: '-',
                num: 0,
                add: '+',
                money: 19
              },
              {
                cupZize: '小杯',
                del: '-',
                num: 0,
                add: '+',
                money: 17
              }
            ]
          }

        ]
      },
      {
        aId: "list4",
        listArr: [
          {
            teaName: '鲜花抹茶11',
            moneyCode: "￥",
            imgSrc: '../../images/tea4.jpg',
            money: 17,
            star: '*',
            sizeId: 0,
            sizeArr: [
              {
                cupZize: '大杯',
                del: '-',
                num: 0,
                add: '+',
                money: 22
              },
              {
                cupZize: '中杯',
                del: '-',
                num: 0,
                add: '+',
                money: 19
              },
              {
                cupZize: '小杯',
                del: '-',
                num: 0,
                add: '+',
                money: 17
              }
            ]
          },
          {
            teaName: '鲜花抹茶12',
            moneyCode: "￥",
            imgSrc: '../../images/tea4.jpg',
            money: 17,
            star: '*',
            sizeId: 1,
            sizeArr: [
              {
                cupZize: '大杯',
                del: '-',
                num: 0,
                add: '+',
                money: 22
              },
              {
                cupZize: '中杯',
                del: '-',
                num: 0,
                add: '+',
                money: 19
              },
              {
                cupZize: '小杯',
                del: '-',
                num: 0,
                add: '+',
                money: 17
              }
            ]
          }
        ]
      },
      {
        aId: "list5",
        listArr: [
          {
            teaName: '鲜花抹茶13',
            moneyCode: "￥",
            imgSrc: '../../images/tea4.jpg',
            money: 17,
            star: '*',
            sizeId:0,
            sizeArr: [
              {
                cupZize: '大杯',
                del: '-',
                num: 0,
                add: '+',
                money: 22
              },
              {
                cupZize: '中杯',
                del: '-',
                num: 0,
                add: '+',
                money: 19
              },
              {
                cupZize: '小杯',
                del: '-',
                num: 0,
                add: '+',
                money: 17
              }
            ]
          },
          {
            teaName: '鲜花抹茶14',
            moneyCode: "￥",
            imgSrc: '../../images/tea4.jpg',
            money: 17,
            star: '*',
            sizeId: 1,
            sizeArr: [
              {
                cupZize: '大杯',
                del: '-',
                num: 0,
                add: '+',
                money: 22
              },
              {
                cupZize: '中杯',
                del: '-',
                num: 0,
                add: '+',
                money: 19
              },
              {
                cupZize: '小杯',
                del: '-',
                num: 0,
                add: '+',
                money: 17
              }
            ]
          }

        ]
      },
    ],
    toView:"eeq",
    crlTure:false,            // 无控制
    ifIndex:0,                //控制左边导航样式,
    carts: [],                // 购物车列表
    hasList: false,           // 列表是否有数据
    totalPrice: 0,            // 总价，初始为0
    totalDetail:false,        //显示总价详情和蒙版
    numTotal:0,               //显示总数目
    priceCar:false,           //购物车的显示
    detailTetx:"详情名字",      //价格详情的名字 
    detailPrice: 0,            //价格详情的价格
    detailNum:0,                //价格详情的数目
    detailArray:[]
  },
  jumpTo:function(e){         //跳转到具体的页面导航
    // 获取标签元素上自定义的 data-opt 属性的值
    let target = e.currentTarget.dataset.opt;   //list+*index
    this.setData({
      toView: target,
      crlTure:true,
      ifIndex: target.split("t")[1]            //字符串切割获取
    })
  },
  //计算总的数量
  getTotalPrice() {
    let that = this;
    let teaArray = this.data.teaArray;                                           // 获取数据列表   
    let detailArray = this.data.detailArray;                                     // 获取数据列表
    let len = 0;
    let totalNum = 0
    let numTotal = 0, totalPrice = 0;
    for (let i = 0; i < teaArray.length; i++) {                            // 循环列表得到每个数据   第一层遍历
      for (let j = 0; j < teaArray[i].listArr.length; j++) {               //循环列表得到每个数据   第二层遍历
        for (let k = 0; k < teaArray[i].listArr[j].sizeArr.length; k++) {  //循环列表得到每个数据   第三层遍历
        //  numTotal += teaArray[i].listArr[j].sizeArr[k].num;                //进行总额相加
        //  totalPrice += teaArray[i].listArr[j].sizeArr[k].num * teaArray[i].listArr[j].money    // 假设价格一致
        totalPrice += teaArray[i].listArr[j].sizeArr[k].num * teaArray[i].listArr[j].sizeArr[k].money    // 不一致时候需要更改数据
         for (let a = 0; len = detailArray.length, a < len; a++) {
           if (detailArray[a].name.split('杯')[1] == teaArray[i].listArr[j].teaName){    //切割生成的价格详情名字
             if (detailArray[a].name.split('杯')[0] + "杯" == teaArray[i].listArr[j].sizeArr[k].cupZize){
               teaArray[i].listArr[j].sizeArr[k].num = detailArray[a].num ;
            }
           }
         }
       
        }
      }
    }
    // console.log(teaArray)
    if (numTotal == 0){                                                     //当总数为0时候   隐藏购物车
      that.setData({   
        priceCar: false
      })
    }else{
      that.setData({ 
        priceCar: true
      })
    } 
    that.setData({                                                         // 最后赋值到data中渲染到页面
      numTotal: numTotal,                                                  //总数量
      totalPrice: totalPrice.toFixed(2),                                    //总价格
      teaArray:teaArray,
    });
  },
 //点击蒙版时候让总价详情隐藏
  showDetail:function(){                                                  
    let that = this;
    if (that.data.totalDetail){
      that.setData({
        totalDetail:false
      })
    }
  },
  // 增加数量
  addCount(e) {                                              //分别获取所有数组的index值  
    const index = e.currentTarget.dataset.index, i = e.currentTarget.dataset.lis.split("t")[1], j = e.currentTarget.dataset.lit;
    let teaArray = this.data.teaArray;                       //获取到数据
    let detailArray = this.data.detailArray;                 
    let num = teaArray[i].listArr[j].sizeArr[index].num;     //获取具体杯型的数量
    //console.log(teaArray[i].listArr[j].sizeArr[index]);      //获取到杯型 还有价格
    // detailArray.name = teaArray[i].listArr[j].sizeArr[index].cupZize + teaArray[i].listArr[j].teaName;
    // detailArray.price = teaArray[i].listArr[j].money;
    // detailArray.num = teaArray[i].listArr[j].sizeArr[index].num + 1;
    // console.log(teaArray[i].listArr[j].sizeArr[index].cupZize + teaArray[i].listArr[j].teaName)
    num = num + 1;                                           //添加数量

    teaArray[i].listArr[j].sizeArr[index].num = num;         //赋值给具体杯型的数量 
    detailArray.push({
        name: teaArray[i].listArr[j].sizeArr[index].cupZize + teaArray[i].listArr[j].teaName,
        //price: teaArray[i].listArr[j].money,    //价格一致时候
        price: teaArray[i].listArr[j].sizeArr[index].money,    //价格一致时候
        num: teaArray[i].listArr[j].sizeArr[index].num
    })
    function arrayUnique(arr, name) {      //去重数组  保留添加那个
      let hash = {};
      return arr.reduce(function (item, next) {
        hash[next[name]] ? '' : hash[next[name]] = true && item.push(next);
        return item;
      }, []);
    }
    
    this.setData({
      teaArray: teaArray,                                   //重新更新数据
      detailArray: arrayUnique(detailArray.reverse(), "name")                         
    });
    this.getTotalPrice();                                    //无论添加还是减少都要调用总价的方法
    this.getDetailPrice(); 
  },
  // 减少数量
  minusCount(e) {                                           //具体看添加数量的注释  同理
    const index = e.currentTarget.dataset.index, i = e.currentTarget.dataset.lis.split('t')[1], j = e.currentTarget.dataset.lit;
    let teaArray = this.data.teaArray;
    let detailArray = this.data.detailArray;  
    let num = teaArray[i].listArr[j].sizeArr[index].num;
    if (num < 1) {
      return false;
    }
    num = num - 1;

    teaArray[i].listArr[j].sizeArr[index].num = num;         //赋值给具体杯型的数量 
    detailArray.push({
      name: teaArray[i].listArr[j].sizeArr[index].cupZize + teaArray[i].listArr[j].teaName,
      //price: teaArray[i].listArr[j].money,                 //价格一致时候
      price: teaArray[i].listArr[j].sizeArr[index].money,    //价格不一致时候
      num: teaArray[i].listArr[j].sizeArr[index].num
    })
    console.log(detailArray)
    function arrayUnique(arr, name) {              //去重数组  保留添加那个
      let hash = {};
      return arr.reduce(function (item, next) {
        hash[next[name]] ? '' : hash[next[name]] = true && item.push(next);
        return item;
      }, []);
    }


    this.setData({
      teaArray: teaArray,
      detailArray: arrayUnique(detailArray.reverse(), "name")  
    });
    this.getTotalPrice();
    this.getDetailPrice(); 

  },
  //计算详情总的数量 和 价格
  getDetailPrice() {
    let that = this;
    let detailArray = this.data.detailArray;               // 获取数据列表
    let numTotal = 0, totalPrice = 0;
    for (let i = 0; i < detailArray.length; i++) {        // 循环列表得到每个数据   第一层遍历
      numTotal += detailArray[i].num;                     //总的数量    
      totalPrice += detailArray[i].num * detailArray[i].price                     
    }
  
    this.setData({
      numTotal: numTotal,                                //总数量
      totalPrice: totalPrice.toFixed(2)                  //总价格
    })
    if (numTotal == 0) {                                                     //当总数为0时候   隐藏购物车
      that.setData({
        priceCar: false,
        totalDetail:false
      })
    } else {
      that.setData({
        priceCar: true,
      })
    }
  },
  // 详情总价增加数量
  detailAdd(e) {                                                   //分别获取所有数组的index值  
    const index = e.currentTarget.dataset.index;
    let detailArray = this.data.detailArray;                       //获取到数据
    let num = detailArray[index].num;                              //获取具体杯型的数量
    num = num + 1;                                                 //添加数量
    detailArray[index].num = num;                                  //赋值给具体杯型的数量
    this.setData({
      detailArray: detailArray                                     //重新更新数据
    });
    this.getTotalPrice()
    this.getDetailPrice();                                          //无论添加还是减少都要调用总价的方法
  
  },
  // 详情总价减少数量
  detailMinus(e) {                                                  //具体看添加数量的注释  同理
    const index = e.currentTarget.dataset.index;
    let detailArray = this.data.detailArray;
    let num = detailArray[index].num;
    if (num < 1) {
      return false;
    }
    num = num - 1;
    detailArray[index].num = num;
    this.setData({
      detailArray: detailArray
    });
    this.getTotalPrice()
    this.getDetailPrice();
    
  },





  //显示具体详情总价
  jumpTotal:function(e){
    let that = this;
    if(this.data.totalDetail){
      that.setData({
        totalDetail: false
      })
    }else{
      that.setData({
        totalDetail: true
      })
    }
  }
  ,
  onLoad: function () {
 
  },

  onShow:function(){
    this.setData({
      hasList: true,        // 既然有数据了，那设为true吧
    })
  }

})
