<?php

/* 在Controller中被包含 */

defined('BASE_PATH') OR exit('denied');

class Frame_Loader {
	
	/**
	 * helpers
	 *
	 * @var	array
	 */
	protected $_service_helper_paths =	array(APP_PATH, BASE_PATH);
	
	/**
	 * classes
	 *
	 * @var	array
	 */
	protected $_service_classes =	array();

	/**
	 * models
	 *
	 * @var	array
	 */
	protected $_Frame_models =	array();

	/**
	 * helpers
	 *
	 * @var	array
	 */
	protected $_service_helpers =	array();

	// --------------------------------------------------------------------

	/**
	 * Class constructor
	 *
	 * Sets component load paths, gets the initial output buffering level.
	 *
	 * @return	void
	 */
	public function __construct()
	{
		$this->_ci_classes =& is_loaded();

		addLog(array('file_name'=>'Loader','content'=>'Loader Class Initialized'));
	}

	// --------------------------------------------------------------------

	/**
	 * Initializer
	 *
	 * @todo	Figure out a way to move this to the constructor
	 *		without breaking *package_path*() methods.
	 * @uses	CI_Loader::_service_autoloader()
	 * @used-by	CI_Controller::__construct()
	 * @return	void
	 */
	public function initialize()
	{
		$this->_service_autoloader();
	}

	// --------------------------------------------------------------------

	/**
	 *  Is Loaded 检测是否被加载
	 *
	 * @used-by	Mainly used by Form Helper function _get_validation_object().
	 *
	 * @param 	string		$class	Class name to check for
	 * @return 	string|bool	Class object name if loaded or FALSE
	 */
	public function is_loaded($class)
	{
		return array_search(ucfirst($class), $this->_ci_classes, TRUE);
	}

	// --------------------------------------------------------------------

	/**
	 * Library 加载器
	 *
	 * @param	string	$library	Library name
	 * @param	array	$params		Optional parameters to pass to the library class constructor
	 * @param	string	$object_name	An optional object name to assign to
	 * @return	object
	 */
	public function library($library, $params = NULL, $object_name = NULL)
	{
		if (empty($library))
		{
			return $this;
		}
		elseif (is_array($library))
		{
			foreach ($library as $key => $value)
			{
				if (is_int($key))
				{
					$this->library($value, $params);
				}
				else
				{
					$this->library($key, $params, $value);
				}
			}

			return $this;
		}

		if ($params !== NULL && ! is_array($params))
		{
			$params = NULL;
		}

		$this->_ci_load_library($library, $params, $object_name);
		return $this;
	}

	/* 加载mod */
	public function mod($mod, $db_conn = FALSE)
	{
		require_once APP_PATH.'Core/mod.php';
		$path = '';
		
		if (($last_slash = strrpos($mod, '/')) !== FALSE)
		{
			$path = substr($mod, 0, $last_slash + 1);
		
			$mod = substr($mod, $last_slash + 1);
		}
		$CDS = Frame_Controller::get_instance();
		if (isset($CDS->$mod))
		{
			throw new RuntimeException('[serviceFrame] The model name you are loading is the name of a resource that is already being used: '.$mod);
		}
		
		$path = APP_PATH.'mvc/'.$path;
		
		if ($db_conn !== FALSE && $db_conn !== TRUE)
		{
			$this->database($db_conn, FALSE, TRUE);
		}
		
		require_once($path.$mod.'.php');
		if ( ! class_exists($mod, FALSE))
		{
			throw new RuntimeException('[serviceFrame] Unable to locate the model you have specified: '.$mod);
		}
		
		$this->_Frame_models[] = $mod;
		$CDS->$mod = new $mod();
		return $this;
	}

	// --------------------------------------------------------------------

	/**
	 * Mysql数据库 Loader
	 *
	 * @param	mixed	$params		Database configuration options
	 * @param	bool	$return 	Whether to return the database object
	 * @param	bool	$query_builder	Whether to enable Query Builder
	 *					(overrides the configuration setting)
	 *
	 * @return	object|bool	Database object if $return is set to TRUE,
	 *					FALSE on failure, CI_Loader instance in any other case
	 */
	public function mysqlDB($db_name)
	{
		
		$TOP = Frame_Controller::get_instance();

		
		if (isset($TOP->$db_name) && is_object($TOP->$db_name))
		{
			return FALSE;
		}
		
		require_once(BASE_PATH.'Database/Mysql/MysqlPDO.php');
		require_once DATACONFIG_PATH.'MysqlConf.php';
		
		$array = $GLOBALS['mysqlDB']['db_list'][$db_name];
		
		$TOP->$db_name = '';
		$TOP->$db_name = new MysqlPDO($array);
		
		return $this;
	}
	
	// --------------------------------------------------------------------
	
	/**
	 * MongoDB Loader
	 *
	 * @param	mixed	$params		Database configuration options
	 * @param	bool	$return 	Whether to return the database object
	 * @param	bool	$query_builder	Whether to enable Query Builder
	 *					(overrides the configuration setting)
	 *
	 * @return	object|bool	Database object if $return is set to TRUE,
	 *					FALSE on failure, CI_Loader instance in any other case
	 */
	public function mongoDB($db_name)
	{
	    
	    $TOP = Frame_Controller::get_instance();
	    
	    
	    if (isset($TOP->$db_name) && is_object($TOP->$db_name))
	    {
	        return FALSE;
	    }
	    
	    require_once(BASE_PATH.'Database/MongoDB/MongoDB.php');
	    $TOP->$db_name = '';
	    
	    require_once DATACONFIG_PATH.'MongoConf.php';
	    
	    $array = $GLOBALS['mongoDB']['db_list'][$db_name];
	    
	    $TOP->$db_name = new MongoDB($array);
	    
	    return $this;
	}
	
	// --------------------------------------------------------------------

	/**
	 * 帮助helper加载器 Loader
	 *
	 * @param	string|string[]	$helpers	Helper name(s)
	 * @return	object
	 */
	public function helper($helpers = array())
	{
		foreach ($this->_service_prep_filename($helpers, '_helper') as $helper)
		{
			if (isset($this->_ci_helpers[$helper]))
			{
				continue;
			}
			
			$ext_loaded = FALSE;
			foreach ($this->_ci_helper_paths as $path)
			{
				if (file_exists($path.'helpers/'.$ext_helper.'.php'))
				{
					include_once($path.'helpers/'.$ext_helper.'.php');
					$ext_loaded = TRUE;
				}
			}

			if ($ext_loaded === TRUE)
			{
				$base_helper = BASE_PATH.'helpers/'.$helper.'.php';
				if ( ! file_exists($base_helper))
				{
					show_error('Unable to load the requested file: helpers/'.$helper.'.php');
				}

				include_once($base_helper);
				$this->_ci_helpers[$helper] = TRUE;
				
				addLog(array('file_name'=>'Helper Loader','content'=>'Helper loaded: '.$helper));
				continue;
			}

			foreach ($this->_ci_helper_paths as $path)
			{
				if (file_exists($path.'helpers/'.$helper.'.php'))
				{
					include_once($path.'helpers/'.$helper.'.php');

					$this->_ci_helpers[$helper] = TRUE;
					addLog(array('file_name'=>'Helper Loader','content'=>'Helper loaded: '.$helper));
					break;
				}
			}

			if ( ! isset($this->_ci_helpers[$helper]))
			{
				show_error('Unable to load the requested file: helpers/'.$helper.'.php');
			}
		}

		return $this;
	}

	// --------------------------------------------------------------------

	/**
	 * 配置文件Config Loader
	 * @uses	CI_Config::load()
	 * @param	string	$file			
	 * @param	bool	$use_sections	
	 * @param	bool	$fail_gracefully
	 * @return	bool	TRUE 
	 */
	public function config($file, $use_sections = FALSE, $fail_gracefully = FALSE)
	{
		return get_instance()->config->load($file, $use_sections, $fail_gracefully);
	}
	
	// --------------------------------------------------------------------

	/**
	 * 自动加载
	 * @used-by	Frame_Loader::initialize()
	 */
	protected function _service_autoloader()
	{
		if (file_exists(APP_PATH.'config/autoload.php'))
		{
			include(APP_PATH.'config/autoload.php');
		}

		if (file_exists(APP_PATH.'config/'.ENVIRONMENT.'/autoload.php'))
		{
			include(APP_PATH.'config/'.ENVIRONMENT.'/autoload.php');
		}

		if ( ! isset($autoload))
		{
			return;
		}

		if (isset($autoload['packages']))
		{
			foreach ($autoload['packages'] as $package_path)
			{
				$this->add_package_path($package_path);
			}
		}

		if (count($autoload['config']) > 0)
		{
			foreach ($autoload['config'] as $val)
			{
				$this->config($val);
			}
		}

		foreach (array('helper', 'language') as $type)
		{
			if (isset($autoload[$type]) && count($autoload[$type]) > 0)
			{
				$this->$type($autoload[$type]);
			}
		}

		if (isset($autoload['drivers']))
		{
			$this->driver($autoload['drivers']);
		}

		if (isset($autoload['libraries']) && count($autoload['libraries']) > 0)
		{
			if (in_array('database', $autoload['libraries']))
			{
				$this->database();
				$autoload['libraries'] = array_diff($autoload['libraries'], array('database'));
			}

			$this->library($autoload['libraries']);
		}

		if (isset($autoload['model']))
		{
			$this->model($autoload['model']);
		}
	}

	// --------------------------------------------------------------------

	/**
	 * Prep filename
	 * @param	string|string[]	$filename	Filename(s)
	 * @param 	string		$extension	Filename extension
	 * @return	array
	 */
	protected function _service_prep_filename($filename, $extension)
	{
		if ( ! is_array($filename))
		{
			return array(strtolower(str_replace(array($extension, '.php'), '', $filename).$extension));
		}
		else
		{
			foreach ($filename as $key => $val)
			{
				$filename[$key] = strtolower(str_replace(array($extension, '.php'), '', $val).$extension);
			}

			return $filename;
		}
	}

}
