<?php
class Mysql{    //首先定义一个类,首写字母大写
    public $host;//服务器名,访问修饰符PUBLIC证明$host是一个公共的属情在类的内部外部都可访问,可以被继承
    public $user;//用户名,是公共的属性
    private $pass;//密码,问修饰符private证明$pass是私有的.只能在类的内部使用且不能被继承.
    public $dbname;//数据库名,也是公共的属性.
     //__construct声名这是一个造函数,定义一些初始的信息.有三个参数
                  public function __construct($host,$user,$pass,$dbname){
        $this->host = $host;
        $this->user = $user;
        $this->pass = $pass;
        $this->dbname = $dbname;
        $mysqli = new mysqli_connect($this->host,$this->user,$this->pass,$this->dbname);
        if ($mysqli->connect_error) {
            die('Error : ('. $mysqli->connect_errno .') '. $mysqli->connect_error);
        }
     }
//定义数据库的查寻和显示函数
function myQuery($sql){
		 $mysqli->query("SET NAMES 'utf8'");
		 $mysqli->query("SET CHARACTER_SET_CLIENT=utf8");
		 $mysqli->query("SET CHARACTER_SET_RESULTS=utf8");
        $result =  $mysqli->query($sql);
         if(!$result){
             echo "error3";
             exit;
         }
		 return  $result;
       /* $num = mysql_num_rows($result);
         if($num){
             echo "NO".$num;
         }
         while($row = mysql_fetch_assoc($result)){
             echo '<tr><td bgcolor="#fffddd"><pre>'.htmlspecialchars(stripslashes($row['body']))."<pre></td></tr>";
         }*/
     }
}
//$rutt = new Mysql('localhost','root','root','test');//实例化一个类...记住这里的参数是和构造函数的参数一样的...
//$rutt->myQuery('select * from calvin_body');//运行数据库查寻并显示的函数..
?>


<?php
/*
下面这个是针对php5以下版本的数据库封装类，体现了php类的继承，一个许愿版程序的：
 * FileName: DatabaseSQL.inc.php
 * Author: Terry
 * Function: 建立DatabaseSQL对象，实现对数据库的基本操作
 * Version : Blue-System v2.0
 * CreateDate: 2004-03-10
 * Copyright: Blue-Workshop / http://www.blue4me.net
*/

// 定义DatabaseSQL对象
Class DatabaseSQL
{
   var $CONN = "";     // 连接号
     var $HOST = "";     // 主机名
     var $USER = "";              // 用户名
     var $PASSWORD = "";          // 密码

     // DatabaseSQL类的构造函数
     function DatabaseSQL($DBNAME)
     {
       $user = $this -> USER;
         $password = $this -> PASSWORD;
         $host = $this -> HOST;
         $db = $DBNAME;

         // 连接数据库
         $conn = new mysqli_connect($host, $user, $password,$db);
         if ($conn->connect_error) {
             die('Error : ('. $mysqli->connect_errno .') '. $mysqli->connect_error);
         }
         $this -> CONN = $conn;
         return true;
     }

     // 定义查询操作
     function select($strSQL = "")
     {
       if ( empty($strSQL) ) return false;
         if ( empty($this -> CONN) ) return false;
         $conn = $this -> CONN;

         // 发送SQL语句，获得结果
         $result = $conn->query($strSQL, $conn);
         if ( (!$result) or (empty($result)) ) {
           return false;
         }
         $num = 0;
         $data = array();
         // 将查询结果放二维数组中
         while ( $row = mysqli_fetch_array($result) ) {
           $data[$num] = $row;
             $num++;
         }
         mysqli_free_result($result);
         return $data;
     }

     // 定义插入操作
     function insert($strSQL = "")
     {
       if ( empty($strSQL) ) return false;
         if ( empty($this -> CONN) ) return false;
         $conn = $this -> CONN;

         // 发送SQL语句，插入新数据
         $result = $conn->query($strSQL);
         if ( !result ) return false;

         // 获得记录的id号
         $result = $conn->insert_id;
         return $result;
     }

     // 定义更新操作
     function update($strSQL = "")
     {
       if ( empty($strSQL) ) return false;
         if ( empty($this -> CONN) ) return false;
         $conn = $this -> CONN;

         // 发送SQL语句，更新数据库
         $result = $conn->query($strSQL);
         return $result;
     }

     // 定义删除操作
     function delete($strSQL = "")
     {
       if ( empty($strSQL) ) return false;
         if ( empty($this -> CONN) ) return false;
         $conn = $this -> CONN;

         // 发送SQL语句，删除记录
         $result = $conn->query($strSQL);
         return $result;
     }

}
?>
