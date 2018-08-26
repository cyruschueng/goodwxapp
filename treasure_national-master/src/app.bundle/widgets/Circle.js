/**
 * Created by Yuntian Liu
 * on 2017/10/25.
 **/
module(function () {
    var Animation = com.vizengine.animation.Animation;
    var AlphaAnimation = com.vizengine.animation.AlphaAnimation;
    var ScaleAnimation = com.vizengine.animation.ScaleAnimation;
    var TimeInterceptor = com.vizengine.animation.TimeInterceptor;

    return function (view) {
        var huge = view.$("huge_circle");
        var mid = view.$("mid_circle");
        // var small = view.$("small_circle");
        // huge.setNativeAttr("class", "hugeCorner");
        // mid.setNativeAttr("class", "midCorner");
        // small.setNativeAttr("class", "smallCorner");
        // view.setNativeAttr("class", "viewCorner");

        // var scale = new ScaleAnimation();
        // scale.fromScaleX = 0.75;
        // scale.toScaleX = 1;
        // scale.fromScaleY = 0.75;
        // scale.toScaleY = 1
        // scale.duration = 1000;
        // scale.repeatCount = 0;
        // mid.startAnimation(scale);

        // var scale1 = new ScaleAnimation();
        // scale1.fromScaleX = 0.25;
        // scale1.toScaleX = 1;
        // scale1.fromScaleY = 0.25;
        // scale1.toScaleY = 1
        // scale1.duration = 1000;
        // scale1.repeatCount = 0;
        // huge.startAnimation(scale);

        var ani = new Animation();
        ani.fromAlpha = 1;
        ani.toAlpha = 0;
        ani.duration = 3000;
        ani.repeatCount = -1;
        ani.fromScaleX = 0.25;
        ani.toScaleX = 1;
        ani.fromScaleY = 0.25;
        ani.toScaleY = 1;

        ani.midfromScaleX = 0.75;
        ani.midtoScaleX = 1;
        ani.midfromScaleY = 0.75;
        ani.midtoScaleY = 1;

        ani.midfromScaleX1 = 1;
        ani.midtoScaleX1 = 0.75;
        ani.midfromScaleY1 = 1;
        ani.midtoScaleY1 = 0.75;
        ani.timeInterceptor = new com.vizengine.animation.DecelerateInterpolator(1);


        var ani1 = new Animation();
        ani1.fromAlpha = 0;
        ani1.toAlpha = 1;
        ani1.duration = 3000;
        ani1.repeatCount = -1;
        ani1.fromScaleX = 1;
        ani1.toScaleX = 0.25;
        ani1.fromScaleY = 1;
        ani1.toScaleY = 0.25;
        ani1.timeInterceptor = new com.vizengine.animation.DecelerateInterpolator(1);


        ani.animateFrame = function (v, pro) {
            if (pro < 0.5) {
                huge.setAlpha(ani.fromAlpha + (ani.toAlpha - ani.fromAlpha) * pro * 2);
                huge.setScaleX(ani.fromScaleX + (ani.toScaleX - ani.fromScaleX) * pro * 2);
                huge.setScaleY(ani.fromScaleY + (ani.toScaleY - ani.fromScaleY) * pro * 2);
                mid.setScaleX(ani.midfromScaleX + (ani.midtoScaleX - ani.midfromScaleX) * pro * 2);
                mid.setScaleY(ani.midfromScaleY + (ani.midtoScaleY - ani.midfromScaleY) * pro * 2);
            } else {
                var _pro = (pro - 0.5) / 0.5;
                huge.setAlpha(ani1.fromAlpha + (ani1.toAlpha - ani1.fromAlpha) * _pro);
                huge.setScaleX(ani1.fromScaleX + (ani1.toScaleX - ani1.fromScaleX) * _pro);
                huge.setScaleY(ani1.fromScaleY + (ani1.toScaleY - ani1.fromScaleY) * _pro);
                mid.setScaleX(ani.midfromScaleX1 + (ani.midtoScaleX1 - ani.midfromScaleX1) * _pro);
                mid.setScaleY(ani.midfromScaleY1 + (ani.midtoScaleY1 - ani.midfromScaleY1) * _pro);
            }
        }
        huge.startAnimation(ani);


    }
})