<?php

/* 在ServiceFrame中被包含 */
defined('BASE_PATH') OR exit('denied');

class Frame_Controller {
	
	/* 存放在内存中的实例 */
	private static $instance;
	
	public function __construct()
	{
		/* 给存放在内存中的这个实例赋值 */
		self::$instance =& $this;
		
		/* 
		foreach (is_loaded() as $var => $class)
		{
			$this->$var =& load_class($class);
		} */

		$this->load =& load_class('Loader', 'Core');
		
		//$this->load->initialize();
		addLog(array('file_name'=>'Frame_Controller_Info','content'=>'Controller Class Initialized'));
	}

	// --------------------------------------------------------------------
	
	/* 供外部函数等调用 */
	public static function &get_instance()
	{
		/* 返回存放在内存中的实例的指针，使得不生成新实例   | 这里的&get_instance中的&返回的是变量的指针*/
		return self::$instance;
	}

}
