<?php

defined('BASE_PATH') OR exit('denied');

/* 加载类 */
if ( ! function_exists('load_class'))
{
	function &load_class($class, $directory = 'libraries', $param = NULL)
	{
		static $_classes = array();
		
		if (isset($_classes[$class]))
		{
			return $_classes[$class];
		}

		$name = FALSE;
		
		foreach (array(APP_PATH, BASE_PATH) as $path)
		{
			if (file_exists($path.$directory.'/'.$class.'.php'))
			{
				$name = 'Frame_'.$class;

				if (class_exists($name, FALSE) === FALSE)
				{
					require_once($path.$directory.'/'.$class.'.php');
				}

				break;
			}
		}
		
		if ($name === FALSE)
		{
		    print_r($path.$directory.'/'.$class.'.php');exit;
			set_status_header(404);
			echo '[serviceFrame]: Unable to locate the specified class: '.$class.'.php';
			exit(1);
		}
		
		$_classes[$class] = isset($param)
			? new $name($param)
			: new $name();
		return $_classes[$class];
	}
}

// --------------------------------------------------------------------

/* 记载被加载的类， 还可以数组形式返回哪些类被加载了 */
if ( ! function_exists('is_loaded'))
{
	function &is_loaded($class = '')
	{
		static $_is_loaded = array();
		if ($class !== '')
		{
			$_is_loaded[strtolower($class)] = $class;
		}
		
		return $_is_loaded;
	}
}

// ------------------------------------------------------------------------

/* 写错误日志 */
if ( ! function_exists('addLog'))
{
	function addLog($array)
	{
		$dateTime = date("Y-m-d H:i:s");
		error_log("{$dateTime}:{$array['content']}".PHP_EOL,3,LOG_PATH.$array['file_name'].date('Y-m-d').'.log');
	}
}

// ------------------------------------------------------------------------

/* 设置报错的头信息 */
if ( ! function_exists('set_status_header'))
{
	/**
	 * 设置报错
	 *
	 * @param	int	the status code
	 * @param	string
	 * @return	void
	 */
	function set_status_header($code = 200, $text = '')
	{
	    return;
		if (is_cli())
		{
			return;
		}

		if (empty($code) OR ! is_numeric($code))
		{
			show_error('Status codes must be numeric', 500);
		}

		if (empty($text))
		{
			is_int($code) OR $code = (int) $code;
			$stati = array(
					100	=> 'Continue',
					101	=> 'Switching Protocols',

					200	=> 'OK',
					201	=> 'Created',
					202	=> 'Accepted',
					203	=> 'Non-Authoritative Information',
					204	=> 'No Content',
					205	=> 'Reset Content',
					206	=> 'Partial Content',

					300	=> 'Multiple Choices',
					301	=> 'Moved Permanently',
					302	=> 'Found',
					303	=> 'See Other',
					304	=> 'Not Modified',
					305	=> 'Use Proxy',
					307	=> 'Temporary Redirect',

					400	=> 'Bad Request',
					401	=> 'Unauthorized',
					402	=> 'Payment Required',
					403	=> 'Forbidden',
					404	=> 'Not Found',
					405	=> 'Method Not Allowed',
					406	=> 'Not Acceptable',
					407	=> 'Proxy Authentication Required',
					408	=> 'Request Timeout',
					409	=> 'Conflict',
					410	=> 'Gone',
					411	=> 'Length Required',
					412	=> 'Precondition Failed',
					413	=> 'Request Entity Too Large',
					414	=> 'Request-URI Too Long',
					415	=> 'Unsupported Media Type',
					416	=> 'Requested Range Not Satisfiable',
					417	=> 'Expectation Failed',
					422	=> 'Unprocessable Entity',

					500	=> 'Internal Server Error',
					501	=> 'Not Implemented',
					502	=> 'Bad Gateway',
					503	=> 'Service Unavailable',
					504	=> 'Gateway Timeout',
					505	=> 'HTTP Version Not Supported'
			);

			if (isset($stati[$code]))
			{
				$text = $stati[$code];
			}
			else
			{
				show_error('No status text available. Please check your status code number or supply your own message text.', 500);
			}
		}

		if (strpos(PHP_SAPI, 'cgi') === 0)
		{
			header('Status: '.$code.' '.$text, TRUE);
		}
		else
		{
			$server_protocol = isset($_SERVER['SERVER_PROTOCOL']) ? $_SERVER['SERVER_PROTOCOL'] : 'HTTP/1.1';
			header($server_protocol.' '.$code.' '.$text, TRUE, $code);
		}
	}
	
	
	/* app层调用的方法开始 */
	function getStr($data, $key){
		$str = '';
		foreach ($data as $v){
			$str .= $v[$key].',';
		}
		$str = substr($str,0,strlen($str) - 1);
		return $str;
	}
	
	/* 输出JSON数据 */
	function ajaxJson($out){
	    
	    if(!is_array($out)){
	        die("使用ajaxJson函数时必须传数组");
	    }
	    
	    foreach ($out as $k=>$v){
	        if(!in_array($k, ['code','msg','data'])){
	            die("必须用规范格式['code'=>'','msg'=>'','data'=>[]]");
	        }
	    }
	    
	    print_r(json_encode($out));
	    die();
	}
	
	/* 输出JSON数据 */
	function removeFiledPre($param){
	    
	    $array = $param['array'];
	    
	    foreach ($array as $k=>$v){
	        $k = str_replace($GLOBALS['mongoDB']['field_pre'], '', $k);
	    }
	    
	    return $array;
	}
	
}
