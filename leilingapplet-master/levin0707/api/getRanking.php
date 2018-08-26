<?php
/**
 * 游戏排名类
 */
class getRanking{
	public $uid;
	public $score;
	public $percentage; //排名百分比
	private $db_host;
	private $db_user;
	private $db_pwd;
	private $db_charset;
	private $db_name; // 数据库
	private $conn; // 数据库链接

	/**
	 * 构造函数
	 */
	public function __construct(){
		$this->score = ! empty($_REQUEST['score']) ? trim($_REQUEST['score']) : exit('score not exists.');
		$this->uid = uniqid(); // 生成唯一ID号
		/*数据库配置信息*/
		$this->db_host = 'mysql.sql98.cdncenter.net:3306';
		$this->db_user = 'sq_wapmedia03';
		$this->db_pwd = 'wapmedia';
		$this->db_charset = 'utf8';
		$this->db_name = 'sq_wapmedia03';
		$this->table_name = 'gameUser';
		
		$this->conn = $this->connect();
	}

	/**
	 * 连接数据库
	 */
	public function connect(){
		if($cn = mysql_connect($this->db_host, $this->db_user, $this->db_pwd)){
			if(mysql_select_db($this->db_name)){
				$sql = 'set names utf8';
				if(mysql_query($sql, $cn)){
					return $cn;
				}else{
					exit('does not set names.');
				}
			}else{
				exit('does not select db.');
			}
		}else{
			exit('does not connect database.');
		}
	}

	/**
	 * 插入数据库
	 */
	public function insertUid(){
		$inputtime = time();
		$sql = "INSERT INTO `{$this->table_name}` (`uid`,`score`,`inputtime`) VALUES ('$this->uid','$this->score','$inputtime')";
		if(mysql_query($sql, $this->conn)){
			return true;
		}else{
			return false;
		}
	}

	/**
	 * 获取总人数
	 */
	public function countUser(){
		$sql = "SELECT COUNT(*) FROM `{$this->table_name}`";
		$r = mysql_query($sql, $this->conn);
		$rst = mysql_fetch_row($r);
		return $rst[0];
	}

	/**
	 * 获取当前关数排名
	 */
	public function currLevel(){
		$sql = "SELECT * FROM `{$this->table_name}` ORDER BY `score` DESC,`inputtime` DESC";
		$r = mysql_query($sql, $this->conn);
		$data = array();
		while($row = mysql_fetch_assoc($r)){
			$data[] = $row;
		}
		foreach ($data as $key => $val) {
			if($this->uid == $val['uid']){
				return $key;
			}
		}
	}

	/**
	 * 返回排名百分比
	 */
	public function rstPercentage(){
		$this->insertUid(); // 添加当前用户
		$total_users = (int)$this->countUser(); // 用户总数
		$curr_score = $this->currLevel(); // 当前排名
		$this->percentage = ($total_users - $curr_score) / $total_users;
		$this->percentage = round($this->percentage, 2)*100;
		return $this->percentage;
	}
}

$GR = new getRanking();
echo $GR->rstPercentage();
?>