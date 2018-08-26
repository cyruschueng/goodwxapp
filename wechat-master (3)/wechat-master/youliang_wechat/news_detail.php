<?php
/**
 * 文章详情页
 * @authors DemoChen
 * @date    2017-11-27 12:09:13
 * @version V1.0
 */

include_once "api/common/common.php";
//$data = $_GET;
$data = json_decode(file_get_contents("php://input"), true);

$news_id = trim($data['news_id']);
if ($news_id) {
    $news = db_select($link, 'yl_news', 'id,title,detail,audio,author,summary,link,type,create_time', "online_time <= NOW() AND is_delete =1 AND status != -1 AND id = $news_id", 'online_time desc ');
    $info = dealData($news);
    $info['detail'] = str_replace("/public/upload/img/image/", WEB_URL . "/public/upload/img/image/", $info['detail']);

    $info['audio'] = $info['audio'] ? WEB_URL . $info['audio'] : '';
    // 更新浏览数
    db_update($link, 'yl_news', 'view_count = 1+view_count,update_time=NOW()', "id = $news_id");
    echo $news ? returnMsg('200', '文章详情查询成功', $info) : returnMsg('-1', '文章详情查询失败');

}
/*<p>
详情
</p>
<p>
<br />
</p>
<p>
<img src="/public/upload/img/image/20171204/20171204170803_67942.jpg" alt="" />
</p>
 */
