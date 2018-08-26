/**
 * Created by ichangtou on 2017/5/13.1
 */
const Dimensions = require('./Dimensions');
var preMove = 0

class AutoMove {
    static autoMove() {
        console.log('automove')
    }

    static startMove(divHeight) {

        let screenHeight = Dimensions.getWindowHeight();
        let perTime = 5;
        let totalTime = 600;
        let posY = window.pageYOffset;
        let transY = divHeight - (posY + screenHeight);
        if(transY > 0) {
            preMove = transY/(totalTime/perTime);
            var func = (preMove,TotalTime) => {
                return new Promise((resolve,reject) => {
                    var timer = setInterval(this.move,perTime);
                    setTimeout(function(){
                        resolve(window.clearInterval(timer))
                    }, totalTime);
                })
            }
            return func()
        } else {
            return Promise.resolve();
        }
    }

    static move() {
        let nextPos = window.pageYOffset + Math.ceil(preMove);
        scrollTo(0,nextPos);
    }
}

module.exports = AutoMove;