class Camerap extends Phaser.Group {

  constructor (game, world, name, addToStage, enableBody) {
    super(game, world, name, addToStage, enableBody)

    this.w = this.game.world.width
    this.h = this.game.world.height

    this.startX = [this.w*0.1, this.w*0.45, this.w*0.55]
    this.startY = [this.h *0.4, this.h * 0.285, this.h * 0.285]

    this.endX = [-this.w*0.4, -this.w*0.1, this.w*1.1]
    this.endY = [this.h*0.4, this.h, this.h]

    this.PeopleArray = ['camerapL','camerapR','time3','time5','time7','time10']

    this.tweendr = 5000
  }

  createPeople (i) {
    var who = i
    this.game.time.events.remove(this['timeEvent'+who])
    this['timeEvent'+who] = this.game.time.events.add(2500, this.createTree, this, who)
    var treeC = this.create(this.startX[who], this.startY[who], this.PeopleArray[who], null, true, this.length)
    treeC.anchor.set(0, 0)//设置图片坐标与画布左上角相对位置
    treeC.scale.setTo(1,1)


    var tween1 = this.game.add.tween(treeC.scale).to({x:0.3, y: 0.3}, this.tweendr, Phaser.Easing.Quadratic.Out, true)
    var tween2 = this.game.add.tween(treeC).to({x: this.endX[who], y: this.endY[who]}, this.tweendr, Phaser.Easing.Quadratic.Out, true)

    tween2.onComplete.add(()=>{
      treeC.kill()
      this.remove(treeC)
      this.game.tweens.remove(tween1)
      this.game.tweens.remove(tween2)
    })
  }

  start () {
    // this.timeEvent0 = this.game.time.events.add(50,this.createPeople,this,0)
    // this.timeEvent1 = this.game.time.events.add(0, this.createPeople, this, 1)
    // this.timeEvent2 = this.game.time.events.add(0, this.createPeople, this, 2)
    // this.timeEvent3 = this.game.time.events.add(0, this.createPeople, this, 3)
    // this.timeEvent4 = this.game.time.events.add(0, this.createPeople, this, 4)
    // this.timeEvent5 = this.game.time.events.add(0, this.createPeople, this, 5)
  }

}

export default Camerap