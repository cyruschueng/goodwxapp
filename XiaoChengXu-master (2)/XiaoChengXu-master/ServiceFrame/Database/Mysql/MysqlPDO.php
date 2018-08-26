<?php

/**
 其他未实现的
1、绑定列到php变量请使用  $db->statement->bindColumn(1,$name);
*/
class MysqlPDO {
	private $pdo = null;
	public $statement = null;
	private $is_addsla = false;
	public $options = array(
			PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES ",
	);
	public function __construct($mysqlConf){
	    
	    $host = $mysqlConf['host'];
	    $user= $mysqlConf['user'];
	    $pass= $mysqlConf['password'];
	    $dbname= $mysqlConf['dbname'];
		$this->options[PDO::MYSQL_ATTR_INIT_COMMAND] .= "utf8";
		if(!empty($array['no_persistent'])){
			$this->options[PDO::ATTR_PERSISTENT] = false;
		}
		$dsn = "mysql:host={$host};dbname={$dbname}";
		
		try {
			$this->pdo = new PDO($dsn,$user,$pass,$this->options);
			$this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			/* 下面2行为避免查出的int字段自动变string */
			$this->pdo->setAttribute(PDO::ATTR_STRINGIFY_FETCHES, false);
			$this->pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
		} catch (PDOException $e) {
			print "Mysql Error!: " . $e->getMessage() . "<br>";
			die();
		}
	}
	/**
	 全局属性设置，包括：列名格式和错误提示类型    可以使用数字也能直接使用参数
	 */
	public function setAttr($param,$val=''){
		if(is_array($param)){
			foreach($param as $key=>$val){
				$this->pdo->setAttribute($key,$val);
			}
		}else{
			if($val!=''){
				$this->pdo->setAttribute($param,$val);
			}else{
				return false;
			}
			 
		}
	}
	/**
	 生成一个编译好的sql语句模版 你可以使用 ? :name 的形式
	 返回一个statement对象
	 */
	public function doPrepare($sql=""){
		addLog(array('file_name'=>'sqlPrepare','content'=>$sql));
		if($sql==""){
			return false;
		}
		try{
			$this->statement = $this->pdo->prepare($sql);
			return $this->statement;
		}catch(PDOException $e){
			$exception = $e->getMessage();
			$array = array('exception' => $exception);
			$this->showSqlError($array);
		}
	}
	/**
	 执行Sql语句，一般用于 增、删、更新或者设置  返回影响的行数
	 */
	public function exec($sql){
		if($sql==""){
			return false;
		}
		try{
			return $this->pdo->exec($sql);
		}catch(Exception $e){
			return $e->getMessage();
		}
		 
	}
	/**
	 执行有返回值的查询，返回PDOStatement  可以通过链式操作，可以通过这个类封装的操作获取数据
	 */
	public function query($sql){
		if($sql=""){
			return false;
		}
		try{
			$this->statement = $this->pdo->query($sql);
			return $this->statement;
		}catch(Exception $e){
			return $e->getMessage();
		}
	}
	/**
	 开启事务
	 */
	public function begin(){
		return $this->pdo->beginTransaction();
	}
	/**
	 提交事务
	 */
	public function commit(){
		return $this->pdo->commit();
	}
	/**
	 事务回滚
	 */
	public function rollBack(){
		return $this->pdo->rollBack();
	}
	public function lastInertId(){
		return $db->lastInsertId();
	}
	 
	 
	 
	 
	//**   PDOStatement 类操作封装    **//
	 
	/**
	 让模版执行SQL语句，1、执行编译好的 2、在执行时编译
	 */
	public function execute($param=""){
		if(is_array($param)){
			try{
				return $this->statement->execute($param);
			}catch (Exception $e){
				//return $this->errorInfo();
				return $e->getMessage();
			}
		}else{
			try{
				return $this->statement->execute();
			}catch(Exception $e){
				/* 返回的错误信息格式
				 [0] => 42S22
				[1] => 1054
				[2] => Unknown column 'col' in 'field list'
				return $this->errorInfo();
				*/
				return $e->getMessage();
			}
		}
	}
	 
	/**
	 参数1说明：
	 PDO::FETCH_BOTH     也是默认的，两者都有（索引，关联）
	 PDO::FETCH_ASSOC    关联数组
	 PDO::FETCH_NUM      索引
	 PDO::FETCH_OBJ          对象
	 PDO::FETCH_LAZY     对象 会附带queryString查询SQL语句
	 PDO::FETCH_BOUND    如果设置了bindColumn，则使用该参数
	 */
	public function fetch($fetch_style=PDO::FETCH_BOTH){
		if(is_object($this->statement)){
			return $this->statement->fetch($fetch_style);
		}else{
			return false;
		}
	}
	/**
	 参数1说明：
	 PDO::FETCH_BOTH     也是默认的，两者都有（索引，关联）
	 PDO::FETCH_ASSOC    关联数组
	 PDO::FETCH_NUM      索引
	 PDO::FETCH_OBJ          对象
	 PDO::FETCH_COLUMN   指定列 参数2可以指定要获取的列
	 PDO::FETCH_CLASS        指定自己定义的类
	 PDO::FETCH_FUNC     自定义类 处理返回的数据
	 PDO_FETCH_BOUND 如果你需要设置bindColumn，则使用该参数
	 参数2说明：
	 给定要处理这个结果的类或函数
	 */
	public function fetchAll($fetch_style=PDO::FETCH_BOTH,$handle=''){
		if($handle!=''){
			return $this->statement->fetchAll($fetch_style,$handle);
		}else{
			return $this->statement->fetchAll($fetch_style);
		}
	}
	/**
	 以对象形式返回 结果 跟fetch(PDO::FETCH_OBJ)一样
	 */
	public function fetchObject($class_name){
		if($clss_name!=''){
			return $this->statement->fetchObject($class_name);
		}else{
			return $this->statement->fetchObject();
		}
	}
	 
	/**
	 public function bindColumn($array=array(),$type=EXTR_OVERWRITE){
	 if(count($array)>0){
	 extract($array,$type);
	 }
	 //$this->statement->bindColumn()
	 }
	 */
	 
	/**
	 以引用的方式绑定变量到占位符(可以只执行一次prepare，执行多次bindParam达到重复使用的效果)
	 */
	public function bindParam($parameter,$variable,$data_type=PDO::PARAM_STR,$length=6){
		return $this->statement->bindParam($parameter,$variable,$data_type,$length);
	}
	 
	/**
	 返回statement记录集的行数
	 */
	public function rowCount(){
		return $this->statement->rowCount();
	}
	public function count(){
		return $this->statement->rowCount();
	}
	 
	 
	/**
	 关闭编译的模版
	 */
	public function close(){
		return $this->statement->closeCursor();
	}
	public function closeCursor(){
		return $this->statement->closeCursor();
	}
	/**
	 返回错误信息也包括错误号
	 */
	private function errorInfo(){
		return $this->statement->errorInfo();
	}
	/**
	 返回错误号
	 */
	private function errorCode(){
		return $this->statement->errorCode();
	}
	
	
	//简化操作--------------------------------------------------
	
	/*
	$select：要获取的属性
	$table：数据表名称
	$condition：获取条件
	$order：数据排序
	$limit：获取几条数据
	*/
	public function select($array) {
		$array = array_merge(array('field'=>'*','table'=>'','where'=>'','group'=>'','order'=>'','limit'=>''),$array);
		if(!$array['table']){
			$array['table'] = $this->getTable();
		}
	    if( is_array($array['order']) && isset($array['order']['order']) && ( $array['order']['order'] == 'desc' || $array['order']['order'] == 'asc' ) && isset($array['order']['field']) ) {
	        $array['order'] = "order by ".$array['order']['field']. $array['order']['order'];
	    } elseif( $array['order'] && is_string($array['order']) ) {
	        $array['order'] = " order by {$array['order']}";
	    } else $array['order'] = '';
	    
	    if($array['group']) {
	    	$array['group'] = " GROUP BY ".$array['group'];
	    }
	    if($array['limit']) {
	    	$array['limit'] = " LIMIT ".$array['limit'];
	    }
	    
	    $this->sql = 
	    "SELECT ".  $array['field'].
	    " FROM ".    $array['table']. 
	    " WHERE 1 ". $array['where'].
	    $array['group'].
	    $array['order'].
	    $array['limit'];
	    
	    addLog(array('file_name'=>'sqlSelect','content'=>$this->sql));
	    
	    if($this->result = $this->doPrepare($this->sql)) {
	        return $this;
	    }
	    return $this;
	}
	//获取所有查询到的数据$select,$table,$condition = '',$order = array(), $limit = ''
	//fetchAll可参照：http://www.zixijiaoshi.com/html/sjk/mysql/2014/0420/6009.html
	public function getAll($array) {
		$this->select($array);
		$arrData = array();
		if( $this->statement ) {
			try{
				$this->result = $this->statement->execute();
				if(isset($array['other']['row_format'])){
					$arrData = $this->row_format($array['other']['row_format']);
				} else{
					$arrData = $this->statement->fetchAll(PDO::FETCH_ASSOC);
				}
			}catch(PDOException $e){
				$this->showSqlError(array('exception'=>$e->getMessage()));
			}
		}
		return $arrData;
	}
	//获取一条查询到的数据
	public function getOne($array) {
		$array['limit'] = '1';
		$this->select($array);
		$arrData = array();
		if( $this->statement ) {
			try{
				$this->statement->execute();
				$arrData = $this->statement->fetch(PDO::FETCH_ASSOC);
			}catch(PDOException $e){
				$this->showSqlError(array('exception'=>$e->getMessage()));
			}
		}
		return $arrData;
	}
	
	public function insert($array){
		$array = array_merge(array('table'=>''),$array);
		
		if(!is_array($array['data'])){
		    print_r($array);
			die('data必须是数组！');
		}
		if(!$array['table']){
			$array['table'] = $this->getTable();
		}
		$cols = array();
		$vals = array();
		foreach($array['data'] as $key=>$val){
			$cols[]=$key;
			$vals[]="'".$this->addsla($val)."'";
		}
		$sql  = "INSERT INTO {$array['table']} (";
		$sql .= implode(",",$cols).") VALUES (";
		$sql .= implode(",",$vals).")";
		
		addLog(array('file_name'=>'sqlInsert','content'=>$sql));
		$r = $this->exec($sql);
		if($r != 1){
			print_r('sql:'.$sql.PHP_EOL.'errorInfo:');
			print_r($this->pdo->errorInfo());
			die();
		}

		if(isset($array['is_return_id'])){
			return ['id'=>$this->pdo->lastInsertId()];
		} else{
			return $r;
		}
	}
	public function update($array){
		
		$array = array_merge(array('table'=>''),$array);
		
		if(!is_array($array['data'])){
			die('data必须是数组！');
		}
		$set = array();
		foreach($array['data'] as $key=>$val){
			$set[] = $key."='".trim($this->addsla($val))."'";
		}
		if(!$array['table']){
			$array['table'] = $this->getTable();
		}
		$sql = "UPDATE {$array['table']} SET ";
		$sql .= implode(",",$set);
		if(!empty($array['data_str'])){
			if($set){
				$sql .= ',';
			}
			$sql .= $array['data_str'];
		}
		$sql .= " WHERE 1 ".$array['where'];
		
		addLog(array('file_name'=>'sqlUpdate','content'=>$sql));
		//echo 44;exit;这里需要增加报错!!!!!!!!!!!!! 参考http://www.jb51.net/article/28183.htm
		
		$r = $this->exec($sql); 
		if(!is_numeric($r)){
			print_r('sql:'.$sql.PHP_EOL.'errorInfo:');
			print_r($this->pdo->errorInfo());
			addLog(array('file_name'=>'sqlErrorUpdate','content'=>$sql));
			die();
		}
		
		return $r ? $r : 'no_change';
	}
	
	public function delete($array){
		$sql = "DELETE FROM {$array['table']} WHERE 1 ".$array['where'];
		
		addLog(array('file_name'=>'sqlDelete','content'=>$sql));
		
		$r = $this->exec($sql);
		//报错需要整合在一起
		if(!is_numeric($r)){
			print_r('sql:'.$sql.PHP_EOL.'errorInfo:');
			print_r($this->pdo->errorInfo());
			addLog(array('file_name'=>'sqlErrorUpdate','content'=>$sql));
			die();
		}
		return $r;
	}
	 
	private function addsla($data){
		if($this->is_addsla){
			return trim(addslashes($data));
		}
		return $data;
	}
	
	/* 行格式*复杂些的sql操作需放置于另外一个文件，以免影响大多数简单sql操作 */
	function row_format($row_format){
		$arrData = array();
		if(isset($row_format['key']) && isset($row_format['val'])){
			while($row = $this->statement->fetch(PDO::FETCH_ASSOC)){
				$arrData[$row[$row_format['key']]] = $row[$row_format['val']];
			}
		} else if(isset($row_format['key'])){
			while($row = $this->statement->fetch(PDO::FETCH_ASSOC)){
				$arrData[$row[$row_format['key']]] = $row;
			}
		}
		return $arrData;
	}
	
	/* 输出sql报错方法,用于前端操作的跳出 */
	function showSqlError($array){
		die(PHP_EOL.$this->sql.PHP_EOL.$array['exception'].PHP_EOL);
	}
	/* 获得表名 */
	function getTable(){
		$CDS = Frame_Controller::get_instance();
		if($CDS->table){
			return $CDS->table;
		}else{
			die('没有输入table表名');
		}
	}
}
