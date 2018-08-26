import vuedata from './main'
class Gameimg extends Phaser.State {

  constructor () {
    super()
  }

  init () {

    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    this.game.load.crossOrigin = 'anonymous';
  }

  preload () {

    //lgame_runbody.png
    this.game.load.image('gameBg', require('./../images/lgamebg.jpg'))
    this.game.load.spritesheet('runBody', require('./../images/runbody.png'), 283, 619, 8)
    // this.game.load.image('tximg', require('./../images/tximgtest.png'))
    this.game.load.image('tximg', vuedata.tximgurl)
    this.game.load.image('smallcard', require('./../images/lsmallcard.png'))
    this.game.load.image('gradebg', require('./../images/lgamegrade.png'))
    this.game.load.image('camerapL', require('./../images/lgame_leftp.png'))
    this.game.load.image('camerapR', require('./../images/lgame_rightp.png'))
    // this.game.load.image('time3', require('./../images/lgame_3s.png'))
    // this.game.load.image('time5', require('./../images/lgame_5s.png'))
    // this.game.load.image('time7', require('./../images/lgame_7s.png'))
    // this.game.load.image('time10', require('./../images/lgame_10s.png'))

    this.game.load.image('time3', require('./../images/lgame_3num.png'))
    this.game.load.image('time5', require('./../images/lgame_5num.png'))
    this.game.load.image('time7', require('./../images/lgame_7num.png'))
    this.game.load.image('time10', require('./../images/lgame_10num.png'))

    this.game.load.image('ds1', require('./../images/l_game_one.png'))
    this.game.load.image('ds2', require('./../images/l_game_two.png'))
    this.game.load.image('ds3', require('./../images/l_game_three.png'))
    this.game.load.image('startword', require('./../images/l_game_startbtn.png'))
    this.game.load.image('bag', require('./../images/lgame_bag.png'))
    this.game.load.image('glassA', require('./../images/lgame_glass1.png'))
    this.game.load.image('glassB', require('./../images/lgame_glass2.png'))
    this.game.load.image('treeA', require('./../images/lgame_tree1.png'))
    this.game.load.image('treeB', require('./../images/lgame_tree2.png'))
    this.game.load.image('treeC', require('./../images/lgame_tree3.png'))
    this.game.load.image('treeD', require('./../images/lgame_tree4.png'))
  }

  create () {
    this.game.state.start('game')
  }
}

export default Gameimg