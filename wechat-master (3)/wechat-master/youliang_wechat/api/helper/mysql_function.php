<?php
/**
 * 对数据库的操作
 * @authors DemoChen
 * @date    2017-11-23 19:02:04
 * @version V1.0
 */

/**
 *连接数据库服务器
 *@DateTime 2017-11-23
 *@param string $host         主机地址
 *@param string $user         用户名
 *@param string $pwd         用户密码
 *@param string $name         数据库名
 *@param string $charset     字符集
 *@return string $link       数据库连接
 */
function db_connect($host, $user, $pwd, $name, $charset)
{
    $link = mysqli_connect($host, $user, $pwd);
    if (!$link) {
        return false;
    }
    if (!mysqli_select_db($link, $name)) {
        return false;
    }
    mysqli_set_charset($link, $charset);

    return $link;
}

/**
 * 插入数据
 * @DateTime 2017-11-23
 *@param string $link         连接地址
 *@param string $table          表
 *@param string $data         插入的数据
 *@return bool              true或者false
 */
function db_insert($link, $table, $data)
{
    $keys = join(',', array_keys($data));
    $values = implode(',', parse_value(array_values($data)));

    $sql = "insert into $table($keys) values($values)";
//echo $sql;
    $result = mysqli_query($link, $sql);
    if ($result && mysqli_affected_rows($link)) {
        return mysqli_insert_id($link);
    }
    return false;
}

/**
 * 删除数据
 * @DateTime 2017-11-23
 *@param string $link    连接地址
 *@param string $table     表
 *@param string $where     条件
 *@return bool         true或者false
 */
function db_delete($link, $table, $where)
{
    $sql = "delete from $table where $where";
    //echo $sql;'<br />';
    $result = mysqli_query($link, $sql);
    if ($result && mysqli_affected_rows($link)) {
        return true;
    }
    return false;
}

/**
 * 更新数据
 * @DateTime 2017-11-23
 *@param string $link         连接地址
 *@param string $table        操作的表
 *@param string $set           设置信息
 *@param string $where          条件
 *@return bool               true或者false
 */
function db_update($link, $table, $set, $where)
{
    if (is_array($set)) {
        $set = join(',', parse_set($set));
    }
    $sql = "update $table set $set where $where";
    echo $sql . '<br />';
    $result = mysqli_query($link, $sql);

    if ($result && mysqli_affected_rows($link)) {
        return true;
    }
    return false;
}

/**
 *删除数据
 *@param string $link         连接地址
 *@param string $table        表
 *@param string $where        条件
 *@param string $fields        查询字段
 *@param string $orderby      排序
 *@return bool
 */
function db_select($link, $table, $fields, $where = null, $orderby = null)
{
    if (is_array($fields)) {
        $fields = implode(',', $fields);
    }
    $sql = "select $fields from $table";

    if ($where) {
        $sql .= " where $where";
    }

    if ($orderby) {
        $sql .= " order by $orderby";
    }
    //echo $sql . '<br/>';
    $result = mysqli_query($link, $sql);

    if ($result && mysqli_affected_rows($link)) {
        while ($row = mysqli_fetch_assoc($result)) {
            $data[] = $row;
        }
        return $data;
    }
    return false;
}

//对字符类型进行处理
function parse_value($data)
{
    if (is_string($data)) {
        $data = '\'' . $data . '\'';
    } else if (is_array($data)) {
        $data = array_map('parse_value', $data);
    } else if (is_null($data)) {
        $data = 'null';
    }
    return $data;
}

//遍历数组
function parse_set($set)
{
    foreach ($set as $key => $value) {
        $data[] = $key . '=' . parse_value($value);
    }

    return $data;
}
