<?php
/**
 * PhalApi接口列表 - 自动生成
 *
 * - 对Api_系列的接口，进行罗列
 * - 按service进行字典排序
 * - 支持多级目录扫描
 * 
 * <br>使用示例：<br>
```
 * <?php
 * class Api_Qvod extends PhalApi_Api {
 *
 *      /**
 *       * 1.1 可在这里输入接口的服务名称
 *       * /
 *      public function index() {
 *          // todo ...    
 *      }
 * }
 *
```
 * @license     http://www.phalapi.net/license GPL 协议
 * @link        http://www.phalapi.net/
 * @author      xiaoxunzhao 2015-10-25
 * @modify      Aevit, dogstar <chanzonghuang@gmail.com> 2014-10-29
 */

define("D_S", DIRECTORY_SEPARATOR);
$root = dirname(__FILE__);

/**
 * 项目的文件夹名 - 如有需要，请更新此值
 */
$apiDirName = 'Mibo31';

require_once implode(D_S, array($root, '..', 'init.php'));
DI()->loader->addDirs($apiDirName);
$files = listDir(implode(D_S, array($root, '..', '..', $apiDirName, 'Api')));
$allPhalApiApiMethods = get_class_methods('PhalApi_Api');

$is_debug = DI()->config->get('sys.debug');
if(!$is_debug) {
    $ip_list = DI()->config->get('sys.ip_white_list');
    $ip = PhalApi_Tool::getClientIp();
    //if (!in_array($ip, $ip_list)) {
    //    exit("非法入侵，已触发报警系统。如果你是开发人员，请联系管理员自首，您当前IP为：" . $ip);
    //}
}

$allApiS = array();

foreach ($files as $value) {
    $value = realpath($value);
    $subValue = substr($value, strpos($value, D_S . 'Api' . D_S) + 1);
    //支持多层嵌套，不限级
    $arr       = explode(D_S, $subValue);
	$subValue  = implode(D_S, $arr);
    $apiServer = str_replace(array(D_S, '.php'), array('_', ''), $subValue);

    if (!class_exists($apiServer)) {
        continue;
    }

    $method = array_diff(get_class_methods($apiServer), $allPhalApiApiMethods);

    foreach ($method as $mValue) {
        $rMethod = new Reflectionmethod($apiServer, $mValue);
        if (!$rMethod->isPublic() || strpos($mValue, '__') === 0) {
            continue;
        }

        $title = '//请检测函数注释';
        $desc = '//请使用@desc 注释';
        $docComment = $rMethod->getDocComment();

        //@ignore注释 add by dallon
        $pos = stripos($docComment, '@ignore');
        if ($pos !== false) {
            continue;
        }

        if ($docComment !== false) {
            $docCommentArr = explode("\n", $docComment);
            $comment = trim($docCommentArr[1]);
            $title = trim(substr($comment, strpos($comment, '*') + 1));

            foreach ($docCommentArr as $comment) {
                $pos = stripos($comment, '@desc');
                if ($pos !== false) {
                    $desc = substr($comment, $pos + 5);
                }
            }
        }

        $service = substr($apiServer, 4) . '.' . ucfirst($mValue);
        $allApiS[$service] = array(
            'service' => $service,
            'title' => $title,
            'desc' => $desc,
        );
    }
}

//字典排列
ksort($allApiS);

function listDir($dir) {
    $dir .= substr($dir, -1) == D_S ? '' : D_S;
    $dirInfo = array();
    foreach(glob($dir.'*') as $v) {
        if (is_dir($v)) {
            $dirInfo = array_merge($dirInfo, listDir($v));
        } else {
            $dirInfo[] = $v; 
        }
    }
    return $dirInfo;
}

//$logString = trim(@file_get_contents(DI()->logger->getLogFile()));
$logString = '';

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title><?php echo $apiDirName; ?> - 在线接口列表</title>
    <link rel="stylesheet" href="https://staticfile.qnssl.com/semantic-ui/2.1.6/semantic.min.css">
    <link rel="stylesheet" href="https://staticfile.qnssl.com/semantic-ui/2.1.6/components/table.min.css">
    <link rel="stylesheet" href="https://staticfile.qnssl.com/semantic-ui/2.1.6/components/container.min.css">
    <link rel="stylesheet" href="https://staticfile.qnssl.com/semantic-ui/2.1.6/components/message.min.css">
</head>
<script charset="utf-8">
    window.onload=function () {

    }
    
    function toggleShowLog() {
        var log = document.getElementById("log");
        if(log.style.display == 'none') {
            log.style.display = "";
        } else {
            log.style.display = "none";
        }
    }

</script>
<body>
<br />
<div class="ui text container" style="max-width: none !important;">
    <div class="ui floating message">
        <h1 class="ui header">【米播】接口列表  <a href="javascript:void(0);" onclick="toggleShowLog();"> 系统日志 </a></h1>
        <textarea id='log' type="text" style="display: none; width: 100%; min-height: 300px; border-color: red; font-size: 8px;"><?php echo $logString; ?></textarea>
        <table class="ui green celled striped table">
            <thead>
                <tr>
                    <th>#</th><th>接口服务</th><th>接口名称</th><th>更多说明</th>
                </tr>
            </thead>
            <tbody>
                <?php
                $num = 1;
                $uri = str_ireplace('listAllApis.php', 'checkApiParams.php', $_SERVER['REQUEST_URI']);

                foreach ($allApiS as $key => $item) {
                    $link = $uri . '?service=' . $item['service'];
                    $NO = $num++;
                    echo "<tr><td>{$NO}</td><td><a href=\"$link\" target='_blank'>{$item['service']}</a></td><td>{$item['title']}</td><td>{$item['desc']}</td></tr>";
                }
                ?>
            </tbody>
        </table>
        <p>&copy; Powered  By <a href="http://www.phalapi.net/" target="_blank">PhalApi <?php echo PHALAPI_VERSION; ?></a> <p>
    </div>
</div>
</body>
</html>
