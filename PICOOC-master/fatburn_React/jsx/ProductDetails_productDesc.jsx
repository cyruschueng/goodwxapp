var React=require("react");
var ReactDOM=require("react-dom");
var PubSub = require("pubsub-js");
var ProductDetails_productDesc=React.createClass({

    getInitialState:function(){
        var me = this;
        me.productDesc();
        return {
            hasChoose:0,//是否已选班级类型
            nowType:'', //当前类型，默认A类
            nowTypeTitle:'', //当前类型Title
            nowClass:'',//当前班级 默认第一个
            nowClassName:'',//当前班级名称
            month:'',
            day:''
        };
    },

    componentWillMount:function(){
        var me = this;
        var data = me.props.productDesc;

        var nowTypeNum = 0;
        for(var i=0; i<data.resp.info.length; i++){
            if(data.resp.info[i].hasStock){
                nowTypeNum = i;
                break;
            }
        }

        //获取第一个商品类型的信息
        var info1 = data.resp.info[nowTypeNum];
        console.log("info1",info1);
        var info1ClassesArr = info1.classes;
        var nowIndex=0;
        for(var i=0; i<info1ClassesArr.length; i++){
            //有库存
            if(info1ClassesArr[i].sellOut == false){
                nowIndex = i;
                break;
            }
        }
        me.setState({
            nowType: nowTypeNum,
            nowTypeTitle:info1.gradeName,
            nowClass:nowIndex,
            nowClassName:info1ClassesArr[nowIndex].className
        });
        if(typeof nowIndex == 'number'){//有
            //有库存
            var beginTimeArr = info1ClassesArr[nowIndex].beginTime.split('-'); //开营时间
            me.setState({
                hasChoose:1,
                month:beginTimeArr[0],
                day:beginTimeArr[1]
            });
        }

    },
    
    componentDidMount:function(){
        var me = this;
        var data = me.props.productDesc;

        PubSub.subscribe("chooseType", function(msg, chooseType){

            //获取第一个商品类型的信息
            var info1 = data.resp.info[chooseType];
            console.log("info1",info1);
            var info1ClassesArr = info1.classes;
            var nowIndex;
            for(var i=0; i<info1ClassesArr.length; i++){
                //有库存
                if(info1ClassesArr[i].sellOut == false){
                    nowIndex = i;
                    break;
                }
            }
            me.setState({
                nowType:chooseType,
                nowTypeTitle:info1.gradeName,
                nowClass:nowIndex,
                nowClassName:info1ClassesArr[nowIndex].className
            });
            if(typeof nowIndex == 'number'){//有
                //有库存
                var beginTimeArr = info1ClassesArr[nowIndex].beginTime.split('-'); //开营时间
                me.setState({
                    hasChoose:1,
                    month:beginTimeArr[0],
                    day:beginTimeArr[1]
                });
            }

        });

        PubSub.subscribe("chooseClass", function(msg, chooseClass){

            //获取第一个商品类型的信息
            var info1 = data.resp.info[me.state.nowType];
            console.log("info1",info1);
            var info1ClassesArr = info1.classes;

            var beginTimeArr = info1ClassesArr[chooseClass].beginTime.split('-'); //开营时间
            me.setState({
                nowTypeTitle:info1.gradeName,
                nowClass:chooseClass,
                nowClassName:info1ClassesArr[chooseClass].className,
                hasChoose:1,
                month:beginTimeArr[0],
                day:beginTimeArr[1]
            });

        });
    },

    render:function(){
        var me = this;
        var data = me.props.productDesc;
        var productDescStr = "";
        console.log('eeee',me);
        if(data.code ==200){

            /*nowTypeTitle:'', //当前类型Title
             nowClass:'',//当前班级 默认第一个
             nowClassName:'',//当前班级名称
             month:'',
             day:''*/

            var nowTypeTitle = me.state.nowTypeTitle;
            var hasChoose = me.state.hasChoose;
            var nowClass = me.state.nowClass;
            var nowClassName = me.state.nowClassName;
            var month = me.state.month;
            var day = me.state.day;

            var hasChooseStr = '';
            if(hasChoose ==0){
                hasChooseStr = '请选择 班级类型';
            }else if(hasChoose == 1){
                hasChooseStr = <p>已选：<span>{nowClassName}</span>&nbsp;&nbsp;<span>{month}月{day}日</span></p>;
            }




            productDescStr =
                <aside className="row desc">
                    <article className="row desc1">
                        <div className="col-xs-12 col-sm-12 content">
                            <h3>{nowTypeTitle}</h3>
                        </div>
                    </article>
                    <article className="row tabSelected" onClick={me.tabSelected} >
                        <div className="col-xs-10 col-sm-10" ref="left">
                            {hasChooseStr}
                        </div>
                        <div className="col-xs-2 col-sm-2 more" ref="right">
                            <img src="https://cdn2.picooc.com/web/res/fatburn/image/sell/productDetails/more.png"/>
                        </div>
                    </article>
                    <article className="row tabToggle">
                        <div className="col-xs-6 col-sm-6 leftTab tabActive aboutTab"  onClick={me.tabLeftFunction} ref="left"><span>商品详情</span></div>
                        <div className="col-xs-6 col-sm-6 rightTab aboutTab"  onClick={me.tabRightFunction} ref="right">商品评价</div>
                    </article>
                </aside>
        }
        return (
            /*产品描述*/
            <div>{productDescStr}</div>
        );
    },

    //productDesc
    productDesc:function(){
        var me = this;
    },

    //点击切换tab标签；商品详情--商品评价
    tabLeftFunction:function(event){
        var me = this;
        setMaiDian(SShangPinXiangQing.SCategory_SShangPinXiangQing,SShangPinXiangQing.SShangPinXiangQing_ShangPinXiangQing);//商品详情
        $(me.refs.left).addClass('tabActive');
        $(me.refs.right).removeClass('tabActive');
        $('.detailOrComment').hide().eq(0).show();
    },
    tabRightFunction:function(){
        var me = this;
        setMaiDian(SShangPinXiangQing.SCategory_SShangPinXiangQing,SShangPinXiangQing.SShangPinXiangQing_ShangPinPingJia);//商品评价
        $(me.refs.right).addClass('tabActive');
        $(me.refs.left).removeClass('tabActive');
        $('.detailOrComment').hide().eq(1).show();
    },
    //点击显示更多
    tabSelected:function(){
        var me = this;
        $('.boxSale .bg, .sale .detailInfo').show();
        $('html, body').css('overflow', 'hidden').on("touchmove",function(ev){
            ev = ev || event;
            if(ev.preventDefault){
                ev.preventDefault();
            }else{
                return false;
            }
        });
    }

});

module.exports = ProductDetails_productDesc;