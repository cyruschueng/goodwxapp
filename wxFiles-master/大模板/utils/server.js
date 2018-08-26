var pageData = [
  {
    name: 'index',
    config: {
      titleBar: {
        "frontColor": '#ffffff',
        "backgroundColor": '#444444',
        "text": '下渚湖旅行',
      },
      body: {
        "backgroundColor": '#f3f3f3',
        "backgroundImage": ''
      },
    },
    components: [
      {
        name: 'carsouel', styleData: {
          indicatorDots: true, indicatorColor: 'rgba(255, 255, 255, 0.3)', indicatorActiveColor: '#ffffff', autoplay: true,
          interval: 5000, duration: 500, circular: true, vertical: false, width: '100%', height: '400rpx', padding: '30rpx 30rpx 0 30rpx', borderRadius: '10rpx 10rpx 0 0', margin: 'auto'
        },
        data: {
          imgUrls: [
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517818839&di=72cfaeb7571ce0fc4a16c7b6063931b1&imgtype=jpg&er=1&src=http%3A%2F%2Fpic.lvmama.com%2Fuploads%2Fpc%2Fplace2%2F2014-10-11%2F1412999804752.jpg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517224171569&di=2e4553fc0cc25c31cd2b5ec34221bbca&imgtype=0&src=http%3A%2F%2Fwww.hpa.net.cn%2Fbinger%2Fimages2%2F2015-4-26%2F201504260051589012_3693.jpg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517224246653&di=b18314f46ffe3d4ad57f6dee48e3f1ae&imgtype=0&src=http%3A%2F%2Fwww.zt.zj.com%2Fcns%2F2012_3thyzj%2F192114_1.jpg'
          ]
        }
      },
      {
        name: 'customButton', styleData: {
          width: '80rpx', height: '80rpx', vertical: false, backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: '80rpx', boxShadow: '1px 1px 1px 1px #d1d1d1', fixed: true, top: '30rpx', right: '30rpx', bottom: null, left: null, margin: 'auto', textAlign: 'center', iconSize: 40, textMargin: '', textColor: '#444444', textSize: '30rpx', textShow: false, iconShow: true
        }
      },
      {
        name: 'meunWithCustomIcon', styleData: {
          indicatorDots: true, indicatorColor: 'rgba(0, 0, 0, 0.3)', indicatorActiveColor: '#ff9900', autoplay: false,
          interval: 5000, duration: 500, circular: true, vertical: false, width: '100%', height: '290rpx', padding: '0 30rpx', borderRadius: '0 0 10rpx 10rpx', margin: 'auto', backgroundColor: '#ffffff', iconSize: 60, textSize: '30rpx', textColor: '#444444', itemBackgroundImageShow: false, iconShow: true, textShow: true
        },
        data: {
          list: [
            { text: '景点', image: '/img/d1.png', bg: '/img/bg2.png', page: "delicious", params: { implantationData: 0, implantation: 'searchWidthAFilter'} },
            { text: '美食', image: '/img/d2.png', bg: '/img/bg2.png', page: "delicious", params: { implantationData: 1, implantation: 'searchWidthAFilter'} },
            { text: '住宿', image: '/img/d3.png', bg: '/img/bg2.png', page: 'delicious', params: { implantationData: 2, implantation: 'searchWidthAFilter'} },
            { text: '娱乐', image: '/img/d4.png', bg: '/img/bg2.png', page: 'delicious', params: { implantationData: 3, implantation: 'searchWidthAFilter'} },
            { text: '活动', image: '/img/d8.png', bg: '/img/bg2.png', page: 'delicious', params: { implantationData: 4, implantation: 'searchWidthAFilter'} },
            { text: '文化', image: '/img/d6.png', bg: '/img/bg2.png', page: 'delicious', params: { implantationData: 5, implantation: 'searchWidthAFilter'} },
            { text: '户外', image: '/img/d7.png', bg: '/img/bg2.png', page: 'delicious', params: { implantationData: 6, implantation: 'searchWidthAFilter'} },
            { text: '购物', image: '/img/d5.png', bg: '/img/bg2.png', page: 'delicious', params: { implantationData: 7, implantation: 'searchWidthAFilter'} }
          ]
        }
      },
      {
        name: 'title', styleData: {
          padding: '30rpx', margin: '0', text: '下渚湖精选', textSize: '32rpx', textColor: '#888888', textAlign:'left',
          flagShow: true, flagColor: '#ff9900', flagWidth: '10rpx', flagHeight: '40rpx', flagBorderRadius:'0'
        }
      },
      {
        name:'flattenedCardList',styleData: {
          padding: '0 30rpx 130rpx 30rpx ',margin:'0', itemBorderRadius: '10rpx', itemHeight: '300rpx', itemBackgroundColor:'rgba(0,0,0,0.3)',
          itemMargin: '0 0 30rpx 0', titleTextSize:'40rpx',titleContentSize:'30rpx'
        },
        navData:[
          {page:''}
        ],
        data:{
          list:[
            { image:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517291968254&di=ac7a0fa146d7b5ed01ee4bbb8717716a&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F7a899e510fb30f2404da4ef0c295d143ac4b0384.jpg',title:'湖畔民宿风情',subTitle:'像家一样温馨'},
            { image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517294252883&di=79c0aec9384e2dd577b38ee7cbfb0268&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3D47252ce41a38534398c28f62fb7ada0b%2Ffaf2b2119313b07eb88f8f8006d7912397dd8c0c.jpg', title: '芦苇从中嬉戏', subTitle: '体验不一样的湖畔活动' }
          ]
        }
      }
    ],
  },
  {
    name:'scenery',
    config:{
      titleBar: {
        "frontColor": '#ffffff',
        "backgroundColor": '#444444',
        "text": '景点',
      },
      body: {
        "backgroundColor": '#f3f3f3',
        "backgroundImage": ''
      },
    },
    components:[
      {
        name:'',styleData:{
          
        }
      }
    ]
  },
  {
    name:'delicious',
    config: {
      titleBar: {
        "frontColor": '#ffffff',
        "backgroundColor": '#444444',
        "text": '下渚湖',
      },
      body: {
        "backgroundColor": '#f3f3f3',
        "backgroundImage": ''
      },
    },
    components: [
      {
        name: 'searchWidthAFilter', styleData: {
          padding: '0 30rpx 20rpx 30rpx', margin: '0', fixed: true, top: 0, left: 0, right: null, bottom: null, backgroundColor: '#444444', iconUrl: '/img/fl.png', searchIcon: '/img/search.png', searchWidth: '530rpx', searchHeight: '70rpx', searchBorderRadius: '70rpx', searchBackgroundColor: 'rgba(255,255,255,0.7)', inputWidth: '430rpx', placeholder:'搜索',textSize:'32rpx'
        },
        data:{
          filterList:[
           '景点','美食', '住宿', '娱乐','活动', '文化',  '户外',  '购物'
          ]
        }
      }
    ]
  }
]

function httpDemo(page,cb){
  var redata = null;
  for(var i in pageData){
    if(pageData[i].name == page){
      redata = pageData[i]
    }
  }
  cb(redata);
}
module.exports = {
  httpDemo: httpDemo
}