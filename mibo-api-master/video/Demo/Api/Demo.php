<?php

class Api_Demo extends PhalApi_Api {

    public function getRules() {
        return array(
            'testRedis' => array(
                'id' => array('name' => 'user_id', 'type' => 'int', 'require' => false, 'desc' => '用户ID'),
            ),
        );
    }

    public function test() {
        exit(phpinfo());
    }

    public function testRedis() {

        $db = DI()->config->get('app.redis.DB');
        DI()->redis->set_Time('name', "董大龙", 20, $db['user']);

        return DI()->redis->get_Time('name',$db['user']);
    }

    public function testMail() {
        $mailer = new PHPMailer_Lite(true);
        $mail_str = "362226577@qq.com,1223354181@qq.com";
        $arr = explode(",", $mail_str);
        var_dump(array($mail_str));
        //$rs = $mailer->send($arr, 'Dallon Test PHPMailer Lite', 'something here ...');
        echo  "发送结果：" ;
        exit;
    }


}
