require(function(){
 	var Object = com.appengine.core.Object;
 	var View   = com.appengine.view.View;
 	var ImageView = com.appengine.view.ImageView;
 	var LURCache  = com.appengine.core.LURCache;
 	var VelocityTracker = com.appengine.view.VelocityTracker;
 	var Animation = com.appengine.animation.Animation;
 	var AlphaAnimation = com.appengine.animation.AlphaAnimation;
    var TranslateAnimation = com.appengine.animation.TranslateAnimation;
 	var DecelerateInterpolator = com.appengine.animation.DecelerateInterpolator;
 	
 	var GestureDetector      = com.appengine.gesture.GestureDetector;
 	var PanGestureDetector   = com.appengine.gesture.PanGestureDetector;
 	var SweepGestureDetector = com.appengine.gesture.SweepGestureDetector;
 	var TapGestureDetector   = com.appengine.gesture.TapGestureDetector;
 	var PinchGestureDetector = com.appengine.gesture.PinchGestureDetector;
 	//alpha动画
 	var startAlphaAnimation = function(v, fromAlpha, toAlpha, duration, callback){
 		var ani = new AlphaAnimation();
 			ani.fromAlpha = fromAlpha;
 			ani.toAlpha   = toAlpha;
 			ani.callback  = callback;
 		v.setVisible(true);
 		v.startAnimation(ani);
 	}
    //平移动画
    var startTranslateXAnimation = function(v, fromTransX, toTransX, fromTransY, toTransY, duration, callback){
        var ani = new TranslateAnimation();
            ani.timeInteplator = new DecelerateInterpolator(2);
            ani.fromTranslateX = fromTransX || v.translateX;
            ani.toTranslateX   = toTransX ;
            ani.fromTranslateY = fromTransY || v.translateY;
            ani.toTranslateY   = toTransY ;
            ani.duration       = duration   || 200;
            ani.callback = callback;
            v.setVisible(true);
        v.startAnimation(ani);
    };
    View.extend("com.appengine.view.Plugins_gifs",{
        // <Plugins_filter tipsIcon="/home/images/wechat.png" 
        //     filterText="阿哈湖官方微信" 
        //     filterImg="/home/images/wechat.png"  
        //     filterChoosed = "true"/>
        init:function(){
            View.prototype.init.apply(this,arguments);
            this.static = 0;//指定的驻留点
        },
        dispatchLayout:function(){
            View.prototype.dispatchLayout.apply(this,arguments);
        },
        setGifPiece:function(v){
            if(!v) return;
            var self = this;
            var v = v.split(",");
            for(var i = 0,len = v.length;i<len;i++){
                var img = View.parse({
                    type:"ImageView",
                    src:v[i],
                    height:"wrap",
                    width:"match",
                    visible:self.static == i?true:false
                });
                self.addView(img);
            }
        },
        setStatic:function(index){
            index = index || 0;
            index = parseInt(index);
            var self = this;
            var len = self.subViews.length;
            for(var i = 0;i<len;i++){
                var subview = self.subViews[i];
                if(i != index){
                    subview.setVisible(false);
                }else{
                    subview.setVisible(true);
                }
            }
        }
    })
});