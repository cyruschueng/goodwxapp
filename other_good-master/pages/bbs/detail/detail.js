var _function = require('../../../utils/functionData');
var app = getApp()
Page({
  data: {
      postinfo:[],//帖子信息
      this_post_id:0,//帖子ID
      this_reply_id:0,//评论ID
      this_xihuan_type:1,//点赞类型
      showImgLayer:false,//大图层是否显示
      showImgUrl:'',//大图地址
      all_img_key:0,//总共图集
      this_img_key:0,//当前图集
      this_img_key_z:0,//真当前图集
      touch_x_b_num:0,//滑动开始x坐标
      touch_x_e_num:0,//滑动结束x坐标
      is_scroll_y:true,
      reply_layer_isshow:false,//回复层
      jubao_layer_isshow:false,//举报层
      buttonIsDisabled:false,//按钮
      reply_items:[],//评论列表
      this_pinglun_id:0,//当前评论ID
      this_page:1,//当前页码
      pagesize:10,//每页数量
      hasMore:false,//更多层
      showLoading:false,//加载层
      report:{
          this_jubao_type : 1,//举报类型
          this_jubao_id:0
      },
      glo_is_load:true,
      is_bbs_manage:0
    },
    onLoad:function(options){
      var that = this
        var post_id = options.pid;
        that.setData({
          this_post_id:post_id,
        })
      //请求帖子详情
      _function.getPostInfo(post_id,that.initPostInfoData,this)
      //请求评论列表
      _function.getReplyList(post_id,1,that.data.pagesize,that.initReplyListData,this)
      //验证用户是否为管理员
      _function.checkBBSManage(wx.getStorageSync("utoken"),that.initcheckBBSManageData,this)
    },
    initcheckBBSManageData:function(data){
        var that = this
        if(data.code == 1){
            that.setData({
                is_bbs_manage:1
            })
        }
    },
    initPostInfoData:function(data){
      var that = this
      that.setData({
          postinfo:data.info,
          all_img_key:data.info.imgarr.length
      })
    },
    initReplyListData:function(data){
      var that = this
      that.setData({
          reply_items:data.info,
          glo_is_load:false
      })
    },
    //图片放大
    img_max_bind:function(e){
        var that = this
        var img_max_url =e.currentTarget.dataset.url
        var this_img_key =e.currentTarget.dataset.key
        var all_img_num = that.data.postinfo.imgarr.length
        var durls = []
        for(var i=0;i<all_img_num;i++){
            durls[i] = that.data.postinfo.imgarr[i].imgurl
        }

        wx.previewImage({
            current: img_max_url, // 当前显示图片的http链接
            urls: durls
        });   
    },
    //关闭图片放大
    close_imglayer_bind:function(){
        var that = this
        that.setData({
            showImgLayer:false,
            showImgUrl:'',
            is_scroll_y:true
        })
    },
    //显示举报层
    jubao_act_bind:function(e){
        //1为帖子2为回复
        var that = this
        var pid = e.currentTarget.id
        var ptype = e.currentTarget.dataset.type
        that.setData({
            report:{
                this_jubao_type : ptype,//举报类型
                this_jubao_id:pid
            }
        })
        if(this.data.jubao_layer_isshow == true){
            this.setData({
                jubao_layer_isshow:false
            })
        }else{
            this.setData({
                jubao_layer_isshow:true
            })
        }
        var datas = that.data.reply_items
        for(var i=0;i<datas.length;i++){
            if(datas[i].reply_id == e.currentTarget.id){
                datas[i].isactive = false
            }
        }
        that.setData({
            reply_items:datas,
        })
    },
    jubao_layer_show_bind:function(){
        this.setData({
            jubao_layer_isshow:false
        })
    },
    //举报操作
    report_formSubmit:function(e){
        var that = this
        var t_con = e.detail.value.co_content
        that.setData({
          buttonIsDisabled:true
        })
        if(t_con == ''){
            wx.showModal({
                title: '提示',
                content: '对不起，请输入举报信息',
                showCancel:false
            })
            that.setData({
                buttonIsDisabled:false
            })
            return false;
        }
        _function.postReportAct(wx.getStorageSync("utoken"),that.data.report.this_jubao_id,that.data.report.this_jubao_type,t_con,that.initPostReportData,this)
    },
    initPostReportData:function(data){
        var that = this
        if(data.code == 1){
            //请求帖子详情
            wx.showModal({
                title: '提示',
                content: '举报成功',
                showCancel:false,
                success:function(res){
                    that.setData({
                        jubao_layer_isshow:false,
                        buttonIsDisabled:false
                    })
                    _function.getPostInfo(that.data.this_post_id,that.initPostInfoData,this)
                    _function.getReplyList(that.data.this_post_id,1,that.data.pagesize,that.initReplyListData,this)
                }
            })  
        }else if(data.code == 2){
            wx.showModal({
                title: '提示',
                content: '登陆超时，将重新获取用户信息',
                showCancel:false,
                success:function(res){
                    app.getNewToken(function(token){
                        that.setData({
                            local_global_token:token
                        })
                        that.setData({
                            this_page:1,
                            buttonIsDisabled:false
                        })
                        //请求帖子详情
                        _function.getPostInfo(that.data.this_post_id,that.initPostInfoData,this)
                        _function.getReplyList(that.data.this_post_id,1,that.data.pagesize,that.initReplyListData,this)
                    })
                }
            })
        }else if(data.code == 5){
            wx.showModal({
                title: '提示',
                content: data.info,
                showCancel:false
            })
            that.setData({
                buttonIsDisabled:false
            })
            return false;
        }
    },
    //喜欢操作
    post_xihuan_bind:function(e){
        //1为帖子2为回复
        var that = this
        var pid = e.currentTarget.id
        var ptype = e.currentTarget.dataset.type
        that.setData({
            this_xihuan_type:ptype,
            this_pinglun_id:pid
        })
        _function.postXihuanAct(wx.getStorageSync("utoken"),pid,ptype,that.initPostXihuanData,this)
    },
    initPostXihuanData:function(data){
        var that = this
        if(data.code == 1){
            if(that.data.this_xihuan_type == 1){
                var datas = that.data.postinfo
                datas['praise'] = parseInt(that.data.postinfo.praise) + 1
                that.setData({
                    postinfo:datas
                })
            }else if(that.data.this_xihuan_type == 2){
                var ldatas = that.data.reply_items
                var lreplyid = that.data.this_pinglun_id
                for(var i=0;i<ldatas.length;i++){
                    if(ldatas[i].reply_id == lreplyid){
                        ldatas[i].digg_count = parseInt(ldatas[i].digg_count) + 1
                    }
                }
                that.setData({
                    reply_items:ldatas,
                })
            }
        }else if(data.code == 2){
            wx.showModal({
                title: '提示',
                content: '登陆超时，将重新获取用户信息',
                showCancel:false,
                success:function(res){
                    app.getNewToken(function(token){
                        that.setData({
                            local_global_token:token
                        })
                        that.setData({
                            this_page:1,
                            buttonIsDisabled:false
                        })
                        //请求帖子详情
                        _function.getPostInfo(that.data.this_post_id,that.initPostInfoData,this)
                        _function.getReplyList(that.data.this_post_id,1,that.data.pagesize,that.initReplyListData,this)
                    })
                }
            })
        }else if(data.code == 5){
            wx.showModal({
                title: '提示',
                content: data.info,
                showCancel:false
            })
            return false;
        }
    },
    //回复操作
    detail_huifu_bind:function(e){
        var that=this
        var huifu_id = e.currentTarget.id
        that.setData({
            this_reply_id:huifu_id
        })
        if(that.data.reply_layer_isshow == true){
            that.setData({
                reply_layer_isshow:false
            })
        }else{
            that.setData({
                reply_layer_isshow:true
            })
        }
        var datas = that.data.reply_items
        for(var i=0;i<datas.length;i++){
            if(datas[i].reply_id == e.currentTarget.id){
                datas[i].isactive = false
            }
        }
        that.setData({
            reply_items:datas,
        })
    },
    comment_reply_show_bind:function(e){
        var that = this
        var datas = that.data.reply_items
        for(var i=0;i<datas.length;i++){
            if(datas[i].reply_id == e.currentTarget.id){
                var isShow = (datas[i].isactive == "active")?'':"active";
                datas[i].isactive = isShow
            }
        }
        that.setData({
            reply_items:datas,
        })
    },
    //显示评论层
    reply_layer_show_bind:function(){
        this.setData({
            this_reply_id:0
        })
        if(this.data.reply_layer_isshow == true){
            this.setData({
                reply_layer_isshow:false
            })
        }else{
            this.setData({
                reply_layer_isshow:true
            })
        } 
    },
    //提交评论
    comment_formSubmit:function(e){
        var that = this
        var t_con = e.detail.value.co_content
        that.setData({
          buttonIsDisabled:true
        })
        if(t_con == ''){
            wx.showModal({
                title: '提示',
                content: '对不起，请输入评论内容',
                showCancel:false
            })
            that.setData({
                buttonIsDisabled:false
            })
            return false;
        }
        _function.addPostReply(wx.getStorageSync("utoken"),that.data.this_post_id,that.data.this_reply_id,t_con,that.initCommentAddData,this)
    },
    initCommentAddData:function(data){
        var that = this
        if(data.code == 1){
            wx.showToast({
                title: '评论提交成功',
                icon: 'success',
                duration: 2000
            })
            that.setData({
                buttonIsDisabled:false,
                reply_layer_isshow:false
            })
            _function.getReplyList(that.data.this_post_id,1,that.data.pagesize,that.initReplyListData,this)
        }else if(data.code == 2){
            wx.showModal({
                title: '提示',
                content: '登陆超时，将重新获取用户信息',
                showCancel:false,
                success:function(res){
                    app.getNewToken(function(token){
                        that.setData({
                            local_global_token:token
                        })
                        that.setData({
                            this_page:1,
                            buttonIsDisabled:false
                        })
                        //请求帖子详情
                        _function.getPostInfo(that.data.this_post_id,that.initPostInfoData,this)
                        _function.getReplyList(that.data.this_post_id,1,that.data.pagesize,that.initReplyListData,this)
                    })
                }
            })
        }else if(data.code == 5){
            wx.showModal({
                title: '提示',
                content: data.info,
                showCancel:false
            })
            that.setData({
                buttonIsDisabled:false
            })
            return false;
        }
    },
    //删除帖子
    bbs_action_del_bind:function(){
        var that = this
        wx.showModal({
        title: '提示',
        content: '确认要删除该帖子吗',
        success: function(res) {
            if (res.confirm) {
                _function.delPostAction(wx.getStorageSync("utoken"),that.data.this_post_id,that.initdelPostActionData,this)
            }
        }
        }) 
    },
    initdelPostActionData:function(data){
        var that = this
        if(data.code == 1){
            wx.switchTab({
                url: '../index/index'
            })
        }
    },
    //下拉刷新
    onPullDownRefresh:function(){
      var that = this
      that.setData({
          this_page:1
      })
      //请求帖子详情
      _function.getPostInfo(that.data.this_post_id,that.initPostInfoData,this)
      _function.getReplyList(that.data.this_post_id,1,that.data.pagesize,that.initReplyListData,this)
      setTimeout(()=>{
        wx.stopPullDownRefresh()
      },1000)
    },
    //滚动加载
    indexscrolltolower:function(){
      var that = this
      that.setData({
          hasMore:true
      })
      var this_target = this.data.this_items
      _function.getReplyList(that.data.this_post_id,that.data.this_page + 1,that.data.pagesize,that.initReplyLoadData,this)
    },
    initReplyLoadData:function(data){
      var that = this
      if(data.info == null){
          that.setData({
            is_scroll_y:false,
          })
        }else{
            if(data.info.length >= that.data.pagesize){
                that.setData({
                    is_scroll_y:true,
                })
            }else{
                that.setData({
                    is_scroll_y:false,
                })
            }
          that.setData({
            reply_items:that.data.reply_items.concat(data.info),
            this_page:that.data.this_page + 1
          })
        }
    },
    onReachBottom:function(e){
      var that = this
      that.setData({
          hasMore:true
      })
      var this_target = this.data.this_items
      _function.getReplyList(that.data.this_post_id,that.data.this_page + 1,that.data.pagesize,that.initReplyLoadData,this)
    },
    onShareAppMessage: function () {
        var that = this;
        return {
            title:that.data.news_data.title,
            path:'pages/bbs/detail/detail?cms_id'+that.data.this_cms_id
        }
    }
})