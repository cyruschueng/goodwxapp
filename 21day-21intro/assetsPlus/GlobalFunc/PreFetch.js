/**
 * Created by ichangtou on 2017/5/13.1
 */
// const Dimensions = require('./Dimensions');
var preMove = 0;
const OnFire = require('onfire.js');

class PreFetch {
    static fetchRes(url,time) {
        //根据url,time来设置加载
        let info = {};
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('start done' + url);
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url);
                xhr.send();
                // xhr.onprogress =(event)=> {
                //     if(event.lengthComputable){
                //         OnFire.fire('LOADING',event);
                //     }
                // };
                info.url = url;
                resolve(info);
            }, time);
        });
    }

    static fetchSerialRes(url) {
        //根据url,time来设置加载
        // let info = {};
        return new Promise((resolve, reject) => {
                console.log('start done' + url);
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url);
                xhr.send();
                xhr.onload = ()=> {
                    console.log();
                    resolve(true);
                };
            // xhr.onprogress =(event)=> {
                //     if(event.lengthComputable){
                //         OnFire.fire('LOADING',event);
                //     }
                // };
                // info.url = url;

        });
    }

    //     let screenHeight = Dimensions.getWindowHeight();
    //     let perTime = 5;
    //     let totalTime = 600;
    //     let posY = window.pageYOffset;
    //     let transY = divHeight - (posY + screenHeight);
    //     if(transY > 0) {
    //         preMove = transY/(totalTime/perTime);
    //         var func = (preMove,TotalTime) => {
    //             return new Promise((resolve,reject) => {
    //                 var timer = setInterval(this.move,perTime);
    //                 setTimeout(function(){
    //                     resolve(window.clearInterval(timer))
    //                 }, totalTime);
    //             })
    //         }
    //         return func()
    //     } else {
    //         return Promise.resolve();
    //     }
    // }

    // static move() {
    //     let nextPos = window.pageYOffset + Math.ceil(preMove);
    //     scrollTo(0,nextPos);
    // }
}

module.exports = PreFetch;