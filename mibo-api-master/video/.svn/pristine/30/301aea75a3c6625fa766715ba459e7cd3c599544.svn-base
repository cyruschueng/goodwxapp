<?php 
require_once '../../init.php';
if(!isMobile()) {
    //echo ("用手机打开效果更好哦！");
}
if(isset($_GET['live_id'])) {
    $live_id = $_GET['live_id'];
    //取得正在直播的有人场m3u8地址
    if(isset($live_id)) {
        $live_info_sql = 'select live.*, user.nick_name, user.sex, user.address, user.signature, ' .
                'user.level, user.avatar, user.mb_id from mb_live_list as live left join mb_user as user on ' .
                'live.anchor_id = user.id where live.id = ' . $live_id . ' and live.status = 2 and type = 0';
        $live_info = $pdo->query($live_info_sql)->row_array();
    }
}

?>
<!DOCTYPE html>
<html>
<head lang="zh-CN">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="renderer" content="webkit">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="format-detection" content="telephone=no"/>
    <meta name="screen-orientation" content="portrait">
    <meta name="x5-orientation" content="portrait">
    <meta name='apple-itunes-app' content='app-id=1072719627'>
    <meta name="Keywords" content="米播,米播直播,赚一个亿,赚他一个亿,美颜椒友,疯狂卖萌,直播,手机直播,美女直播,最新直播,现场直播,才艺直播,生活直播">
    <meta name="Description" content="米播App是一个聚焦于娱乐游戏的在线直播应用，区别于其他的传统直播，这更像是一个专业的娱乐直播，在直播领域引入新的娱乐模式，让直播和娱乐两不误。米播开启全民游戏时代，你可以尽情享受一边和主播聊天交友，一边和她对战游戏的乐趣。海量美女主播陪你斗棋牌，玩游戏，告别无聊，既能玩又能看，乐趣尽在米播App。">
    <title> 米播 </title>
    <link rel="stylesheet" type="text/css" href="css/index.css">

</head>
<body class='finish-page'>
<!-- 头部下载区域 -->
<header class='js_header log-dl section-two section-btn app-item' data-sid="2981222"
        data-pname="com.huajiao" data-size="22064161">
    <div class="logo-wrap">
        <span class='hj-slogan'>赚他一个亿</span>
    </div>
    <a href="http://api.mibolive.com/apps/mibo/download.php" id="openApp" data-dot-mark='1' class="js_hj_download goDownLoad" data-download-id="h5_live_open"
       data-open="true" data-key='立即下载'>立即下载</a>
</header>
<div class="maincontainer">
    
    <?php if(isset($live_info) && !empty($live_info)) { ?>
        <div class="author-cover js_author_cover">
            <div class="author-wrap">
                <div class="video_pic">
                    <img class="js_author_img"
                         data-src="<?php echo $live_info['cover_url']; ?>"
                         src="<?php echo $live_info['cover_url']; ?>">
                    <div class="live_info-mask"></div>
                    <a class="click-play-btn" href="./play.php?m3u8_url=<?php echo $live_info['m3u8_url'] ?>&cover_url=<?php $live_info['cover_url'] ?>"><img src="img/play-btn.png" alt=""></a>
                </div>
                <div class="top-wrap">
                <span class="typeTest ">
                    <?php if($live_info['status'] == 1){ echo '预告';}else{ echo '直播';}?>            </span>
                    <div class="hj-userid">米播号: <?php echo $live_info['mb_id'] ?></div>
                </div>
            </div>
        </div>
        <section class="userinfo vip">
            <div class="avatar">
                <img src="<?php echo $live_info['avatar']; ?>">
            </div>
            <div class="userMsg">
            <span class="nickname">
                <i><?php echo $live_info['nick_name']; ?></i>
                <i class="vip"></i>        </span>
                <p><span><?php echo $live_info['signature']; ?></span></p>
            </div>

        </section>
    <?php } ?>
    <!--其他直播-->
    <?php
        if(isset($_GET['anchor_id']) && is_numeric($_GET['anchor_id']) && isset($_GET['live_id'])) {
            $live_id = (int)$_GET['live_id'];
            $anchor_id = (int)$_GET['anchor_id'];

            $sql = 'select live.*, user.nick_name, user.sex, user.address, user.signature, ' .
            'user.level, user.avatar, user.mb_id from mb_live_list as live left join mb_user as user on ' .
            'live.anchor_id = user.id where live.type <> 1 and ( live.status = 0 or live.status = 1 or (live.status = 2 and ' .
            ' live.anchor_id != ' . $anchor_id . ')) ' .
            'or (live.status =3 and live.id = ' . $live_id . ') ' . 
            'order by live.type ASC, live.status DESC';
        } else {
             $sql = 'select live.*, user.nick_name, user.sex, user.address, user.signature, ' .
            'user.level, user.avatar, user.mb_id from mb_live_list as live left join mb_user as user on ' .
            'live.anchor_id = user.id where live.type <> 1 and (live.status = 0 or live.status = 1 or live.status = 2) ' .
            'order by live.type';
        }


        $live_info = $pdo->query($sql)->result_array();
     ?>

    <?php foreach($live_info as $live) { ?>
    <?php if($live['status'] == 3) { ?>
        <!-- 无用，为兼容js-->
        <div class="hjPopbox" style="display: none;"></div>
        <section class="playerArea js_playerArea">
            <img class="backimg" src="<?php echo $live['cover_url']; ?>"/>
            <div class="live-mask"></div>
            <!-- 错误页结构 -->
            <div class="finishInfo ">
                <a class='hot js_other_hot'>直播已结束</a>
            </div>
            <!-- 直播结束页结构 -->
        </section>
        <section class="userinfo vip">
            <div class="avatar">
                <img src="<?php echo $live['avatar']; ?>">
            </div>
            <div class="userMsg">
            <span class="nickname">
                <i><?php echo $live['nick_name']; ?></i>
                <i class="vip"></i>        </span>
                <p><span><?php echo $live['signature']; ?></span></p>
            </div>

        </section>
    <?php }elseif($live['status'] == 2) { ?>
            <div class="author-cover js_author_cover">
            <div class="author-wrap">
                <div class="video_pic">
                    <img class="js_author_img"
                         data-src="<?php echo $live['cover_url']; ?>"
                         src="<?php echo $live['cover_url']; ?>">
                    <div class="live-mask"></div>
                    <?php if($live['type'] == 0){ ?>
                    <a class="click-play-btn" href="../play.php?m3u8_url=<?php echo $live['m3u8_url'] ?>&cover_url=<?php $live['cover_url'] ?>"><img src="img/play-btn.png" alt=""></a>
                    <?php } ?>
                </div>
                <div class="top-wrap">
                <span class="typeTest ">
                    <?php if($live['status'] == 1){ echo '预告';}else{ echo '直播';}?>            </span>
                    <div class="hj-userid">米播号: <?php echo $live['mb_id'] ?></div>
                </div>
            </div>
        </div>
        <section class="userinfo vip">
            <div class="avatar">
                <img src="<?php echo $live['avatar']; ?>">
            </div>
            <div class="userMsg">
            <span class="nickname">
                <i><?php echo $live['nick_name']; ?></i>
                <i class="vip"></i>        </span>
                <p><span><?php echo $live['signature']; ?></span></p>
            </div>

        </section>

    <?php } else { ?>
        <!-- 个人信息 -->
        <div class="author-cover js_author_cover">
            <div class="author-wrap">
                <div class="video_pic">
                    <img class="js_author_img"
                         data-src="<?php echo $live['cover_url']; ?>"
                         src="<?php echo $live['cover_url']; ?>">
                    <div class="live-mask"></div>
                </div>
                <div class="top-wrap">
                <span class="typeTest ">
                    <?php if($live['status'] == 1){ echo '预告';}else{ echo '直播';}?>            </span>
                    <div class="hj-userid">米播号: <?php echo $live['mb_id'] ?></div>
                </div>
            </div>
        </div>
        <section class="userinfo vip">
            <div class="avatar">
                <img src="<?php echo $live['avatar']; ?>">
            </div>
            <div class="userMsg">
            <span class="nickname">
                <i><?php echo $live['nick_name']; ?></i>
                <i class="vip"></i>        </span>
                <p><span><?php echo $live['signature']; ?></span></p>
            </div>

        </section>
    <?php } ?>
    <?php } ?>


    <section class="huajiaoOpen app-item js_bttm">
        <a class="btn-open js_hj_download" data-dot-mark='11' data-key='更多直播按钮' data-download-id="h5_live_open"
           data-open='true' href="http://api.mibolive.com/apps/mibo/download.php">打开米播App， 互动更精彩，直播更流畅</a>
    </section>
</div>
<div class="downed-wrap" id='js_downed_tip'>
    <div class='downed-tip'>
        <span class='js_kown down-kown'></span>
    </div>
</div>
<script>


    var url = {
        open: "mblive://mibo.yahalei.com/live?type=1&id=<? echo $live_info['id']; ?>",//打开某手机上的某个app应用
        down: "http://api.mibolive.com/apps/mibo/download.php"
    };

    window.location=url.open;

//        var the_href=$("#openApp").attr("href");//获得下载链接
//        window.location="mblive://mibo.yahalei.com/live?id=<?// echo $live_info['id']; ?>//";//打开某手机上的某个app应用
//        setTimeout(function(){
//            window.location=the_href;//如果超时就跳转到app下载页
//        },1000);


//    document.getElementById('openApp').onclick = function (e) {
//        // 通过iframe的方式试图打开APP，如果能正常打开，会直接切换到APP，并自动阻止a标签的默认行为
//        // 否则打开a标签的href链接
//        var ifr = document.createElement('iframe');
//        ifr.src = "mblive://mibo.yahalei.com/live?id=<?// echo $live_info['id']; ?>//";
//        ifr.style.display = 'none';
//        document.body.appendChild(ifr);
//        window.setTimeout(function () {
//            document.body.removeChild(ifr);
//        }, 1000)
//    };
// document.getElementById('openApp').click();

//
//    function isInstalled(){
//        var the_href=$("#openApp").attr("href");//获得下载链接
//        window.location="mblive://mibo.yahalei.com/live?id=<?// echo $live_info['id']; ?>//";//打开某手机上的某个app应用
//        setTimeout(function(){
//            window.location=the_href;//如果超时就跳转到app下载页
//        },500);
//    }

</script>

</body>
</html>