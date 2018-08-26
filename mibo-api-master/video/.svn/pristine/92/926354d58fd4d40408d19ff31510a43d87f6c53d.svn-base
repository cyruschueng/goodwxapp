<?php

class PDOHelper {
	private $pdo = null;
	private $statement = null;

	public function __construct($host = 'mysql:host=127.0.0.1;dbname=mibo;port=3306;charset=utf8', $user = 'root', $password = ''){
		if($this->pdo == null){
			$this->pdo = new PDO($host, $user, $password);
			$this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			$this->pdo->exec('set names utf8');
		}
	}

	public function query($sql, $data = null){
		if( ! $sql) return false;

		$this->statement = $this->pdo->prepare($sql);
		if($data == null){
			$result = $this->statement->execute();
		}
		else{
			$data = is_array($data) ? $data : array($data);
			$result = $this->statement->execute($data);
		}

		return (stripos($sql, 'update') === FALSE && stripos($sql, 'insert') === FALSE && stripos($sql, 'delete') === FALSE && stripos($sql, 'call') === FALSE) ? $this : $result;
	}

	public function row($n = null){

		$result = (is_int($n) && $n >= 0) ? $this->statement->fetchColumn($n) : $this->statement->fetch(PDO::FETCH_OBJ);
		return $result;
	}

	public function row_array(){
		$result = $this->statement->fetch(PDO::FETCH_ASSOC);
		return $result;
	}

	public function result($field = ''){

		while($row = $this->statement->fetch(PDO::FETCH_OBJ)){
			if($field && isset($row->$field)){
				$result[$row->$field] = $row;
			}
			else{
				$result[] = $row;
			}
		}

		return $result;
	}

	public function result_array($field = ''){

		while($row = $this->statement->fetch(PDO::FETCH_ASSOC)){
			if($field && isset($row[$field])){
				$result[$row[$field]] = $row;
			}
			else{
				$result[] = $row;
			}
		}

		return $result;
	}

	public function result_count() {
		$count = 0;
		while($row = $this->statement->fetch(PDO::FETCH_ASSOC)){
			$count ++;
		}
		return $count;
	}
	
	public function lastInsertId() {
		return $this->pdo->lastInsertId();
	}

}
