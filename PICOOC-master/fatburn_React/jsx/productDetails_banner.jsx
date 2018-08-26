var React=require("react");
var PubSub = require("pubsub-js");
var m=1;
var mySwiper;
var ProductDetails_banner=React.createClass({

    getInitialState:function(){
        var me = this;

        return {
            initState:0,//页面初始化状态
            nowType:'', //当前类型，默认A类
            bannerArr:[]//banner数组
        };
    },

    componentWillMount:function(){
        var me = this;
        var data = me.props.banner;

        var nowTypeNum = 0;
        for(var i=0; i<data.resp.info.length; i++){
            if(data.resp.info[i].hasStock){
                nowTypeNum = i;
                break;
            }
        }

        var pictureStr = data.resp.info[nowTypeNum].inPicture;
        var pictureArr = pictureStr.split(',');
        me.setState({
            nowType: nowTypeNum,
            bannerArr:pictureArr
        });

    },
    componentDidMount:function(){

        var me = this;
        var data = me.props.banner;
        console.log('11111111111', me);
        mySwiper = new Swiper ('.swiper-container', {
            direction: 'horizontal',//水平滑动
            //loop: true, //循环播放
            autoplay: 2000, //自动播放
            autoplayDisableOnInteraction: false, //用户操作swiper之后，是否禁止autoplay。默认为true：停止。
            pagination: '.swiper-pagination'  // 分页器
        });
        //轮播图小圆点转换为整数值；
        var $bannerPoint = $('.swiper-container .swiper-pagination .swiper-pagination-bullet');
        $bannerPoint.css("height",parseInt($bannerPoint.height())+'px');
        $bannerPoint.css("width",parseInt($bannerPoint.width())+'px');
        $bannerPoint.css("borderRadius",parseInt($bannerPoint.css('borderRadius'))+'px');

        PubSub.subscribe("chooseType", function(msg, chooseType){


            //alert('chooseType='+chooseType);
            var pictureStr = data.resp.info[chooseType].inPicture;
            var pictureArr = pictureStr.split(',');

            me.setState({
                nowType:chooseType,
                bannerArr:pictureArr
            });
            //$(me.refs.bannerBox).remove();
            console.log('zqqqqqqqqqqq',$(me.refs.bannerBox));
        });
        //


    },
    componentWillUpdate:function(){
        var me = this;
        //$('me.refs.bannerBox').remove();
        console.log(11,$(me.refs.bannerBox));
        //$("#bannerBox").remove();
        //$(".swiper-container .swiper-wrapper").empty();
        $(".swiper-pagination").empty();
        mySwiper.destroy(true,true);

    },
    componentDidUpdate:function(){
      //alert($(".swiper-container").html());

        mySwiper = new Swiper ('.swiper-container', {
            direction: 'horizontal',//水平滑动
            //loop: true, //循环播放
            autoplay: 2000, //自动播放
            autoplayDisableOnInteraction: false, //用户操作swiper之后，是否禁止autoplay。默认为true：停止。
            pagination: '.swiper-pagination'  // 分页器
        });
        //轮播图小圆点转换为整数值；
        var $bannerPoint = $('.swiper-container .swiper-pagination .swiper-pagination-bullet');
        $bannerPoint.css("height",parseInt($bannerPoint.height())+'px');
        $bannerPoint.css("width",parseInt($bannerPoint.width())+'px');
        $bannerPoint.css("borderRadius",parseInt($bannerPoint.css('borderRadius'))+'px');
    },
    render:function(){
        var me = this;
        var data = me.props.banner;

        if(data.code ==200){
            //$(".swiper-container").remove();
            var bannerArr = me.state.bannerArr;
            console.log(888,bannerArr);
           // var bannerArr = [1,2];
            var nowType = me.state.nowType;
            //var bannerStr ={};
            var list = [];
            var list2=[];
          //  alert(list);
           // alert(bannerArr);
            bannerArr.map(function (item, index) {
                list.push(
                    <div className="col-xs-12 col-sm-12 swiper-slide" key={index}>
                        <a href="javascript:void(0);"><img src={bannerArr[index]}/></a>
                    </div>
                )
            });

           // for(var n=0;n<bannerArr.length;n++){
           //     list.push(
           //         <div className="col-xs-12 col-sm-12 swiper-slide" key={n}>
           //             <a href="javascript:void(0);">{bannerArr[n]}</a>
           //         </div>
           //     )
           //     list2.push(
           //         <span className="swiper-pagination-bullet"  key={n}></span>
           //     )
           // }
            //$('.swiper-container').html('');
            //alert("c:"+list.length);
            console.log("b:",list);

            //$(".swiper-container .swiper-slide").eq(0).remove();
            //$(".swiper-container .swiper-slide").eq($(".swiper-container .swiper-slide").length-1).remove();

            var bannerStr =
                <aside className="row swiper-container">
                    <div className="swiper-wrapper">
                        {list}
                    </div>
                    <div className="swiper-pagination">

                    </div>
                </aside>

        }

        console.log("a:",bannerStr);
        return (
            /*轮播图*/

            <div ref="bannerBox">{bannerStr}</div>

        );
    }

});

module.exports = ProductDetails_banner;