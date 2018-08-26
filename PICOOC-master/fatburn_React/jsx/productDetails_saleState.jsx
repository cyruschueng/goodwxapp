var React = require("react");
var PubSub = require("pubsub-js");
var buyFlag = true;//防止多次点击立即购买
var is_balance = (getParamByUrl('innerToOut') == 1) ? 1 : 0;//是否有秤，app外打开默认无秤，app内低版本跳转之后打开，默认是有秤；

var changeNoStock = false;
var ProductDetails_saleState = React.createClass({

    getInitialState: function () {
        var me = this;
        return {
            info: '',//所有班级信息
            nowType: "", //当前类型，默认A类
            gradeName: '', //当前类型名称
            info1ClassesArr: '', //当前类型下所有班级
            nowClass: '',//当前班级 默认第一个
            nowClassName: '', //当前班级名称
            originPrice: '',
            curentPrice: '',
            especialPrice: '',
            stock: '', //初始化库存
            sellOut: '', //真正售罄
            limited: '', //限时特价
            headPicture: ''//商品头图

        };
    },
    componentWillMount: function () {


        var me = this;
        var data = me.props.saleState;

        var nowTypeNum = 0;
        for (var i = 0; i < data.resp.info.length; i++) {
            if (data.resp.info[i].hasStock) {
                nowTypeNum = i;
                break;
            }
        }

        var info1 = data.resp.info[nowTypeNum];//类型
        var headPicture = data.resp.info[nowTypeNum].inPicture.split(',')[0];
        var info1ClassesArr = info1.classes;//当前类型下所有班级
        var nowIndex = 0;//当前类型下的第一个班级
        for (var i = 0; i < info1ClassesArr.length; i++) {
            //有库存
            if (info1ClassesArr[i].sellOut == false) {
                nowIndex = i;
                break;
            }
        }

        me.setState({
            nowType: nowTypeNum,
            info: data.resp.info,
            gradeName: data.resp.info[nowTypeNum].gradeName,
            info1ClassesArr: info1ClassesArr,
            nowClass: nowIndex,
            nowClassName: info1ClassesArr[nowIndex].className,
            originPrice: info1ClassesArr[nowIndex].originPrice,
            curentPrice: info1ClassesArr[nowIndex].curentPrice,
            especialPrice: info1ClassesArr[nowIndex].especialPrice,
            stock: info1ClassesArr[nowIndex].stock,
            sellOut: info1ClassesArr[nowIndex].sellOut,
            limited: info1ClassesArr[nowIndex].limited,
            headPicture: headPicture
        });
    },
    render: function () {
        var deviceType = isMobile();
        var me = this;
        var data = me.props.saleState;
        var saleState = '';
        if (data.code == 200) {
            publicData.is_balance = is_balance;

            var info = me.state.info;
            console.log('info', info);
            var nowType = me.state.nowType;
            var info1ClassesArr = me.state.info1ClassesArr;
            var nowClass = me.state.nowClass;

            var gradeName = me.state.gradeName;
            var nowClassName = me.state.nowClassName;
            var originPrice = me.state.originPrice;
            var curentPrice = me.state.curentPrice;
            var especialPrice = me.state.especialPrice;
            var stock = me.state.stock;
            var sellOut = me.state.sellOut;
            var limited = me.state.limited;
            var headPicture = me.state.headPicture;

            console.log('is_balance=' + is_balance);

            //最终传给后台的classId
            //alert(info[nowType].classes[nowClass].classId);
            publicData.classId = info[nowType].classes[nowClass].classId;


            var info1Classes = [];
            var beginTimes = [];
            var immediatelyBuyStyle;

            //大类显示规则
            info.map(function (item, index) {
                var style = 'chooseText';
                var finalStyle;
                if (limited == 1) {//checkedLimit
                    finalStyle = index == me.state.nowType ? style + ' checkedLimit' : style;
                } else {
                    finalStyle = index == me.state.nowType ? style + ' checked' : style;
                    /*alert(changeNoStock);
                    if(changeNoStock == true){
                        alert(1);
                        finalStyle = index== me.state.nowType?style+' noStock': style;
                    }else{
                        alert(2);
                        finalStyle = index== me.state.nowType?style+' checked': style;
                    }*/
                }
                //var finalStyle = index== me.state.nowType?style+' checked': style;
                var noStock = true;
                if (info[index].hasStock == false) {
                    finalStyle += ' noStock';
                }
                /*for(var i=0; i<info[index].classes.length; i++){
                    if(info[index].classes[i].stock != 0){
                        noStock = false;

                    }
                }
                if(noStock == true){
                    finalStyle = finalStyle +' noStock';
                }*/


                var showYouHuiLogo = false;
                for (var i = 0; i < info[index].classes.length; i++) {
                    if ((info[index].classes[i].limited == 1) && (info[index].classes[i].sellOut == false)) {
                        showYouHuiLogo = true;
                    }
                }

                info1Classes.push(

                    /*<div className="col-xs-3 col-sm-3 aboutthis">

                    </div>*/
                    <span className={finalStyle} key={index} data-index={index} onClick={(item.hasStock == true) ? me.checkClass.bind(me, index) : ""}>
                        {info[index].className}
                        <img className="youHui" style={{ display: ((info[index].hasLimit == true) && (item.hasStock == true) && showYouHuiLogo) ? 'block' : 'none' }} src="https://cdn2.picooc.com/web/res/fatburn/image/sell/productDetails/youHui.png" alt="" />
                    </span>
                )
            });

            //开营时间显示规则

            info[nowType].classes.map(function (item, index) {
                var style = 'chooseText';
                var isClickAble = true;
                var finalStyle;
                if (limited == 1) {//checkedLimit
                    finalStyle = index == me.state.nowClass ? style + ' checkedLimit' : style;
                } else {
                    finalStyle = index == me.state.nowClass ? style + ' checked' : style;
                    /*if(changeNoStock == true){
                        finalStyle = index== me.state.nowClass?style+' noStock': style;
                    }else{
                        finalStyle = index== me.state.nowClass?style+' checked': style;
                    }*/
                    /*if(changeNoStock == true){
                        if(index== me.state.nowClass){
                            isClickAble = false;
                            finalStyle = style+' noStock';
                        }else{
                            finalStyle = style;
                        }
                    }else{
                        if(index== me.state.nowClass){
                            finalStyle = style+' checked';
                        }else{
                            finalStyle = style;
                        }
                    }*/

                }
                if (info[nowType].classes[index].sellOut == true) {
                    isClickAble = false;
                    //finalStyle = index== me.state.nowType?style+' noStock': style;
                    finalStyle += ' noStock';
                }
                //alert(nowType);
                //alert(index);
                var beginTime = info[nowType].classes[index].beginTime.split('-');
                beginTimes.push(
                    <span className={finalStyle} key={index} data-index={index} onClick={(isClickAble == false) ? "" : (me.checkBeginTime.bind(me, index))}>
                        {beginTime[0]}月{beginTime[1]}日
                        <img className="youHui" style={{ display: (info[nowType].classes[index].limited == 1 && isClickAble) ? 'block' : 'none' }} src="https://cdn2.picooc.com/web/res/fatburn/image/sell/productDetails/youHui.png" alt="" />
                    </span>
                );
            });

            //立即购买显示规则  (isClickAble==true)?(me.checkBeginTime.bind(me, index)):''  (limited==1)?"state6":"state5"
            //2017年8月11日15:02:40 设置开售提醒去掉了
            /*var buyOrWarning = false;
            var outApp = false;
            if ((info.length == 1) && (info1ClassesArr.length == 1) && (info[0].hasSale == false)) {
                buyOrWarning = true;
                if (isOutApp() && (getParamByUrl('webver') > 1)) {
                    outApp = true;
                }
            }*/
            if (limited == 1) {
                if (sellOut == true) {
                    immediatelyBuyStyle = "state7";//售罄：灰色背景
                } else {
                    immediatelyBuyStyle = "state6";//限时特价：红色背景
                }
            } else {
                if (sellOut == true) {
                    immediatelyBuyStyle = "state7";//售罄：灰色背景
                } else {
                    immediatelyBuyStyle = "state5";//正常状态
                }
            }

            //是否有秤的样式
            var isWeightStyle =
                saleState =
                <div className="boxSale" style={{ display: "block" }}>
                    <div className="bg" style={{ display: "none" }}></div>
                    <aside className="row sale">
                        <div className={(limited == 1) ? "col-xs-12 col-sm-12 detailInfo teJiabg" : "col-xs-12 col-sm-12 detailInfo"} style={{ display: "none" }}>
                            <img className="close" onClick={me.closeDetailInfo} src="https://cdn2.picooc.com/web/res/fatburn/image/sell/productDetails/close.png " />
                            <aside className="row good">
                                <div className="row col-xs-12 col-sm-12 aboutInfo">
                                    <div className="col-xs-4 col-sm-4 infoImg"><img src={headPicture} /></div>
                                    <div className="col-xs-8 col-sm-8 infoDesc">
                                        <div className="goodsName">
                                            <p>{gradeName}</p>
                                        </div>
                                        <p className="price">
                                            <span className={(limited == 1) ? "newPriceLimit" : "newPrice"}>¥{(limited == 1) ? especialPrice : curentPrice}</span>
                                            <span className="oldPrice" style={{ display: (limited == 1) ? ((especialPrice == originPrice) ? "none" : 'inline-block') : ((curentPrice == originPrice) ? "none" : 'inline-block') }}><del>¥</del><del>{originPrice}</del></span>
                                        </p>
                                        <p className={(limited == 1) ? "leftNumLimit" : "leftNum"}>剩余：{stock}席</p>
                                    </div>
                                </div>
                                <div className="type row">

                                    <p className="col-xs-12 col-sm-12 title">选择班级</p>
                                    {/*
                                     <span className="chooseText checked">辣妈四周班</span>
                                     <span className="chooseText youHui checked">体验一周班</span>
                                     <span className="chooseText">大体重六周班</span>
                                     <span className="chooseText">一周班</span>
                                     <span className="chooseText checked">辣妈四周班</span>
                                     <span className="chooseText">体验一周班</span>
                                     <span className="chooseText">大体重六周班</span>
                                     <span className="chooseText">一周班</span>
                                    */}
                                    {info1Classes}
                                </div>
                                <div className="type row aboutBeginTime">
                                    <p className="col-xs-12 col-sm-12 title">开营时间</p>
                                    {
                                        /*<span className="chooseText checked">5月16日</span>
                                         <span className="chooseText">5月21日<img className="youHui" src="https://cdn2.picooc.com/web/res/fatburn/image/sell/productDetails/youHui.png" alt=""/></span>
                                         <span className="chooseText">5月21日</span>
                                         <span className="chooseText">5月21日</span>
                                         <span className="chooseText">5月21日</span>
                                         <span className="chooseText">5月21日</span>
                                         <span className="chooseText">5月21日</span>*/
                                    }
                                    {beginTimes}
                                </div>
                                <div className="type row" style={{ display: ((isOutApp() == true)) ? 'block' : 'none' }}>
                                    <p className="col-xs-12 col-sm-12 title">是否有秤</p>
                                    <span className={(sellOut == true) ? "chooseText noStock" : ((limited == 1) ? "chooseText checkedLimit" : "chooseText checked")} ref="noWeight" onClick={(sellOut == true) ? "" : me.noWeight}>无秤
                                    <img className="youHui" style={{ display: (limited == 1 && sellOut == false) ? 'block' : 'none' }} src="https://cdn2.picooc.com/web/res/fatburn/image/sell/productDetails/youHui.png" />
                                    </span>
                                    <span className={(sellOut == true) ? "chooseText noStock" : "chooseText"} ref="haveWeight" onClick={(sellOut == true) ? "" : me.haveWeight}>有秤
                                    <img className="youHui" style={{ display: 'none' }} src="https://cdn2.picooc.com/web/res/fatburn/image/sell/productDetails/youHui.png" />
                                    </span>
                                </div>
                                <div className="type row" style={{ display: (getParamByUrl('innerToOut') == 1) ? 'block' : 'none' }}>
                                    <p className="col-xs-12 col-sm-12 title">是否有秤</p>
                                    <span className={(sellOut == true) ? "chooseText noStock" : ((limited == 1) ? "chooseText checkedLimit" : "chooseText checked")} ref="haveWeightInner" onClick={(sellOut == true) ? "" : me.haveWeightInner}>有秤
                                    <img className="youHui" style={{ display: (limited == 1 && sellOut == false) ? 'block' : 'none' }} src="https://cdn2.picooc.com/web/res/fatburn/image/sell/productDetails/youHui.png" />
                                    </span>
                                    <span className={(sellOut == true) ? "chooseText noStock" : "chooseText"} ref="noWeightInner" onClick={(sellOut == true) ? "" : me.noWeightInner}>无秤
                                    <img className="youHui" style={{ display: 'none' }} src="https://cdn2.picooc.com/web/res/fatburn/image/sell/productDetails/youHui.png" />
                                    </span>
                                </div>
                            </aside>
                        </div>
                        <div className="col-xs-3 col-sm-3 service" style={{ display: "block" }} onClick={((isOutApp() == true) || (getParamByUrl('innerToOut') == 1)) ? me.outAppService : me.props.serviceFunction}>
                            <img src={(limited == 1) ? "https://cdn2.picooc.com/web/res/fatburn/image/sell/productDetails/redNoMsg.png" : "https://cdn2.picooc.com/web/res/fatburn/image/sell/productDetails/greenNoMsg.png"} />
                            <img src={(limited == 1) ? "https://cdn2.picooc.com/web/res/fatburn/image/sell/productDetails/redHasMsg.png" : "https://cdn2.picooc.com/web/res/fatburn/image/sell/productDetails/greenHasMsg.png"} style={{ display: "none" }} />
                        </div>
                        <a href="javascript:void(0);">
                            {/*<div className="col-xs-9 col-sm-9 state" style={{display:"none"}}><span className="state2 stateJs">预约下期</span></div>
                             <div className="col-xs-9 col-sm-9 state" style={{display:"none"}}><span className="state3">已预约</span></div>
                             <div className="col-xs-9 col-sm-9 state" style={{display:"none"}}><span className="state1 stateJs">设置开售提醒</span></div>
                             <div className="col-xs-9 col-sm-9 state" style={{display:"none"}}><span className="state4">已提醒</span></div>*/}
                            <div className="col-xs-9 col-sm-9 state" /*style={{ display: buyOrWarning == false ? "block" : "none" }}*/><span className={immediatelyBuyStyle} onClick={(sellOut == true) ? "" : me.immediatelyBuy} ref="buyBtn">立即购买</span></div>
                            {/*<div className="col-xs-9 col-sm-9 state" style={{ display: buyOrWarning == false ? "none" : "block" }}><span className={(outApp == true) ? "state7" : ((info[0].hasAppointment == true) ? "state9" : "state8")} onClick={(outApp == true) ? "" : ((info[0].hasAppointment == true) ? "" : me.warningBuy)} ref="warningBtn">{(outApp == true) ? "立即购买" : ((info[0].hasAppointment == true) ? "已提醒" : "设置开售提醒")}</span></div>*/}
                        </a>
                    </aside>
                </div>

        }

        return (
            /*售卖状态*/
            <div>{saleState}</div>

        );
    },
    closeDetailInfo: function () {
        $('.boxSale .bg, .sale .detailInfo').hide();
        $('html, body').css('overflow', 'auto').off("touchmove");
    },

    //选择班级
    checkClass: function (index) {
        buyFlag = true;//可以点击立即购买
        var me = this;


        //初始化显示是否有秤的状态
        is_balance = (getParamByUrl('innerToOut') == 1) ? 1 : 0;//是否有秤，app外打开默认无秤，app内低版本跳转之后打开，默认是有秤；
        $(me.refs.haveWeight).removeClass('checkedLimit');
        $(me.refs.haveWeight).removeClass('checked');

        $(me.refs.noWeightInner).removeClass('checkedLimit');
        $(me.refs.noWeightInner).removeClass('checked');

        console.log('is_balance', is_balance);
        publicData.is_balance = is_balance;

        //alert(id);
        //var index = event.currentTarget.getAttribute("data-index");//设置埋点
        //
        //$(event.currentTarget).css("color","red");
        //var index = $(this).index();
        //alert(index);
        //$(this).addClass('checked');
        me.setState({
            nowType: index
        });


        PubSub.publish('chooseType', index);//大类

        var data = me.props.saleState;
        var info1 = data.resp.info[index];//类型
        var headPicture = data.resp.info[index].inPicture.split(',')[0];
        var info1ClassesArr = info1.classes;//当前类型下所有班级
        var nowIndex = 0;//当前类型下的第一个班级
        for (var i = 0; i < info1ClassesArr.length; i++) {
            //有库存
            if (info1ClassesArr[i].sellOut == false) {
                nowIndex = i;
                break;
            }
        }

        me.setState({
            info: data.resp.info,
            gradeName: data.resp.info[index].gradeName,
            info1ClassesArr: info1ClassesArr,
            nowClass: nowIndex,
            nowClassName: info1ClassesArr[nowIndex].className,
            originPrice: info1ClassesArr[nowIndex].originPrice,
            curentPrice: info1ClassesArr[nowIndex].curentPrice,
            especialPrice: info1ClassesArr[nowIndex].especialPrice,
            stock: info1ClassesArr[nowIndex].stock,
            sellOut: info1ClassesArr[nowIndex].sellOut,
            limited: info1ClassesArr[nowIndex].limited,
            headPicture: headPicture
        });

        $(me.refs.haveWeight).children('img').hide();
        $(me.refs.noWeightInner).children('img').hide();
        if (info1ClassesArr[nowIndex].limited == 1) {

            $(me.refs.noWeight).addClass('checkedLimit');
            $(me.refs.noWeight).children('img').show();

            $(me.refs.haveWeightInner).addClass('checkedLimit');
            $(me.refs.haveWeightInner).children('img').show();
        } else {
            $(me.refs.noWeight).addClass('checked');
            $(me.refs.noWeight).children('img').hide();

            $(me.refs.haveWeightInner).addClass('checked');
            $(me.refs.haveWeightInner).children('img').hide();
        }




    },

    //选择开营时间
    checkBeginTime: function (index) {
        buyFlag = true;//可以点击立即购买
        var me = this;

        //初始化显示是否有秤的状态
        is_balance = (getParamByUrl('innerToOut') == 1) ? 1 : 0;//是否有秤，app外打开默认无秤，app内低版本跳转之后打开，默认是有秤；


        $(me.refs.noWeightInner).removeClass('checkedLimit');
        $(me.refs.noWeightInner).removeClass('checked');

        console.log('is_balance', is_balance);
        publicData.is_balance = is_balance;
        //alert(id);
        //var index = event.currentTarget.getAttribute("data-index");//设置埋点
        //
        //$(event.currentTarget).css("color","red");
        //var index = $(this).index();
        //alert(index);
        //$(this).addClass('checked');
        me.setState({
            nowClass: index
        });
        PubSub.publish('chooseClass', index);


        var data = me.props.saleState;
        var info1 = data.resp.info[me.state.nowType];//类型
        var headPicture = data.resp.info[me.state.nowType].inPicture.split(',')[0];
        var info1ClassesArr = info1.classes;//当前类型下所有班级
        var nowIndex = 0;//当前类型下的第一个班级
        for (var i = 0; i < info1ClassesArr.length; i++) {
            //有库存
            if (info1ClassesArr[i].sellOut == false) {
                nowIndex = i;
                break;
            }
        }

        me.setState({
            info: data.resp.info,
            gradeName: data.resp.info[me.state.nowType].gradeName,
            info1ClassesArr: info1ClassesArr,
            nowClass: index,
            nowClassName: info1ClassesArr[index].className,
            originPrice: info1ClassesArr[index].originPrice,
            curentPrice: info1ClassesArr[index].curentPrice,
            especialPrice: info1ClassesArr[index].especialPrice,
            stock: info1ClassesArr[index].stock,
            sellOut: info1ClassesArr[index].sellOut,
            limited: info1ClassesArr[index].limited,
            headPicture: headPicture
        });

        $(me.refs.haveWeight).removeClass('checkedLimit');
        $(me.refs.haveWeight).removeClass('checked');

        $(me.refs.haveWeight).children('img').hide();
        $(me.refs.noWeightInner).children('img').hide();
        if (info1ClassesArr[index].limited == 1) {

            $(me.refs.noWeight).addClass('checkedLimit');
            $(me.refs.noWeight).children('img').show();

            $(me.refs.haveWeightInner).addClass('checkedLimit');
            $(me.refs.haveWeightInner).children('img').show();
        } else {
            $(me.refs.noWeight).addClass('checked');
            $(me.refs.noWeight).children('img').hide();

            $(me.refs.haveWeightInner).addClass('checked');
            $(me.refs.haveWeightInner).children('img').hide();
        }


    },


    //无秤
    noWeight: function () {
        var me = this;
        var limited = me.state.limited;
        if (limited == 1) {
            $(me.refs.noWeight).addClass('checkedLimit');//第一个按钮增加限时特价背景
            $(me.refs.noWeight).children('img').show();//第一个按钮增加优惠标志
            $(me.refs.haveWeight).removeClass('checkedLimit');//第二个按钮移出限时特价背景
            $(me.refs.haveWeight).children('img').hide();//第二个按钮移出优惠标志
        } else {
            $(me.refs.noWeight).addClass('checked');
            $(me.refs.haveWeight).removeClass('checked');

            $(me.refs.haveWeight).children('img').hide();
            $(me.refs.noWeight).children('img').hide();
        }
        is_balance = 0;
        publicData.is_balance = is_balance;
    },
    //有秤
    haveWeight: function () {
        var me = this;
        var limited = me.state.limited;
        //alert(limited);
        if (limited == 1) {
            $(me.refs.haveWeight).addClass('checkedLimit');
            $(me.refs.noWeight).removeClass('checkedLimit');

            $(me.refs.haveWeight).children('img').show();
            $(me.refs.noWeight).children('img').hide();
        } else {
            $(me.refs.haveWeight).addClass('checked');
            $(me.refs.noWeight).removeClass('checked');

            $(me.refs.haveWeight).children('img').hide();
            $(me.refs.noWeight).children('img').hide();
        }
        is_balance = 1;
        publicData.is_balance = is_balance;
    },

    //无秤
    noWeightInner: function () {
        var me = this;
        var limited = me.state.limited;
        if (limited == 1) {
            $(me.refs.noWeightInner).addClass('checkedLimit');
            $(me.refs.noWeightInner).children('img').show();//第一个按钮增加优惠标志
            $(me.refs.haveWeightInner).removeClass('checkedLimit');
            $(me.refs.haveWeightInner).children('img').hide();//第二个按钮移出优惠标志
        } else {
            $(me.refs.noWeightInner).addClass('checked');
            $(me.refs.haveWeightInner).removeClass('checked');
        }
        is_balance = 0;
        publicData.is_balance = is_balance;
    },
    //有秤
    haveWeightInner: function () {
        var me = this;
        var limited = me.state.limited;
        if (limited == 1) {
            $(me.refs.haveWeightInner).addClass('checkedLimit');
            $(me.refs.haveWeightInner).children('img').show();//第一个按钮增加优惠标志
            $(me.refs.noWeightInner).removeClass('checkedLimit');
            $(me.refs.noWeightInner).children('img').hide();//第二个按钮移出优惠标志
        } else {
            $(me.refs.haveWeightInner).addClass('checked');
            $(me.refs.noWeightInner).removeClass('checked');
        }
        is_balance = 1;
        publicData.is_balance = is_balance;
    },

    //立即购买service
    immediatelyBuy: function () {
        if (isMobile() == 'isPC') {
            $('.alertBox .alerts').eq(6).html('啊哦！暂时不支持电脑购买，请使用手机下单吧～').stop(true).fadeIn(200).delay(2000).fadeOut(200);
        } else {
            var me = this;
            var data = me.props.saleState;

            var info = me.state.info;
            console.log('info', info);
            var nowType = me.state.nowType;
            var info1ClassesArr = me.state.info1ClassesArr;
            var nowClass = me.state.nowClass;

            var gradeName = me.state.gradeName;
            var nowClassName = me.state.nowClassName;
            var originPrice = me.state.originPrice;
            var curentPrice = me.state.curentPrice;
            var especialPrice = me.state.especialPrice;
            var stock = me.state.stock;
            var sellOut = me.state.sellOut;
            var limited = me.state.limited;
            var headPicture = me.state.headPicture;

            if ((buyFlag == true) || (buyFlag == false)) {//暂时去掉点击立即购买防止多次点击
                buyFlag = false;//不可以点击立即购买
                setMaiDian(SShangPinXiangQing.SCategory_SShangPinXiangQing, SShangPinXiangQing.SShangPinXiangQing_LiJiGouMai);//立即购买埋点
                var classId = me.state.info[me.state.nowType].classes[me.state.nowClass].classId;
                //alert(classId);outAppPhone

                if ((isOutApp() == true) || (getParamByUrl('innerToOut') == 1)) {//如果是app外
                    // 判断是不是无痕浏览
                    try {
                        window.localStorage.foobar = "foobar";
                    }
                    catch (_) {
                        alert("请取消浏览器无痕浏览再购买哦~");
                    }
                    console.log('APP外购买');
                    //需要提前定义cookie
                    if (publicData.outAppLogin == false) {
                        buyFlag = true;//再次点击立即购买还可以弹窗
                        PubSub.publish('outAppPhone', 'block');//app外：用户没有登陆，则显示验证手机号弹窗
                        $('.alertsVerify .verifyBox').hide().eq(1).show();//如果弹窗关闭，下次进来需要再次弹出输入手机号的弹框
                        $('.alertBox .alertsVerify .verifyBox .warning').hide().eq(0).show();
                        setCookie('clickSource', 'formGoToBuy', 1);//从点击立即购买弹得浮层

                        //禁止滚动条
                        $('html, body').css('overflow', 'hidden').on("touchmove", function (ev) {
                            ev = ev || event;
                            if (ev.preventDefault) {
                                ev.preventDefault();
                            } else {
                                return false;
                            }
                        });

                    } else {//用户已登陆
                        if (me.state.sellOut == false) {//当前库存不为0才可以购买

                            //电话号码需要修改

                            var urlStock = ajaxLink + '/v1/api/campSell/getClassStockOut' + window.location.search + '&classId=' + classId + '&phoneNo=' + getCookie('appOutPhone');//获取商品库存状态
                            $.ajax({
                                type: "get",
                                url: urlStock,
                                dataType: "json",
                                success: function (data) {
                                    console.log(4, data);
                                    console.log('urlStock', urlStock);
                                    if (data.result.code == 200) {
                                        //alert('data.resp=' + data.resp);
                                        console.log('库存data.resp=' + data.resp);
                                        if (data.resp == 1) {
                                            //$('.info .infoRight .times').hide().eq(5).show(); //库存：0          有未支付的订单
                                            me.setState({
                                                stock: 0
                                            });
                                            PubSub.publish('noStock');//大类
                                            $('.alertBox .alerts').eq(2).stop(true).fadeIn(200).delay(2000).fadeOut(200);//已拍完，但还有人未付款
                                        } else if (data.resp == 2) {//库存：抢光了
                                            //$('.info .infoRight .times').hide().eq(4).show();
                                            //changeNoStock = true;
                                            me.setState({
                                                stock: 0,
                                                sellOut: true
                                                //limited:0
                                            });
                                            PubSub.publish('noStock');//大类
                                            PubSub.publish('sellOut');//真正售罄
                                            //$('.aboutBeginTime .chooseText').eq(me.state.nowClass).addClass('noStock').unbind('click');
                                            $('.alertBox .alerts').eq(3).stop(true).fadeIn(200).delay(2000).fadeOut(200);//手慢了，名额被抢光啦～
                                            //me.AppointmentOrReminder2(0,0,1,0,nextId);//状态切换为：预约下期；
                                        }/* else if (data.resp == 3 || data.resp == 5) { //3：表示支付成功； 5：提交订单但未支付
                                         $('.alertBox .alerts2').hide().eq(1).show();//遮罩显示:同一账号只能购买一次哦!请核对参营人员信息～
                                         $('.alerts2 .knowInner').unbind('click').click(function () {
                                         setMaiDian(SShangPinXiangQing.SCategory_SShangPinXiangQing, SShangPinXiangQing.SShangPinXiangQing_BuNengGouMaiDuoCi);//不能购买多次燃脂营
                                         $('.alertBox .alerts2').eq(1).hide();//遮罩隐藏
                                         });
                                         } */else if (data.resp == 6) {//data.resp == 6  //只有主账号才能购买，使用者不能购买
                                            $('.alertBox .alerts2').hide().eq(2).show();//遮罩显示
                                            $('.alerts2 .forSelfInner').unbind('click').click(function () {
                                                setMaiDian(SShangPinXiangQing.SCategory_SShangPinXiangQing, SShangPinXiangQing.SShangPinXiangQing_ZhuZhangHaoGouMai);//主账号购买
                                                $('.alertBox .alerts2').eq(2).hide();//遮罩隐藏
                                            });
                                        } else if (data.resp == 4) {//data.resp == 4 正常购买

                                            delCookie('chooseIndex');//删除选择优惠券时定义的cookie
                                            // window.location.href = 'confirmOrderOut.html' + window.location.search + '&classId=' + classId + '&phoneNo=' + getCookie('appOutPhone') + "&is_balance=" + is_balance; //正常跳转

                                            // var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
                                            // //电话号码需要修改
                                            // if (ua.match(/MicroMessenger/i) == "micromessenger") {
                                            //     alert(getCookie('appOutPhone'));

                                            window.location.href = 'confirmOrderOut.html' + window.location.search + '&classId=' + classId + '&phoneNo=' + getCookie('appOutPhone') + "&isOwnPicooc=" + is_balance; //正常跳转

                                        } /*else if (data.resp == 3 || data.resp == 7) {//购买时间不能冲突
                                         $('.alertBox .alerts').eq(4).stop(true).fadeIn(200).delay(2000).fadeOut(200);
                                         } else if (data.resp == 5 || data.resp == 8) {//data.resp == 8 还有未支付的订单，不能买时间冲突的其他期
                                         $('.alertBox .alerts').eq(5).stop(true).fadeIn(200).delay(2000).fadeOut(200);
                                         }*/
                                        else if (data.resp == 5) {//data.resp == 5 已经提交过订单还未支付
                                            $('.alertBox .alerts').eq(5).stop(true).fadeIn(200).delay(2000).fadeOut(200);
                                        }
                                        else {//新增需求：同期燃脂营app外可以购买多个
                                            $('.alertBox .alerts2').hide().eq(2).show();//遮罩显示
                                            $('.alertBox .alerts2 .text2').html('温馨提示：该账号已有同时段开班的燃脂营哦~');//遮罩显示
                                            $('.alerts2 .forSelfInner').unbind('click').click(function () {
                                                $('.alertBox .alerts2').eq(2).hide();//遮罩隐藏

                                                window.location.href = 'confirmOrderOut.html' + window.location.search + '&classId=' + classId + '&phoneNo=' + getCookie('appOutPhone') + "&isOwnPicooc=" + is_balance; //正常跳转


                                            });
                                        }
                                    } else {
                                        $(".error-main-t").html(data.result.message);
                                        $(".errorAlert").css("display", "block");
                                        $(".error-main").css("margin-top", -$(".error-main").height() / 2);
                                    }
                                },
                                error: function () {
                                    $(".error-main-t").html("啊哦，您的网络不太给力~");
                                    $(".errorAlert").css("display", "block");
                                    $(".error-main").css("margin-top", -$(".error-main").height() / 2);
                                }
                            });
                        }
                    }
                } else {//如果是app内
                    // alert('APP内购买');
                    // console.log('APP内购买');
                    //判断燃脂营版本
                    if (getParamByUrl('webver') > 1) { //版本正常(正式)
                        if (me.state.sellOut == false) {//当前库存不为0才可以购买
                            var urlStock = ajaxLink + '/v1/api/campSell/getClassStock' + window.location.search + '&classId=' + classId;//获取商品库存状态
                            $.ajax({
                                type: "get",
                                url: urlStock,
                                dataType: "json",
                                success: function (data) {
                                    console.log(4, data);
                                    if (data.result.code == 200) {
                                        console.log('data.resp=' + data.resp);
                                        if (data.resp == 1) {
                                            //$('.info .infoRight .times').hide().eq(5).show(); //库存：0          有未支付的订单
                                            me.setState({
                                                stock: 0
                                            });
                                            //$(me.refs.buyBtn).addClass('state7');
                                            PubSub.publish('noStock');//大类
                                            $('.alertBox .alerts').eq(2).stop(true).fadeIn(200).delay(2000).fadeOut(200);//已拍完，但还有人未付款
                                        } else if (data.resp == 2) {//库存：抢光了
                                            //$('.info .infoRight .times').hide().eq(4).show();
                                            me.setState({
                                                stock: 0,
                                                sellOut: true
                                            });
                                            PubSub.publish('noStock');//大类
                                            PubSub.publish('sellOut');//真正售罄
                                            $('.alertBox .alerts').eq(3).stop(true).fadeIn(200).delay(2000).fadeOut(200);//手慢了，名额被抢光啦～
                                            //me.AppointmentOrReminder2(0,0,1,0,nextId);//状态切换为：预约下期；
                                        } else if (data.resp == 3 || data.resp == 5) { //3：表示支付成功； 5：提交订单但未支付
                                            $('.alertBox .alerts2').hide().eq(1).show();//遮罩显示:同一账号只能购买一次哦!请核对参营人员信息～
                                            $('.alerts2 .knowInner').unbind('click').click(function () {
                                                setMaiDian(SShangPinXiangQing.SCategory_SShangPinXiangQing, SShangPinXiangQing.SShangPinXiangQing_BuNengGouMaiDuoCi);//不能购买多次燃脂营
                                                $('.alertBox .alerts2').eq(1).hide();//遮罩隐藏
                                            });
                                        } else if (data.resp == 6) {//data.resp == 6  //只有主账号才能购买，使用者不能购买
                                            $('.alertBox .alerts2').hide().eq(2).show();//遮罩显示
                                            $('.alerts2 .forSelfInner').unbind('click').click(function () {
                                                setMaiDian(SShangPinXiangQing.SCategory_SShangPinXiangQing, SShangPinXiangQing.SShangPinXiangQing_ZhuZhangHaoGouMai);//主账号购买
                                                $('.alertBox .alerts2').eq(2).hide();//遮罩隐藏
                                            });
                                        } else if (data.resp == 4) {//data.resp == 4 正常购买
                                            delCookie('chooseIndex');//删除选择优惠券时定义的cookie
                                            var url = absoluteUrl + 'confirmOrder.html' + window.location.search + '&classId=' + classId; //正常跳转

                                            var getPageInfo = function () {
                                                var data = {
                                                    link: url,
                                                    animation: 1//默认1从右到左，2从下到上
                                                };
                                                return JSON.stringify(data);
                                            };
                                            var deviceType = isMobile();
                                            if (deviceType == "isApp") {
                                                /*var data={
                                                    link:absoluteUrl+"figureContrastShare.html"+window.location.search,
                                                    animation: 1//默认1从右到左，2从下到上
                                                };
                                                data=JSON.stringify(data);
                                                mobileApp.openWebview(data);*/
                                                appFc.openWebview(getPageInfo());
                                            } else {
                                                window.location.href = url;
                                            }
                                        } else if (data.resp == 7) {//data.resp == 7 相同手机号码不能在同一开营周期内购买多个燃脂营；
                                            $('.alertBox .alerts').eq(4).stop(true).fadeIn(200).delay(2000).fadeOut(200);
                                        } else if (data.resp == 8) {//data.resp == 8 您在当前所选时段内已有订单啦，处理后再来试试吧~
                                            $('.alertBox .alerts').eq(6).html('您在当前所选时段内已有订单啦，处理后再来试试吧~').stop(true).fadeIn(200).delay(2000).fadeOut(200);
                                        }
                                    } else {
                                        $(".error-main-t").html(data.result.message);
                                        $(".errorAlert").css("display", "block");
                                        $(".error-main").css("margin-top", -$(".error-main").height() / 2);
                                    }
                                },
                                error: function () {
                                    $(".error-main-t").html("啊哦，您的网络不太给力~");
                                    $(".errorAlert").css("display", "block");
                                    $(".error-main").css("margin-top", -$(".error-main").height() / 2);
                                }
                            });
                        }
                    } else { //版本过低
                        if (getParamByUrl("os") == "iOS") {// 判断如果是ios
                            $('.alertBox .alerts2').hide().eq(0).show();//遮罩显示升级
                            $('.alerts2 .isUpdate .cancel').unbind('click').click(function () {
                                $('.alertBox .alerts2').hide();
                                //setMaiDian(SShangPinXiangQing.SCategory_SShangPinXiangQing, SShangPinXiangQing.SShangPinXiangQing_QuYouZanGouMai);//去有赞购买

                                //window.location.href = data.resp.share.shareUrl;//此处需要修改，跳转到有赞购买；
                            });
                            $('.alerts2 .isUpdate .updata').unbind('click').click(function () {
                                setMaiDian(SShangPinXiangQing.SCategory_SShangPinXiangQing, SShangPinXiangQing.SShangPinXiangQing_ShengJiBanBen);//版本升级埋点
                                window.location.href = 'https://itunes.apple.com/us/app/picooc/id729928969?mt=8'; //跳转到APP版本升级页面
                            });

                        } else if (getParamByUrl("os") == "android") {// 判断如果是android
                            $('.alertBox .alerts2').hide().eq(3).show();//遮罩显示升级
                            $('.alerts2 .notGengXin').unbind('click').click(function () {
                                $('.alertBox .alerts2').hide();
                                //setMaiDian(SShangPinXiangQing.SCategory_SShangPinXiangQing, SShangPinXiangQing.SShangPinXiangQing_QuYouZanGouMai);//去有赞购买
                            });
                        }
                        $('.alerts2 .cancelBg').unbind('click').click(function () {
                            setMaiDian(SShangPinXiangQing.SCategory_SShangPinXiangQing, SShangPinXiangQing.SShangPinXiangQing_QuXiaoShengJiBanBen);//取消升级版本
                            $('.alertBox .alerts2').hide();//遮罩隐藏
                        });
                    }
                }
            }
        }

    },

    //outAppService:app外客服function
    outAppService: function () {
        window.location.href = 'https://kefu.easemob.com/webim/im.html?tenantId=26797';
    },

    //点击设置开售提醒
    warningBuy: function () {
        var me = this;
        var data = me.props.saleState;
        var info1ClassesArr = me.state.info1ClassesArr;
        var classId = info1ClassesArr[0].classId;
        var url = window.location.protocol + "//" + window.location.host + window.location.pathname;
        url = url.slice(0, -5);//去掉.html
        console.log(url);
        //var getAppointmentUrl = "http://172.17.1.233:8080/v1/api/campSell/getAppointment" + window.location.search+'&classId='+classId+'&url='+url;//将用户点击状态返回给后台
        var getAppointmentUrl = ajaxLink + "/v1/api/campSell/getAppointment" + window.location.search + '&classId=' + classId + '&url=' + url;//将用户点击状态返回给后台
        $.ajax({
            type: 'get',
            url: getAppointmentUrl,
            dataType: "json",
            success: function (data) {
                if (data.code == 200) {
                    console.log(data);
                    $(me.refs.warningBtn).addClass('state9').html('已提醒');
                } else {
                    $(".error-main-t").html(data.result.message);
                    $(".errorAlert").css("display", "block");
                    $(".error-main").css("margin-top", -$(".error-main").height() / 2);
                }
            },
            error: function () {
                $(".error-main-t").html(data.message);
                $(".errorAlert").css("display", "block");
                $(".error-main").css("margin-top", -$(".error-main").height() / 2);
            }
        });
    }

});

module.exports = ProductDetails_saleState;