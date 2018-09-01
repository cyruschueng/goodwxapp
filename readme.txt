datixiaochengxu-master  答题
D:\xcx\xcx_share\firstMusic-master 猜音乐  世界排名  pk good

D:\xcx\xcx_share\hyuki-master\wxGame  答题分享 错了分享一个群

wx9f4368caa4218285

D:\xcx\xcx_share\idiom-master\chengyu1 成语消消乐

D:\xcx\xcx_share\miniApps-master 享7

D:\xcx\xcx_share\MiniShare-master 群工具
D:\xcx\xcx_share\Qclock-master\client 闹钟提醒

D:\xcx\xcx_share\tfxb-master 天府学霸 good

D:\xcx\xcx_share\weapp-JSJoke-master 集思笑话

D:\xcx\xcx_share\WechatAppDemo-master 微信基本能力

D:\xcx\xcx_share\wechat-weapp-Game-TNFB-master\client 头脑王者

D:\xcx\xcx_share\wxapp-master 金牌诗词大会

D:\xcx\xcx_share\wx----master答题赢奖品

D:\xcx\xcx_share\xiachengxu-master 店

D:\xcx\xcx_share\xiaochengxu-master\anserToys0 答题送奖品公仔娃娃


D:\xcx\xcx_share\xiaochengxu-master\blessing_money 祝福红包
D:\xcx\xcx_share\xiaochengxu-master\Guess_music 猜音乐

D:\xcx\xcx_share\xiaochengxu-master\voice_money 语音红包



       self.setData({
            showTicketModal: false
          })





          var userdata = wx.getStorageSync('userdata') || {};
          if (userdata &&userdata.chance<=0)
         {
            userdata.chance =  1;

                  app.util.request({
        url: 'entry/wxapp/sub_chance',
        data:{add:1},
        success: function (res) {
    

        },
        fail: function (err) {
          console.log(err);
        }
      })



         }


          if (userdata && userdata.relivecount <= 0) {
            userdata.relivecount =  1;

          }
            wx.setStorageSync('userdata', userdata)







          // 分享成功后增加游戏机会
          shareAddChance(callback);


                        goNextQuestion(self);
    

