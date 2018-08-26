<?php
/**
 * 邮件工具类
 *
 * - 基于PHPMailer的邮件发送
 *
 *  配置
 *
 * 'PHPMailer' => array(
 *   'email' => array(
 *       'host' => 'smtp.gmail.com',
 *       'username' => 'XXX@gmail.com',
 *       'password' => '******',
 *       'from' => 'XXX@gmail.com',
 *       'fromName' => 'PhalApi团队',
 *       'sign' => '<br/><br/>请不要回复此邮件，谢谢！<br/><br/>-- PhalApi团队敬上 ',
 *   ),
 * ),
 *
 * 示例
 *
 * $mailer = new PHPMailer_Lite(true);
 * $mailer->send('chanzonghuang@gmail.com', 'Test PHPMailer Lite', 'something here ...');
 *
 * @author dogstar <chanzonghuang@gmail.com> 2015-2-14
 */

require_once dirname(__FILE__) . DIRECTORY_SEPARATOR . 'PHPMailer' . DIRECTORY_SEPARATOR . 'PHPMailerAutoload.php';

class PHPMailer_Lite {
    protected $debug;

    protected $config;

    protected $mail_body_top = '<div><br></div>
<div>
    <includetail>
        <style type="text/css">
            body {
                margin: 0 auto;
                padding: 0;
                font-family: \'Microsoft YaHei\', Tahoma, Arial;
                color: #333333;
                background-color: #fff;
                font-size: 12px;
            }

            a {
                color: #00a2ca;
                line-height: 22px;
                text-decoration: none;
            }

            a:hover {
                text-decoration: underline;
                color: #00a2ca;
            }

            td {
                font-family: \'Microsoft YaHei\';
            }

            .td_left {
                width:200px;
                height:26px;
            }
            .td_right {
                width:560px;
                height:26px;
                padding-left:15px;
                font-weight:bold;
                color:#99cc00;
            }
        </style>

        <table width="800" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#ffffff"
               style="font-family:\'Microsoft YaHei\';">
        <tbody>
        <tr>
            <td>
                <table width="800" border="0" align="center" cellpadding="0" cellspacing="0" height="40"></table>
            </td>
        </tr>
        <tr>
            <td>
                <table width="800" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#373d41"
                       height="48">
                    <tbody>
                    <tr>
                        <td width="200" height="48" border="0" align="left" valign="middle" style="padding-left:20px;">
                            <a href="http://api.mibolive.com/apps/mibo/download.php" target="_blank" align="center">
                                <img src="http://image.cdn.mibolive.com/img/webimg/28.png" width="28" height="28"
                                     border="0" align="center">
                                <span width="70" height="48" border="0" style="line-height: 48px; font-weight:bold;color:#fff;"> 米播直播</span>
                                <span width="70" height="48" border="0" style="line-height: 48px; font-size:10px; "> ----赚他一个亿</span>
                            </a>
                        </td>
                        <td width="500" height="48" colspan="2" align="right" valign="middle"
                            style="color:#ffffff; padding-right:20px;">
                            &nbsp;
                            <a href="http://www.mibolive.com" target="_blank"
                               style="color:#ffffff;text-decoration:none;">官网</a>
                            &nbsp;&nbsp; <span style="color:#6c7479;">|</span>&nbsp;&nbsp;
                            <a href="http://api.mibolive.com/apps/mibo/download.php" target="_blank"
                               style="color:#ffffff;text-decoration:none;">下载地址</a>
                        </td>
                    </tr>
                    </tbody>
                </table>

            </td>
        </tr>
        <tr>
            <td>

                <table width="800" border="0" align="left" cellpadding="0" cellspacing="0"
                       style=" border:1px solid #edecec; border-top:none; border-bottom:none; padding:0 20px;font-size:14px;color:#333333; background-color:rgb(240,240,240)">

                    <tbody>
                    <tr>
                        <td width="760" height="56" border="0" align="left" colspan="2"
                            style=" font-size:16px;vertical-align:bottom;">尊敬的
                        米播团队<a></a>：
                        </td>
                    </tr>
                    <tr>
                        <td width="760" height="30" border="0" align="left" colspan="2">&nbsp;</td>
                    </tr>';


    protected $mail_body_bottom = '<tr>
                        <td width="720" height="56" colspan="2" style="padding-left:40px;">加油！加油！加油！</td>
                    </tr>
                    <tr>
                        <td width="720" height="32" colspan="2"
                            style="padding-left:40px;"> 如若系统测试给您带来不便，深表歉意！
                        </td>
                    </tr>
                    <tr>
                        <td width="720" height="32" colspan="2" style="padding-left:40px;">&nbsp;</td>
                    </tr>


                    <tr>
                        <td width="720" height="14" colspan="2"
                            style="padding-bottom:16px; border-bottom:1px dashed #e5e5e5;";">
                        深圳和聚网络科技有限公司
                        </td>
                    </tr>
                    <tr>
                        <td width="720" height="14" colspan="2"
                            style="padding:8px 0 28px;color:#999999; font-size:12px;";">
                        此为系统邮件请勿回复
                        </td>
                    </tr>
                    </tbody>
                </table>

            </td>
        </tr>

        <tr>
            <td width="800" height="100" align="center" valign="middle">
                <img border="0" height="100"
                     src="http://image.cdn.mibolive.com/img/webimg/email_ewm.jpg">
            </td>
        </tr>
        </tbody>
        </table>
    </includetail>
</div>';

    public function __construct($debug = FALSE) {
        $this->debug = $debug;

        $this->config = DI()->config->get('app.PHPMailer.email');
    }

    /**
     * 发送邮件
     * @param array /string $addresses 待发送的邮箱地址
     * @param sting $title 标题
     * @param string $content 内容
     * @param boolean $isHtml 是否使用HTML格式，默认是
     * @return boolean 是否成功
     */
    public function send($addresses, $title, $content, $isHtml = TRUE) {
        $mail = new PHPMailer;
        $cfg = $this->config;

        $mail->isSMTP();
        $mail->Host = $cfg['host'];
        $mail->SMTPAuth = true;
        $mail->Username = $cfg['username'];
        $mail->Password = $cfg['password'];
        $mail->CharSet = 'utf-8';

        $mail->From = $cfg['username'];
        $mail->FromName = $cfg['fromName'];
        $addresses = is_array($addresses) ? $addresses : array($addresses);
        foreach ($addresses as $address) {
            $mail->addAddress($address);
        }

        $mail->WordWrap = 50;
        $mail->isHTML($isHtml);
        $mail->addAttachment('http://image.cdn.mibolive.com/img/webimg/email_ewm.jpg', "email_ewm.jpg");

        $mail->Subject = trim($title);
        $mail->Body = $content . $cfg['sign'];
        if (!$mail->send()) {
            if ($this->debug) {
                DI()->logger->debug('Fail to send email with error: ' . $mail->ErrorInfo);
            }

            return false;
        }

        if ($this->debug) {
            DI()->logger->debug('Succeed to send email', array('addresses' => $addresses, 'title' => $title));
        }

        return true;
    }

    /**
     * 发送邮件,新方法
     * @param array /string $addresses 待发送的邮箱地址
     * @param sting $title 标题
     * @param string $content 内容
     * @param boolean $isHtml 是否使用HTML格式，默认是
     * @return boolean 是否成功
     */
    public function sendMail($addresses, $title, $content_arr, $isHtml = TRUE) {
        $mail = new PHPMailer;
        $cfg = $this->config;

        $mail->isSMTP();
        $mail->Host = $cfg['host'];
        $mail->SMTPAuth = true;
        $mail->Username = $cfg['username'];
        $mail->Password = $cfg['password'];
        $mail->CharSet = 'utf-8';

        $mail->From = $cfg['username'];
        $mail->FromName = $cfg['fromName'];
        $addresses = is_array($addresses) ? $addresses : array($addresses);
        foreach ($addresses as $address) {
            $mail->addAddress($address);
        }

        $mail->WordWrap = 50;
        $mail->isHTML($isHtml);
        $mail->addAttachment('http://image.cdn.mibolive.com/img/webimg/email_ewm.jpg', "email_ewm.jpg");

        $mail->Subject = trim($title);
        $content = $this->assembleContent($content_arr);
        if(!$content) return true;

        $mail->Body = $content . $cfg['sign'];
        if (!$mail->send()) {
            if ($this->debug) {
                DI()->logger->debug('Fail to send email with error: ' . $mail->ErrorInfo);
            }

            return false;
        }

        if ($this->debug) {
            DI()->logger->debug('Succeed to send email', array('addresses' => $addresses, 'title' => $title));
        }

        return true;
    }

    public function assembleContent($content_arr) {
        $main = '';

        if(empty($content_arr) || !is_array($content_arr)) {
            return false;
        }
        foreach($content_arr as $key => $val) {
            $main .= '<tr>
                        <td align="right" class="td_left">' . $key . '：</td>
                        <td align="left" class="td_right">'. $val .'</td>
                    </tr>';
        }

        $body = $this->mail_body_top . $main . $this->mail_body_bottom;

        return $body;

    }
}

