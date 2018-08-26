class Body extends Phaser.Sprite {

  constructor (game, x, y, frame) {
    super (game, x, y, 'runBody', frame)

    //set bounds
    this.game.physics.arcade.enableBody(this);
    this.body.collideWorldBounds = true;

    this.x = x
    this.y = y

    this.width = 283
    this.height = 619

    // this.width = 250
    // this.height = 499

    this.anchor.set(0.5, 0.8)
    this.animations.add('run', [0,1,2,3,4,5,6,7], 10, true)
  }

  start (speed) {
    // this.animations.add('run', null, 8, true)
    // console.log(this.animations.getAnimation('run').speed);
    this.animations.getAnimation('run').speed = speed
    this.animations.play('run');
  }

  stop () {
    this.animations.stop('run')
  }

}

export default Body