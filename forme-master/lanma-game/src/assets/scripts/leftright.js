class Tree extends Phaser.Group {

  constructor (game, world, name, addToStage, enableBody) {
    super(game, world, name, addToStage, enableBody)

    this.w = this.game.world.width
    this.h = this.game.world.height

    //left  right
    this.treeArray = ["treeC","glassA","treeB","treeD","glassB","treeA"]

    this.startX = [-this.w*0.9,-this.w*0.74,-this.w*1.2,this.w*1.1,  this.w*1,this.w*1.2]
    this.startY = [ this.h*0.5,  this.h*0.6,this.h*0.45,this.h*0.5,this.h*0.6,this.h*0.45]

    this.endX = [this.w*0.45,this.w*0.43,this.w*0.42,this.w*0.56,this.w*0.57,this.w*0.56]
    this.endY = [this.h*0.28,this.h*0.28,this.h*0.28,this.h*0.28, this.h*0.28,this.h*0.28]

    this.startScale=[2,2,2,2,2,2]
    this.endScale  =[0,0,0,0,0,0]

    this.tweendr=8000;//过渡速度
  }

  createTree (i) {
    var who = i
    this.game.time.events.remove(this['timeEvent'+who])
    this['timeEvent'+who] = this.game.time.events.add(2500, this.createTree, this, who)
    var treeC = this.create(this.startX[who], this.startY[who], this.treeArray[who], null, true, this.length)
    treeC.anchor.set(0, 0)//设置图片坐标与画布左上角相对位置
    treeC.scale.setTo(this.startScale[who],this.startScale[who])


    var tween1 = this.game.add.tween(treeC.scale).to({x:this.endScale[who], y: this.endScale[who]}, this.tweendr, Phaser.Easing.Quadratic.Out, true)
    var tween2 = this.game.add.tween(treeC).to({x: this.endX[who], y: this.endY[who]}, this.tweendr, Phaser.Easing.Quadratic.Out, true)

    tween2.onComplete.add(()=>{
      treeC.kill()
      this.remove(treeC)
      this.game.tweens.remove(tween1)
      this.game.tweens.remove(tween2)
    })

  }

  start () {
    this.game.time.events.start();
    this.game.tweens.resumeAll();
    //left
    this.timeEvent0 = this.game.time.events.add(0, this.createTree, this, 0)
    this.timeEvent1 = this.game.time.events.add(400, this.createTree, this, 1)
    this.timeEvent2 = this.game.time.events.add(800, this.createTree, this, 2)
    //right
    this.timeEvent3 = this.game.time.events.add(0, this.createTree, this, 3)
    this.timeEvent4 = this.game.time.events.add(400,this.createTree, this, 4)
    this.timeEvent5 = this.game.time.events.add(800,this.createTree, this, 5)
  }

  updateSpeed(speed){
    if(speed<=8){
      this.tweendr=8000;
    }else if(speed>8 && speed<=11){
      this.tweendr=7000;
    }else if(speed>11 && speed<=14){
      this.tweendr=6000;
    }else if(speed>14 && speed<=17){
      this.tweendr=5000;
    }else if(speed>17){
      this.tweendr=4000;
    }

  }

  stop(){
    //事件
    this.game.time.events.stop();
    //动画
    this.game.tweens.pauseAll();
  }

}

export default Tree