var React=require("react");
var ReactDOM=require("react-dom");
var PubSub = require("pubsub-js");

var nowDate;
var userAgentInfo = navigator.userAgent;
var ProductDetails_productState=React.createClass({

    getInitialState:function(){
        var me = this;
        return {
            nowType:'', //当前类型，默认A类
            nowClass:'',//当前班级 默认第一个
            originPrice:'',
            curentPrice:'',
            especialPrice:'',
            stock:'', //初始化库存
            sellOut:'',
            limited:'', //限时特价
            limitedEndtime:'',//显示特价结束时间
            day:'',
            hour:'',
            minute:'',
            second:''
        };
    },

    componentWillMount:function(){
        var me = this;
        var data = me.props.productState;
        //alert(data.resp.nowDate);
        nowDate = data.resp.nowDate;

        if((getParamByUrl("os")=="iOS") || (!!userAgentInfo.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/))){// 判断如果是ios，显示2016/11/14的格式；
            nowDate = nowDate.replace(/-/g,"/");
        }
        nowDate = parseInt((new Date(nowDate))/1000);

        setInterval(function () {
            nowDate ++;
            //console.log('nowDate='+nowDate);
        }, 1000);

        var nowTypeNum = 0;
        for(var i=0; i<data.resp.info.length; i++){
            if(data.resp.info[i].hasStock){
                nowTypeNum = i;
                break;
            }
        }


        var info1 = data.resp.info[nowTypeNum];//类型
        console.log("info1", info1.classes);
        var info1ClassesArr = info1.classes;//当前类型下所有班级
        var nowIndex = 0;//当前类型下的第一个班级
        for(var i=0; i<info1ClassesArr.length; i++){
            //有库存
            if(info1ClassesArr[i].sellOut == false){
                nowIndex = i;
                break;
            }
        }

        me.setState({
            nowType: nowTypeNum,
            nowClass:nowIndex,
            originPrice:info1ClassesArr[nowIndex].originPrice,
            curentPrice:info1ClassesArr[nowIndex].curentPrice,
            especialPrice:info1ClassesArr[nowIndex].especialPrice,
            stock:info1ClassesArr[nowIndex].stock,
            sellOut:info1ClassesArr[nowIndex].sellOut,
            limited:info1ClassesArr[nowIndex].limited,
            limitedEndtime:info1ClassesArr[nowIndex].limitedEndtime
        });
        //alert(me.state.nowClass);




    },


    componentDidMount:function(){

        var me = this;
        var data = me.props.productState;
        console.log('me',me);

        if(me.state.limited == 1){//限时特价商品时间展示

            var limitedEndtime = me.state.limitedEndtime;
            //var day,hour,minute,second;
            if((getParamByUrl("os")=="iOS") || (!!userAgentInfo.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/))){// 判断如果是ios，显示2016/11/14的格式；
                limitedEndtime = limitedEndtime.replace(/-/g,"/");
                //nowDate = nowDate.replace(/-/g,"/");
            }else{}
            var intDiff = new Date(limitedEndtime);
            //console.log(parseInt(intDiff/1000));
            console.log(nowDate);
            intDiff = parseInt(intDiff/1000) - nowDate;//倒计时总秒数量
            console.log('intDiff='+intDiff);

            var aboutTimerInit,aboutTimerType,aboutTimerClass;
            aboutTimerInit = setInterval(function () {
                console.log(111);
                if (intDiff > 0) {
                    var day = Math.floor(intDiff / (60 * 60 * 24));
                    var hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
                    var minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
                    var second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
                    day = (day<10?'0':'') + day;
                    hour = (hour<10?'0':'') + hour;
                    minute = (minute<10?'0':'') + minute;
                    second = (second<10?'0':'') + second;
                    me.setState({
                        day:day,
                        hour:hour,
                        minute:minute,
                        second:second
                    });
                    intDiff--;
                }else if(intDiff == 0){
                    window.location.reload();//倒计时为0时，刷新整个页面
                    clearInterval(aboutTimerInit);//清除定时器
                }
            }, 1000);
        }


        //当publish的时候才会执行subscribe
        me.sectionValue = PubSub.subscribe("chooseType", function(msg, section){
            clearInterval(aboutTimerInit);//清除定时器
            clearInterval(aboutTimerType);//清除定时器
            clearInterval(aboutTimerClass);//清除定时器
            console.log('me.state.day='+me.state.day);
            var info1 = data.resp.info[section];//类型
            //me.setState({
            //    nowType:section
            //});
            //info1 = data.resp.info[section][0];//类型
            var info1ClassesArr = info1.classes;//当前类型下所有班级
            var nowIndex = 0;//当前类型下的第一个班级
            for(var i=0; i<info1ClassesArr.length; i++){
                //有库存
                if(info1ClassesArr[i].sellOut == false){
                    nowIndex = i;
                    break;
                }
            }
            me.setState({
                nowType:section,
                nowClass:nowIndex,
                originPrice:info1ClassesArr[nowIndex].originPrice,
                curentPrice:info1ClassesArr[nowIndex].curentPrice,
                especialPrice:info1ClassesArr[nowIndex].especialPrice,
                stock:info1ClassesArr[nowIndex].stock,
                sellOut:info1ClassesArr[nowIndex].sellOut,
                limited:info1ClassesArr[nowIndex].limited,
                limitedEndtime:info1ClassesArr[nowIndex].limitedEndtime
            });

            if(me.state.limited == 1){//限时特价商品时间展示
                //var nowDate = data.resp.nowDate;
                var limitedEndtime = me.state.limitedEndtime;
                //var day,hour,minute,second;
                if((getParamByUrl("os")=="iOS") || (!!userAgentInfo.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/))){// 判断如果是ios，显示2016/11/14的格式；
                    limitedEndtime = limitedEndtime.replace(/-/g,"/");
                    //nowDate = nowDate.replace(/-/g,"/");
                }else{}
                var intDiff = new Date(limitedEndtime);
                intDiff = parseInt(intDiff/1000) - nowDate;//倒计时总秒数量
                console.log(intDiff);


                aboutTimerType = setInterval(function () {
                    console.log("section="+section);
                    if (intDiff > 0) {
                        var day = Math.floor(intDiff / (60 * 60 * 24));
                        var hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
                        var minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
                        var second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
                        day = (day<10?'0':'') + day;
                        hour = (hour<10?'0':'') + hour;
                        minute = (minute<10?'0':'') + minute;
                        second = (second<10?'0':'') + second;
                        me.setState({
                            day:day,
                            hour:hour,
                            minute:minute,
                            second:second
                        });
                        intDiff--;
                    }else if(intDiff == 0){
                        window.location.reload();//倒计时为0时，刷新整个页面
                        clearInterval(aboutTimerType);//清除定时器
                    }
                }, 1000);

            }
        });

        //当publish的时候才会执行subscribe
        PubSub.subscribe("chooseClass", function(msg, section){
            clearInterval(aboutTimerInit);//清除定时器
            clearInterval(aboutTimerType);//清除定时器
            clearInterval(aboutTimerClass);//清除定时器
            console.log('me.state.day='+me.state.day);
            var info1 = data.resp.info[me.state.nowType];//类型
            var info1ClassesArr = info1.classes;//当前类型下所有班级
            var nowIndex = 0;//当前类型下的第一个班级
            for(var i=0; i<info1ClassesArr.length; i++){
                //有库存
                if(info1ClassesArr[i].sellOut == false){
                    nowIndex = i;
                    break;
                }
            }
            me.setState({
                nowClass:section,
                originPrice:info1ClassesArr[section].originPrice,
                curentPrice:info1ClassesArr[section].curentPrice,
                especialPrice:info1ClassesArr[section].especialPrice,
                stock:info1ClassesArr[section].stock,
                sellOut:info1ClassesArr[section].sellOut,
                limited:info1ClassesArr[section].limited,
                limitedEndtime:info1ClassesArr[section].limitedEndtime
            });

            if(me.state.limited == 1){//限时特价商品时间展示
                //var nowDate = data.resp.nowDate;
                var limitedEndtime = me.state.limitedEndtime;
                //var day,hour,minute,second;
                if((getParamByUrl("os")=="iOS") || (!!userAgentInfo.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/))){// 判断如果是ios，显示2016/11/14的格式；
                    limitedEndtime = limitedEndtime.replace(/-/g,"/");
                    //nowDate = nowDate.replace(/-/g,"/");
                }else{}
                var intDiff = new Date(limitedEndtime);
                intDiff = parseInt(intDiff/1000) - nowDate;//倒计时总秒数量
                console.log(intDiff);


                aboutTimerClass = setInterval(function () {
                    console.log("section="+section);
                    if (intDiff > 0) {
                        var day = Math.floor(intDiff / (60 * 60 * 24));
                        var hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
                        var minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
                        var second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
                        day = (day<10?'0':'') + day;
                        hour = (hour<10?'0':'') + hour;
                        minute = (minute<10?'0':'') + minute;
                        second = (second<10?'0':'') + second;
                        me.setState({
                            day:day,
                            hour:hour,
                            minute:minute,
                            second:second
                        });
                        intDiff--;
                    }else if(intDiff == 0){
                        window.location.reload();//倒计时为0时，刷新整个页面
                        clearInterval(aboutTimerClass);//清除定时器
                    }
                }, 1000);

            }
        });
        //alert(me.state.nowType);


        //productDetails_saleState页面：点击立即购买时，库存变为0
        PubSub.subscribe("noStock", function(msg){
            me.setState({
                stock:0
            });
        });
        PubSub.subscribe("sellOut", function(msg){
            me.setState({
                sellOut:true
            });
        });




    },
    componentWillUpdate:function(){//state变化后执行
        var me = this;
        var data = me.props.productState;

    },

    render:function(){

        var me = this;
        var data = me.props.productState;
        var productStateStr = "";
        if(data.code ==200){

            var nowClass = me.state.nowClass;
            var originPrice = me.state.originPrice;
            var curentPrice = me.state.curentPrice;
            var especialPrice = me.state.especialPrice;
            var stock = me.state.stock;
            var sellOut = me.state.sellOut;
            var limited = me.state.limited;
            var day = me.state.day;
            var hour = me.state.hour;
            var minute = me.state.minute;
            var second = me.state.second;

            console.log('me.state.nowType='+me.state.nowType);
            console.log('me.state.nowClass='+me.state.nowClass);

            productStateStr =
                <aside className="row info">
                    <div className="info1"  style={{display:(limited == 0)?"block":'none'}}>
                        <div className="col-xs-12 col-sm-12 infoLeft">
                            <span className="new-priceBox">
                                ¥<span className="new-price">{(limited == 1)?especialPrice:curentPrice}</span>
                            </span>
                            <span className="old-priceBox" style={{display:(limited == 1)?((originPrice==especialPrice)?"none":'inline-block'):((originPrice==curentPrice)?"none":'inline-block')}}>
                                <del>原价</del><del className="old-price">{me.state.originPrice}</del><del>元</del>
                            </span>
                        </div>
                        <div className="col-xs-12 col-sm-12 infoRight">
                            <div className="times status status3" style={{display:(sellOut == false)?"block":'none'}}>
                                <p>剩余:<span className="num">{stock}</span>席</p>
                            </div>
                            <div className="times status2" style={{display:(sellOut == true)?"block":'none'}}>
                                <p>抢光了～</p>
                            </div>
                        </div>
                    </div>
                    <div className="info2" style={{display:((me.state.limited == 1))?"block":'none'}}>{/*有限时特价，有天数*/}
                        <div className="value"><span className="valueLogo">¥</span>&nbsp;<span className="valueNum">{(limited == 1)?especialPrice:curentPrice}</span></div>
                        <div className="teJia"><span className="priceNew">限时特价</span><br/><del className="priceOld"><del>原价</del><del className="num">{originPrice}</del><del>元</del></del></div>
                        <div className="leftTime">
                            <p className="space"><span className="">距结束还剩</span></p>
                            <p className="space"><span style={{display: (parseInt(me.state.day) > 0)?"inline-block":'none'}}><span className="num">{day}</span>天</span><span className="num">{hour}</span>时<span className="num">{minute}</span>分<span className="num">{second}</span>秒</p>
                        </div>
                    </div>
                    {/*
                     <div className="info2" style={{display:((me.state.limited == 1) && (parseInt(me.state.day) === 0))?"block":'none'}}>
                        <span className="teJiaName"><br/>限时特价</span>
                        <div className="value value2"><span className="valueLogo">¥</span>&nbsp;<span className="valueNum">{(limited == 1)?especialPrice:curentPrice}</span></div>
                        <div className="teJia teJia2"><br/><span className="priceOld"><del>原价</del><del>{originPrice}</del><del>元</del></span></div>
                        <div className="leftTime leftTime2">
                        <p className="space"><span className="">距结束还剩</span></p>
                        <p className="space"><span className="num">{hour}</span>时<span className="num">{minute}</span>分<span className="num">{second}</span>秒</p>
                        </div>
                        </div>
                    */}
            </aside>
        }
        return (
            /*产品状态*/
            <div>{productStateStr}</div>

        );
    }

});

module.exports = ProductDetails_productState;