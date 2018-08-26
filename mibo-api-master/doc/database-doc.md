[TOC]
# 米播数据库文档 #
![表](./image/table-structure.png "表")

## 基础 ##
表前缀：mb_

## 一、表结构 ##
### activity ###
`直播间的活动按钮表`
 ![activity](./image/activity.png "activity")

### activity_statistic ###
`活动结果统计表`
![activity_statistic](./image/activity_statistic.png "activity_statistic")
  >value: 活动相关结果，如每日抽奖的中奖id

### ad ###
`广告`
![ad](./image/ad.png "ad")
  >开机广告

### app_config ###
`app配置表`
![app_config](./image/app_config.png "app_config")
  >event: 相关于键  
  >event_data: 相关于值 

### apply_config ###
`申请主播表`
  >已经废弃

### banner ###
![banner](./image/banner.png "banner")
  
### black_list ###
  >没用到

### channel ###
  >没用到

### exchange_item ###
`米钻兑换米币表`
![exchange_item](./image/exchange_item.png "exchange_item")

### feedback ###
`用户反馈表`
![feedback](./image/feedback.png "feedback")
  >audit_status: 这个审核字段暂时没用到

### feedback_type ###
`用户反馈类型列表`
![feedback_type](./image/feedback_type.png "feedback_type")

### follow_list ###
`关注关系表`
![follow_list](./image/follow_list.png "follow_list")

### game ###
  >暂时没用

### game_loop_card_log ###
`发牌记录表`
![game_loop_card_log](./image/game_loop_card_log.png "game_loop_card_log")
  >start_server_time 服务器的发牌时间，发送给前端，用以判断该局是否有效，超过25s此局牌无效

### game_loop_settlement ###
`下注结算表`
![game_loop_settlement](./image/game_loop_settlement.png "game_loop_settlement")

### gift ###
`直播间礼物列表`
![gift](./image/gift.png "gift")
  >local_target: 前端用以代码处理礼物的标志

### gift_effect ###
  >没用到

### gift_effect ###
  >暂没用

### gift_package ###
`礼包表`
![gift_package](./image/gift_package.png "gift_package")
  >礼包只要是直播间定时弹出，有些礼包只能发送一次，发送过的记录在gift_package_log表中

### gift_package_log ###
`礼包表记录`
![gift_package_log](./image/gift_package_log.png "gift_package_log")
 
### gm ###
`后台发入钻石、米币记录`
![gm](./image/gm.png "gm")
  >接口并没用到，主要是管理后台使用

### im_log ###
`环信发消息记录`
  >此表貌似并没有用，打算废弃，因为环信有聊天记录

### im_protocol ###
  >没用

### internal_staff ###
`内部人员表`
![internal_staff](./image/internal_staff.png "internal_staff")
  >内部人员功能：送礼物无效、发直播普通用户看不到

### ios_staff ###
  >ios版本更新

### live_entry_log ###
`用户进入直播间记录`
![live_entry_log](./image/live_entry_log.png "live_entry_log")
  >进入、退出使用

### live_entend ###
`直播间扩展信息表`
  >目前用于视频回放的观看人数

### live_game ###
  >以前用于切换游戏，现在没用

### live_list ###
`直播列表、包括娱乐场的几个`
![live_list](./image/live_list.png "live_list")
  >包括封面、推流地址、回放地址等
  >flv_url没用到，ticket_price,ticket_sale,invite_code以前是门票功能使用的，现在没用

### loading_icon ###
  >加载icon,就是首页下拉刷新的几个小图标

### moudel ###
  >没用

### no_anchor_live ###
  >无主播场，即娱乐场的相关信息，目前就是用于娱乐场的底图

### open_statistic ###
  >打开app统计，目前没用

### operation_live ###
`直播运营审核表`
![operation_live](./image/operation_live.png "operation_live")
  >主要是运营在管理后台审核直播，因为目前我们的主播都是签约的

### pk_dealer ###
  >以pk前缀的都是pk场的，这个是pk场庄家记录

### pk\_loop\_card_log ###
  >pk场发牌记录

### pk_loop_settlement ###
  >pk场玩家结算

### pk_room ###
  >pk房间列表

### recharge_ios ###
  >ios支付后的验证收据，只记录，暂无他用

### recharge_item ###
`钻石、米币充值价格表`
![recharge_item](./image/recharge_item.png "recharge_item")

### recharge_log ###
`充值记录表`
![recharge_log](./image/recharge_log.png "recharge_log")

### region_city ###
  >没用

### region_district ###
  >没用

### region_province ###
  >没用

### report ###
`举报表`
![report](./image/report.png "report")
  >直播间举报

### room_admin ###
  >主播的房管

### share_log ###
  >分享相关记录

### splash_screen ###
  >没用

### task ###
  >每日任务列表，img字段没用到

### user ###
  >用户表，login_name, is\_anchor两个已经弃用

### user_deal_log ###
  >用户交易记录，发送礼物、钻石兑换米币

### user_experience_log ###
  >用户经验记录

### user_id_card ###
  >用户实名认证的身份证记录

### user_level ###
  >等级需要的经验

### user_login ###
  >用户登录记录

### user_phone ###
  >没用

### user_wealth_log ###
  >用户米钻、米币变化记录，目前就提供给大龙的更新财富接口用到

### verify_code ###
  >验证码，好像没用，验证码目前用缓存。验证码主要是用户手机注册用。

### version ###
  >Android版本更新

### vip_privilege ###
  >vip特权表

### withdraw ###
  >主播提现表，以前是用以微信主播提现，目前没用。


## 二、表关系 ##

1. 主要表：
 - game\_loop\_card_log 每局牌记录,游戏的主要表
 - game\_loop\_settlement 每局用户结算，游戏的主要表
 - live_list 直播列表，推流、观看、回看地址等直播重要信息
 - recharge_log 充值记录，这个是充值是否成功、钻石是否发放、下单时间相关的
 - user 用户信息表，这个基本上每时每刻都会用到，用户登录的基本表
 - user\_deal\_log  这个是送礼物的记录表，也比较重要
 - app_config app配置表，其实主要是用于iOS审核用


2. 表互相关系 
  >表与表之间的耦合度不紧密，没有哪些行为是必须多表的，即每个表相对独立的

