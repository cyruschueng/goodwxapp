import body from './body'
import leftright from './leftright'
import vuedata from './main'
class Game extends Phaser.State{
  constructor() {
    super()
  }

  init () {

    this.time = 10//60
    this.score = 0
    this.countDownTimer=null;//剩余时间计时器
    this.startSpeed=8//跑步开始速度
    this.gamenum=vuedata.gameNum
    console.log(this.gamenum);

    this.w = this.game.world.width
    this.h = this.game.world.height

    this.isCanrun=false//跑步是否能点击

    this.isCanAddtime=true//是否可以加时间
    this.isCanAddimg=true//是否可以得卡片

    this.addTimeCount=0//加时间一共加了几次
    this.addImgCount=0//得图片一共得了几张

  }

  preload () {

  }

  create () {

    // console.log(this);

    var _self=this;

    //  setup game bg
    this.gameBg = this.add.sprite(0, 0, 'gameBg')
    this.gameBg.width = this.game.world.width
    this.gameBg.height = this.game.world.height

    //  setup time&scorebg
    this.gradebg = this.add.sprite(60, this.h*0.03,'gradebg')
    this.gradebg.width = 630
    this.gradebg.height = 156

    //  setup score
    this.scoreText = this.add.text(this.gradebg.x+80, this.gradebg.y*3.5, this.score+'km', {
      font: '50px', fill: '#232866', align: 'center',fontWeight:'bold',
    })

    //  setup time
    this.timeText = this.add.text(this.gradebg.x+430, this.gradebg.y*3.5, this.timeFilter(this.time), {
      font: '50px', fill: '#232866', align: 'center',fontWeight:'bold',
    })

    //  setup runpeople
    this.runpeople = new body(this.game, this.game.world.centerX, this.h*0.65)
    this.add.existing(this.runpeople)

    //tximgold
    // this.tximg = this.add.sprite(this.runpeople.x-140,this.runpeople.y-380, 'tximg')
    // this.tximg.anchor.set(0.5,1);//相对于自己定点的位置
    // this.tximg.width = 300
    // this.tximg.height = 220

   //tximgnew
    this.tximg = this.add.sprite(this.runpeople.x,this.runpeople.y-100, 'tximg')
    this.tximg.anchor.set(0.5,1);//相对于自己定点的位置
    this.tximg.width = 320
    this.tximg.height = 300
    //397 445



    //leftRight
    //  setup tree
    this.tree = new leftright(this.game, this.game.world, 'treeGroup', true, true)
    this.add.existing(this.tree)

    //点击跑步前进
    this.gameBg.inputEnabled = true
    var stopTimer;
    var treestart=false;
    this.gameBg.events.onInputDown.add(function () {
      if(_self.isCanrun){
        clearInterval(stopTimer);
        if(!treestart){
          _self.tree.start();
          treestart=true;
        }
        if(_self.startSpeed >= 20){
          _self.startSpeed=20
        }else {
          if(_self.startSpeed<8){
            _self.startSpeed=8;
          }
          _self.startSpeed++;
        }
        _self.tree.updateSpeed(_self.startSpeed);
        _self.runpeople.start(_self.startSpeed);
      }
    })

    this.gameBg.events.onInputUp.add(function () {
      if(_self.isCanrun){
        _self.score+=0.5;
        vuedata.score=_self.score;
        _self.scoreText.text=_self.score+'km';
        // console.log(startSpeed);
        stopTimer=setInterval(function () {
          _self.startSpeed--;
          _self.tree.updateSpeed(_self.startSpeed);
          if(_self.startSpeed>0){
            _self.runpeople.start(_self.startSpeed);
          }else{
            clearInterval(stopTimer);
            treestart=false;
            _self.runpeople.stop();
            _self.tree.stop();
            // _self.game.paused = true;
          }
        },200)
      }

    })



    //start button(3-2-1)
    this.startword = this.add.sprite(150,(this.h-136)/2,'startword')
    this.startword.width = 450
    this.startword.height = 136
    this.startword.inputEnabled = true
    this.startword.events.onInputDown.add(()=>{
      this.startword.visible=false;
      //num3start
      // this.ds3 = _self.add.sprite(295,(_self.h-254)/2,'ds3')
      this.ds3 = _self.add.sprite(375,(_self.h-254)/2+127,'ds3')
      this.ds3.width = 160
      this.ds3.height = 254
      this.ds3.anchor.set(0.5,0.5);
      this.ds3.scale.setTo(0, 0)
      var NumAn3=this.game.add.tween(this.ds3.scale).to({x: 1, y: 1}, 700, Phaser.Easing.Circular.In, true)
      NumAn3.onComplete.add(()=>{
        //num3end
        var NumAn3end=this.game.add.tween(this.ds3.scale).to({x: 0, y: 0}, 700, Phaser.Easing.Circular.In, true)
        NumAn3end.onComplete.add(()=>{
          //num2start
          this.ds2 = _self.add.sprite(375,(_self.h-254)/2+127,'ds2')
          this.ds2.width = 160
          this.ds2.height = 254
          this.ds2.anchor.set(0.5,0.5);
          this.ds2.scale.setTo(0, 0)
          var NumAn2=this.game.add.tween(this.ds2.scale).to({x: 1, y: 1}, 700, Phaser.Easing.Circular.In, true)
          NumAn2.onComplete.add(()=>{
            //num2end
            var NumAn2end=this.game.add.tween(this.ds2.scale).to({x: 0, y: 0}, 700, Phaser.Easing.Circular.In, true)
            NumAn2end.onComplete.add(()=>{
              //num1start
              this.ds1 = _self.add.sprite(375,(_self.h-254)/2+127,'ds1')
              this.ds1.width = 160
              this.ds1.height = 254
              this.ds1.anchor.set(0.5,0.5);
              this.ds1.scale.setTo(0, 0)
              var NumAn1=this.game.add.tween(this.ds1.scale).to({x: 1, y: 1}, 700, Phaser.Easing.Circular.In, true)
              NumAn1.onComplete.add(()=>{
                //num1end
                var NumAn1end=this.game.add.tween(this.ds1.scale).to({x: 0, y: 0}, 700, Phaser.Easing.Circular.In, true)
                NumAn1end.onComplete.add(()=>{
                  console.log('game start');
                  this.isCanrun=true;
                  this.countDownTime();
                  //setbag
                  this.bag = this.add.sprite(520,this.h*0.8, 'bag')
                  this.bag.width = 183
                  this.bag.height = 185
                  //点击背包
                  this.bag.inputEnabled = true
                  this.bag.events.onInputDown.add(function () {
                    if(_self.isCanrun){
                      _self.game.paused = true;
                    }
                    clearInterval(_self.countDownTimer);
                    vuedata.openbag();

                    //test restart
                    // _self.restartGame();
                  })
                })
              })
            })

          })
        })

      })
    })

    //setup gamenum

    // this.numText = this.add.text(this.gradebg.x+300,this.gradebg.y*18,this.gamenum,{
    //   font: '24px', fill: '#232866', align: 'center',fontWeight:'bold',
    // })



    //test
    // this.randomimg();
    // this.randomtime();

  }

  update(){
    //一直监听
    //跑步人的头的位置
    //console.log(this.runpeople.frame);
    // if(this.runpeople.frame == 0){
    //   this.tximg.x=this.runpeople.left+this.runpeople.width*(145/283);
    //   this.tximg.y=this.runpeople.top+this.runpeople.height*(329/619);
    // }else if(this.runpeople.frame == 1){
    //   this.tximg.x=this.runpeople.left+this.runpeople.width*(127/283);
    //   this.tximg.y=this.runpeople.top+this.runpeople.height*(339/619);
    // }else if(this.runpeople.frame == 2){
    //   this.tximg.x=this.runpeople.left+this.runpeople.width*(156/283);
    //   this.tximg.y=this.runpeople.top+this.runpeople.height*(322/619);
    // }else if(this.runpeople.frame == 3){
    //   this.tximg.x=this.runpeople.left+this.runpeople.width*(188/283);
    //   this.tximg.y=this.runpeople.top+this.runpeople.height*(297/619);
    // }else if(this.runpeople.frame == 4){
    //   this.tximg.x=this.runpeople.left+this.runpeople.width*(164/283);
    //   this.tximg.y=this.runpeople.top+this.runpeople.height*(330/619);
    // }else if(this.runpeople.frame == 5){
    //   this.tximg.x=this.runpeople.left+this.runpeople.width*(150/283);
    //   this.tximg.y=this.runpeople.top+this.runpeople.height*(360/619);
    // }else if(this.runpeople.frame == 6){
    //   this.tximg.x=this.runpeople.left+this.runpeople.width*(152/283);
    //   this.tximg.y=this.runpeople.top+this.runpeople.height*(336/619);
    // }else if(this.runpeople.frame == 7){
    //   this.tximg.x=this.runpeople.left+this.runpeople.width*(112/283);
    //   this.tximg.y=this.runpeople.top+this.runpeople.height*(314/619);
    // }


    //new
    if(this.runpeople.frame == 0){
      this.tximg.x=this.runpeople.left+this.runpeople.width*(145/283);
      this.tximg.y=this.runpeople.top+this.runpeople.height*(382/619);
    }else if(this.runpeople.frame == 1){
      this.tximg.x=this.runpeople.left+this.runpeople.width*(127/283);
      this.tximg.y=this.runpeople.top+this.runpeople.height*(389/619);
    }else if(this.runpeople.frame == 2){
      this.tximg.x=this.runpeople.left+this.runpeople.width*(156/283);
      this.tximg.y=this.runpeople.top+this.runpeople.height*(372/619);
    }else if(this.runpeople.frame == 3){
      this.tximg.x=this.runpeople.left+this.runpeople.width*(188/283);
      this.tximg.y=this.runpeople.top+this.runpeople.height*(347/619);
    }else if(this.runpeople.frame == 4){
      this.tximg.x=this.runpeople.left+this.runpeople.width*(164/283);
      this.tximg.y=this.runpeople.top+this.runpeople.height*(380/619);
    }else if(this.runpeople.frame == 5){
      this.tximg.x=this.runpeople.left+this.runpeople.width*(150/283);
      this.tximg.y=this.runpeople.top+this.runpeople.height*(410/619);
    }else if(this.runpeople.frame == 6){
      this.tximg.x=this.runpeople.left+this.runpeople.width*(152/283);
      this.tximg.y=this.runpeople.top+this.runpeople.height*(386/619);
    }else if(this.runpeople.frame == 7){
      this.tximg.x=this.runpeople.left+this.runpeople.width*(112/283);
      this.tximg.y=this.runpeople.top+this.runpeople.height*(364/619);
    }

    //
    //随机出现小人
    // if(this.isCanrun){
    //   var randomNum=this.getrd(0,10000);
    //   // console.log(randomNum);
    //   //随机加时间
    //   if(this.isCanAddtime){
    //     if(randomNum <= 50){
    //       this.isCanAddtime=false;
    //       this.randomtime();
    //     }
    //   }
    //   //随机获得卡片
    //   if(this.isCanAddimg){
    //     if(randomNum >= 9950){
    //       this.isCanAddimg=false;
    //       this.randomimg();
    //     }
    //   }
    // }

  }

  timeFilter(value){
    // 直接是秒
    var theTime = parseInt(value);// 秒

    var theTime1 = 0;// 分
    var theTime2 = 0;// 小时
    if(theTime >= 60) {
      theTime1 = parseInt(theTime/60);
      theTime = parseInt(theTime%60);
      if(theTime1 >= 60) {
        theTime2 = parseInt(theTime1/60);
        theTime1 = parseInt(theTime1%60);
      }
    }

    if(theTime2<10){
      theTime2='0'+theTime2;
    }
    if(theTime1<10){
      theTime1='0'+theTime1;
    }
    if(theTime<10){
      theTime='0'+theTime;
    }
    return theTime1+':'+theTime
  }

  //  倒计时60s
  countDownTime(){
    this.countDownTimer = setInterval(()=>{
      if (this.time == 0) {
        clearInterval(this.countDownTimer)
        this.game.paused = true;
        vuedata.openend();
      }else {
        this.time--;
      }
      this.timeText.text=this.timeFilter(this.time);
    }, 1000)
  }

  getrd(n,m){
    var c = m-n+1;
    return Math.floor(Math.random() * c + n);
  }

  randomtime(){
    this.timeArr=['time3','time5','time7','time10']
    this.timeAdd=[3,5,7,10]
    this.camerapL = this.add.sprite(-this.w*0.3, this.h*0.65,'camerapL')
    this.camerapL.width = 221
    this.camerapL.height = 292
    var camerapLAni = this.game.add.tween(this.camerapL).to({x:-this.w*0.1,y:this.h*0.65}, 500, Phaser.Easing.Linear.In, true)
    camerapLAni.onComplete.add(()=>{
      var a=this.getrd(0,3);
      this.timeArr[a] = this.add.sprite(this.w*0.17, this.h*0.6,this.timeArr[a])
      this.timeArr[a].width = 124
      this.timeArr[a].height = 110

      var timeNumAni1=this.game.add.tween(this.timeArr[a].scale).to({x: 0, y: 0}, 1500, Phaser.Easing.Circular.In, true)
      var timeNumAni2=this.game.add.tween(this.timeArr[a]).to({x:this.w*0.8,y:this.h*0.05}, 1500, Phaser.Easing.Circular.In, true)
      timeNumAni2.onComplete.add(()=>{
        this.time+=this.timeAdd[a];
        this.timeText.text=this.timeFilter(this.time);
        var camerapLAniback = this.game.add.tween(this.camerapL).to({x:-this.w*0.3,y:this.h*0.65}, 500, Phaser.Easing.Linear.In, true)
        camerapLAniback.onComplete.add(()=>{
          this.isCanAddtime=true;
        })
      })

    })
  }

  randomimg(){
    var imgtextArr=['大长腿','秀肌肉','蜜桃臀','意想不到'];
    var a=this.getrd(0,3);
    // this.camerapR = this.add.sprite(this.w*0.8, this.h*0.65,'camerapR')
    //0-大长腿，1-秀肌肉，2-蜜桃臀，3-意想不到
    this.camerapR = this.add.sprite(this.w*1, this.h*0.65,'camerapR')
    this.camerapR.width = 221
    this.camerapR.height = 292
    // this.camerapR.scale.setTo(1.2, 1.2)
    var camerapRAni = this.game.add.tween(this.camerapR).to({x:this.w*0.8,y:this.h*0.65}, 500, Phaser.Easing.Linear.In, true)
    camerapRAni.onComplete.add(()=>{
      this.smallcard= this.add.sprite(this.w*0.73, this.h*0.65,'smallcard')
      this.smallcard.width = 80
      this.smallcard.height = 84
      this.smallcard.scale.setTo(1.2, 1.2)

      var smallcard1 = this.game.add.tween(this.smallcard.scale).to({x: 0, y: 0}, 1500, Phaser.Easing.Circular.In, true)

      var smallcard2 = this.game.add.tween(this.smallcard).to({x:this.w*0.8,y:this.h*0.9}, 1500, Phaser.Easing.Circular.In, true)

      smallcard1.onComplete.add(()=>{
        var camerapRAniback = this.game.add.tween(this.camerapR).to({x:this.w*1,y:this.h*0.65}, 500, Phaser.Easing.Linear.In, true)
        //getimg
        vuedata.imgArr[a]=1;
        vuedata.isGetimg=true;
        // console.log(vuedata.imgArr);
        camerapRAniback.onComplete.add(()=>{
          this.isCanAddimg=true
        })
      })
    })


    //
    // //test restart
    // var _gameself=this;
    // this.camerapR.inputEnabled = true
    // this.camerapR.events.onInputDown.add(function () {
    //   _gameself.state.restart();
    //   _gameself.runpeople.stop();
    //   clearInterval(_gameself.countDownTimer);
    // })
    // //test restart

    // this.smallcard= this.add.sprite(this.w*0.73, this.h*0.65,'smallcard')
    // this.smallcard.width = 80
    // this.smallcard.height = 84
    // this.smallcard.scale.setTo(1.2, 1.2)
    //
    // var smallcard1 = this.game.add.tween(this.smallcard.scale).to({x: 0, y: 0}, 1500, Phaser.Easing.Circular.In, true)
    //
    // var smallcard2 = this.game.add.tween(this.smallcard).to({x:this.w*0.86,y:this.h*0.9}, 1500, Phaser.Easing.Circular.In, true)
    //
    // smallcard1.onComplete.add(()=>{
    //  console.log('222');
    // })

  }

  restartGame(){
    this.state.restart();
    this.runpeople.stop();
    clearInterval(this.countDownTimer);
  }

}

export default Game