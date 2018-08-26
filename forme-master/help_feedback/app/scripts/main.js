$(function () {
  var flag = 0;
  function touchBack(){
    if (flag == 1){
      // event.preventDefault();
      flag = 0;
    }
    else if (flag == 0){
      if (typeof window.faq != 'undefined'){
        window.faq.back();
      }
      if (window.WebViewJavascriptBridge){
        WebViewJavascriptBridge.callHandler('faq_back', [], function(response){
          //
        });
      }
    }
  }

  var ua = navigator.userAgent.toLowerCase();
  var isApp = /codoon/i.test(ua);
  var isIOS 	= /iphone|ipod|ipad|itouch/i.test(ua);

  function HybirdMenu (needInit) {
    var options = JSON.stringify({'showShare': 0,'showFeedback': 0});
    if (isIOS && window.WebViewJavascriptBridge) {
      if (needInit && !window._isCBJInited) {
        window._isCBJInited = true;
        WebViewJavascriptBridge.init(function (message, responseCallback) {});
      }
      WebViewJavascriptBridge.callHandler('web_browser_setting', options);
    } else if (window.jsObj) {
      window.jsObj.web_browser_setting && window.jsObj.web_browser_setting(options);
    }
  }

  function initWebViewConfig () {
    if (!isApp) {
      !/access_token\=/.test(window.location.href);
    } else {
      if (!!window.WebViewJavascriptBridge || window.jsObj) {
        HybirdMenu(true);
      } else {
        document.addEventListener('WebViewJavascriptBridgeReady', function () {
          HybirdMenu(true);
        }, false);
      }
    }
  }
  initWebViewConfig();




  //热门
  var hot_problem_detail={ 'detail': [
    { 'problem': '升级7.0后完成运动，统计里的数据没有增加？',
      'answer':'统计数据没有增加，有可能是以下原因哦。<br>一是因为在7.0版本里，被系统判定为异常的运动数据不再计入历史记录统计中了呢。<br>二是如果运动记录没有成功上传，统计页面的数据也不会有增加，你可以上传历史记录列表中未成功上传的运动数据后，再进入统计查看',
    },
    { 'problem': '升级7.0后我的好友排行榜名次降低了？',
      'answer':'为了数据准确，我们对排行榜数据进行了更新，所以名次会有变动哟',
    },
    { 'problem': '升级7.0后“体重”、“睡眠”数据不显示了？',
      'answer':'对于绑定了相关配件的用户，我们仍然是可以查看相应数据的。体重数据在［装备－配件－类型－脂肪秤］中可以查看，而睡眠数据显示在［手环］页面内呢',
    },
    { 'problem': '升级7.0后［广场］、［咕咚吧］去哪儿了？',
      'answer':'在7.0的版本里，我们对咕咚的内容进行了重新梳理，新增了运动圈［精选］页面。咕咚［精选］也将承载文章、话题、直播、测评等丰富的内容呢',
    },
    { 'problem': '运动首页的［计步］和类型中［健走］的区别是？',
      'answer':'运动首页的［计步］仅是咕咚在后台记录的当天走路步数哦。而运动类型里的［健走］，是属于运动的一个类型。这里的健走与跑步一样，在运动中咕咚会记录你的运动轨迹、时长、距离及配速等相关运动数据，结束运动后，咕咚还会根据当前的运动状态给出相应的数据分析，同时该条运动记录也会收进［统计］页面哦',
    },
  ]}
  var class_arr=['运动记录及数据','社交分享','运动团|俱乐部','赛事|活动','货币资产','咕咚智能跑鞋','其他'];
  //运动记录及数据
  var class0_detail={ 'detail': [
    { 'problem': '运动轨迹不完整，而且还出现乱画？',
      'answer':'也许是你的GPS信号受到干扰了啦，手机无法获取正确的坐标提供给咕咚。建议在使用户外模式时尽量避免隧道、高楼建筑等环境',
    },
    { 'problem': '升级7.0之后完成运动，统计的数据没有增加？',
      'answer':'统计数据没有增加，有可能是以下几种原因哦<br>一是因为在7.0版本里，被系统判定为异常的运动数据不再计入历史记录统计中了呢<br>二是如果运动记录没有成功上传，统计页面的数据也不会有增加，你可以上传历史记录列表中未成功上传的运动数据后，再进入统计查看',
    },
    { 'problem': '升级7.0后我的好友排行榜名次降低了？',
      'answer':'为了数据准确，我们对排行榜数据进行了更新，所以名次会有变动哟',
    },
    { 'problem': '升级7.0后“体重”、“睡眠”数据不显示了？',
      'answer':'对于绑定了相关配件的用户，我们仍然是可以查看相应数据的。体重数据在［装备－配件－类型－脂肪秤］中可以查看，而睡眠数据显示在［手环］页面内呢',
    },
    { 'problem': '结束运动后，个人成绩没有更新？',
      'answer':'被系统判定为异常的数据是不计入［个人成绩］的哦。假如你对系统判定有异议，则可以将异常数据的“轨迹”和“配速”页面截图，发送到kefu@codoon.com进行申诉',
    },
    { 'problem': '误删除的数据可以恢复吗？',
      'answer':'在删除数据时，你的云端数据也会被删除，所以此时被删除数据是不能恢复的哟，咚妹提醒小心操作',
    },
    { 'problem': '更换手机后，不能从云端下载数据？',
      'answer':'如果运动数据并没有上传至咕咚云数据平台，那在更换设备时则无法获取到此前的运动数据；如果你已经卸载或重装软件，那么数据将丢失，无法恢复。咚妹建议你在运动结束后，要及时上传运动记录哟',
    },
    { 'problem': '如何上传历史记录中未上传的运动数据？',
      'answer':'你可以在有网情况下，点击进入［我_历史记录］页面，数据就可以自动上传啦！你也可以点击进入未上传的运动记录详情页面，点击右上角的上传标记，进行手动上传',
    },
    { 'problem': '运动首页的［计步］和类型中［健走］的区别是？',
      'answer':'运动首页的［计步］仅是咕咚在后台记录的当天走路步数哦。而运动类型里的［健走］，是属于运动的一个类型。这里的健走与跑步一样，在运动中咕咚会记录你的运动轨迹、时长、距离及配速等相关运动数据，结束运动后，咕咚还会根据当前的运动状态给出相应的数据分析，同时该条运动记录也会收进［统计］页面哦',
    },
    { 'problem': '为什么手环数据上传微信后就不能上传咕咚？',
      'answer':'微信和咕咚是不同的社交平台，手环同一段数据只能同步一次，同步后手环中的数据会被删除，建议您选择一个平台使用。但是如果您使用同一微信帐号登陆咕咚，那在上传数据后（除了排行榜数据外），微信和咕咚这两个平台的数据就会同步哟',
    },
  ]}
  //社交分享
  var class1_detail={ 'detail': [
    { 'problem': '怎么添加好友？',
      'answer':'在［运动圈］的左上角有添加好友的图标。点击之后，你有两种方法添加好友，一是通过咕咚昵称搜索你想添加的朋友；二是通过导入好友的方式添加，目前咕咚支持导入通讯录好友、微博好友、微信好友及QQ好友哦',
    },
    { 'problem': '怎么可以查看附近的人的动态？',
      'answer':'在版本更新后，我们把“附近”放到了 [运动圈-精选] 页面中，点击“附近”即可查看附近人的相关动态哟',
    },
    { 'problem': '关闭了消息提醒，还会收到推送？',
      'answer':'目前，咕咚仅支持关闭［朋友消息通知］。若你想关闭推送则可以在手机系统里进行设置，咚妹建议你不要关闭消息推送哦，我们会不定期推送一些运动咨询及活动的呢',
    },
    { 'problem': '为什么我不能直播？',
      'answer':'现在的直播还没有面向所有用户开放哟，你可以去直播栏目中提交主播申请，待咚妹审核通过之后，［直播小助手］会通知你审核后的结果哟，通过之后点击右上角的发布按钮，就可以选择开始直播啦',
    },
    { 'problem': '为什么只能添加一个话题标签？',
      'answer':'在新版的咕咚7.0中，每条动态可以添加一个话题标签，从而使该条动态关联到该话题标签对应的话题之下，方便咚友以发布运动圈动态的方式参与话题讨论和互动。每一个话题下面将会由话题标签聚合多条内容相关的动态，同时用户可以在精选页面中的话题讨论栏目下找到当前热点的话题，并查看该话题相关的动态内容',
    },
  ]}
  //运动团|俱乐部
  var class2_detail={ 'detail': [
    { 'problem': '城市跑团、官方跑团和认证跑团的定义？',
      'answer':'城市跑团：主要是针对想要创建跑团但不知该从何入手的跑友。或者在跑团发展过程中遇到困难需要指导的跑团，咕咚提供科学的管理方式和一定物料及活动支持，对跑团进行区域保护和协助扶持跑团孵化成长，直到达到认证标准。<br>官方跑团：是咕咚官方直属、重点扶持的线下组织，作为当地跑团的标杆，承担起品牌在线下传播的重要职责，为咕咚用户提供长期、稳定、优质的活动平台。官方跑团享有跑团基金、充足的物料和咕咚官方平台资源推广等福利<br>认证跑团：咕咚跑团管理认证体系是基于咕咚平台跑步相关大数据支撑，对跑步团体在多个纬度上的专业度提出的评定体系。该认证体系能对综合实力达标的跑团进行身份肯定，提高跑团权威性和品牌认可度。<br>跑团认证面向咕咚站内外所有跑团开放，通过咕咚跑团管理体系认证的跑团，我们称之为认证跑团。<br>跑团认证采用年审制，不向跑团收取任何费用。<br>通过认证的跑团将获得：<br> 1、认证证书、奖杯及徽章（骨干成员专属）；<br>2、咕咚平台本地推广资源5万元/年免费使用权（不可累积，次年自动清零）',
    },
    { 'problem': '如何申请成为官方跑团？',
      'answer':'想要申请成为官方跑团和认证跑团，目前主要有以下途径。<br>1.咕咚官方跑团不定期面向全国招募，招募期间，可通过咕咚吧的跑团招募贴找到招募H5，在H5中填写提交相关信息，等待咕咚回复即可。<br>2.非招募期，可按规定格式发送邮件至huodong@codoon.com进行申请。邮件主要包含以下几点：<br>邮件标题：<br>咕咚官方跑团申请—XXX（XXX代表跑团所在城市）<br>邮件内容：<br>a.团长姓名  电话  邮箱  QQ号  咕咚昵称  咕咚ID<br>b.跑团名称  咕咚运动团号  跑团规模  活动频次  场均参与人数  活动具体地点<br>c.附不少于10张不同场次的日常活动照片',
    },
    { 'problem': '如何申请跑团认证？',
      'answer':'你可以发邮件到：paotuan@codoon.com<br>标题为：XX跑团认证申请<br>内容：跑团名称＋团长姓名＋联系方式＋所在城市<br>跑团简介，详细介绍跑团现有规模、并附上跑团照片',
    },
    { 'problem': '如果无法达到认证标准、官方跑团标准，怎么办？',
      'answer':'建议申请成为城市跑团<br>发邮箱到paotuan@codoon.com<br>标题为:XX城市咕咚城市跑团申请<br>内容:炮团名称+跑团咕咚ID+团长姓名+联系方式+所在省份城市',
    },
    { 'problem': '为什么官方跑团在修改团信息后不能立即显示？',
      'answer':'官方跑团修改团logo，团名称和团简介等都需要经审核通过之后才能生效并显示。在提交申请之后进入审核中状态时，是不能再发起修改请求的哦',
    },
    { 'problem': '可以把团转让给其他团员吗？',
      'answer':'目前运动团仅支持，在管理员（团长）退群之后，把团转给其他团员，咚妹正在进行优化哟',
    },
    { 'problem': '可以修改在俱乐部的部门吗？',
      'answer':'在第一次进入［俱乐部］的时候，是可以自己选择部门的哟。不过普通成员是不能再次自己修改的，你要是想修改部门则可以向管理员提出申请',
    },

  ]}
  //赛事|活动
  var class3_detail={ 'detail': [
    { 'problem': '为什么我在站外报名同城活动却不能签到呢？',
      'answer':'同城活动的站外报名仅需你的电话号码，如果该报名电话不是咕咚帐号绑定的电话号码，则不能正常进行活动签到哦。你可以在［设置－帐号绑定］页面绑定站外报名的手机号码，这样就可以了呢',
    },
    { 'problem': '报了同一天两场赛事，成绩怎么计算呢？',
      'answer':'目前，咕咚赛事的成绩是使用赛事期间第一条上传的完赛成绩',
    },
    { 'problem': '怎么可以购买奖牌？',
      'answer':'奖牌对外是不会出售的哦，用户只需在报名赛事并完成比赛后，支付奖牌寄出邮费就可以了。线上赛事报名之后',
    },
  ]}
  //货币资产
  var class4_detail={ 'detail': [
    { 'problem': '卡币是什么，如何使用？',
      'answer':'卡币是咕咚的通用虚拟货币，可以用它来抵消商城的优惠金额、换取礼品哦，而且卡币还能作为竞赛的保证金。所以咚妹建议你多多使用咕咚进行运动并上传有效数据，系统会根据对应运动信息给出卡币奖励哦～同时也可以在［发现］－［咕咚活动］－［竞赛］中参加比赛，赢取卡币奖励',
    },
    { 'problem': '如何获得红包？',
      'answer':'在［我的］－［钱包］－［赚钱］页面，有详细的红包任务哦，抢到红包任务后在规定时间内按任务要求完成，就可以获得红包奖励啦。而且只要成功邀请朋友成为咕咚用户，双方都是可以获得红包奖励的呢',
    },
    { 'problem': '红包可以提现吗？',
      'answer':'目前咕咚的红包奖励是可以提现的哦。我们将以微信红包的方式发送到你的微信帐户，在提现时，为了保证余额安全，我们还需要认证手机号及微信号哟，假如红包发送72小时你未领取的话就会退回到咕咚帐号内，所以咚妹提醒在提现后，尽快去收取红包哦',
    },
  ]}
  //咕咚智能跑鞋
  var class5_detail={ 'detail': [
    { 'problem': '如何进行退换货？',
      'answer':'1.退货：请将退货货品（含芯片）寄回咕咚指定仓库，并附带小纸条，纸条上需备注订单号、退货原因及支付宝或微信等收款账号。<br>2.换货：请将换货货品（含芯片）寄回咕咚指定仓库，并附带小纸条，纸条上需备注订单号、换货明细、收货人地址和联系方式。若只更换芯片，则只需要将芯片寄回仓库即可。<br>咕咚收货仓地址：四川省成都市高新区天府软件园D7-3F，收件人：咕咚售后，联系方式：028-65785753/181-9075-3798',
    },
    { 'problem': '为什么绑定不成功？',
      'answer':'1、需要保证手机蓝牙开关以及咕咚的蓝牙权限打开，并且手机有网络的情况下，在手机附近摇动芯片使其处于工作状态即可成功连接；<br>注意如果手机摄像头有问题，可能扫描不成功，但是可以手动输入ID进行绑定。<br>2、如果你的手机是Android操作系统，那么：<br>A. 可以把蓝牙开关关闭后重新打开，退出咕咚APP并手机重启;<br>B. 手机重启后，摇动跑鞋芯片，用手机设置里面的蓝牙扫描，查看能否扫描到COD_SHOES，如果可以则芯片没问题，将配对设备中的COD_SHOES删除，再次重新尝试绑定即可；<br>3、若以上操作都已完成，仍然不可绑定，请联系客服进行换货。',
    },
    { 'problem': '跑鞋芯片如何同步数据？',
      'answer':'跑鞋芯片支持自动同步和手动同步两种方式：<br>手动同步：可以进入已绑定的跑鞋配件详情页，点击右上角的同步按钮，进行手动同步。<br>自动同步：在穿上跑鞋并且携带手机，点击咕咚APP开始跑步后，在跑步结束时，点击结束按钮会进行自动同步，也会将之前未同步的数据记录，一起同步回咕咚APP。',
    },
    { 'problem': '二维码模糊怎么办？',
      'answer':'若二维码模糊造成无法绑定，可手动输入ID来进行绑定。也可联系客服解决。',
    },
    { 'problem': '跑鞋是否支持走路？',
      'answer':'不支持健走运动类型，健走的运动前页面也不能选择连接咕咚智能跑鞋。但可记录每日步数。',
    },
    { 'problem': '清洗跑鞋是否需要将芯片取出？',
      'answer':'必须将芯片取出，进水会导致芯片不能正常工作。',
    },
    { 'problem': '运动过程中能否修改智能语音设置？',
      'answer':'可以修改。在运动过程中点击【设置】-【语音指导】进行设置。',
    },
    { 'problem': '运动前跑鞋连接不成功怎么办？',
      'answer':'若运动前连接不成功，可以尝试以下办法：<br>1.检查手机蓝牙是否打开，若打开可以关闭再重新打开手机蓝牙；<br>2.试试重新标定，确认硬件无误<br>3.如果你的手机是Android操作系统，可以退出咕咚APP，将手机重启后，晃动芯片（不用一直晃动），再用手机设置里面的蓝牙扫描一下设备，将配对设备里的COD_SHOES删除，再重新搜索连接即可。',
    },
    { 'problem': '运动前连接成功，运动中连接断开怎么办？',
      'answer':'可以检查：<br>1、运动中是否手机设成了飞行模式。<br>2、安卓部分手机会在手机息屏后自动将蓝牙关闭，这种情况下需要用户手动开启蓝牙。',
    },
    { 'problem': '运动结束后没有跑鞋数据',
      'answer':'运动结束后跑鞋数据会同步进入运动记录中，在运动记录的详情页中可以看到相关数据。若没有：<br>1.检查芯片是否放反；<br>2.蓝牙连接是否正常；',
    },
    { 'problem': '不带手机，芯片如何记录数据的？',
      'answer':'跑鞋通过芯片自带的传感器记录数据，当检测到持续2分钟以上的跑步后，会自动『开始运动』；当跑鞋检测到非跑步（走路、静止）状态并持续一定时间，会自动『结束运动』。',
    },
    { 'problem': '不带手机只穿了智能跑鞋，为什么没有轨迹？',
      'answer':'芯片没有GPS模块，所以无法获取到GPS点绘制轨迹，但仍可记录距离、时间、配速等等相关运动数据。',
    },
    { 'problem': '不带手机跑步，距离等运动数据不准确',
      'answer':'不带手机跑步，芯片会使用传感器来记录并计算相关数据，距离、时间和配速等存在着一定的误差。',
    },
    { 'problem': '跑鞋是否支持自动暂停？',
      'answer':'跑鞋芯片在单独使用，即不携带手机和咕咚APP的跑步运动同时使用时，不支持自动暂停，停止跑步或者走路时间过长，会生成两条运动记录。',
    },
    { 'problem': '同步时间过长',
      'answer':'蓝牙信号不稳定或者运动记录数据量过大时，连接同步需要一定的时间。',
    },
    { 'problem': '同步失败怎么办？',
      'answer':'可以尝试再次同步，同步过程中将跑鞋和手机尽量靠近，或者将手机蓝牙关闭再重新打开。同步失败数据并不会丢失，会一直保存在芯片里，直到下次同步成功之后，才会清除芯片中的数据。',
    },
    { 'problem': '跺一跺是什么？',
      'answer':'穿上跑鞋带上手机使用咕咚APP户外跑时，需要打开手机GPS开关，当跑鞋芯片和手机蓝牙正常连接时（运动中页面跑鞋标志为绿色，运动前页面跑鞋会提示连接成功），在运动前或者运动中时，原地不动，左脚跺两下，可以在咕咚APP上查看周边在跑步的咕咚用户。',
    },
    { 'problem': '跺一跺，弹出了雷达图，但周围没有好友',
      'answer':'周边一定范围内没有在跑步的咕咚用户。',
    },
    { 'problem': '重新绑定芯片之后，累积里程是0',
      'answer':'手机从芯片读取数据有一定的时间，可以在【我的】-【装备】-【咕咚智能跑鞋】页面，点击右上角的同步按钮，同步成功后就可看到累积里程。',
    },
    { 'problem': '如何进行固件升级',
      'answer':'当芯片固件版本有优化更新时，需要进行固件升级。进入【我的】-【装备】-【咕咚智能跑鞋】页面，手机蓝牙打开或者已允许咕咚使用蓝牙权限的前提下，在芯片和手机蓝牙连接成功后，芯片会自动进行固件升级，或者固件版本号一栏有红点的情况下点击固件版本号一栏进行手动升级。<br>注意：摇动几下芯片，以免进入睡眠模式。',
    },
    { 'problem': '我有多个蓝牙设备，连不上跑鞋芯片怎么办？',
      'answer':'解绑其他设备，先绑定咕咚跑鞋，再绑定其他设备。蓝牙设备太多，可能有一定的冲突。',
    },
    { 'problem': '跑鞋芯片没电了怎么办？',
      'answer':'芯片电量可以在咕咚APP【我的】-【装备】-【咕咚智能跑鞋】页面进行查看。',
    },
    { 'problem': '自动解绑了怎么办？',
      'answer':'自动解绑后，可以重新绑定芯片。数据仍然会保存在芯片中，可作为一条无GPS轨迹的数据同步回手机咕咚APP。',
    },
  ]}
  //其他
  var class6_detail={ 'detail': [
    { 'problem': '咕咚帐号可以注销吗？',
      'answer':'目前，咕咚是不支持［注销帐号］的哦。要是不想使用该帐号，咚妹建议你解除该帐号的绑定',
    },
    { 'problem': '我有多个咕咚帐号，可以把数据合并起来呢？',
      'answer':'咕咚运动所产生的数据都是对应到每一个帐号的哟，所以目前系统是不支持合并的啦～建议你可以选择保留一个帐号长期使用，长期跑步打卡，嘻嘻嘻',
    },
    { 'problem': '可以下载离线地图吗？',
      'answer':'目前，Android是支持下载离线地图的哦。iOS由于是采用系统自带的地图，所以目前是不支持下载离线地图的，咚妹会实时优化哟',
    },
    { 'problem': '为什么我的软件越用越慢了？',
      'answer':'在APP使用过程中，浏览过的页面会自动缓存，缓存增多就会减少系统内存，影响体验，你可以在［设置］页面进行手动缓存清理。在7.0版本中，Android也新增了自动清理缓存的功能哟，只要软件缓存达到60M系统便会自动清理，但是清理缓存不会影响运动数据的哦',
    },
    { 'problem': '升级7.0后“体重”、“睡眠”数据不显示了？',
      'answer':'对于绑定了相关配件的用户，我们仍然是可以查看相应数据的。体重数据在［装备－配件－类型－脂肪秤］中可以查看，而睡眠数据则显示在［手环］页面内呢',
    },
    { 'problem': '升级7.0后［广场］、［咕咚吧］去哪儿了？',
      'answer':'在7.0的版本里，我们对咕咚的内容进行了重新梳理，新增了运动圈［精选］页面。咕咚［精选］也将承载文章、话题、直播、测评等丰富的内容呢',
    },
    { 'problem': '为什么无法绑定手环？',
      'answer':'无法绑定手环有可能是以下原因：<br>一是绑定时误操作：你需要在绑定页面选择正确的配件型号。<br>例如：<br>咕咚智能手环2：在绑定时，点击咕咚智能手环2绑定；<br>微信版-咕咚智能手环2：绑定时，点击咕咚智能手环微信版绑定；<br>二是无法适配：<br>咕咚智能手环2适配机型：iPhone4S及以上机型；iPod touch5、the New iPad、iPad4、iPad mini、iPad mini2、iPad Air2、iPad Mini3 和iPad air； 目前仅支持安卓4.3及以上系统、蓝牙4.0的部分高端机型',
    },
  ]}

  var all=[class0_detail,class1_detail,class2_detail,class3_detail,class4_detail,class5_detail,class6_detail]

  function changeTit(str) {
    // var $body = $('body')
    document.title = str;
    // var $iframe = $('<iframe src="/favicon.ico"></iframe>').on('load', function() {
    //   setTimeout(function() {
    //     $iframe.off('load').remove();
    //   }, 0)
    // }).appendTo($body);
  }

  var mySwiper = new Swiper ('.swiper-container', {
    direction: 'horizontal',
    speed:0,
    onSlideChangeEnd:function () {
      $('.swiper-container').css({'opacity':'1'});
    }
  })

  var p_num=0;
  var routeFun = {
    helpPage:function () {
      $('.contact-kf-btn-index').show();
      $('.swiper-container').css({'opacity':'1'});
      console.log('test');
      mySwiper.params.speed = 300;
      changeTit('帮助与反馈');
      p_num=0;
      if(mySwiper.activeIndex>p_num){
        return mySwiper.slidePrev();
      }
    },
    classPage:function(typeId,questionId) {
      $('.contact-kf-btn-index').hide();
      p_num=1;
      if(typeId==1){//热门问题的详情
        changeTit('问题详情');
        $('.class_page').css({'background':'#ffffff'});
        $('.class_page').html(
          '<p class=\'wt_wen\'>'+hot_problem_detail.detail[questionId].problem+'</p>'+
          '<p class=\'wenti_answer\'>'+hot_problem_detail.detail[questionId].answer+'</p>'+
          '<div class=\'contact-kf-btn\'><a href=\'codoon://www.codoon.com/codoon/customer\'>问题没解决，联系客服：）</a></div>'
        );
      }else if(typeId==2){//问题类别的类别详情
        $('.class_page').css({'background':'#f6f8f7'});
        changeTit(class_arr[questionId]);
        var div='';
        for(var i=0;i<all[questionId].detail.length;i++){
          div+='<li class=\'all_todetail\'>'+all[questionId].detail[i].problem+'<span><img src=\'images/icon_left.png\'></span></li>';
        }
        $('.class_page').html('<ul class=\'class_ul\'>'+div+'</ul>');
        //类别详情--问题详情
        $('.all_todetail').bind('click',function () {
          var detail_num=$(this).index();
          _hmt.push(['_trackEvent',all[questionId].detail[detail_num].problem, 'click',class_arr[questionId]]);
          Utils.goPage('detailPage/'+questionId+'/'+detail_num);
        })
      }
      if(mySwiper.activeIndex>p_num){
        return mySwiper.slidePrev();
      }
      mySwiper.slideTo(p_num);
      mySwiper.params.speed = 300;
    },
    detailPage:function(index_num,detail_num) {
      $('.contact-kf-btn-index').hide();
      changeTit('问题详情');
      p_num=2;
      $('.detail_page .wt_wen').html(all[index_num].detail[detail_num].problem);
      $('.detail_page .wenti_answer').html(all[index_num].detail[detail_num].answer);
      if(mySwiper.activeIndex>p_num){
        return mySwiper.slidePrev();
      }
      mySwiper.slideTo(p_num);
      mySwiper.params.speed = 300;
    },
  }
  var routes = {
    '/helpPage': routeFun.helpPage,
    '/classPage/:typeId/:questionId':routeFun.classPage,
    '/allPage/:index_num':routeFun.allPage,
    '/detailPage/:index_num/:detail_num':routeFun.detailPage,
  }
  var router = Router(routes);

  router.init();

  if(window.location.hash == ''){
    window.history.replaceState({}, '', '#helpPage');
    routeFun.helpPage();
  }
  // else{
  //   console.log(window.location.hash);
  //   if(window.location.hash=='#helpPage'){
  //     routeFun.helpPage();
  //   }
  //   $('.swiper-container').css({'opacity':'1'});
  //   // mySwiper.params.speed = 300;
  //
  // }

  var Utils = {
    goPage: function(hash){
      location.href = '#' + hash
    },
  }
//index--热门问题-问题详情
  $('.to_detail').bind('click',function () {
    var index_num=$(this).index();
    Utils.goPage('classPage/1/'+index_num);
  })
//index--问题类别-类别详情
  $('.classone_detail').bind('click',function () {
    var index_num=$(this).index();
    Utils.goPage('classPage/2/'+index_num);
  })



})
